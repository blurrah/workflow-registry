import { generateText } from "ai"
import { FatalError } from "workflow"

interface GenerateAIContentParams {
  prompt: string
  model?: string
  maxTokens?: number
  temperature?: number
}

/**
 * Generate AI content using Vercel AI SDK with automatic retry logic.
 *
 * This step uses the Vercel AI Gateway by default, which supports multiple
 * providers without requiring individual API keys.
 *
 * @param prompt - The prompt to send to the AI model
 * @param model - Model to use (default: 'openai/gpt-4-turbo')
 * @param maxTokens - Maximum tokens in response
 * @param temperature - Creativity level (0-2)
 * @returns Generated text content
 */
export async function generateAIContent({
  prompt,
  model = "openai/gpt-4-turbo",
  maxTokens = 500,
  temperature = 0.7,
}: GenerateAIContentParams) {
  "use step"

  if (!prompt || prompt.trim().length === 0) {
    throw new FatalError("Prompt cannot be empty")
  }

  try {
    const { text } = await generateText({
      model,
      prompt,
      maxTokens,
      temperature,
    })

    return {
      text,
      model,
      tokensUsed: text.length, // Approximate
    }
  } catch (error: any) {
    // Check for fatal errors like invalid model
    if (error.message?.includes("model not found") || error.message?.includes("invalid model")) {
      throw new FatalError(`Invalid model: ${model}`)
    }

    // Let rate limits and transient errors retry
    throw error
  }
}
