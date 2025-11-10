import Link from "next/link"
import { Code2, ArrowRight, Zap, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StepCard } from "@/components/step-card"
import { StepCategories } from "@/components/step-categories"
import { getAllSteps } from "@/lib/registry"

const Home = () => {
  const allSteps = getAllSteps()
  const featuredSteps = allSteps.slice(0, 6).map((step) => ({
    name: step.name,
    title: step.name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: step.description,
    category: step.category || "utilities",
    author: "Workflow Registry",
    provider: step.provider,
  }))

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container py-12 sm:py-24 md:py-32 px-4">
        <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
            <Zap className="mr-2 h-4 w-4 text-primary" />
            Powered by Workflow DevKit
          </div>
          <h1 className="text-balance font-bold text-3xl leading-tight tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl text-foreground">
            Reusable Workflow Steps for TypeScript
          </h1>
          <p className="text-pretty max-w-[42rem] leading-relaxed text-muted-foreground text-base sm:text-xl sm:leading-8">
            Build reliable, long-running workflows with pre-built steps. Copy, paste, and customize durable steps for
            notifications, data processing, AI, and more.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/steps">
                Browse Steps
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/docs">
                <Code2 className="mr-2 h-4 w-4" />
                Documentation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="container pb-8 sm:pb-16 px-4">
        <div className="mx-auto max-w-[64rem]">
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-card-foreground">Quick Start</h3>
                  <p className="text-sm text-muted-foreground">Add a step to your workflow project</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="self-end sm:self-auto">
                {/* Placeholder for Copy icon */}
              </Button>
            </div>
            <div className="mt-4 rounded-md bg-secondary p-4 font-mono text-xs sm:text-sm text-secondary-foreground overflow-x-auto">
              <span className="text-muted-foreground">$</span> npx shadcn@latest add
              https://workflow-registry.vercel.app/r/send-slack-message
            </div>
          </div>
        </div>
      </section>

      {/* Featured Steps */}
      <section className="container pb-8 sm:pb-16 px-4">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="font-bold text-2xl sm:text-3xl text-foreground">Featured Steps</h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                Production-ready steps you can use right now
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/steps">View All</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSteps.map((step) => (
              <StepCard key={step.name} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container pb-12 sm:pb-24 px-4">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="font-bold text-2xl sm:text-3xl text-foreground">Browse by Category</h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">Explore steps organized by use case</p>
          </div>
          <StepCategories />
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/50 py-12 sm:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-8 sm:gap-12 grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg sm:text-xl text-foreground">Copy & Paste</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  No npm packages required. Copy the step code directly into your project and customize it to your
                  needs.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg sm:text-xl text-foreground">Built for Reliability</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Every step includes automatic retries, error handling, and durability out of the box using Workflow
                  DevKit.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg sm:text-xl text-foreground">TypeScript First</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Fully typed step definitions with clear interfaces and comprehensive examples. Works seamlessly with
                  your IDE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
