"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export function SiteNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">NeuralPulse</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="hidden gap-6 md:flex">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") && pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/posts"
              className={`text-sm font-medium transition-colors ${
                isActive("/posts") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Articles
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
