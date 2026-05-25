---
paths:
  - "package.json"
  - "biome.json"
  - "vitest.config.ts"
  - "stylelint.config.js"
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - "src/**/*.js"
  - "src/**/*.jsx"
description: "Repo-specific frontend tooling contract for Central Command Frontend."
---
# Frontend Tooling Contract

Treat repository files as the source of truth for tooling, not stale docs or old assumptions.

## This Repo Uses

- `npm` for package management and scripts
- `Next.js` App Router with `React` and `TypeScript`
- `Biome` for JS/TS formatting and primary linting
- `Stylelint` for CSS and CSS modules
- `Vitest` with `jsdom` for tests
- `MSW` for API mocking in tests and local flows

## Do Not Assume

- `pdm`, `pytest`, or Python workflows for frontend work
- `Jest`, `ESLint`, or `Prettier` as the primary JS toolchain
- `Playwright` exists unless added explicitly for a task

## Verification Defaults

- use `npm run lint` for JS/TS plus CSS lint evidence
- use `npm run test:run` or `npx vitest` for test evidence
- use `npm run build` for integration-level proof when route or app wiring changes

## Implementation Notes

- prefer edits that preserve Biome import ordering and formatting
- treat CSS modules and `stylelint.config.js` as authoritative for styling changes
- prefer existing patterns in `src/app`, `src/domains`, `src/components`, and `src/core`
