# Dusk Audio Website

Official website for Dusk Audio: Dusk Studio and a collection of free audio plugins.

**Live site:** https://duskaudio.com

## Local Development

### Prerequisites

- Ruby 2.7+ with Bundler
- Jekyll 4.x

### Setup

```bash
# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000/
```

## Structure

```
├── _config.yml          # Site configuration
├── _data/
│   ├── plugins.yml      # Plugin database, generations, and display order
│   ├── plugin_screenshots.yml # Plugin image sources, dimensions, and hashes
│   └── studio.yml       # DAW version and release state
├── _includes/           # Reusable components
├── _layouts/            # Page templates
├── _plugins/            # Individual plugin pages
├── assets/
│   ├── css/style.css    # Existing product-page styles
│   ├── css/showcase.css # Shared studio design and responsive showcase layouts
│   ├── js/showcase.js   # Navigation, accessible screenshot zoom, scrollable content
│   ├── fonts/           # Saira Condensed 700 and Saira, self-hosted (OFL)
│   └── images/          # Images, screenshots, and link preview cards (social/)
├── builds-gate/         # Cloudflare Worker gating patron builds at builds.duskaudio.com
├── plugins/             # Plugins listing page
├── index.md             # Home page
├── about.md             # About page
├── dusk-studio.md       # Dusk Studio product page
└── support.md           # Support/donation page
```

## Page themes

Every page uses the same charcoal palette, warm white text, and amber accents
defined in `assets/css/showcase.css`. Slightly lighter charcoal surfaces separate
headers, product information, installation details, and footers. Shared components
use the same color tokens so navigation, downloads, and newsletter forms remain
consistent when moving between the DAW, plugins, and information pages.

## Adding a New Plugin

