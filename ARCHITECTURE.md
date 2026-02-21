# Digital Alchemy Studio — Architecture & Roadmap

## Overview

The Digital Alchemy Studio is a consciousness-engineering platform that generates visual media designed to alter mental states through the combined application of sacred geometry, brainwave entrainment, subliminal encoding, archetypal symbolism, and chromotherapy.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                         │
│  "I want a 10-minute kundalini activation video"         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              INTENTION PARSER (LLM Agent)                 │
│                                                           │
│  • Interprets free-text intention                         │
│  • Maps to knowledge base categories                      │
│  • Generates Composition Recipe JSON                      │
│  • Can blend multiple intentions (e.g., "heal + ground")  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│            COMPOSITION ENGINE (Core Library)              │
│                                                           │
│  Recipe → Layer Stack:                                    │
│  ┌─────────────────────────────────────────────┐         │
│  │ L0: Background Field (gradients, nebulae)   │         │
│  │ L1: Sacred Geometry (yantra, mandala, grid)  │         │
│  │ L2: Ghost/Echo Geometry (lower opacity)      │         │
│  │ L3: Particle System (prana, energy)          │         │
│  │ L4: Subliminal Text (affirmations)           │         │
│  │ L5: Subliminal Symbols (archetypal)          │         │
│  │ L6: Entrainment Modulation (flicker)         │         │
│  │ L7: Vignette / Focus Guide                   │         │
│  └─────────────────────────────────────────────┘         │
└──────────────────────┬──────────────────────────────────┘
                       │
              ┌────────┼────────┐
              ▼        ▼        ▼
        ┌──────┐ ┌──────┐ ┌──────┐
        │React │ │Remotn│ │ SVG  │
        │Live  │ │Video │ │Print │
        └──────┘ └──────┘ └──────┘
