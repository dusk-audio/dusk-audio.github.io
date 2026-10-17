import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

// /early against a fake GitHub releases API for EARLY_REPO. FREE_DOWNLOADS stands in
// for a member session; one test checks the gate without it.
const env = { EARLY_REPO: "o/early", GH_PAT: "pat", FREE_DOWNLOADS: "1", SESSION_SECRET: "s" };

let releases, realFetch;

function rel(tag, published, firstLine, extra = {}) {
  return {
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
  realFetch = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.startsWith("https://api.github.com/repos/o/early/releases")) {
      return new Response(JSON.stringify(releases), { status: 200 });
    }
    throw new Error(`unexpected fetch ${url}`);
  };
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

async function early(e = env) {
  const r = await worker.fetch(new Request("https://builds.example/early"), e);
  return { status: r.status, html: await r.text() };
}

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
  const { html } = await early({ ...env, FREE_DOWNLOADS: "0" });
  assert.doesNotMatch(html, /alpha1/);
  assert.match(html, /Patreon/);
});
