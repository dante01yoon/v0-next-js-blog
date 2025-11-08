# Architecture Overview

## Tech Stack
- Next.js 16 (App Router, webpack dev server)
- React 19 with TypeScript
- Contentlayer for Markdown sourcing
- Tailwind CSS 4 (globals + PostCSS config)

## Directory Structure
- app/: Next.js app router entry points
  - layout.tsx: Root layout wiring ThemeProvider and base metadata
  - page.tsx: Home page rendering featured/latest posts
  - globals.css: Tailwind layer definitions
  - posts/: Blog listing and dynamic post routes
    - page.tsx: Blog index pulling Contentlayer posts
    - loading.tsx: Suspense fallback for posts listing
    - [slug]/page.tsx: Individual post rendering via MarkdownContent
- components/: Reusable UI modules
  - theme-provider & theme-toggle enable next-themes integration
  - site-nav/site-footer supply shared layout chrome
  - post-card/related-posts/tag-pill surface blog metadata
  - markdown-content styles rendered Markdown/MDX output
  - ui/button.tsx centralises button variants with cva
- content/: Markdown posts consumed by Contentlayer
- lib/: Helper modules (post-utils.ts, utils.ts)
- styles/: Global CSS entry point
- public/: Static assets served by Next.js
- .codex/memory-bank/: Codex agent knowledge base (architecture notes, workflow reminders)
- contentlayer.config.ts: Post schema + MDX pipeline definition
- next.config.mjs: Next.js configuration (Contentlayer plugin, Turbopack opt-in)
- components.json: v0 component registry metadata
- vercel.json: Vercel deployment definition (pnpm install/build, `vercel` branch gating)
- .github/workflows/vercel-deploy.yml: GitHub Action that builds and deploys via Vercel CLI when `vercel` branch updates

## Data Flow
1. Markdown files under content/posts/*.md are processed by Contentlayer using contentlayer.config.ts.
2. Generated types/data appear in .contentlayer/ (gitignored) and are imported via `contentlayer/generated`.
3. Route handlers in app/posts leverage helpers from lib/post-utils.ts to fetch typed post data.
4. UI components render the Markdown content with theming and Tailwind styling.

## Notable Behaviours
- Dev server runs with `next dev --webpack` because Contentlayer's Webpack plugin handles generation; Turbopack is disabled.
- Production builds also force webpack via `next build --webpack` (see `package.json` scripts) to remain compatible with Contentlayer until equivalent Turbopack loaders exist.
- ESLint build blocking is disabled; TypeScript build errors are ignored for rapid iteration.
- Remote images are fully whitelisted and served unoptimized.
- GitHub Actions pipeline deploys production via Vercel CLI using secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` whenever code lands on the `vercel` branch.

## Development Tips
- Use `pnpm dev` (webpack) so Contentlayer regenerates content while developing; new Markdown posts appear after a restart if needed.
- Run `pnpm build` after ensuring Contentlayer has regenerated content.
- Update the memory bank whenever core structure or configuration changes.
