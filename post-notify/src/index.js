// Dusk Audio newsletter Worker on Kit: the website signup, and Patreon post -> Kit broadcast
// without double emails.
//
// Signup: the duskaudio.com form posts to POST /subscribe. The Worker checks the visitor's
// Cloudflare Turnstile token, then adds the address to the Kit form, and Kit sends its own
// confirmation email (double opt-in). The Kit form id never appears on the site.
//
// Patreon already emails its own members when a post goes out, so the newsletter only needs
// to reach the people who are NOT on Patreon. Flow:
//   Patreon webhook (posts:publish) -> POST /patreon/webhook (HMAC-verified)
//     -> read the campaign's member emails from the Patreon API
//     -> keep a Kit tag on every subscriber who is on Patreon
//     -> create a broadcast for everyone without that tag (a draft by default;
//        SEND_MODE="send" schedules it ten minutes out)
//
// Nobody is ever imported into Kit: Patreon emails are only compared against the existing
// list, in memory, and never logged or stored. Signup addresses are never logged either.
//
// Secrets (wrangler secret put): PATREON_WEBHOOK_SECRET, PATREON_CREATOR_TOKEN, KIT_API_KEY,
//                                TURNSTILE_SECRET, ADMIN_TOKEN
// Vars (wrangler.toml [vars]):   DUSK_CAMPAIGN_ID, TAG_NAME, KIT_FORM_ID, ALLOWED_ORIGINS,
//                                TURNSTILE_HOSTNAME, SEND_MODE, PUBLIC_ONLY

import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";

const KIT = "https://api.kit.com/v4";
const PATREON = "https://www.patreon.com/api/oauth2/v2";
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_PAGES = 50; // runaway-pagination guard
// Tag changes per run. Kit's bulk endpoints need OAuth, so each change is one call, and a
// run must stay inside the Workers Free limit of 50 subrequests.
const MAX_CHANGES = 30;
// Kit's lists can take minutes to show tag changes; give a fresh sync time to settle.
const SEND_DELAY_MS = 10 * 60 * 1000;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/subscribe") {
        if (request.method === "POST") return await subscribe(request, env);
        if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(env, request) });
      }
      if (request.method === "POST" && url.pathname === "/patreon/webhook") return await webhook(request, env, ctx);
      if (request.method === "POST" && url.pathname === "/sync") return await manualSync(request, env, url);
      return new Response("Not found", { status: 404 });
    } catch (e) {
      // A 5xx makes Patreon retry; the duplicate check keeps a retry from double-posting.
      console.error("post-notify failed:", e && e.message);
      return json({ ok: false, error: "internal" }, 500);
    }
  },
};

/* ---------- routes ---------- */

