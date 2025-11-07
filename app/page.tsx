import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/post-card"
import { allPosts } from "contentlayer/generated"
import { withBasePath } from "@/lib/base-path"

export default function Home() {
  const featuredPosts = allPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-muted/50 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 md:items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-balance md:text-5xl lg:text-6xl">
                Exploring the Frontiers of{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Artificial Intelligence
                </span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground text-balance">
                Deep insights into AI, GenAI, Computer Vision, and Deep Learning advancements.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/posts">Latest Articles</Link>
                </Button>
                <Button variant="outline">Subscribe</Button>
              </div>
            </div>

            <div className="relative h-64 md:h-80">
              <Image
                src={withBasePath("/robot-artificial-intelligence.jpg")}
                alt="AI Robot"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <Link href="/posts" className="text-primary hover:underline text-sm md:text-base flex items-center gap-1">
              View all
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-b border-border bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Subscribe to receive the latest articles about AI, tech, and innovation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-md border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </>
  )
}
