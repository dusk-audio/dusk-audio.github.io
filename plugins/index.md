---
layout: page
title: Plugins
subtitle: Free audio plugins for Linux, Windows, and macOS
description: Download free VST3, LV2, and AU audio plugins from Luna Co. Audio. EQ, compression, analysis tools and more.
---

All Luna Co. Audio plugins are **100% free** — no trials, no feature locks, no accounts. Just download and create.

## Available Now

<div class="plugin-grid">
{% assign released = site.data.plugins | where: "status", "released" %}
{% for plugin in released %}
<div class="plugin-card">
  <div class="plugin-card-image">
    <img src="{{ '/assets/images/plugins/' | append: plugin.slug | append: '-screenshot.png' | relative_url }}" alt="{{ plugin.name }} screenshot">
  </div>
  <div class="plugin-card-content">
    <div class="plugin-card-header">
      <h3>{{ plugin.name }}</h3>
      <span class="status-badge released">Released</span>
    </div>
    <p>{{ plugin.description }}</p>
    <div class="plugin-card-footer">
      <a href="{{ '/plugins/' | append: plugin.slug | append: '/' | relative_url }}" class="btn btn-primary">Details</a>
      <a href="{{ site.releases_url }}" class="btn btn-download">Download</a>
    </div>
  </div>
</div>
{% endfor %}
</div>

## Coming Soon

Plugins that are nearly finished and will be released shortly.

<div class="plugin-grid">
{% assign coming_soon = site.data.plugins | where: "status", "coming-soon" %}
{% for plugin in coming_soon %}
<div class="plugin-card">
  <div class="plugin-card-image">
    <span class="placeholder">Screenshot coming soon</span>
  </div>
  <div class="plugin-card-content">
    <div class="plugin-card-header">
      <h3>{{ plugin.name }}</h3>
      <span class="status-badge coming-soon">Coming Soon</span>
    </div>
    <p>{{ plugin.description }}</p>
  </div>
</div>
{% endfor %}
</div>

## In Development

Plugins currently being built. Follow us for updates!

<table class="plugins-table">
  <thead>
    <tr>
      <th>Plugin</th>
      <th>Description</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {% assign in_dev = site.data.plugins | where: "status", "in-dev" %}
    {% for plugin in in_dev %}
    <tr>
      <td><strong>{{ plugin.name }}</strong></td>
      <td>{{ plugin.tagline }}</td>
      <td><span class="status-badge in-dev">In Development</span></td>
    </tr>
    {% endfor %}
  </tbody>
</table>

---

## Platform Support

All released plugins are available for:

| Platform | Formats |
|----------|---------|
| **Linux** | VST3, LV2 |
| **Windows** | VST3 |
| **macOS** | VST3, AU |

## Installation

### Linux

**VST3:**
```
~/.vst3/
/usr/lib/vst3/
/usr/local/lib/vst3/
```

**LV2:**
```
~/.lv2/
/usr/lib/lv2/
/usr/local/lib/lv2/
```

### Windows

**VST3:**
```
C:\Program Files\Common Files\VST3\
```

### macOS

**VST3:**
```
~/Library/Audio/Plug-Ins/VST3/
/Library/Audio/Plug-Ins/VST3/
```

**AU:**
```
~/Library/Audio/Plug-Ins/Components/
/Library/Audio/Plug-Ins/Components/
```

---

## Get Updates

Want to know when new plugins are released?

<a href="{{ site.patreon_url }}" class="btn btn-primary">Follow on Patreon</a>
