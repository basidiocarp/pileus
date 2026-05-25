---
paths:
  - "src/app/**/*.ts"
  - "src/app/**/*.tsx"
  - "src/components/**/*.ts"
  - "src/components/**/*.tsx"
  - "src/domains/**/*.ts"
  - "src/domains/**/*.tsx"
  - "src/core/**/*.ts"
  - "src/core/**/*.tsx"
description: "Frontend architecture guidance for the Central Command Next.js app."
---
# Frontend Architecture

Follow the existing repo structure before inventing new folders or abstractions.

## Structure

- `src/app` owns route composition and App Router entry points
- `src/domains` owns feature-level screens, content, hooks, configs, and feature logic
- `src/components` owns reusable UI building blocks shared across domains
- `src/core` owns providers, stores, theme, middleware, and app-level infrastructure
- `src/lib` owns low-level utilities and integrations

## Conventions

- prefer feature work inside the relevant `src/domains/<Domain>` area
- keep route files thin; move non-trivial logic into domain modules or shared components
- reuse Mantine-based components and existing form/table patterns before adding new primitives
- prefer local feature hooks and schema files when forms or tables become stateful
- keep provider, auth, telemetry, and global store changes in `src/core`

## State And Data

- prefer existing `@tanstack/react-query` patterns for remote data
- prefer existing `zustand` stores only for cross-cutting client state
- keep fetch/query key/config patterns aligned with nearby domain code
