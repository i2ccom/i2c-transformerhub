# TransformerHub

TransformerHub is a TypeScript monorepo for building and running visual, node-based data transformation flows.

It is organized as a pnpm workspace with a backend API, a web editor, and a shared runtime package.

TransformerHub is designed as an AI-first platform and is HyperGraph-native and HyperAI-native by architecture.
In the broader ecosystem, it plays the middleware and integration-layer role beside Kitchen and Quang.

## Ecosystem Positioning

- AI-first orchestration: flows are designed to include AI reasoning, transformation, and automation as a core capability.
- HyperGraph-native integration: flow contracts and runtime boundaries are aligned for interoperability with HyperGraph-driven systems.
- HyperAI-native execution: node-level actions are designed to support AI-centric workloads across text, image, audio, and video pipelines.
- Middleware role: TransformerHub mediates data movement, transformation, and control-plane handoff between ecosystem services.
- Beside Kitchen and Quang: TransformerHub focuses on integration and runtime orchestration while adjacent platforms handle their domain responsibilities.

## Declarative Node UI

TransformerHub supports dynamic node configuration UI generated from declarative metadata.

- Node type payloads can expose JSON Schema for node properties.
- The web Property Editor renders form controls from schema definitions.
- Legacy property definitions are still supported as a compatibility fallback.

## Packages

- `th-backend`: Express API service for flows and node metadata.
- `th-web`: React + Vite frontend for visual flow editing.
- `th-shared`: Shared flow runtime, node registry, and simulation utilities.

## Monorepo Layout

```text
TransformerHub/
├─ package.json
├─ pnpm-workspace.yaml
├─ docs/
│  ├─ PLAN.md
│  ├─ TODO.md
│  ├─ HOWTO.md
│  ├─ AI_GUIDELINE.md
│  └─ progress/
│     └─ v0.1.md
├─ th-backend/
├─ th-web/
└─ th-shared/
```

## Prerequisites

- Node.js 20+
- pnpm 10+

## Quick Start

1) Install all workspace dependencies from repo root:

```bash
pnpm install
```

2) Run backend and frontend in parallel:

```bash
pnpm dev
```

3) Build all packages:

```bash
pnpm build
```

## Useful Commands

- Start all package dev servers: `pnpm dev`
- Build all packages: `pnpm build`
- Run all tests: `pnpm test`
- Run a single package script:

```bash
pnpm --filter th-web dev
pnpm --filter th-backend dev
pnpm --filter th-shared build
```

## Environment Notes

- `th-backend/.env` controls API port, storage mode, and database connection.
- `th-web/.env` controls frontend runtime env values such as API base URL.

## Documentation Index

- Plan: `docs/PLAN.md`
- Task backlog: `docs/TODO.md`
- Developer guide: `docs/HOWTO.md`
- AI contribution rules: `docs/AI_GUIDELINE.md`
- Architecture: `docs/design/Architecture.md`
- Node registry: `docs/design/nodes-registry.md`
- Progress journal: `docs/progress/v0.1.md`

## Current Status

The repository now uses a root pnpm workspace with standardized root scripts for day-to-day development.

## Contributing

1) Create a branch from main.
2) Make focused changes in one package at a time.
3) Update relevant docs in `docs/`.
4) Run build and tests before opening a PR.

