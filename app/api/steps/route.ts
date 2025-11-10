import { NextResponse } from "next/server"

// This would typically come from a database
const allSteps = [
  {
    name: "send-slack-message",
    title: "Send Slack Message",
    description: "Send messages to Slack channels with retry logic and error handling",
    category: "notifications",
    author: "Workflow Elements",
  },
  {
    name: "send-email",
    title: "Send Email",
    description: "Send transactional emails via Resend with automatic retries",
    category: "notifications",
    author: "Workflow Elements",
  },
  {
    name: "generate-ai-content",
    title: "Generate AI Content",
    description: "Generate content using AI models with the Vercel AI SDK",
    category: "ai",
    author: "Workflow Elements",
  },
  {
    name: "fetch-api-data",
    title: "Fetch API Data",
    description: "Fetch data from external APIs with automatic retries",
    category: "data",
    author: "Workflow Elements",
  },
  {
    name: "validate-data",
    title: "Validate Data",
    description: "Validate data using Zod schemas with clear error messages",
    category: "data",
    author: "Workflow Elements",
  },
  {
    name: "upload-to-storage",
    title: "Upload to Storage",
    description: "Upload files to Vercel Blob storage with progress tracking",
    category: "storage",
    author: "Workflow Elements",
  },
  {
    name: "send-discord-webhook",
    title: "Send Discord Webhook",
    description: "Send messages to Discord channels via webhooks",
    category: "notifications",
    author: "Community",
  },
  {
    name: "create-pdf",
    title: "Create PDF Document",
    description: "Generate PDF documents from HTML templates",
    category: "documents",
    author: "Workflow Elements",
  },
]

export async function GET() {
  return NextResponse.json({ steps: allSteps })
}
