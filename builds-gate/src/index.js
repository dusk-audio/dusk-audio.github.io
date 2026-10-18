// Dusk Studio build gate: Patreon-OAuth delivery.
//
// Downloads are locked to ACTIVE $1+ Patreon members of the Dusk Audio campaign. New
// members join at $5+; the $1 and $3 tiers are closed but their members keep access.
// /latest serves Dusk Studio builds; /early serves plugin releases still inside their
// early-access window (mirrored to EARLY_REPO by the plugins repo's release workflows).
// Flow: visitor hits /latest -> "Sign in with Patreon" -> /auth/login redirects to
// Patreon -> /auth/callback verifies live membership via the Patreon identity API.
// A member gets a short-lived signed session cookie; downloads are gated on it. We never
// store Patreon tokens; membership is checked once at login and the tokens are discarded.
// The GitHub PAT never leaves the Worker; the member gets a short-lived signed GitHub URL.
//
// Secrets (wrangler secret put): PATREON_CLIENT_ID, PATREON_CLIENT_SECRET, SESSION_SECRET, GH_PAT
// Vars (wrangler.toml [vars]): RELEASES_REPO, EARLY_REPO, PATREON_JOIN_URL, DUSK_CAMPAIGN_ID,
//                              DUSK_CREATOR_USER_ID, OAUTH_REDIRECT_URI, SESSION_TTL_HOURS, FREE_DOWNLOADS

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    try {
      if (p === "/") return htmlResp(signIn(env));
      if (p === "/manual") return manual(env); // public: the manual is free to read
      if (p === "/auth/login") return authLogin(env, url);
      if (p === "/auth/callback") return authCallback(env, request, url);
      if (p === "/latest") return latestPage(env, request);
      if (p === "/early") return earlyPage(env, request);
      if (p.startsWith("/dl/")) return download(env, request, decodeURIComponent(p.slice(4)), env.RELEASES_REPO);
      if (p.startsWith("/edl/")) return download(env, request, decodeURIComponent(p.slice(5)), env.EARLY_REPO);
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
// Fails closed if campaignId is unset, otherwise a $1+ patron of ANY other creator's
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

// The campaign owner can't pledge to their own campaign, so they pass by Patreon user id.
// identity.data.id comes from Patreon's token-authenticated identity call, not from the
// browser. Fails closed when the var is unset.
function isCreator(identity, creatorUserId) {
  if (!creatorUserId) return false;
  const id = identity && identity.data && identity.data.id;
  return id != null && String(id) === String(creatorUserId);
}

/* ---------- OAuth ---------- */

// Where to land after sign-in. Whitelisted: never an open redirect.
const AFTER_LOGIN = ["/latest", "/early"];

function authLogin(env, url) {
  const next = url.searchParams.get("next");
  const state = randHex(16);
  const auth = new URL("https://www.patreon.com/oauth2/authorize");
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("client_id", env.PATREON_CLIENT_ID || "");
  auth.searchParams.set("redirect_uri", env.OAUTH_REDIRECT_URI || "");
  auth.searchParams.set("scope", "identity identity.memberships");
  auth.searchParams.set("state", state);
  const headers = new Headers({ Location: auth.toString() });
  headers.append("Set-Cookie", cookie("ds_oauthstate", state, 600)); // 10 min
  headers.append("Set-Cookie", cookie("ds_next", AFTER_LOGIN.includes(next) ? next : "/latest", 600));
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

  // Refuse to mint a session we can't sign; an empty HMAC key would be forgeable.
  if (!env.SESSION_SECRET) {
    return htmlResp(page("Sign-in failed", retry("The gate is misconfigured (no session secret).")), 500);
  }

  if (!checkMembership(identity, env.DUSK_CAMPAIGN_ID) && !isCreator(identity, env.DUSK_CREATOR_USER_ID)) {
    const headers = new Headers({ "Content-Type": "text/html; charset=UTF-8" });
    headers.append("Set-Cookie", clearCookie("ds_oauthstate"));
    headers.append("Set-Cookie", clearCookie("ds_next"));
    return new Response(notMember(env), { status: 403, headers });
  }

  // Member confirmed: drop the Patreon tokens, mint a signed session, send to the builds.
  const ttl = (parseInt(env.SESSION_TTL_HOURS, 10) || 6) * 3600;
  const sess = await signSession(env.SESSION_SECRET, { exp: Math.floor(Date.now() / 1000) + ttl });
  const next = getCookie(request, "ds_next");
  const headers = new Headers({ Location: AFTER_LOGIN.includes(next) ? next : "/latest" });
  headers.append("Set-Cookie", cookie("ds_sess", sess, ttl));
  headers.append("Set-Cookie", clearCookie("ds_oauthstate"));
  headers.append("Set-Cookie", clearCookie("ds_next"));
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
    <p class="muted">Members-only build. Unsigned; see the <a href="/manual">first-launch steps</a> if macOS or Windows warns you.</p>
    <p><a href="/early">Early-access plugin releases</a></p>`;
  return htmlResp(page("Your Dusk Studio build", body), 200, { "Cache-Control": "no-store" });
}

// The plugins repo mirrors each early-access release here with a first line of
// "... Free for everyone on YYYY-MM-DD." Once that day arrives the release is public
// on GitHub, so only releases still inside their window are listed.
const PUBLIC_ON = /Free for everyone on (\d{4}-\d{2}-\d{2})/;

// Prerelease tags (alpha, beta, rc) are mirrored with a first line of "Members-only
// prerelease ..." and never go public. One is listed while it is its plugin's newest
// mirrored release, so the stable release that follows replaces it.
const MEMBERS_ONLY = /^\*\*Members-only prerelease\b/;

// "multi-comp-2-v1.1.0-alpha1" -> "multi-comp-2"
function pluginSlug(rel) {
  return String(rel.tag_name || "").replace(/-v\d+\.\d+\.\d+.*$/, "");
}

// The mirrored releases to list today, in the order fetchReleases returns them
// (newest first): dated ones inside their window, then each plugin's prerelease
// while nothing newer of that plugin has been mirrored.
function earlyListing(list, today) {
  const newestBySlug = new Map();
  for (const r of list) if (!newestBySlug.has(pluginSlug(r))) newestBySlug.set(pluginSlug(r), r);
  return list.filter((r) => {
    if (MEMBERS_ONLY.test(r.body || "")) return newestBySlug.get(pluginSlug(r)) === r;
    const when = publicOn(r);
    return when && when > today;
  });
}

// The date, or null when missing or not a real calendar day (9999-99-99 would
// otherwise sort after every real date and keep a release listed forever).
function publicOn(rel) {
  const m = PUBLIC_ON.exec(rel.body || "");
  if (!m) return null;
  const d = new Date(m[1] + "T00:00:00Z");
  return !isNaN(d) && d.toISOString().slice(0, 10) === m[1] ? m[1] : null;
}

async function earlyPage(env, request) {
  if (!(await sessionOk(env, request))) return htmlResp(signIn(env, "/early"));
  const today = new Date().toISOString().slice(0, 10);
  const list = env.EARLY_REPO ? await fetchReleases(env, env.EARLY_REPO) : [];
  if (!list) {
    return htmlResp(page("Early-access plugins", "<p>Couldn't load the early-access releases. Try again in a moment.</p>"), 502,
      { "Cache-Control": "no-store" });
  }
  const current = earlyListing(list, today);

  const sections = current.length
    ? current
        .map((rel) => {
          const files = (rel.assets || [])
            .map(
              (a) =>
                `<li><a href="/edl/${a.id}">${escapeHtml(a.name)}</a> <span class="sz">${(a.size / 1048576).toFixed(1)} MB</span></li>`
            )
            .join("");
          // Same precedence as earlyListing: the members-only line wins over any date.
          const note = MEMBERS_ONLY.test(rel.body || "")
            ? "Members-only prerelease"
            : `Free for everyone on ${escapeHtml(publicOn(rel))}`;
          return `<h2>${escapeHtml(rel.name || rel.tag_name)}</h2>
            <p class="tag">${note}</p>
            <ul class="files">${files || "<li>No files attached to this release.</li>"}</ul>`;
        })
        .join("")
    : `<p>No plugin is in early access right now. Every released plugin is on
       <a href="https://github.com/dusk-audio/dusk-audio-plugins/releases">GitHub</a>.</p>`;

  const body = `
    <h1>Early-access plugins</h1>
    <p class="muted">New plugin releases reach members two weeks before everyone else.
       Alpha and beta builds are for members only.</p>
    ${sections}
    <p><a href="/latest">Dusk Studio builds</a></p>`;
  return htmlResp(page("Early-access plugins", body), 200, { "Cache-Control": "no-store" });
}

async function download(env, request, id, repo) {
  if (!(await sessionOk(env, request))) return htmlResp(notMember(env), 403);
  // numeric asset id only; prevents path/SSRF injection into the GitHub API
  if (!/^\d+$/.test(id)) return new Response("Bad request", { status: 400 });
  if (!repo) return new Response("Not available", { status: 404 });

  // GitHub returns a 302 to a short-lived signed CDN URL; hand that to the client.
  const r = await fetch(`https://api.github.com/repos/${repo}/releases/assets/${id}`, {
    headers: {
      Authorization: `Bearer ${env.GH_PAT}`,
      Accept: "application/octet-stream",
      "User-Agent": "dusk-builds-gate",
    },
    redirect: "manual",
  });
  // Normally a 302 to a signed URL, but GitHub may answer 200 with the bytes.
  if (r.status === 200) {
    const headers = new Headers(r.headers);
    headers.set("Cache-Control", "no-store");
    return new Response(r.body, { status: 200, headers });
  }
  const loc = r.headers.get("Location");
  if (!loc) return new Response("Not available", { status: 404 });
  return new Response(null, { status: 302, headers: { Location: loc, "Cache-Control": "no-store" } });
}

