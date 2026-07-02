---
layout: plugin
title: DuskVerb
slug: duskverb
tagline: Professional Algorithmic Reverb
description: "Algorithmic reverb with eleven distinct DSP engines: Plate, Vintage Plate, Smooth Plate, Chamber, Spring, Gated, Shimmer, Reverse, Hall, Tiled Room, and Dense Hall. Tone, Character, and Duck macro shapers, 20 hardware-inspired factory presets, random-walk modulation, freeze. Free VST3, LV2, AU, and CLAP plugin for Linux, Windows, and macOS."
version: "0.6.0"
screenshot: /assets/images/plugins/DuskVerb-Shimmer.png

screenshots:
  - image: /assets/images/plugins/DuskVerb-Shimmer.png
    caption: "Shimmer: 8-channel Hadamard FDN with an in-loop granular pitch shifter for octave-up shimmer reverbs. Overhauled in 0.6.0 with a post-loop HF air voice and down-octave lows (Deep Blue Day, Black Hole)."
  - image: /assets/images/plugins/DuskVerb-Hall.png
    caption: "Hall: Feedback delay network with a per-octave GEQ in the loop for honest, independent per-band RT60 and smooth, non-metallic tails."
  - image: /assets/images/plugins/DuskVerb-DenseHall.png
    caption: "Dense Hall: Heavily diffused 8-line FDN for a thick, smooth, lush concert tail. Powers the factory hall presets (Bright Hall, Vocal Hall, Cathedral Large Hall, Blade Runner 224)."
  - image: /assets/images/plugins/DuskVerb-TiledRoom.png
    caption: "Tiled Room: Sparse tapped early-reflection front welded to a short, dark FDN tail. Tight ceramic room character."
  - image: /assets/images/plugins/DuskVerb-Reverse.png
    caption: "Reverse: Rising-gain early-reflection onset into a dark modulated FDN tail. Swells up into the transient for risers and vintage reverse effects."
  - image: /assets/images/plugins/DuskVerb-Plate.png
    caption: "Plate: 2-AP cross-coupled plate on the Dattorro topology. Bright, dense, smooth. The classic vocal-plate sound."
  - image: /assets/images/plugins/DuskVerb-VintagePlate.png
    caption: "Vintage Plate: The plate tank with a fixed post-EQ voicing for warmer vintage-hardware character."
  - image: /assets/images/plugins/DuskVerb-SmoothPlate.png
    caption: "Smooth Plate: 6-allpass density cascade. Fast diffusion for lush, dense ambience and smooth pads."
  - image: /assets/images/plugins/DuskVerb-Chamber.png
    caption: "Chamber: Four cross-coupled tanks with 48 taps. Realistic chambers and rooms with strong early reflections."
  - image: /assets/images/plugins/DuskVerb-Spring.png
    caption: "Spring: 3-spring tank with dispersion allpass chirp, inspired by the Fender 6G15. Boingy surf and amp textures."
  - image: /assets/images/plugins/DuskVerb-Gated.png
    caption: "Gated: 64-tap feed-forward delay line with envelope shaping, the iconic gated-snare sound in the spirit of the AMS RMX16."

features:
  - Eleven distinct DSP engines, switch architecture, not just preset values
  - Plate, a 2-AP cross-coupled Dattorro plate
  - Vintage Plate, the plate tank with a fixed vintage post-EQ voicing
  - Smooth Plate, a 6-AP density cascade for lush, dense ambience
  - Chamber, four cross-coupled tanks with 48 taps
  - Spring, a 3-spring tank inspired by the Fender 6G15
  - Gated, an envelope-shaped feed-forward reverb for gated-snare sounds
  - Shimmer, an 8-channel Hadamard FDN with in-loop granular pitch shift, HF air voice, and down-octave lows
  - Reverse, a rising-gain onset into a dark FDN tail for swells and risers
  - Hall, an FDN with per-octave GEQ for honest per-band RT60
  - Tiled Room, a sparse-ER front with a short dark tail for tight rooms
  - Dense Hall, a heavily diffused 8-line FDN for thick, smooth halls
  - Tone, Character, and Duck macro shapers for fast global voicing
  - 20 hardware-inspired factory presets (anchored to Lexicon, EMT, AMS, Bricasti, Eventide, and Valhalla references)
  - Random-walk LFO modulation, aperiodic shimmer with no audible warble
  - Three-band damping with adjustable low/high crossovers
  - Independent bass and treble decay multipliers
  - Honest Decay knob calibrated for true RT60 across all factory presets
  - Pre-delay with tempo sync (1/32 to 1/1)
  - Early reflections with adjustable level and size
  - Freeze for infinite sustain
  - Mono-maker for tight low-end on busy mixes
  - Bus mode for send/return setups
  - Large DECAY visualization + live tail meter
  - Two-column preset menu with in-window dropdowns
  - Engine-aware accent color
  - Resizable UI with persistence
  - Full automation support

