---
layout: default
title: Dusk Studio
permalink: /dusk-studio/
og_title: "Dusk Studio — a portastudio for the desktop"
description: "A focused, 24-track desktop portastudio. Record audio and MIDI, shape your mix, and master your song. Explore its console, mastering tools, and 0.15 takes and comping workflow."
body_class: showcase-page studio-page
og_image: /assets/images/studio/console.webp
---

<section class="showcase-hero dark-surface" aria-labelledby="studio-title">
  <div class="container">
    <p class="eyebrow">Dusk Studio · Desktop portastudio</p>
    <h1 id="studio-title">Your music.<br>Your whole studio.</h1>
    <p class="hero-description">24 tracks. A hands-on console. Recording, mixing,<br class="desktop-break"> and mastering in one focused place.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="#get">Get Dusk Studio beta</a>
      <a class="btn btn-secondary" href="#takes">Explore takes and comping</a>
    </div>
    <p class="hero-meta">Linux · macOS · Windows &nbsp; / &nbsp; Open source &nbsp; / &nbsp; {% if site.data.studio.release_status == 'released' %}{{ site.data.studio.version }}{% else %}{{ site.data.studio.published_version }}{% endif %} beta</p>
    {% include screenshot.html src='/assets/images/studio/console.webp' alt='Dusk Studio mixing console with channel EQ, compression, aux sends, buses, and master controls' eager=true width=2560 height=1080 %}
  </div>
</section>

<nav class="studio-navigation" aria-label="Dusk Studio sections">
  <div class="container">
    <a href="#record">Record</a><a href="#takes">Takes &amp; comping</a><a href="#mix">Mix</a><a href="#master">Master</a><a href="#get">Get the beta</a>
  </div>
</nav>

<section class="showcase-section" id="record" aria-labelledby="record-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">01 / Record</p>
      <h2 id="record-title">Give your ideas a home.</h2>
      <p>Record audio and MIDI across 24 tracks. Work with soundfonts, your own instruments, or the built-in synth. Loop and punch recording keep the focus on the performance.</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/recording.webp' alt='Dusk Studio recording console with track inputs, record-arm controls, and channel strips' caption='The recording stage: inputs, record controls, and a familiar console.' width=2560 height=1080 %}
    <div class="feature-split supporting-feature">
      <div class="feature-copy">
        <h3>Start with a sound.</h3>
        <p>The built-in Sunset instrument brings six synth personalities into your session. Add tape, delay, and reverb using built-in units, or load your own plugins.</p>
      </div>
      {% include screenshot.html src='/assets/images/studio/instrument.webp' alt='The built-in Sunset synthesizer interface with oscillator, filter, envelope, and sequencer controls' width=1240 height=780 %}
    </div>
  </div>
</section>

<section class="showcase-section dark-surface" id="takes" aria-labelledby="comp-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">02 / Refine · {% include studio-release-label.html %}</p>
      <h2 id="comp-title">Keep every take.<br>Build your best performance.</h2>
      <p>Every recording pass stays whole on its track. Open the take lanes, audition a performance, and choose the sections that feel right. Hear edits as you make them, while playback continues.</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/takes.webp' alt='The audio editor showing three colored take lanes and a performance assembled from sections of all three' caption='Selected sections stay bright. Each take remains available beneath your comp.' width=1294 height=1030 %}
    <ol class="workflow-list comp-steps">
      <li><h3>Keep the performance</h3><p>Record again without losing the full earlier pass.</p></li>
      <li><h3>Choose the best sections</h3><p>Click or drag in a lane to bring that part into the track.</p></li>
      <li><h3>Listen as you refine</h3><p>Solo a take, move a seam, and hear changes during playback.</p></li>
    </ol>
    {% if site.data.studio.release_status != 'released' %}<p class="fine-print">This is a preview of {{ site.data.studio.version }}. The current official beta is {{ site.data.studio.published_version }}.</p>{% endif %}
  </div>
</section>

