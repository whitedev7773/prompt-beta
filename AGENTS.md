# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit 2.0 application for lyric timing and timestamp synchronization. The app allows users to input lyrics, navigate through them with keyboard controls, and capture precise timecodes synchronized to a stopwatch that runs at configurable frame rates (24/30/60 fps).

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check without building
npm run check

# Type-check in watch mode
npm run check:watch

# Lint code (ESLint + Prettier)
npm run lint

# Format code
npm run format
```

## Architecture

### State Management (src/lib/store.ts)

Central Svelte stores manage application state:

- `timestamps`: Writable store containing array of `{type, time}` objects for lyric timecodes
- `startTime`: Array tracking [hours, minutes, seconds, frames]
- `firstPressTime`: Timestamp when stopwatch was initialized
- `calculateDeltaTime`: Computed function converting elapsed time to timecode format
- Utility stores for clipboard operations and confirmations

### Component Structure

**Main Page (src/routes/+page.svelte)**

- Root component orchestrating the entire application
- Manages lyric input parsing (double newline-separated sections, newline-separated lines)
- Keyboard event handling:
  - `Enter`: Start/stop stopwatch
  - `R`: Reset stopwatch
  - `ArrowRight`: Next lyric + add timestamp
  - `ArrowLeft`: Previous lyric + add timestamp
- State tracking for current lyric position (`focusing_index`)
- Lyric state calculation: 'exit' | 'focus' | 'preview' | 'queue'

**Lyric Display (src/components/Lyric.svelte)**

- Renders individual lyric sections (3 lines: Japanese + 2 Korean translation lines)
- CSS-based state transitions with transforms and opacity
- States control position and visibility on screen

**Stopwatch (src/components/stopwatch.svelte)**

- Custom Stopwatch class with frame-accurate timing
- Exported methods: `Start()`, `Stop()`, `Reset()`, `GetTime()`, `isRun()`, `Relaunch(fps)`
- Returns timecode in format `HH:MM:SS:FF` where FF is frames
- Updates at rate determined by FPS setting (ticks every `1000/fps` ms)

**Timestamp Management**

- `timestamp.svelte`: Displays list of captured timestamps
- `timestamp-item.svelte`: Individual timestamp display item
- `control.svelte`: Clear and copy-to-clipboard buttons

### Styling

- Global styles in `src/lib/app.css` define CSS variables for fonts and animations
- Uses Noto Sans JP/SC for Japanese text
- Uses NanumSquare Neo for Korean text
- CSS custom properties:
  - `--duration`, `--velocity`: Animation timing
  - `--jp-font-*`, `--kr-font-*`: Font configurations

### Key Application Flow

1. User inputs lyrics in textarea (format: sections separated by `\n\n`, lines by `\n`)
2. User starts stopwatch with `Enter` key
3. As lyrics progress, user presses `ArrowRight`/`ArrowLeft` to navigate
4. Each navigation captures current timecode to timestamps array
5. User can copy all timestamps to clipboard in CSV format: `type,HH:MM:SS:FF`
6. Timestamps can be reset with confirmation

### TypeScript Configuration

- Strict mode enabled
- Path aliases: `$lib` maps to `src/lib`
- Bundler module resolution for SvelteKit compatibility

### Build Configuration

- Vite + SvelteKit plugin
- adapter-auto for automatic deployment adapter selection
- ESLint configured for TypeScript and Svelte files with Prettier integration
