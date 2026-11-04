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
Chrome through Playwright. The in-app browser was unavailable; Marc explicitly
approved this fallback. No personal browser profile was used.

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
