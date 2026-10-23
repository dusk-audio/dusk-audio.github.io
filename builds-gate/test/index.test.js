import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import worker from "../src/index.js";

// The gate against a fake GitHub API: EARLY_REPO's releases come from `releases`,
// RELEASES_REPO's from `builds`, both paged the way GitHub pages them.
const env = { EARLY_REPO: "o/early", RELEASES_REPO: "o/builds", GH_PAT: "pat", FREE_DOWNLOADS: "0", SESSION_SECRET: "s" };

// A ds_sess cookie signed the way the Worker signs one (HMAC-SHA256, base64url).
async function sessionCookie(secret, ttlSeconds) {
  const enc = new TextEncoder();
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + ttlSeconds })).toString("base64url");
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = Buffer.from(await crypto.subtle.sign("HMAC", key, enc.encode(payload))).toString("base64url");
  return `ds_sess=${payload}.${sig}`;
}
const member = await sessionCookie(env.SESSION_SECRET, 3600);

let releases, builds, failPage, notJson, fetched, realFetch, patreon, refusedAssets, brokenObjects;

let nextReleaseId = 1;
function rel(tag, published, firstLine, extra = {}) {
  return {
    id: nextReleaseId++,
    tag_name: tag,
    name: tag,
    draft: false,
    published_at: published,
    body: `${firstLine}\n\nNotes.`,
    assets: [{ id: Number(published.replace(/\D/g, "").slice(0, 9)), name: `${tag}.zip`, size: 1048576 }],
    ...extra,
  };
}
const dated = (date) => `**Early access for Dusk Audio Patreon members.** Free for everyone on ${date}.`;
const membersOnly = "**Members-only prerelease for Dusk Audio Patreon members.** Not public until the stable release.";

beforeEach(() => {
  releases = [];
  builds = [];
  failPage = 0;
  notJson = false;
  fetched = [];
  // Patreon's token exchange answers tokenStatus (with tokenError when it fails); the
  // identity call answers `identity`.
  patreon = { tokenStatus: 200, tokenError: null, identity: null };
  // Asset ids GitHub won't hand out (404), and signed URLs that fail (403).
  refusedAssets = new Set();
  brokenObjects = new Set();
  realFetch = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    fetched.push(url.toString());
    if (url.hostname === "www.patreon.com" && url.pathname === "/api/oauth2/token") {
      const body = patreon.tokenStatus === 200 ? { access_token: "tok" } : { error: patreon.tokenError };
      return new Response(JSON.stringify(body), { status: patreon.tokenStatus });
    }
    if (url.hostname === "www.patreon.com" && url.pathname === "/api/oauth2/v2/identity") {
      return new Response(JSON.stringify(patreon.identity), { status: 200 });
    }
    const listing = url.hostname === "api.github.com" && url.pathname.match(/^\/repos\/(o\/early|o\/builds)\/releases$/);
    if (listing) {
      // GitHub's default page size is 30 and its largest 100.
      const perPage = Math.min(100, Number(url.searchParams.get("per_page") || 30));
      const page = Number(url.searchParams.get("page") || 1);
      if (page === failPage) return new Response("unavailable", { status: 502 });
      if (notJson) return new Response("<html>busy</html>", { status: 200 });
      const all = listing[1] === "o/early" ? releases : builds;
      return new Response(JSON.stringify(all.slice((page - 1) * perPage, page * perPage)), { status: 200 });
    }
    const asset = url.hostname === "api.github.com" && url.pathname.match(/^\/repos\/o\/(early|builds)\/releases\/assets\/(\d+)$/);
    if (asset) {
      if (refusedAssets.has(asset[2])) return new Response("Not Found", { status: 404 });
      return new Response(null, { status: 302, headers: { Location: `https://objects.example/${asset[2]}` } });
    }
    if (url.hostname === "objects.example") return new Response(null, { status: brokenObjects.has(url.pathname.slice(1)) ? 403 : 200 });
    throw new Error(`unexpected fetch ${url}`);
  };
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

async function get(path, e = env, cookie = member) {
  const headers = cookie ? { Cookie: cookie } : {};
  const r = await worker.fetch(new Request(`https://builds.example${path}`, { headers }), e);
  return { status: r.status, html: await r.text(), location: r.headers.get("Location") };
}
const early = (e = env, cookie = member) => get("/early", e, cookie);

test("lists a dated release inside its window and drops one past it", async () => {
  releases = [rel("4k-eq-2-v1.0.6", "2026-10-17T10:00:00Z", dated("2999-01-01")),
              rel("tapemachine-2-v1.0.12", "2026-10-01T10:00:00Z", dated("2000-01-01"))];
  const { status, html } = await early();
  assert.equal(status, 200);
  assert.match(html, /4k-eq-2-v1\.0\.6/);
  assert.match(html, /Free for everyone on 2999-01-01/);
  assert.doesNotMatch(html, /tapemachine-2-v1\.0\.12/);
});

test("lists a members-only prerelease with no date", async () => {
  releases = [rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly, { prerelease: true })];
  const { html } = await early();
  assert.match(html, /multi-comp-2-v1\.1\.0-alpha1/);
  assert.match(html, /<p class="tag">Members-only prerelease<\/p>/);
  assert.match(html, /href="\/edl\/\d+"/);
});

