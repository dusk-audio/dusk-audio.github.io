---
layout: plugin
title: Multi-Comp
slug: multi-comp
tagline: Multi-mode dynamics compressor
description: Professional multi-mode compressor with 7 compression styles plus 4-band multiband compression. Free VST3, LV2, and AU plugin for Linux, Windows, and macOS.
version: "1.1.0"

features:
  - 8 compression modes (Vintage Opto, Vintage FET, Classic VCA, Bus, Studio FET, Studio VCA, Digital, Multiband)
  - 4-band multiband compression with adjustable crossovers
  - Smooth optical compression with program-dependent release
  - FET compression with All-Buttons mode
  - Bus compressor emulation with Auto Release
  - VCA compression with soft knee option
  - Hardware-accurate transformer emulation with authentic HF rolloff
  - Analog noise toggle (-80dB floor for authentic character)
  - Per-band solo buttons and gain reduction meters (Multiband mode)
  - Global sidechain HP filter (20-500Hz)
  - External sidechain input support
  - Auto-makeup gain compensation
  - Output distortion (Soft/Hard/Clip)
  - Mix control for parallel compression
  - Off/2x/4x oversampling for anti-aliased processing (or bypass for CPU savings)
  - 13 factory presets
  - Full automation support

requirements:
  - "Linux: GLIBC 2.31+ (Ubuntu 20.04+, Fedora 32+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1kHz – 192kHz"

changelog:
  - version: "1.1.0"
    date: "2026-01-08"
    changes:
      - Added "Off" option to oversampling (Off/2x/4x) for CPU savings when oversampling is not needed
      - Fixed preset mode bug where some presets loaded the wrong compressor mode after reopening plugin window
      - Presets like "Gentle Master" now correctly load as Studio VCA instead of Digital
  - version: "1.0.1"
    date: "2026-01-07"
    changes:
      - Fixed Linux release packaging (proper VST3/LV2 bundle structure)
      - Added missing AU component for macOS
      - Improved installation instructions
  - version: "1.0.0"
    date: "2026-01-03"
    changes:
      - Initial release with VST3/LV2/AU support
      - 7 compression modes plus multiband
      - 13 factory presets
      - Available for Linux, Windows, and macOS
---

Multi-Comp is a professional multi-mode dynamics compressor that brings classic hardware compression styles to your DAW — completely free.

## Overview

Multi-Comp provides 8 distinct compression modes, each inspired by legendary hardware units. From smooth optical compression to aggressive FET limiting, and from precise digital control to powerful multiband processing — Multi-Comp covers every dynamics need.

## Compression Modes

### Vintage Opto

![Vintage Opto mode](/lunacoaudio.github.io/assets/images/plugins/multi-comp/vintage-opto.png)

- Smooth, program-dependent optical compression
- Photocell-style attack/release characteristics
- Peak Reduction control for classic opto workflow
- Compress/Limit modes
- Perfect for vocals, bass, and mix bus

### Vintage FET

![Vintage FET mode](/lunacoaudio.github.io/assets/images/plugins/multi-comp/vintage-fet.png)

- Aggressive, punchy FET compression
- Classic ratio buttons: 4:1, 8:1, 12:1, 20:1
- **All-Buttons mode** for the famous "British Mode" distortion
- Ultra-fast attack times (20μs minimum)
- Authentic transistor saturation

### Classic VCA

![Classic VCA mode](/lunacoaudio.github.io/assets/images/plugins/multi-comp/classic-vca.png)

- Fast, precise VCA compression
- Soft knee option for gentle compression
- Clean, transparent compression
- Excellent for drums and percussion

### Bus Compressor

![Bus Compressor mode](/lunacoaudio.github.io/assets/images/plugins/multi-comp/bus-compressor.png)

- Stepped attack times (0.1 to 30ms)
- Stepped release with Auto mode
- Classic mix bus "glue"
- 2:1 to 10:1 ratio range

### Studio FET

![Studio FET mode](/lunacoaudio.github.io/assets/images/plugins/multi-comp/studio-fet.png)

- Cleaner FET with 30% of Vintage harmonics
- Modern FET sound with less coloration
- Same fast attack characteristics

### Studio VCA

![Studio VCA mode](/lunacoaudio.github.io/assets/images/plugins/multi-comp/studio-vca.png)

- Modern VCA with RMS detection
- Soft knee option
- Ultra-clean compression
- Great for mastering

### Digital

![Digital mode](/lunacoaudio.github.io/assets/images/plugins/multi-comp/digital.png)

- Transparent, precise compression
- No coloration or saturation
- Perfect for surgical dynamics control
- Ideal for reference monitoring

### Multiband

![Multiband mode](/lunacoaudio.github.io/assets/images/plugins/multi-comp/multiband.png)

- **4 frequency bands** (Low, Lo-Mid, Hi-Mid, High)
- Adjustable crossover frequencies
- Per-band threshold, ratio, attack, release, makeup
- Per-band solo buttons
- LED-style gain reduction meters per band

