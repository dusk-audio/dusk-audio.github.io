---
layout: plugin
title: TapeMachine
slug: tapemachine
tagline: Professional Analog Tape Emulation
description: Professional tape machine emulation calibrated against real vintage hardware measurements. Authentic saturation, wow/flutter, and vintage VU meters. Free VST3, LV2, and AU plugin for Linux, Windows, and macOS.
version: "1.0.5"
screenshot: /assets/images/plugins/tapemachine-screenshot.png

features:
  - Two tape machine models — Swiss800 and Classic102
  - Four tape formulations — Type 456, GP9, Type 911, Type 250
  - Four signal path modes — Repro, Sync, Input, Thru
  - Three tape speeds — 7.5, 15, 30 IPS with NAB/CCIR/AES EQ curves
  - Physically-modeled Langevin saturation calibrated to real hardware
  - Separate Wow & Flutter controls with coherent stereo processing
  - Bias and calibration controls for fine-tuning tape response
  - Auto-compensation mode for unity gain across input levels
  - Auto-calibration for automatic bias optimization
  - Dual stereo VU meters with vintage analog styling
  - Premium vintage UI with animated tape reels
  - 15 factory presets across 5 categories
  - 2x/4x oversampling for alias-free saturation
  - Full automation support

requirements:
  - "Linux: glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1kHz – 192kHz"

changelog:
  - version: "1.0.0"
    date: "2026-01-25"
    changes:
      - Initial release with VST3/LV2/AU support
      - Swiss800 and Classic102 models
      - Four tape formulations with distinct characteristics
      - Signal path modes (Repro, Sync, Input, Thru)
      - NAB, CCIR, and AES EQ standards
      - Langevin saturation model calibrated to real hardware THD
      - Premium vintage UI with animated reels and VU meters
      - 15 factory presets across 5 categories
      - Available for Linux, Windows, and macOS
---

TapeMachine is a professional analog tape emulation, bringing the warmth and character of legendary reel-to-reel machines to your DAW — completely free.

## Overview

Analog tape has shaped the sound of recorded music for decades. TapeMachine captures the magic of classic studio tape machines with physically-modeled saturation calibrated against real vintage hardware measurements.

Whether you want subtle warmth on your mix bus, obvious lo-fi character, or anything in between, TapeMachine delivers authentic tape sound.

## Tape Machine Models

TapeMachine faithfully recreates two legendary machines:

**Swiss800**
- Clean, punchy, and precise
- Odd-harmonic dominant saturation (H3 at -51dB)
- Transformerless signal path
- Tight low-end, extended highs (22kHz)
- The modern studio workhorse

**Classic102**
- Warm, rich, and musical
- Even and odd harmonic blend (transformer coloration)
- Pronounced head bump at 62Hz
- Smooth high-frequency rolloff (18kHz)
- The mastering room classic

## Tape Formulations

Choose from four tape types, each with distinct sonic characteristics:

| Type | Character | Best For |
|------|-----------|----------|
| **Type 456** | Warm, punchy saturation | Rock, pop, mix bus |
| **GP9** | Clean, extended headroom | Mastering, classical |
| **Type 911** | European precision | Warmth, character |
| **Type 250** | Vintage, early saturation | Lo-fi, creative effects |

## Signal Path Modes

Like a real tape machine, TapeMachine offers multiple signal paths:

| Mode | Description |
|------|-------------|
| **Repro** | Full tape processing — the classic sound |
| **Sync** | Record head playback with extra HF rolloff (for overdub workflows) |
| **Input** | Electronics only — hear just transformers and EQ coloration |
| **Thru** | Clean bypass for A/B comparison |

## EQ Standards

Three professional equalization standards:

| Standard | Character |
|----------|-----------|
| **NAB** | American — most HF pre-emphasis, warmest saturation |
| **CCIR** | European — moderate emphasis, balanced response |
| **AES** | Modern — minimal emphasis, most transparent |

