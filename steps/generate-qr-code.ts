import { FatalError } from "workflow"

interface GenerateQRCodeOptions {
  data: string
  size?: number
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"
  margin?: number
}

/**
 * Generate QR codes for URLs, text, or structured data
 *
 * @example
 * const qrCode = await generateQRCode({
 *   data: 'https://example.com',
 *   size: 300,
 *   errorCorrectionLevel: 'H'
 * });
 */
export async function generateQRCode(options: GenerateQRCodeOptions) {
  "use step"

  const { data, size = 200, errorCorrectionLevel = "M", margin = 4 } = options

  if (!data) {
    throw new FatalError("data is required")
  }

  if (size < 100 || size > 2000) {
    throw new FatalError("size must be between 100 and 2000 pixels")
  }

  // Dynamic import QR code library
  const QRCode = (await import("qrcode")).default

  try {
    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(data, {
      errorCorrectionLevel,
      margin,
      width: size,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })

    // Also generate as buffer for storage
    const qrBuffer = await QRCode.toBuffer(data, {
      errorCorrectionLevel,
      margin,
      width: size,
    })

    return {
      dataUrl: qrDataUrl,
      buffer: qrBuffer,
      size,
      data,
      errorCorrectionLevel,
    }
  } catch (error) {
    throw new FatalError(`Failed to generate QR code: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
