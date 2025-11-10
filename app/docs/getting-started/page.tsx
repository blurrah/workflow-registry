import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Link href="/docs" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Documentation
          </Link>
          <h1 className="font-bold text-4xl text-foreground mb-2">Getting Started</h1>
          <p className="text-muted-foreground text-lg">Learn how to use Workflow Elements in your projects</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">What You'll Need</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Node.js 18 or higher</li>
              <li>A Next.js project (recommended) or any TypeScript project</li>
              <li>Workflow DevKit installed in your project</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Quick Start</h2>
            <p className="text-muted-foreground mb-4">Follow these steps to add your first workflow step:</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">1. Configure the Registry (Optional)</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">
                    npx shadcn@latest init -u https://workflow-registry.vercel.app
                  </code>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  This saves the registry URL so you don't have to use the full URL each time.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">2. Add Your First Step</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">npx shadcn@latest add send-slack-message</code>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  Or use the full URL if you haven't configured the registry:
                </p>
                <div className="rounded-lg border border-border bg-card p-4 mt-2">
                  <code className="text-sm text-foreground">
                    npx shadcn@latest add https://workflow-registry.vercel.app/r/send-slack-message
                  </code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">3. Add Multiple Steps</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">
                    npx shadcn@latest add send-slack-message send-email generate-ai-content
                  </code>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  The CLI will download all steps and install their dependencies automatically.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">4. Use the Step in a Workflow</h3>
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  <div className="border-b border-border bg-muted px-4 py-2">
                    <span className="text-sm text-muted-foreground font-mono">workflows/notify-team.ts</span>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-foreground">{`import { sendSlackMessage } from '../steps/send-slack-message';

export async function notifyTeam(message: string) {
  'use workflow';

  // This step will automatically retry on failures
  const result = await sendSlackMessage({
    channel: '#general',
    text: message,
  });

  return result;
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">5. Configure Environment Variables</h3>
                <p className="text-muted-foreground mb-2">
                  Add the required environment variables to your <code className="text-primary">.env</code> file:
                </p>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">SLACK_BOT_TOKEN=xoxb-your-token-here</code>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Understanding Workflow Steps</h2>
            <p className="text-muted-foreground mb-4">
              Workflow steps are functions marked with the <code className="text-primary">'use step'</code> directive.
              This directive tells the Workflow DevKit to handle retries, error handling, and state persistence
              automatically.
            </p>

            <div className="rounded-lg border border-border bg-card p-6 mb-4">
              <h3 className="font-semibold text-lg text-foreground mb-3">Key Concepts</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-foreground">Automatic Retries</dt>
                  <dd className="text-muted-foreground text-sm mt-1">
                    Steps automatically retry on transient failures (network errors, rate limits). You don't need to
                    write retry logic.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">FatalError</dt>
                  <dd className="text-muted-foreground text-sm mt-1">
                    Use <code className="text-primary">FatalError</code> for errors that shouldn't retry (invalid
                    configuration, 4xx errors). The workflow will stop instead of retrying.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Durability</dt>
                  <dd className="text-muted-foreground text-sm mt-1">
                    Each step's execution is tracked. If a workflow crashes and restarts, completed steps won't
                    re-execute.
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Next Steps</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/steps">
                <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    Browse All Steps
                    <ArrowRight className="h-4 w-4" />
                  </h3>
                  <p className="text-sm text-muted-foreground">Explore the full library of available workflow steps</p>
                </div>
              </Link>
              <Link href="/docs/creating-steps">
                <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-all">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    Create Your Own Steps
                    <ArrowRight className="h-4 w-4" />
                  </h3>
                  <p className="text-sm text-muted-foreground">Learn how to build custom workflow steps</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
