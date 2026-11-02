# Dusk Audio newsletter Worker (signup + Patreon post -> Kit)

A small Cloudflare Worker with two jobs for the website's email list on [Kit](https://kit.com)
(free plan):

1. **Signup.** The duskaudio.com form posts to `POST /subscribe`. The Worker verifies the
   visitor's Cloudflare Turnstile token, then adds the address to the Kit form, and Kit sends
   its confirmation email (double opt-in).
2. **Post notify.** A new Patreon post becomes a Kit broadcast for the list, **minus anyone who
   is already on Patreon**. Patreon emails its own members about a post, so those people would
   otherwise get it twice.

This directory is **not** part of the Jekyll site (it's in `_config.yml` → `exclude`). Deploy
it separately with Wrangler. It is independent of `builds-gate/` and shares no secrets with it.

## How it works

### Signup

```
Visitor submits the form on duskaudio.com (with a token from the Turnstile widget)
  -> POST /subscribe   (form-urlencoded: email, cf-turnstile-response, referrer)
  -> address check                                 else 400 {"error":"email"}
  -> Turnstile siteverify, token from duskaudio.com  else 403 {"error":"captcha"}
  -> Kit: create the subscriber as inactive, then add them to the form "Newsletter site"
       -> Kit emails the confirmation link; they become active when they click it
  -> 200 {"ok":true}   (the same answer for new and existing addresses)
```

- The Kit form id is only in `wrangler.toml`, never in the page, so bots can't post to Kit
  directly. The October 2026 bot wave posted straight to the old provider's form endpoint.
- Kit sends at most one confirmation email per address per 12 hours.
- A missing or wrong `TURNSTILE_SECRET` makes every signup a 502 ("something went wrong on
  our side"), never a failed spam check, and `wrangler tail` shows which.
- Only origins in `ALLOWED_ORIGINS` may read the answer (CORS). A form posted without
  JavaScript has no token and gets a one-line "needs JavaScript" page.
- Addresses are never logged.

### Post notify

```
You publish a post on Patreon
  -> Patreon webhook (posts:publish) -> POST /patreon/webhook   (HMAC signature checked)
  -> 202 at once; the rest runs after the response (Patreon times out after 5 s)
  -> read the campaign's member emails from the Patreon API
  -> sync the Kit tag "Patreon member (auto)": on every subscriber who is on Patreon, off
     everyone else
  -> create a Kit broadcast for everyone WITHOUT that tag
       SEND_MODE="draft" (default): left as a draft for you to review and send
       SEND_MODE="send":            scheduled 10 minutes out (time to unschedule it in Kit)
```

- **Nobody is imported into Kit.** Patreon emails are only compared with the existing list, in
  memory. They are never stored or logged.
- "On Patreon" means paying members and free members. Former patrons lose the tag, because
  Patreon no longer emails them.
- The tag marks who to leave out, so new signups need no tagging. Only changes on the Patreon
  side cost API calls.
- Patron-only posts go out as a title and a link; their text is never put in the email.
  Set `PUBLIC_ONLY="1"` to skip them entirely.
- Kit renders Liquid in emails, so a `{{` or `{%` in a post's title or text is defused.
- The Worker answers Patreon before doing the work, because Patreon waits only 5 seconds and
  pauses the webhook after repeated timeouts. A failure after that answer is not retried by
  Patreon: no draft appears, and `wrangler tail` shows `post-notify failed: <post id> ...`.
- The broadcast's internal description ends in `[patreon:<post id>]`. A redelivered webhook
  finds that marker and does nothing, so one post makes one broadcast.

### When it will not send on its own

Even with `SEND_MODE="send"`, the Worker leaves a draft whose subject starts with
`[CHECK RECIPIENTS]` when the tag may not be up to date:

- **The Patreon member list could not be read** (expired token, missing email scope, outage).
  The tag is left as it was, so someone who has since joined Patreon may still be a recipient.
  Fix the cause, run `/sync?apply=1`, then take the prefix off the subject and send.
- **More tag changes were due than one run makes** (30; see the notes). Run `/sync?apply=1`
  until `remaining` is 0, then take the prefix off the subject and send.

## One-time setup

1. **Kit**: authenticate duskaudio.com, confirm the sender address and make it the default
   (broadcasts use Kit's default sender). The form "Newsletter site" is the one Kit made for
   its hosted newsletter site, so its confirmation email is set in Audience growth →
   Newsletter site → Sign Up Form, not in Landing pages & forms: keep "Send confirmation
   email" checked and "Auto-confirm new subscribers" unchecked.
2. **Kit API key**: Kit → Settings → Developer → API keys (V4).
3. **Turnstile**: Cloudflare dashboard → Turnstile → add a widget for `duskaudio.com`
   (Managed). Its sitekey goes in the site's `_config.yml` (`turnstile_sitekey`), its secret
   into the Worker below.
4. **Patreon creator token**: Patreon developer portal → your API client → **Creator's Access
   Token**. It must be able to read member emails (`campaigns.members[email]`).
5. **Admin token**: `openssl rand -hex 32`.
6. **Deploy once** so the Worker has a URL (the webhook secret comes in step 8):
   ```
   npm install
   wrangler login
   wrangler secret put KIT_API_KEY
   wrangler secret put TURNSTILE_SECRET
   wrangler secret put PATREON_CREATOR_TOKEN
   wrangler secret put ADMIN_TOKEN
   npm run deploy
   ```
   Note the `https://dusk-post-notify.<account>.workers.dev` URL it prints. The site's
   `newsletter_subscribe_url` is that URL plus `/subscribe`.
7. **Dry run** (changes nothing; prints counts only):
   ```
   curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" https://<worker-url>/sync
   ```
   Check `subscribers`, `alsoOnPatreon` and `recipients` look right. `"ok": false` means the
   Patreon or Kit token is wrong; `wrangler tail` shows which. Then apply it, repeating a few
   minutes apart until `remaining` is 0:
   ```
   curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" "https://<worker-url>/sync?apply=1"
   ```
8. **Patreon webhook**: developer portal → Webhooks → add `https://<worker-url>/patreon/webhook`
   with only the **`posts:publish`** trigger. Copy its secret:
   ```
   wrangler secret put PATREON_WEBHOOK_SECRET
   ```
9. **Publish a post** and look for the draft in Kit → Broadcasts.

Once a few drafts have come through clean, set `SEND_MODE = "send"` and redeploy.

## Testing

- `npm test` runs the Worker against a fake Patreon, Kit and Turnstile (no network, no
  secrets). CI runs it on pull requests (`.github/workflows/post-notify.yml`).
- `wrangler dev` reads `.dev.vars` (see `.dev.vars.example`). Its Turnstile dummy secret
  accepts only the token of the dummy sitekey `1x00000000000000000000AA`, so a local copy of
  the site needs that sitekey and a `newsletter_subscribe_url` pointing at `wrangler dev`.
- `wrangler tail` shows live logs; a failed sync or signup logs its reason.
- A request with a wrong `X-Patreon-Signature` gets a 401 and touches nothing.

## Notes / tradeoffs

- **Matching is by email address.** Someone who uses one address on Patreon and another on
  the newsletter still gets both emails. There is no other key to join on.
- **A patron who muted Patreon's emails gets neither.** They are on Patreon, so they are left
  out of the Kit send.
- **Kit only emails confirmed subscribers.** Unconfirmed, unsubscribed and bounced
  subscribers never get a broadcast. Unconfirmed patrons are tagged too, so they are already
  left out once they confirm.
- **One API call per tag change.** Kit's bulk endpoints need OAuth, and the Workers Free plan
  allows 50 subrequests per run, so one run makes at most 30 changes. A post normally needs a
  handful; the first sync may take a few `/sync?apply=1` calls.
- **Kit's lists can lag** a few minutes behind changes (about 2 minutes for a tag in testing).
  That is why `SEND_MODE="send"` schedules 10 minutes out, and why `/sync` can still report
  changes it just made: leave a few minutes between `/sync?apply=1` runs, or the next run
  repeats work instead of finishing it. The duplicate check reads the broadcast list, so it handles
  sequential webhook retries but is not an atomic lock: overlapping deliveries can create
  duplicate broadcasts. Keep draft mode until persistent deduplication is added if automatic
  sending must guarantee one email per post.
- **Rotating the Kit key**: create a new key in Kit, `wrangler secret put KIT_API_KEY`, then
  delete the old key in Kit.