## Analog Emulation

Multi-Comp features hardware-accurate analog emulation that captures the authentic character of classic compressors:

### Transformer Emulation
Each vintage mode includes input and output transformer modeling with authentic high-frequency characteristics:

| Mode | Input Transformer | Output Transformer |
|:-----|:------------------|:-------------------|
| Vintage Opto | 18kHz rolloff | 16kHz rolloff |
| Vintage FET | 20kHz rolloff | 22kHz rolloff |
| Bus | 22kHz rolloff | 24kHz rolloff |
| VCA/Digital | None (transparent) | None (transparent) |

### Analog Noise
Toggle the "Analog Noise" button to add subtle -80dB analog noise floor, matching the authentic character of hardware units. Disable for completely silent digital behavior.

### Tube and Saturation
- Opto mode includes tube stage modeling
- FET mode captures the characteristic transistor saturation
- All analog modes include harmonic generation based on hardware measurements

## Factory Presets

Multi-Comp includes 13 professionally crafted presets:

### Vocals

| Preset | Mode | Description |
|:-------|:-----|:------------|
| Smooth Opto Vocal | Opto | Classic optical style, Peak Reduction 50%, Compress mode |
| Vocal Presence | Vintage FET | 4:1, Attack 0.5ms, Release 60ms — punchy presence |
| Modern Pop Control | Studio FET | 8:1, Attack 0.3ms, Auto-makeup — fast modern control |

### Drums

| Preset | Mode | Description |
|:-------|:-----|:------------|
| Classic Drum Glue | Bus | Attack 30ms, Release Auto, 4:1 — classic bus sound |
| Room Nuke (FET All) | Vintage FET | All-buttons-in, Attack 0.8ms, Release 50ms — room destruction |
| Snare Snap | Classic VCA | Attack 15ms, Release 50ms, 4:1 — punchy snare |

### Bass

| Preset | Mode | Description |
|:-------|:-----|:------------|
| Rock Bass Anchor | Vintage FET | 4:1, Attack 0.8ms, Release 250ms — solid foundation |
| Vintage Pinned Bass | Opto | Peak Reduction 65% — classic Motown style |

### Guitars

| Preset | Mode | Description |
|:-------|:-----|:------------|
| Acoustic Strum Tamer | Studio VCA | 3:1, Attack 2ms, Pristine saturation — pick spike control |
| Funk Rhythm Guitar | Vintage FET | 4:1, Attack 0.3ms, Release 50ms — funky pumping |

### Mix Bus

| Preset | Mode | Description |
|:-------|:-----|:------------|
| Console-Style Glue | Bus | Attack 10ms, Release Auto, 4:1 — classic mix bus glue |
| Gentle Master | Studio VCA | 1.5:1, Attack 30ms, Pristine — transparent mastering |

### Creative

| Preset | Mode | Description |
|:-------|:-----|:------------|
| EDM Pump (115-130 BPM) | Vintage FET | 20:1, Attack 0.1ms, Release 250ms — sidechain pumping |

## Technical Specifications

### DSP Details
- **Topology:** Mode-specific analog modeling
- **Oversampling:** Off/2x/4x for alias-free saturation (or bypass for CPU savings)
- **Sidechain:** Internal HP filter + external input support
- **Lookahead:** 0-10ms global lookahead buffer
- **Stereo linking:** Full stereo processing with linked GR

### Parameter Ranges
- **Opto Peak Reduction:** 0–100%
- **FET Input/Output:** Various per mode
- **Attack:** 0.02ms – 100ms (mode dependent)
- **Release:** 50ms – 3s (mode dependent)
- **Ratio:** 1:1 – ∞:1 (mode dependent)
- **Sidechain HP:** 20–500Hz
- **Mix:** 0–100% (parallel compression)

### Performance
- **CPU usage:** ~2-4% per instance (2x oversampling, 48kHz)
- **Memory:** ~15MB per instance
- **Latency:** Variable based on lookahead/oversampling settings

## DAW Compatibility

### Fully Tested
- **Reaper** — VST3/LV2, all features working
- **Ardour** — LV2 with full GUI
- **Bitwig Studio** — VST3, presets working
- **Carla** — VST3/LV2, standalone host
- **Standalone** — JUCE standalone application

### Expected to Work
- Studio One, FL Studio
- Ableton Live, Cubase/Nuendo
- Logic Pro, GarageBand (AU on macOS)

## Installation

### Linux
```
VST3: ~/.vst3/Multi-Comp.vst3
LV2:  ~/.lv2/Multi-Comp.lv2
```

### Windows
```
VST3: C:\Program Files\Common Files\VST3\Multi-Comp.vst3
```

### macOS
```
VST3: ~/Library/Audio/Plug-Ins/VST3/Multi-Comp.vst3
AU:   ~/Library/Audio/Plug-Ins/Components/Multi-Comp.component
```

## Open Source

Multi-Comp is open source under GPL-2.0. View the source, report issues, or contribute on [GitHub](https://github.com/luna-co-software/plugins).
