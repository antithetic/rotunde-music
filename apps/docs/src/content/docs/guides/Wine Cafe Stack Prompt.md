---
title: 'Coding Agent Prompt'
---

# Coding Agent Prompt: Wine Café & Hi-Fi Bar Website

## Stack: Next.js (App Router) + Sanity v3 + Vercel

---

## PROJECT OVERVIEW

You are building a modern, production-grade website for a wine café and Hi-Fi music bar. The site serves as a content-rich marketing and discovery platform with a clean, atmospheric aesthetic appropriate for a premium hospitality brand. It must be fast, SEO-optimized, easy for non-technical editors to maintain via a headless CMS, and architected to support e-commerce features (wine sales, ticketed events) in a future phase.

---

## TECH STACK

| Layer              | Technology                                        |
| ------------------ | ------------------------------------------------- |
| Frontend Framework | Next.js 14+ (App Router, React Server Components) |
| CMS                | Sanity v3 (Studio embedded at `/studio`)          |
| Language           | TypeScript (strict mode)                          |
| Styling            | Tailwind CSS v3                                   |
| Image Handling     | Sanity image pipeline + Next.js `<Image>`         |
| Deployment         | Vercel                                            |
| Package Manager    | pnpm                                              |
| Linting/Formatting | ESLint + Prettier                                 |
| Future E-commerce  | Stripe (stub interfaces now, implement later)     |

---

## REPOSITORY STRUCTURE

Scaffold the project with the following structure. Do not deviate from this layout without explanation.

```
/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Public-facing site route group
│   │   ├── layout.tsx            # Site shell: nav, footer
│   │   ├── page.tsx              # Homepage
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx          # Events listing
│   │   │   └── [slug]/page.tsx   # Event detail
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   ├── artists/
│   │   │   ├── page.tsx          # Artist roster
│   │   │   └── [slug]/page.tsx   # Artist feature
│   │   └── gallery/
│   │       └── page.tsx
│   ├── studio/
│   │   └── [[...tool]]/page.tsx  # Embedded Sanity Studio
│   └── api/
│       └── revalidate/
│           └── route.ts          # Webhook revalidation endpoint
├── sanity/
│   ├── lib/
│   │   ├── client.ts             # Sanity client (server + browser)
│   │   ├── image.ts              # urlFor() image helper
│   │   └── queries.ts            # All GROQ queries
│   ├── schemas/
│   │   ├── index.ts              # Schema registry
│   │   ├── documents/
│   │   │   ├── menuItem.ts
│   │   │   ├── menuCategory.ts
│   │   │   ├── event.ts
│   │   │   ├── post.ts
│   │   │   ├── artist.ts
│   │   │   └── galleryImage.ts
│   │   └── objects/
│   │       ├── blockContent.ts   # Portable Text
│   │       ├── seo.ts
│   │       └── openingHours.ts
│   └── sanity.config.ts          # Studio configuration
├── components/
│   ├── ui/                       # Reusable primitives (Button, Badge, etc.)
│   ├── layout/                   # Nav, Footer, PageWrapper
│   ├── sections/                 # Full-width page sections
│   └── blocks/                   # Portable Text custom renderers
├── lib/
│   └── utils.ts                  # cn(), formatDate(), formatPrice()
├── types/
│   └── sanity.d.ts               # Generated + manual Sanity types
├── public/
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── sanity.cli.ts
```

---

## ENVIRONMENT VARIABLES

Create `.env.local.example` with these variables. Never hardcode secrets.

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token         # Server-only
SANITY_WEBHOOK_SECRET=your_webhook_secret     # Server-only

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Future: Stripe
# STRIPE_SECRET_KEY=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## SANITY SCHEMA DEFINITIONS

Implement all schemas with full TypeScript types. Follow these specifications exactly.

### `menuCategory`

Fields: `title` (string, required), `slug` (slug, required), `order` (number).

### `menuItem`

Fields: `name` (string, required), `slug` (slug, required), `category` (reference → menuCategory, required), `description` (text), `price` (number), `priceLabel` (string — for ranges like "45–120"), `tags` (array of strings: e.g. "natural", "orange", "vegan", "new"), `available` (boolean, default true), `image` (image with hotspot).

### `event`

