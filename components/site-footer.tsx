export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/50 py-12">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="mb-4 font-bold">NeuralPulse</h3>
            <p className="text-sm text-muted-foreground">Deep insights into AI, GenAI, and emerging technologies.</p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="transition-colors hover:text-foreground">
                  Home
                </a>
              </li>
              <li>
                <a href="/posts" className="transition-colors hover:text-foreground">
                  Articles
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Subscribe
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Follow</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} NeuralPulse. All rights reserved. Built with Next.js and Contentlayer.
          </p>
        </div>
      </div>
    </footer>
  )
}
