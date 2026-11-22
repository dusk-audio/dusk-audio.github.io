---
layout: plugin
title: DuskVerb 2
slug: duskverb-2
published: true
tagline: Algorithmic reverb with 24 factory sounds
description: DuskVerb reverb engines, a nonlinear burst engine and updated voicing in a redesigned, resizable interface, with A/B comparison, user presets, import of original DuskVerb presets, and mono, mono-to-stereo, and stereo routing. Free AU, VST3, CLAP, and LV2 plugin for Linux, Windows, and macOS.
version: "1.0.1"
screenshot: /assets/images/plugins/duskverb-2-screenshot.webp

features:
  - DuskVerb reverb engines plus a nonlinear burst engine, selectable from the Engine menu
  - 24 factory presets covering plates, halls, chambers, rooms, gated, reverse, shimmer and nonlinear sounds
  - Updated early reflections, spectral shaping and stereo voicing
  - Graphite faceplate with an amber engine, decay and output-history display
  - Pre-delay with host tempo sync
  - "Filter section: Low Cut, High Cut, and Mono Below for the low end"
  - "Damping across three bands with two adjustable crossovers"
  - Early reflections with level, size, and diffusion
  - Modulation depth and rate
  - "Tone, Character, and Duck macros"
  - Freeze on supported engines, plus a Gate switch on the gated engine
  - Bus mode for a fully wet return; Mix Lock preserves routing while auditioning presets
  - A/B comparison with copy between slots
  - User presets, and import of original DuskVerb preset files
  - "Mono, mono-to-stereo, and stereo operation"
  - Input and output level meters
  - Typed value entry on knobs and numeric readouts
  - Resizable interface
  - Full automation support

formats:
  - "Linux: VST3, LV2, CLAP"
  - "Windows: VST3, CLAP"
  - "macOS: VST3, AU, LV2, CLAP"

requirements:
  - "Linux: glibc 2.35+ (Ubuntu 22.04+, Debian 12+)"
  - "Linux downloads: x64 is for Intel/AMD PCs; arm64 is for ARM systems"
  - "macOS: macOS 10.15 (Catalina) or later"
  - "Windows: Windows 10 or later"
  - "64-bit DAW with AU, VST3, CLAP, or LV2 support"
  - "Sample rates: 44.1 kHz to 192 kHz"

changelog:
  - version: "1.0.1"
    date: "2026-11-08"
    changes:
      - "First release of DuskVerb 2: the DuskVerb reverb engines in a redesigned, resizable interface"
      - "24 factory presets, 92 parameters, a nonlinear engine and updated DuskVerb 2 voicing"
      - "Imports presets saved from the original DuskVerb"
      - "Consistent VST3 identity across systems and host tail reporting that follows Freeze"
      - "Mono, mono-to-stereo and stereo layouts"
      - "AU, VST3, CLAP and LV2 for Linux (x64, arm64), Windows and macOS (universal)"
---

DuskVerb 2 is the successor to DuskVerb. It has its own plugin identity, so both can be installed side by side; keep the original for projects that already use it. Original DuskVerb preset files can be imported from the preset menu.

DuskVerb 2 is open source under GPL-3.0-or-later. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).
