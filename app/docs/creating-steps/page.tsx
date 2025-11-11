import Link from "next/link"

export default function CreatingStepsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Link href="/docs" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Documentation
          </Link>
          <h1 className="font-bold text-4xl text-foreground mb-2">Creating Workflow Steps</h1>
          <p className="text-muted-foreground text-lg">Learn how to build your own reusable workflow steps</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Step Anatomy</h2>
            <p className="text-muted-foreground mb-4">
              A workflow step is a TypeScript function with the <code className="text-primary">'use step'</code>{" "}
              directive. Here's a complete example:
            </p>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-muted px-4 py-2">
                <span className="text-sm text-muted-foreground font-mono">steps/my-custom-step.ts</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-foreground">{`import { FatalError } from 'workflow';

// 1. Define parameter interface
interface MyCustomStepParams {
  requiredParam: string;
  optionalParam?: number;
}

/**
 * 2. Add JSDoc documentation
 * 
 * Describe what your step does, its parameters,
 * and what it returns.
 */
export async function myCustomStep({
  requiredParam,
  optionalParam = 10,
}: MyCustomStepParams) {
  'use step'; // 3. Add the directive

  // 4. Validate inputs
  if (!requiredParam) {
    throw new FatalError('requiredParam is required');
  }

  // 5. Validate environment variables
  const apiKey = process.env.MY_API_KEY;
  if (!apiKey) {
    throw new FatalError('MY_API_KEY not configured');
  }

  // 6. Implement your logic
  try {
    const response = await fetch('https://api.example.com', {
      headers: { Authorization: \`Bearer \${apiKey}\` },
    });

    if (!response.ok) {
      // 7. Handle non-retryable errors
      if (response.status === 401) {
        throw new FatalError('Invalid API key');
      }
      
      // 8. Let transient errors retry
      throw new Error(\`API error: \${response.status}\`);
    }

    const data = await response.json();

    // 9. Return the result
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    if (error instanceof FatalError) {
      throw error;
    }
    // Network errors will retry automatically
    throw error;
  }
}`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Best Practices</h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">
                  1. Use FatalError for Non-Retryable Failures
                </h3>
                <p className="text-muted-foreground mb-2">
                  Throw <code className="text-primary">FatalError</code> when retrying won't help:
                </p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>• Missing or invalid configuration</li>
                  <li>• Authentication failures (401, 403)</li>
                  <li>• Invalid input data (400, 422)</li>
                  <li>• Resource not found (404)</li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">2. Let Transient Errors Retry</h3>
                <p className="text-muted-foreground mb-2">Regular errors will automatically retry. Use them for:</p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>• Network timeouts</li>
                  <li>• Rate limits (429)</li>
                  <li>• Server errors (500, 502, 503)</li>
                  <li>• Temporary service unavailability</li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">3. Validate Early</h3>
                <p className="text-muted-foreground text-sm">
                  Check all required parameters and environment variables at the start of your function. This prevents
                  wasting time on doomed operations.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">4. Use TypeScript</h3>
                <p className="text-muted-foreground text-sm">
                  Always define interfaces for parameters and return types. This provides excellent IDE support and
                  catches errors at compile time.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">5. Document Everything</h3>
                <p className="text-muted-foreground text-sm">
                  Use JSDoc comments to explain what your step does, what parameters it accepts, and what it returns.
                  Include examples in your documentation.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3">6. Keep Steps Focused</h3>
                <p className="text-muted-foreground text-sm">
                  Each step should do one thing well. If you're doing multiple operations, consider breaking them into
                  separate steps that can be composed in a workflow.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Testing Your Step</h2>
            <p className="text-muted-foreground mb-4">Test your step in a simple workflow:</p>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-muted px-4 py-2">
                <span className="text-sm text-muted-foreground font-mono">workflows/test-my-step.ts</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-foreground">{`import { myCustomStep } from '../steps/my-custom-step';

export async function testMyStep() {
  'use workflow';

  const result = await myCustomStep({
    requiredParam: 'test-value',
  });

  console.log('Step result:', result);
  return result;
}`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Common Patterns</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Timeout Handling</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-foreground">{`const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);

try {
  const response = await fetch(url, {
    signal: controller.signal,
  });
  clearTimeout(timeout);
  // ...
} catch (error: any) {
  clearTimeout(timeout);
  if (error.name === 'AbortError') {
    throw new Error('Request timeout'); // Will retry
  }
  throw error;
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Rate Limit Handling</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-foreground">{`if (response.status === 429) {
  // Let it retry automatically
  throw new Error('Rate limited');
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Data Validation with Zod</h3>
                <div className="rounded-lg border border-border bg-card p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-foreground">{`import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(0),
});

try {
  const validated = schema.parse(data);
} catch (error) {
  throw new FatalError('Invalid data');
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-bold text-2xl text-foreground mb-4">Next Steps</h2>
            <p className="text-muted-foreground mb-4">
              Once you've created a step you're happy with, consider{" "}
              <Link href="/docs/contributing" className="text-primary hover:underline">
                contributing it to the registry
              </Link>{" "}
              so others can benefit from your work!
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
