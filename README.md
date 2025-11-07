# NeuralPulse - Markdown-Driven Blog

A modern, responsive blog built with Next.js App Router, Contentlayer, and TypeScript. Features dark/light theme support, tag filtering, pagination, and SEO optimization.

## Features

- ✨ **Markdown-Driven**: All posts are simple `.md` files with frontmatter
- 🎨 **Dark/Light Theme**: Full theme support with localStorage persistence
- 📱 **Responsive Design**: Mobile-first approach for all screen sizes
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and structured data
- 🏷️ **Tag Filtering**: Filter posts by tags with pagination
- 🔗 **Related Posts**: Smart related posts section based on shared tags
- ⚡ **Fast**: Static generation with incremental static regeneration
- ♿ **Accessible**: WCAG compliant with semantic HTML and ARIA attributes

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx           # Root layout with nav and footer
│   ├── page.tsx             # Homepage with hero and featured posts
│   ├── posts/
│   │   ├── page.tsx         # Blog index with filters and pagination
│   │   └── [slug]/
│   │       └── page.tsx     # Dynamic post detail page
│   └── globals.css          # Global styles and theme tokens
├── components/
│   ├── post-card.tsx        # Reusable post card component
│   ├── tag-pill.tsx         # Tag component with linking
│   ├── markdown-content.tsx # Markdown rendering with styling
│   ├── related-posts.tsx    # Related posts section
│   ├── site-nav.tsx         # Global navigation
│   ├── site-footer.tsx      # Global footer
│   └── theme-toggle.tsx     # Dark/light theme toggle
├── content/
│   └── posts/               # Markdown files with frontmatter
│       ├── ai-frontiers-2025.md
│       ├── multimodal-ai.md
│       └── ai-2025-daily-life.md
├── lib/
│   └── post-utils.ts        # Utility functions for posts
└── contentlayer.config.ts   # Contentlayer configuration

\`\`\`

## Frontmatter Schema

Each markdown post requires the following frontmatter:

\`\`\`yaml
---
title: "Post Title"
slug: "unique-slug"
excerpt: "Short summary of the post"
tags: ["Tag1", "Tag2", "Tag3"]
publishedAt: "YYYY-MM-DD"
heroImage: "URL or path to hero image"
author: "Author Name"
---
\`\`\`

## Adding New Posts

To add a new blog post:

1. Create a new `.md` file in `content/posts/` (e.g., `my-new-post.md`)
2. Add the required frontmatter at the top
3. Write your content in Markdown
4. Run `pnpm build` to generate static files
5. The post will automatically appear on `/posts` and have its own page at `/posts/[slug]`

Example:

\`\`\`markdown
---
title: "Getting Started with AI"
slug: "getting-started-ai"
excerpt: "A beginner's guide to AI and machine learning"
tags: ["AI", "Tutorial", "Beginner"]
publishedAt: "2025-11-06"
heroImage: "/images/ai-hero.jpg"
author: "Your Name"
---

## Introduction

Start your AI journey here...
\`\`\`

## How Related Posts Work

Related posts are automatically calculated based on shared tags:

1. The system finds all posts that share at least one tag with the current post
2. Posts are ranked by the number of shared tags
3. The top 3 posts are displayed in the "Related Articles" section
4. If fewer than 3 related posts exist, it falls back to the newest posts

This is implemented in `lib/post-utils.ts` with the `getRelatedPosts()` function.

## Customization

### Update Site Metadata

Edit `app/layout.tsx`:

\`\`\`tsx
export const metadata: Metadata = {
  title: 'Your Blog Name',
  description: 'Your blog description',
  // ...
}
\`\`\`

### Modify Colors & Theme

Edit `app/globals.css` to update CSS variables:

\`\`\`css
:root {
  --primary: 168 80% 50%; /* Change primary color */
  --background: 0 0% 100%;
  /* ... */
}
\`\`\`

### Adjust Pagination

In `app/posts/page.tsx`, modify `POSTS_PER_PAGE`:

\`\`\`tsx
const POSTS_PER_PAGE = 6 // Change to desired number
\`\`\`

## Dependencies

- **Next.js 16**: React framework with App Router
- **Contentlayer**: MDX/Markdown content management
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Utility-first styling
- **Lucide React**: Icon library

## Environment Variables

대부분의 기능은 환경 변수 없이 동작합니다. 다만 GitHub Pages처럼 서브 디렉터리에 배포할 때는 정적 자산 경로를 맞추기 위해 `NEXT_PUBLIC_BASE_PATH`를 사용할 수 있습니다.

| Name | Required | Description |
| ---- | -------- | ----------- |
| `NEXT_PUBLIC_BASE_PATH` | Optional | `/repo-name` 형태로 입력하면 빌드 시 `basePath`/`assetPrefix`가 자동으로 설정되어 GitHub Pages에서도 경로가 깨지지 않습니다. 로컬 개발이나 루트 도메인 배포 시에는 비워두면 됩니다. |

## Building & Deployment

### Build

\`\`\`bash
pnpm build
\`\`\`

This command:
1. Processes all Markdown files with Contentlayer
2. Generates static HTML pages
3. Creates optimized production bundle

### Static Export & GitHub Pages

\`\`\`bash
NEXT_PUBLIC_BASE_PATH="/v0-next-js-blog" pnpm run deploy
\`\`\`

- Runs `next build --webpack` with `output: 'export'` enabled and writes the static site to `out/`.
- Adjust the base path to match your repository name (omit it when deploying to a root domain).
- `.github/workflows/deploy.yml` executes the same command on pushes to `main` and publishes the artifact to GitHub Pages automatically.

### Other Hosts

Deploy to Vercel (recommended for dynamic infrastructure):

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Or upload the generated `out/` directory to any static host (Netlify, Cloudflare Pages, etc.).

## Performance Tips

- Hero images are optimized with Next.js Image component
- Pages are statically generated at build time
- Incremental Static Regeneration (ISR) can be added for dynamic updates
- Markdown is processed at build time, not runtime

## SEO Features

- Open Graph meta tags for social sharing
- Twitter card support
- Dynamic meta titles and descriptions
- Structured markup for articles
- Sitemap generation (can be added)

## Accessibility Features

- Semantic HTML (header, nav, main, article, footer)
- Skip to main content link
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels on interactive elements
- Dark mode support with system preference detection
- Focus visible states
- Color contrast compliant

## Troubleshooting

**Posts not appearing?**
- Ensure markdown files are in `content/posts/` directory
- Check frontmatter format matches schema
- Run `pnpm build` to regenerate

**Theme not saving?**
- Check localStorage is enabled in browser
- Verify theme toggle component is mounted client-side

**Images not loading?**
- Verify image URLs are correct in frontmatter
- Check Next.js Image configuration in `next.config.mjs`
- For external images, add domain to allowed list

## License

MIT - Feel free to use this as a template for your own blog.

## Next Steps

- Add search functionality with Algolia or similar
- Implement newsletter signup integration
- Add comments with Disqus or Giscus
- Create an RSS feed
- Add reading progress indicator
- Implement analytics