test("a members-only prerelease is labelled members-only even if its notes hold a date", async () => {
  releases = [rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly,
                  { body: `${membersOnly}\n\nChangelog: Free for everyone on 2999-01-01.` })];
  const { html } = await early();
  assert.match(html, /<p class="tag">Members-only prerelease<\/p>/);
  assert.doesNotMatch(html, /<p class="tag">Free for everyone/);
});

test("only a plugin's newest prerelease is listed", async () => {
  releases = [rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly),
              rel("multi-comp-2-v1.1.0-alpha2", "2026-10-25T10:00:00Z", membersOnly)];
  const { html } = await early();
  assert.match(html, /alpha2/);
  assert.doesNotMatch(html, /alpha1/);
});

test("a later stable release replaces the prerelease, even after its own window", async () => {
  releases = [rel("multi-comp-2-v1.1.0-alpha2", "2026-10-25T10:00:00Z", membersOnly),
              rel("multi-comp-2-v1.1.0", "2026-11-01T10:00:00Z", dated("2000-01-01"))];
  const { html } = await early();
  assert.doesNotMatch(html, /alpha2/);
  assert.doesNotMatch(html, /multi-comp-2-v1\.1\.0</);
  assert.match(html, /No plugin is in early access right now/);
});

test("another plugin's stable release does not hide a prerelease", async () => {
  releases = [rel("multi-comp-2-v1.1.0-alpha2", "2026-10-25T10:00:00Z", membersOnly),
              rel("multi-comp-v1.3.9", "2026-11-01T10:00:00Z", dated("2999-01-01"))];
  const { html } = await early();
  assert.match(html, /multi-comp-2-v1\.1\.0-alpha2/);
  assert.match(html, /multi-comp-v1\.3\.9/);
});

test("the members-only wording counts only as the first line", async () => {
  releases = [rel("duskverb-2-v1.1.0", "2026-10-25T10:00:00Z", dated("2000-01-01"),
                  { body: `${dated("2000-01-01")}\n\n**Members-only prerelease** was the alpha.` })];
  const { html } = await early();
  assert.doesNotMatch(html, /duskverb-2-v1\.1\.0/);
});

test("drafts are never listed", async () => {
  releases = [rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly, { draft: true })];
  const { html } = await early();
  assert.doesNotMatch(html, /alpha1/);
});

test("without a member session it shows the sign-in page", async () => {
  releases = [rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly)];
  const { html } = await early(env, null);
  assert.doesNotMatch(html, /alpha1/);
  assert.match(html, /Patreon/);
});

test("a session signed with another key or past its expiry is refused", async () => {
  releases = [rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly)];
  for (const cookie of [await sessionCookie("not-the-secret", 3600), await sessionCookie(env.SESSION_SECRET, -60)]) {
    const { html } = await early(env, cookie);
    assert.doesNotMatch(html, /alpha1/);
    assert.match(html, /Sign in with Patreon/);
  }
});

test("FREE_DOWNLOADS=1 does not open early access", async () => {
  const open = { ...env, FREE_DOWNLOADS: "1" };
  releases = [rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly)];
  const page = await early(open, null);
  assert.doesNotMatch(page.html, /alpha1/);
  assert.match(page.html, /Sign in with Patreon/);
  const file = await get("/edl/202610201", open, null);
  assert.equal(file.status, 403);
  assert.equal(file.location, null);
  assert.deepEqual(fetched, []);
});

