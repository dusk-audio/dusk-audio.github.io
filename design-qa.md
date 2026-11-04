# Website redesign QA

final result: passed

## Unified site theme — October 5, 2026

Latest approved direction: carry the DAW's charcoal palette across every page.
This supersedes the earlier dark-DAW/light-site split below. The shared root
tokens now define charcoal backgrounds, warm white text, amber links/buttons,
and lighter charcoal panels. Headers, footers, plugin pages, About, Support,
404, installation code, status badges, newsletter fields, and support boxes use
the same palette. Product screenshots, typography, layouts, and links are retained.

Evidence: `/tmp/dusk-site-unified-theme-2026-10-05/`. `plugins-comparison.png`,
`about-comparison.png`, and `support-comparison.png` combine the previous light
pages and revised dark pages at matching 1440 × 1000 dimensions. Desktop and
mobile captures use deviceScaleFactor 1, loaded fonts/images, and signed-out
state. Representative evidence includes `plugins-1440-top.png`,
`sunset-390-top.png`, `home-plugins-1440.png`, and `about-menu-390.png`.
The changes in palette are intentional; headings, spacing, image quality, and
content retain the existing design. No actionable P0/P1/P2 differences remain.

During validation, the old plugin support button had insufficient contrast with
the new amber tokens. Replaced its white/amber styling with a charcoal panel and
an amber button with dark text. Post-fix evidence: `all-pages-report.json`.
All 34 page/viewport checks and twelve interaction checks pass, with no detected
WCAG A/AA violations, overflow, missing visible images, or page JavaScript errors.
Strict Jekyll build and `git diff --check` also pass. Chromium coverage and
previously documented external-flow limitations still apply.

## Earlier theme refinement — October 5, 2026 (superseded)

Marc approved a dark Dusk Studio page and homepage DAW opening, with warm ivory
for the remaining homepage sections, plugin pages, About, and Support. This
supersedes the original mockup's alternating DAW sections and dark plugin band.
Typography, amber accents, product imagery, and layouts retain the selected
direction. The synth heading now describes six vintage synth circuits and one
expressive instrument instead of “Instruments for real music.”

Theme evidence: `/tmp/dusk-site-theme-2026-10-05/`. Desktop/mobile viewports are
1440 × 1000 and 390 × 1000 at deviceScaleFactor 1, with fonts and images loaded.
`studio-record-1440.png` shows the continuous dark DAW treatment;
`studio-details-390.png` shows readable dark installation details;
`plugins-1440-top.png`, `sunset-390-top.png`, and `about-menu-390.png` show light
headers, content, and mobile navigation. `home-plugins-1440.png` shows the light
homepage plugin section. Shared footers and newsletter sections inherit their
page palette. Computed surface colors are recorded in `surfaces.json`.
`plugins-theme-comparison.png` combines the prior dark collection header and
the new light header at matching 1440 × 1000 dimensions. The palette difference
is intentional; the typography, grid, and product image treatment are retained.

The theme change passed all 34 desktop/mobile page checks and twelve interaction
checks with no detected WCAG A/AA violations, overflow, missing visible images,
or page JavaScript errors. Evidence: `all-pages-report.json`. The final homepage
and plugin collection copy received four additional desktop/mobile checks in
`final-copy-checks.json`. Earlier screenshot-comparison notes below document the
initial redesign rather than the superseding theme revision.

## Comparison target and evidence

Source visual truth: the selected art-direction mockup (option 1).

Implementation: `http://127.0.0.1:4000/`, captured using local headless Google
Chrome through Playwright. No personal browser profile was used.

Source pixels: 1122 × 1402, normalized to 1440 × 1800 for comparison.
Implementation pixels and CSS viewport: 1440 × 1800, deviceScaleFactor 1.
State: signed-out homepage, scroll position zero, fonts loaded, dialog and menu
closed. The source is an art-direction mockup, rather than a browser capture;
native screenshots and verified product copy intentionally replace mock content.

Evidence directory: `/tmp/dusk-site-qa/evidence/`.

- Rendered implementation: `home-reference-viewport.png`.
- Full-view combined comparison: `comparison-final.png` (source left, site right).
- Focused combined comparisons: `hero-detail.png` and `takes-detail.png`.
  These compare corresponding typography and feature regions; section positions
  differ slightly because the real images retain their native proportions.
- Mobile implementation: `home-mobile-top.png`, `plugins-390-top.png`.
- DAW showcase: `dusk-studio-1440-top.png`; full-page evidence for every route
  is listed in `report.json`.

## Findings and iteration history

No actionable P0/P1/P2 findings remain.

1. Initial comparison: blocked. [P2] The hero consumed too much vertical space,
   the takes heading wrapped into three desktop lines, and the feature copy
   was vertically centered against the image. Evidence: `comparison-initial.png`.
   Tightened header/hero spacing, adjusted display type scale and the two-column
   grid, and aligned the takes copy to the image top.
2. Second comparison: blocked. [P2] The landscape takes capture weakened the
   intended composition and made the lanes less readable. Used the genuine
   portrait documentation capture, preserving its aspect ratio. Evidence:
   `comparison-round2.png`.
3. Final comparison: passed. Evidence: `comparison-final.png`, `hero-detail.png`,
   `takes-detail.png`. The opening hierarchy, charcoal/ivory transitions,
   condensed headings, warm accents, and screenshot emphasis follow option 1.
4. Browser checks also found [P2] inline links distinguished only by color and
   [P2] installation code overflowing a phone viewport. Added underlines and
   contained horizontal scrolling for code/specifications, with keyboard focus.
   The final automated checks found neither issue.

## Required fidelity surfaces

- **Typography:** Saira Condensed supplies the heavy display hierarchy, with
  readable system sans body/control text. Desktop heading line breaks and
  mobile wrapping were inspected. The mock's unknown exact font and raster
  antialiasing differ acceptably from browser text.
- **Spacing/layout:** Hero, console, takes, and dark plugin spotlight retain
  the selected composition. Actual screenshot proportions and additional
  released-product cards lengthen later sections intentionally. Mobile grids
  stack cleanly; navigation and CTAs remain accessible.
