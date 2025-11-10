import { NextResponse } from "next/server"
import * as fs from "fs"
import * as path from "path"

const stepMetadata: Record<string, any> = {
  "send-slack-message": {
    name: "send-slack-message",
    type: "registry:step",
    description: "Send messages to Slack channels with retry logic and error handling",
    dependencies: ["@slack/web-api"],
    files: [
      {
        name: "steps/send-slack-message.ts",
        type: "registry:step",
      },
    ],
  },
  "send-email": {
    name: "send-email",
    type: "registry:step",
    description: "Send transactional emails via Resend with automatic retries",
    dependencies: ["resend"],
    files: [
      {
        name: "steps/send-email.ts",
        type: "registry:step",
      },
    ],
  },
  "generate-ai-content": {
    name: "generate-ai-content",
    type: "registry:step",
    description: "Generate content using AI models with the Vercel AI SDK",
    dependencies: ["ai"],
    files: [
      {
        name: "steps/generate-ai-content.ts",
        type: "registry:step",
      },
    ],
  },
  "fetch-api-data": {
    name: "fetch-api-data",
    type: "registry:step",
    description: "Fetch data from external APIs with automatic retries",
    dependencies: [],
    files: [
      {
        name: "steps/fetch-api-data.ts",
        type: "registry:step",
      },
    ],
  },
  "validate-data": {
    name: "validate-data",
    type: "registry:step",
    description: "Validate data using Zod schemas with clear error messages",
    dependencies: ["zod"],
    files: [
      {
        name: "steps/validate-data.ts",
        type: "registry:step",
      },
    ],
  },
  "upload-to-storage": {
    name: "upload-to-storage",
    type: "registry:step",
    description: "Upload files to Vercel Blob storage with progress tracking",
    dependencies: ["@vercel/blob"],
    files: [
      {
        name: "steps/upload-to-storage.ts",
        type: "registry:step",
      },
    ],
  },
  "send-discord-webhook": {
    name: "send-discord-webhook",
    type: "registry:step",
    description: "Send messages to Discord channels via webhooks",
    dependencies: [],
    files: [
      {
        name: "steps/send-discord-webhook.ts",
        type: "registry:step",
      },
    ],
  },
  "create-pdf": {
    name: "create-pdf",
    type: "registry:step",
    description: "Generate PDF documents from HTML templates",
    dependencies: [],
    files: [
      {
        name: "steps/create-pdf.ts",
        type: "registry:step",
      },
    ],
  },
}

export async function GET(request: Request, context: { params: Promise<{ name: string[] }> }) {
  const { name } = await context.params
  const stepName = name.join("/")

  const metadata = stepMetadata[stepName]

  if (!metadata) {
    return NextResponse.json({ error: "Step not found" }, { status: 404 })
  }

  // Read the step code from the filesystem
  const stepFilePath = path.join(process.cwd(), "steps", `${stepName}.ts`)

  let content = ""
  try {
    content = fs.readFileSync(stepFilePath, "utf-8")
  } catch (error) {
    return NextResponse.json({ error: "Step code not found" }, { status: 404 })
  }

  // Return in shadcn registry format
  return NextResponse.json({
    name: metadata.name,
    type: metadata.type,
    files: [
      {
        name: `steps/${stepName}.ts`,
        content: content,
      },
    ],
    dependencies: metadata.dependencies,
  })
}
