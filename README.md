# Luna Co. Audio Website

Official website for Luna Co. Audio — free, high-quality audio plugins.

**Live site:** https://luna-co-software.github.io/lunacoaudio.github.io/

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

# Visit http://localhost:4000/lunacoaudio.github.io/
```

## Structure

```
├── _config.yml          # Site configuration
├── _data/
│   └── plugins.yml      # Plugin database (edit this to add/update plugins)
├── _includes/           # Reusable components
├── _layouts/            # Page templates
├── _plugins/            # Individual plugin pages
├── assets/
│   ├── css/style.css    # Stylesheet
│   └── images/          # Images and screenshots
├── plugins/             # Plugins listing page
├── index.md             # Home page
├── about.md             # About page
└── support.md           # Support/donation page
```

## Adding a New Plugin

1. Add the plugin entry to `_data/plugins.yml`
2. Create a page in `_plugins/` (copy an existing one as template)
3. Add screenshot to `assets/images/plugins/`

## Assets Needed

Place these files in `assets/images/`:

- `logo.png` — Site logo (recommended: 200x200px or larger)
- `favicon.png` — Favicon (32x32px)
- `plugins/4k-eq-screenshot.png` — 4K-EQ screenshot

## License

Website content © Luna Co. Audio. All rights reserved.
