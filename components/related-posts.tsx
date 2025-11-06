"use client"

import Link from "next/link"
import Image from "next/image"
import { TagPill } from "./tag-pill"
import { formatDate } from "@/lib/post-utils"

interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  heroImage: string
  tags: string[]
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section aria-label="Related articles" className="mt-16 border-t border-border pt-12">
      <h2 className="mb-8 text-2xl font-bold text-balance">Related Articles</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              {/* Hero Image */}
              <div className="relative h-40 w-full overflow-hidden bg-muted">
                <Image
                  src={post.heroImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-4">
                {/* Tags */}
                <div className="mb-2 flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <TagPill key={tag} tag={tag} clickable={false} />
                  ))}
                </div>

                {/* Title */}
                <h3 className="mb-2 line-clamp-2 text-base font-semibold text-card-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>

                {/* Date */}
                <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
