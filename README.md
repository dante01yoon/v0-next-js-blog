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
4. Run `npm run build` to generate static files
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

No environment variables required for basic functionality. The blog works entirely with static files.

## Building & Deployment

### Build

\`\`\`bash
npm run build
\`\`\`

This command:
1. Processes all Markdown files with Contentlayer
2. Generates static HTML pages
3. Creates optimized production bundle

### Deployment

Deploy to Vercel (recommended):

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Or deploy to any static host (Netlify, GitHub Pages, etc.).

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
- Run `npm run build` to regenerate

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