requirements:
  - "Linux: glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1 kHz to 192 kHz (sample-rate independent)"

changelog:
  - version: "0.6.0"
    date: "2026-07-02"
    changes:
      - "New Hall engine (FDN plus per-octave GEQ) and Dense Hall engine; hall presets migrated for honest RT60 and smoother, less metallic tails."
      - "New Reverse and Tiled Room engines."
      - "Macro row added: Tone, Character, and Duck global shapers."
      - "Shimmer overhaul: post-loop HF air voice plus down-octave lows (Deep Blue Day, Black Hole)."
      - "Honest Decay knob recalibrated across all factory presets."
      - "Two-column preset menu, brighter labels, and in-window dropdowns (fixes the Wayland/XWayland popup glitch)."
      - "Extensive factory-preset retuning against Lexicon, Valhalla, and EMT hardware anchors."
      - "State-restore and pluginval robustness fixes."
  - version: "0.5.4"
    date: "2026-05-08"
    changes:
      - Unified double-click-to-edit value entry across all knobs
      - Add CLAP plugin format support
      - Misc shared LookAndFeel polish
  - version: "0.5.3"
    date: "2026-04-29"
    changes:
      - "Dattorro modulation rewrite: replaced the per-sample white-noise jitter on the delay1 and delay2 read taps with smoothstep-interpolated random-walk LFOs, one per tap. White noise on a delay-line read is audio-rate phase modulation, which generates broadband FM sidebands audible as tape-style hiss. The new LFOs wander the read positions enough to break modal resonances (the original purpose of the jitter) but are band-limited by smoothstep interpolation and produce no HF artifacts. Three modulators per tank now run at slightly detuned rates (x0.83, x1.0, x1.27) so they don't beat against each other periodically, proper 'spin and wander' behavior."
      - "Preset-swap state cleanup: extended DuskVerbEngine::clearAllBuffers() to reset the input diffuser's allpass buffers and the early-reflection multi-tap delay lines / per-tap LP states. Previously these retained signal-carrying state across preset switches, leaking stale audio into the new preset's tail (heard as hiss on plate and hall presets after switching presets a few times). With dual-engine crossfade in place, idle engines now come back online fully silent."
      - "Patreon supporters overlay now shows the plugin version. Was passing an empty version string at construction; now reads JucePlugin_VersionString."
      - "Preset retunings: Cascading Heaven (mix 70 to 36.1%, feedback 60 to 25%), Deep Blue Day (mix 80 to 38%, feedback 45 to 22%), Gold Plate (mix 100 to 30%), 1981 Gated Snare (release 50 to 210 ms)."
  - version: "0.5.2"
    date: "2026-04-29"
    changes:
      - "Preset switching no longer clicks. Replaced the single-engine architecture with two pre-allocated engines and a 50 ms equal-power crossfade on every preset apply: the new preset's engine starts cleared and force-loaded with the new parameters, the old engine keeps running on the input so its tail decays naturally, and the two outputs are blended over the fade window. Eliminates the audible snap that came from the simultaneous buffer-clear, parameter coefficient jumps, and SixAPTank brightness reset that all fired in the same processBlock as the swap."
  - version: "0.5.1"
    date: "2026-04-29"
    changes:
      - "Windows build fix: replace M_PI (a GNU extension MSVC doesn't expose) with a portable constexpr in DiffusionStage. v0.5.0's Windows VST3/CLAP artifacts never published because the build silently failed at the M_PI reference; the GitHub Actions Windows step also wasn't propagating cmake exit codes, so the failure looked like a successful run with empty bundles. Both issues fixed in this patch."
      - "Linux CLAP packaging fix: Linux x64 build container's /bin/sh is dash, which doesn't support the bash-only [[ ]] used to gate the CLAP-target build, so DuskVerb.clap was silently missing from duskverb-linux.zip. Linux ARM64 had no CLAP build/copy logic at all. Both jobs now force shell: bash and run the CLAP target alongside VST3/LV2."
  - version: "0.5.0"
    date: "2026-04-28"
    changes:
      - "New presets: Black Hole (Ambient) and Deep Blue Day (Shimmer), clones of Valhalla Shimmer's BlackHole and DeepBlueDay factory presets"
      - "Shimmer engine overhaul: Valhalla-style topology (pitch shifter in feedback loop only), block-rate comb-filter fix, BPF + random-walk pitch modulation to defocus spectral migration"
      - "SixAPTank engine: brightness/density constants converted to per-preset runtime tunables, enabling opt-in bright cascade character (Black Hole) without affecting other SixAPTank presets"
      - "Preset dropdown: categories now nested submenus instead of one giant flat list"
      - "Logic Pro value-editor crash fix on Decay/Size knobs"
      - "State versioning bumped 1 to 2 with backwards-compatible v1 load path"
      - "CLAP build added alongside AU/VST3/LV2"
  - version: "0.4.0"
    date: "2026-04-25"
    changes:
      - "Soft-reset architecture: four distinct DSP engines replace the previous five-algorithm preset-tweak model"
      - "New engines: Dattorro 2-AP, 6-AP density cascade, Quad Room (4 cross-coupled tanks), 16-channel Hadamard FDN"
      - Random-walk LFO modulation across all engines (replaces sine modulation) for aperiodic shimmer
      - 16 hardware-anchored factory presets calibrated to Lexicon 224, EMT 140, AMS RMX16, Bricasti M7, Eventide Blackhole references
      - Three-band damping (low + mid + high shelving biquads) with adjustable crossovers
      - "New UI: large DECAY visualization, live tail meter, engine-aware accent color, resizable, mono-maker, save dialog now centers on plugin"
      - Mono-maker control for tight low-end on busy mixes
      - State versioning for forward-compatible session save/load
      - Sample-rate independence verified, all delay lengths and modulation excursions scale linearly from a 44.1 kHz calibration anchor
      - Real-time-safe engine switching, all engines pre-allocated, no allocations in setAlgorithm()
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