## Wow & Flutter

TapeMachine features separate controls for wow and flutter effects:

**Wow** — Slow pitch drift (0.3–0.8 Hz)
- Creates subtle vinyl-like wobble
- Adds organic movement to sustained notes
- Perfect for lo-fi and vintage vibes

**Flutter** — Faster modulation (3–7 Hz)
- Adds tape machine character
- Creates subtle chorus-like effects
- Includes random modulation for natural feel

Both effects share coherent stereo processing for a natural, phase-aligned sound.

## Factory Presets

TapeMachine includes 15 professionally crafted presets across 5 categories:

**Subtle**
- **Gentle Warmth** — Transparent analog glue
- **Transparent Glue** — Subtle cohesion
- **Mastering Touch** — Delicate tape character

**Warm**
- **Classic Analog** — Traditional tape sound
- **Vintage Warmth** — Rich, full-bodied tone
- **Tube Console** — Console-style coloration

**Character**
- **70s Rock** — That classic rock sound
- **Tape Saturation** — Obvious tape drive
- **Cassette Deck** — 4-track character

**Lo-Fi**
- **Lo-Fi Warble** — Wobbly vintage vibes
- **Worn Tape** — Aged tape artifacts
- **Dusty Reel** — Nostalgic degradation

**Mastering**
- **Master Bus Glue** — Subtle mix cohesion
- **Analog Sheen** — High-end polish
- **Vintage Master** — Classic mastering chain

## Vintage Interface

TapeMachine features a premium vintage interface inspired by classic studio equipment:

- **Authentic VU Meters** — IEC 60268-17 compliant ballistics
- **Animated Tape Reels** — Metallic appearance with rotating reflections
- **Vintage Knobs** — Classic Bakelite-style controls
- **Brushed Metal Panels** — Premium studio equipment aesthetic

## Technical Specifications

### DSP Details
- **Saturation model:** Langevin function (Jiles-Atherton magnetic theory)
- **Harmonic calibration:** Matched to published vintage hardware THD measurements
- **3-band processing:** Separate drive ratios for bass, mid, and treble
- **Anti-aliasing:** 8th-order Chebyshev Type I filter with 2x/4x oversampling

### Parameter Ranges
- **Input Gain:** ±12dB
- **Output Gain:** ±12dB
- **Saturation:** 0–100%
- **Bias:** 0–100%
- **Wow:** 0–100%
- **Flutter:** 0–100%
- **Mix:** 0–100%
- **HP Filter:** 20–500Hz
- **LP Filter:** 3kHz–20kHz

### Performance
- **CPU usage:** ~2–4% per instance (4x oversampling, 48kHz)
- **Memory:** ~15MB per instance
- **Latency:** ~64 samples (2x) / ~128 samples (4x)

## DAW Compatibility

### Fully Tested
- **Reaper** — VST3/LV2, all features working
- **Ardour** — LV2 with full GUI
- **Carla** — VST3/LV2, standalone host
- **Standalone** — JUCE standalone application

### Expected to Work
- Bitwig Studio, Studio One, FL Studio
- Ableton Live, Cubase/Nuendo
- Logic Pro, GarageBand (AU on macOS)

## Installation

### Linux
```
VST3: ~/.vst3/TapeMachine.vst3
LV2:  ~/.lv2/TapeMachine.lv2
```

### Windows
```
VST3: C:\Program Files\Common Files\VST3\TapeMachine.vst3
```

### macOS
```
VST3: ~/Library/Audio/Plug-Ins/VST3/TapeMachine.vst3
AU:   ~/Library/Audio/Plug-Ins/Components/TapeMachine.component
```

## Open Source

TapeMachine is open source under GPL-2.0. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).

---

*Disclaimer: This is an independent emulation inspired by classic tape machines. This project is not affiliated with or endorsed by any hardware manufacturer.*
