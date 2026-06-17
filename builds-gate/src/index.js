// Dusk Studio build gate — Patreon-OAuth delivery.
//
// Downloads are locked to ACTIVE $1+ Patreon members of the Dusk Audio campaign.
// Flow: visitor hits /latest -> "Sign in with Patreon" -> /auth/login redirects to
// Patreon -> /auth/callback verifies live membership via the Patreon identity API.
// A member gets a short-lived signed session cookie; downloads are gated on it. We never
// store Patreon tokens — membership is checked once at login and the tokens are discarded.
// The GitHub PAT never leaves the Worker; the member gets a short-lived signed GitHub URL.
//
// Secrets (wrangler secret put): PATREON_CLIENT_ID, PATREON_CLIENT_SECRET, SESSION_SECRET, GH_PAT
// Vars (wrangler.toml [vars]): RELEASES_REPO, PATREON_JOIN_URL, DUSK_CAMPAIGN_ID,
//                              OAUTH_REDIRECT_URI, SESSION_TTL_HOURS, FREE_DOWNLOADS

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    try {
      if (p === "/") return htmlResp(signIn(env));
      if (p === "/manual") return manual(env); // public: the manual is free to read
      if (p === "/auth/login") return authLogin(env);
      if (p === "/auth/callback") return authCallback(env, request, url);
      if (p === "/latest") return latestPage(env, request);
      if (p.startsWith("/dl/")) return download(env, request, decodeURIComponent(p.slice(4)));
      return new Response("Not found", { status: 404 });
    } catch (_e) {
      return htmlResp(page("Something went wrong", "<p>Try again in a moment.</p>"), 500);
    }
  },
};

/* ---------- access control ---------- */

// Emergency public override: set FREE_DOWNLOADS=1 to drop the gate entirely. Default off.
async function sessionOk(env, request) {
  if (env.FREE_DOWNLOADS === "1") return true;
  if (!env.SESSION_SECRET) return false; // fail closed on misconfig (empty key = forgeable)
  const c = getCookie(request, "ds_sess");
  return c ? verifySession(env.SESSION_SECRET, c) : false;
}

// True if the Patreon identity payload shows an active $1+ membership of OUR campaign.
// Fails closed if campaignId is unset — otherwise a $1+ patron of ANY other creator's
// campaign would pass. DUSK_CAMPAIGN_ID is required config.
function checkMembership(identity, campaignId) {
  if (!campaignId) return false;
  const included = (identity && identity.included) || [];
  for (const inc of included) {
    if (inc.type !== "member") continue;
    const attr = inc.attributes || {};
    const active = attr.patron_status === "active_patron";
    const cents = attr.currently_entitled_amount_cents || 0;
    const camp = inc.relationships && inc.relationships.campaign && inc.relationships.campaign.data;
    const campOk = camp && String(camp.id) === String(campaignId);
    if (active && cents >= 100 && campOk) return true;
  }
  return false;
}

/* ---------- OAuth ---------- */

function authLogin(env) {
  const state = randHex(16);
  const auth = new URL("https://www.patreon.com/oauth2/authorize");
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("client_id", env.PATREON_CLIENT_ID || "");
  auth.searchParams.set("redirect_uri", env.OAUTH_REDIRECT_URI || "");
  auth.searchParams.set("scope", "identity identity.memberships");
  auth.searchParams.set("state", state);
  const headers = new Headers({ Location: auth.toString() });
  headers.append("Set-Cookie", cookie("ds_oauthstate", state, 600)); // 10 min
  return new Response(null, { status: 302, headers });
}

