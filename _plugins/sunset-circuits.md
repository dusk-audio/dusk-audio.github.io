---
layout: plugin
title: Sunset Circuits
slug: sunset-circuits
tagline: Six vintage synth circuits in one instrument
description: "Six classic synthesizers in one instrument: a stable-tuned DCO poly, a self-oscillating analog five-voice with poly-mod, an aggressive mono, a patchable semi-modular with spring reverb, a four-operator FM engine with eight algorithms, and a screaming acid bass box with a step sequencer. 54 factory presets. Free VST3, CLAP, LV2, and AU plugin for Linux, Windows, and macOS."
version: "1.0.6"
screenshot: /assets/images/plugins/sunset-circuits-cosmos.png
gallery:
  - src: /assets/images/plugins/sunset-circuits-cosmos.png
    alt: "Sunset Circuits Cosmos panel, a six-voice DCO poly synth with the bucket-brigade chorus section"
    caption: "Cosmos: six-voice DCO poly with the bucket-brigade chorus"
  - src: /assets/images/plugins/sunset-circuits-oracle.png
    alt: "Sunset Circuits Oracle panel, a five-voice analog poly synth with poly-modulation routing"
    caption: "Oracle: five-voice analog poly with poly-modulation routing"
  - src: /assets/images/plugins/sunset-circuits-mono.png
    alt: "Sunset Circuits Mono panel, a two-oscillator lead voice with ring modulation and hard sync"
    caption: "Mono: aggressive two-oscillator lead voice with ring mod and hard sync"
  - src: /assets/images/plugins/sunset-circuits-modular.png
    alt: "Sunset Circuits Modular panel, a semi-modular with three oscillators, ladder filter, sample and hold, and spring tank"
    caption: "Modular: three oscillators, ladder filter, sample and hold, spring tank"
  - src: /assets/images/plugins/sunset-circuits-prism.png
    alt: "Sunset Circuits Prism panel, a four-operator FM engine with eight algorithms and per-operator envelopes"
    caption: "Prism: four-operator FM with eight algorithms and per-operator envelopes"
  - src: /assets/images/plugins/sunset-circuits-acid.png
    alt: "Sunset Circuits Acid panel, a single-oscillator bass box with a sixteen-step pattern sequencer"
    caption: "Acid: single-oscillator bass box with a sixteen-step pattern sequencer"
  - src: /assets/images/plugins/sunset-circuits-browser.png
    alt: "Sunset Circuits preset browser, showing search, mode chips, and bank filters"
    caption: "The preset browser, with search, mode chips, and bank filters"

features:
  - Six synth engines under one roof, switch personality with one click
  - "Cosmos: six-voice DCO poly with a built-in bucket-brigade chorus"
  - "Oracle: five-voice analog poly with a self-oscillating filter and poly-mod"
  - "Mono: aggressive monophonic with ring mod, hard sync, and a sub"
  - "Modular: semi-modular with three oscillators, sample and hold, and a spring reverb"
  - "Prism: four-operator FM with eight algorithms and per-operator envelopes"
  - "Acid: diode-ladder bass box with accent, slide, and a 16-step pitch sequencer"
  - Tempo-synced arpeggiator and step sequencer with host beat-grid phase-lock
  - Eight-slot modulation matrix
  - Built-in drive, chorus, delay, and reverb
  - 1x / 2x / 4x oversampling
  - 54 factory presets plus a user preset library
  - Full automation support

formats:
  - "Linux: VST3, LV2, CLAP"
  - "Windows: VST3, CLAP"
  - "macOS: VST3, AU, LV2, CLAP"

requirements:
  - "Linux x86_64: glibc 2.31 or newer (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "Linux arm64: glibc 2.35 or newer (Ubuntu 22.04+, Debian 12+)"
  - "Linux downloads: x64 is for Intel/AMD PCs; arm64 is for ARM systems"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.15 (Catalina) or later, Intel and Apple Silicon"
  - "64-bit DAW with VST3, CLAP, LV2, or AU support"
  - "Sample rates: 44.1kHz to 192kHz"

