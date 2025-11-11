import Link from "next/link"
import { Bot, Terminal } from "lucide-react"

export default function MCPServerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Link href="/docs" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Documentation
          </Link>
          <h1 className="font-bold text-4xl text-foreground mb-2">MCP Server</h1>
          <p className="text-muted-foreground text-lg">Use AI assistants to browse and install workflow steps</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <div className="rounded-lg border border-border bg-card p-6 mb-6">
              <div className="flex items-start gap-3">
                <Bot className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What is MCP?</h3>
                  <p className="text-muted-foreground text-sm">
                    The Model Context Protocol (MCP) allows AI assistants like Claude, v0, and others to interact with
                    external tools and services. The shadcn MCP server enables AI assistants to browse, search, and
                    install workflow steps from this registry using natural language.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="font-bold text-2xl text-foreground mb-4">Setup</h2>
            <p className="text-muted-foreground mb-4">
              Configure the shadcn MCP server to work with the Workflow Registry:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">1. Install the MCP Server</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">npx -y @shadcn/mcp</code>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  This installs the shadcn MCP server globally so AI assistants can use it.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">2. Configure Your AI Assistant</h3>
                <p className="text-muted-foreground mb-3">Add the Workflow Elements URL to your MCP configuration:</p>

                <div className="rounded-lg border border-border bg-card overflow-hidden mb-3">
                  <div className="border-b border-border bg-muted px-4 py-2">
                    <span className="text-sm text-muted-foreground font-mono">Claude Desktop Config</span>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-foreground">{`{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "@shadcn/mcp"],
      "env": {
        "SHADCN_REGISTRY_URL": "https://workflow-registry.vercel.app"
      }
    }
  }
}`}</code>
                  </pre>
                </div>

                <p className="text-muted-foreground text-sm">
                  For Claude Desktop, this config file is typically located at:
                </p>
                <ul className="list-disc list-inside text-muted-foreground text-sm mt-2 space-y-1">
                  <li>
                    macOS:{" "}
                    <code className="text-primary">
                      ~/Library/Application Support/Claude/claude_desktop_config.json
                    </code>
                  </li>
                  <li>
                    Windows: <code className="text-primary">%APPDATA%\Claude\claude_desktop_config.json</code>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">3. Restart Your AI Assistant</h3>
                <p className="text-muted-foreground text-sm">
                  Restart Claude Desktop or your AI assistant to load the new MCP server configuration.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Usage with AI Assistants</h2>
            <p className="text-muted-foreground mb-4">
              Once configured, you can ask your AI assistant to interact with Workflow Elements using natural
              language:
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Terminal className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Browse Available Steps</h3>
                    <p className="text-muted-foreground text-sm italic">"Show me all workflow steps in the registry"</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  The AI will list all available workflow steps with their descriptions and categories.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Terminal className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Search for Specific Steps</h3>
                    <p className="text-muted-foreground text-sm italic">
                      "Find workflow steps for sending Slack messages"
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  The AI will search the registry and show relevant steps matching your query.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Terminal className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Install Steps</h3>
                    <p className="text-muted-foreground text-sm italic">
                      "Install the send-slack-message and send-email workflow steps"
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  The AI will add the steps to your project and install dependencies automatically.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Terminal className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Build Complete Workflows</h3>
                    <p className="text-muted-foreground text-sm italic">
                      "Build a workflow that sends a Slack notification when a new user signs up, then sends them a
                      welcome email"
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  The AI will install the necessary steps and help you compose them into a complete workflow.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Example Prompts</h2>
            <p className="text-muted-foreground mb-4">Here are some example prompts you can use with AI assistants:</p>

            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-muted px-4 py-3">
                <code className="text-sm text-foreground">"What notification workflow steps are available?"</code>
              </div>
              <div className="rounded-lg border border-border bg-muted px-4 py-3">
                <code className="text-sm text-foreground">"Install all the Vercel-related workflow steps"</code>
              </div>
              <div className="rounded-lg border border-border bg-muted px-4 py-3">
                <code className="text-sm text-foreground">"Show me workflow steps for working with Google Sheets"</code>
              </div>
              <div className="rounded-lg border border-border bg-muted px-4 py-3">
                <code className="text-sm text-foreground">"Add the GitHub create-issue step to my project"</code>
              </div>
              <div className="rounded-lg border border-border bg-muted px-4 py-3">
                <code className="text-sm text-foreground">
                  "Build a workflow that processes CSV data and uploads results to cloud storage"
                </code>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Benefits of Using MCP</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Natural Language Interface</h3>
                <p className="text-muted-foreground text-sm">
                  Describe what you want in plain English instead of remembering exact step names and commands.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Faster Discovery</h3>
                <p className="text-muted-foreground text-sm">
                  AI assistants can quickly search and filter steps based on your requirements.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Automated Setup</h3>
                <p className="text-muted-foreground text-sm">
                  The AI handles installation, dependency management, and basic configuration automatically.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Workflow Composition</h3>
                <p className="text-muted-foreground text-sm">
                  AI assistants can help you combine multiple steps into complete workflows with best practices.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Supported AI Assistants</h2>
            <p className="text-muted-foreground mb-4">
              The shadcn MCP server works with any AI assistant that supports the Model Context Protocol:
            </p>

            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Claude Desktop (Anthropic)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>v0 (Vercel)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Cursor (with MCP support)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Any MCP-compatible AI assistant</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">MCP server not responding</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Make sure you've restarted your AI assistant after updating the configuration file.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Registry not found</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Verify that <code className="text-primary">SHADCN_REGISTRY_URL</code> is set to{" "}
                  <code className="text-primary">https://workflow-registry.vercel.app</code> in your MCP configuration.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Steps not installing</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Ensure you're in a valid Next.js or TypeScript project with a{" "}
                  <code className="text-primary">package.json</code> file. The MCP server needs write access to create
                  files.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
