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
  - 16-channel Hadamard Feedback Delay Network for dense, natural tails
  - Dattorro-inspired input diffusion with 4 cascaded allpass stages
  - Early reflections with 16 multi-tap delays and air absorption modeling
  - Pre-delay with tempo sync (1/32 to 1/1 note divisions)
  - Two-band damping with adjustable crossover (200-4000 Hz)
  - Independent bass and treble decay multipliers
  - LFO modulation with adjustable depth and rate
  - Freeze mode for infinite sustain
  - Output EQ with lo-cut and hi-cut filters
  - Stereo width control (0-200%)
  - Bus mode for send/return workflows
  - 25 factory presets across 9 categories
  - User preset save/load/delete system
  - Per-sample parameter smoothing for artifact-free automation
  - Full automation support

requirements:
  - "Linux: glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1kHz - 192kHz"

changelog:
  - version: "0.2.0"
    date: "2026-02-28"
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

DuskVerb is a professional algorithmic reverb, delivering lush spaces from tight rooms to infinite ambient washes - completely free.

## Overview

DuskVerb uses a 16-channel Hadamard Feedback Delay Network to create dense, natural-sounding reverb tails. Combined with Dattorro-inspired diffusion stages and physically-modeled early reflections, it covers everything from subtle room ambience to expansive cinematic spaces.

## Algorithms

DuskVerb includes five carefully designed algorithms, each with distinct delay line configurations and scaling:

**Plate**
- Dense, smooth, and bright
- No early reflections - pure diffuse tail
- Classic studio reverb sound
- Ideal for vocals, snare, and mix bus

**Hall**
- Natural concert hall with spacious depth
- Strong early reflections with gradual buildup
- Balanced frequency response
- The go-to all-purpose reverb

**Chamber**
- Warm, intimate reflections
- Enhanced treble response for clarity
- Moderate early reflections
- Perfect for strings, piano, and acoustic instruments

**Room**
- Tight, realistic small-space simulation
- Prominent early reflections for a sense of space
- Reduced late decay for clarity
- Great for drums, dialog, and natural ambience

**Ambient**
- Ethereal, expansive washes
- Long decay times with lush modulation
- No early reflections - pure atmosphere
- Perfect for pads, drones, and cinematic effects

## Key Controls

### Time
- **Decay** - Reverb tail length (0.2s to 30s)
- **Pre-Delay** - Gap before reverb onset (0-250ms, with tempo sync)
- **Size** - Room size scaling (affects delay line lengths)
- **Freeze** - Sustain the current reverb tail indefinitely

### Character
- **Diffusion** - Density of the reverb tail
- **Bass Multiply** - Low-frequency decay time relative to overall decay
- **Damping** - High-frequency decay (treble absorption)
- **Crossover** - Frequency split between bass and treble damping (200-4000 Hz)

### Modulation
- **Mod Depth** - Chorus-like movement in the reverb tail
- **Mod Rate** - Speed of modulation (0.1-3 Hz)

### Output
- **Mix** - Dry/wet balance
- **Width** - Stereo spread (0-200%)
- **Lo Cut / Hi Cut** - Shape the reverb frequency range
- **Bus Mode** - 100% wet for send/return configurations

## Factory Presets

DuskVerb includes 25 professionally calibrated presets across 9 categories:

**Vocals** - Vocal Plate, Vocal Hall, Vocal Room
**Drums** - Drum Room, Drum Plate, Drum Ambient
**Guitar** - Guitar Spring, Guitar Hall
**Keys** - Keys Chamber, Synth Pad
**Mix** - Mix Glue, Mix Space
**Rooms** - Small Room, Medium Room, Large Hall
**Plates** - Short Plate, Long Plate
**Ambient** - Infinite Pad, Dark Cloud, Shimmer Space, Cathedral
**Special** - Slap Back, Gated Verb, Lo-Fi Verb, Wide Stereo

## Technical Specifications

### DSP Details
- **Architecture:** 16-channel Hadamard Feedback Delay Network
- **Diffusion:** 4-stage Dattorro allpass cascade (stereo) + 2-stage output diffusion
- **Early reflections:** 16 multi-tap delays per channel with exponential distribution
- **Damping:** Two-band (bass/treble) with adjustable crossover
- **Interpolation:** Cubic Hermite for fractional delay reads
- **Soft clipping:** Fast rational tanh approximation for feedback limiting
- **Denormal prevention:** Tiny DC bias injection throughout signal path
- **Smoothing:** Per-sample exponential parameter smoothing (5ms time constant)

### Parameter Ranges
- **Decay:** 0.2-30 seconds
- **Pre-Delay:** 0-250ms (free) or 1/32 to 1/1 (tempo synced)
- **Size:** 0-100%
- **Diffusion:** 0-100%
- **Bass Multiply:** 0.5x-2.0x
- **Damping:** 10-100%
- **Crossover:** 200-4000 Hz
- **Mod Depth:** 0-100%
- **Mod Rate:** 0.1-3.0 Hz
- **Mix:** 0-100%
- **Width:** 0-200%
- **Lo Cut:** 20-500 Hz
- **Hi Cut:** 1000-20000 Hz

## DAW Compatibility

### Fully Tested
- **Logic Pro** - AU with full GUI
- **Reaper** - VST3/LV2, all features working
- **Ardour** - LV2 with full GUI
- **Standalone** - JUCE standalone application

### Expected to Work
- Bitwig Studio, Studio One, FL Studio
- Ableton Live, Cubase/Nuendo
- GarageBand (AU on macOS)

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
