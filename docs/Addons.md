# TransformerHub Addons

## Purpose

Addons extend TransformerHub with new nodes, integrations, or utility features without modifying core packages directly.

Current repository includes a dedicated addon area at `th-addons/`.

## Addon Types

- Node packs: new data source, action, or sink node implementations.
- Integration packs: connectors for third-party APIs/services.
- Utility packs: validation, parsing, or reusable runtime helpers.

## Recommended Addon Structure

```text
th-addons/
  my-addon/
    package.json
    src/
      index.ts
      nodes/
      utils/
    README.md
```

## Naming Conventions

- Package: `@transformerhub/addon-<name>` or `th-addon-<name>`.
- Node ids: use a stable namespace prefix, for example `<addon>:<nodeType>`.
- Keep display labels user-friendly and concise.

## Integration Rules

1. Depend on shared contracts from `th-shared`.
2. Avoid importing internals from `th-web` or `th-backend`.
3. Register addon nodes through explicit registry hooks.
4. Validate node configuration schema at runtime boundaries.

## Compatibility Contract

- Addons must define:
  - Supported runtime versions.
  - Required environment variables.
  - Node input and output contracts.
  - Error behavior and retry expectations.

## Security Guidance

- Never hardcode tokens or secrets.
- Keep credential reads in env-based configuration only.
- Sanitize outbound payloads for external services.
- Limit filesystem and network scope to explicit configuration.

## Testing Checklist

- Unit tests for node behavior and validation.
- Integration tests for external service adapters (with mocks).
- Backward compatibility checks for node config schema.
- Manual run verification in representative sample flows.

## Publish and Adoption Workflow

1. Implement addon package with clear README and examples.
2. Build and test in workspace.
3. Register addon in runtime/node registry wiring.
4. Add migration notes if existing flows are affected.
5. Document usage in user-facing docs.

## Minimal Addon Definition Example

```ts
export interface AddonNodeDefinition {
  id: string;
  label: string;
  category: "dataSource" | "action" | "sink";
  execute: (input: unknown, config: Record<string, unknown>) => Promise<unknown>;
}
```

Treat this interface as illustrative. Use actual runtime interfaces from `th-shared` as source of truth.
