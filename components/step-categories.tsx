import { Mail, Bell, Database, Bot, FileText, Cloud } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  {
    name: "Notifications",
    slug: "notifications",
    icon: Bell,
    count: 8,
    description: "Send emails, Slack messages, and push notifications",
  },
  {
    name: "AI & ML",
    slug: "ai",
    icon: Bot,
    count: 12,
    description: "Generate content, analyze data, and make predictions",
  },
  {
    name: "Data Processing",
    slug: "data",
    icon: Database,
    count: 15,
    description: "Validate, transform, and process data",
  },
  {
    name: "Storage",
    slug: "storage",
    icon: Cloud,
    count: 6,
    description: "Upload, download, and manage files",
  },
  {
    name: "Documents",
    slug: "documents",
    icon: FileText,
    count: 9,
    description: "Generate PDFs, parse documents, and extract text",
  },
  {
    name: "Communications",
    slug: "communications",
    icon: Mail,
    count: 11,
    description: "Email, SMS, and messaging integrations",
  },
]

export function StepCategories() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link key={category.slug} href={`/steps?category=${category.slug}`}>
            <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs text-secondary-foreground">
                    {category.count}
                  </span>
                </div>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
