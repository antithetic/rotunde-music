# Rotunde Music

A monorepo for Rotunde Music, a music platform built with modern web technologies.

## What's inside?

This Turborepo includes the following packages and apps:

### Apps

- **`docs`**: Documentation site built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), featuring search functionality and a custom theme
- **`studio`**: [Sanity Studio](https://www.sanity.io/studio) for content management, configured with custom schema and plugins
- **`web`**: Main web application built with [Astro](https://astro.build)

### Packages

- **`@repo/sanity`**: Shared Sanity schema definitions and utilities
  - Document types: `artist`, `contact`, `event`, `newsletter`, `page`, `playlist`, `settings`, `song`, `venue`
  - Custom structure and grouping utilities
- **`@repo/constants`**: Shared constants (site name, URLs)
- **`@repo/ui`**: Shared UI components and utilities
- **`@repo/eslint-config`**: Shared ESLint configurations
- **`@repo/typescript-config`**: Shared TypeScript configurations

## Tech Stack

- **Monorepo**: [Turborepo](https://turbo.build/repo)
- **Package Manager**: [pnpm](https://pnpm.io)
- **Framework**: [Astro](https://astro.build)
- **CMS**: [Sanity](https://www.sanity.io)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js (version specified in package.json)
- pnpm 10.28.0 or compatible version

### Installation

```sh
pnpm install
```

### Development

Run all apps in development mode:

```sh
pnpm dev
```

Run specific apps:

```sh
# Start documentation site
pnpm --filter docs dev

# Start Sanity Studio
pnpm --filter studio dev

# Start web application
pnpm --filter web dev
```

### Building

Build all apps and packages:

```sh
pnpm build
```

### Linting

Lint all packages:

```sh
pnpm lint
```

### Formatting

Format code with Prettier:

```sh
pnpm format
```

## Project Structure

```text
rotunde-music/
├── apps/
│   ├── docs/          # Documentation site (Astro + Starlight)
│   ├── studio/        # Sanity Studio
│   └── web/           # Main web application (Astro)
├── packages/
│   ├── constants/     # Shared constants
│   ├── eslint-config/ # ESLint configuration
│   ├── sanity/        # Sanity schema and utilities
│   ├── typescript-config/ # TypeScript configurations
│   └── ui/            # Shared UI components
└── turbo.json         # Turborepo configuration
```

## Utilities

This monorepo includes:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Turborepo](https://turbo.build/repo) for build system and task orchestration
