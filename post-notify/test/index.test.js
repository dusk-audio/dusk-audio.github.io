import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import worker from "../src/index.js";

const env = {
  PATREON_WEBHOOK_SECRET: "whsec",
  PATREON_CREATOR_TOKEN: "ptok",
  MAILERLITE_API_TOKEN: "mltok",
  ADMIN_TOKEN: "admin",
  DUSK_CAMPAIGN_ID: "1",
  GROUP_NAME: "Post notify (not on Patreon)",
  FROM_NAME: "Dusk Audio",
  FROM_EMAIL: "hello@example.com",
  SEND_MODE: "draft",
  PUBLIC_ONLY: "0",
};

// Fake Patreon + MailerLite. `state` is the remote world; `calls` records writes.
let state, calls, realFetch;

function reply(body, status = 200) {
  return new Response(status === 204 ? null : JSON.stringify(body), { status });
}

async function fakeFetch(input, init = {}) {
  const url = new URL(String(input));
  const method = init.method || "GET";
  const body = init.body ? JSON.parse(init.body) : null;
  const path = url.pathname;

  if (url.host === "www.patreon.com") {
    if (state.patreonStatus !== 200) return reply({}, state.patreonStatus);
    return reply({ data: state.members.map((m) => ({ attributes: m })), meta: { pagination: { cursors: { next: null } } } });
  }
  if (path === "/api/groups" && method === "GET") return reply({ data: state.groups, meta: { next_cursor: null } });
  if (path === "/api/groups" && method === "POST") {
    calls.push({ op: "createGroup", body });
    return reply({ data: { id: "g1", name: body.name } }, 201);
  }
  if (path === "/api/subscribers") return reply({ data: state.subscribers, meta: { next_cursor: null } });
  if (/^\/api\/groups\/[^/]+\/subscribers$/.test(path)) return reply({ data: state.inGroup, meta: { next_cursor: null } });
  if (path === "/api/batch") {
    calls.push({ op: "batch", body });
    return reply({ total: body.requests.length, successful: body.requests.length, failed: 0, responses: [] });
  }
  if (path === "/api/campaigns" && method === "GET") {
    return reply({ data: state.campaigns[url.searchParams.get("filter[status]")] || [] });
  }
  if (path === "/api/campaigns" && method === "POST") {
    calls.push({ op: "createCampaign", body });
    if (body.emails[0].content && !state.advancedPlan) return reply({ message: "Advanced plan required" }, 422);
    return reply({ data: { id: "c1", status: "draft" } }, 201);
  }
  if (path === "/api/campaigns/c1/schedule") {
    calls.push({ op: "schedule", body });
    return reply({ data: { id: "c1", status: "ready" } });
  }
  throw new Error(`unexpected fetch ${method} ${url}`);
}

