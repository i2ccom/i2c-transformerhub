# TransformerHub AI Guideline

## Purpose

Define safe, consistent rules for AI-assisted changes in this repository.

## Scope

Applies to all AI-generated changes across:

- `th-backend`
- `th-web`
- `th-shared`
- `docs`

## Core Rules

1. Preserve package boundaries and avoid leaking runtime logic into UI/API layers.
2. Do not change public interfaces without documenting impact.
3. Keep edits minimal, targeted, and easy to review.
4. Update tests and docs with every behavior change.
5. Do not introduce secrets, credentials, or private tokens in code or docs.

## Required Workflow

1. Read related files before editing.
2. Implement smallest viable change.
3. Run relevant package scripts (`build`, `test`, or `dev` check).
4. Add or update documentation in `docs/` when behavior changes.
5. Record milestone updates in `docs/progress/`.

## Code Style Expectations

- Use TypeScript-first patterns where applicable.
- Prefer clear naming and small composable functions.
- Avoid dead code and commented-out blocks.
- Keep comments concise and only where logic is non-obvious.

## Review Checklist

- Is the change scoped to the right package?
- Are runtime contracts preserved or explicitly versioned?
- Are tests updated or justified if missing?
- Are docs and progress files updated?
- Are failure paths handled with meaningful errors?

## Forbidden AI Behaviors

- Fabricating test results or command outputs.
- Rewriting unrelated files for stylistic reasons.
- Adding dependencies without clear justification.
- Making silent breaking changes.