1. Add the plugin entry to `_data/plugins.yml`
2. Create a page in `_plugins/` (copy an existing one as template)
3. Add its screenshots to `assets/images/plugins/` as lossless WebP, record them in
   `_data/plugin_screenshots.yml`, and make its link preview card (see "Link preview
   images" below)

Use `generation: current` for DAF plugins and `generation: legacy` for the original
JUCE collection. Set `display_order`, `category`, and a short `summary` for the
collection cards. Release `status` is separate from development generation:
legacy products still have working downloads and bug-fix support. Only released
or pre-release entries appear as downloadable cards. Add `successor` only when
the replacement has an existing product page and a published download.

## Dusk Studio releases

`_data/studio.yml` describes the Dusk Studio beta. `version` is the release the site
presents, `published_version` the build members can download, and `highlights` a short
list of what that release adds, shown under "Release notes and feedback".

- While a release is announced but not downloadable, set `release_status: upcoming`
  and keep the downloadable build in `published_version`. The takes labels then say
  "Coming in Dusk Studio <version>", and the page names the current official beta.
- When its official builds are published, set `release_status: released` and
  `published_version` to the same version. The hero, labels and release notes update
  together.

Do not change this simply because a release is planned.

Official beta builds use the existing Patreon flow. A purchase option is planned
for 1.0, with pricing, terms, and timing to be announced separately. Plugins remain
free. Do not advertise a 1.0 date or a future license benefit without confirmed terms.

## Product screenshots

The website uses real application captures, converted to lossless WebP in
`assets/images/studio/`. No generated mockup interface imagery is shipped.

| Website asset | Dusk Studio capture |
| --- | --- |
| `console.webp` | `full-mix-playing.png` |
| `recording-detail.webp` | `qg-04-record-rolling.png`, top left at full size |
| `takes.webp` | `docs/images/ed-06-take-lanes.png` |
| `mastering.webp` | `np-08-mastering-view.png` |
| `instrument.webp` | `bi-05-sunset.png` |
| `channel.webp` | `np-03-channel-strip-mixing.png` |
| `sfz-online.webp` | SFZ Manager, Online tab, captured by hand |

Console, recording, instrument, and channel images were recaptured from the 0.15
development binary. `recording-detail.webp` is the top left (x 6–807, y 42–211) of that
2560×1080 recording-stage capture, shown at its real size with labels. The full capture was
retired on November 4, 2026: the hero already shows the whole console, and the capture had a
tooltip in its menu row. The takes image is the documentation capture from the 0.16.0
tag, chosen for its readable portrait layout.

The mastering and SFZ Manager images come from the official 0.16.0 Linux x86_64
release (SHA-256 checked), captured on November 2, 2026:

- **Mastering:** the DAW's `docs/capture-screenshots.sh`, copied with `BIN` pointing at
  the release binary and `OUT` at a temporary folder. Its editor figures (piano roll,
  take lanes) did not render on Xvfb, which is why the takes image is the docs capture.
- **SFZ Manager:** driven by hand with `xdotool` on a private Xvfb display, browsing the
  real repositories. The harness's own SFZ figures show test fixtures, so they are
  not used.

The console hero was refreshed on October 5, 2026 from actual playback of an
isolated 16-track session using existing local multitrack audio. All ten visible
channels, four buses, and the stereo master show live levels. The 2560×1080 capture
is lossless WebP; no audio files are included in the website. Capture evidence is
in `/tmp/dusk-full-mix-capture/`.

Use the DAW's capture harness on an isolated Xvfb display, with
`DUSKSTUDIO_CONFIG_DIR` pointing at a temporary folder to preserve personal audio
and window settings. Reject captures containing warnings, dialogs, or incomplete
native panels. Check dimensions before updating image width/height attributes.

### Plugin screenshots

`_data/plugin_screenshots.yml` records the published release, capture date,
format, dimensions, and SHA-256 for each website plugin image. The October 5,
2026 refresh captured all 11 released plugins from their published Linux x86_64
binaries, with CLAP for ten plugins and LV2 for Spectrum Analyzer. Mode galleries
use those same binaries. These captures do not imply that PDF manuals were rebuilt.
On November 3, 2026 the images were converted to lossless WebP with identical
pixels; the recorded hashes are of the WebP files.

When updating a plugin release, refresh both its collection-card screenshot and
all product-page gallery/body images from the released binary. Save them as
lossless WebP (`magick in.png -define webp:lossless=true out.webp`), and record the
new version, image hashes, and dimensions in the manifest. Cards, product-page
screenshots, and galleries take their width and height from the manifest; images
written into a page's body need `width`, `height`, `loading="lazy"`, and
`decoding="async"` by hand. Use an isolated Xvfb display for native captures; keep
host chrome, tooltips, and unrelated dialogs out of the image. Give analyzers real
audio or MIDI input when showing their analysis. Check the page and carousel on
desktop and mobile.

### Link preview images

Every page's `og:image` is a 1200×630 JPEG card in `assets/images/social/`. Social
sites show that size without cropping, and not all of them handle WebP. Plugin pages
use `<slug>.jpg`, made from the page's `screenshot`. Every other page uses
`dusk-studio.jpg`, made from `console.webp` (`social_image` in `_config.yml`). After
changing any of those screenshots, remake the cards (needs Pillow):

```bash
python3 .github/scripts/social-cards.py
```

## Icons and fonts

- `favicon.ico` (16, 32, and 48 px) and `assets/images/apple-touch-icon.png` (180 px)
  are rendered from `assets/images/icon.svg` (a crescent moon and a cat).
  - The 16 px frame keeps only the crescent.
  - The 32 and 48 px frames leave out the star.
  - The touch icon is the full drawing on a square background.
  - `assets/images/favicon.png` is the earlier line-art icon. No page loads it.
- Fonts: one family, hosted in `assets/fonts/` with its SIL Open Font License.
  - Saira Condensed 700 is used for h1 and h2.
  - Saira, a variable font covering weights 400 to 700, is used for all other text.
  - These are the Latin and Latin Extended files Google Fonts serves; no page requests
    Google Fonts.
  - Both Latin files are preloaded, because every page uses both fonts.

## Validation

```bash
bundle exec jekyll build --strict_front_matter
git diff --check
```

Check the homepage, DAW showcase, collections, and product pages at desktop and
mobile widths. Test the menu, screenshot zoom (including Escape and focus return),
plugin carousel, installation accordions, and navigation without JavaScript.
Confirm download filenames against published GitHub release assets. The latest
visual comparison and validation notes are in `design-qa.md` (excluded from the
published site).

## Email signup

“Get updates” stays visible outside the mobile menu. Contextual prompts open the
same signup form in an accessible dialog; closing restores it to the footer.
There is one form and one input, including after success. Field, spam-check and
network failures show inline messages. No timed popup or email gate is used.

The list is on Kit. The form posts to the post-notify Worker's `/subscribe`
(`newsletter_subscribe_url` in `_config.yml`; see `post-notify/README.md`), which
checks a Cloudflare Turnstile token server-side and adds the address to Kit. Kit
then sends its confirmation email (double opt-in). Kit's form id is not in the
page, so bots can't post to Kit directly. Turnstile's script loads on the first
click or focus in the form, not with every page, and the widget only shows when it
needs a click. The sitekey is `turnstile_sitekey` in `_config.yml`. Without
JavaScript there is no token, so links still scroll to the footer, but the Worker
answers the plain POST with a short “needs JavaScript” page.

Signup browser tests run against a local `wrangler dev` with Turnstile's test keys
(see `post-notify/README.md`, Testing). Only deliberate test addresses reach Kit.

Audio demonstrations are deferred until real recordings are available. The
rejected generated examples, players, session download, and related walkthrough
have been removed.

## License

Website content © Dusk Audio. All rights reserved.
