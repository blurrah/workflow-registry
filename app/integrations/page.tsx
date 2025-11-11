"use client"

import Link from "next/link"
import { StepCard } from "@/components/step-card"
import { getAllIntegrations } from "@/lib/registry"
import { Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function IntegrationsPage() {
  const integrations = getAllIntegrations()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 sm:py-8 px-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-bold text-3xl sm:text-4xl text-foreground mb-2">Integrations</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Browse workflow steps by integration service
          </p>
        </div>

        <div className="space-y-12">
          {integrations.map((integration) => {
            const slug = integration.name.toLowerCase().replace(/\s+/g, "-")
            
            return (
              <section key={integration.name} id={slug}>
                <div className="mb-6 flex items-center justify-between">
                  <Link 
                    href={`/integrations/${slug}`}
                    className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-bold text-2xl sm:text-3xl text-foreground flex items-center gap-2">
                        {integration.name}
                        <ArrowRight className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {integration.count} {integration.count === 1 ? "step" : "steps"} available
                      </p>
                    </div>
                  </Link>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/integrations/${slug}`}>
                      View All
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {integration.steps.slice(0, 3).map((step) => (
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

                {integration.steps.length > 3 && (
                  <div className="mt-4 text-center">
                    <Link 
                      href={`/integrations/${slug}`}
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View all {integration.count} {integration.name} steps
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </section>
            )
          })}
        </div>

        {integrations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No integrations found</p>
          </div>
        )}
      </div>
    </div>
  )
}

