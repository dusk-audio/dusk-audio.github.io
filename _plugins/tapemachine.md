---
layout: plugin
title: TapeMachine
slug: tapemachine
tagline: Analog Tape Emulation with Wow & Flutter
description: Professional tape machine emulation with authentic saturation, wow/flutter, and vintage VU meters. Free VST3, LV2, and AU plugin for Linux, Windows, and macOS.
version: "1.0.0"
screenshot: /assets/images/plugins/tapemachine-screenshot.png

features:
  - Two tape machine models — Swiss800 (Studer A800) and Classic102 (Ampex ATR-102)
  - Four tape formulations — Type 456, GP9, Type 911, Type 250
  - Three tape speeds — 7.5, 15, 30 IPS
  - Authentic hysteresis-based saturation modeling
  - Separate Wow & Flutter controls with coherent stereo processing
  - Bias and calibration controls for fine-tuning tape response
  - Auto-compensation mode (VTM-style output gain lock)
  - Auto-calibration for automatic bias optimization
  - Dual stereo VU meters with vintage analog styling
  - Premium photorealistic vintage UI
  - 15 factory presets across 5 categories
  - 2x/4x oversampling for alias-free saturation
  - Full automation support

requirements:
  - "Linux: GLIBC 2.35+ (Ubuntu 22.04+, Fedora 36+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1kHz – 192kHz"

changelog:
  - version: "1.0.0"
    date: "2026-01-20"
    changes:
      - Initial release with VST3/LV2/AU support
      - Swiss800 and Classic102 tape machine models
      - Four tape formulations with distinct characteristics
      - Premium vintage UI with photorealistic VU meters
      - 15 factory presets across 5 categories
      - Available for Linux, Windows, and macOS
---

TapeMachine is a professional analog tape emulation, bringing the warmth and character of legendary reel-to-reel machines to your DAW — completely free.

## Overview

Analog tape has shaped the sound of recorded music for decades. TapeMachine captures the magic of classic studio tape machines with accurate modeling of saturation, frequency response, and mechanical artifacts like wow and flutter.

Whether you want subtle warmth on your mix bus, obvious lo-fi character, or anything in between, TapeMachine delivers authentic tape sound.

## Tape Machine Models

TapeMachine faithfully recreates two legendary machines:

**Swiss800 (Studer A800)**
- Clean, punchy, and precise
- Odd-harmonic dominant saturation
- Transformerless signal path
- Tight low-end, extended highs
- The modern studio workhorse

**Classic102 (Ampex ATR-102)**
- Warm, rich, and musical
- Even and odd harmonic blend
- Transformer-colored character
- Smooth high-frequency rolloff
- The mastering room classic

## Tape Formulations

Choose from four tape types, each with distinct sonic characteristics:

| Type | Character | Best For |
|------|-----------|----------|
| **Type 456** | Warm, musical saturation | Drums, vocals, mix bus |
| **GP9** | Modern, extended headroom | Clean recordings, mastering |
| **Type 911** | German precision, tight | Classical, acoustic music |
| **Type 250** | Professional studio standard | All-purpose recording |

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

### Subtle
| Preset | Description |
|--------|-------------|
| Gentle Warmth | Transparent analog glue |
| Transparent Glue | Subtle cohesion |
| Mastering Touch | Delicate tape character |

### Warm
| Preset | Description |
|--------|-------------|
| Classic Analog | Traditional tape sound |
| Vintage Warmth | Rich, full-bodied tone |
| Tube Console | Console-style coloration |

### Character
| Preset | Description |
|--------|-------------|
| 70s Rock | That classic rock sound |
| Tape Saturation | Obvious tape drive |
| Cassette Deck | 4-track character |

### Lo-Fi
| Preset | Description |
|--------|-------------|
| Lo-Fi Warble | Wobbly vintage vibes |
| Worn Tape | Aged tape artifacts |
| Dusty Reel | Nostalgic degradation |

### Mastering
| Preset | Description |
|--------|-------------|
| Master Bus Glue | Subtle mix cohesion |
| Analog Sheen | High-end polish |
| Vintage Master | Classic mastering chain |

## Premium Vintage UI

TapeMachine features a photorealistic vintage interface inspired by classic studio equipment:

- **Authentic VU Meters** — IEC 60268-17 compliant ballistics with spring overshoot
- **Animated Tape Reels** — 3D metallic appearance with rotating reflections
- **Chicken-Head Knobs** — Classic Bakelite-style controls
- **Brushed Metal Panels** — Premium studio equipment aesthetic
- **LED Indicators** — Illuminated status feedback

## Technical Specifications

### DSP Details
- **Saturation model:** Hysteresis-based magnetic tape emulation
- **Frequency response:** Machine and tape-type specific EQ curves
- **Wow/Flutter:** Multi-oscillator modulation with random component
- **Anti-aliasing:** 2x/4x oversampling options

### Parameter Ranges
- **Input Gain:** ±12dB
- **Output Gain:** ±12dB
- **Bias:** Fine-tune tape magnetization
- **Wow:** 0–100% modulation depth
- **Flutter:** 0–100% modulation depth
- **Mix:** 0–100% wet/dry blend
- **HP Filter:** 20–500Hz
- **LP Filter:** 1kHz–20kHz

### Performance
- **CPU usage:** ~2–4% per instance (2x oversampling, 48kHz)
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

TapeMachine is open source under GPL-2.0. View the source, report issues, or contribute on [GitHub](https://github.com/luna-co-software/plugins).

---

*Disclaimer: This is an independent emulation inspired by classic tape machines. This project is not affiliated with or endorsed by Studer, Ampex, or any hardware manufacturer.*