// The website's signup form. Turnstile keeps bots out (October's wave posted straight to the
// old provider's public form endpoint), and Kit's confirmation email keeps out anyone who
// typed someone else's address. New and existing addresses get the same answer.
async function subscribe(request, env) {
  const headers = cors(env, request);
  // A form posted without JavaScript has no Turnstile token, and its answer is a page.
  if (request.headers.get("Sec-Fetch-Mode") === "navigate") {
    return new Response(NO_SCRIPT_PAGE, { status: 403, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  let form;
  try {
    form = await request.formData();
  } catch (_e) {
    form = new FormData();
  }
  // Checked before the token, so a typo doesn't use up the visitor's spam check.
  const email = norm(form.get("email"));
  if (!validEmail(email)) return json({ ok: false, error: "email" }, 400, headers);

  const verdict = await turnstile(env, form.get("cf-turnstile-response"), request.headers.get("CF-Connecting-IP"));
  if (verdict === "error") return json({ ok: false, error: "upstream" }, 502, headers);
  if (verdict !== "ok") return json({ ok: false, error: "captcha" }, 403, headers);

  try {
    // A new address starts inactive, so the form's double opt-in applies. An existing
    // subscriber keeps their state: Kit doesn't change it here.
    const created = await kit(env, "POST", "/subscribers", { email_address: email, state: "inactive" });
    // Kit's own address check can be stricter than ours.
    if (created.status === 422) return json({ ok: false, error: "email" }, 400, headers);
    if (!created.ok) throw new Error(`Kit create subscriber ${created.status}`);
    // Adding to the form is what sends Kit's confirmation email (at most one per 12 hours).
    const entry = { email_address: email };
    const referrer = siteReferrer(env, form.get("referrer"));
    if (referrer) entry.referrer = referrer;
    const added = await kit(env, "POST", `/forms/${env.KIT_FORM_ID}/subscribers`, entry);
    if (!added.ok) throw new Error(`Kit add to form ${added.status}`);
  } catch (e) {
    console.error("subscribe failed:", e && e.message);
    return json({ ok: false, error: "upstream" }, 502, headers);
  }
  return json({ ok: true }, 200, headers);
}

async function webhook(request, env, ctx) {
  const raw = await request.text();
  if (!verifySignature(env.PATREON_WEBHOOK_SECRET, raw, request.headers.get("X-Patreon-Signature"))) {
    return json({ ok: false, error: "bad signature" }, 401);
  }
  if (request.headers.get("X-Patreon-Event") !== "posts:publish") return json({ ok: true, skipped: "event" });

  let post;
  try {
    post = JSON.parse(raw).data;
  } catch (_e) {
    post = null;
  }
  if (!post || !post.id) return json({ ok: false, error: "bad payload" }, 400);
  const attr = post.attributes || {};
  if (env.PUBLIC_ONLY === "1" && !attr.is_public) return json({ ok: true, skipped: "not public" });

  // Patreon gives up after 5 seconds and pauses the webhook after repeated timeouts, while
  // reading every member and syncing the tag takes longer. So acknowledge now and do the
  // work after the response. A failure there is logged, not retried by Patreon; the draft's
  // absence in Kit and `wrangler tail` show it.
  if (ctx && ctx.waitUntil) {
    ctx.waitUntil(
      publish(env, post).then(
        (out) => console.log("post-notify:", JSON.stringify({ post: post.id, ...out })),
        (e) => console.error("post-notify failed:", post.id, e && e.message),
      ),
    );
    return json({ ok: true, queued: true }, 202);
  }
  return json(await publish(env, post));
}

// Everything after the webhook is accepted. Returns counts and ids only, never addresses.
async function publish(env, post) {
  // The marker in the broadcast's internal description makes a redelivered webhook a no-op.
  const marker = `[patreon:${post.id}]`;
  if (await broadcastExists(env, marker)) return { ok: true, skipped: "duplicate" };

  const tagId = await ensureTag(env, true);
  const sync = await syncTag(env, tagId, true);
  const broadcast = await createBroadcast(env, post, marker, tagId, sync.ok);
  return { ok: true, deduped: sync.ok, recipients: sync.recipients, ...broadcast };
}

// Manual check: POST /sync shows what a sync would change; POST /sync?apply=1 applies it,
// up to MAX_CHANGES per call (repeat until "remaining" is 0). Counts only, never addresses.
async function manualSync(request, env, url) {
  const auth = request.headers.get("Authorization") || "";
  if (!env.ADMIN_TOKEN || !safeEqual(auth, `Bearer ${env.ADMIN_TOKEN}`)) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }
  const apply = url.searchParams.get("apply") === "1";
  const tagId = await ensureTag(env, apply);
  const sync = await syncTag(env, tagId, apply);
  return json({ applied: apply, ...sync }, sync.error ? 502 : 200);
}

/* ---------- Patreon ---------- */

// Patreon signs the raw body: hex HMAC-MD5 keyed by the webhook's secret.
function verifySignature(secret, raw, sig) {
  if (!secret || !sig) return false; // fail closed on misconfig (empty key = forgeable)
  return safeEqual(createHmac("md5", secret).update(raw).digest("hex"), String(sig).trim().toLowerCase());
}

// Lowercased emails of everyone Patreon itself would notify: paying and free members.
// Former patrons are left out; they get nothing from Patreon, so the newsletter still owes them.
async function patreonEmails(env) {
  const emails = new Set();
  let cursor = "";
  for (let i = 0; i < MAX_PAGES; i++) {
    const q = new URLSearchParams({ "fields[member]": "email,patron_status", "page[count]": "1000" });
    if (cursor) q.set("page[cursor]", cursor);
    const r = await fetch(`${PATREON}/campaigns/${env.DUSK_CAMPAIGN_ID}/members?${q}`, {
      headers: { Authorization: `Bearer ${env.PATREON_CREATOR_TOKEN}`, "User-Agent": "dusk-post-notify" },
    });
    if (!r.ok) throw new Error(`Patreon members ${r.status}`);
    const body = await r.json();
    for (const m of body.data || []) {
      const a = m.attributes || {};
      if (a.email && a.patron_status !== "former_patron") emails.add(norm(a.email));
    }
    cursor = body.meta && body.meta.pagination && body.meta.pagination.cursors && body.meta.pagination.cursors.next;
    if (!cursor) return emails;
  }
  throw new Error("Patreon members: too many pages");
}

/* ---------- Turnstile ---------- */

// "ok", "refused" (missing, bad, expired, reused or foreign token) or "error" (siteverify
// unreachable). A missing secret refuses everything rather than letting everything in.
async function turnstile(env, token, ip) {
  // A missing or wrong secret would fail every signup. That is our fault, not the visitor's,
  // so it is an "error" (try again later) and goes to the log.
  if (!env.TURNSTILE_SECRET) {
    console.error("subscribe: TURNSTILE_SECRET is not set");
    return "error";
  }
  if (!token || String(token).length > 2048) return "refused";
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: String(token) });
  if (ip) body.set("remoteip", ip);
  let r;
  try {
    r = await fetch(SITEVERIFY, { method: "POST", body });
  } catch (_e) {
    return "error";
  }
  if (!r.ok) return "error";
  const v = await r.json();
  if (v.success !== true) {
    const codes = v["error-codes"] || [];
    if (codes.includes("invalid-input-secret")) {
      console.error("subscribe: siteverify rejected TURNSTILE_SECRET");
      return "error";
    }
    return codes.includes("internal-error") ? "error" : "refused";
  }
  // Turnstile already limits the sitekey to its hostnames; this checks it once more.
  if (env.TURNSTILE_HOSTNAME && v.hostname !== env.TURNSTILE_HOSTNAME) return "refused";
  return "ok";
}

