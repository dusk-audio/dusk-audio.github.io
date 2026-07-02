---
layout: default
title: "Dusk Studio"
permalink: /dusk-studio/
og_title: "Dusk Studio: a portastudio for the desktop"
description: "Dusk Studio is a deliberately constrained, portastudio-style DAW: 24 tracks, a fixed signal chain, mastering built in. Open source, GPL-3.0, alpha."
---

<!-- HERO -->
<section class="hero hero-studio" id="top">
  <div class="container">
    <p class="hero-eyebrow">Open source · GPL-3.0 · Linux / macOS / Windows</p>
    <h1>A portastudio for the desktop.</h1>
    <p class="tagline">24 tracks. A fixed signal chain. Everything on one screen. Dusk Studio is a deliberately constrained DAW built to make you stop tweaking and finish music.</p>
    <p class="hero-badge">v0.9.0 alpha</p>
    <div class="hero-buttons">
      <a href="https://builds.duskaudio.com/latest" class="btn btn-primary btn-lg">Get the alpha build</a>
      <a href="https://github.com/dusk-audio/dusk-studio" class="btn btn-secondary btn-lg">Build from source</a>
      <a href="https://builds.duskaudio.com/manual" class="btn btn-secondary btn-lg">Manual</a>
    </div>
    <ul class="spec-strip" aria-label="At a glance">
      <li>24 tracks</li>
      <li>3 banks of 8</li>
      <li>Fixed signal chain</li>
      <li>BS.1770 metering</li>
      <li>VST3 / LV2</li>
    </ul>
    <img src="{{ '/assets/images/dusk-studio-hero.png' | relative_url }}" alt="The Dusk Studio console: 24 tracks in three banks of eight with a fixed channel signal chain, shown on one screen." class="hero-shot" width="2560" height="1048" decoding="async">
  </div>
</section>

<!-- VIEWS (record / mix / master) -->
<section class="section views">
  <div class="container">
    <div class="section-header">
      <h2>Record, mix, and master in one place.</h2>
      <p>No exporting to a second app. The signal chain, the mix, and the master all live in the same window.</p>
    </div>
    <div class="views-grid">
      <figure class="view">
        <img src="{{ '/assets/images/dusk-studio-mixing.png' | relative_url }}" alt="Dusk Studio mixing view: 24 channels across three banks, one insert per channel." loading="lazy">
        <figcaption>Mixing: 24 channels, one insert each</figcaption>
      </figure>
      <figure class="view">
        <img src="{{ '/assets/images/dusk-studio-mastering.png' | relative_url }}" alt="Dusk Studio mastering view: 4-band digital EQ, multiband compressor, brick-wall limiter, BS.1770 metering." loading="lazy">
        <figcaption>Mastering: 4-band digital EQ, multiband, limiter, BS.1770</figcaption>
      </figure>
    </div>
  </div>
</section>

<!-- STORY STRIP -->
<section class="section story-strip">
  <div class="container">
    <blockquote class="story">
      <p>In December my Tascam DP-24 died. It helped me finish songs, not because it was powerful, but because it wasn't. Nothing in software felt like that. So I built it.</p>
    </blockquote>
    <p class="story-link"><a href="https://www.patreon.com/posts/meet-dusk-studio-160135290" target="_blank" rel="noopener noreferrer">Read the full story →</a></p>
  </div>
</section>

<!-- GET DUSK STUDIO (dual-path) -->
<section class="section section-alt" id="get">
  <div class="container">
    <div class="section-header">
      <h2>Get Dusk Studio</h2>
    </div>

    <div class="dual-path">
      <div class="path-card">
        <h3>Build it yourself (free)</h3>
        <p>The source is GPL-3.0 and free forever. Clone it, audit it, build it, modify it.</p>
        <a href="https://github.com/dusk-audio/dusk-studio" class="btn btn-secondary btn-full">Source on GitHub</a>
        <p class="path-fineprint">Self-builds get no support tier, but the code is identical.</p>
      </div>

      <div class="path-card path-card--primary">
        <h3>Get the official build</h3>
        <p>Back Dusk Studio on Patreon from $1/month and get every build, alpha and beta, for as long as you're subscribed. New builds land in the patrons-only feed as they ship.</p>
        <p>Early backers are credited as Founding Patrons, with your name in the app's About panel.</p>
        <a href="{{ site.patreon_membership_url }}" class="btn btn-primary btn-full">Get builds on Patreon</a>
        <p class="path-fineprint">One-time and lifetime licenses arrive at 1.0. During the alpha it's Patreon only.</p>
      </div>
    </div>

    <p class="path-centerline">The source is always free. The paid builds fund development.</p>
    <p class="path-honesty">It's an alpha. Expect rough edges and <a href="https://github.com/dusk-audio/dusk-studio/discussions" target="_blank" rel="noopener noreferrer">report everything →</a></p>
  </div>
</section>

<!-- FIRST-LAUNCH NOTE -->
<section class="section first-launch">
  <div class="container">
    <div class="section-header">
      <h2>First launch on Mac and Windows</h2>
      <p>The alpha builds are unsigned, so macOS and Windows warn you the first time. On macOS, right-click the app and choose Open. On Windows, click More info, then Run anyway. About 30 seconds, once.</p>
    </div>
    <p><a class="btn btn-secondary" href="https://builds.duskaudio.com/manual">First-launch walkthrough in the manual</a></p>
  </div>
</section>

<!-- PHILOSOPHY -->
<section class="section philosophy">
  <div class="container">
    <div class="philosophy-row">
      <div class="philosophy-item">
        <h3>24 tracks, fixed.</h3>
        <p>Three banks of 8, mapped to real control surfaces.</p>
      </div>
      <div class="philosophy-item">
        <h3>One insert per channel.</h3>
        <p>Never a chain.</p>
      </div>
      <div class="philosophy-item">
        <h3>Everything visible.</h3>
        <p>No tabs, no hidden panels, no preferences sprawl.</p>
      </div>
    </div>

    <p class="philosophy-tagline">The constraints are the product.</p>

    <div class="philosophy-row philosophy-row--promise">
      <div class="philosophy-item">
        <h3>Linux first</h3>
        <p>Built primarily for the Linux audio community, where quality free tools are especially needed. Also on Windows and macOS.</p>
      </div>
      <div class="philosophy-item">
        <h3>No strings attached</h3>
        <p>No trials, no feature limitations, no nag screens, no accounts required. Download, install, and create.</p>
      </div>
    </div>
  </div>
</section>

<!-- Click-to-zoom lightbox (binds to .hero-shot) -->
<div class="lightbox" id="lightbox" aria-hidden="true">
  <button class="lightbox-close" id="lightbox-close" aria-label="Close">&times;</button>
  <img id="lightbox-img" src="" alt="">
</div>
<script>
  (function () {
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-img');
    var closeBtn = document.getElementById('lightbox-close');
    if (!lb) return;
    var lastFocused = null;

    function open(trigger) {
      lastFocused = trigger || document.activeElement;
      lbImg.src = (trigger && (trigger.currentSrc || trigger.src)) || '';
      lbImg.alt = (trigger && trigger.alt) || '';
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
    }
    function close() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
      lastFocused = null;
    }

    document.querySelectorAll('.hero-shot').forEach(function (img) {
      if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.addEventListener('click', function () { open(img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
      });
    });

    lb.addEventListener('click', function (e) { if (e.target !== lbImg) close(); });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
    });
  })();
</script>