// The MANUAL.pdf attached to a release, if it has one.
function manualAsset(rel) {
  return (rel.assets || []).find(function (a) {
    return /manual/i.test(a.name) && /\.pdf$/i.test(a.name);
  });
}

// Public: serve the latest release's MANUAL.pdf (free to read; no login).
// Proxies the bytes and serves them INLINE so the browser opens the PDF in a
// tab instead of prompting a download. (Small file, ~1-2 MB.)
async function manual(env) {
  var list = await listReleases(env);
  var rel = pickLatest(list);
  if (!rel) return new Response("Not available", { status: 404 });
  // Normally the manual comes from the same release patrons download. If that one
  // shipped without a PDF, fall back to the newest release that has one rather than
  // 404; a missing manual on one build shouldn't take the public page down.
  var asset = manualAsset(rel);
  for (var i = 0; i < list.length && !asset; i++) asset = manualAsset(list[i]);
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

// Every non-draft release, newest published first. [] on any failure.
async function listReleases(env, repo = env.RELEASES_REPO) {
  return (await fetchReleases(env, repo)) || [];
}

// Like listReleases, but null when GitHub refuses or fails (e.g. a 404 because the
// PAT can't see the repo), so a caller can tell that apart from "no releases".
async function fetchReleases(env, repo) {
  const r = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=30`, {
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
  // so order by publish time explicitly.
  return list
    .filter((x) => !x.draft)
    .sort((a, b) => Date.parse(b.published_at || 0) - Date.parse(a.published_at || 0));
}

// The release patrons get: newest STABLE one. Prereleases used to be everything we shipped
// (the alpha days, when GitHub's /releases/latest would have missed them), but today they're
// single-platform CI artifacts; a Windows-only build must never shadow a full release for
// macOS and Linux patrons. Fall back to a prerelease only if there's no stable release at all,
// so a fresh repo still serves whatever exists. Side releases (e.g. v0.14.0-lgpl-sources, which
// carries only source tarballs) aren't builds; only a plain vX.Y.Z tag counts as the stable one.
const STABLE_TAG = /^v\d+\.\d+\.\d+$/;

function pickLatest(list) {
  return (
    list.find((x) => !x.prerelease && STABLE_TAG.test(x.tag_name || "")) ||
    list.find((x) => !x.prerelease) ||
    list[0] ||
    null
  );
}

async function latestRelease(env) {
  return pickLatest(await listReleases(env));
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

function signIn(env, next = "/latest") {
  const early = next === "/early";
  return page(
    early ? "Early-access plugins" : "Get Dusk Studio builds",
    `<h1>${early ? "Early-access plugins" : "Dusk Studio builds"}</h1>
     <p>${early
       ? "New plugin releases reach Patreon members two weeks before everyone else."
       : "Official Dusk Studio builds are for Patreon members."} Sign in with Patreon to download.</p>
     <p><a class="cta" href="/auth/login?next=${encodeURIComponent(next)}">Sign in with Patreon</a></p>`
  );
}

function notMember(env) {
  return page(
    "Patrons only",
    `<h1>Almost there</h1>
     <p>Your Patreon account isn't an active paid member of Dusk Audio yet. Memberships start at $5 a month and include every Dusk Studio build and early access to new plugin releases:</p>
     <p><a class="cta" href="${escapeHtml(env.PATREON_JOIN_URL || "https://www.patreon.com/cw/DuskAudio/membership")}">Join on Patreon</a></p>`
  );
}

function page(title, body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)} | Dusk Studio</title>
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
