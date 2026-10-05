---
layout: default
title: Free plugins
og_title: "Dusk Audio — free instruments and effects"
description: "Explore the current Dusk Audio plugin collection: free instruments, EQ, tape, and delay for Linux, Windows, and macOS. Legacy plugins remain available with bug-fix support."
body_class: showcase-page plugins-page
---

<section class="showcase-hero collection-hero">
  <div class="container">
    <p class="eyebrow">Dusk Audio plugins</p>
    <h1>Find your sound.</h1>
    <p class="hero-description">Synths, EQ, tape, and delay.<br>Always free. No trials, accounts, or feature locks.</p>
    <nav class="collection-nav" aria-label="Plugin collections">
      <a href="#current">Current collection</a>
      <a href="#legacy">Legacy collection</a>
      <a href="#installation">Installation</a>
    </nav>
  </div>
</section>

<section class="showcase-section" id="current" aria-labelledby="current-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">The current generation</p>
      <h2 id="current-title">A fresh take on classic sound.</h2>
      <p>Our latest instruments and effects, built with the Dusk Audio Framework (DAF). Modern interfaces and ongoing feature development, available free for Linux, macOS, and Windows.</p>
    </div>
    <div class="product-grid">
      {% assign released = site.data.plugins | where: 'status', 'released' %}
      {% assign prerelease = site.data.plugins | where: 'status', 'pre-release' %}
      {% assign available = released | concat: prerelease %}
      {% assign current = available | where: 'generation', 'current' | sort: 'display_order' %}
      {% for product in current %}{% include product-card.html product=product %}{% endfor %}
    </div>
  </div>
</section>

<section class="showcase-section legacy-section" id="legacy" aria-labelledby="legacy-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">Original JUCE collection</p>
      <h2 id="legacy-title">Legacy plugins. Still supported.</h2>
      <p>The original Dusk Audio plugins remain free to download. Bug fixes continue; new features and interface development focus on the current generation.</p>
      <p class="fine-print">For existing projects, keep the version they were created with. Successor plugins are separate products; preset and session compatibility varies by plugin.</p>
    </div>
    <div class="product-grid legacy-grid">
      {% assign legacy = available | where: 'generation', 'legacy' | sort: 'display_order' %}
      {% for product in legacy %}{% include product-card.html product=product %}{% endfor %}
    </div>
  </div>
</section>

{% assign in_dev = site.data.plugins | where: 'status', 'in-dev' %}
{% assign coming_soon = site.data.plugins | where: 'status', 'coming-soon' %}
{% assign future = in_dev | concat: coming_soon %}
{% if future.size > 0 %}
<section class="showcase-section development-section" aria-labelledby="development-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">Looking ahead</p>
      <h2 id="development-title">On the workbench.</h2>
      <p>New tools in development. These standalone downloads are not available yet.</p>
    </div>
    <ul class="development-list">
      {% for product in future %}
      <li><h3>{{ product.name }}</h3><p>{{ product.tagline }}</p><span class="status-badge in-dev">In development</span></li>
      {% endfor %}
    </ul>
  </div>
</section>
{% endif %}

<section class="showcase-section installation-section" id="installation" aria-labelledby="installation-title">
  <div class="container reading-width">
    <h2 id="installation-title">Ready for your DAW.</h2>
    <p>Linux builds include x86_64 and arm64. Windows and macOS builds are also available. Formats and requirements vary by plugin; check its product page before downloading.</p>
    <details class="installation-details">
      <summary>Plugin installation paths</summary>
      <div class="installation-content" markdown="1">

## Plugin installation

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

**CLAP:**
```
~/.clap/
/usr/lib/clap/
```

### Windows

**VST3:**
```
C:\Program Files\Common Files\VST3\
```

**CLAP:**
```
C:\Program Files\Common Files\CLAP\
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

**CLAP:**
```
~/Library/Audio/Plug-Ins/CLAP/
/Library/Audio/Plug-Ins/CLAP/
```

</div>
</details>
</div>
</section>
