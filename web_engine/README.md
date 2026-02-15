# Universitas: The Atomic Generator Engine
**Version:** 10.0 (Atomic Tetrahedron)
**Tech Stack:** Next.js 14, React, Three.js, React Force Graph, Tailwind CSS.

## 1. Project Overview
This is the visualization engine for the **Universitas Knowledge Graph**. Unlike traditional academic portals, this application proceduraly generates the interface based on the "Atomic Weights" of each subject.

### The Core: Atomic Tetrahedron
The UI renders a 4-node tetrahedron representing the fundamental forces of knowledge:
- **LINGUISTICS** (White)
- **ALGEBRA** (White)
- **LOGIC** (White)
- **AISTHESIS** (Magenta)

## 2. Installation
The project layout was generated manually to comply with security policies.

```bash
# 1. Install dependencies
npm install

# 2. Run Development Server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the engine.

## 3. Architecture
- **`/app`**: Next.js App Router.
- **`/components/GraphContainer.tsx`**: The heart of the engine. Contains the `react-force-graph-3d` implementation, custom shaders for Atomic Nodes, and the camera control logic.
- **`/public/universitas_graph_data.json`**: The graph dataset (Level -2 to Level 2 nodes).

## 4. Key Features
- **Ouroboros Bootstrap**: Visualizes the circular dependency between Logic, Algebra, and Linguistics.
- **Legendary Node (MBHB)**: Special rendering logic for the "Master Body" node in the Aisthesis branch.
- **Void Theme**: Custom Tailwind configuration for high-contrast, deep-space aesthetics.

## 5. Deployment
Build for production:
```bash
npm run build
npm start
```