changelog:
  - version: "1.0.6"
    date: "2026-08-29"
    changes:
      - "Fixed knob dragging stopping when the plugin window loses keyboard focus mid-drag"
      - "Editor resizes are now negotiated correctly with CLAP hosts that keep the window on a fixed aspect ratio"
  - version: "1.0.5"
    date: "2026-08-28"
    changes:
      - "Fixed VST3 output parameters, including the meters, being reported to the host as parameter edits, which churned the undo history in hosts such as Bitwig until Undo and Redo were no longer offered, and marked the project modified on every save (#233)"
      - "Added an editor drag test that fails the build if a knob stops responding to the mouse"
  - version: "1.0.3"
    date: "2026-08-26"
    changes:
      - "Fixed CLAP output level meters being reported to the host as parameter changes, which made hosts such as Bitwig mark the project modified and constantly override the last-touched parameter"
      - "User presets: storage deduplicated in the shared framework layer"
  - version: "1.0.2"
    date: "2026-08-15"
    changes:
      - Crash logs are now captured; the supporters overlay has an "Open crash log folder" link
      - "Linux downloads: one archive per architecture (x64, arm64), no more duplicate archive pairs"
  - version: "1.0.1"
    date: "2026-07-30"
    changes:
      - "Preset name entry now works in embedded plugin editors on Windows, where some hosts kept keyboard focus and typing never reached the field"
      - "User preset rows sharing a display name no longer share one selection"
      - "Acid envelope caching and Cosmos chorus state fixes"
      - "FM operator and filter model accuracy corrections across the voicings"
      - "In-UI resize grip for hosts that provide no window handle of their own"
      - "On-screen keyboard rendering and note-lifecycle fixes"
      - "Legato toggle restyled to match the Sync controls"
  - version: "1.0.0"
    date: "2026-07-26"
    changes:
      - "Initial release"
      - "Six synth engines: Cosmos, Oracle, Mono, Modular, Prism, and Acid"
      - "Four-operator FM (Prism) with eight routing algorithms and per-operator envelopes"
      - "Acid bass box with a four-lane gate/pitch/accent/slide step sequencer"
      - "Tempo-synced arpeggiator with host beat-grid phase-lock, swing, and accent patterns"
      - "Eight-slot modulation matrix"
      - "Drive, chorus, delay, and reverb, with a spring reverb in Modular mode"
      - "54 factory presets, a user preset library, and a searchable preset browser"
      - "Full MIDI implementation: sustain pedal, program change, poly aftertouch, pitch and mod wheels"
      - "1x / 2x / 4x oversampling"
---

Sunset Circuits is six vintage synthesizers in one instrument, completely free. A row of six mode rockers picks the engine, and each mode is a different classic circuit with its own voice, its own signature controls, and its own panel color.

## Six circuits, one instrument

The layout stays the same in every mode, so you always know where things are. Only the color, the mode sub-panel, and a few mode-specific controls change when you switch circuits.

- **Cosmos** is an early-80s six-voice poly built on digitally controlled oscillators, with rock-steady tuning, a clean filter, and a built-in bucket-brigade chorus for that lush warm pad sound.
- **Oracle** is a late-70s five-voice analog poly with two true oscillators, a self-oscillating filter, and poly-modulation routing for pitched attacks and inharmonic bells.
- **Mono** is an aggressive monophonic voice with two oscillators plus a sub, a fat driven filter, ring modulation, and hard sync, built for basses and leads with weight.
- **Modular** is a 70s semi-modular voice with three oscillators, a transistor-ladder filter, linear FM, a sample and hold, and a real dispersive spring reverb, at its best on drones and sequences.
- **Prism** is a mid-80s four-operator FM engine with eight algorithms, per-operator envelopes, and operator feedback: glassy electric pianos, chiming bells, punchy basses, and metallic brass.
- **Acid** is the bass box: one oscillator through a screaming diode-ladder filter, with accent, slide, and a sixteen-step pitch pattern sequencer.

## FM done right (Prism)

Prism gives you four sine-wave operators, eight classic routing algorithms, a full envelope on every operator, and operator feedback. The mode panel draws the active algorithm live and highlights the carriers, so the wiring is never a mystery. Build tine electric pianos, inharmonic bells, growling basses, and formant leads from scratch.

## Acid with a real sequencer

Acid mode expands the sequencer into four lanes: gate, pitch, accent, and slide. Hold one note and the sixteen-step pattern transposes with it. The diode-ladder filter screams near self-oscillation, and the accent circuit makes accented steps jump. It is a complete acid bassline machine.

## Modulation and effects

An eight-slot modulation matrix routes LFOs, envelopes, velocity, aftertouch, key tracking, sample and hold, and more into pitch, filter, amplitude, pan, and effects. The built-in effects chain gives you drive, chorus, a tempo-syncable delay, and a reverb that becomes a spring reverb in Modular mode.

## Presets

Sunset Circuits ships with 54 factory presets across all six modes, from warm poly pads and FM electric pianos to acid basslines and evolving modular drones. Save your own patches to a personal user preset library that follows you between projects and hosts.

## Open Source

Sunset Circuits is open source under the GPL. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).

---

*Sunset Circuits emulates the character of several classic vintage synthesizers. This project is not affiliated with or endorsed by any hardware manufacturer.*
