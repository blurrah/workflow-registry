import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface StepCardProps {
  name: string
  title: string
  description: string
  category: string
  author: string
  integrations?: string[]
}

export function StepCard({ name, title, description, category, author, integrations }: StepCardProps) {
  return (
    <Link href={`/steps/${name}`}>
      <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-foreground group-hover:text-primary transition-colors">{title}</CardTitle>
            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
          </div>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <Badge variant="secondary" className="font-mono text-xs">
                {category}
              </Badge>
              <span className="text-xs text-muted-foreground">{author}</span>
            </div>
            {integrations && integrations.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {integrations.map((integration) => (
                  <Badge
                    key={integration}
                    variant="outline"
                    className="text-xs bg-primary/5 text-primary border-primary/20"
                  >
                    {integration}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
