---
layout: plugin
title: DuskVerb 2
slug: duskverb-2
published: true
tagline: Algorithmic reverb with 45 factory sounds
description: DuskVerb reverb engines, a nonlinear burst engine and updated voicing in a redesigned, resizable interface, with A/B comparison, user presets, import of original DuskVerb presets, and mono, mono-to-stereo, and stereo routing. Free AU, VST3, CLAP, and LV2 plugin for Linux, Windows, and macOS.
version: "1.1.0"
screenshot: /assets/images/plugins/duskverb-2-screenshot.webp

features:
  - DuskVerb reverb engines plus a nonlinear burst engine, selectable from the Engine menu
  - 45 factory presets covering plates, halls, chambers, rooms, auditoriums, gated, reverse, shimmer and nonlinear sounds
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
  - version: "1.1.0"
    date: "2026-11-27"
    changes:
      - "21 new factory programs in seven families: Rooms II, Chambers II, Vintage Plates, Halls II, Studio Plates, Modulated Halls and Auditoriums. They recall at 35% wet with Bus off; Mix Lock keeps your current Mix and Bus settings. Existing programs keep their numbers."
      - "Eight new engines in the Engine menu: Room, Chamber II, Vintage Plate II, Hall II, Compact Plate, Studio Plate, Modulated Hall and Auditorium."
      - "Ten factory presets now play on the new engines. Live Room, Reverse Taps, Medium Drum Room, Tiled Room and Vocal Hall use Room; Large Chamber uses Chamber II; Vintage Vocal Plate and Vintage Gold Plate use Vintage Plate II; Cathedral Large Hall uses Hall II; Vocal Plate uses Compact Plate. At their factory settings Reverse Taps plays about 2.4 dB louder than in 1.0.3, Vocal Hall about 1.3 dB and Cathedral Large Hall about 0.8 dB; the others are within 0.5 dB."
      - "Vocal Plate on Compact Plate: its bass builds later on kick drums, with less emphasis around 73 Hz. Vocal Hall on Room: close early reflections and a 2.83 s midrange decay. Live Room places 62% of its impulse energy between 20 and 50 ms, with opposite polarity on the two sides, so much of the opening bass cancels in mono. Large Chamber brings its tail in sooner after a hit and keeps more high-frequency detail."
      - "Small Drum Room is retuned on its engine. Its early reflections sit between 5 and 17 ms, with faint repeats near 70, 100 and 155 ms. Hi Cut moves from 3.6 to 6.0 kHz and the top end rolls off above 14 kHz. The mid decay multiplier rises from 1.22 to 1.40, Width goes from 114% to 105%, and the output trim falls by 1.1 dB."
      - "Black Hole has a quieter upper octave and a centered input to the shimmer engine. Its first stereo echo arrives at 33.6 ms, followed by reflections at 66.6 ms, 101 to 104.5 ms and 136.3 ms. Blade Runner 224 has a new early reflection pattern, a 42 ms tank delay and revised stereo and octave balances."
      - "Deep Blue Day brings out the first octave above and below a note. The lower octaves enter sooner and build gradually, and the highest repeats arrive later. The added hiss behind sustained notes is removed. Its factory Decay moves from 20 s to 22.5 s and its Diffusion from 80.7% to 79%. It now starts with an inverted return on each input channel after 16 samples, followed by quieter stereo reflections from 44 to 149 ms."
      - "79 Vocal Chamber has more late reverb behind the initial reflections. Ambience has a slightly larger, wider room. Both have adjusted output trims."
      - "The Big Drum Room Matched preset file now loads the Room engine. Its reflections spread over a longer interval than Medium Drum Room's."
      - "Sessions saved with 1.0.3: a session on any of the ten presets that moved to a new engine, or on 79 Vocal Chamber or Ambience, reopens on the engine it was saved with and sounds as it did. Select the factory preset again to hear the new voicing. A session on Small Drum Room, Black Hole, Blade Runner 224 or Deep Blue Day reopens with the new voicing and its saved controls, so its tone and level can change. A stock Blade Runner 224 session keeps its +9.7 dB trim and Black Hole its +7.64 dB; selecting the factory program again applies the full retune, including +7.7 dB and +9.3 dB, and replaces any edits to its controls. Recalling Deep Blue Day sets Width to 114%."
      - "Drum Plate, Bright Hall, Surf '63 Spring, 1981 Gated Snare and the four Nonlinear presets sound as they did. Drum Plate and Bright Hall, and the sessions that reopen on their earlier engine, are not sample-identical to 1.0.3: the shared engines were reworked for speed, and their output differs by rounding, about 70 dB below the signal."
      - "Decay readings at recall: Cathedral Large Hall 3.66 s (was 3.37 s), Large Chamber 2.88 s (2.82 s), Medium Drum Room 0.70 s (0.78 s), Live Room 0.64 s (0.66 s), and Tiled Room now reads 0.47 s."
      - "Lower CPU. Measured on the development machine at 48 kHz with 128-frame blocks, against 1.0.3: the ten presets on the new engines need 62 to 89% less (Vocal Plate 89% less, Medium Drum Room 79%, Cathedral Large Hall 78%, Vocal Hall and Large Chamber 77%); 79 Vocal Chamber needs 36% less and Deep Blue Day 27%; Drum Plate, Bright Hall, Small Drum Room, Blade Runner 224, Black Hole and Ambience need 12 to 19% less. 1981 Gated Snare, Surf '63 Spring and the Nonlinear presets cost what they did."
      - "Lo Cut below 10 Hz: at its 5 Hz minimum the output high-pass of the new engines, and of the early reflections on the earlier engines, is off. It blends in up to 10 Hz and is unchanged from 10 Hz up. No factory preset on the earlier engines sets Lo Cut that low."
  - version: "1.0.3"
    date: "2026-11-23"
    changes:
      - "Windows VST3: a project saved with 1.0.0 finds DuskVerb 2 again in hosts that read VST3 compatibility information, such as REAPER"
      - "The VST3 class ID does not change: projects saved with 1.0.1 or 1.0.2 load as before"
      - "No changes to the sound or the presets"
  - version: "1.0.2"
    date: "2026-11-22"
    changes:
      - "Nonlinear engine: Decay now lengthens the burst up to 2.5 s (1.0.1 stopped at 783 ms)"
      - "Retuned Vocal Plate, Vintage Vocal Plate, Medium Drum Room, Vocal Hall and Deep Blue Day"
      - "Lower CPU on Reverse Taps, 79 Vocal Chamber, Medium Drum Room and Vocal Hall"
      - "The supporters window closes on any click and has larger text"
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
