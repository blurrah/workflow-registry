import { FatalError } from "workflow"

interface SendWebhookOptions {
  url: string
  payload: Record<string, any>
  method?: "POST" | "PUT" | "PATCH"
  headers?: Record<string, string>
  secret?: string
}

/**
 * Send webhook notifications with signature verification
 *
 * @example
 * const response = await sendWebhook({
 *   url: 'https://api.example.com/webhook',
 *   payload: { event: 'user.created', userId: '123' },
 *   secret: process.env.WEBHOOK_SECRET
 * });
 */
export async function sendWebhook(options: SendWebhookOptions) {
  "use step"

  const { url, payload, method = "POST", headers = {}, secret } = options

  if (!url) {
    throw new FatalError("url is required")
  }

  if (!payload) {
    throw new FatalError("payload is required")
  }

  const body = JSON.stringify(payload)
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  }

  // Add signature if secret is provided
  if (secret) {
    const crypto = await import("crypto")
    const signature = crypto.createHmac("sha256", secret).update(body).digest("hex")
    requestHeaders["X-Webhook-Signature"] = signature
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Webhook failed (${response.status}): ${errorText}`)
  }

  const responseData = response.headers.get("content-type")?.includes("json")
    ? await response.json()
    : await response.text()

  return {
    status: response.status,
    statusText: response.statusText,
    data: responseData,
  }
}
