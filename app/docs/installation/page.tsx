import Link from "next/link"

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <Link href="/docs" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Documentation
          </Link>
          <h1 className="font-bold text-4xl text-foreground mb-2">Installation</h1>
          <p className="text-muted-foreground text-lg">Different ways to add workflow steps to your project</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Using shadcn CLI (Recommended)</h2>
            <p className="text-muted-foreground mb-4">
              Use the familiar shadcn CLI with our custom registry to install workflow steps. The CLI handles everything
              automatically:
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Install a Single Step</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">
                    npx shadcn@latest add https://workflow-registry.vercel.app/r/send-slack-message
                  </code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Or Use the Short Form</h3>
                <p className="text-muted-foreground text-sm mb-2">Set up the registry URL once in your config:</p>
                <div className="rounded-lg border border-border bg-card p-4 mb-2">
                  <code className="text-sm text-foreground">
                    npx shadcn@latest init -u https://workflow-registry.vercel.app
                  </code>
                </div>
                <p className="text-muted-foreground text-sm mb-2">Then add steps easily:</p>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">npx shadcn@latest add send-slack-message send-email</code>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">What the CLI Does</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">1.</span>
                  <span>Fetches the step code from the registry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">2.</span>
                  <span>Creates the step file in your project's steps/ directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">3.</span>
                  <span>Automatically installs required npm dependencies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">4.</span>
                  <span>Updates your project with full TypeScript types</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Manual Copy & Paste</h2>
            <p className="text-muted-foreground mb-4">You can also manually copy step code from the website:</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">1. Browse Steps</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Visit the{" "}
                  <Link href="/steps" className="text-primary hover:underline">
                    steps page
                  </Link>{" "}
                  and find the step you need.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">2. Copy the Code</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Click on a step to view its details. Copy the code from the "Code" tab.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">3. Create the File</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Create a new file in your <code className="text-primary">steps/</code> directory and paste the code.
                </p>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">steps/send-slack-message.ts</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">4. Install Dependencies</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Check the "Setup" tab for required dependencies and install them:
                </p>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">npm install @slack/web-api</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">5. Configure Environment Variables</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Add required environment variables to your <code className="text-primary">.env</code> file.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Project Structure</h2>
            <p className="text-muted-foreground mb-4">Here's the recommended project structure for workflows:</p>

            <div className="rounded-lg border border-border bg-card p-6">
              <pre className="text-sm text-foreground">
                {`project-root/
├── steps/                    # Workflow steps
│   ├── send-slack-message.ts
│   ├── send-email.ts
│   └── generate-ai-content.ts
├── workflows/                # Your workflows
│   ├── onboarding.ts
│   └── data-processing.ts
├── .env                      # Environment variables
└── package.json`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Environment Variables</h2>
            <p className="text-muted-foreground mb-4">
              Most steps require environment variables for API keys and configuration. Here are some common ones:
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground mb-2">Slack Steps</h3>
                <code className="text-sm text-muted-foreground">SLACK_BOT_TOKEN=xoxb-...</code>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground mb-2">Email Steps</h3>
                <div className="space-y-1">
                  <div>
                    <code className="text-sm text-muted-foreground">RESEND_API_KEY=re_...</code>
                  </div>
                  <div>
                    <code className="text-sm text-muted-foreground">RESEND_FROM_EMAIL=noreply@example.com</code>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground mb-2">Storage Steps</h3>
                <code className="text-sm text-muted-foreground">BLOB_READ_WRITE_TOKEN=vercel_blob_...</code>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Registry not found</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Make sure you're using the full registry URL or have initialized the registry with{" "}
                  <code className="text-primary">npx shadcn@latest init -u https://workflow-registry.vercel.app</code>
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Dependencies not installing</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  The shadcn CLI will automatically install dependencies. If it fails, install them manually from the
                  step's "Setup" tab.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Import errors</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Make sure the <code className="text-primary">workflow</code> package is installed and you've imported{" "}
                  <code className="text-primary">FatalError</code> where needed.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
