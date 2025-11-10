import { FatalError } from "workflow"

interface SendSMSOptions {
  to: string
  message: string
  from?: string
}

/**
 * Send SMS messages using Twilio
 *
 * @example
 * const result = await sendSMS({
 *   to: '+1234567890',
 *   message: 'Your verification code is 123456',
 *   from: '+0987654321'
 * });
 */
export async function sendSMS(options: SendSMSOptions) {
  "use step"

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const defaultFrom = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken) {
    throw new FatalError("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required")
  }

  const { to, message, from = defaultFrom } = options

  if (!from) {
    throw new FatalError("from phone number is required (either as parameter or TWILIO_PHONE_NUMBER env var)")
  }

  // Validate phone numbers
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  if (!phoneRegex.test(to)) {
    throw new FatalError(`Invalid recipient phone number: ${to}`)
  }

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: to,
      From: from,
      Body: message,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to send SMS: ${error.message}`)
  }

  const result = await response.json()

  return {
    sid: result.sid,
    status: result.status,
    to: result.to,
    from: result.from,
  }
}
