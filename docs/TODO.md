# TransformerHub TODO

## Immediate

- [ ] Run `pnpm install` from repository root and commit lockfile updates.
- [ ] Validate root scripts (`dev`, `build`, `test`) across all current packages.
- [ ] Add root `.editorconfig` and shared lint/format policy.

## Backend (`th-backend`)

- [ ] Add route-level tests for flows and node types.
- [ ] Add request schema validation middleware.
- [ ] Add structured error response format with trace ids.
- [ ] Add endpoint for runtime capability metadata.

## Shared Runtime (`th-shared`)

- [ ] Formalize node input/output contracts in TypeScript types.
- [ ] Add simulation test fixtures per node family.
- [ ] Add compatibility checks for flow schema version mismatches.
- [ ] Publish runtime API usage examples.

## Web Editor (`th-web`)

- [ ] Add integration tests for create/save/execute flow paths.
- [ ] Improve node configuration form defaults and validation.
- [ ] Add execution timeline panel for run diagnostics.
- [ ] Audit bundle size and split heavy node editor paths.

## Developer Experience

- [ ] Add workspace CI pipeline for build, test, and typecheck.
- [ ] Add pre-commit hooks for linting and tests.
- [ ] Add contributor template for PR checks.

## Documentation

- [ ] Keep `docs/progress/` updated on each milestone.
- [ ] Add API quick reference for backend routes.
- [ ] Add flow schema reference with examples.