test("FREE_DOWNLOADS=1 still opens the Dusk Studio builds", async () => {
  const open = { ...env, FREE_DOWNLOADS: "1" };
  builds = [rel("v0.20.0", "2026-10-10T10:00:00Z", "Dusk Studio")];
  const page = await get("/latest", open, null);
  assert.match(page.html, /href="\/dl\/202610101"/);
  const file = await get("/dl/202610101", open, null);
  assert.equal(file.status, 302);
  assert.equal(file.location, "https://objects.example/202610101");
});

test("a member session downloads an early-access file", async () => {
  const file = await get("/edl/202610201");
  assert.equal(file.status, 302);
  assert.equal(file.location, "https://objects.example/202610201");
});

// Releases from other plugins, long past their dates, published before the alpha.
function pastReleases(count = 149) {
  return Array.from({ length: count }, (_, i) =>
    rel(`plugin-${i}-v1.0.0`, `2026-0${1 + (i % 9)}-1${i % 10}T10:00:00Z`, dated("2000-01-01")));
}
const alpha = () => rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly);
const listCalls = () => fetched.filter((u) => u.includes("/releases?"));

test("a release past GitHub's first page of results is still listed", async () => {
  // The API's order is not newest-first, so the newest release can come last.
  releases = [...pastReleases(), rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly)];
  const { html } = await early();
  assert.match(html, /multi-comp-2-v1\.1\.0-alpha1/);
});