- **Colors:** Charcoal, warm ivory, muted body text, and amber accents match
  the direction. Links, focus states, and controls have sufficient contrast
  in the checked states.
- **Images:** Six real DAW captures use lossless WebP. Original plugin images
  remain uncropped within collection cards. The mockup's interface art is not
  used as a product screenshot. Enlarging preserves legibility and restores focus
  on close. No fake interface drawings substitute for product assets.
- **Copy:** DAW and plugin offers are distinct. Plugins remain free. Official
  beta builds use the existing Patreon flow; source builds remain available.
  1.0 purchase pricing and timing are unannounced. 0.15 takes are marked upcoming
  until the release data is updated. Legacy JUCE products explicitly retain
  bug-fix support with no new feature development.

## Validation

- Strict Jekyll build passes; JavaScript syntax and `git diff --check` pass.
- All 17 HTML pages have valid local asset/link targets and unique IDs.
- 34 browser page/viewport cases: 1440 × 1800 and 390 × 844. No horizontal
  page overflow, missing visible images, or axe WCAG A/AA violations detected.
- Twelve extra layout cases at 320, 768, and 769 pixels wide have no overflow.
- Twelve interaction checks pass: mobile menu, Escape and focus return,
  keyboard screenshot zoom, plugin carousel, installation accordion, and
  mobile navigation with JavaScript disabled. No page JavaScript errors recorded.
- All 44 direct plugin download targets match published GitHub release assets;
  evidence: `/tmp/dusk-site-qa/release-check.json`.

Limitations: Chromium only; no Safari/Firefox or physical-device checks.
Automated accessibility checks do not replace a screen-reader audit. Newsletter
submission and authenticated Patreon downloads were not exercised. No publishing
or release action was performed.

## Implementation checklist

- [x] Implement selected direction using real product images.
- [x] Showcase takes, recording, mixing, instruments, and mastering.
- [x] Present current DAF plugins first and supported legacy JUCE separately.
- [x] Preserve existing downloads and installation information.
- [x] Validate responsive layouts, keyboard interactions, and accessibility.
- [x] Record final visual comparison and remaining coverage limits.

Release follow-up (done November 2, 2026): `_data/studio.yml` now marks 0.16.0
released. README.md, "Dusk Studio releases", has the steps for future releases.


## Plugin release screenshots — October 5, 2026

- All 11 released plugin versions in the catalog and product pages match the
  latest published GitHub releases checked today. Download tags remain unchanged.
- Refreshed 42 images from those released Linux x86_64 binaries: 11 card images,
  six Sunset Circuits modes and its preset browser, three Multi-Q modes, eight
  Multi-Comp modes, twelve visible DuskVerb engines, and TapeMachine 2 calibration.
- TapeMachine 2 v1.0.11 now shows the faceplate selector, with an additional gallery
  image displaying +3, +6, +7.5, and +9 dB. Added those levels to its features.
- 4K EQ 2 now shows v1.0.5, replacing an image labeled v2.0.11. DuskVerb now includes
  Parallel Hall and describes twelve selectable engines, matching the released UI.
- Captures used CLAP for ten plugins and LV2 for Spectrum Analyzer. Chord Analyzer
  received a C-major MIDI triad; Spectrum Analyzer received test audio.
  Other screenshots show idle interfaces and do not pretend to show live processing.
- Release URLs, dimensions, and SHA-256 hashes are recorded in
  `_data/plugin_screenshots.yml`. Capture evidence is in
  `/tmp/dusk-plugin-captures-2026-10-05/`.
- PDF manuals were not regenerated. Native captures cover Linux, not macOS/Windows.

- Validation: strict Jekyll build and `git diff --check` pass. All 26 desktop/mobile
  cases (home, collection, and eleven product pages) have no visible broken images,
  page overflow, JavaScript errors, or axe WCAG A/AA findings. Twelve existing
  interaction checks pass. Eight extra carousel checks cover every slide and
  wrapping in TapeMachine 2, DuskVerb, Sunset Circuits, and Multi-Q at both widths.
  Website evidence is in the capture directory's `website-qa/` folder.


## Final publication review — October 5, 2026

- Fixed two TapeMachine 2 changelog entries parsed as YAML mappings, and escaped
  shared HTML metadata. Rechecked all changelog entries as plain strings.
- Preserved upstream Multi-Q 2 and DuskVerb 2 development listings and builds-gate
  fixes. Kept the 0.1.0 DuskVerb 2 manual matching the current source version.
- Production strict Jekyll build, JavaScript syntax checks, all 17 pages' local
  targets/anchors/IDs, all 44 release download filenames, and 42 screenshot hashes pass.
- After merging upstream changes, all 34 desktop/mobile browser cases and twelve
  interaction checks pass, with no broken visible images, horizontal overflow,
  JavaScript errors, or automated WCAG A/AA findings.
- All twelve post-notify tests pass using mocked services. It is excluded from the
  site and remains in draft mode. Its documentation now clarifies that sequential
  retry deduplication does not serialize overlapping webhook deliveries. The Worker
  requires separate deployment; this website publication does not deploy it or send email.
- Coverage remains Chromium only. No real newsletter submission or authenticated
  Patreon purchase/download was performed; existing PDF manuals were not rebuilt.
- Final build and browser evidence: `/tmp/dusk-publish-final/`.


## Email access and audio removal — October 5, 2026

- Marc rejected the example music. Removed the Listen page, all example
  audio/MIDI/session assets, plugin players, navigation links, and the
  walkthrough using that music. Removed related data, tools, JavaScript, and CSS.
  Listening content is deferred until real recordings are available.
- Kept the persistent Get updates link, contextual homepage/DAW prompts, and plugin
  update/download shortcuts. Signup text now describes builds and plugin releases.
- Kept the single MailerLite form/dialog, keyboard focus restoration, no-JavaScript
  fallback, visible error handling, and the corrected success callback.