async function authCallback(env, request, url) {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = getCookie(request, "ds_oauthstate");
  // CSRF: the state echoed by Patreon must match the one we set before the redirect.
  if (!code || !state || !cookieState || !safeEqual(state, cookieState)) {
    return htmlResp(page("Sign-in failed", retry("Could not verify the sign-in.")), 400);
  }

  // Exchange the code for an access token.
  const tok = await fetch("https://www.patreon.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: env.PATREON_CLIENT_ID || "",
      client_secret: env.PATREON_CLIENT_SECRET || "",
      redirect_uri: env.OAUTH_REDIRECT_URI || "",
    }),
  });
  if (!tok.ok) return htmlResp(page("Sign-in failed", retry("Patreon sign-in failed.")), 502);
  const { access_token } = await tok.json();

  // Read the member's live membership state.
  const idUrl =
    "https://www.patreon.com/api/oauth2/v2/identity" +
    "?include=memberships,memberships.campaign" +
    "&fields%5Bmember%5D=patron_status,currently_entitled_amount_cents";
  const idr = await fetch(idUrl, { headers: { Authorization: `Bearer ${access_token}` } });
  if (!idr.ok) return htmlResp(page("Sign-in failed", retry("Could not read your Patreon membership.")), 502);
  const identity = await idr.json();

  // Refuse to mint a session we can't sign — an empty HMAC key would be forgeable.
  if (!env.SESSION_SECRET) {
    return htmlResp(page("Sign-in failed", retry("The gate is misconfigured (no session secret).")), 500);
  }

  if (!checkMembership(identity, env.DUSK_CAMPAIGN_ID)) {
    const headers = new Headers({ "Content-Type": "text/html; charset=UTF-8" });
    headers.append("Set-Cookie", clearCookie("ds_oauthstate"));
    return new Response(notMember(env), { status: 403, headers });
  }

  // Member confirmed — drop the Patreon tokens, mint a signed session, send to the builds.
  const ttl = (parseInt(env.SESSION_TTL_HOURS, 10) || 6) * 3600;
  const sess = await signSession(env.SESSION_SECRET, { exp: Math.floor(Date.now() / 1000) + ttl });
  const headers = new Headers({ Location: "/latest" });
  headers.append("Set-Cookie", cookie("ds_sess", sess, ttl));
  headers.append("Set-Cookie", clearCookie("ds_oauthstate"));
  return new Response(null, { status: 302, headers });
}

/* ---------- builds ---------- */

async function latestPage(env, request) {
  if (!(await sessionOk(env, request))) return htmlResp(signIn(env));
  const rel = await latestRelease(env);
  if (!rel) return htmlResp(page("Builds", "<p>No build published yet. Check back soon.</p>"));

  const assets = rel.assets || [];
  const items = assets.length
    ? assets
        .map(
          (a) =>
            `<li><a href="/dl/${a.id}">${escapeHtml(a.name)}</a> <span class="sz">${(a.size / 1048576).toFixed(1)} MB</span></li>`
        )
        .join("")
    : "<li>No files attached to this release.</li>";

  const body = `
    <h1>${escapeHtml(rel.name || rel.tag_name || "Latest build")}</h1>
    <p class="tag">${escapeHtml(rel.tag_name || "")}</p>
    <ul class="files">${items}</ul>
    <p class="muted">Members-only build. Unsigned — see the <a href="/manual">first-launch steps</a> if macOS or Windows warns you.</p>`;
  return htmlResp(page("Your Dusk Studio build", body), 200, { "Cache-Control": "no-store" });
}

async function download(env, request, id) {
  if (!(await sessionOk(env, request))) return htmlResp(notMember(env), 403);
  // numeric asset id only — prevents path/SSRF injection into the GitHub API
  if (!/^\d+$/.test(id)) return new Response("Bad request", { status: 400 });

  // GitHub returns a 302 to a short-lived signed CDN URL; hand that to the client.
  const r = await fetch(`https://api.github.com/repos/${env.RELEASES_REPO}/releases/assets/${id}`, {
    headers: {
      Authorization: `Bearer ${env.GH_PAT}`,
      Accept: "application/octet-stream",
      "User-Agent": "dusk-builds-gate",
    },
    redirect: "manual",
  });
  const loc = r.headers.get("Location");
  if (!loc) return new Response("Not available", { status: 404 });
  return new Response(null, { status: 302, headers: { Location: loc, "Cache-Control": "no-store" } });
}

// Public: serve the latest release's MANUAL.pdf (free to read; no login).
// Proxies the bytes and serves them INLINE so the browser opens the PDF in a
// tab instead of prompting a download. (Small file, ~1-2 MB.)
async function manual(env) {
  var rel = await latestRelease(env);
  if (!rel) return new Response("Not available", { status: 404 });
  var asset = (rel.assets || []).find(function (a) {
    return /manual/i.test(a.name) && /\.pdf$/i.test(a.name);
  });
  if (!asset) return new Response("Manual not found", { status: 404 });
  // redirect: 'follow' (default) -> fetch follows GitHub's signed-URL redirect
  // and returns the actual PDF body, which we re-serve with inline headers.
  var r = await fetch(`https://api.github.com/repos/${env.RELEASES_REPO}/releases/assets/${asset.id}`, {
    headers: {
      Authorization: `Bearer ${env.GH_PAT}`,
      Accept: "application/octet-stream",
      "User-Agent": "dusk-builds-gate",
    },
  });
  if (!r.ok) return new Response("Not available", { status: 404 });
  return new Response(r.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="dusk-studio-manual.pdf"',
      "Cache-Control": "public, max-age=300",
    },
  });
}

