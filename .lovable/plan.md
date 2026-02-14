

# MBHB Algorithm Academy — Implementation Plan

## Overview
A premium dark-themed educational dashboard for visualizing and understanding metaheuristic optimization algorithms (SA, Multi-start, Bio-inspired). Features live algorithm visualization, interactive controls, browser-based video recording, and preloaded QAP benchmark instances.

---

## Phase 1: Layout & Design System

### Dark "Premium Industrial" Theme
- Slate gray backgrounds (`slate-900`, `slate-800`, `slate-950`)
- Neon cyan accent for trajectories/primary actions
- Neon orange accent for temperature/warnings
- Monospace fonts for formula overlays and data displays

### Application Layout (4-panel)
1. **Left Sidebar** — Collapsible navigation with 3 expandable module sections:
   - *Module 1: Trajectories* — Simulated Annealing, Tabu Search, GRASP
   - *Module 2: Multi-start* — ILS, VNS, Multi-start variants
   - *Module 3: Bio-inspired* — Genetic Algorithms, CHC, Ant Colony
   - Each sub-item navigates to its dedicated visualizer page

2. **Center Main Stage** — Large canvas/visualization area for the active algorithm

3. **Right Properties Panel** — Collapsible panel with:
   - QAP instance selector (dropdown with preloaded benchmarks like Nug12, Tai20a)
   - JSON code editor for pasting custom Distance/Flow matrices
   - File upload for `.json`/`.dat` QAP files
   - Algorithm parameter controls (sliders/inputs for Temperature, Tabu Tenure, Population Size, etc.)

4. **Bottom Control Panel** — Video-editor-style transport bar:
   - Play, Pause, Step Forward, Reset buttons
   - Timeline slider showing iteration progress
   - Speed control (0.5x, 1x, 2x, 5x)

---

## Phase 2: Simulated Annealing Visualizer (Full Implementation)

### The Grid (Permutation Display)
- Row of animated blocks representing the current permutation
- When a swap occurs, the two blocks smoothly animate to their new positions using framer-motion
- Color-code blocks to show which were recently swapped

### The Thermometer
- Vertical gauge on the side showing current temperature
- Color gradient from red (hot/random) → blue (cold/greedy)
- Decreases following the Cauchy Schedule: T_k = T₀ / (1 + k)
- Option to switch to Geometric Schedule: T_k = T₀ × α^k

### The Acceptance Graph (Live Chart)
- Live line chart (using Recharts) plotting solution cost over iterations
- Green dot markers on points where a worse solution was accepted (Metropolis Criterion)
- Visual proof of escaping local optima

### Formula Overlay
- Real-time display of active values: T, Δ (cost difference), P (acceptance probability)
- Semi-transparent overlay on the canvas area
- Updates every iteration

### Algorithm Logic (TypeScript)
- Accurate implementation matching course material
- `calculateInitialTemperature(cost, μ, φ)` using T₀ = (μ / -ln(φ)) × Cost
- `cauchySchedule` and `geometricSchedule` cooling functions
- `metropolisCriterion` with proper probability calculation
- Configurable parameters: μ, φ, final temperature, max neighbors (L), max successes

---

## Phase 3: Module Placeholders (Navigation Ready)

### Module 1: Trajectories
- Simulated Annealing (fully implemented)
- Tabu Search — placeholder page with parameter panel (Tabu Tenure, Aspiration)
- GRASP — placeholder page with parameter panel (α, iterations)

### Module 2: Multi-start
- ILS, VNS, Multi-start — placeholder pages with descriptions and parameter panels

### Module 3: Bio-inspired
- Genetic Algorithm, CHC, Ant Colony — placeholder pages with descriptions and parameter panels

Each placeholder will have the same layout structure (main stage + properties panel) ready for future algorithm implementation.

---

## Phase 4: QAP Data Management

### Preloaded Benchmarks
- Classic QAPLIB instances (e.g., Nug12, Tai20a, Chr12a) bundled as JSON
- Dropdown selector in the Properties Panel

### Custom Input
- JSON text editor (with syntax highlighting) for pasting custom matrices
- File upload supporting `.json` and `.dat` formats
- Validation and error messages for malformed input

---

## Phase 5: Browser-Based Video Recording

### Recording Controls
- "Record" button in the control panel that captures the visualization canvas
- Uses browser MediaRecorder API to capture the main stage
- Caption track input — text field to type captions synced to iteration ranges
- Pre-loaded SA caption script explaining the "Metallurgy Analogy" (atoms cooling → crystal structure)

### Export
- Download as WebM video file directly from the browser
- Captions baked into the recording as an overlay

