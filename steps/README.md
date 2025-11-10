# Workflow Steps

This directory contains reusable workflow steps that can be used in Vercel Workflow DevKit.

## What are Workflow Steps?

Workflow steps are individual units of work that can be composed into larger workflows. Each step:

- Uses the `'use step'` directive to enable automatic retries
- Handles errors with `FatalError` for non-retryable failures
- Includes TypeScript types for parameters and return values
- Is fully documented with JSDoc comments

## Available Steps

### Notifications
- **send-slack-message.ts** - Send messages to Slack channels
- **send-email.ts** - Send transactional emails via Resend
- **send-discord-webhook.ts** - Send messages to Discord via webhooks

### AI & ML
- **generate-ai-content.ts** - Generate content using AI models with Vercel AI SDK

### Data
- **fetch-api-data.ts** - Fetch data from external APIs with retries
- **validate-data.ts** - Validate data against Zod schemas

### Storage
- **upload-to-storage.ts** - Upload files to Vercel Blob storage

### Documents
- **create-pdf.ts** - Generate PDF documents from HTML

## Using Steps in Workflows

\`\`\`typescript
import { sendSlackMessage } from './steps/send-slack-message';
import { generateAIContent } from './steps/generate-ai-content';

export async function myWorkflow(topic: string) {
  'use workflow';

  // Generate content with AI
  const content = await generateAIContent({
    prompt: `Write a short post about ${topic}`,
  });

  // Send to Slack
  await sendSlackMessage({
    channel: '#updates',
    text: content.text,
  });

  return { success: true };
}
\`\`\`

## Step Best Practices

1. **Error Handling**: Use `FatalError` for errors that shouldn't retry (invalid config, 4xx errors)
2. **Validation**: Validate inputs early and throw `FatalError` for invalid parameters
3. **Environment Variables**: Check for required env vars at the start of the function
4. **Types**: Use TypeScript interfaces for parameters and return values
5. **Documentation**: Include JSDoc comments explaining what the step does and its parameters

## Environment Variables

Make sure to configure these environment variables for the steps you use:

- `SLACK_BOT_TOKEN` - For send-slack-message
- `RESEND_API_KEY` - For send-email
- `RESEND_FROM_EMAIL` - Default sender for emails
- `BLOB_READ_WRITE_TOKEN` - For upload-to-storage
- `PDF_SERVICE_URL` - For create-pdf

## Contributing

To add a new step:

1. Create a new TypeScript file in this directory
2. Add the `'use step'` directive to your function
3. Include proper error handling with `FatalError`
4. Add TypeScript types and JSDoc comments
5. Update this README with your step
6. Submit to the registry for others to use
