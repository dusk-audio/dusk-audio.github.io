// Dusk Studio build gate — tokenized delivery (Option A).
//
// Patreon already gates the post ($1+), so anyone with the link is a verified patron.
// This Worker serves the PRIVATE-repo builds to anyone holding the current access token.
// The GitHub PAT never leaves the Worker; the patron gets a short-lived signed GitHub URL.
//
// Link to paste in a $1+ gated Patreon post:
//   https://builds.duskaudio.com/latest?t=<DL_TOKEN>
// Rotate DL_TOKEN if a link leaks; old links stop working immediately.
//
// Secrets (wrangler secret put): DL_TOKEN, GH_PAT
// Vars (wrangler.toml [vars]): RELEASES_REPO, PATREON_JOIN_URL

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    const t = url.searchParams.get("t") || "";
    try {
      if (p === "/") return htmlResp(landing(env));
      if (p === "/manual") return manual(env); // public: the manual is free to read
      if (p === "/latest") return latestPage(env, t);
      if (p.startsWith("/dl/")) return download(env, decodeURIComponent(p.slice(4)), t);
      return new Response("Not found", { status: 404 });
    } catch (_e) {
      return htmlResp(page("Something went wrong", "<p>Try again in a moment.</p>"), 500);
    }
  },
};

function tokenOk(env, t) {
  return !!env.DL_TOKEN && safeEqual(t, env.DL_TOKEN);
}

async function latestPage(env, t) {
  if (!tokenOk(env, t)) return htmlResp(forbidden(env), 403);
  const rel = await latestRelease(env);
  if (!rel) return htmlResp(page("Builds", "<p>No build published yet. Check back soon.</p>"));

  const tEnc = encodeURIComponent(t);
  const assets = rel.assets || [];
  const items = assets.length
    ? assets
        .map(
          (a) =>
            `<li><a href="/dl/${a.id}?t=${tEnc}">${escapeHtml(a.name)}</a> <span class="sz">${(a.size / 1048576).toFixed(1)} MB</span></li>`
        )
        .join("")
    : "<li>No files attached to this release.</li>";

  const body = `
    <h1>${escapeHtml(rel.name || rel.tag_name || "Latest build")}</h1>
    <p class="tag">${escapeHtml(rel.tag_name || "")}</p>
    <ul class="files">${items}</ul>
    <p class="muted">Patrons-only link. Please don't share it.</p>`;
  return htmlResp(page("Your Dusk Studio build", body), 200, { "Cache-Control": "no-store" });
}

async function download(env, id, t) {
  if (!tokenOk(env, t)) return htmlResp(forbidden(env), 403);
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

// Newest non-draft release, INCLUDING prereleases (alpha builds are tagged prerelease,
// so GitHub's /releases/latest — which skips prereleases — would miss them).
// Public: serve the latest release's MANUAL.pdf (free to read; no token).
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

async function latestRelease(env) {
  const r = await fetch(`https://api.github.com/repos/${env.RELEASES_REPO}/releases?per_page=10`, {
    headers: {
      Authorization: `Bearer ${env.GH_PAT}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "dusk-builds-gate",
    },
  });
  if (!r.ok) return null;
  const list = await r.json();
  return Array.isArray(list) ? list.find((x) => !x.draft) || null : null;
}

/* ---------- helpers ---------- */

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function forbidden(env) {
  return page(
    "Patrons only",
    `<p>This download link is for active patrons. Become one to get every build:</p>
     <p><a class="cta" href="${escapeHtml(env.PATREON_JOIN_URL || "https://www.patreon.com/cw/DuskAudio/membership")}">Get access on Patreon</a></p>`
  );
}

function landing(env) {
  return page(
    "Dusk Studio builds",
    `<h1>Dusk Studio builds</h1>
     <p>Official builds are for active patrons. The download link is in the patrons-only Patreon posts.</p>
     <p><a class="cta" href="${escapeHtml(env.PATREON_JOIN_URL || "https://www.patreon.com/cw/DuskAudio/membership")}">Get access on Patreon</a></p>`
  );
}

function page(title, body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)} — Dusk Studio</title>
<style>
  :root{color-scheme:dark}
  body{margin:0;background:#0b0b0c;color:#f4f4f3;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
  main{max-width:640px;margin:0 auto;padding:56px 20px}
  h1{font-size:1.6rem;margin:0 0 8px}
  a{color:#f2935f}
  .tag{color:#7c7c84;margin-top:0}
  .muted{color:#7c7c84;font-size:.9rem}
  ul.files{list-style:none;padding:0}
  ul.files li{padding:12px 0;border-bottom:1px solid #2a2a30}
  .sz{color:#7c7c84;font-size:.85rem;margin-left:8px}
  .cta{display:inline-block;margin:8px 0;padding:12px 20px;background:#e8794a;color:#160a04;border-radius:10px;font-weight:600;text-decoration:none}
</style></head><body><main>${body}</main></body></html>`;
}

function htmlResp(html, status = 200, extraHeaders = {}) {
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=UTF-8", ...extraHeaders } });
}
