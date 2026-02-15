# Web Interface Specification v1.0 — "The UI Rulebook"
> **Status**: FROZEN · **Date**: 2026-02-15

## Core Principle
**The Website IS the Map.** Navigation is exploration of the Rhizome.

## Page Architecture

### `/` — Landing (The Universe)
- 8-track grid cards (the degree curriculum)
- Active tracks link to their course hubs; inactive show "Próximamente"
- Header: "Ingeniería Visual" branding

### `/mbhb` — The Rhizome View (Index)
- Interactive force-directed graph of the Universitas Rhizome
- CS (Zone 7) pulses at center as Axis Mundi
- Bridges glow as trans-disciplinary intersections
- Bottom overlay: quick-access to current module

### `/mbhb/*` — Algorithm Pages
- Each algorithm uses AppLayout (sidebar + main stage)
- Sidebar: context-aware (MBHB sub-navigation when inside `/mbhb`)

### `/track/:track/:subject` — Future Subject Pages
- Placeholder with 4 Marzano tabs (Ignition, Wiki, Workshop, Arena)
- Shows zone/track metadata

## Sidebar Logic
- **Root level** (`/`): 8 tracks listed
- **Inside `/mbhb`**: MBHB-specific modules (Greedy, SA, Tabu, etc.)
- **Inside `/track/*`**: Track-specific subjects

## Pedagogical Engine (Marzano)
Every subject node offers 4 modes:
1. 🔥 **Ignition** — The "Why" (Self-System motivation)
2. 📚 **Wiki** — The "What" (Declarative reference)
3. 🛠️ **Workshop** — The "How" (Procedural guided build)
4. 🏆 **Arena** — The "Can I?" (Utilization/mastery challenge)

## Validation Protocol (Triadic)
1. **Hard Proof** — Functional artifact (code/repo)
2. **Soft Proof** — Metacognitive reflection (learning diary)
3. **Social Proof** — Peer/authority validation (code imported by others)

## Design Tokens
- Theme: Dark industrial (`--background: 222 47% 6%`)
- Primary: Neon cyan (`--primary: 187 100% 50%`)
- Accent: Neon orange (`--accent: 25 100% 55%`)
- Fonts: Inter (body) + JetBrains Mono (code)

## Data Source
- Graph nodes/links: `src/data/universitasGraph.ts`
- Taxonomy reference: `official_universitas_taxonomy.md`