DuskVerb is a free algorithmic reverb that gives you eleven genuinely different DSP engines under the same UI, separate topologies you can audition like swapping hardware boxes, not flavors of the same algorithm. 20 factory presets inspired by real studio gear, a large DECAY visualization, Tone / Character / Duck macro shapers, and the controls you need to shape anything from a tight slap to an infinite shimmering pad.

## Overview

Start with the engine. Each one is a completely different reverb, so choosing an engine feels less like turning a knob and more like swapping the box in your rack. Find a space you like, then shape it: size, decay, modulation, damping, early reflections, and a handful of output filters are all a drag away. Every factory preset is ready to sit in a mix the moment you load it, but nothing is locked down. Drop the same preset onto a different engine and you land somewhere new.

Switching engines never clicks or drops out. All eleven are warmed up and running under the hood, so you can flip between them while the music keeps playing and hear each space take over in real time. And because the modulation wanders instead of cycling on a fixed sine, the tails shimmer and breathe like high-end hardware rather than wobbling in a loop.

New in v0.6.0: a Tone, Character, and Duck macro row for quick global moves, two dedicated hall engines (Hall and Dense Hall) with honest decay times, and new Reverse and Tiled Room engines. The preset menu is now a clean two-column layout with in-window dropdowns that behave correctly under Wayland and XWayland.

## Engines

**Plate** is a 2-allpass cross-coupled tank built on the Dattorro 1997 plate topology. Bright, dense, smooth. The classic studio vocal plate sound. Use it on snares, vocals, the mix bus. Presets: Vocal Plate, Drum Plate.

<img src="{{ '/assets/images/plugins/DuskVerb-Plate.png' | relative_url }}" alt="DuskVerb Plate">

