# Dusk Audio post notifier (Patreon post -> MailerLite)

A small Cloudflare Worker that turns a new Patreon post into a MailerLite campaign for the
website's email list, **minus anyone who is already on Patreon**. Patreon emails its own
members about a post, so those people would otherwise get it twice.

This directory is **not** part of the Jekyll site (it's in `_config.yml` → `exclude`). Deploy
it separately with Wrangler. It is independent of `builds-gate/` and shares no secrets with it.

## How it works

```
You publish a post on Patreon
  -> Patreon webhook (posts:publish) -> POST /patreon/webhook   (HMAC signature checked)
  -> read the campaign's member emails from the Patreon API
  -> sync the MailerLite group "Post notify (not on Patreon)":
       every ACTIVE subscriber whose email is not a current Patreon member
  -> create a MailerLite campaign for that group
       SEND_MODE="draft" (default): left as a draft for you to review and send
       SEND_MODE="send":            sent immediately
```

- **Nobody is imported into MailerLite.** Patreon emails are only compared with the existing
  list, in memory. They are never stored or logged.
- "On Patreon" means paying members and free members. Former patrons stay on the MailerLite
  side, because Patreon no longer emails them.
- Patron-only posts go out as a title and a link; their text is never put in the email.
  Set `PUBLIC_ONLY="1"` to skip them entirely.
- The campaign name ends in `[patreon:<post id>]`. A redelivered webhook finds that marker
  and does nothing, so one post makes one campaign.

### When it will not send on its own

Even with `SEND_MODE="send"`, the Worker only leaves a draft when:

- **The Patreon member list could not be read** (expired token, missing email scope, outage).
  The draft is named `[CHECK RECIPIENTS] ...` and the group is left as it was, so it may
  contain someone who has since joined Patreon. Fix the cause, run `/sync?apply=1`, then send.
- **MailerLite refused the email body.** Setting HTML content over the API needs MailerLite's
  **Advanced** plan. On other plans the draft has the right recipients and subject but no
  body; open it in MailerLite, add the body, send.

## One-time setup

1. **MailerLite API token**: MailerLite → Integrations → API → generate a token.
2. **Sender address**: put an address that is already **verified in MailerLite** in
   `wrangler.toml` → `FROM_EMAIL`. Campaign creation fails without it.
3. **Patreon creator token**: Patreon developer portal → your API client → **Creator's Access
   Token**. It must be able to read member emails (`campaigns.members[email]`).
4. **Admin token**: `openssl rand -hex 32`.
5. **Deploy once** so the Worker has a URL (the webhook secret comes in step 7):
   ```
   npm install
   wrangler login
   wrangler secret put MAILERLITE_API_TOKEN
   wrangler secret put PATREON_CREATOR_TOKEN
   wrangler secret put ADMIN_TOKEN
   npm run deploy
   ```
   Note the `https://dusk-post-notify.<account>.workers.dev` URL it prints.
6. **Dry run** (changes nothing; prints counts only):
   ```
   curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" https://<worker-url>/sync
   ```
   Check `subscribers`, `alsoOnPatreon` and `recipients` look right. `"ok": false` means the
   Patreon or MailerLite token is wrong; `wrangler tail` shows which. Add `?apply=1` to
   create and fill the group.
7. **Patreon webhook**: developer portal → Webhooks → add `https://<worker-url>/patreon/webhook`
   with only the **`posts:publish`** trigger. Copy its secret:
   ```
   wrangler secret put PATREON_WEBHOOK_SECRET
   ```
8. **Publish a post** and look for the draft in MailerLite → Campaigns.

Once a few drafts have come through clean, set `SEND_MODE = "send"` and redeploy (Advanced
plan only; see above).

## Testing

- `npm test` runs the Worker against a fake Patreon and MailerLite (no network, no secrets).
- `wrangler tail` shows live logs; a failed sync logs its reason.
- A request with a wrong `X-Patreon-Signature` gets a 401 and touches nothing.

## Notes / tradeoffs

- **Matching is by email address.** Someone who uses one address on Patreon and another on
  the website list still gets both emails. There is no other key to join on.
- **A patron who muted Patreon's emails gets neither.** They are on Patreon, so they are left
  out of the MailerLite send.
- **Unconfirmed, unsubscribed and bounced subscribers are never added** to the group.
- **If the creator token stops working**, drafts start arriving as `[CHECK RECIPIENTS]`.
  Refresh the token in the Patreon developer portal and `wrangler secret put` it again.
- The duplicate check reads the 100 newest campaigns per status and handles sequential
  webhook retries. It is not an atomic lock: overlapping deliveries can create duplicate
  campaigns. Keep draft mode until persistent deduplication is added if automatic sending
  must guarantee one email per post.
