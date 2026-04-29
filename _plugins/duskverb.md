---
layout: plugin
title: DuskVerb
slug: duskverb
tagline: Professional Algorithmic Reverb
description: Algorithmic reverb with seven distinct DSP engines — Dattorro vintage plate, 6-AP high-density tank, Quad Room, 16-channel Hadamard FDN, Spring Tank, Non-Linear gated, and Eno-style Shimmer. 35+ hardware-anchored factory presets, random-walk modulation, freeze. Free VST3, LV2, AU, and CLAP plugin for Linux, Windows, and macOS.
version: "0.5.1"
screenshot: /assets/images/plugins/DuskVerb-Eno-FDN.png

screenshots:
  - image: /assets/images/plugins/DuskVerb-Eno-FDN.png
    caption: "Shimmer (Eno FDN) — pitch-shifted feedback cascade for octave-up shimmer reverbs. New in 0.5.0: Black Hole and Deep Blue Day presets."
  - image: /assets/images/plugins/DuskVerb-FDN.png
    caption: "Realistic Space (FDN) — 16-channel Hadamard feedback delay network. The largest engine, tuned for halls and broad ambient washes."
  - image: /assets/images/plugins/DuskVerb-dattorro.png
    caption: "Vintage Plate (Dattorro) — 2-AP cross-coupled plate. Bright, dense, smooth. The classic vocal-plate sound."
  - image: /assets/images/plugins/DuskVerb-6AP.png
    caption: "High Density (6-AP) — 6-allpass density cascade tank. Lush halls, dense ambience, intimate chambers all in one engine."
  - image: /assets/images/plugins/DuskVerb-Quad.png
    caption: "Quad Room (QuadTank) — four cross-coupled tanks with 48 taps. Realistic rooms with strong early reflections."
  - image: /assets/images/plugins/DuskVerb-Tank.png
    caption: "Spring Tank (6G15) — analog spring reverb voicing for guitar amps and surf textures."
  - image: /assets/images/plugins/DuskVerb-NonLinear.png
    caption: "Non-Linear (RMX16) — gated reverb with sidechain-style envelope, the iconic Phil Collins / Hugh Padgham gated-snare sound."

features:
  - Seven distinct DSP engines — switch architecture, not just preset values
  - Dattorro 2-AP cross-coupled vintage plate
  - 6-AP density cascade tank for lush halls and dense ambience
  - 4-tank cross-coupled Quad Room with 48 taps
  - 16-channel Hadamard feedback delay network for realistic spaces
  - Spring Tank engine for analog spring reverb voicings
  - Non-Linear gated engine (Phil Collins / Hugh Padgham gated-snare sound)
  - Eno-style Shimmer engine — pitch-shifted feedback cascade for octave-up shimmer reverbs
  - 35+ hardware-anchored factory presets (Lexicon 224, EMT 140, AMS RMX16, Bricasti M7, Eventide Blackhole, Valhalla Shimmer DeepBlueDay/BlackHole)
  - Random-walk LFO modulation — aperiodic shimmer with no audible warble
  - Three-band damping with adjustable low/high crossovers
  - Independent bass and treble decay multipliers
  - Pre-delay with tempo sync (1/32 — 1/1)
  - Early reflections with adjustable level and size
  - Freeze for infinite sustain
  - Mono-maker for tight low-end on busy mixes
  - Bus mode for send/return setups
  - Hero DECAY visualisation + live tail meter
  - Engine-aware accent colour
  - Resizable UI with persistence
  - Full automation support

requirements:
  - "Linux: glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1 kHz – 192 kHz (sample-rate independent)"

