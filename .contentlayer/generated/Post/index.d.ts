export interface Post {
  title: string
  slug: string
  excerpt: string
  tags: string[]
  publishedAt: string
  heroImage: string
  author: string
  body: {
    raw: string
    html: string
  }
  readingTime: number
  url: string
  _id: string
  _raw: {
    sourceFilePath: string
    sourceFileName: string
    sourceFileDir: string
    contentType: string
    flattenedPath: string
  }
}

export declare const allPosts: Post[]
