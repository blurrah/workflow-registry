"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { StepCard } from "@/components/step-card"
import { getAllIntegrations } from "@/lib/registry"
import { Package, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { use } from "react"

export default function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const allIntegrations = getAllIntegrations()
  
  // Convert slug back to integration name (e.g., "google-sheets" -> "Google Sheets")
  const integrationName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
  
  const integration = allIntegrations.find(
    (int) => int.name.toLowerCase().replace(/\s+/g, "-") === slug
  )

  if (!integration) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 sm:py-8 px-4">
        <div className="mb-6">
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Integrations
          </Link>
        </div>

        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-3xl sm:text-4xl text-foreground mb-2">
              {integration.name}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              {integration.count} {integration.count === 1 ? "step" : "steps"} available for {integration.name}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {integration.steps.map((step) => (
            <StepCard
              key={step.name}
              name={step.name}
              title={step.name
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
              description={step.description}
              category={step.category || "utilities"}
              author="Workflow Elements"
              integrations={step.integrations}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/docs/contributing">
              Contribute a {integration.name} Step
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

