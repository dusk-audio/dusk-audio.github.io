---
layout: default
title: Home
og_title: "Dusk Audio — a 24-track DAW laid out like a mixing console"
description: "Dusk Studio is a 24-track DAW for recording, mixing, and mastering, laid out like a mixing console. Dusk Audio also makes free instruments and effects for Linux, macOS, and Windows."
body_class: showcase-page home-page
---

<section class="showcase-hero dark-surface" aria-labelledby="home-title">
  <div class="container">
    <div class="hero-intro">
      <div>
        <h1 id="home-title">A 24-track DAW laid out like a mixing console</h1>
        <p class="hero-description">Dusk Studio records, mixes, and masters songs on Linux, macOS, and Windows.</p>
        <p>Great for all genres.</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="{{ '/dusk-studio/' | relative_url }}">How Dusk Studio works</a>
          <a class="btn btn-secondary" href="{{ '/plugins/' | relative_url }}">Browse free plugins</a>
        </div>
      </div>
    </div>
    {% include console-figure.html %}
  </div>
</section>

<section class="showcase-section takes-preview" aria-labelledby="takes-title">
  <div class="container feature-split">
    <div class="feature-copy">
      <h2 id="takes-title">Comp the best parts of every take</h2>
      <p class="eyebrow release-label">{% include studio-release-label.html %}</p>
      <p>Record another pass, pick the best sections from each take, and hear the comp change while the song plays. Every take stays whole underneath.</p>
      <a class="text-link" href="{{ '/dusk-studio/' | relative_url }}#takes">How takes and comping work</a>
    </div>
    {% include screenshot.html src='/assets/images/studio/takes.webp' alt='Three colored take lanes with selected sections combined into a performance in the audio editor' width=1294 height=1030 %}
  </div>
</section>

<section class="showcase-section" aria-labelledby="instruments-title">
  <div class="container feature-split feature-split--image-first">
    {% include screenshot.html src='/assets/images/studio/sfz-online.webp' alt='The SFZ Manager searching four free sample libraries for orchestra, with VSCO 2 Community Edition selected and its CC0 license shown' width=1112 height=772 %}
    <div class="feature-copy">
      <h2 id="instruments-title">Play SFZ instruments and SoundFonts</h2>
      <p>Search more than 100 free instruments in four libraries from inside Dusk Studio, from the Salamander Grand Piano to the VSCO 2 chamber orchestra, or open your own .sfz and .sf2 files. The sampler is built in.</p>
      <a class="text-link" href="{{ '/dusk-studio/' | relative_url }}#instruments">How instruments work</a>
    </div>
  </div>
</section>

<section class="showcase-section" aria-labelledby="plugins-title">
  <div class="container">
    <div class="section-intro">
      <h2 id="plugins-title">Free instruments and effects</h2>
      <p>Plugins for Linux, macOS, and Windows, free and open source.</p>
    </div>
    <ul class="plugin-list">
      {% assign current_plugins = site.data.plugins | where: 'generation', 'current' | where: 'status', 'released' | sort: 'display_order' %}
      {% for product in current_plugins %}{% include plugin-row.html product=product %}{% endfor %}
    </ul>
    <a class="text-link" href="{{ '/plugins/' | relative_url }}">All plugins</a>
  </div>
</section>

<section class="showcase-section story-section" aria-labelledby="story-title">
  <div class="container feature-split">
    <div class="feature-copy">
      <h2 id="story-title">It started when my Tascam DP-24 stopped working</h2>
      <p>Dusk Studio began as a way to get its workflow back: record the performance, then mix, then master, each on its own stage.</p>
      <a class="text-link" href="{{ '/about/' | relative_url }}">The story behind Dusk Audio</a>
    </div>
    <div class="get-started-copy">
      <h3>Dusk Studio is in beta</h3>
      <p>Official builds are available through Patreon from $5/month, or you can build from the open-source code for free.</p>
      <a class="btn btn-primary" href="{{ '/dusk-studio/' | relative_url }}#get">Get the beta</a>
      <p class="fine-print">The plugins are always free. A purchase option for Dusk Studio is planned for 1.0; pricing and release timing are still to come.</p>
    </div>
  </div>
</section>