```

## Directory Structure

```
digital-alchemy-studio/
├── knowledge-base/
│   └── consciousness-engineering.md    # Master reference (delivered)
│
├── skills/
│   └── SKILL.md                        # Claude Code agent skill (delivered)
│
├── web-app/                            # Remotion + Next.js app (to build)
│   ├── package.json
│   ├── remotion.config.ts
│   ├── src/
│   │   ├── compositions/
│   │   │   ├── AlchemyComposition.tsx  # Main Remotion composition
│   │   │   ├── layers/
│   │   │   │   ├── BackgroundField.tsx
│   │   │   │   ├── SacredGeometry.tsx
│   │   │   │   ├── ParticleSystem.tsx
│   │   │   │   ├── SubliminalText.tsx
│   │   │   │   ├── SubliminalSymbols.tsx
│   │   │   │   ├── EntrainmentLayer.tsx
│   │   │   │   └── Vignette.tsx
│   │   │   └── geometries/
│   │   │       ├── FlowerOfLife.tsx
│   │   │       ├── SriYantra.tsx
│   │   │       ├── MetatronsCube.tsx
│   │   │       ├── VesicaPiscis.tsx
│   │   │       └── ...
│   │   ├── lib/
│   │   │   ├── recipe-schema.ts        # TypeScript types for recipes
│   │   │   ├── entrainment.ts          # Frequency modulation math
│   │   │   ├── subliminal-scheduler.ts # Timing engine for subliminals
│   │   │   ├── geometry-math.ts        # Sacred geometry calculations
│   │   │   └── color-chakra.ts         # Chromotherapy mappings
│   │   ├── templates/
│   │   │   └── intention-recipes/      # Pre-built recipe JSONs per intention
│   │   │       ├── healing.json
│   │   │       ├── abundance.json
│   │   │       └── ...
│   │   └── Root.tsx
│   └── public/
│       └── fonts/
│
├── agents/                             # Claude Code agent configs (to build)
│   ├── intention-parser.md             # Prompt for parsing user intentions
│   ├── recipe-generator.md             # Prompt for generating composition recipes
│   ├── affirmation-writer.md           # Prompt for generating subliminal sets
│   └── scene-choreographer.md          # Prompt for temporal arc design
│
└── README.md
```

## Current Deliverables

### 1. Interactive Prototype (`digital-alchemy-studio.jsx`)
A fully functional React component featuring:
- **8 intention presets**: Healing, Abundance, Awakening, Love, Focus, Creativity, Kundalini, Grounding
- **8 sacred geometry renderers**: Flower of Life, Sri Yantra, Metatron's Cube, Vesica Piscis, Crystal Grid, Fractal Bloom, Chakra Column, Hexagonal Grid
- **Real-time particle system** with behavior modes: orbital, expansion, ascending, enfolding, converging, branching, ascending spiral, settling
- **Brainwave entrainment** via luminosity modulation (adjustable depth)
- **Subliminal text & symbol encoding** at sub-perceptual opacity
- **Breath guide** synchronized to coherent breathing patterns
- **Per-intention color palettes** aligned to chakra/chromotherapy principles

### 2. Knowledge Base (`consciousness-engineering.md`)
Comprehensive reference covering:
- Brainwave frequency bands and visual entrainment techniques
- Sacred geometry construction algorithms
- Chakra-color-frequency mappings
- Subliminal encoding methods
- Intention-to-composition mappings for 8 states
- Temporal arc structures for meditation sessions
- Animation and motion principles
- Production quality guidelines

### 3. Agent Skill (`SKILL.md`)
Claude Code skill definition for generating compositions on demand.

## Roadmap: Building the Full Pipeline

### Phase 1: Remotion Video Pipeline
```bash
npx create-video@latest digital-alchemy-video
cd digital-alchemy-video
npm install
```

Port the canvas rendering logic to Remotion compositions:
- Each layer becomes a `<Sequence>` or `<AbsoluteFill>` component
- Use `useCurrentFrame()` and `useVideoConfig()` for precise timing
- Subliminal frames can be placed at exact frame numbers
- Render to MP4 at 60fps for precise entrainment timing

### Phase 2: LLM Agent Pipeline
Create Claude Code agents that:
1. **Parse intention**: "I want to heal my inner child and find peace" → structured intention object
2. **Generate recipe**: Intention → full composition recipe JSON with all layer configs
3. **Write affirmations**: Generate 20-50 custom subliminal messages for the specific intention
4. **Choreograph**: Design the temporal arc, transitions, and climactic moments
5. **Render**: Feed recipe into Remotion and render video

### Phase 3: Interactive Web App
- Next.js frontend with intention input (text box + presets)
- Real-time preview (the React component already built)
- "Render Video" button that triggers Remotion serverless rendering
- Download MP4 / stream to viewer
- Save/share compositions

### Phase 4: Advanced Features
- **Audio synthesis**: Binaural beats, solfeggio tones, ambient soundscapes
- **Personalization**: User provides their name, specific fears/goals → embedded in subliminals
- **Multi-scene narratives**: LLM generates a story arc with multiple scenes/transitions
- **AI image generation**: Generate archetypal imagery via image models
- **Morphic field encoding**: Dense information layers (symbols, geometries, affirmations) at multiple scales
- **Interactive mode**: WebGL shader-based rendering for real-time 4K with gaze tracking

## How to Use with Claude Code

```
You: "Create a 15-minute abundance meditation video with gold sacred geometry, 
      subliminal affirmations about financial freedom, and theta brainwave 
      entrainment that gradually shifts to alpha"

Claude: [reads SKILL.md] → [reads knowledge base] → [generates recipe JSON] 
        → [creates Remotion composition] → [renders to MP4]
```

## Technical Notes

### Entrainment Safety
- Never sustain 8-25Hz flicker without gradual ramp
- Maximum contrast modulation: 15% (adjustable)
- Always include 30-second ramp transitions between frequency bands
- Include photosensitivity warning in all outputs

### Subliminal Effectiveness
Research suggests subliminal priming works best when:
- Messages are short (3-7 words)
- Exposure is repeated (hundreds of presentations per session)
- Content is emotionally resonant
- Viewer is in receptive state (alpha/theta)
- Messages are positive and present-tense

### Sacred Geometry Precision
All geometry renderers use mathematical construction:
- Flower of Life: Overlapping circles with radius = distance between centers
- Sri Yantra: 9 interlocking triangles with precise intersection coordinates
- Metatron's Cube: 13 circles with complete graph of center connections
- Golden Ratio: φ = (1 + √5) / 2 ≈ 1.618033988749895
