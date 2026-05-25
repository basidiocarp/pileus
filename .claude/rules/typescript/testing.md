---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
description: "TypeScript/JavaScript testing guidance for this frontend repo."
---
# TypeScript/JavaScript Testing

> This file extends [common/testing.md](../common/testing.md) with TypeScript/JavaScript specific content.

## Default Stack

- use `Vitest` as the default test runner
- use `@testing-library/react` and `@testing-library/user-event` for component behavior
- use `jsdom` for browser-like unit and component tests
- use `MSW` when API behavior needs to be controlled in tests

## Test Selection

- prefer unit or component tests first for UI, hooks, utils, schemas, and stores
- add integration-style tests when route/provider wiring or async state coordination matters
- use full browser E2E only when lower-cost tests cannot prove the behavior

## Verification

- default command: `npm run test:run`
- coverage command: `npm run test:coverage`
- when styling or route wiring changes, pair test evidence with `npm run lint` or `npm run build`

## E2E Testing

Use Playwright only if it is added to the repo for critical user flows.

## Agent Support

- **e2e-runner** - Playwright E2E testing specialist
