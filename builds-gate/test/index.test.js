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

let releases, builds, failPage, notJson, fetched, realFetch;

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
  realFetch = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    fetched.push(url.toString());
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
    if (asset) return new Response(null, { status: 302, headers: { Location: `https://objects.example/${asset[2]}` } });
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