- After removal, strict production build, JavaScript syntax, and diff whitespace
  checks pass. All 17 pages and 515 local links/media/anchors pass, with no demo
  players, Listen route, or example media left in the built site.
- Thirty-one retained signup checks pass at 1440, 390, and 320 pixels, covering
  accessibility, focus, validation, mocked network/field errors, retries, success,
  and the no-JavaScript fallback. No real subscriber was created.


## Full-mix hero screenshot — October 5, 2026

- Replaced console.webp with a lossless 2560×1080 native playback capture. An
  isolated 16-track session uses existing local multitrack WAVs, with routing to
  four buses. All ten visible channel meters, four bus meters, and the stereo
  master show actual signal levels; no meter graphics were fabricated.
- Updated the homepage and DAW hero alt text. Screenshot dimensions are unchanged.
  No audio is shipped, and the original user sessions and source audio were not
  modified. Capture processes used temporary config/audio output and were stopped.
- Strict production build and diff whitespace checks pass. Both hero pages decode
  the image at its expected dimensions and pass screenshot zoom and overflow
  checks at 1440 and 390 pixels. Evidence: /tmp/dusk-full-mix-capture/.


## Kit email signup — November 2, 2026

- The newsletter moved from MailerLite (free plan capped at 250 subscribers) to Kit.
  The form posts to the post-notify Worker's `/subscribe`, which checks a Cloudflare
  Turnstile token and adds the address to Kit; Kit sends the confirmation email.
  Google reCAPTCHA, MailerLite's script and the floating-dialog workaround for
  reCAPTCHA's challenge frame are gone.
- Turnstile loads on the first focus or click in the form and stays invisible unless
  it needs a click, so the field and button keep their row.
- Checked in Chrome against a local `wrangler dev` with Turnstile's test keys, at
  1440 pixels and at 390 and 320 pixels in iframes: invalid address, success and its
  focus, the dialog's open, close and focus return with one redrawn widget, success
  inside the dialog, no horizontal overflow, and no console errors. The refused spam
  check, Kit's address check and the server error were answered by a stubbed fetch
  in the page, and the unreachable Worker by a closed port; the Worker's side of
  those answers is covered by its unit tests and curl.
- One real signup with a test address reached Kit as an unconfirmed subscriber on
  the "Newsletter site" form. A signed test webhook made a Kit draft (never sent)
  for everyone without the Patreon tag, and a redelivery was skipped as a duplicate.
- All 24 post-notify tests, the strict production build and the diff whitespace
  check pass.


## Dusk Studio 0.16 — November 2, 2026

- The site now presents Dusk Studio 0.16.0, released November 1; 0.15.0 and 0.15.1
  shipped in October. `_data/studio.yml` is `released` at 0.16.0 with a `highlights`
  line. The hero, the takes labels and the release notes show 0.16.0, and the
  "preview of 0.15" note is gone.
- New 0.16 copy:
  - Record mentions MIDI Merge and live piano-roll notes.
  - A "Find free instruments." block covers the SFZ Manager.
  - Master adds phase analysis and the Mono monitor.
- The macOS requirement follows the 0.16 manual (macOS 11 or later). The home page's
  Patreon price now says $5/month, matching the Studio page; new members join at $5
  (`builds-gate/README.md`).
- `mastering.webp` and `sfz-online.webp` come from the official 0.16.0 Linux x86_64
  release, SHA-256 checked. `takes.webp` is not a new capture:
  - `mastering.webp` (1424×1120) is the capture harness's mastering view. It was
    captured on an isolated Xvfb display with a private PipeWire graph and a temporary
    home. It shows the new Phase panel, with no warnings, dialogs or incomplete panels.
  - `sfz-online.webp` (1112×772) was driven by hand with `xdotool` on a private Xvfb
    display, against the real repositories. It shows All repositories, a search for
    "orchestra", and VSCO 2 Community Edition selected with its CC0 license. It is
    cropped to the window bounds, with no tooltips, test data or rate-limit notices.
  - `takes.webp` is unchanged. It is pixel-identical to the 0.16.0 tag's documentation
    capture, and no audio-editor source changed after that capture. The harness's
    editor figures did not render on Xvfb.
- Checked:
  - The strict build and `git diff --check` pass.
  - The built home and Studio pages contain no 0.14 or 0.15 version text, no "Coming
    in" and no "preview of".
  - Every Studio image's width and height match its file.
  - Over the DevTools protocol at 1440 and 390 pixels, with every image loaded and
    decoded:
    - there is no horizontal overflow, and no console errors, warnings or exceptions;
    - the Record, Takes and Master sections render as intended. The new block puts its
      image beside the copy on desktop and its copy first on mobile.

Limitations: Chromium only. The SFZ Manager's Installed tab is not shown; it needs a
large pack download to look populated.

## Page weight and accessibility pass — November 3, 2026

- Icons: every page linked the 1024 px `favicon.png` (635 KB) as its icon. Pages now
  link `favicon.ico` (16, 32 and 48 px, 5 KB) and a 180 px Apple touch icon (27 KB).
- Plugin images: all 44 PNGs are now lossless WebP, 7.32 MB → 3.09 MB. Each WebP was
  decoded and compared with its PNG (identical pixels) before the PNG was removed.
  Nothing else linked to the PNGs. Checked: Kit, MailerLite and Patreon posts, release
  notes in the four dusk-audio repositories, and the DuskStudio and plugins
  repositories.
  - Cards, product-page screenshots and galleries take width and height from
    `_data/plugin_screenshots.yml`.
  - The Multi-Comp, Multi-Q and DuskVerb body images are lazy and sized.
- Link previews: 1200×630 JPEG cards from `.github/scripts/social-cards.py`, with
  `og:image:width`, `og:image:height` and alt text. They replace `console.webp`
  (2560×1080 WebP) and the plugin PNGs.
- Saira Condensed 700 is self-hosted; no page requests Google Fonts. It was the only
  weight any page loaded (all 18 pages at both widths), so 500 and 600 are not hosted.
- Accessibility:
  - The menu button's accessible name is now its visible text, "Menu".
  - The footer column headings (`h4` → `h2`) and the Support page's option headings
    (`h3` → `h2`) no longer skip levels. Their computed styles are unchanged.
