"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { getAllTags, getPostsByTag } from "@/lib/post-utils"
import { allPosts } from "@/.contentlayer/generated"

const POSTS_PER_PAGE = 6

export default function PostsPage() {
  const searchParams = useSearchParams()
  const tagFilter = searchParams.get("tag")
  const pageParam = searchParams.get("page")

  const [currentPage, setCurrentPage] = useState(Number.parseInt(pageParam || "1"))

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (tagFilter) {
      return getPostsByTag(tagFilter)
    }
    return allPosts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  }, [tagFilter])

  // Paginate
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE)

  const allTags = getAllTags()

  return (
    <div className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Articles</h1>
          <p className="text-lg text-muted-foreground">
            {tagFilter
              ? `Showing articles tagged with "${tagFilter}"`
              : "Explore all articles about AI and technology."}
          </p>
        </div>

        {/* Tag Filter */}
        <div className="mb-12">
          <div className="mb-4 text-sm font-semibold text-muted-foreground">Filter by tag:</div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!tagFilter ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCurrentPage(1)
                window.history.pushState({}, "", "/posts")
              }}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={tagFilter === tag ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentPage(1)
                  window.history.pushState({}, "", `/posts?tag=${encodeURIComponent(tag)}`)
                }}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {paginatedPosts.length > 0 ? (
          <>
            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  tags={post.tags}
                  publishedAt={post.publishedAt}
                  heroImage={post.heroImage}
                  readingTime={post.readingTime}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((p) => p - 1)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                >
                  Previous
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => p + 1)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