changelog:
  - version: "0.5.1"
    date: "2026-04-29"
    changes:
      - "Windows build fix — replace M_PI (a GNU extension MSVC doesn't expose) with a portable constexpr in DiffusionStage. v0.5.0's Windows VST3/CLAP artifacts never published because the build silently failed at the M_PI reference; the GitHub Actions Windows step also wasn't propagating cmake exit codes, so the failure looked like a successful run with empty bundles. Both issues fixed in this patch."
  - version: "0.5.0"
    date: "2026-04-28"
    changes:
      - "New presets: Black Hole (Ambient) and Deep Blue Day (Shimmer) — clones of Valhalla Shimmer's BlackHole and DeepBlueDay factory presets"
      - "Shimmer engine overhaul — Valhalla-style topology (pitch shifter in feedback loop only), block-rate comb-filter fix, BPF + random-walk pitch modulation to defocus spectral migration"
      - "SixAPTank engine — brightness/density constants converted to per-preset runtime tunables, enabling opt-in bright cascade character (Black Hole) without affecting other SixAPTank presets"
      - "Preset dropdown — categories now nested submenus instead of one giant flat list"
      - "Logic Pro value-editor crash fix on Decay/Size knobs"
      - "State versioning bumped 1->2 with backwards-compatible v1 load path"
      - "CLAP build added alongside AU/VST3/LV2"
  - version: "0.4.0"
    date: "2026-04-25"
    changes:
      - Soft-reset architecture — four distinct DSP engines replace the previous five-algorithm preset-tweak model
      - New engines — Dattorro 2-AP, 6-AP density cascade, Quad Room (4 cross-coupled tanks), 16-channel Hadamard FDN
      - Random-walk LFO modulation across all engines (replaces sine modulation) for aperiodic shimmer
      - 16 hardware-anchored factory presets calibrated to Lexicon 224, EMT 140, AMS RMX16, Bricasti M7, Eventide Blackhole references
      - Three-band damping (low + mid + high shelving biquads) with adjustable crossovers
      - New UI — hero DECAY visualisation, live tail meter, engine-aware accent colour, resizable, mono-maker, save dialog now centres on plugin
      - Mono-maker control for tight low-end on busy mixes
      - State versioning for forward-compatible session save/load
      - Sample-rate independence verified — all delay lengths and modulation excursions scale linearly from a 44.1 kHz calibration anchor
      - Real-time-safe engine switching — all engines pre-allocated, no allocations in setAlgorithm()
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
---

DuskVerb is a free algorithmic reverb that gives you seven genuinely different DSP engines under the same UI — separate topologies you can audition like swapping hardware boxes, not flavours of the same algorithm. 35+ factory presets anchored to real studio gear, a hero DECAY visualisation, and the controls you need to shape anything from a tight slap to an infinite shimmering pad.

## Overview

The starting point is the engine selector. Each engine is a distinct DSP architecture with its own delay structure, feedback topology, and modulation character. Pick one, then dial in size, decay, modulation, damping, early reflections, and a few output filters. The factory presets are tuned per-engine to match recognisable hardware references, but you're free to switch engines on any preset and get a meaningfully different sound.

Every engine pre-allocates at construction so changing engines is real-time safe — no clicks, no dropouts, no buffer underruns. Modulation across all four engines uses a smoothstep-interpolated random-walk LFO, which gives the aperiodic shimmer of high-end hardware random reverbs (Lexicon 480L, Eventide ModFactor) without the audible cyclic warble of sine modulation.

## Engines

**Vintage Plate (Dattorro)** — A 2-allpass cross-coupled tank built on the Dattorro 1997 plate topology. Bright, dense, smooth. The classic studio vocal plate sound. Use it on snares, vocals, the mix bus.

<img src="{{ '/assets/images/plugins/DuskVerb-dattorro.png' | relative_url }}" alt="DuskVerb — Vintage Plate (Dattorro)">

**High Density (6-AP)** — A 6-allpass density cascade tank. Diffuses the input fast and produces lush, dense halls and ambient pads. Lower size knob settings give you intimate chambers; higher settings open up to cathedral-scale spaces.

<img src="{{ '/assets/images/plugins/DuskVerb-6AP.png' | relative_url }}" alt="DuskVerb — High Density (6-AP)">

**Quad Room (QuadTank)** — Four cross-coupled tanks with 48 total taps. Designed for realistic rooms with strong early reflections and clean late decay. Great for drums, dialog, and anything where you want a sense of physical space without a long tail.

<img src="{{ '/assets/images/plugins/DuskVerb-Quad.png' | relative_url }}" alt="DuskVerb — Quad Room (QuadTank)">

**Realistic Space (FDN)** — A 16-channel Hadamard feedback delay network. The biggest, most spacious-sounding engine. Use it for halls, ambient washes, and effects that need real breadth. The Hadamard mixing matrix gives natural-sounding mode density.

<img src="{{ '/assets/images/plugins/DuskVerb-FDN.png' | relative_url }}" alt="DuskVerb — Realistic Space (FDN)">

**Spring Tank (6G15)** — Analog spring-reverb voicing modeled after the Fender 6G15. Boingy, characterful, perfect for guitar amps, surf textures, and anywhere a hardware spring's "drip" character is the sound.

<img src="{{ '/assets/images/plugins/DuskVerb-Tank.png' | relative_url }}" alt="DuskVerb — Spring Tank (6G15)">

**Non-Linear (RMX16)** — Gated reverb with a sidechain-style envelope follower. The iconic Phil Collins / Hugh Padgham gated-snare sound. Big-room reverb shaped by the dry signal's transients — the room blooms in for the snare hit, then cuts off cleanly. Ships with "1981 Gated Snare" and "In The Air Tonight" presets.