- Removed: the keywords meta tag; jekyll-feed, whose `feed.xml` had no entries; the
  unused `body.theme-dark` rules in `style.css`; and four unreferenced images, 1.6 MB
  (`logo.png`, `dusk-studio-hero.png`, `dusk-studio-mixing.png`,
  `dusk-studio-mastering.png`).
- Checked against the previous build, over the DevTools protocol, for all 18 pages at
  1440 and 390 pixels:
  - Page heights are unchanged. With images blocked, pages now keep their loaded height
    (Multi-Comp at 1440: 11,921 px before, 17,430 px now), so image space is reserved.
  - Full-page captures match. 13 of 96 tiles differed by sub-pixel text and single
    pixel rows. Capturing the unchanged build twice gave 15 such tiles, including 11 of
    those 13. The other 2 were recaptured three more times, and each had pixel-identical
    before/after pairs.
  - Computed styles of the changed headings and of every h1 are unchanged.
  - Nothing is requested from other sites on load. There are no console errors or
    warnings and no broken or distorted images. The preloaded font is fetched once.
  - Bytes loaded up front, summed over the 36 loads: 18.4 MB → 7.8 MB. Home at 1440:
    1,129 KB → 379 KB. Multi-Comp: 2,242 KB → 303 KB.
  - The strict build, `git diff --check` and `check-downloads.sh` pass. There are no
    broken internal links or anchors, and every image has a width and height.

Limitations: Chromium only. How each social site displays the new cards was not tested.

## Plainer headings and labels — November 3, 2026

This pass removes the commonest signs of a template: all-caps labels, a label above every heading, "A · B · C" meta strings, and copy that sells instead of describing.

- Labels:
  - The tracked all-caps label above most headings is gone. Before this pass there were 9 on Home, 6 on Dusk Studio and 16 on Plugins.
  - Two labels stay, in sentence case, because they carry information:
    - each plugin card's category;
    - the Dusk Studio release that has takes: "Available in the Dusk Studio 0.16.0 beta", or "Coming in Dusk Studio <version>" while that release is upcoming.
  - The Dusk Studio page shows its release label only while a release is upcoming.
  - Removed badges:
    - "Available now" on released plugin pages;
    - the per-row "In development" badge on the Plugins page, whose section heading already says it.
  - Now in sentence case: status badges, footer headings, platform headings in the download box, table headers, and the "Live sound" category.
- Middle-dot strings are now sentences. The home hero's side note is gone, and its platform list moved into the hero text.
- Headings:
  - Headings are plain statements, not two-part slogans, and have no closing full stop.
  - The Dusk Studio sections are named as in its section menu: Record, Takes and comping, Mix, Master, Get the beta.
  - The new headings are working drafts.
- Links:
  - No link says "Explore X".
  - Plugin cards link from the plugin's name and image, and keep their Download link.
  - Other links say where they go, for example "How takes and comping work", "All plugins" and "Current version: TapeMachine 2".
  - The sidebar buttons are in sentence case.
- Headings use `text-wrap: balance` in place of hand-placed line breaks.
- Checked against the previous build at 1440 and 390 pixels, on Home, Dusk Studio, Plugins, Sunset Circuits and TapeMachine:
  - Nothing overflows horizontally.
  - The pages are shorter. Home at 1440 px went from 6,786 px to 6,539 px.
  - The strict build, `git diff --check` and `check-downloads.sh` pass.
  - No internal link or anchor is broken. There are 17 fewer internal links, all of them "Explore X" card links.

Limitations: tested in Chromium only, and only the five pages above were captured. The About page, the Support page and plugin body copy are unchanged.

## Instruments, labelled console, one type family, new icon — November 3, 2026

This is the second pass. The first changed only words and labels; this one changes the layout, the type and the icon.

- Wording:
  - The site no longer calls Dusk Studio a portastudio. Its screen is a mixing console, and only the record → mix → master stages come from the Tascam DP-24.
  - The home h1, both pages' descriptions and link-preview titles, and the site description now say "a 24-track DAW laid out like a mixing console".
  - About and 404 still say "portastudio-style".
- Console figure (`_includes/console-figure.html`, on Home and Dusk Studio):
  - The capture is labelled the way MANUAL.md labels the main window: "Stage selector" above it, and "Channel strips 1–10 of 24", "Buses 1–4" and "Master" below.
  - The labels are hidden below 640 px, where they would collide. The image's alt text names the same parts.
- Instruments:
  - Dusk Studio has a new section and menu entry for the SFZ/SF2 sampler and the SFZ Manager. It covers:
    - the four online libraries;
    - published demos;
    - your own .sfz, .sf2 and .bank.xml files, with the preset picker;
    - sessions that keep their sounds;
    - the Sunset synth, moved here from Record.
  - Home has a matching block after the takes section.
  - The facts come from MANUAL.md and the 0.16.0 changelog. Nothing is from the unreleased 0.16.1.
- Type:
  - Saira (variable, 400 to 700) replaces the system font for text. Saira Condensed stays for h1 and h2.
  - Every page now preloads 33 KB more (the Latin file).
- Icon:
  - A bold crescent and cat, drawn in `assets/images/icon.svg`, replaces the line art, which blurred at tab sizes.
  - At 16 px the icon is the crescent alone.
- Checked at 1440 and 390 px on Home, Dusk Studio, Plugins, Sunset Circuits and About:
  - Nothing overflows horizontally.
  - The strict build, `git diff --check` and `check-downloads.sh` pass.
  - No internal link or anchor is broken.

Limitations: tested in Chromium only. The icon is a draft until Marc approves it.

## Instrument counts — November 3, 2026

The Instruments copy says "more than 100 free instruments". The count follows Dusk Studio 0.16's browse rules in `src/engine/sfz/SfzProvider.cpp`:

- **SFZ Instruments:** 73. The org has 76 public repositories, minus three that the app can't download:
  - `sfzinstruments.github.io` (the website);
  - `sfztemplates`;
  - `mappings` (SFZ files without samples).

  Each of the 73 has `.sfz` files and audio samples in its git tree.
