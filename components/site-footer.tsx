import Link from "next/link"
import { Terminal } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 sm:py-12">
      <div className="container px-4">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Workflow Registry</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground">
              Built with Workflow DevKit. Open source and community-driven.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
