---
layout: plugin
title: DuskVerb
slug: duskverb
tagline: Professional Algorithmic Reverb
description: Professional algorithmic reverb with 5 algorithms, 16-channel Hadamard FDN, early reflections, modulation, and freeze mode. 25 factory presets calibrated to studio standards. Free VST3, LV2, and AU plugin for Linux, Windows, and macOS.
version: "0.3.0"
screenshot: /assets/images/plugins/duskverb-screenshot.png

features:
  - Five algorithms - Plate, Hall, Chamber, Room, Ambient
  - Dense, natural tails from a 16-channel feedback delay network
  - Dattorro-inspired input diffusion for smooth buildup
  - Physically-modeled early reflections with air absorption
  - Pre-delay with tempo sync
  - Two-band damping with adjustable crossover
  - Independent bass and treble decay control
  - LFO modulation for movement in the tail
  - Freeze mode for infinite sustain
  - Output EQ, stereo width, and bus mode
  - 25 factory presets across 9 categories
  - User preset save/load/delete
  - Full automation support

requirements:
  - "Linux: glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1kHz - 192kHz"

changelog:
  - version: "0.3.0"
    date: "2026-02-26"
    changes:
      - Replaced FDN output soft-clipping with linear output for better transient dynamics
      - Redesigned Room algorithm with geometric delay spacing and increased modulation
      - Moved DC blocker before output diffusion to prevent allpass DC accumulation
      - Fixed algorithm selector picking the wrong algorithm
      - Fixed dropdown overlapping knob labels
      - Consistent decimal formatting across all displays
  - version: "0.2.0"
    date: "2026-02-25"
    changes:
      - Initial release with VST3/LV2/AU support
      - Five algorithms (Plate, Hall, Chamber, Room, Ambient)
      - 16-channel Hadamard FDN with two-band damping
      - Dattorro-style input diffusion and output diffusion
      - Early reflections with air absorption modeling
      - Pre-delay with tempo sync
      - Freeze mode, bus mode, stereo width control
      - 25 factory presets across 9 categories
      - User preset system with save/load/delete
      - Available for Linux, Windows, and macOS
---

DuskVerb is a free algorithmic reverb that covers everything from tight rooms to infinite ambient washes. Five algorithms, 25 presets, and enough control to dial in exactly the space you need.

## Overview

At its core, DuskVerb uses a 16-channel Hadamard feedback delay network to build dense, natural-sounding reverb tails. Each algorithm has its own carefully tuned delay structure, and the Dattorro-inspired diffusion stages smooth everything into a lush, coherent wash. The early reflections are physically modeled with air absorption, so small spaces actually sound like small spaces.

## Algorithms

Each algorithm has its own delay line configuration and default character. They're not just preset tweaks - the underlying topology changes.

**Plate** is dense, smooth, and bright. No early reflections, just pure diffuse tail. The classic studio vocal reverb. Works great on snare and mix bus too.

**Hall** is the all-purpose workhorse. Natural concert hall sound with spacious depth, strong early reflections, and balanced frequency response. If you only use one algorithm, this is probably it.

**Chamber** sits between Hall and Room. Warm and intimate, with a slightly brighter treble response that helps things cut through. Good for strings, piano, and acoustic instruments.

**Room** is tight and realistic. The early reflections are prominent, giving you a clear sense of physical space, while the late decay stays short and clean. Great for drums, dialog, and anything that needs natural ambience without a long tail.

**Ambient** goes big. Ethereal washes, long decay times, heavy modulation, and no early reflections. This is your pad reverb, your drone reverb, your cinematic effects reverb.

## Controls

The top row handles the big picture: **Decay** sets the tail length (0.2s up to 30s), **Pre-Delay** adds a gap before the reverb starts (with optional tempo sync), and **Size** scales the virtual room dimensions. Hit **Freeze** to sustain the current tail indefinitely while muting new input.

The **Character** section shapes the tone. **Diffusion** controls how dense the tail is. **Bass Multiply** and **Treble Multiply** let you independently adjust how long the lows and highs sustain relative to the overall decay time. **Crossover** sets the frequency split between the two bands.

**Modulation** adds movement to the tail. A little goes a long way for keeping things sounding natural and avoiding metallic artifacts. Crank it for chorus-like shimmer effects.

The **Output** section has your **Mix** knob, **Width** control (0-200%), and **Lo Cut / Hi Cut** filters for shaping the reverb's frequency range. **Bus Mode** sets the mix to 100% wet for send/return setups.

## Factory Presets

DuskVerb ships with 25 presets across 9 categories. You can also save, load, and delete your own presets from the menu.

- **Vocals:** Vocal Plate, Vocal Hall, Vocal Room
- **Drums:** Drum Room, Drum Plate, Drum Ambient
- **Guitar:** Guitar Spring, Guitar Hall
- **Keys:** Keys Chamber, Synth Pad
- **Mix:** Mix Glue, Mix Space
- **Rooms:** Small Room, Medium Room, Large Hall
- **Plates:** Short Plate, Long Plate
- **Ambient:** Infinite Pad, Dark Cloud, Shimmer Space, Cathedral
- **Special:** Slap Back, Gated Verb, Lo-Fi Verb, Wide Stereo

## Under the Hood

For the curious: the FDN uses a 16x16 Hadamard mixing matrix with per-channel two-band damping filters. Input diffusion is a 4-stage Dattorro allpass cascade, and there's an additional 2-stage modulated output diffuser. Early reflections use 16 multi-tap delays per channel with exponential time distribution and air absorption modeling. Delay reads use cubic Hermite interpolation, and all parameters are smoothed per-sample to avoid automation artifacts.

## DAW Compatibility

Tested in Logic Pro (AU), Reaper (VST3/LV2), and Ardour (LV2). Should also work in Bitwig, Studio One, FL Studio, Ableton Live, Cubase, and GarageBand.

## Installation

### Linux
```
VST3: ~/.vst3/DuskVerb.vst3
LV2:  ~/.lv2/DuskVerb.lv2
```

### Windows
```
VST3: C:\Program Files\Common Files\VST3\DuskVerb.vst3
```

### macOS
```
VST3: ~/Library/Audio/Plug-Ins/VST3/DuskVerb.vst3
AU:   ~/Library/Audio/Plug-Ins/Components/DuskVerb.component
```

## Open Source

DuskVerb is open source under GPL-2.0. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).
