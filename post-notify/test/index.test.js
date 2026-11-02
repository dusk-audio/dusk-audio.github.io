import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import worker from "../src/index.js";

const env = {
  PATREON_WEBHOOK_SECRET: "whsec",
  PATREON_CREATOR_TOKEN: "ptok",
  KIT_API_KEY: "kitkey",
  TURNSTILE_SECRET: "tsecret",
  ADMIN_TOKEN: "admin",
  DUSK_CAMPAIGN_ID: "1",
  TAG_NAME: "Patreon member (auto)",
  KIT_FORM_ID: "42",
  ALLOWED_ORIGINS: "https://duskaudio.com",
  TURNSTILE_HOSTNAME: "duskaudio.com",
  SEND_MODE: "draft",
  PUBLIC_ONLY: "0",
};

// Fake Patreon + Kit + Turnstile. `state` is the remote world; `calls` records writes and
// spam checks. Tag changes are kept in `state.tagged`, so a second run sees the first.
let state, calls, realFetch;

function reply(body, status = 200) {
  return new Response(status === 204 ? null : JSON.stringify(body), { status });
}

// One page of a Kit listing. state.pageSize forces small pages to exercise the cursor.
function page(key, rows, url) {
  const start = Number(url.searchParams.get("after") || 0);
  const size = state.pageSize || Number(url.searchParams.get("per_page") || 500);
  const next = start + size < rows.length;
  return reply({
    [key]: rows.slice(start, start + size),
    pagination: { has_next_page: next, end_cursor: next ? String(start + size) : null },
  });
}

async function fakeFetch(input, init = {}) {
  const url = new URL(String(input));
  const method = init.method || "GET";
  const path = url.pathname;

  if (url.host === "www.patreon.com") {
    if (state.patreonStatus !== 200) return reply({}, state.patreonStatus);
    return reply({ data: state.members.map((m) => ({ attributes: m })), meta: { pagination: { cursors: { next: null } } } });
  }
  if (url.host === "challenges.cloudflare.com") {
    calls.push({ op: "siteverify", body: Object.fromEntries(new URLSearchParams(String(init.body))) });
    if (state.turnstileStatus !== 200) return reply({}, state.turnstileStatus);
    return reply(state.turnstile);
  }
  assert.equal(url.host, "api.kit.com");
  assert.equal(init.headers["X-Kit-Api-Key"], "kitkey");
  const body = init.body ? JSON.parse(init.body) : null;

  if (path === "/v4/tags" && method === "GET") return page("tags", state.tags, url);
  if (path === "/v4/tags" && method === "POST") {
    calls.push({ op: "createTag", body });
    return reply({ tag: { id: 9, name: body.name } }, 201);
  }
  if (path === "/v4/subscribers" && method === "GET") return page("subscribers", state.subscribers, url);
  if (path === "/v4/subscribers" && method === "POST") {
    calls.push({ op: "createSubscriber", body });
    if (state.kitStatus !== 200) return reply({ errors: ["nope"] }, state.kitStatus);
    return reply({ subscriber: { id: "new", email_address: body.email_address, state: body.state } }, 201);
  }
  if (path === "/v4/forms/42/subscribers" && method === "POST") {
    calls.push({ op: "addToForm", body });
    return reply({ subscriber: { id: "new" } }, 201);
  }
  if (/^\/v4\/tags\/\d+\/subscribers$/.test(path)) return page("subscribers", state.tagged, url);
  const tagging = path.match(/^\/v4\/tags\/(\d+)\/subscribers\/(\w+)$/);
  if (tagging) {
    const [, tag, id] = tagging;
    if (method === "POST") {
      calls.push({ op: "tag", tag, id });
      state.tagged.push(state.subscribers.find((s) => s.id === id));
      return reply({ subscriber: { id } }, 201);
    }
    calls.push({ op: "untag", tag, id });
    state.tagged = state.tagged.filter((s) => s.id !== id);
    return reply(null, 204);
  }
  if (path === "/v4/broadcasts" && method === "GET") {
    if (state.broadcastListStatus) return reply({}, state.broadcastListStatus);
    return page("broadcasts", state.broadcasts, url);
  }
  if (path === "/v4/broadcasts" && method === "POST") {
    calls.push({ op: "createBroadcast", body });
    return reply({ broadcast: { id: 501, status: body.send_at ? "scheduled" : "draft" } }, 201);
  }
  throw new Error(`unexpected fetch ${method} ${url}`);
}