**Vintage Plate** is the same plate tank with a fixed post-EQ voicing dialed in for warmer, vintage-hardware character. Presets: Vintage Vocal Plate, Vintage Gold Plate.

<img src="{{ '/assets/images/plugins/DuskVerb-VintagePlate.png' | relative_url }}" alt="DuskVerb Vintage Plate">

**Smooth Plate** is a 6-allpass density cascade tank. It diffuses the input fast and produces lush, dense ambience and smooth pads. Lower size settings give you intimate spaces; higher settings open up to larger, denser tails.

<img src="{{ '/assets/images/plugins/DuskVerb-SmoothPlate.png' | relative_url }}" alt="DuskVerb Smooth Plate">

**Chamber** uses four cross-coupled tanks with 48 total taps. Designed for realistic chambers and rooms with strong early reflections and clean late decay. Great for drums, dialog, and anything where you want a sense of physical space without a long tail. Presets: 79 Vocal Chamber, Large Chamber.

<img src="{{ '/assets/images/plugins/DuskVerb-Chamber.png' | relative_url }}" alt="DuskVerb Chamber">

**Spring** is a 3-spring tank with a dispersion allpass chirp, inspired by the Fender 6G15. Boingy, characterful, perfect for guitar amps, surf textures, and anywhere a hardware spring's "drip" character is the sound. Preset: Surf '63 Spring.

<img src="{{ '/assets/images/plugins/DuskVerb-Spring.png' | relative_url }}" alt="DuskVerb Spring">

**Gated** is a 64-tap feed-forward delay line with envelope shaping, in the spirit of the AMS RMX16 non-linear programs. Big-room reverb shaped by the dry signal's transients, the room blooms in for the snare hit, then cuts off cleanly. The iconic Phil Collins / Hugh Padgham gated-snare sound. Preset: 1981 Gated Snare.

<img src="{{ '/assets/images/plugins/DuskVerb-Gated.png' | relative_url }}" alt="DuskVerb Gated">

**Shimmer** is an 8-channel Hadamard FDN with a granular pitch shifter in the feedback loop, in the spirit of Brian Eno and Daniel Lanois's 1980s outboard rig and Valhalla Shimmer. Octave-up shimmer reverbs for ambient pads, sustained guitars, drone work. Overhauled in v0.6.0 with a post-loop HF air voice and down-octave lows. Presets: Black Hole, Deep Blue Day.

<img src="{{ '/assets/images/plugins/DuskVerb-Shimmer.png' | relative_url }}" alt="DuskVerb Shimmer">

**Reverse** is a causal rising-gain early-reflection onset feeding a dark modulated FDN tail, in the spirit of the Lexicon PCM Room reverse programs. The tail swells up into the transient instead of decaying away from it. Use it for risers, pads, vocal throws, and vintage tape-reverse effects. Preset: Reverse Taps.

<img src="{{ '/assets/images/plugins/DuskVerb-Reverse.png' | relative_url }}" alt="DuskVerb Reverse">

**Hall** is a feedback delay network with a per-octave graphic EQ in the feedback loop, giving independent per-band RT60 for honest decay and smooth, non-metallic tails. New in v0.6.0. Select it on any preset when you want the most truthful per-band decay control.

<img src="{{ '/assets/images/plugins/DuskVerb-Hall.png' | relative_url }}" alt="DuskVerb Hall">

**Tiled Room** front-loads a sparse tapped-delay early-reflection field welded to a short, dark FDN tail. New in v0.6.0, it nails the tight, bright-then-dark character of a ceramic tiled room that a single-tank FDN cannot express. Preset: Tiled Room.

<img src="{{ '/assets/images/plugins/DuskVerb-TiledRoom.png' | relative_url }}" alt="DuskVerb Tiled Room">

**Dense Hall** is a heavily diffused 8-line FDN with allpass diffusion and modulation at every stage, giving a dense, smooth tail that the standard hall FDN structurally cannot reach. New in v0.6.0, for thick, lush concert spaces. It powers all four factory hall presets: Bright Hall, Vocal Hall, Cathedral Large Hall, Blade Runner 224.

<img src="{{ '/assets/images/plugins/DuskVerb-DenseHall.png' | relative_url }}" alt="DuskVerb Dense Hall">

## Macros

