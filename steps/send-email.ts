import { Resend } from "resend"
import { FatalError } from "workflow"

interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
  from?: string
  replyTo?: string
}

/**
 * Send a transactional email using Resend with automatic retries.
 *
 * This step is perfect for sending confirmation emails, notifications,
 * and other automated communications from your workflows.
 *
 * @param to - Email recipient(s)
 * @param subject - Email subject line
 * @param html - HTML email body
 * @param from - Sender email (defaults to RESEND_FROM_EMAIL env var)
 * @param replyTo - Optional reply-to address
 * @returns Email ID from Resend
 */
export async function sendEmail({ to, subject, html, from, replyTo }: SendEmailParams) {
  "use step"

  const resendApiKey = process.env.RESEND_API_KEY
  const defaultFrom = process.env.RESEND_FROM_EMAIL || "noreply@example.com"

  if (!resendApiKey) {
    throw new FatalError("RESEND_API_KEY environment variable is not configured")
  }

  const resend = new Resend(resendApiKey)

  try {
    const { data, error } = await resend.emails.send({
      from: from || defaultFrom,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      reply_to: replyTo,
    })

    if (error) {
      throw new FatalError(`Email send failed: ${error.message}`)
    }

    return {
      id: data?.id,
      success: true,
    }
  } catch (error: any) {
    // Resend errors are typically not retryable
    throw new FatalError(error.message || "Failed to send email")
  }
}
