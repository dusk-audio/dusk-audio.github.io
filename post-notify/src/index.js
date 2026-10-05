// Dusk Audio post notifier: Patreon post -> MailerLite campaign, without double emails.
//
// Patreon already emails its own members when a post goes out, so the MailerLite list
// only needs to reach the people who are NOT on Patreon. Flow:
//   Patreon webhook (posts:publish) -> POST /patreon/webhook (HMAC-verified)
//     -> read the campaign's member emails from the Patreon API
//     -> keep a MailerLite group holding every active subscriber who is not on Patreon
//     -> create a campaign for that group (a draft by default; SEND_MODE="send" sends it)
//
// Nobody is ever imported into MailerLite: Patreon emails are only compared against the
// existing list, in memory, and never logged or stored.
//
// Secrets (wrangler secret put): PATREON_WEBHOOK_SECRET, PATREON_CREATOR_TOKEN,
//                                MAILERLITE_API_TOKEN, ADMIN_TOKEN
// Vars (wrangler.toml [vars]):   DUSK_CAMPAIGN_ID, GROUP_NAME, FROM_NAME, FROM_EMAIL,
//                                SEND_MODE, PUBLIC_ONLY

import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";

const ML = "https://connect.mailerlite.com/api";
const PATREON = "https://www.patreon.com/api/oauth2/v2";
const MAX_PAGES = 50; // runaway-pagination guard

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (request.method === "POST" && url.pathname === "/patreon/webhook") return await webhook(request, env);
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

async function webhook(request, env) {
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

  // The marker in the campaign name is what makes a redelivered webhook a no-op.
  const marker = `[patreon:${post.id}]`;
  if (await campaignExists(env, marker)) return json({ ok: true, skipped: "duplicate" });

  const groupId = await ensureGroup(env, true);
  const sync = await syncRecipients(env, groupId, true);
  const campaign = await createCampaign(env, post, marker, groupId, sync.ok);
  return json({ ok: true, deduped: sync.ok, recipients: sync.recipients, ...campaign });
}

// Manual check: POST /sync shows what a sync would change; POST /sync?apply=1 applies it.
// Returns counts only, never addresses.
async function manualSync(request, env, url) {
  const auth = request.headers.get("Authorization") || "";
  if (!env.ADMIN_TOKEN || !safeEqual(auth, `Bearer ${env.ADMIN_TOKEN}`)) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }
  const apply = url.searchParams.get("apply") === "1";
  const groupId = await ensureGroup(env, apply);
  const sync = await syncRecipients(env, groupId, apply);
  return json({ applied: apply, ...sync }, sync.ok ? 200 : 502);
}

/* ---------- Patreon ---------- */

// Patreon signs the raw body: hex HMAC-MD5 keyed by the webhook's secret.
function verifySignature(secret, raw, sig) {
  if (!secret || !sig) return false; // fail closed on misconfig (empty key = forgeable)
  return safeEqual(createHmac("md5", secret).update(raw).digest("hex"), String(sig).trim().toLowerCase());
}

// Lowercased emails of everyone Patreon itself would notify: paying and free members.
// Former patrons are left out; they get nothing from Patreon, so MailerLite still owes them.
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

/* ---------- MailerLite ---------- */

