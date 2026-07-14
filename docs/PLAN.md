# TransformerHub Plan

## Vision

Provide a reliable platform for designing, validating, simulating, and executing node-based transformation flows across backend and web interfaces using one shared runtime.

## Phase 1: Monorepo Foundation (Completed)

- Establish pnpm workspace at repository root.
- Standardize root scripts for dev, build, and test workflows.
- Create baseline documentation pack in `docs/`.

## Phase 2: Runtime and Contract Stability

- Define stable flow schema and versioning strategy in `th-shared`.
- Add validation gates for flow import/export compatibility.
- Add deterministic simulation fixtures for core node categories.

## Phase 3: Backend Reliability

- Strengthen flow CRUD, execution lifecycle, and error handling.
- Add API contract tests for routes in `th-backend/src/routes`.
- Add health and readiness endpoints with dependency checks.

## Phase 4: Frontend Editor UX

- Improve flow canvas performance and node rendering behavior.
- Add stronger form validation and inline node config hints.
- Add better execution trace visibility for debugging.

## Phase 5: CI/CD and Release Hygiene

- Add monorepo CI for build, test, and type checks.
- Define release/version workflow for workspace packages.
- Maintain changelog discipline and progress files in `docs/progress/`.

## Architecture Direction

- Keep execution logic in `th-shared` as the source of truth.
- Keep `th-backend` thin, focused on orchestration and persistence.
- Keep `th-web` focused on interaction, editor UX, and visualization.

## Definition of Done (Per Feature)

- Code passes package-level tests and workspace build.
- Documentation and examples updated.
- Backward compatibility impact assessed.
- Manual verification completed for impacted UI/API paths.