test("a later page that fails shows the error, not a partial list", async () => {
  releases = [...pastReleases(), rel("multi-comp-2-v1.1.0-alpha1", "2026-10-20T10:00:00Z", membersOnly)];
  failPage = 2;
  const { status, html } = await early();
  assert.equal(status, 502);
  assert.match(html, /Couldn't load the early-access releases/);
});

test("exactly one full page is read to its empty end and listed", async () => {
  releases = [...pastReleases(99), alpha()];
  const { html } = await early();
  assert.match(html, /multi-comp-2-v1\.1\.0-alpha1/);
  assert.equal(listCalls().length, 2);
});

test("a list longer than MAX_PAGES shows the error, not a partial list", async () => {
  releases = [...pastReleases(1000), alpha()];
  const { status, html } = await early();
  assert.equal(status, 502);
  assert.match(html, /Couldn't load the early-access releases/);
  assert.equal(listCalls().length, 10);
});

test("the Dusk Studio builds read one page", async () => {
  builds = [rel("v0.20.0", "2026-10-10T10:00:00Z", "Dusk Studio"),
            ...pastReleases(149).map((r) => ({ ...r, prerelease: true }))];
  failPage = 2;
  const page = await get("/latest");
  assert.equal(page.status, 200);
  assert.match(page.html, /href="\/dl\/202610101"/);
  assert.equal(listCalls().length, 1);
});

test("without a session and with FREE_DOWNLOADS=0 the Dusk Studio builds stay closed", async () => {
  builds = [rel("v0.20.0", "2026-10-10T10:00:00Z", "Dusk Studio")];
  const page = await get("/latest", env, null);
  assert.match(page.html, /Sign in with Patreon/);
  assert.doesNotMatch(page.html, /\/dl\//);
  const file = await get("/dl/202610101", env, null);
  assert.equal(file.status, 403);
  assert.equal(file.location, null);
  assert.deepEqual(fetched, []);
});

test("with no SESSION_SECRET every session is refused, even one signed with the empty key", async () => {
  const unset = { ...env, SESSION_SECRET: "" };
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64url");
  const forged = `ds_sess=${payload}.${createHmac("sha256", "").update(payload).digest("base64url")}`;
  releases = [alpha()];
  builds = [rel("v0.20.0", "2026-10-10T10:00:00Z", "Dusk Studio")];
  for (const cookie of [member, forged]) {
    for (const path of ["/early", "/latest"]) {
      const page = await get(path, unset, cookie);
      assert.match(page.html, /Sign in with Patreon/);
    }
    for (const path of ["/edl/202610201", "/dl/202610101"]) {
      assert.equal((await get(path, unset, cookie)).status, 403);
    }
  }
  assert.deepEqual(fetched, []);
});

test("a release repeated on the next page is listed once", async () => {
  const open = rel("duskverb-2-v1.1.0", "2026-10-20T10:00:00Z", dated("2999-01-01"));
  releases = [...pastReleases(99), open, { ...open }, ...pastReleases(20)];
  const { html } = await early();
  assert.equal(html.match(/<h2>duskverb-2-v1\.1\.0<\/h2>/g).length, 1);
});

test("a listing that is not JSON gives the error page, not an unhandled exception", async () => {
  notJson = true;
  const realError = console.error;
  console.error = () => {};
  try {
    for (const path of ["/latest", "/early"]) {
      const page = await get(path);
      assert.equal(page.status, 500);
      assert.match(page.html, /Something went wrong/);
    }
  } finally {
    console.error = realError;
  }
});

/* ---------- Patreon sign-in ---------- */

const CAMPAIGN = "14880404";
const signInEnv = {
  ...env,
  DUSK_CAMPAIGN_ID: CAMPAIGN,
  DUSK_CREATOR_USER_ID: "900",
  SUPPORT_EMAIL: "help@example.com",
  PATREON_JOIN_URL: "https://patreon.example/join",
};
const membership = (status, cents, campaign = CAMPAIGN) => ({
  type: "member",
  attributes: { patron_status: status, currently_entitled_amount_cents: cents },
  relationships: { campaign: { data: { type: "campaign", id: campaign } } },
});
const account = (id, members = [], name = "Pat Ron") => ({ data: { id, type: "user", attributes: { full_name: name } }, included: members });

// The whole sign-in the way a browser makes it: /auth/login, Patreon's redirect back
// with the state, then the callback. Returns the callback's response, the session
// cookie it set (if any) and the gate's log lines.
async function signInAs(identity, e = signInEnv, next = "/latest") {
  patreon.identity = identity;
  const login = await worker.fetch(new Request(`https://builds.example/auth/login?next=${encodeURIComponent(next)}`), e);
  const state = new URL(login.headers.get("Location")).searchParams.get("state");
  const jar = login.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
  const logs = await captureLogs(() =>
    worker.fetch(new Request(`https://builds.example/auth/callback?code=c&state=${state}`, { headers: { Cookie: jar } }), e));
  const r = logs.result;
  const sess = r.headers.getSetCookie().find((c) => c.startsWith("ds_sess="));
  return { status: r.status, location: r.headers.get("Location"), html: await r.text(), session: sess && sess.split(";")[0], logs: logs.lines };
}

async function captureLogs(fn) {
  const lines = [];
  const realLog = console.log;
  console.log = (line) => lines.push(JSON.parse(line));
  try {
    return { result: await fn(), lines };
  } finally {
    console.log = realLog;
  }
}

test("an active $5 patron signs in, sees the builds and downloads one", async () => {
  builds = [rel("v0.20.0", "2026-10-10T10:00:00Z", "Dusk Studio")];
  const r = await signInAs(account("1", [membership("active_patron", 500)]));
  assert.equal(r.status, 302);
  assert.equal(r.location, "/latest");
  assert.ok(r.session);
  assert.deepEqual(r.logs, [{ gate: true, outcome: "admitted", user: "1", via: "member", cents: 500 }]);
  const page = await get("/latest", signInEnv, r.session);
  assert.match(page.html, /href="\/dl\/202610101"/);
  const file = await get("/dl/202610101", signInEnv, r.session);
  assert.equal(file.status, 302);
  assert.equal(file.location, "https://objects.example/202610101");
});

test("a member of the closed $1 tier still gets in", async () => {
  const r = await signInAs(account("2", [membership("active_patron", 100)]));
  assert.equal(r.status, 302);
  assert.ok(r.session);
});

test("the creator gets in without a pledge", async () => {
  const r = await signInAs(account("900"));
  assert.equal(r.status, 302);
  assert.ok(r.session);
  assert.equal(r.logs[0].via, "creator");
});

test("a patron who also follows other creators gets in", async () => {
  const r = await signInAs(account("3", [membership(null, 0, "1"), membership("active_patron", 500), membership("active_patron", 300, "2")]));
  assert.equal(r.status, 302);
});

test("sign-in from /early returns to /early", async () => {
  const r = await signInAs(account("1", [membership("active_patron", 500)]), signInEnv, "/early");
  assert.equal(r.location, "/early");
});

for (const [label, members, reason, status, cents, says] of [
  ["a declined payment", [membership("declined_patron", 500)], "declined", "declined_patron", 500, /didn&#39;t go through/],
  ["an ended membership", [membership("former_patron", 0)], "former", "former_patron", 0, /has ended/],
  ["a free membership", [membership(null, 0)], "free", null, 0, /free membership/],
  ["an active pledge under $1", [membership("active_patron", 50)], "free", "active_patron", 50, /free membership/],
  ["only another creator's membership", [membership("active_patron", 500, "999")], "none", null, 0, /doesn&#39;t show a Dusk Audio membership/],
  ["no membership at all", [], "none", null, 0, /doesn&#39;t show a Dusk Audio membership/],
]) {
  test(`${label} is refused with Patreon's reason, the account used and a way out`, async () => {
    const r = await signInAs(account("7", members));
    assert.equal(r.status, 403);
    assert.equal(r.session, undefined);
    assert.deepEqual(r.logs, [{ gate: true, outcome: "refused", user: "7", reason, status, cents }]);
    assert.match(r.html, says);
    assert.match(r.html, /signed in to Patreon as <strong>Pat Ron<\/strong>/);
    assert.match(r.html, /href="\/auth\/login">sign in again</);
    assert.match(r.html, /mailto:help@example\.com/);
    if (reason === "declined") {
      assert.match(r.html, /Update payment on Patreon/);
      assert.doesNotMatch(r.html, /Join on Patreon/);
    } else {
      assert.match(r.html, /href="https:\/\/patreon\.example\/join">Join on Patreon/);
    }
  });
}

test("the refusal page escapes the Patreon name and leaves out the support line when unset", async () => {
  const r = await signInAs(account("8", [], "<b>x</b>"), { ...signInEnv, SUPPORT_EMAIL: "" });
  assert.match(r.html, /&lt;b&gt;x&lt;\/b&gt;/);
  assert.doesNotMatch(r.html, /mailto:/);
});

test("Patreon's token error is logged, not the response body", async () => {
  patreon.tokenStatus = 401;
  patreon.tokenError = "invalid_client";
  const r = await signInAs(account("1", [membership("active_patron", 500)]));
  assert.equal(r.status, 502);
  assert.deepEqual(r.logs, [{ gate: true, outcome: "failed", step: "token", http: 401, why: "invalid_client" }]);
});

test("a callback that can't be verified says why in the log", async () => {
  for (const [query, why] of [["code=c&state=s", "no_state_cookie"], ["error=access_denied&state=s", "access_denied"]]) {
    const { result, lines } = await captureLogs(() => worker.fetch(new Request(`https://builds.example/auth/callback?${query}`), signInEnv));
    assert.equal(result.status, 400);
    assert.deepEqual(lines, [{ gate: true, outcome: "failed", step: "callback", why }]);
    if (why === "access_denied") assert.match(await result.text(), /cancelled/);
  }
});

test("a download link without a live session offers sign-in, not 'not a member'", async () => {
  const expired = await sessionCookie(env.SESSION_SECRET, -60);
  for (const [path, next] of [["/dl/202610101", "/latest"], ["/edl/202610201", "/early"]]) {
    for (const cookie of [null, expired]) {
      const file = await get(path, signInEnv, cookie);
      assert.equal(file.status, 403);
      assert.match(file.html, /has expired or you haven&#39;t signed in/);
      assert.match(file.html, new RegExp(`href="/auth/login\\?next=${encodeURIComponent(next)}"`));
      assert.doesNotMatch(file.html, /couldn't find your membership/);
    }
  }
  assert.deepEqual(fetched, []);
});

const healthEnv = { ...signInEnv, PATREON_CLIENT_ID: "id", PATREON_CLIENT_SECRET: "client-secret", OAUTH_REDIRECT_URI: "https://builds.example/auth/callback" };
const health = async (e = healthEnv, auth = null) => {
  const r = await worker.fetch(new Request("https://builds.example/health", { headers: auth ? { Authorization: auth } : {} }), e);
  return { status: r.status, text: await r.text() };
};

test("/health is green when both repos can be read and the config is set", async () => {
  builds = [rel("v0.20.0", "2026-10-10T10:00:00Z", "Dusk Studio")];
  const { status, text } = await health();
  assert.equal(status, 200);
  assert.deepEqual(JSON.parse(text), {
    ok: true, deep: false, latest: "v0.20.0",
    checks: { config: true, builds_listed: true, early_readable: true, members_only: true },
  });
  assert.doesNotMatch(text, /client-secret|"pat"/);
});

test("/health is red when GitHub can't be read or a secret is missing", async () => {
  builds = [rel("v0.20.0", "2026-10-10T10:00:00Z", "Dusk Studio")];
  failPage = 1;
  const down = await health();
  assert.equal(down.status, 503);
  assert.equal(JSON.parse(down.text).checks.builds_listed, false);
  assert.equal(JSON.parse(down.text).checks.early_readable, false);
  failPage = 0;
  const unset = await health({ ...healthEnv, PATREON_CLIENT_SECRET: "" });
  assert.equal(unset.status, 503);
  assert.equal(JSON.parse(unset.text).checks.config, false);
});

/* ---------- deep /health ---------- */

const deepEnv = { ...healthEnv, HEALTH_TOKEN: "health-token" };
const deepHealth = (e = deepEnv) => health(e, "Bearer health-token");

// A Dusk Studio release with one file per platform, ids 501-504.
function fullBuild() {
  const files = ["Linux-x86_64.tar.xz", "Linux-aarch64.tar.xz", "macOS-arm64.dmg", "Windows-x64.msi"];
  return rel("v0.20.0", "2026-10-10T10:00:00Z", "Dusk Studio", {
    assets: files.map((f, i) => ({ id: 501 + i, name: `dusk-studio-0.20.0-${f}`, size: 1048576 })),
  });
}
const deepReady = () => {
  builds = [fullBuild()];
  releases = [alpha()];
  patreon.tokenStatus = 401;
  patreon.tokenError = "invalid_grant"; // what Patreon answers a known client with a made-up code
};

test("deep /health fetches every Dusk Studio file and every listed early file", async () => {
  deepReady();
  const { status, text } = await deepHealth();
  assert.equal(status, 200);
  const body = JSON.parse(text);
  assert.equal(body.deep, true);
  assert.deepEqual(body.checks, {
    config: true, builds_listed: true, early_readable: true, members_only: true,
    builds_platforms: true, builds_downloadable: true, early_downloadable: true, patreon_client_id: true,
  });
  assert.deepEqual(body.failed_files, []);
  for (const id of ["501", "502", "503", "504", "202610201"]) {
    assert.ok(fetched.includes(`https://objects.example/${id}`), `signed URL ${id} checked`);
  }
});

test("without the right token /health stays shallow and fetches no files", async () => {
  deepReady();
  for (const auth of [null, "Bearer wrong"]) {
    fetched = [];
    const body = JSON.parse((await health(deepEnv, auth)).text);
    assert.equal(body.deep, false);
    assert.equal(body.failed_files, undefined);
    assert.ok(!fetched.some((u) => u.includes("/assets/") || u.includes("patreon")));
  }
  fetched = [];
  const unset = JSON.parse((await health({ ...deepEnv, HEALTH_TOKEN: "" }, "Bearer ")).text);
  assert.equal(unset.deep, false);
});

test("deep /health fails when a release is missing a platform", async () => {
  deepReady();
  builds[0].assets = builds[0].assets.filter((a) => !/Windows/.test(a.name));
  const { status, text } = await deepHealth();
  assert.equal(status, 503);
  assert.equal(JSON.parse(text).checks.builds_platforms, false);
});

test("deep /health names a file GitHub won't hand out or whose signed URL fails", async () => {
  deepReady();
  refusedAssets.add("503");
  brokenObjects.add("202610201");
  const { status, text } = await deepHealth();
  assert.equal(status, 503);
  const body = JSON.parse(text);
  assert.equal(body.checks.builds_downloadable, false);
  assert.equal(body.checks.early_downloadable, false);
  assert.deepEqual(body.failed_files.sort(), ["dusk-studio-0.20.0-macOS-arm64.dmg", "multi-comp-2-v1.1.0-alpha1.zip"]);
});

test("deep /health fails when Patreon doesn't know the client id", async () => {
  deepReady();
  patreon.tokenError = "invalid_client";
  const { status, text } = await deepHealth();
  assert.equal(status, 503);
  assert.equal(JSON.parse(text).checks.patreon_client_id, false);
});
