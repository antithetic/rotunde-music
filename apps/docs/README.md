# Rotunde Music Docs

Documentation site for the **Rotunde Music** monorepo. Built with [Astro Starlight](https://starlight.astro.build/), Flexoki theme, and DocSearch.

## Scope

- **Project overview** — Apps (docs, studio, web), shared packages, quick start
- **Sanity** — CMS config, schema reference, plugins, development guide
- **Reference** — Web app overview, example reference/guides

## Commands

From this directory (`apps/docs/`) or repo root:

| Command        | Action                          |
|----------------|----------------------------------|
| `pnpm dev`     | Dev server (e.g. localhost:4321) |
| `pnpm build`   | Production build → `dist/`       |
| `pnpm preview` | Preview production build        |

## Structure

- `src/content/docs/` — MDX/MD pages (sidebar from `astro.config.mjs`)
- `public/` — Static assets (favicon, robots.txt)
- `astro.config.mjs` — Starlight, Flexoki, DocSearch, sitemap; uses `@repo/constants` for title

## Learn more

- [Starlight](https://starlight.astro.build/)
- [Astro](https://docs.astro.build)
