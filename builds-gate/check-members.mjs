// Dry run of the gate against every member of the campaign, with their live Patreon data.
//
// Reads the campaign's members with the creator's access token, then signs each one in
// through the real Worker code (src/index.js), with Patreon's identity reply built from
// that member's own patron_status and currently_entitled_amount_cents. Nothing is sent
// to the deployed gate or to GitHub. Prints counts per outcome, and by name only the
// members worth a look: any active patron Patreon last charged successfully whom the
// gate refuses.
//
//   node builds-gate/check-members.mjs            (from the repo root)
//
// It asks for the "Creator's Access Token" of the Patreon API client (Patreon ->
// developer portal -> Clients & API Keys) without echoing it, or reads it from
// PATREON_CREATOR_TOKEN. The token never leaves this process.

import worker from "./src/index.js";

const CAMPAIGN = "14880404"; // wrangler.toml DUSK_CAMPAIGN_ID
const API = process.env.PATREON_API || "https://www.patreon.com/api/oauth2/v2";
const token = process.env.PATREON_CREATOR_TOKEN || (await askToken());
if (!token) {
  console.error("No token given.");
  process.exit(2);
}

// Reads one line from the terminal without showing it, so the token stays out of the
// screen and the shell history.
function askToken() {
  if (!process.stdin.isTTY) {
    console.error("Run this in a terminal, or set PATREON_CREATOR_TOKEN.");
    process.exit(2);
  }
  process.stdout.write("Creator's Access Token (hidden; paste, then Enter): ");
  process.stdin.setRawMode(true);
  process.stdin.setEncoding("utf8");
  process.stdin.resume();
  let typed = "";
  return new Promise((resolve) => {
    process.stdin.on("data", function onData(chunk) {
      for (const ch of chunk.replace(/\x1b\[20[01]~/g, "")) {
        if (ch === "\u0003") process.exit(130); // Ctrl-C
        if (ch === "\r" || ch === "\n") {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.removeListener("data", onData);
          process.stdout.write("\n");
          return resolve(typed.trim());
        }
        typed = ch === "\u007f" || ch === "\b" ? typed.slice(0, -1) : typed + ch;
      }
    });
  });
}

async function members() {
  const all = [];
  let cursor = "";
  for (let page = 0; page < 50; page++) {
    const q = new URLSearchParams({
      include: "user",
      "fields[member]": "full_name,patron_status,currently_entitled_amount_cents,last_charge_status,last_charge_date",
      "fields[user]": "full_name",
      "page[count]": "1000",
    });
    if (cursor) q.set("page[cursor]", cursor);
    const r = await fetch(`${API}/campaigns/${CAMPAIGN}/members?${q}`, {
      headers: { Authorization: `Bearer ${token}`, "User-Agent": "dusk-check-members" },
    });
    if (!r.ok) throw new Error(`Patreon members: HTTP ${r.status}`);
    const body = await r.json();
    all.push(...(body.data || []));
    cursor = body.meta && body.meta.pagination && body.meta.pagination.cursors && body.meta.pagination.cursors.next;
    if (!cursor) return all;
  }
  throw new Error("Patreon members: too many pages");
}

// The Worker's env, as wrangler.toml sets it. Secrets are placeholders: the dry run
// never reaches GitHub or Patreon's token endpoint.
const env = {
  DUSK_CAMPAIGN_ID: CAMPAIGN,
  DUSK_CREATOR_USER_ID: "187471121",
  OAUTH_REDIRECT_URI: "https://builds.duskaudio.com/auth/callback",
  SESSION_TTL_HOURS: "6",
  FREE_DOWNLOADS: "0",
  SESSION_SECRET: "dry-run",
  PATREON_CLIENT_ID: "dry-run",
  PATREON_CLIENT_SECRET: "dry-run",
};

// One sign-in through the real login and callback, with Patreon's two replies stubbed.
async function gateVerdict(identity) {
  const realFetch = globalThis.fetch;
  const realLog = console.log;
  let line = null;
  globalThis.fetch = async (input) => {
    const u = String(input);
    if (u.startsWith("https://www.patreon.com/api/oauth2/token")) return new Response(JSON.stringify({ access_token: "x" }));
    if (u.startsWith("https://www.patreon.com/api/oauth2/v2/identity")) return new Response(JSON.stringify(identity));
    throw new Error(`dry run tried to fetch ${u}`);
  };
  console.log = (s) => { line = JSON.parse(s); };
  try {
    const login = await worker.fetch(new Request("https://builds.duskaudio.com/auth/login?next=%2Flatest"), env);
    const state = new URL(login.headers.get("Location")).searchParams.get("state");
    const jar = login.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
    await worker.fetch(new Request(`https://builds.duskaudio.com/auth/callback?code=x&state=${state}`, { headers: { Cookie: jar } }), env);
  } finally {
    globalThis.fetch = realFetch;
    console.log = realLog;
  }
  return line;
}

const list = await members();
const counts = new Map();
const look = [];
for (const m of list) {
  const a = m.attributes || {};
  const userId = m.relationships && m.relationships.user && m.relationships.user.data && m.relationships.user.data.id;
  const identity = {
    data: { id: userId || `member-${m.id}`, type: "user", attributes: { full_name: a.full_name || "" } },
    included: [{
      type: "member",
      attributes: { patron_status: a.patron_status ?? null, currently_entitled_amount_cents: a.currently_entitled_amount_cents ?? 0 },
      relationships: { campaign: { data: { type: "campaign", id: CAMPAIGN } } },
    }],
  };
  const v = await gateVerdict(identity);
  const key = v.outcome === "admitted" ? "admitted" : `${v.outcome}: ${v.reason || v.why}`;
  counts.set(key, (counts.get(key) || 0) + 1);
  // Patreon says the last charge went through, yet the gate says no: the case that matters.
  if (v.outcome !== "admitted" && a.last_charge_status === "Paid" && a.patron_status === "active_patron") {
    look.push(`${a.full_name || "(no name)"}: ${a.patron_status}, ${a.currently_entitled_amount_cents} cents, last charge ${a.last_charge_date || "?"} -> ${key}`);
  }
}

console.log(`${list.length} members`);
for (const [k, n] of [...counts].sort((x, y) => y[1] - x[1])) console.log(`  ${String(n).padStart(4)}  ${k}`);
console.log(look.length ? `\nActive patrons Patreon last charged successfully, refused by the gate:\n  ${look.join("\n  ")}` : "\nEvery active patron Patreon last charged successfully gets in.");
process.exit(look.length ? 1 : 0);