New in v0.6.0, three macro shapers sit in the MACRO row and layer on top of every preset's baked values for fast global voicing without diving into individual knobs.

**Tone** is a spectral tilt from dark to bright in a single move (drives Treble Mult and Hi Cut together).

**Character** adds movement and grit, blending in extra modulation depth and saturation as you turn it up.

**Duck** ducks the wet tail while the dry input is loud, then lets it swell back as the source decays, sidechained off the dry signal to keep vocals and busy mixes clear.

## Controls

**DECAY** is a large concentric-ring readout. Drag vertically. Sets RT60 from 0.2 s to 30 s. Recalibrated in v0.6.0 for honest decay times across all factory presets.

**Pre-Delay** is the gap before the reverb starts (with tempo sync). Use a short 18 ms for vintage vocals, longer for modern pop spaces.

**Size** sets virtual room dimensions. Affects echo density and spacing.

**Depth / Rate** are modulation amount and speed. A little goes a long way for keeping the tail sounding natural and avoiding metallic resonances.

**Treble Mult / Bass Mult / Crossover** are independent decay multipliers for the highs and lows, with an adjustable crossover frequency. Below 1x treble gives natural air absorption; above 1x bass makes bass ring longer than mids.

**Diffusion** controls input smearing. Low gives grainy slap-back echoes; high gives a smooth wash.

**ER Level / ER Size** set early reflection level and spacing. The early reflections define the perceived room shape.

**Lo Cut / Hi Cut** are wet-signal filters.

**Width** sets stereo width from 0 to 200%.

**Mono <** sums the wet signal to mono below the cutoff. Use 80 to 150 Hz to keep low-end tight on busy mixes; 20 Hz bypasses it.

**Trim** is an output gain offset.

**Freeze** mutes input and loops the existing tail indefinitely. Useful for ambient pads, risers, and effects.

**Bus Mode** outputs 100% wet regardless of DRY/WET. Use on a send/return aux.

## Factory Presets (20)

**Plates** Vocal Plate, Vintage Vocal Plate, Drum Plate, Vintage Gold Plate
**Springs** Surf '63 Spring
**Halls** Bright Hall, Vocal Hall, Cathedral Large Hall, Blade Runner 224
**Chambers** 79 Vocal Chamber, Large Chamber
**Rooms** Small Drum Room, Medium Drum Room, Live Room, Tiled Room, Ambience, 1981 Gated Snare, Reverse Taps
**Shimmer** Black Hole, Deep Blue Day

Each preset is voiced against a recognizable hardware reference (Lexicon 224, EMT 140 plate, AMS RMX16 non-lin drum, Bricasti M7 cathedral, Eventide Blackhole infinite, Valhalla Shimmer BlackHole / DeepBlueDay). In v0.6.0 the hall presets migrated to the new Dense Hall engine for honest RT60, and the whole library was retuned against Lexicon, Valhalla, and EMT hardware anchors. The UI's accent color shifts to match the active engine, so you always know which architecture you're hearing. The preset menu is a scannable two-column layout with in-window dropdowns.

You can also save, load, and delete your own presets from the menu. They live in `~/Library/Application Support/Dusk Audio/DuskVerb/Presets/` (macOS) and the equivalent locations on Linux/Windows.

## Under the Hood

Every engine ships with three-band damping (low-shelf + high-shelf 2nd-order RBJ biquads in a serial cascade). All delay reads use cubic Hermite interpolation. Parameters smooth per-sample to avoid automation zipper noise. Modulation is generated by a smoothstep-interpolated random-walk LFO, normalized to a consistent 16-sample excursion across the engines. The Hall engine fronts a 16-channel Hadamard FDN with a per-octave graphic EQ in the feedback loop for independent per-band RT60; Dense Hall uses a heavily diffused 8-line FDN; Tiled Room welds a sparse tapped-ER front to a short, dark 4-line FDN tail; Chamber cross-couples four allpass tanks with prime-spaced delay lines; the Smooth Plate density cascade uses six series allpasses; the Shimmer engine wraps a granular pitch shifter around an 8-channel Hadamard FDN with a feedback delay decoupled from the host block size, plus a post-loop HF air voice and down-octave lows. Audio thread is allocation-free and lock-free; engine switching only flips a pointer.

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