Fields: `title` (string, required), `slug` (slug, required), `date` (datetime, required), `endDate` (datetime), `artist` (reference → artist), `type` (string enum: "live-music" | "tasting" | "dj-night" | "private"), `description` (Portable Text), `ticketUrl` (url), `ticketPrice` (number), `capacity` (number), `image` (image with hotspot), `seo` (seo object), `isFeatured` (boolean).

### `post`

Fields: `title` (string, required), `slug` (slug, required), `publishedAt` (datetime), `excerpt` (text, max 200 chars), `body` (Portable Text), `mainImage` (image with hotspot), `author` (string), `tags` (array of strings), `seo` (seo object).

### `artist`

Fields: `name` (string, required), `slug` (slug, required), `bio` (Portable Text), `photo` (image with hotspot), `genre` (string), `links` (array of objects with `label` string and `url` url), `featured` (boolean).

### `galleryImage`

Fields: `title` (string), `image` (image with hotspot, required), `alt` (string, required), `category` (string enum: "venue" | "food-wine" | "events" | "artists"), `order` (number).

### `seo` (object schema)

Fields: `metaTitle` (string, max 60 chars), `metaDescription` (string, max 160 chars), `ogImage` (image).

### `blockContent` (Portable Text)

Enable: all standard marks, h2, h3, h4, blockquote. Custom block types: `callout` (with tone: info/warning/highlight), `imageEmbed` (image with caption and alt).

---

## SANITY CLIENT SETUP

In `sanity/lib/client.ts`, export two clients:

1. `serverClient` — uses `SANITY_API_READ_TOKEN`, `useCdn: false`, for RSC data fetching. Never expose to the browser.
2. `previewClient` — same token, `perspective: 'previewDrafts'`, for Live Preview (implement as a stub if not building preview mode now).

In `sanity/lib/queries.ts`, define all GROQ queries as named constants. Use `defineQuery()` from `next-sanity` for type inference compatibility. Every query must select only the fields it actually uses — never use `*` projections in production queries.

In `sanity/lib/image.ts`, export a `urlFor()` helper using `@sanity/image-url`.

---

## DATA FETCHING PATTERNS

All data fetching happens in React Server Components. Follow this pattern consistently:

```tsx
// app/(site)/events/page.tsx
import { serverClient } from '@/sanity/lib/client'
import { EVENTS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 300 // 5 minutes fallback

export async function generateMetadata() { ... }

export default async function EventsPage() {
  const events = await serverClient.fetch(EVENTS_QUERY)
  return <EventsList events={events} />
}
```

- Use `export const revalidate = N` at the page level to set ISR windows.
- For pages that change rarely (gallery, menu categories): `revalidate = 3600`.
- For pages that change often (events, blog): `revalidate = 300`.
- The webhook endpoint at `/api/revalidate` will call `revalidatePath()` for on-demand revalidation triggered by Sanity publishes. Implement this with `SANITY_WEBHOOK_SECRET` verification using `isValidSignature` from `@sanity/webhook`.

---

## CACHING STRATEGY

| Content Type | Strategy                | Revalidation       |
| ------------ | ----------------------- | ------------------ |
| Menu         | ISR `revalidate = 3600` | On publish webhook |
| Events       | ISR `revalidate = 300`  | On publish webhook |
| Blog posts   | ISR `revalidate = 300`  | On publish webhook |
| Artist pages | ISR `revalidate = 3600` | On publish webhook |
| Gallery      | ISR `revalidate = 3600` | On publish webhook |
| Homepage     | ISR `revalidate = 600`  | On publish webhook |

The webhook handler at `/api/revalidate/route.ts` should:

1. Verify the `SANITY_WEBHOOK_SECRET` signature.
2. Accept a body containing `{ _type: string, slug?: { current: string } }`.
3. Map document types to paths and call `revalidatePath()` accordingly.
4. Return `{ revalidated: true, now: Date.now() }`.

---

## PAGE SPECIFICATIONS

### Homepage (`/`)

Sections in order: Hero (full-viewport, atmospheric image with headline and CTA buttons), FeaturedEvents (next 3 upcoming events), MenuHighlights (3–4 featured categories or items), FeaturedArtist (latest featured artist), LatestPosts (3 most recent blog posts), GalleryTeaser (6-image masonry grid), OpeningHours + Address block.

### Menu (`/menu`)

