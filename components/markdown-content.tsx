"use client"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <style>{`
        .prose {
          --tw-prose-body: rgb(var(--color-foreground) / 1);
          --tw-prose-headings: rgb(var(--color-card-foreground) / 1);
          --tw-prose-lead: rgb(var(--color-muted-foreground) / 1);
          --tw-prose-links: rgb(var(--color-primary) / 1);
          --tw-prose-bold: rgb(var(--color-card-foreground) / 1);
          --tw-prose-counters: rgb(var(--color-muted-foreground) / 1);
          --tw-prose-bullets: rgb(var(--color-border) / 1);
          --tw-prose-hr: rgb(var(--color-border) / 1);
          --tw-prose-quotes: rgb(var(--color-muted-foreground) / 1);
          --tw-prose-quote-borders: rgb(var(--color-border) / 1);
          --tw-prose-captions: rgb(var(--color-muted-foreground) / 1);
          --tw-prose-code: rgb(var(--color-primary) / 1);
          --tw-prose-pre-code: rgb(var(--color-foreground) / 1);
          --tw-prose-pre-bg: rgb(var(--color-card) / 1);
          --tw-prose-th-borders: rgb(var(--color-border) / 1);
          --tw-prose-td-borders: rgb(var(--color-border) / 1);
        }

        .prose h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }

        .prose ul,
        .prose ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
        }

        .prose a {
          color: rgb(var(--color-primary) / 1);
          text-decoration: underline;
          transition: opacity 0.2s;
        }

        .prose a:hover {
          opacity: 0.8;
        }

        .prose code {
          background-color: rgb(var(--color-muted) / 0.5);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Geist Mono', monospace;
          font-size: 0.875rem;
        }

        .prose pre {
          background-color: rgb(var(--color-card) / 1);
          border: 1px solid rgb(var(--color-border) / 1);
          border-radius: 0.5rem;
          padding: 1.25rem;
          overflow-x: auto;
          margin-bottom: 1.25rem;
        }

        .prose pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }

        .prose blockquote {
          border-left: 4px solid rgb(var(--color-primary) / 1);
          padding-left: 1rem;
          font-style: italic;
          color: rgb(var(--color-muted-foreground) / 1);
          margin-bottom: 1.25rem;
        }

        .prose img {
          border-radius: 0.5rem;
          margin: 2rem 0;
          max-width: 100%;
          height: auto;
        }

        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.25rem;
        }

        .prose th,
        .prose td {
          border: 1px solid rgb(var(--color-border) / 1);
          padding: 0.75rem;
          text-align: left;
        }

        .prose th {
          background-color: rgb(var(--color-muted) / 0.5);
          font-weight: 600;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
