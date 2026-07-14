# TransformerHub Architecture

## Goal

Keep execution behavior consistent across frontend and backend by centralizing runtime logic in `th-shared` and exposing clear boundaries between UI, API, and runtime.

Architecturally, TransformerHub is AI-first and designed to be HyperGraph-native and HyperAI-native while serving as the middleware and integration layer beside Kitchen and Quang in the ecosystem.

## Ecosystem Context

- TransformerHub: integration and orchestration middleware.
- HyperGraph: graph-native context and relationship substrate for connected systems.
- HyperAI: AI-native capabilities consumed by flow nodes and runtime actions.
- Kitchen and Quang: adjacent ecosystem platforms with complementary responsibilities.

TransformerHub's responsibility is to connect, transform, and route data and control signals across these systems with explicit contracts and observable runtime behavior.

## High-Level Components

- `th-web`: Visual editor and user interaction layer.
- `th-backend`: API, persistence orchestration, execution endpoints.
- `th-shared`: Flow runtime, node definitions, validation, and simulation helpers.

## Layer Responsibilities

### Web (`th-web`)

- Render flow graph and node editors.
- Collect user flow definitions and send them to backend.
- Display execution state, errors, and results.

### Backend (`th-backend`)

- Validate request payloads and manage flow lifecycle.
- Persist flow definitions and metadata.
- Execute or delegate execution using shared runtime contracts.

### Shared (`th-shared`)

- Define core node interfaces and base classes.
- Implement transformation logic and utilities.
- Provide deterministic runtime behavior across environments.

## Data and Control Flow

1. User edits a flow in `th-web`.
2. UI serializes flow graph and posts to `th-backend`.
3. Backend validates schema and stores flow definition.
4. On execute, backend invokes runtime logic from `th-shared`.
5. Runtime processes graph in topological order with node-level handlers.
6. Backend returns execution status and output summary.
7. UI renders run result and diagnostics.

## Declarative Schema-Driven Node Contracts

Node configuration is intended to be declarative and schema-first.

- Backend node-type endpoints expose property metadata and JSON Schema.
- Web editor property panels are generated from schema rather than hardcoded per node.
- Runtime behavior remains in `th-shared`, while schema drives configuration UX.
- Backward compatibility is maintained by falling back to legacy property definitions.

## Key Design Decisions

- Runtime-first model: behavior belongs in shared package, not duplicated.
- Contract-driven routes: backend routes map tightly to flow/runtime contracts.
- Thin UI adapter: web package focuses on editing and visualization.
- Explicit package boundaries: each package can evolve with clear ownership.
- AI-first node model: AI-capable nodes are first-class runtime primitives, not bolt-on extensions.
- HyperGraph/HyperAI-native compatibility: interfaces are designed for ecosystem-level interoperability.
- Middleware-first composition: flow design prioritizes bridging, mediation, and protocol adaptation between services.

## Package Dependency Direction

- `th-web` -> `th-shared`
- `th-backend` -> `th-shared`
- `th-web` and `th-backend` do not depend on each other directly.

## Execution Model Notes

- Node execution should be side-effect aware.
- Validation should happen before expensive action nodes.
- Long-running nodes should expose progress or checkpoint-friendly state.

## Non-Functional Requirements

- Reliability: deterministic flow execution for identical inputs.
- Observability: actionable error messages and run context.
- Maintainability: small, composable nodes and clear interfaces.
- Performance: avoid unnecessary data copies between nodes.
- Interoperability: stable integration contracts for HyperGraph, HyperAI, and adjacent ecosystem services.

## Future Architecture Work

- Introduce formal flow schema version negotiation.
- Add distributed execution strategy for heavy pipelines.
- Add plugin lifecycle hooks for external addon packages.