<section class="showcase-section" id="mix" aria-labelledby="mix-title">
  <div class="container feature-split">
    <div class="feature-copy">
      <p class="eyebrow">03 / Mix</p>
      <h2 id="mix-title">A console you<br>can settle into.</h2>
      <p>EQ, compression, sends, and faders where you expect them. A fixed signal chain and one insert per channel keep the workflow purposeful. Bring your own VST3, LV2, AU, or CLAP plugins on supported platforms.</p>
      <p>Use three banks of eight with a control surface, and shape the mix through the buses and master channel.</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/channel.webp' alt='Dusk Studio channel strip with EQ, compressor, aux sends, pan, fader, and automation controls' caption='A familiar channel strip, with the signal chain laid out in front of you.' width=155 height=944 %}
  </div>
</section>

<section class="showcase-section dark-surface" id="master" aria-labelledby="master-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">04 / Master</p>
      <h2 id="master-title">Finish the song.<br>Stay in the studio.</h2>
      <p>Move straight from your mix to a dedicated mastering stage. Shape the balance with EQ, control dynamics with multiband compression, and finish with true-peak limiting and loudness metering.</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/mastering.webp' alt='Dusk Studio mastering stage with waveform, five-band EQ, multiband compressor, true-peak limiter, and loudness metering' caption='Mastering EQ, multiband dynamics, and limiting in a single stage.' width=1904 height=911 %}
  </div>
</section>

<section class="showcase-section" id="get" aria-labelledby="get-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">Start making music</p>
      <h2 id="get-title">Get Dusk Studio beta.</h2>
      <p>Official beta builds are available through Patreon from $1/month. The source is open under GPL-3.0 and free to build yourself.</p>
    </div>
    <div class="beta-options">
      <div>
        <h3>Official builds</h3>
        <p>Linux tarballs, a Windows installer, and a macOS disk image. Patreon membership gives you access to beta builds while subscribed.</p>
        <a class="btn btn-primary" href="{{ site.patreon_membership_url }}">Get beta access on Patreon</a>
        <a class="text-link member-link" href="{{ site.data.studio.builds_url }}">Already a member? Get the latest build</a>
      </div>
      <div>
        <h3>Build from source</h3>
        <p>Explore the code, build the application, and help shape its development. The source remains available for free.</p>
        <a class="btn btn-secondary" href="{{ site.data.studio.source_url }}">Source on GitHub</a>
        <a class="text-link member-link" href="{{ site.data.studio.manual_url }}">Read the user manual</a>
      </div>
    </div>
    <p class="purchase-note">Dusk Studio is planned to be available for purchase at 1.0. Pricing, licensing details, and release timing will be announced later. Beta membership covers official beta builds; future purchase terms will be announced separately.</p>
  </div>
</section>

<section class="showcase-section studio-details" aria-labelledby="details-title">
  <div class="container reading-width">
    <h2 id="details-title">Before you get started.</h2>
    <details id="requirements">
      <summary>System requirements</summary>
      <div class="details-body">
        <h3>Linux</h3><p>x86_64 and arm64 builds. PipeWire or ALSA audio. An X11 display is required, including XWayland on a Wayland desktop.</p>
        <h3>macOS</h3><p>Apple Silicon. macOS 14.4 or later for out-of-process plugin hosting; older supported systems run plugins in-process.</p>
        <h3>Windows</h3><p>Windows 10 or later. An ASIO driver is recommended; WASAPI exclusive mode is also available.</p>
        <p>Check the manual and current release notes for platform-specific requirements.</p>
      </div>
    </details>
    <details id="first-launch">
      <summary>Installation and first launch</summary>
      <div class="details-body"><p>Follow the platform-specific installation instructions supplied with your build. The manual covers first-launch permissions, audio devices, and getting a session started.</p><a class="text-link" href="{{ site.data.studio.manual_url }}#installing-dusk-studio">Installation walkthrough</a></div>
    </details>
    <details id="changelog">
      <summary>Release notes and feedback</summary>
      <div class="details-body"><p>{% if site.data.studio.release_status == 'released' %}Current beta: {{ site.data.studio.version }}.{% else %}Current beta: {{ site.data.studio.published_version }}. {{ site.data.studio.version }} is upcoming, with track-based takes and comping in the audio editor.{% endif %}</p><p><a class="text-link" href="{{ site.data.studio.source_url }}/blob/main/CHANGELOG.md">Full changelog</a></p><a class="text-link" href="{{ site.data.studio.source_url }}/discussions">Share feedback and report issues</a></div>
    </details>
  </div>
</section>
