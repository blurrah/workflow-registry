"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StepCard } from "@/components/step-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllSteps, getAllIntegrations } from "@/lib/registry"
import { Badge } from "@/components/ui/badge"

export default function StepsPage() {
  const allSteps = getAllSteps().map((step) => ({
    name: step.name,
    title: step.name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: step.description,
    category: step.category || "utilities",
    author: "Workflow Elements",
    integrations: step.integrations,
  }))

  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)

  const integrations = useMemo(() => {
    const integrationMap = new Map<string, number>()
    allSteps.forEach((step) => {
      step.integrations?.forEach((integration) => {
        integrationMap.set(integration, (integrationMap.get(integration) || 0) + 1)
      })
    })
    return Array.from(integrationMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [allSteps])

  const filteredSteps = useMemo(() => {
    if (!selectedIntegration) return allSteps
    return allSteps.filter((step) => step.integrations?.includes(selectedIntegration))
  }, [allSteps, selectedIntegration])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 sm:py-8 px-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-bold text-3xl sm:text-4xl text-foreground mb-2">All Steps</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Browse and discover reusable workflow steps</p>
        </div>

        <div className="mb-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Filter by Integration</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedIntegration === null ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedIntegration(null)}
              >
                All ({allSteps.length})
              </Badge>
              {integrations.map(({ name, count }) => {
                const slug = name.toLowerCase().replace(/\s+/g, "-")
                return (
                  <Link key={name} href={`/integrations/${slug}`}>
                    <Badge
                      variant={selectedIntegration === name ? "default" : "outline"}
                      className="cursor-pointer transition-colors hover:bg-primary/10"
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedIntegration(name)
                      }}
                    >
                      {name} ({count})
                    </Badge>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/docs/contributing">Submit a Step</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="inline-flex w-auto min-w-full sm:min-w-0">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="ai">AI & ML</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="documents">Docs</TabsTrigger>
              <TabsTrigger value="utilities">Utils</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSteps.map((step) => (
                <StepCard key={step.name} {...step} />
              ))}
            </div>
            {filteredSteps.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No steps found for this filter</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSteps
                .filter((s) => s.category === "notifications")
                .map((step) => (
                  <StepCard key={step.name} {...step} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="ai" className="mt-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSteps
                .filter((s) => s.category === "ai")
                .map((step) => (
                  <StepCard key={step.name} {...step} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="data" className="mt-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSteps
                .filter((s) => s.category === "data")
                .map((step) => (
                  <StepCard key={step.name} {...step} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="storage" className="mt-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSteps
                .filter((s) => s.category === "storage")
                .map((step) => (
                  <StepCard key={step.name} {...step} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="documents" className="mt-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSteps
                .filter((s) => s.category === "documents")
                .map((step) => (
                  <StepCard key={step.name} {...step} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="utilities" className="mt-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSteps
                .filter((s) => s.category === "utilities")
                .map((step) => (
                  <StepCard key={step.name} {...step} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