Fetch all menu categories with their items. Render with a sticky left-side category nav (desktop) / tab-style nav (mobile) that smooth-scrolls to sections. Group items by category. Each item card shows name, description, price, and any tags as badges. Mark unavailable items visually but still show them. Make this page static with long revalidation — menus don't change daily.

### Events (`/events` and `/events/[slug]`)

Listing page: separate "Upcoming" and "Past" sections. Each event card shows date, type badge, title, artist name if linked, and ticket/price info. Filter by type (live-music, tasting, etc.) using client-side state (no server round-trip needed for this filter). Detail page: full event info, Portable Text description, artist link if present, ticket CTA button (link to `ticketUrl`), and related events.

### Blog (`/blog` and `/blog/[slug]`)

Standard editorial layout. Listing has excerpt, date, tags. Post detail renders Portable Text with custom block renderers for callouts and image embeds. Implement `generateStaticParams` for all published slugs. Add JSON-LD `Article` schema to post pages.

### Artists (`/artists` and `/artists/[slug]`)

Listing: grid of artist cards with photo, name, genre. Detail: full bio (Portable Text), genre, social/streaming links, related past events (queried by artist reference).

### Gallery (`/gallery`)

Grid layout with lightbox behavior. Filter by category using client-side state. Implement the lightbox as a Client Component island — the surrounding page stays server-rendered. Use `next/image` with proper `sizes` attributes throughout.

---

## SEO REQUIREMENTS

Every page must implement Next.js `generateMetadata()`. Pull `metaTitle` and `metaDescription` from the Sanity `seo` object when present, with sensible fallbacks. Implement Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`). Add canonical URLs.

Implement JSON-LD structured data:

- Homepage: `LocalBusiness` schema with name, address, opening hours, geo coordinates (stub fields).
- Events: `Event` schema with name, startDate, location, offers if ticketed.
- Blog posts: `Article` schema.

Create a `sitemap.ts` using Next.js's `MetadataRoute.Sitemap` type that dynamically fetches all published slugs from Sanity.

Create a `robots.ts` that allows all crawling except `/studio`.

---

## COMPONENT ARCHITECTURE RULES

Follow these conventions throughout:

1. **Server by default.** Every component is a Server Component unless it needs interactivity (`useState`, `useEffect`, event handlers, browser APIs). Add `'use client'` only when necessary.
2. **Islands for interactivity.** Client Components should be leaf nodes — small, focused interactive pieces (lightbox, mobile menu, filter tabs, contact form) wrapped inside server-rendered parents.
3. **Props typing.** Every component has explicit TypeScript prop types. Use types generated from Sanity schemas where possible.
4. **No inline styles.** Use Tailwind utility classes exclusively. Use `cn()` from `lib/utils.ts` (wrapping `clsx` + `tailwind-merge`) for conditional classes.
5. **Image discipline.** Always use `next/image`. Always provide meaningful `alt` text (from Sanity `alt` field, never empty for meaningful images). Always set appropriate `sizes` attribute.
6. **Loading states.** Use Next.js `loading.tsx` files for route-level Suspense boundaries. Use `<Suspense>` with skeleton fallbacks for async component boundaries within pages.
7. **Error boundaries.** Add `error.tsx` files at the route group level.

---

## NAVIGATION & LAYOUT

The site shell (`app/(site)/layout.tsx`) wraps all public pages with:

- **Header:** Logo (left), main nav links (center or right), optional "Book a table" CTA button. Mobile: hamburger → slide-in drawer. Nav links: Home, Menu, Events, Artists, Blog, Gallery.
- **Footer:** Logo, short tagline, nav links grouped by category, opening hours summary, address, social links (Instagram, Spotify, SoundCloud stubs).

The header should be transparent over hero images on the homepage and solid on inner pages. Implement this with a prop or context, not JavaScript scroll detection — keep it CSS-driven where possible.

---

## EMBEDDED SANITY STUDIO

Configure the Studio to be accessible at `/studio` for authorized users only. In production, protect the `/studio` route with Sanity's built-in authentication. The Studio should be the full Sanity Studio v3 experience embedded via `<NextStudio>` from `next-sanity/studio`.

Organize the Studio desk structure so editors see: Content (Menu, Events, Blog, Artists, Gallery) and Settings as logical top-level groups. Do not expose raw document type lists without grouping.

---

## TYPESCRIPT REQUIREMENTS

- `strict: true` in tsconfig.
- Generate Sanity types using `@sanity/types` or `sanity-codegen`. At minimum, define manual TypeScript interfaces in `types/sanity.d.ts` for all document types.
- No `any` types. Use `unknown` and narrow appropriately.
- Use `zod` to validate the webhook payload in `/api/revalidate`.

---

## FUTURE E-COMMERCE SCAFFOLDING

Do not implement e-commerce now, but scaffold the following so the future implementation is clean:

- Add `price` and `ticketUrl` fields to the `event` schema (already specified above).
- Add `price` field to `menuItem` (already specified).
- Create a stub `/api/checkout/route.ts` that returns `{ error: 'Not yet implemented' }`.
- Add a `CartProvider` context stub in `components/providers/CartProvider.tsx` that exports `useCart()` returning an empty cart — this makes it easy to wire up Stripe/commerce later without restructuring the component tree.
- In the event detail page, render a "Buy Tickets" button that links to `ticketUrl` for now, with a comment marking where Stripe checkout will replace this.

---

## PERFORMANCE REQUIREMENTS

The site must achieve Lighthouse scores of 90+ across all categories on the homepage and key inner pages. Specific requirements:

- All images use `next/image` with correct `width`, `height`, and `sizes`. Hero images use `priority` prop.
- No render-blocking third-party scripts. Any analytics (e.g., Vercel Analytics) must use `next/script` with `strategy="afterInteractive"` or `lazyOnload`.
- Fonts loaded via `next/font` — no external `<link>` font imports.
- Tailwind CSS is purged in production (default behavior — do not disable).
- Total JavaScript shipped to the client should be minimal. Audit Client Components to ensure no large libraries are accidentally bundled client-side.

---

## CODE QUALITY STANDARDS

- All components under 150 lines. Extract sub-components when pages grow complex.
- GROQ queries co-located in `sanity/lib/queries.ts`, not scattered across pages.
- No magic strings — use TypeScript enums or `as const` objects for event types, menu tags, gallery categories, etc.
- Consistent file naming: `kebab-case` for files, `PascalCase` for component exports.
- Every async Server Component should handle the case where Sanity returns `null` or an empty array gracefully — no unhandled crashes.
- Add JSDoc comments to non-obvious utility functions and all GROQ queries explaining what they return.

---

## DEPLOYMENT CHECKLIST (Vercel)

When the project is ready for deployment, ensure:

1. All environment variables are set in the Vercel project dashboard.
2. The Sanity CORS origins include the production Vercel domain and any preview deployment URLs (`*.vercel.app`).
3. A Sanity webhook is configured pointing to `https://yourdomain.com/api/revalidate` with the `SANITY_WEBHOOK_SECRET` and the trigger set to `document.publish` for all document types.
4. Vercel's image optimization is enabled (default).
5. The `/studio` route is excluded from public Vercel previews if desired (use `vercel.json` redirects or Sanity auth).

