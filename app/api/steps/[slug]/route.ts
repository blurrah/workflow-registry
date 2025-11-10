import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"

// In production, this would come from a database
const stepMetadata: Record<string, any> = {
  "send-slack-message": {
    name: "send-slack-message",
    title: "Send Slack Message",
    description: "Send messages to Slack channels with automatic retry logic and comprehensive error handling",
    category: "notifications",
    author: "Workflow Elements",
    installation: "npx workflow-registry add send-slack-message",
    dependencies: ["@slack/web-api"],
    envVars: [{ name: "SLACK_BOT_TOKEN", description: "Your Slack Bot User OAuth Token" }],
    usage: `import { sendSlackMessage } from './steps/send-slack-message';

export async function notifyTeam(message: string) {
  'use workflow';

  const result = await sendSlackMessage({
    channel: '#general',
    text: message,
  });

  return result;
}`,
  },
  "send-email": {
    name: "send-email",
    title: "Send Email",
    description: "Send transactional emails using Resend with automatic retries",
    category: "notifications",
    author: "Workflow Elements",
    installation: "npx workflow-registry add send-email",
    dependencies: ["resend"],
    envVars: [
      { name: "RESEND_API_KEY", description: "Your Resend API key" },
      { name: "RESEND_FROM_EMAIL", description: "Default sender email address" },
    ],
    usage: `import { sendEmail } from './steps/send-email';

export async function sendWelcomeEmail(email: string) {
  'use workflow';

  await sendEmail({
    to: email,
    subject: 'Welcome!',
    html: '<h1>Welcome to our service</h1>',
  });
}`,
  },
  "generate-ai-content": {
    name: "generate-ai-content",
    title: "Generate AI Content",
    description: "Generate content using AI models with the Vercel AI SDK",
    category: "ai",
    author: "Workflow Elements",
    installation: "npx workflow-registry add generate-ai-content",
    dependencies: ["ai"],
    envVars: [],
    usage: `import { generateAIContent } from './steps/generate-ai-content';

export async function createBlogPost(topic: string) {
  'use workflow';

  const content = await generateAIContent({
    prompt: \`Write a blog post about \${topic}\`,
  });

  return content.text;
}`,
  },
  "fetch-api-data": {
    name: "fetch-api-data",
    title: "Fetch API Data",
    description: "Fetch data from external APIs with automatic retries",
    category: "data",
    author: "Workflow Elements",
    installation: "npx workflow-registry add fetch-api-data",
    dependencies: [],
    envVars: [],
    usage: `import { fetchAPIData } from './steps/fetch-api-data';

export async function getUserData(userId: string) {
  'use workflow';

  const result = await fetchAPIData({
    url: \`https://api.example.com/users/\${userId}\`,
  });

  return result.data;
}`,
  },
  "validate-data": {
    name: "validate-data",
    title: "Validate Data",
    description: "Validate data using Zod schemas with clear error messages",
    category: "data",
    author: "Workflow Elements",
    installation: "npx workflow-registry add validate-data",
    dependencies: ["zod"],
    envVars: [],
    usage: `import { validateData } from './steps/validate-data';
import { z } from 'zod';

export async function processUserInput(input: unknown) {
  'use workflow';

  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
  });

  const result = await validateData({
    data: input,
    schema,
  });

  return result.data;
}`,
  },
  "upload-to-storage": {
    name: "upload-to-storage",
    title: "Upload to Storage",
    description: "Upload files to Vercel Blob storage with progress tracking",
    category: "storage",
    author: "Workflow Elements",
    installation: "npx workflow-registry add upload-to-storage",
    dependencies: ["@vercel/blob"],
    envVars: [{ name: "BLOB_READ_WRITE_TOKEN", description: "Vercel Blob storage token" }],
    usage: `import { uploadToStorage } from './steps/upload-to-storage';

export async function saveGeneratedFile(content: string) {
  'use workflow';

  const result = await uploadToStorage({
    filename: 'report.txt',
    content: Buffer.from(content),
    contentType: 'text/plain',
  });

  return result.url;
}`,
  },
  "send-discord-webhook": {
    name: "send-discord-webhook",
    title: "Send Discord Webhook",
    description: "Send messages to Discord channels via webhooks",
    category: "notifications",
    author: "Community",
    installation: "npx workflow-registry add send-discord-webhook",
    dependencies: [],
    envVars: [{ name: "DISCORD_WEBHOOK_URL", description: "Your Discord webhook URL" }],
    usage: `import { sendDiscordWebhook } from './steps/send-discord-webhook';

export async function notifyDiscord(message: string) {
  'use workflow';

  await sendDiscordWebhook({
    webhookUrl: process.env.DISCORD_WEBHOOK_URL!,
    content: message,
  });
}`,
  },
  "create-pdf": {
    name: "create-pdf",
    title: "Create PDF Document",
    description: "Generate PDF documents from HTML templates",
    category: "documents",
    author: "Workflow Elements",
    installation: "npx workflow-registry add create-pdf",
    dependencies: [],
    envVars: [{ name: "PDF_SERVICE_URL", description: "PDF generation service endpoint" }],
    usage: `import { createPDF } from './steps/create-pdf';

export async function generateInvoice(data: any) {
  'use workflow';

  const html = \`<h1>Invoice</h1><p>Total: \${data.total}</p>\`;

  const pdf = await createPDF({
    html,
    filename: 'invoice.pdf',
  });

  return pdf;
}`,
  },
}

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params

  const metadata = stepMetadata[slug]

  if (!metadata) {
    return NextResponse.json({ error: "Step not found" }, { status: 404 })
  }

  // Read the step code from the filesystem
  const stepFilePath = path.join(process.cwd(), "steps", `${slug}.ts`)

  let code = ""
  try {
    code = fs.readFileSync(stepFilePath, "utf-8")
  } catch (error) {
    return NextResponse.json({ error: "Step code not found" }, { status: 404 })
  }

  return NextResponse.json({
    ...metadata,
    code,
  })
}
