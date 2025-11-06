"use client"

import Link from "next/link"

interface TagPillProps {
  tag: string
  clickable?: boolean
  active?: boolean
}

export function TagPill({ tag, clickable = true, active = false }: TagPillProps) {
  const baseClasses = "inline-block rounded-full px-3 py-1 text-xs font-medium transition-all duration-200"
  const defaultClasses = "bg-muted text-muted-foreground hover:bg-muted/80"
  const activeClasses = "bg-primary text-primary-foreground"

  const classes = `${baseClasses} ${active ? activeClasses : defaultClasses}`

  if (!clickable) {
    return <span className={classes}>{tag}</span>
  }

  return (
    <Link href={`/posts?tag=${encodeURIComponent(tag)}`} className={classes}>
      {tag}
    </Link>
  )
}
