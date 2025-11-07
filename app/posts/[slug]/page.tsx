import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { MDXContent } from "contentlayer/core"
import { RelatedPosts } from "@/components/related-posts"
import { formatDate, getPostBySlug, getRelatedPosts, getAllPostSlugs } from "@/lib/post-utils"
import { allPosts } from "contentlayer/generated"
import { withBasePath } from "@/lib/base-path"

export async function generateStaticParams() {
  return getAllPostSlugs()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post not found",
    }
  }

  return {
    title: `${post.title} | NeuralPulse`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: withBasePath(post.heroImage),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [withBasePath(post.heroImage)],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  // Serialize MDX body for rendering
  const Content = post.body.raw as unknown as MDXContent

  return (
    <article className="px-4 py-12 md:py-16">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/posts" className="hover:text-foreground transition-colors">
            Articles
          </Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-balance md:text-5xl">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative mb-12 h-96 w-full overflow-hidden rounded-lg bg-muted">
          <Image src={withBasePath(post.heroImage || "/placeholder.jpg")} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Main Content */}
        <main id="main-content" className="prose prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
        </main>

        {/* Author Block */}
        <aside className="my-12 rounded-lg border border-border bg-muted/50 p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20"></div>
            <div>
              <h3 className="font-semibold">{post.author}</h3>
              <p className="text-sm text-muted-foreground">
                AI researcher and tech writer exploring the frontiers of artificial intelligence and machine learning.
              </p>
            </div>
          </div>
        </aside>

        {/* Navigation Links */}
        {allPosts.length > 1 && (
          <div className="my-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Previous Post */}
            {allPosts.findIndex((p) => p.slug === post.slug) > 0 && (
              <Link href={`/posts/${allPosts[allPosts.findIndex((p) => p.slug === post.slug) - 1].slug}`}>
                <div className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                  <span className="text-xs text-muted-foreground">← Previous</span>
                  <span className="font-semibold">
                    {allPosts[allPosts.findIndex((p) => p.slug === post.slug) - 1].title}
                  </span>
                </div>
              </Link>
            )}

            {/* Next Post */}
            {allPosts.findIndex((p) => p.slug === post.slug) < allPosts.length - 1 && (
              <Link href={`/posts/${allPosts[allPosts.findIndex((p) => p.slug === post.slug) + 1].slug}`}>
                <div className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                  <span className="text-xs text-muted-foreground">Next →</span>
                  <span className="font-semibold">
                    {allPosts[allPosts.findIndex((p) => p.slug === post.slug) + 1].title}
                  </span>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <RelatedPosts
            posts={relatedPosts.map((p) => ({
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              publishedAt: p.publishedAt,
              heroImage: withBasePath(p.heroImage || "/placeholder.jpg"),
              tags: p.tags,
            }))}
          />
        )}
      </div>
    </article>
  )
}