- **FreePats:** 41. These are the repositories with a CC0 or CC BY licence, the only kinds the app offers. Of the user's 45, two GPL repositories and two without a licence are excluded.
- **Versilian Studios:** 2 collections, VSCO 2 Community Edition and VCSL. The app installs their SFZ releases.
- **Musical Artifacts:** not counted. Its API answered 403 to a scripted request. The 0.16 live validation (Dusk Studio, `docs/validation/0.16-sfz-live.json`) saw 6 eligible packs on its first page.

That makes 116 downloadable packs from three sources, before Musical Artifacts. Most packs are one instrument; the Versilian collections hold dozens each. So "more than 100" understates the total.

To refresh the count:
- `gh api --paginate '/orgs/sfzinstruments/repos?type=public&per_page=100'`
- `gh api --paginate '/users/freepats/repos?type=owner&per_page=100'`, filtered on `license.spdx_id`.

## Fewer template patterns — November 4, 2026

Below the hero the site still read as a template. Labels were fixed on November 3; what
remained was structural: every section built the same way (heading, grey paragraph, amber
link, screenshot swapping sides), rows of equal feature columns, a grid of identical plugin
cards, a signup prompt three times per page, and the Studio page showing the console twice in
a row.

- Footer: only the copyright line remains. About: one section removed at Marc's request.
- Home:
  - The mid-page signup band and the four-column "One stage at a time" row are gone. The
    stages are now a sentence in the DP-24 story, where the idea comes from.
  - The Sunset Circuits spotlight and the card grid became one plugin list: thumbnail, name,
    one line, download link and version. Sunset Circuits no longer appears twice.
- Dusk Studio:
  - Record shows a full-size crop of the recording stage (`recording-detail.webp`) labelled
    "Record, loop, punch", "Markers", "Input" and "Monitor, arm, print", instead of a second
    full console.
  - Mix shows the channel strip at its real 155 px, instead of stretched to 240 px, labelled
    down its side with the manual's names for its parts. Its copy names the parts and the insert
    slot's plugin formats, and starts at the top of the strip.
  - The three-column rows under Instruments and Takes became sentences in the section text.
  - The signup band above "Get the beta" became one inline link in that section's text.
  - "Before you install" lines up with the other sections instead of centering.
- Plugins:
  - The current and legacy collections use the same list; legacy rows are compact.
  - Plugin pages keep their feature lists, which carry most of the detail on Ring Out and
    DuskVerb 2, as plain bullets instead of check marks.
  - Taglines are in sentence case, without "Professional". Four summaries now give facts
    from the plugins' descriptions instead of "character and movement" and the like.
- Copy: removed "keep the workflow purposeful", "a familiar console", "The constraints are
  intentional", "Always free. No trials, accounts, or feature locks." and "Follow us for
  updates!". About and 404 no longer say "portastudio-style".
- Checked at 1440, 390 and 320 px on Home, Dusk Studio, Plugins and Ring Out:
  - Nothing overflows horizontally. The side labels hide below 640 px on the Record crop and
    below 340 px on the channel strip.
  - The strict build, `git diff --check` and `check-downloads.sh` pass.
  - No internal link or anchor is broken.

Limitations: tested in Chromium only. The home story and the new section text are drafts for
Marc to rewrite.


## Cream and burgundy redesign — November 4, 2026

### Target and evidence

The visual target is the user's selected cream/burgundy concept, refined with the
exact existing headline, prominent beta access, the Tascam story, comping, SFZ,
and all five released current plugins. The user's written corrections take
precedence over generated text or altered product interfaces in the concept.

- Source visual truth, desktop: `/tmp/dusk-design-review/evidence/reference-desktop.png`
  (724 × 2172 px; original generation `exec-b3914b04-0375-451c-9b2f-6864be499f0a.png`).
- Source visual truth, phone: `/tmp/dusk-design-review/evidence/reference-mobile.png`
  (1122 × 1402 px; original generation `exec-d025c115-de49-438f-90cb-65ba50af8a6d.png`).
- Browser implementation: local Jekyll output, home `/`, Studio `/dusk-studio/`,
  catalog `/plugins/`, product, About, Support, and 404 routes.
- Final home captures: `/tmp/dusk-design-review/evidence/redesign-home-1440-full.png`
  (1440 × 5463 px) and `redesign-home-390-full.png` (390 × 6242 px).
- Viewports: 1440 × 1000 and 390 × 844 CSS px, device scale factor 1. Initial page
  state, menu and dialogs closed, all visible/lazy page images loaded, fonts ready,
  reduced motion enabled. The full capture includes content below the viewport.
- Full-view comparison: `/tmp/dusk-design-review/evidence/compare-home-full.png`.
  The browser capture is proportionally downsampled to the reference's 724 px
  width. It is not stretched to the generated page's height.
- Focused comparisons: `compare-home-hero-story.png`, `compare-home-plugins.png`,
  and `compare-home-mobile.png`, in the same evidence directory. Each puts source
  and browser output together in one image and was opened for visual inspection.
  The phone concept includes a surrounding canvas: crop x=211..910, y=0..1402,
  then proportionally normalize to 390 px wide. Compare to the first 1240 CSS px
  of the actual phone page. The concept is not a measured browser viewport;
  touch-target sizing and real fonts take priority over its compressed spacing.
- Supporting page captures: `redesign-{studio,plugins,sunset,tape,about,support}-{1440,390}.png`
  and matching `-full.png` files. Newsletter error state:
  `redesign-newsletter-error-390.png` (captcha mocked, no subscriber created).

### Findings and iteration history

1. **P2, plugin image alignment:** initial frames inherited different intrinsic
   heights, so paired plugin titles did not align. Evidence:
   `iteration-1-redesign-home-1440-full.png`. Fixed the image frames at a 1.6 ratio
   and contained each original image inside them. Final frames are all 404 px high
   at desktop and 216 px at 390; `compare-home-plugins.png` confirms alignment.
