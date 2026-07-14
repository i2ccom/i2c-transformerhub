# TransformerHub HOWTO

## 1) First-Time Setup

1. Install Node.js 20+.
2. Install pnpm 10+ globally.
3. From repository root, run:

   `pnpm install`

## 2) Run the System Locally

- Start all development services:

  `pnpm dev`

- Run only backend:

  `pnpm --filter th-backend dev`

- Run only web app:

  `pnpm --filter th-web dev`

## 3) Build and Test

- Build all packages:

  `pnpm build`

- Run all tests:

  `pnpm test`

- Run tests for one package:

  `pnpm --filter th-shared test`

## 4) Work on Shared Runtime Changes

1. Make updates in `th-shared/src`.
2. Build shared package:

   `pnpm --filter th-shared build`

3. Validate backend and web still run with updated runtime:

   `pnpm --filter th-backend dev`

   `pnpm --filter th-web dev`

## 5) Add a New Package to the Workspace

1. Create package folder at root (for example `th-new-module`).
2. Add a valid `package.json` with unique package name.
3. Re-run install from root:

   `pnpm install`

4. Verify it appears in recursive commands:

   `pnpm -r list --depth -1`

## 6) Troubleshooting

- If a filtered command does not run, verify package name in that package's `package.json`.
- If module resolution fails, run `pnpm install` again at root.
- If runtime changes are not visible, rebuild `th-shared` and restart running dev processes.