beforeEach(() => {
  realFetch = globalThis.fetch;
  globalThis.fetch = fakeFetch;
  calls = [];
  state = {
    patreonStatus: 200,
    advancedPlan: true,
    members: [
      { email: "Patron@Example.com", patron_status: "active_patron" },
      { email: "free@example.com", patron_status: null },
      { email: "left@example.com", patron_status: "former_patron" },
      { email: "joined@example.com", patron_status: "active_patron" },
    ],
    groups: [{ id: "g1", name: "Post notify (not on Patreon)" }],
    subscribers: [
      { id: "s1", email: "patron@example.com" },
      { id: "s2", email: "free@example.com" },
      { id: "s3", email: "left@example.com" },
      { id: "s4", email: "only-list@example.com" },
      { id: "s5", email: "joined@example.com" },
      { id: "s6", email: "already@example.com" },
    ],
    // s5 joined Patreon since the last sync; s6 is already where it belongs.
    inGroup: [
      { id: "s5", email: "joined@example.com" },
      { id: "s6", email: "already@example.com" },
    ],
    campaigns: { draft: [], ready: [], sent: [] },
  };
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

const post = {
  data: {
    id: "777",
    type: "post",
    attributes: { title: "DuskVerb <2> is out", content: "<p>Big &amp; lush.</p>", url: "/posts/duskverb-777", is_public: true },
  },
};

function hook(payload = post, { event = "posts:publish", secret = env.PATREON_WEBHOOK_SECRET, e = env } = {}) {
  const raw = JSON.stringify(payload);
  const sig = createHmac("md5", secret).update(raw).digest("hex");
  const req = new Request("https://w.example/patreon/webhook", {
    method: "POST",
    headers: { "X-Patreon-Signature": sig, "X-Patreon-Event": event },
    body: raw,
  });
  return worker.fetch(req, e);
}

const ops = (op) => calls.filter((c) => c.op === op);

test("rejects a bad or missing signature", async () => {
  assert.equal((await hook(post, { secret: "wrong" })).status, 401);
  assert.equal((await hook(post, { e: { ...env, PATREON_WEBHOOK_SECRET: "" }, secret: "" })).status, 401);
  assert.equal(calls.length, 0);
});

test("ignores other events", async () => {
  const r = await hook(post, { event: "members:create" });
  assert.deepEqual(await r.json(), { ok: true, skipped: "event" });
  assert.equal(calls.length, 0);
});

test("publish syncs the group and leaves a draft for non-Patreon subscribers", async () => {
  const r = await hook();
  assert.equal(r.status, 200);
  const out = await r.json();
  assert.deepEqual(out, { ok: true, deduped: true, recipients: 3, campaignId: "c1", hasBody: true, sent: false });

  // s5 leaves the group (now on Patreon); s3 (former patron) and s4 join; s1/s2 never do.
  const reqs = ops("batch").flatMap((c) => c.body.requests);
  assert.deepEqual(reqs, [
    { method: "DELETE", path: "api/subscribers/s5/groups/g1" },
    { method: "POST", path: "api/subscribers/s3/groups/g1" },
    { method: "POST", path: "api/subscribers/s4/groups/g1" },
  ]);

  const [c] = ops("createCampaign");
  assert.deepEqual(c.body.groups, ["g1"]);
  assert.equal(c.body.name, "DuskVerb <2> is out [patreon:777]");
  assert.equal(c.body.emails[0].subject, "DuskVerb <2> is out");
  assert.equal(c.body.emails[0].from, "hello@example.com");
  const html = c.body.emails[0].content;
  assert.match(html, /DuskVerb &lt;2&gt; is out/);
  assert.match(html, /Big &amp; lush\./);
  assert.match(html, /href="https:\/\/www\.patreon\.com\/posts\/duskverb-777"/);
  assert.match(html, /\{\$unsubscribe\}/);
  assert.equal(ops("schedule").length, 0);
});

test("patron-only post text stays out of the email", async () => {
  const paid = structuredClone(post);
  paid.data.attributes.is_public = false;
  paid.data.attributes.content = "<p>secret patron notes</p>";
  await hook(paid);
  const html = ops("createCampaign")[0].body.emails[0].content;
  assert.doesNotMatch(html, /secret patron notes/);
  assert.match(html, /A new post for Dusk Audio patrons/);
});

test("PUBLIC_ONLY skips patron-only posts", async () => {
  const paid = structuredClone(post);
  paid.data.attributes.is_public = false;
  const r = await hook(paid, { e: { ...env, PUBLIC_ONLY: "1" } });
  assert.deepEqual(await r.json(), { ok: true, skipped: "not public" });
  assert.equal(calls.length, 0);
});

test("a redelivered webhook does not create a second campaign", async () => {
  state.campaigns.sent = [{ id: "c0", name: "DuskVerb <2> is out [patreon:777]" }];
  const r = await hook();
  assert.deepEqual(await r.json(), { ok: true, skipped: "duplicate" });
  assert.equal(calls.length, 0);
});

test("send mode sends once deduped", async () => {
  const out = await (await hook(post, { e: { ...env, SEND_MODE: "send" } })).json();
  assert.equal(out.sent, true);
  assert.deepEqual(ops("schedule")[0].body, { delivery: "instant" });
});

test("without the Advanced plan it falls back to a body-less draft and never sends", async () => {
  state.advancedPlan = false;
  const out = await (await hook(post, { e: { ...env, SEND_MODE: "send" } })).json();
  assert.equal(out.hasBody, false);
  assert.equal(out.sent, false);
  const created = ops("createCampaign");
  assert.equal(created.length, 2);
  assert.equal("content" in created[1].body.emails[0], false);
  assert.deepEqual(created[1].body.groups, ["g1"]);
  assert.equal(ops("schedule").length, 0);
});

test("a Patreon failure leaves the group alone, flags the draft, and never sends", async () => {
  state.patreonStatus = 401;
  const out = await (await hook(post, { e: { ...env, SEND_MODE: "send" } })).json();
  assert.equal(out.deduped, false);
  assert.equal(out.sent, false);
  assert.equal(ops("batch").length, 0);
  assert.match(ops("createCampaign")[0].body.name, /^\[CHECK RECIPIENTS\] /);
  assert.equal(ops("schedule").length, 0);
});

test("a token that returns no emails counts as a failed sync, not an empty Patreon", async () => {
  state.members = state.members.map((m) => ({ patron_status: m.patron_status }));
  const out = await (await hook()).json();
  assert.equal(out.deduped, false);
  assert.equal(ops("batch").length, 0);
});

test("creates the group on first run", async () => {
  state.groups = [{ id: "gx", name: "Post notify (not on Patreon) old" }];
  state.inGroup = [];
  await hook();
  assert.deepEqual(ops("createGroup")[0].body, { name: "Post notify (not on Patreon)" });
});

test("/sync needs the admin token and is a dry run unless apply=1", async () => {
  const call = (qs, token) =>
    worker.fetch(
      new Request(`https://w.example/sync${qs}`, { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {} }),
      env
    );
  assert.equal((await call("", null)).status, 401);
  assert.equal((await call("", "nope")).status, 401);

  const dry = await (await call("", "admin")).json();
  assert.deepEqual(dry, { applied: false, ok: true, subscribers: 6, alsoOnPatreon: 3, recipients: 3, added: 2, removed: 1 });
  assert.equal(calls.length, 0);

  const applied = await (await call("?apply=1", "admin")).json();
  assert.equal(applied.applied, true);
  assert.equal(ops("batch").length, 1);
});