---

## WHAT NOT TO DO

- Do not use the Next.js `pages/` directory. Use App Router exclusively.
- Do not use `getServerSideProps` or `getStaticProps` — these are Pages Router patterns.
- Do not fetch data in Client Components using `useEffect` + fetch unless absolutely necessary. Use RSC data fetching.
- Do not install `axios` — use native `fetch`.
- Do not use CSS Modules or styled-components — use Tailwind exclusively.
- Do not store secrets in `NEXT_PUBLIC_` prefixed variables.
- Do not use `any` TypeScript type.
- Do not commit `.env.local` — only commit `.env.local.example`.
- Do not add unnecessary dependencies. Every package added should have a clear justification.

---

## STARTING INSTRUCTION FOR THE AGENT

Begin by:

1. Initializing the Next.js project with `pnpm create next-app` using the App Router, TypeScript, Tailwind CSS, and ESLint.
2. Installing core dependencies: `next-sanity`, `@sanity/image-url`, `@sanity/webhook`, `clsx`, `tailwind-merge`, `zod`.
3. Creating the full directory structure as specified above.
4. Implementing all Sanity schemas and the Sanity client configuration.
5. Setting up the embedded Studio at `/studio`.
6. Building the GROQ query library and the revalidation webhook endpoint.
7. Then building pages in this order: Layout shell → Homepage → Menu → Events → Blog → Artists → Gallery.

Confirm understanding of the full spec before writing any code, and ask for clarification on any ambiguous requirement.
