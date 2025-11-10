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
  provider?: string
}

export function StepCard({ name, title, description, category, author, provider }: StepCardProps) {
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
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                {category}
              </Badge>
              {provider && (
                <Badge variant="outline" className="text-xs">
                  {provider}
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{author}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
