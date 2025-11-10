/**
 * Send a message via Telegram Bot
 *
 * @param chatId - The chat ID (user, group, or channel)
 * @param text - Message text (supports Markdown)
 * @param parseMode - Optional parse mode: 'Markdown' or 'HTML'
 * @returns The sent message details
 *
 * @env TELEGRAM_BOT_TOKEN - Telegram bot token from @BotFather
 */

import { FatalError } from "workflow"

interface SendMessageOptions {
  chatId: string | number
  text: string
  parseMode?: "Markdown" | "HTML"
}

export async function telegramSendMessage({ chatId, text, parseMode }: SendMessageOptions) {
  "use step"

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) {
    throw new FatalError("TELEGRAM_BOT_TOKEN environment variable is required")
  }

  if (!chatId || !text) {
    throw new FatalError("chatId and text are required")
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: parseMode,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to send Telegram message: ${error}`)
  }

  const data = await response.json()
  return {
    messageId: data.result.message_id,
    chatId: data.result.chat.id,
    date: data.result.date,
  }
}