beforeEach(() => {
  realFetch = globalThis.fetch;
  globalThis.fetch = fakeFetch;
  calls = [];
  state = {
    patreonStatus: 200,
    turnstileStatus: 200,
    turnstile: { success: true, hostname: "duskaudio.com" },
    kitStatus: 200,
    members: [
      { email: "Patron@Example.com", patron_status: "active_patron" },
      { email: "free@example.com", patron_status: null },
      { email: "left@example.com", patron_status: "former_patron" },
      { email: "joined@example.com", patron_status: "active_patron" },
      { email: "pending@example.com", patron_status: "active_patron" },
    ],
    tags: [{ id: 9, name: "Patreon member (auto)" }],
    subscribers: [
      { id: "s1", email_address: "patron@example.com", state: "active" },
      { id: "s2", email_address: "free@example.com", state: "active" },
      { id: "s3", email_address: "left@example.com", state: "active" },
      { id: "s4", email_address: "only-list@example.com", state: "active" },
      { id: "s5", email_address: "joined@example.com", state: "active" },
      { id: "s6", email_address: "pending@example.com", state: "inactive" },
    ],
    // s1 is already tagged; s3 left Patreon since the last sync.
    tagged: [
      { id: "s1", email_address: "patron@example.com", state: "active" },
      { id: "s3", email_address: "left@example.com", state: "active" },
    ],
    broadcasts: [],
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

function hook(payload = post, { event = "posts:publish", secret = env.PATREON_WEBHOOK_SECRET, e = env, ctx } = {}) {
  const raw = JSON.stringify(payload);
  const sig = createHmac("md5", secret).update(raw).digest("hex");
  const req = new Request("https://w.example/patreon/webhook", {
    method: "POST",
    headers: { "X-Patreon-Signature": sig, "X-Patreon-Event": event },
    body: raw,
  });
  return worker.fetch(req, e, ctx);
}

function sync(qs = "", token = "admin") {
  return worker.fetch(
    new Request(`https://w.example/sync${qs}`, { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {} }),
    env,
  );
}

// The site's fetch: a form-urlencoded POST from duskaudio.com.
function signup(fields = {}, headers = {}, e = env) {
  const body = new URLSearchParams({
    email: "New@Example.com ",
    "cf-turnstile-response": "tok",
    referrer: "https://duskaudio.com/plugins/",
    ...fields,
  });
  return worker.fetch(
    new Request("https://w.example/subscribe", {
      method: "POST",
      headers: { Origin: "https://duskaudio.com", "CF-Connecting-IP": "203.0.113.7", ...headers },
      body,
    }),
    e,
  );
}

// The ExecutionContext Workers passes in production: collects the work left running after
// the response.
function fakeCtx() {
  const pending = [];
  return { pending, waitUntil: (p) => pending.push(p), settle: () => Promise.all(pending) };
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

test("publish tags the subscribers on Patreon and leaves a draft for everyone else", async () => {
  const r = await hook();
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true, deduped: true, recipients: 2, broadcastId: 501, scheduled: false });

  // s3 (now a former patron) loses the tag; s2 (free member), s5 and the unconfirmed s6 get it.
  assert.deepEqual(
    calls.filter((c) => c.op === "tag" || c.op === "untag").map((c) => `${c.op} ${c.id}`),
    ["untag s3", "tag s2", "tag s5", "tag s6"],
  );

  const [b] = ops("createBroadcast");
  assert.deepEqual(b.body.subscriber_filter, [{ all: null, any: null, none: [{ type: "tag", ids: [9] }] }]);
  assert.equal(b.body.subject, "DuskVerb <2> is out");
  assert.equal(b.body.description, "DuskVerb <2> is out [patreon:777]");
  assert.equal(b.body.preview_text, "Big & lush.");
  assert.equal(b.body.send_at, null);
  assert.equal(b.body.public, false);
  assert.equal(b.body.email_address, null);
  const html = b.body.content;
  assert.match(html, /DuskVerb &lt;2&gt; is out/);
  assert.match(html, /Big &amp; lush\./);
  assert.match(html, /href="https:\/\/www\.patreon\.com\/posts\/duskverb-777"/);
  // A body for Kit's template: no page of its own, and Kit adds the unsubscribe link.
  assert.doesNotMatch(html, /<html|<body|\$unsubscribe/);
});

test("patron-only post text stays out of the email", async () => {
  const paid = structuredClone(post);
  paid.data.attributes.is_public = false;
  paid.data.attributes.content = "<p>secret patron notes</p>";
  await hook(paid);
  const { body } = ops("createBroadcast")[0];
  assert.doesNotMatch(body.content, /secret patron notes/);
  assert.doesNotMatch(body.preview_text, /secret patron notes/);
  assert.match(body.content, /A new post for Dusk Audio patrons/);
});

test("Liquid in a post can't run in Kit", async () => {
  const odd = structuredClone(post);
  odd.data.attributes.title = "Tips {{ subscriber.email_address }} {% if x %}";
  odd.data.attributes.content = "<p>Use {{ curly }} braces</p>";
  await hook(odd);
  const { body } = ops("createBroadcast")[0];
  for (const text of [body.subject, body.preview_text, body.content]) assert.doesNotMatch(text, /\{\{|\{%/);
  assert.equal(body.subject, "Tips { { subscriber.email_address }} { % if x %}");
  assert.match(body.content, /Use &#123;&#123; curly &#125;&#125; braces/);
});

test("PUBLIC_ONLY skips patron-only posts", async () => {
  const paid = structuredClone(post);
  paid.data.attributes.is_public = false;
  const r = await hook(paid, { e: { ...env, PUBLIC_ONLY: "1" } });
  assert.deepEqual(await r.json(), { ok: true, skipped: "not public" });
  assert.equal(calls.length, 0);
});

test("a redelivered webhook does not create a second broadcast", async () => {
  state.broadcasts = [{ id: 400, description: "DuskVerb <2> is out [patreon:777]" }];
  const r = await hook();
  assert.deepEqual(await r.json(), { ok: true, skipped: "duplicate" });
  assert.equal(calls.length, 0);
});

test("send mode schedules it ten minutes out once deduped", async () => {
  const before = Date.now();
  const out = await (await hook(post, { e: { ...env, SEND_MODE: "send" } })).json();
  assert.equal(out.scheduled, true);
  const at = Date.parse(ops("createBroadcast")[0].body.send_at);
  assert.ok(at >= before + 10 * 60 * 1000 && at <= Date.now() + 10 * 60 * 1000);
});

test("a Patreon failure leaves the tag alone, flags the draft, and never sends", async () => {
  state.patreonStatus = 401;
  const out = await (await hook(post, { e: { ...env, SEND_MODE: "send" } })).json();
  assert.equal(out.deduped, false);
  assert.equal(out.scheduled, false);
  assert.equal(ops("tag").length + ops("untag").length, 0);
  const { body } = ops("createBroadcast")[0];
  assert.equal(body.subject, "[CHECK RECIPIENTS] DuskVerb <2> is out");
  assert.equal(body.send_at, null);
});

test("a token that returns no emails counts as a failed sync, not an empty Patreon", async () => {
  state.members = state.members.map((m) => ({ patron_status: m.patron_status }));
  const out = await (await hook()).json();
  assert.equal(out.deduped, false);
  assert.equal(ops("untag").length, 0);
});

test("creates the tag on first run", async () => {
  state.tags = [{ id: 7, name: "Patreon member (auto) old" }];
  state.tagged = [];
  await hook();
  assert.deepEqual(ops("createTag")[0].body, { name: "Patreon member (auto)" });
  assert.ok(ops("tag").every((c) => c.tag === "9"));
  assert.deepEqual(ops("createBroadcast")[0].body.subscriber_filter[0].none, [{ type: "tag", ids: [9] }]);
});

test("reads every page of a Kit listing", async () => {
  state.pageSize = 2;
  const out = await (await sync()).json();
  assert.equal(out.subscribers, 5);
  assert.equal(out.added, 3);
  assert.equal(out.removed, 1);
});

test("/sync needs the admin token and is a dry run unless apply=1", async () => {
  assert.equal((await sync("", null)).status, 401);
  assert.equal((await sync("", "nope")).status, 401);

  const dry = await (await sync()).json();
  assert.deepEqual(dry, {
    applied: false,
    ok: true,
    subscribers: 5,
    alsoOnPatreon: 3,
    recipients: 2,
    added: 3,
    removed: 1,
    remaining: 4,
  });
  assert.equal(calls.length, 0);

  const applied = await (await sync("?apply=1")).json();
  assert.equal(applied.applied, true);
  assert.equal(applied.ok, true);
  assert.equal(applied.remaining, 0);
  assert.equal(ops("tag").length + ops("untag").length, 4);
});

test("more changes than one run allows: the rest waits, and the draft is flagged", async () => {
  for (let i = 0; i < 40; i++) {
    state.members.push({ email: `fan${i}@example.com`, patron_status: "active_patron" });
    state.subscribers.push({ id: `f${i}`, email_address: `fan${i}@example.com`, state: "active" });
  }
  const out = await (await hook(post, { e: { ...env, SEND_MODE: "send" } })).json();
  assert.equal(ops("tag").length + ops("untag").length, 30);
  assert.equal(out.deduped, false);
  assert.equal(out.scheduled, false);
  assert.match(ops("createBroadcast")[0].body.subject, /^\[CHECK RECIPIENTS\] /);

  // Each /sync?apply=1 carries on where the last run stopped.
  const next = await sync("?apply=1");
  assert.equal(next.status, 200);
  assert.deepEqual(await next.json(), {
    applied: true,
    ok: true,
    subscribers: 45,
    alsoOnPatreon: 43,
    recipients: 2,
    added: 14,
    removed: 0,
    remaining: 0,
  });
});

test("with a ctx it acknowledges at once and publishes after the response", async () => {
  const ctx = fakeCtx();
  const r = await hook(post, { ctx });
  assert.equal(r.status, 202);
  assert.deepEqual(await r.json(), { ok: true, queued: true });
  assert.equal(ctx.pending.length, 1);
  await ctx.settle();
  const [b] = ops("createBroadcast");
  assert.equal(b.body.description, "DuskVerb <2> is out [patreon:777]");
});

test("with a ctx a bad signature is still refused before anything runs", async () => {
  const ctx = fakeCtx();
  assert.equal((await hook(post, { secret: "wrong", ctx })).status, 401);
  assert.equal(ctx.pending.length, 0);
  assert.equal(calls.length, 0);
});

test("a failure after the response is logged, not thrown", async () => {
  state.broadcastListStatus = 500;
  const ctx = fakeCtx();
  const errors = [];
  const orig = console.error;
  console.error = (...a) => errors.push(a.join(" "));
  try {
    assert.equal((await hook(post, { ctx })).status, 202);
    await ctx.settle();
  } finally {
    console.error = orig;
  }
  assert.equal(ops("createBroadcast").length, 0);
  assert.match(errors.join("\n"), /post-notify failed: 777 Kit GET \/broadcasts 500/);
});

/* ---------- /subscribe ---------- */

test("signup: a passed spam check adds the address to Kit inactive, then to the form", async () => {
  const r = await signup();
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "https://duskaudio.com");
  assert.deepEqual(ops("siteverify")[0].body, { secret: "tsecret", response: "tok", remoteip: "203.0.113.7" });
  assert.deepEqual(ops("createSubscriber")[0].body, { email_address: "new@example.com", state: "inactive" });
  assert.deepEqual(ops("addToForm")[0].body, { email_address: "new@example.com", referrer: "https://duskaudio.com/plugins/" });
});

test("signup: a bad address is refused before the spam check", async () => {
  for (const email of ["", "not-an-email", "a b@example.com", `${"x".repeat(250)}@example.com`]) {
    const r = await signup({ email });
    assert.equal(r.status, 400);
    assert.deepEqual(await r.json(), { ok: false, error: "email" });
  }
  assert.equal(calls.length, 0);
});

test("signup: a failed, missing or foreign spam check never reaches Kit", async () => {
  state.turnstile = { success: false, "error-codes": ["timeout-or-duplicate"] };
  assert.equal((await signup()).status, 403);

  state.turnstile = { success: true, hostname: "evil.example" };
  const r = await signup();
  assert.equal(r.status, 403);
  assert.deepEqual(await r.json(), { ok: false, error: "captcha" });

  assert.equal((await signup({ "cf-turnstile-response": "" })).status, 403);
  assert.equal(ops("siteverify").length, 2);
  assert.equal(ops("createSubscriber").length + ops("addToForm").length, 0);
});

test("signup: siteverify or Kit trouble is a 502, Kit's own address check a 400", async () => {
  state.turnstileStatus = 500;
  assert.equal((await signup()).status, 502);
  assert.equal(ops("createSubscriber").length, 0);

  state.turnstileStatus = 200;
  state.kitStatus = 500;
  const r = await signup();
  assert.equal(r.status, 502);
  assert.deepEqual(await r.json(), { ok: false, error: "upstream" });
  assert.equal(ops("addToForm").length, 0);

  state.kitStatus = 422;
  assert.equal((await signup()).status, 400);
});

test("signup: a missing or rejected secret is a 502 and a log line, not the visitor's fault", async () => {
  const errors = [];
  const orig = console.error;
  console.error = (...a) => errors.push(a.join(" "));
  try {
    assert.equal((await signup({}, {}, { ...env, TURNSTILE_SECRET: "" })).status, 502);
    state.turnstile = { success: false, "error-codes": ["invalid-input-secret"] };
    assert.equal((await signup()).status, 502);
    state.turnstile = { success: false, "error-codes": ["internal-error"] };
    assert.equal((await signup()).status, 502);
  } finally {
    console.error = orig;
  }
  assert.deepEqual(errors, ["subscribe: TURNSTILE_SECRET is not set", "subscribe: siteverify rejected TURNSTILE_SECRET"]);
  assert.equal(ops("createSubscriber").length + ops("addToForm").length, 0);
});

test("signup: CORS only for the site, and a referrer from elsewhere is dropped", async () => {
  const r = await signup({ referrer: "https://evil.example/page" }, { Origin: "https://evil.example" });
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), null);
  assert.deepEqual(ops("addToForm")[0].body, { email_address: "new@example.com" });

  const pre = await worker.fetch(
    new Request("https://w.example/subscribe", { method: "OPTIONS", headers: { Origin: "https://duskaudio.com" } }),
    env,
  );
  assert.equal(pre.status, 204);
  assert.equal(pre.headers.get("Access-Control-Allow-Origin"), "https://duskaudio.com");
  assert.match(pre.headers.get("Access-Control-Allow-Methods"), /POST/);
});

test("signup: a form posted without JavaScript gets a page, and nothing runs", async () => {
  const r = await signup({}, { "Sec-Fetch-Mode": "navigate" });
  assert.equal(r.status, 403);
  assert.match(r.headers.get("Content-Type"), /text\/html/);
  assert.match(await r.text(), /needs JavaScript/);
  assert.equal(calls.length, 0);
});