2. **P2, phone console crop:** initial crop clipped the left edge of track 9.
   Evidence: `iteration-1-redesign-home-390.png`. Adjusted the crop ratio from 1.16
   to 1.19. Final `compare-home-mobile.png` shows both tracks, four buses, and the
   master intact. The full original image opens from both the image and caption.
3. **P2, feature layout:** the existing centered split placed comping and SFZ copy
   far below the top of their images. Top-aligned the home feature copy with a
   small inset; final full-view comparison confirms the manual-like layout.
4. **P2, inline link distinction:** the new palette exposed two links that relied
   on color alone: newsletter privacy sitewide and email updates in Studio.
   `iteration-2-verification.json` records the initial axe findings. Added inline
   link underlines; all 36 page/viewport accessibility scans then returned zero
   WCAG A/AA violations (`final-accessibility.json`).

No actionable P0/P1/P2 findings remain after the final captures and comparisons.

### Required fidelity surfaces

- **Typography:** real self-hosted DejaVu Sans regular/bold follows Dusk Studio's
  native `DuskPanelWindow.cpp` font resource. IBM Plex Mono is limited to versions
  and readouts. Browser font loading passed on every tested route/width. Headline
  wording and hierarchy match the brief, with natural wrapping and no truncation.
  The generated mock's approximate lettering and unusually compressed phone text
  are replaced by the specified fonts and comfortable line heights. No Inter,
  Manrope, Space Grotesk, DM Sans, or Instrument fonts are loaded.
- **Spacing/layout:** desktop uses a two-part hero and full console; the story
  follows immediately, then two specific features. Five large plugin entries use
  two columns and a final spanning entry, stacking on phones. Large frame sizes,
  aligned captions, 44 px header controls, and no viewport overflow are confirmed.
  The real captures' proportions and a readable footer make the implemented page
  longer than the generated concept. This is intentional, not image distortion.
- **Colors/tokens:** cream `#f4f1e9`, inset paper `#ebe6db`, ink `#262621`, burgundy
  `#7b2639`, and a visible blue focus outline. Screenshots have a clear edge against
  the paper. The SFZ section uses a restrained paper variation. The same tokens
  apply to Studio, catalog, product, About, Support, forms, and error states.
- **Images:** all shipped product imagery is the original lossless application
  capture, with dimensions intact. No generated UI, gradients, stock images, or
  drawn replacement controls were added. The source concept distorts some plugin
  shapes (especially 4K EQ 2 and Ring Out); preserving real interfaces overrides
  those distortions. The phone crop is CSS-only and retains a full-image link.
- **Copy:** exact 24-track/mixing-console H1 retained, Dusk Studio named above it,
  actual released version displayed, beta action and $5/month terms visible in
  the hero. The Tascam line, comping explanation, and SFZ details are retained.
  All five cards use the data file's real names, summaries, versions, and download
  URLs. “Great for all genres.” is removed. No mockup slogans, fabricated proof,
  placeholder media, or new future-release promises are introduced.

### Validation

- Strict production Jekyll build passes; `node --check assets/js/showcase.js` and
  `git diff --check` pass. The font licenses are shipped with the self-hosted files.
- All 18 routes at 320, 390, 768, 1024, and 1440 px: 90 layout checks, no horizontal
  overflow, one H1 each, expected font loaded, header beta action visible.
  Home and Studio hero actions remain above the fold at every tested width.
- 36 final axe scans (all 18 routes at phone/desktop sizes): zero WCAG 2 A/AA and
  2.1 AA violations. No browser console errors or page exceptions.
- 657 local link/asset/anchor references resolve; no duplicate IDs. The existing
  `check-downloads.sh` passes: all 60 public plugin download/release links answer
  200, and Studio's official build links point to supported gate paths.
- Interaction checks pass: menu open/Escape/focus return; both console zoom
  triggers/Escape/focus return; home beta link to the access section; installation
  accordion; all seven Sunset carousel slides loading and wrapping; mobile
  download anchor below the sticky header; newsletter opening, invalid-address
  message, closing/focus return and single-form restoration; reduced motion.
- Without JavaScript: navigation, beta link, full-console link, and all four
  platform download links remain available.
- On Sunset's phone page the actual download section now begins around y=708 px,
  before its long description, compared with roughly y=5925 px in the audit.
- Evidence: `iteration-2-verification.json`, `final-accessibility.json`, and
  `redesign-inspection.json` under `/tmp/dusk-design-review/evidence/`.

Limitations: Chromium only; no physical iPhone/Safari/Firefox or assistive-technology
session was run. Automated checks do not establish full WCAG conformance. The
newsletter interaction used a stubbed Turnstile script and an invalid address;
no live subscription or backend delivery was exercised. Generated reference images
are visual directions, not exact dimensional specifications. Evidence in `/tmp`
is local and temporary. No deployment or commit was made.

Implementation checklist: all layout, image, typography, interaction, and identified
accessibility fixes completed; local preview ready for review.

final result: passed

## Final editorial refinements — November 4, 2026

**Source visual truth:** the accepted cream/burgundy design above, the user's latest
numbered corrections, and the rendered baseline captures
`/tmp/dusk-design-review/refinement/before-home-1440-full.png` (1440×5463) and
`before-home-390-full.png` (390×6242). The written corrections intentionally change
the baseline's caption, wordmark, story, comping layout, and plugin section.

**Implementation evidence:** `/tmp/dusk-design-review/refinement/` contains
`home-1440-full.png` (1440×5604), `home-390-full.png` (390×6357),
`home-360-full.png` (360×6283), and corresponding viewport captures. Browser
viewports were 1440×1000, 390×844 and 360×844 CSS px, density 1, fonts loaded,
lazy images loaded, page at top, dialogs/menu closed, reduced motion enabled.
`comparison-desktop.png` puts both full pages together at 724 px wide with
proportional scaling. `comparison-mobile.png` compares matching 390 px content
regions at their original density. Both combined images were opened and inspected.
`comparison-hero-story.png` and `comp-final.png` provide focused evidence;
`header-scrolled-360.png` records the sticky action after scrolling.

