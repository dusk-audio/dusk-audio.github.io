---
layout: default
title: "Dusk Studio"
body_class: theme-dark
og_title: "Dusk Studio, by Dusk Audio"
description: "Dusk Studio is a portastudio-style DAW: 24 tracks, a fixed signal chain, everything on one screen. Open source, GPL-3.0. Plus the free Dusk Audio plugin suite."
---

<!-- 1. HERO (DAW-led) -->
<section class="hero hero-studio" id="dusk-studio">
  <div class="container">
    <p class="hero-eyebrow">Open source · GPL-3.0 · Linux / macOS / Windows</p>
    <h1>A portastudio for the desktop.</h1>
    <p class="tagline">24 tracks. A fixed signal chain. Everything on one screen. Dusk Studio is a deliberately constrained DAW built to make you stop tweaking and finish music.</p>
    <p class="hero-badge">v0.9.0 alpha</p>
    <div class="hero-buttons">
      <!-- Conversion CTA -> Patreon membership (tiers/join). Swap to https://builds.duskaudio.com/ only if you ever make the gate the public entry; patrons get the build link inside gated posts. -->
      <a href="{{ site.patreon_membership_url }}" class="btn btn-primary btn-lg">Get the alpha build</a>
      <a href="https://github.com/dusk-audio/dusk-studio" class="btn btn-secondary btn-lg">Build from source</a>
      <a href="{{ '/assets/manuals/dusk-studio-manual.pdf' | relative_url }}" class="btn btn-secondary btn-lg">Manual</a>
    </div>
    <!-- TODO: Dusk Studio console screenshot. Suggested path: assets/images/dusk-studio-hero.png -->
    <img src="{{ '/assets/images/dusk-studio-hero.png' | relative_url }}" alt="The Dusk Studio console: 24 tracks in three banks of eight with a fixed channel signal chain, shown on one screen." class="hero-shot" width="2560" height="1048" decoding="async">
  </div>
</section>

<!-- 2. STORY STRIP -->
<section class="section story-strip">
  <div class="container">
    <blockquote class="story">
      <p>In December my Tascam DP-24 died. It helped me finish songs, not because it was powerful, but because it wasn't. Nothing in software felt like that. So I built it.</p>
    </blockquote>
    <p class="story-link"><a href="https://www.patreon.com/posts/meet-dusk-studio-160135290" target="_blank" rel="noopener noreferrer">Read the full story →</a></p>
  </div>
</section>

<!-- 3. GET DUSK STUDIO (dual-path) -->
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
        <p class="path-fineprint">One-time and lifetime licences arrive at 1.0. During the alpha it's Patreon only.</p>
      </div>
    </div>

    <p class="path-centerline">The source is always free. The paid builds fund development.</p>
    <p class="path-honesty">It's an alpha. Expect rough edges and <a href="https://github.com/dusk-audio/dusk-studio/discussions" target="_blank" rel="noopener noreferrer">report everything →</a></p>
  </div>
</section>

<!-- 4. EMAIL CAPTURE -->
<section class="section email-band">
  <div class="container">
    <div class="section-header">
      <h2>Get notified when new builds drop</h2>
      <p>New Dusk Studio builds and plugins. No spam, a couple of emails a month, tops.</p>
    </div>
    <!-- MailerLite form 189284465127720015 (account 2404218), themed to match the site.
         MailerLite's own <style> blocks are intentionally omitted; .email-form / .email-form-input
         carry the styling. webforms.min.js upgrades submit to inline AJAX success; without it the
         form falls back to a plain POST (opens MailerLite's confirmation in a new tab). No tracking pixel. -->
    <div id="mlb2-42165633" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-42165633">
      <div class="row-form">
        <form class="ml-block-form email-form" action="https://assets.mailerlite.com/jsonp/2404218/forms/189284465127720015/subscribe" method="post" target="_blank" rel="noopener">
          <input class="email-form-input" type="email" name="fields[email]" placeholder="you@email.com" autocomplete="email" aria-label="Email address" required>
          <input type="hidden" name="ml-submit" value="1">
          <input type="hidden" name="anticsrf" value="true">
          <button class="btn btn-primary" type="submit">Notify me</button>
        </form>
      </div>
      <div class="row-success email-success" style="display: none;">
        <p>Thanks. You are on the list. Check your inbox to confirm your address.</p>
      </div>
    </div>
  </div>
</section>

<script>
  function ml_webform_success_42165633() {
    var $ = ml_jQuery || jQuery;
    $('.ml-subscribe-form-42165633 .row-success').show();
    $('.ml-subscribe-form-42165633 .row-form').hide();
  }
</script>
<script src="https://groot.mailerlite.com/js/w/webforms.min.js?vb397d78ebaa8a0f631d35384c46d781b" type="text/javascript"></script>

<!-- 5. PLUGINS AS FUNNEL (existing grid, reframed intro) -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>The sound is already free</h2>
      <p>Every analog processor inside Dusk Studio's console ships as a free standalone plugin. Same DSP, no trials, no nag screens, no accounts. Try the sound, then get the whole studio.</p>
    </div>

    <div class="plugin-grid">
      {% assign released_plugins = site.data.plugins | where: "status", "released" %}
      {% assign prerelease_plugins = site.data.plugins | where: "status", "pre-release" %}
      {% assign available_plugins = released_plugins | concat: prerelease_plugins %}
      {% for plugin in available_plugins %}
      <div class="plugin-card">
        <div class="plugin-card-image">
          <img src="{{ '/assets/images/plugins/' | append: plugin.slug | append: '-screenshot.png' | relative_url }}" alt="{{ plugin.name }} screenshot">
        </div>
        <div class="plugin-card-content">
          <div class="plugin-card-header">
            <h3>{{ plugin.name }}</h3>
            {% if plugin.status == "released" %}
            <span class="status-badge released">Released</span>
            {% else %}
            <span class="status-badge pre-release">Pre-release</span>
            {% endif %}
          </div>
          <p>{{ plugin.description | truncate: 150 }}</p>
          <div class="plugin-card-footer">
            <a href="{{ '/plugins/' | append: plugin.slug | append: '/' | relative_url }}" class="btn btn-primary">Details</a>
            <a href="{{ site.releases_url }}/tag/{{ plugin.slug }}-v{{ plugin.version }}" class="btn btn-download">Download</a>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <h2>Coming Soon</h2>
      <p>More free plugins in active development</p>
    </div>

    <div class="plugin-grid">
      {% assign upcoming = site.data.plugins | where: "status", "coming-soon" %}
      {% for plugin in upcoming %}
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

      {% assign near_production = site.data.plugins | where: "status", "in-dev" | slice: 0, 2 %}
      {% for plugin in near_production %}
      <div class="plugin-card">
        <div class="plugin-card-image">
          <span class="placeholder">In development</span>
        </div>
        <div class="plugin-card-content">
          <div class="plugin-card-header">
            <h3>{{ plugin.name }}</h3>
            <span class="status-badge in-dev">In Development</span>
          </div>
          <p>{{ plugin.description }}</p>
        </div>
      </div>
      {% endfor %}
    </div>

    <div style="text-align: center; margin-top: var(--spacing-xl);">
      <a href="{{ '/plugins/' | relative_url }}" class="btn btn-secondary btn-lg">View All Plugins</a>
    </div>
  </div>
</section>

<!-- 6. PHILOSOPHY STRIP (replaces "Why Free?", keeps Linux First / No Strings Attached) -->
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
      // close button is the only focusable element in the dialog: trap focus on it
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
    });
  })();
</script>
