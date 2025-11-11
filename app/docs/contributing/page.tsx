import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContributingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Link href="/docs" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Documentation
          </Link>
          <h1 className="font-bold text-4xl text-foreground mb-2">Contributing</h1>
          <p className="text-muted-foreground text-lg">Help grow Workflow Elements by contributing your steps</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Why Contribute?</h2>
            <p className="text-muted-foreground mb-4">By contributing your workflow steps to the registry, you:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Help other developers save time and avoid reinventing the wheel</li>
              <li>• Get feedback and improvements from the community</li>
              <li>• Build your reputation as a contributor</li>
              <li>• Ensure your commonly-used patterns are maintained and documented</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Contribution Guidelines</h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">1. Step Quality Standards</h3>
                <p className="text-muted-foreground mb-2">Your step should:</p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>
                    • Use the <code className="text-primary">'use step'</code> directive
                  </li>
                  <li>• Include proper TypeScript types for parameters and return values</li>
                  <li>• Have comprehensive JSDoc comments</li>
                  <li>
                    • Use <code className="text-primary">FatalError</code> appropriately
                  </li>
                  <li>• Handle errors gracefully with clear messages</li>
                  <li>• Validate inputs and environment variables</li>
                  <li>• Follow consistent naming conventions (kebab-case for file names)</li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">2. Documentation Requirements</h3>
                <p className="text-muted-foreground mb-2">Include:</p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>• Clear description of what the step does</li>
                  <li>• List of required dependencies</li>
                  <li>• Required environment variables with descriptions</li>
                  <li>• Usage example in a workflow</li>
                  <li>• Notes about any special configuration needed</li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">3. Testing</h3>
                <p className="text-muted-foreground text-sm">
                  Test your step in a real workflow before submitting. Verify that retries work correctly and error
                  messages are helpful.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">4. Categories</h3>
                <p className="text-muted-foreground mb-2">Assign your step to one of these categories:</p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>
                    • <strong className="text-foreground">notifications</strong> - Slack, email, Discord, etc.
                  </li>
                  <li>
                    • <strong className="text-foreground">ai</strong> - AI model integration, content generation
                  </li>
                  <li>
                    • <strong className="text-foreground">data</strong> - API calls, validation, transformation
                  </li>
                  <li>
                    • <strong className="text-foreground">storage</strong> - File uploads, database operations
                  </li>
                  <li>
                    • <strong className="text-foreground">documents</strong> - PDF generation, document processing
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Submission Process</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">1. Prepare Your Step</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Create your step following the guidelines above. Make sure it's well-documented and tested.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">2. Fork the Repository</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">
                    git clone https://github.com/workflow-registry/registry.git
                  </code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">3. Add Your Step</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Add your step file to the <code className="text-primary">steps/</code> directory:
                </p>
                <div className="rounded-lg border border-border bg-card p-4">
                  <code className="text-sm text-foreground">steps/your-step-name.ts</code>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">4. Update Metadata</h3>
                <p className="text-muted-foreground text-sm mb-2">Add your step's metadata to the registry:</p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>
                    • Add entry to <code className="text-primary">app/api/steps/route.ts</code>
                  </li>
                  <li>
                    • Add detailed metadata to <code className="text-primary">app/api/steps/[slug]/route.ts</code>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">5. Submit a Pull Request</h3>
                <p className="text-muted-foreground text-sm mb-2">Create a PR with:</p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>• Clear title describing your step</li>
                  <li>• Description of what it does and why it's useful</li>
                  <li>• Screenshots or examples if applicable</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Example Contribution</h2>
            <p className="text-muted-foreground mb-4">Here's what a complete contribution looks like:</p>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-3">File Structure</h3>
              <pre className="text-sm text-muted-foreground">
                {`steps/
  send-teams-message.ts       # Your step code

app/api/steps/
  route.ts                     # Add to allSteps array
  [slug]/route.ts             # Add to stepMetadata object`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Review Process</h2>
            <p className="text-muted-foreground mb-4">
              Once you submit a PR, maintainers will review your contribution for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Code quality and TypeScript usage</li>
              <li>• Proper error handling with FatalError</li>
              <li>• Documentation completeness</li>
              <li>• Security considerations</li>
              <li>• Usefulness to the community</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Feedback may be provided, and you might be asked to make changes. Once approved, your step will be merged
              and become available to all users!
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Need Help?</h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-muted-foreground mb-4">If you have questions about contributing:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Open a GitHub Discussion</li>
                <li>• Check existing steps for examples</li>
                <li>
                  • Review the{" "}
                  <Link href="/docs/creating-steps" className="text-primary hover:underline">
                    Creating Steps guide
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <div className="rounded-lg border border-primary/50 bg-primary/5 p-6">
            <h3 className="font-semibold text-foreground mb-2">Ready to Contribute?</h3>
            <p className="text-muted-foreground mb-4">
              Start by creating a high-quality workflow step that solves a real problem. The community will thank you!
            </p>
            <Button asChild>
              <a href="https://github.com/workflow-registry/registry" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