**Changes and verified requirements:**

- Exact Sunset Circuits and TapeMachine 2 descriptions, Kit/Turnstile consent,
  right-column Patreon terms, and the footer's Legacy collection were already in
  the implementation. Assertions now confirm their rendered content and placement.
- Version follows the platform description, before the beta button. The free-plugin
  and planned 1.0 purchase note now also appears beside beta access on both pages.
- Desktop console caption removed; bracket labels remain. Phones retain the detail
  caption and link to the full console.
- The story uses two text columns on desktop. No personal DP-24 photo was present
  in project assets; the user was asked for a path. No placeholder or substitute
  photo was added. An authentic photo remains optional follow-up work.
- Home comping copy is above a wide detail of the real take lanes. Phones retain
  the full capture; the zoom dialog opens the full editor at either size.
- One burgundy section divider remains at the story; the hero retains its vertical
  access separator. Plugins sit on darker cream; All plugins is beside the heading.
- Restored the established spaced-capitals DUSK AUDIO wordmark. This is a deliberate
  continuation of the original site and plugin-panel treatment.
- On phones, the header beta action is hidden only while the hero action is visible.
  It appears when scrolling past the hero or opening the menu. Its reserved space
  prevents movement, focused links stay visible, and the no-JavaScript fallback
  keeps the action and navigation available.

**Iteration:** the first wide comping crop left a fragment of the main waveform
above the take-lane divider (P2). `iteration-1-comparison-desktop.png` and
`story-comp-detail.png` record this. Changed the frame from 2.1 to the measured
1294/552 ratio, starting at y=478 in the original 1294×1030 capture. The final
`comp-final.png` and full comparison confirm the clean divider and all three lanes.
A final mobile spacing correction removes the obsolete headline bottom margin;
its computed value and refreshed 390/360 px captures were checked. No actionable
P0/P1/P2 findings remain.

**Fidelity surfaces:**

- Fonts: Chrome's actual rendered-font inspection reports custom DejaVuSans-Bold
  for H1 and IBMPlexMono for versions. This confirms the app-matched font and real
  IBM Plex Mono are used, rather than a system or Courier fallback. Heading wraps
  remain readable; only the wordmark uses tracked capitals.
- Spacing: 360 px header stays on one line, primary hero buttons remain above the
  fold, price aligns beneath the button, story fills both columns, and the comp
  section no longer alternates with the SFZ split. Mobile order matches the brief.
- Color: existing cream/ink/burgundy tokens retained; darker cream moved to plugins,
  brighter image frames remain distinct, redundant burgundy rules removed.
- Images: original screenshots unchanged. New desktop comping detail is a reversible
  CSS crop with a complete-image link; no generated photography or UI is shipped.
- Copy: exact factual summaries, consent and privacy link, version, beta terms,
  free-plugin/1.0 note, and footer legacy link checked in the rendered DOM.

**Validation:** strict production Jekyll build, JavaScript syntax, diff whitespace,
and all 657 local link/asset/anchor references pass. All 18 routes pass 360 px header
and overflow checks; Home and Studio also pass 320, 390, 768, and 1440 px checks
(28 route/viewport checks including the repeated 360 cases). Four WCAG A/AA axe
scans on Home/Studio at 360/1440 return no violations. No browser console errors or
page exceptions. Header scroll/menu/focus behavior, both image zoom paths, and
no-JavaScript navigation pass. Results and rendered font evidence:
`/tmp/dusk-design-review/refinement/verification.json`.

Limitations: Chromium only; personal DP-24 photo not yet supplied. Public download
URLs and signup backend are unchanged and were not exercised again in this pass.
Preview remains at http://127.0.0.1:4000/. No deployment or commit was made.

Implementation checklist: requested code/layout refinements complete, optional
personal photo deferred until an authentic asset is available.

final result: passed

## Personal DP-24 photograph — November 4, 2026

Marc supplied `/home/marc/Downloads/Tascam-DP-24.JPG`. The homepage story now pairs
its text with this photograph on desktop and places the photograph below the text
at 768 px and narrower. This resolves the authentic-photo follow-up above. The
full recorder and original 4:3 framing remain visible; no generated or stock
imagery was used.

Web exports are `assets/images/story/tascam-dp-24-720.webp` (720×540, 108,754 bytes)
and `assets/images/story/tascam-dp-24.webp` (1440×1080, 327,568 bytes). Both are
resized sRGB copies with no EXIF camera/location metadata. The original is
unchanged. Responsive image selection, explicit dimensions, lazy loading,
descriptive alt text, and a short caption are present.

**Visual evidence:** inspected the source export and rendered story captures at
`/tmp/dusk-design-review/dp24/story-360.png` and
`/tmp/dusk-design-review/dp24/story-1440.png`. Browser viewports were 360×844 and
1440×1000 CSS px, density 1, with fonts and photo loaded, reduced motion enabled,
menu closed, and the story scrolled into view. The desktop columns are balanced;
the mobile text, link, photograph, and caption stack cleanly. The full recorder
fits without clipping or distortion. Existing type, colors, and story copy are
preserved. No actionable visual findings remain.

**Validation:** strict production Jekyll build and diff whitespace check pass.
All 658 local links/assets/anchors across 18 generated pages resolve. Chromium
checks at 320, 360, 768, and 1440 px confirm loaded images, correct column/stack
placement, and no horizontal overflow. At density 1 the browser selects the
720 px export; at 1440 px and density 2 it selects the 1440 px export. Whole-page
WCAG A/AA axe scans at 360 and 1440 px report zero violations. No console errors
or page exceptions. Evidence: `/tmp/dusk-design-review/dp24/verification.json`.

Limitations: browser checks use Chromium; external downloads and the signup
backend were unchanged and not exercised. Preview: http://127.0.0.1:4000/.
No deployment or commit was made.

Implementation checklist: authentic photo integrated and verified; no remaining
photo follow-up.

final result: passed

## Hero headline: focus on the song — November 4, 2026

