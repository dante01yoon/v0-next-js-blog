import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    publishedAt: { type: "string", required: true },
    heroImage: { type: "string", required: true },
    author: { type: "string", default: "Anonymous" },
  },
  computedFields: {
    readingTime: {
      type: "number",
      resolve: (doc) => {
        const wordsPerMinute = 200
        const wordCount = doc.body.raw.split(/\s+/).length
        return Math.ceil(wordCount / wordsPerMinute)
      },
    },
    url: {
      type: "string",
      resolve: (post) => `/posts/${post.slug}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkParse],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }], rehypeStringify, remarkRehype],
  },
})
