# Dusk Studio — Launch operations

> **Not customer-facing.** Keep on a private branch or in a private repo — never on public `main` — until launch day.
> Operational sequence for the Founders Edition launch. Source of truth for cadence + email copy.

---

## Cohort terms

- **Founders Edition:** $79 one-time. Covers all 1.x + all 2.x updates. Bounded — not "lifetime".
- **Future price anchor:** $149. This MUST become the real post-cohort price or the strikethrough is a lie. Charge $149 (or open the $15-per-major upgrade path) once the cohort closes.
- **Cohort cap:** 200 buyers OR Aug 31, 2026 — whichever comes first. Hard close. Do not reopen, do not discount later.
- **One-time licence:** $27, stays live permanently. 2.0 = $15 upgrade.

---

## Pre-launch sequence

| Window | Action |
|---|---|
| T-90 → T-30 | Daily short-form content (YouTube short / Reddit / X thread) on "home recording without plugin paralysis." Every CTA → the demo lead magnet (`/dusk-audio/#free-demo`). |
| Continuous | **Speed-to-lead:** first email fires **within 60 seconds** of form submit. Automation, not manual broadcast. Contents below. |
| T+7d after each signup | Demo follow-up nudge (below). Soft anchor to slots remaining. |
| T-14 | Tease email: "1.0 ships in 2 weeks. Founders opens [date], 200 slots, $79 (post-launch $149)." |
| T-0 → T+7 | Cohort open. 5-email tightening cadence (below). |
| T+7 | **Close. Hold the close.** Extending kills every future urgency play. |
| T+8 → T+30 | Swap pricing card: Founders → "Standard Premium $149" (or flip the strikethrough $149 to the live price). No reopen, no discount. |

> All T±X are relative to launch day (**T+0 = Aug 24, 2026**), so the **T+7 close = Aug 31, 2026** — matching the Cohort cap above. The 200-buyer cap preempts the schedule: if it's reached before T+7, close immediately.

---

## Email automation (Buttondown or MailerLite — user picks)

### 1. Welcome / speed-to-lead (fires < 60s on signup)
- Subject: **Your Dusk Studio demo (Linux / Mac / Win)**
- Body:
  - Three platform download URLs (Linux AppImage / macOS DMG / Windows MSI). <!-- TODO: real GitHub Release URLs once the demo build lands (separate DuskStudio-repo plan). -->
  - "How to load your first soundfont in 60 seconds" — one short paragraph.
  - P.S. "Only **X / 200** founder slots remain — claim at https://duskaudio.com/dusk-audio/#pricing"

### 2. Demo follow-up nudge (T+7d after signup)
- Subject: **How's the demo going?**
- Body: "Stuck on anything? Reply and we'll help." Soft anchor to Founders slots remaining. No telemetry — just a check-in.

### 3. Launch cadence (cohort open, 5 emails)
1. T-0 — Launch announce. Founders open, 200 slots, $79, post-launch $149.
2. T+48h — Recap + slots remaining.
3. T+5d — 24h-to-close.
4. T+6.5d — 12h-to-close.
5. T+6d23h — 1h-to-close + "X / 200 slots left".

> Optional SMS at the 1h mark — skip unless signups exceed ~300 (ROI threshold for SMS setup). Email-only is fine for v1.

---

## Founders "Zero-to-Export" onboarding (Phase 5.25)

Every Founders buyer picks one (in the post-purchase email):

1. **15-min 1:1 call** — Cal.com (free) or SavvyCal. Four 15-min slots/day in a daily 1-hour block, 5 days/week. 200 founders all-1:1 = 200 × 15 min = ~50 hours over the window — workable, especially with group-default.
2. **Weekly group session** — 30 min, Wednesdays 18:00 local. Recorded → Founders Discord. Covers unsigned-binary first launch, template load, first record, first export. Rotates weekly so any new founder catches it within a week.

**Overflow rule:** if 1:1 calendar overflows, switch new bookings to group-only and email the backlog the next group date. Don't promise calls you can't deliver.

### Post-purchase email (Lemon Squeezy-triggered)
> Welcome, Founder. You unlocked Dusk Studio + a 15-minute "Zero-to-Export" onboarding call.
>
> Two options — pick one:
> - **1:1 call** — book a slot: [cal.com/duskaudio/founders](https://cal.com/duskaudio/founders) <!-- TODO: real Cal.com URL -->
> - **Live group session** — Wednesdays 18:00 [TZ]. Drop in: [discord.gg/duskaudio](https://discord.gg/duskaudio) <!-- TODO: real Discord invite -->
>
> If you'd rather just get going, the manual + template are inside the download. The "Finish your song or it's free" guarantee runs 30 days from today.

---

## Payments (Lemon Squeezy)

- Merchant-of-Record → LS handles EU VAT. Worth the ~5% + $0.50 vs filing VAT MOSS.
- One product, platform variants (Linux AppImage / Mac DMG / Win MSI). Two checkout URLs ($27 + $79).
- Replace `REPLACE-WITH-27-UUID` / `REPLACE-WITH-79-UUID` placeholders in `dusk-audio/index.html` with the real LS checkout links.
- Post-purchase redirect → `https://duskaudio.com/dusk-audio/thanks.html`.
- Licence validation: honor system for v1 (licence email = trust). Same as Ardour. Revisit only if piracy is real at scale (it won't be).

---

## Refund operations

- Manual via Lemon Squeezy refund button.
- Track rate in a private `refunds.csv` (**NOT committed**). Flag if > 5% over any rolling 30-day window — signals the onboarding pipeline or copy is broken.
- Bonus retention is honor-system; LS doesn't claw back delivered email assets.

---

## Git plan (Phase 5.75)

- Repo stays **public** (free GitHub Pages; GPL ethos).
- Do all edits locally, **don't commit intermediate pricing states** (no "$49 → $79" history that undermines the anchor).
- Launch day: single squash commit `feat(dusk-studio): Founders Edition launch landing`.
- Keep pricing-experiment notes on a private branch or in a private repo (this file) — never on public `main`; never commit `TODO: lower price` etc.

---

## Outstanding setup tasks (external, before launch)

- [ ] Lemon Squeezy account + product + 2 checkout URLs → paste into `index.html`.
- [ ] Mailing-list provider (Buttondown / MailerLite) + welcome automation (< 60s) + 3 platform demo URLs.
- [ ] Cal.com account + Founders booking page → paste into `thanks.html` + post-purchase email.
- [ ] Founders Discord + invite link → paste into `thanks.html` + post-purchase email.
- [ ] Demo build GitHub Release (separate DuskStudio-repo plan) → URLs into welcome email.
- [ ] `#founders-count` widget: decide JS source (LS purchase count) — placeholder "—" until then.
- [ ] Compute real `sha256` + `size_bytes` for every `soundfonts/manifest.json` entry.
