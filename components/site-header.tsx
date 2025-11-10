import Link from "next/link"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground hidden sm:inline">Workflow Registry</span>
          <span className="font-bold text-foreground sm:hidden">WR</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs">Docs</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/steps">Steps</Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link href="https://github.com" target="_blank">
              GitHub
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
