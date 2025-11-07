"use client"

import Link from "next/link"
import Image from "next/image"
import { TagPill } from "./tag-pill"
import { formatDate } from "@/lib/post-utils"
import { withBasePath } from "@/lib/base-path"

interface PostCardProps {
  title: string
  excerpt: string
  slug: string
  tags: string[]
  publishedAt: string
  heroImage: string
  readingTime: number
}

export function PostCard({ title, excerpt, slug, tags, publishedAt, heroImage, readingTime }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
        {/* Hero Image */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={withBasePath(heroImage || "/placeholder.jpg")}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <TagPill key={tag} tag={tag} clickable={false} />
            ))}
          </div>

          {/* Title & Excerpt */}
          <div className="mb-4 flex-1">
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight text-card-foreground transition-colors group-hover:text-primary md:text-xl">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
