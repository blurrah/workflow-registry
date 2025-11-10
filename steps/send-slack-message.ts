import { WebClient } from "@slack/web-api"
import { FatalError } from "workflow"

interface SendSlackMessageParams {
  channel: string
  text: string
  blocks?: any[]
}

/**
 * Send a message to a Slack channel with automatic retry logic.
 *
 * This step handles transient failures automatically but throws FatalError
 * for configuration issues like invalid tokens.
 *
 * @param channel - The Slack channel ID or name (e.g., '#general')
 * @param text - The message text to send
 * @param blocks - Optional Slack Block Kit blocks for rich formatting
 * @returns Message metadata including timestamp and channel
 */
export async function sendSlackMessage({ channel, text, blocks }: SendSlackMessageParams) {
  "use step"

  const slackToken = process.env.SLACK_BOT_TOKEN

  if (!slackToken) {
    throw new FatalError("SLACK_BOT_TOKEN environment variable is not configured")
  }

  const client = new WebClient(slackToken)

  try {
    const result = await client.chat.postMessage({
      channel,
      text,
      blocks,
    })

    return {
      ok: true,
      messageTs: result.ts,
      channel: result.channel,
    }
  } catch (error: any) {
    // Check if it's a fatal error (like invalid token or channel)
    if (error.data?.error === "invalid_auth" || error.data?.error === "not_in_channel") {
      throw new FatalError(`Slack error: ${error.data.error}`)
    }

    // Let transient errors (rate limits, network issues) retry automatically
    throw error
  }
}
