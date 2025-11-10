import { FatalError } from "workflow"

interface SendDiscordWebhookParams {
  webhookUrl: string
  content?: string
  embeds?: Array<{
    title?: string
    description?: string
    color?: number
    fields?: Array<{ name: string; value: string; inline?: boolean }>
  }>
  username?: string
  avatarUrl?: string
}

/**
 * Send a message to Discord via webhook with automatic retries.
 *
 * This step is perfect for sending notifications, alerts, and updates
 * to Discord channels without needing a bot.
 *
 * @param webhookUrl - Discord webhook URL
 * @param content - Message text content
 * @param embeds - Rich embed objects for formatted messages
 * @param username - Override webhook username
 * @param avatarUrl - Override webhook avatar
 * @returns Success status
 */
export async function sendDiscordWebhook({
  webhookUrl,
  content,
  embeds,
  username,
  avatarUrl,
}: SendDiscordWebhookParams) {
  "use step"

  if (!webhookUrl || !webhookUrl.includes("discord.com/api/webhooks/")) {
    throw new FatalError("Invalid Discord webhook URL")
  }

  if (!content && (!embeds || embeds.length === 0)) {
    throw new FatalError("Must provide either content or embeds")
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        embeds,
        username,
        avatar_url: avatarUrl,
      }),
    })

    if (response.status === 404) {
      throw new FatalError("Webhook not found - check your webhook URL")
    }

    if (response.status === 400) {
      const error = await response.text()
      throw new FatalError(`Invalid webhook payload: ${error}`)
    }

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`)
    }

    return {
      success: true,
      status: response.status,
    }
  } catch (error: any) {
    if (error instanceof FatalError) {
      throw error
    }
    // Network errors should retry
    throw error
  }
}