/* ---------- Kit ---------- */

function kit(env, method, path, body) {
  return fetch(KIT + path, {
    method,
    headers: {
      "X-Kit-Api-Key": env.KIT_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

// Every row of a cursor-paginated Kit listing; `key` names the array in the reply.
async function kitList(env, path, key) {
  const rows = [];
  let after = "";
  for (let i = 0; i < MAX_PAGES; i++) {
    const r = await kit(env, "GET", after ? `${path}&after=${encodeURIComponent(after)}` : path);
    if (!r.ok) throw new Error(`Kit GET ${path.split("?")[0]} ${r.status}`);
    const body = await r.json();
    rows.push(...(body[key] || []));
    const page = body.pagination || {};
    if (!page.has_next_page || !page.end_cursor) return rows;
    after = page.end_cursor;
  }
  throw new Error(`Kit GET ${path.split("?")[0]}: too many pages`);
}

// Id of the Patreon tag, created on first use. null if it's missing and !create.
async function ensureTag(env, create) {
  const name = env.TAG_NAME || "Patreon member (auto)";
  // Kit tag names are unique regardless of case.
  const tags = await kitList(env, "/tags?per_page=1000", "tags");
  const hit = tags.find((t) => String(t.name).toLowerCase() === name.toLowerCase());
  if (hit) return hit.id;
  if (!create) return null;
  const r = await kit(env, "POST", "/tags", { name });
  if (!r.ok) throw new Error(`Kit create tag ${r.status}`);
  return (await r.json()).tag.id;
}

// Bring the tag in line with "Kit subscriber AND on Patreon". Never throws. ok:false means
// the tag may still miss someone who has since joined Patreon (a failed read, or changes left
// over the per-run cap), and the caller must then not auto-send.
async function syncTag(env, tagId, apply) {
  try {
    const onPatreon = await patreonEmails(env);
    // A creator token without the campaigns.members[email] scope returns members with no
    // email. Treating that as "nobody is on Patreon" would email every patron twice.
    if (!onPatreon.size) throw new Error("Patreon returned no member emails (token scope?)");

    // Every state, so an unconfirmed patron is already left out once they confirm.
    const everyone = await kitList(env, "/subscribers?status=all&per_page=1000&slim=true", "subscribers");
    const tagged = tagId
      ? await kitList(env, `/tags/${tagId}/subscribers?status=all&per_page=1000&slim=true`, "subscribers")
      : [];
    const isTagged = new Set(tagged.map((s) => s.id));
    const add = everyone.filter((s) => onPatreon.has(norm(s.email_address)) && !isTagged.has(s.id));
    const remove = tagged.filter((s) => !onPatreon.has(norm(s.email_address)));

    let added = 0;
    let removed = 0;
    if (apply) {
      const changes = [...remove.map((s) => ["DELETE", s.id]), ...add.map((s) => ["POST", s.id])];
      for (const [method, id] of changes.slice(0, MAX_CHANGES)) {
        const r = await kit(env, method, `/tags/${tagId}/subscribers/${id}`);
        if (!r.ok) throw new Error(`Kit ${method === "POST" ? "tag" : "untag"} subscriber ${r.status}`);
        if (method === "POST") added++;
        else removed++;
      }
    }
    const remaining = add.length + remove.length - added - removed;

    const active = everyone.filter((s) => s.state === "active");
    const alsoOnPatreon = active.filter((s) => onPatreon.has(norm(s.email_address))).length;
    // A dry run reports the changes it would make; an applied run, the ones it made.
    return {
      ok: !apply || remaining === 0,
      subscribers: active.length,
      alsoOnPatreon,
      recipients: active.length - alsoOnPatreon,
      added: apply ? added : add.length,
      removed: apply ? removed : remove.length,
      remaining,
    };
  } catch (e) {
    console.error("recipient sync failed:", e && e.message);
    return { ok: false, error: String((e && e.message) || e) };
  }
}

// Kit has no search on broadcasts, so this reads their internal descriptions.
async function broadcastExists(env, marker) {
  const broadcasts = await kitList(env, "/broadcasts?per_page=1000&slim=true", "broadcasts");
  return broadcasts.some((b) => String(b.description || "").includes(marker));
}

async function createBroadcast(env, post, marker, tagId, deduped) {
  const attr = post.attributes || {};
  const title = String(attr.title || "New post from Dusk Audio").slice(0, 200);
  // Only ever send unattended when the recipient list is known good.
  const send = env.SEND_MODE === "send" && deduped;
  const r = await kit(env, "POST", "/broadcasts", {
    // Kit's broadcast list shows subjects, so a draft nobody should send on trust says so there.
    subject: `${deduped ? "" : "[CHECK RECIPIENTS] "}${liquidSafe(title)}`,
    preview_text: liquidSafe(teaser(attr, 140)),
    content: emailHtml(post, title),
    description: `${title} ${marker}`,
    public: false,
    published_at: null,
    // Ten minutes out: fresh tag changes settle, and there's still time to unschedule in Kit.
    send_at: send ? new Date(Date.now() + SEND_DELAY_MS).toISOString() : null,
    email_address: null, // Kit's default sending address
    thumbnail_url: null,
    thumbnail_alt: null,
    // Everyone without the Patreon tag. Kit allows a single filter group, so "none" alone.
    subscriber_filter: [{ all: null, any: null, none: [{ type: "tag", ids: [tagId] }] }],
  });
  if (!r.ok) throw new Error(`Kit create broadcast ${r.status}: ${await errText(r)}`);
  return { broadcastId: (await r.json()).broadcast.id, scheduled: send };
}

async function errText(r) {
  try {
    return String(((await r.json()).errors || []).join("; ")).slice(0, 200);
  } catch (_e) {
    return "";
  }
}

/* ---------- email body ---------- */

function postUrl(post) {
  const fallback = `https://www.patreon.com/posts/${encodeURIComponent(post.id)}`;
  try {
    const u = new URL((post.attributes || {}).url || fallback, "https://www.patreon.com");
    return u.protocol === "https:" ? u.toString() : fallback;
  } catch (_e) {
    return fallback;
  }
}

// Plain-text teaser. Public posts only: a patron-only post's text must not leak by email.
function excerpt(attr, max = 400) {
  if (!attr.is_public || !attr.content) return "";
  const text = String(attr.content)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function teaser(attr, max) {
  return excerpt(attr, max) || (attr.is_public ? "" : "A new post for Dusk Audio patrons is up on Patreon.");
}

// The body only: Kit's template wraps it and adds the unsubscribe link and postal address.
// A light email palette keeps the message readable across email clients.
function emailHtml(post, title) {
  const text = teaser(post.attributes || {});
  const url = escapeHtml(postUrl(post));
  return `<div style="max-width:560px;margin:0 auto;color:#211e1a;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif">
  <p style="margin:0 0 8px;color:#847c70;font-size:14px">Dusk Audio</p>
  <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#211e1a">${escapeHtml(title)}</h1>
  ${text ? `<p style="margin:0 0 24px">${escapeHtml(text)}</p>` : ""}
  <p style="margin:0 0 32px"><a href="${url}" style="display:inline-block;padding:12px 20px;background:#2c6e8f;color:#ffffff;border-radius:8px;font-weight:600;text-decoration:none">Read it on Patreon</a></p>
  <p style="margin:0;padding-top:16px;border-top:1px solid #e2dacb;color:#847c70;font-size:13px">You signed up for Dusk Audio updates at duskaudio.com.</p>
</div>`;
}

/* ---------- helpers ---------- */

function norm(email) {
  return String(email || "").trim().toLowerCase();
}

function validEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// The page the visitor signed up on, if it's on the site; Kit records it with the signup.
function siteReferrer(env, referrer) {
  const ref = String(referrer || "");
  return allowedOrigins(env).some((o) => ref.startsWith(`${o}/`)) ? ref.slice(0, 500) : null;
}

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Lets the site's own pages read the answer to their fetch; other origins get no CORS grant.
function cors(env, request) {
  const origin = request.headers.get("Origin");
  if (!origin || !allowedOrigins(env).includes(origin)) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

// Kit renders Liquid in subjects and bodies, so text from a post must not open a tag.
function liquidSafe(s) {
  return String(s).replace(/\{(?=[{%])/g, "{ ");
}

// Braces are encoded too: Kit renders Liquid, and the entities still display as braces.
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"'{}]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "{": "&#123;", "}": "&#125;" }[c]),
  );
}

function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...headers } });
}

const NO_SCRIPT_PAGE = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Dusk Audio email updates</title></head>
<body style="max-width:560px;margin:40px auto;padding:0 20px;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
<p>Signing up needs JavaScript for the spam check. Turn JavaScript on, then try again at <a href="https://duskaudio.com/#newsletter">duskaudio.com</a>.</p>
</body></html>`;