// Newest non-draft release, INCLUDING prereleases (alpha/beta builds are tagged prerelease,
// so GitHub's /releases/latest — which skips prereleases — would miss them).
async function latestRelease(env) {
  const r = await fetch(`https://api.github.com/repos/${env.RELEASES_REPO}/releases?per_page=10`, {
    headers: {
      Authorization: `Bearer ${env.GH_PAT}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "dusk-builds-gate",
    },
    // Don't serve a stale list from the edge cache after a new release is published.
    cf: { cacheTtl: 0, cacheEverything: false },
  });
  if (!r.ok) return null;
  const list = await r.json();
  if (!Array.isArray(list)) return null;
  // The API does NOT guarantee newest-first (these releases share a created_at),
  // so pick the most recently PUBLISHED non-draft release explicitly.
  return (
    list
      .filter((x) => !x.draft)
      .sort((a, b) => Date.parse(b.published_at || 0) - Date.parse(a.published_at || 0))[0] || null
  );
}

/* ---------- signed session (HMAC-SHA256 via WebCrypto) ---------- */

const _enc = new TextEncoder();

async function hmacB64(secret, data) {
  const key = await crypto.subtle.importKey("raw", _enc.encode(secret || ""), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, _enc.encode(data));
  return b64url(new Uint8Array(sig));
}

function b64url(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// payload is ASCII JSON ({exp:number}) so plain btoa/atob round-trips safely.
async function signSession(secret, payloadObj) {
  const payload = btoa(JSON.stringify(payloadObj)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const sig = await hmacB64(secret, payload);
  return payload + "." + sig;
}

async function verifySession(secret, token) {
  const parts = String(token).split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = await hmacB64(secret, payload);
  if (!safeEqual(sig, expected)) return false;
  try {
    const obj = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof obj.exp === "number" && obj.exp > Math.floor(Date.now() / 1000);
  } catch (_e) {
    return false;
  }
}

/* ---------- cookies ---------- */

function cookie(name, value, maxAgeSecs) {
  return `${name}=${value}; Max-Age=${maxAgeSecs}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function clearCookie(name) {
  return `${name}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function getCookie(request, name) {
  const h = request.headers.get("Cookie") || "";
  const m = h.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return m ? m[1] : null;
}

/* ---------- helpers ---------- */

function randHex(n) {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  let s = "";
  for (let i = 0; i < a.length; i++) s += a[i].toString(16).padStart(2, "0");
  return s;
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function retry(msg) {
  return `<p>${escapeHtml(msg)} <a href="/auth/login">Try again</a>.</p>`;
}

/* ---------- pages ---------- */

function signIn(env) {
  return page(
    "Get Dusk Studio builds",
    `<h1>Dusk Studio builds</h1>
     <p>Official builds are for active $1+ Patreon members. Sign in with Patreon to download the latest build.</p>
     <p><a class="cta" href="/auth/login">Sign in with Patreon</a></p>`
  );
}

function notMember(env) {
  return page(
    "Patrons only",
    `<h1>Almost there</h1>
     <p>Your Patreon account isn't an active $1+ member of Dusk Audio yet. Join for $1+ to get every build, alpha and beta:</p>
     <p><a class="cta" href="${escapeHtml(env.PATREON_JOIN_URL || "https://www.patreon.com/cw/DuskAudio/membership")}">Join on Patreon</a></p>`
  );
}

function page(title, body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)} — Dusk Studio</title>
<style>
  /* Matches the site's studio-paper LIGHT theme (assets/css/style.css). */
  :root{color-scheme:light}
  body{margin:0;background:#faf8f3;color:#211e1a;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
  main{max-width:640px;margin:0 auto;padding:56px 20px}
  h1{font-size:1.6rem;margin:0 0 8px;color:#211e1a}
  a{color:#2c6e8f}
  a:hover{color:#225773}
  .tag{color:#847c70;margin-top:0}
  .muted{color:#847c70;font-size:.9rem}
  ul.files{list-style:none;padding:0}
  ul.files li{padding:12px 0;border-bottom:1px solid #e2dacb}
  .sz{color:#847c70;font-size:.85rem;margin-left:8px}
  .cta{display:inline-block;margin:8px 0;padding:12px 20px;background:#2c6e8f;color:#fff;border-radius:8px;font-weight:600;text-decoration:none}
  .cta:hover{background:#225773;color:#fff}
</style></head><body><main>${body}</main></body></html>`;
}

function htmlResp(html, status = 200, extraHeaders = {}) {
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=UTF-8", ...extraHeaders } });
}