The old h1, "A 24-track DAW laid out like a mixing console", described how the
screen looks rather than what Dusk Studio is for. Two drafts were rejected:
"Record, then mix, then master" and "From first idea to mastered song, all in
one place". The second is true of any DAW. The h1 now states the purpose from
Marc's DP-24 story, focus, and the line beside it says how Dusk Studio gets
there.

- Home and Dusk Studio:
  - h1: "A DAW that keeps you focused on the song".
  - Line beside it: "24 tracks and the limits of a hardware multitrack
    recorder. Record, mix, and master, one stage at a time. Runs on Linux,
    macOS, and Windows." It starts with "24 tracks" rather than "A 24-track
    DAW" so that "DAW" isn't repeated right after the h1.
  - Link-preview titles and descriptions say the same thing.
- This keeps the November 3 wording rule: the site doesn't call Dusk Studio a
  portastudio. Only the limits and stages are compared to a hardware recorder.
- About no longer uses the old phrase: its Dusk Studio section became the DP-24
  story (see "DP-24 story on About" below).

**Validation:** The h1 and description render on Home and Dusk Studio, with no
horizontal overflow at 360 px. The strict Jekyll build and `git diff --check`
pass. No commit or deployment was made.

final result: passed

## DP-24 story on About — November 4, 2026

The homepage story link said "The story behind Dusk Audio" but opened the top of
About, which had no DP-24 story. The story now lives on About, adapted from
Marc's June 4 Patreon post "Meet Dusk Studio (Alpha)".

- About: "## Dusk Studio" is now "## Why I built Dusk Studio" (`#dusk-studio-story`).
  It tells the DP-24 story in Marc's voice and ends with the existing beta, source
  and pricing paragraph.
  - "Back in December" is now "In December 2025".
  - "portastudio-style" is dropped, per the November 3 wording rule.
  - Alpha caveats, the $1/month and $27 pricing, and the feature list are left
    out. They are out of date or covered on the Dusk Studio page.
- Home: the story link now says "Why I built Dusk Studio" and goes to
  `/about/#dusk-studio-story`.

**Validation:** Strict Jekyll build passes. In Chromium, clicking the homepage
link lands on the heading just below the sticky header. `git diff --check`
passes. No commit or deployment was made.

final result: passed

## Easier signup — November 4, 2026

The email signup and the Patreon join link are easier to reach. There are no new
sections, popups or header buttons.

- Home:
  - The hero's small print ends "Not ready yet? Get an email when a new build
    comes out." The link opens the existing signup dialog (`data-newsletter`).
  - The plugins intro ends "Get an email when a new one comes out." It opens the
    same dialog.
- Dusk Studio, "Get the beta": the Official builds column now has two buttons,
  primary "Join on Patreon from $5/month" and secondary "Download for members".
  The "Not a member yet?" text link is gone.
- `showcase.css`: `.btn-primary` and `.btn-download` now have a 1 px border in
  their own color, so they match `.btn-secondary` in height (49 px) when they sit
  side by side. Every primary button is 2 px taller as a result.

**Validation:** In Chromium (DOM checks; screenshots timed out because the window
was in the background), both homepage links open the dialog with the email field
focused, and closing the dialog returns the form to the footer band. At 1920 px
the two beta buttons sit on one row at the same height. At 360 px they stack,
with no horizontal overflow. The strict Jekyll build and `git diff --check` pass.
No commit or deployment was made.

final result: passed

## Support card buttons and the download check — November 4, 2026

- Support: the Ko-fi card's text runs one line longer than Patreon's, so its
  button sat 25 px lower. `.support-option` is now a flex column and its button
  takes `margin-top: auto`, so both buttons sit on the card's bottom edge.
  "one-time" uses a non-breaking hyphen so it doesn't split across lines.
- `.github/scripts/check-downloads.sh`, the required `site-downloads` PR check,
  asserted that the Dusk Studio page's btn-primary button opens
  `builds.duskaudio.com/latest`. After "Easier signup", the primary button is
  "Join on Patreon" and the members' download is btn-secondary. The check now
  accepts either class, and must still find a button linking to `/latest`.
  `builds-gate/README.md` says the same.

**Validation:**
- The production strict build passes, and `check-downloads.sh` passes on it: the
  members' button opens `/latest`, every gate link is valid, and all 60 plugin
  download and release links answer 200.
- All 660 local links, assets and anchors across 18 built pages resolve.
- The Support buttons line up at desktop width. At 360 px the cards stack, with
  no horizontal overflow.
- `git diff --check` passes. No commit or deployment was made.

final result: passed

## Lighter hero, looser headings, Saira removed — November 4, 2026

- Hero small print (Home and Dusk Studio): "Plugins are always free. A purchase
  option for Dusk Studio is planned for 1.0…" is gone from both heroes, and so is
  its `.beta-future` rule. The same note is in the Get the beta section, About and
  Support. The hero keeps the Patreon line and the email link.
- Heading letter spacing: DejaVu Sans is a wide face, and the tight tracking
  cramped it. Every heading is loosened by the same proportion, so the h1 is
  still the tightest:

  | Heading | Before | After |
  | --- | --- | --- |
  | Hero h1 | −.045em | −.02em |
  | Page and plugin h1 | −.04em | −.02em |
  | Section, story and email h2 | −.035em | −.015em |
  | Plugin row h3 | −.025em | −.01em |
- Saira: the four Saira woff2 files and their `OFL.txt` license are removed.
  Nothing loaded them. `--font-display` in `style.css` no longer names Saira
  Condensed; `showcase.css` already set it to DejaVu Sans. The README says the
  files were removed.
- Copy rule: "finish songs instead of tweaking them forever" appears only in
  Marc's own story on About. Don't use it in headlines, teasers or other pages.

**Validation:**
- A clean production strict build passes, and `check-downloads.sh` passes
  (60/60 plugin links answer 200; the members' button opens `/latest`).
- No built page or CSS file mentions Saira.
- Only DejaVu Sans 400 and 700 and IBM Plex Mono 400 load on Home.
- `git diff --check` passes. No commit or deployment was made.

final result: passed