<img src="{{ '/assets/images/plugins/DuskVerb-NonLinear.png' | relative_url }}" alt="DuskVerb — Non-Linear (RMX16)">

**Shimmer (Eno FDN)** — Pitch-shifted feedback cascade in the spirit of Brian Eno and Daniel Lanois's 1980s outboard rig (AMS DMX → Lexicon 224 → feedback aux). Octave-up shimmer reverbs for ambient pads, sustained guitars, drone work. New in v0.5.0: Black Hole and Deep Blue Day presets clone Valhalla Shimmer's BlackHole and DeepBlueDay factory voicings.

<img src="{{ '/assets/images/plugins/DuskVerb-Eno-FDN.png' | relative_url }}" alt="DuskVerb — Shimmer (Eno FDN)">

## Controls

**Hero DECAY** — large concentric-ring readout. Drag vertically. Sets RT60 from 0.2 s to 30 s.

**Pre-Delay** — gap before the reverb starts (with tempo sync). Use STEED-style 18 ms for vintage vocals, longer for modern pop spaces.

**Size** — virtual room dimensions. Affects echo density and spacing.

**Depth / Rate** — modulation amount and speed. A little goes a long way for keeping the tail sounding natural and avoiding metallic resonances.

**Treble Mult / Bass Mult / Crossover** — independent decay multipliers for the highs and lows, with an adjustable crossover frequency. <1× treble = natural air absorption; >1× bass = bass rings longer than mids.

**Diffusion** — input smearing. Low = grainy slap-back echoes; high = smooth wash.

**ER Level / ER Size** — early reflection level and spacing. The early reflections define the perceived room shape.

**Lo Cut / Hi Cut** — wet-signal filters.

**Width** — stereo width 0–200%.

**Mono <** — sums the wet signal to mono below the cutoff. Use 80–150 Hz to keep low-end tight on busy mixes; 20 Hz = bypass.

**Trim** — output gain offset.

**Freeze** — mutes input, loops the existing tail indefinitely. Useful for ambient pads, risers, and effects.

**Bus Mode** — outputs 100% wet regardless of DRY/WET. Use on a send/return aux.

## Factory Presets (35+)

**Plates** — Vocal Plate, Rich Plate, Gold Plate, Fat Pop Plate, Modulated Plate, Vintage Vocal Plate, Snare Plate XL
**Springs** — Surf '63 Spring, Tank Drip
**Halls** — Utility Hall, Bright Studio Hall, Bright Hall, Smooth Concert Hall, Blade Runner Concert, Deep Blue, Lush Dark Hall, Vocal Hall, Cathedral, Blade Runner 224
**Chambers** — Realistic Chamber, Wood Chamber
**Rooms** — 80s Non-Lin Drum, Vocal Booth, Tight Drum Room, Studio Room, Ambience, PCM Drum Room, 1981 Gated Snare, In The Air Tonight, Reverse Taps
**Ambient** — Mobius Pad, Ambient Swell, Black Hole, Infinite Blackhole
**Shimmer** — Cascading Heaven, Deep Blue Day

Each preset is anchored to a recognisable hardware reference (Lexicon 224 Blade Runner, EMT 140 plate, AMS RMX16 non-lin drum, Bricasti M7 cathedral, Eventide Blackhole infinite, Valhalla Shimmer BlackHole / DeepBlueDay). The UI's accent colour shifts to match the active engine, so you always know which architecture you're hearing. The preset dropdown uses nested submenus so the categories stay scannable as the library grows.

You can also save, load, and delete your own presets from the menu — they live in `~/Library/Application Support/Dusk Audio/DuskVerb/Presets/` (macOS) and the equivalent locations on Linux/Windows.

## Under the Hood

Every engine ships with three-band damping (low-shelf + high-shelf 2nd-order RBJ biquads in a Lexicon-style serial cascade). All delay reads use cubic Hermite interpolation. Parameters smooth per-sample to avoid automation zipper noise. Modulation is generated by a smoothstep-interpolated random-walk LFO, normalised to a consistent ±16-sample excursion across the engines. The FDN uses a 16×16 Hadamard mixing matrix; QuadTank cross-couples four allpass tanks with prime-spaced delay lines; the 6-AP density cascade is structurally similar to Lexicon hall density-AP conventions; the Shimmer engine wraps a granular pitch shifter around an FDN tank with a 50 ms feedback delay decoupled from the host block size. Audio thread is allocation-free and lock-free; engine switching only flips a pointer.

DuskVerb is sample-rate independent. All base delay lengths and modulation excursions are tuned at 44.1 kHz and scale linearly with the host sample rate. Tested at 44.1 / 48 / 96 / 192 kHz.

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
