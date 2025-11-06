import { allPosts } from "contentlayer/generated"

export interface PostMetadata {
  title: string
  slug: string
  excerpt: string
  tags: string[]
  publishedAt: string
  heroImage: string
  author: string
  readingTime: number
  url: string
}

/**
 * Calculate read time in minutes
 */
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Get all unique tags from posts
 */
export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>()
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

/**
 * Filter posts by tag
 */
export const getPostsByTag = (tag: string) => {
  return allPosts
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
}

/**
 * Get paginated posts
 */
export const getPaginatedPosts = (page = 1, pageSize = 6) => {
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  const totalPages = Math.ceil(sortedPosts.length / pageSize)
  const startIdx = (page - 1) * pageSize
  const endIdx = startIdx + pageSize

  return {
    posts: sortedPosts.slice(startIdx, endIdx),
    totalPages,
    currentPage: page,
    totalPosts: sortedPosts.length,
  }
}

/**
 * Get related posts by shared tags
 */
export const getRelatedPosts = (currentSlug: string, limit = 3) => {
  const currentPost = allPosts.find((post) => post.slug === currentSlug)
  if (!currentPost) return []

  const related = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags filter((tag) => currentPost.tags.includes(tag)).length
      return { post, sharedTags }
    })
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit)
    .map(({ post }) => post)

  return related.length >= 3 ? related : allPosts.slice(0, limit).filter((p) => p.slug !== currentSlug)
}

/**
 * Get a single post by slug
 */
export const getPostBySlug = (slug: string) => {
  return allPosts.find((post) => post.slug === slug)
}

/**
 * Get all post slugs for static generation
 */
export const getAllPostSlugs = () => {
  return allPosts.map((post) => ({ slug: post.slug }))
}

/**
 * Format date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
