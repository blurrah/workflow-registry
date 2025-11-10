import Link from "next/link"
import { Book, Code2, Package, Zap, Bot } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const guides = [
  {
    title: "Getting Started",
    description: "Learn how to install and use workflow steps in your projects",
    icon: Zap,
    href: "/docs/getting-started",
  },
  {
    title: "Installation",
    description: "Different ways to add steps to your workflow project",
    icon: Package,
    href: "/docs/installation",
  },
  {
    title: "MCP Server",
    description: "Use AI assistants to browse and install workflow steps",
    icon: Bot,
    href: "/docs/mcp-server",
  },
  {
    title: "Creating Steps",
    description: "Build and publish your own reusable workflow steps",
    icon: Code2,
    href: "/docs/creating-steps",
  },
  {
    title: "Contributing",
    description: "Submit your steps to the registry and help the community",
    icon: Book,
    href: "/docs/contributing",
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="font-bold text-4xl text-foreground mb-2">Documentation</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Everything you need to know about using and creating workflow steps
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Link key={guide.href} href={guide.href}>
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">{guide.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{guide.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-12">
          <h2 className="font-bold text-2xl text-foreground mb-6">What is Workflow Elements?</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Workflow Elements is a collection of reusable workflow steps built on top of the Workflow DevKit. Instead
              of building common workflow functionality from scratch, you can browse, copy, and customize pre-built
              steps for your use case.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each step is a self-contained TypeScript function marked with the{" "}
              <code className="text-primary">'use step'</code> directive, which provides automatic retries, error
              handling, and durability. Steps can be combined into workflows to build reliable, long-running processes.
            </p>
            <div className="rounded-lg border border-border bg-card p-6 my-6">
              <h3 className="font-semibold text-lg text-foreground mb-3">Key Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Copy and paste steps directly into your project - no npm packages required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Built-in retry logic and error handling using Workflow DevKit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Fully typed with TypeScript for excellent IDE support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Community-driven with contributions welcome</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
