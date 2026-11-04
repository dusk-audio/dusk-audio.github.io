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
      <p>Record another pass. Choose the strongest sections from each take, and hear your comp edits while the song plays. Your performances stay intact, ready for another listen.</p>
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

<section class="showcase-section" aria-label="Dusk Audio updates">
  <div class="container">{% include signup-prompt.html %}</div>
</section>

<section class="showcase-section plugin-showcase" aria-labelledby="plugins-title">
  <div class="container">
    <div class="feature-split feature-split--image-first">
      <a class="spotlight-image" href="{{ '/plugins/sunset-circuits/' | relative_url }}" aria-label="Sunset Circuits">
        <img src="{{ '/assets/images/plugins/sunset-circuits-screenshot.webp' | relative_url }}" alt="Sunset Circuits synthesizer with oscillator, filter, modulation, sequencer, and keyboard controls" loading="lazy" decoding="async" width="1240" height="780">
      </a>
      <div class="feature-copy">
        <h2 id="plugins-title">Free instruments and effects</h2>
        <p>Plugins for Linux, macOS, and Windows, built on the Dusk Audio Framework. Sunset Circuits, pictured, puts six vintage synth circuits in one instrument.</p>
        <a class="text-link" href="{{ '/plugins/' | relative_url }}">All plugins</a>
        <div class="legacy-link">
          <a class="text-link" href="{{ '/plugins/' | relative_url }}#legacy">Legacy collection</a>
          <p>Bug fixes continue. New development focuses on the current generation.</p>
        </div>
      </div>
    </div>
    <div class="collection-heading">
      <h3>Current plugins</h3>
      <p>Always free. No trials, accounts, or feature locks.</p>
    </div>
    <div class="product-grid">
      {% assign current_plugins = site.data.plugins | where: 'generation', 'current' | where: 'status', 'released' | sort: 'display_order' %}
      {% for product in current_plugins %}{% include product-card.html product=product %}{% endfor %}
    </div>
  </div>
</section>

<section class="showcase-section" aria-labelledby="workflow-title">
  <div class="container">
    <div class="section-intro">
      <h2 id="workflow-title">One stage at a time</h2>
      <p>The stages come from hardware multitrack recorders: get the performance down, then mix, then master.</p>
    </div>
    <ol class="workflow-list">
      <li><h3>Record</h3><p>Capture audio and MIDI across 24 tracks.</p></li>
      <li><h3>Refine</h3><p>Keep your takes and comp the best sections.</p></li>
      <li><h3>Mix</h3><p>Shape your sound with EQ, compression, and sends.</p></li>
      <li><h3>Master</h3><p>Finish with mastering EQ, multiband compression, limiting, and phase analysis.</p></li>
    </ol>
    <a class="text-link" href="{{ '/dusk-studio/' | relative_url }}">Each stage in detail</a>
  </div>
</section>

<section class="showcase-section story-section" aria-labelledby="story-title">
  <div class="container feature-split">
    <div class="feature-copy">
      <h2 id="story-title">It started when my Tascam DP-24 stopped working</h2>
      <p>Dusk Studio began as a way to get that focused, hands-on workflow back. The constraints are intentional: fewer decisions between an idea and a finished song.</p>
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