function ml(env, method, path, body) {
  return fetch(ML + path, {
    method,
    headers: {
      Authorization: `Bearer ${env.MAILERLITE_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

// Every row of a cursor-paginated MailerLite listing.
async function mlList(env, path) {
  const rows = [];
  let cursor = "";
  for (let i = 0; i < MAX_PAGES; i++) {
    const r = await ml(env, "GET", cursor ? `${path}&cursor=${encodeURIComponent(cursor)}` : path);
    if (!r.ok) throw new Error(`MailerLite GET ${path.split("?")[0]} ${r.status}`);
    const body = await r.json();
    rows.push(...(body.data || []));
    cursor = body.meta && body.meta.next_cursor;
    if (!cursor) return rows;
  }
  throw new Error(`MailerLite GET ${path.split("?")[0]}: too many pages`);
}

// Id of the recipients group, created on first use. null if it's missing and !create.
async function ensureGroup(env, create) {
  const name = env.GROUP_NAME || "Post notify (not on Patreon)";
  // filter[name] is a partial match, so pick the exact one.
  const groups = await mlList(env, `/groups?filter[name]=${encodeURIComponent(name)}&limit=100`);
  const hit = groups.find((g) => g.name === name);
  if (hit) return hit.id;
  if (!create) return null;
  const r = await ml(env, "POST", "/groups", { name });
  if (!r.ok) throw new Error(`MailerLite create group ${r.status}`);
  return (await r.json()).data.id;
}

// Bring the group in line with "active subscriber AND not on Patreon". Never throws: a
// failed sync returns ok:false, and the caller must then not auto-send (the group may
// still hold someone who has since joined Patreon).
async function syncRecipients(env, groupId, apply) {
  try {
    const onPatreon = await patreonEmails(env);
    // A creator token without the campaigns.members[email] scope returns members with no
    // email. Treating that as "nobody is on Patreon" would email every patron twice.
    if (!onPatreon.size) throw new Error("Patreon returned no member emails (token scope?)");

    const active = await mlList(env, "/subscribers?filter[status]=active&limit=100");
    const inGroup = groupId ? await mlList(env, `/groups/${groupId}/subscribers?limit=1000`) : [];
    const grouped = new Set(inGroup.map((s) => s.id));
    const wanted = active.filter((s) => !onPatreon.has(norm(s.email)));
    const add = wanted.filter((s) => !grouped.has(s.id));
    const remove = inGroup.filter((s) => onPatreon.has(norm(s.email)));

    if (apply && groupId) {
      const requests = [
        ...remove.map((s) => ({ method: "DELETE", path: `api/subscribers/${s.id}/groups/${groupId}` })),
        ...add.map((s) => ({ method: "POST", path: `api/subscribers/${s.id}/groups/${groupId}` })),
      ];
      for (let i = 0; i < requests.length; i += 50) {
        const r = await ml(env, "POST", "/batch", { requests: requests.slice(i, i + 50) });
        if (!r.ok) throw new Error(`MailerLite batch ${r.status}`);
        const res = await r.json();
        if (res.failed) throw new Error(`MailerLite batch: ${res.failed} of ${res.total} changes failed`);
      }
    }
    return {
      ok: true,
      subscribers: active.length,
      alsoOnPatreon: active.length - wanted.length,
      recipients: wanted.length,
      added: add.length,
      removed: remove.length,
    };
  } catch (e) {
    console.error("recipient sync failed:", e && e.message);
    return { ok: false, error: String((e && e.message) || e) };
  }
}

async function campaignExists(env, marker) {
  for (const status of ["draft", "ready", "sent"]) {
    const r = await ml(env, "GET", `/campaigns?filter[status]=${status}&limit=100`);
    if (!r.ok) throw new Error(`MailerLite list campaigns ${r.status}`);
    const rows = (await r.json()).data || [];
    if (rows.some((c) => String(c.name || "").includes(marker))) return true;
  }
  return false;
}

async function createCampaign(env, post, marker, groupId, deduped) {
  const attr = post.attributes || {};
  const title = String(attr.title || "New post from Dusk Audio").slice(0, 200);
  const email = { subject: title, from_name: env.FROM_NAME, from: env.FROM_EMAIL };
  // Flag the draft when dedup could not be confirmed, so nobody sends it on trust.
  const campaign = {
    name: `${deduped ? "" : "[CHECK RECIPIENTS] "}${title} ${marker}`,
    type: "regular",
    groups: [groupId],
  };

  // MailerLite only accepts an HTML body over the API on the Advanced plan. Anywhere else,
  // fall back to a body-less draft: recipients and subject are set, the body is added by hand.
  let hasBody = true;
  let r = await ml(env, "POST", "/campaigns", { ...campaign, emails: [{ ...email, content: emailHtml(post, title) }] });
  if (r.status === 422 || r.status === 403) {
    hasBody = false;
    r = await ml(env, "POST", "/campaigns", { ...campaign, emails: [email] });
  }
  if (!r.ok) throw new Error(`MailerLite create campaign ${r.status}: ${await errText(r)}`);
  const id = (await r.json()).data.id;

  // Only ever send unattended when there is a body and the recipient list is known good.
  let sent = false;
  if (env.SEND_MODE === "send" && hasBody && deduped) {
    const s = await ml(env, "POST", `/campaigns/${id}/schedule`, { delivery: "instant" });
    if (!s.ok) throw new Error(`MailerLite schedule ${s.status}: ${await errText(s)}`);
    sent = true;
  }
  return { campaignId: id, hasBody, sent };
}

async function errText(r) {
  try {
    return String((await r.json()).message || "").slice(0, 200);
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
function excerpt(attr) {
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
  if (text.length <= 400) return text;
  return text.slice(0, 400).replace(/\s+\S*$/, "") + "…";
}

// A light email palette keeps the message readable across email clients.
function emailHtml(post, title) {
  const attr = post.attributes || {};
  const teaser = excerpt(attr) || (attr.is_public ? "" : "A new post for Dusk Audio patrons is up on Patreon.");
  const url = escapeHtml(postUrl(post));
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#faf8f3;color:#211e1a;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif">
<div style="max-width:560px;margin:0 auto;padding:40px 20px">
  <p style="margin:0 0 8px;color:#847c70;font-size:14px">Dusk Audio</p>
  <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#211e1a">${escapeHtml(title)}</h1>
  ${teaser ? `<p style="margin:0 0 24px">${escapeHtml(teaser)}</p>` : ""}
  <p style="margin:0 0 32px"><a href="${url}" style="display:inline-block;padding:12px 20px;background:#2c6e8f;color:#ffffff;border-radius:8px;font-weight:600;text-decoration:none">Read it on Patreon</a></p>
  <p style="margin:0;padding-top:16px;border-top:1px solid #e2dacb;color:#847c70;font-size:13px">You signed up for Dusk Audio updates at duskaudio.com. <a href="{$unsubscribe}" style="color:#2c6e8f">Unsubscribe</a></p>
</div></body></html>`;
}

/* ---------- helpers ---------- */

function norm(email) {
  return String(email || "").trim().toLowerCase();
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}
