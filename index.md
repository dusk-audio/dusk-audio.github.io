---
layout: default
title: Home
description: Free, high-quality audio plugins for Linux, Windows, and macOS. Professional tools with no cost, no trials, no compromises.
---

<section class="hero">
  <div class="container">
    <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Luna Co. Audio" class="hero-logo">
    <h1>Professional Audio Plugins. <span class="highlight">100% Free.</span></h1>
    <p class="tagline">High-quality VST3, LV2, and AU plugins for music producers and audio engineers. No trials, no feature locks, no nag screens. Just great tools.</p>
    <div class="hero-buttons">
      <a href="{{ '/plugins/' | relative_url }}" class="btn btn-primary btn-lg">Browse Plugins</a>
      <a href="{{ site.patreon_url }}" class="btn btn-secondary btn-lg">Support Development</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Featured Plugin</h2>
      <p>Our flagship release, ready for your next project</p>
    </div>

    {% assign featured = site.data.plugins | where: "featured", true | first %}
    <div class="featured-plugin">
      <div class="featured-plugin-image">
        <img src="{{ '/assets/images/plugins/4k-eq-screenshot.png' | relative_url }}" alt="{{ featured.name }} screenshot">
      </div>
      <div class="featured-plugin-content">
        <span class="status-badge released">Available Now</span>
        <h3>{{ featured.name }}</h3>
        <p class="tagline">{{ featured.tagline }}</p>
        <p>{{ featured.description }}</p>
        <ul>
          <li>Brown/Black modes — E-series vs G-series characteristics</li>
          <li>SSL-accurate saturation modeling with per-band harmonics</li>
          <li>2x/4x oversampling and real-time spectrum analyzer</li>
          <li>15 factory presets, M/S processing, auto-gain</li>
        </ul>
        <div class="hero-buttons" style="justify-content: flex-start;">
          <a href="{{ '/plugins/4k-eq/' | relative_url }}" class="btn btn-primary">Learn More</a>
          <a href="{{ site.releases_url }}" class="btn btn-secondary">Download</a>
        </div>
      </div>
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

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Why Free?</h2>
      <p>Great tools should be accessible to everyone</p>
    </div>

    <div class="plugin-grid">
      <div class="plugin-card">
        <div class="plugin-card-content">
          <h3>Linux First</h3>
          <p>Built primarily for the Linux audio community, where quality free plugins are especially needed. Also available for Windows and macOS.</p>
        </div>
      </div>

      <div class="plugin-card">
        <div class="plugin-card-content">
          <h3>No Strings Attached</h3>
          <p>No trials, no feature limitations, no nag screens, no accounts required. Download, install, and create.</p>
        </div>
      </div>

      <div class="plugin-card">
        <div class="plugin-card-content">
          <h3>Community Supported</h3>
          <p>Development is funded by optional donations from users who find value in these tools. If they help your music, consider supporting!</p>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: var(--spacing-xl);">
      <a href="{{ '/support/' | relative_url }}" class="btn btn-primary btn-lg">Support Luna Co. Audio</a>
    </div>
  </div>
</section>
