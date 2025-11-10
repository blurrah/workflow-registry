import { FatalError } from "workflow"

interface CreatePDFParams {
  html: string
  filename?: string
  options?: {
    format?: "A4" | "Letter"
    margin?: {
      top?: string
      right?: string
      bottom?: string
      left?: string
    }
  }
}

/**
 * Generate a PDF document from HTML content.
 *
 * This step converts HTML to PDF, useful for generating reports,
 * invoices, certificates, and other documents in your workflows.
 *
 * Note: This example uses a hypothetical PDF service. In production,
 * you would integrate with services like Puppeteer, Playwright, or
 * a PDF generation API.
 *
 * @param html - HTML content to convert to PDF
 * @param filename - Output filename
 * @param options - PDF generation options
 * @returns PDF buffer and metadata
 */
export async function createPDF({ html, filename = "document.pdf", options = {} }: CreatePDFParams) {
  "use step"

  if (!html || html.trim().length === 0) {
    throw new FatalError("HTML content cannot be empty")
  }

  const pdfServiceUrl = process.env.PDF_SERVICE_URL

  if (!pdfServiceUrl) {
    throw new FatalError("PDF_SERVICE_URL environment variable is not configured")
  }

  try {
    const response = await fetch(pdfServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html,
        options: {
          format: options.format || "A4",
          margin: options.margin || {
            top: "1cm",
            right: "1cm",
            bottom: "1cm",
            left: "1cm",
          },
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`PDF generation failed: ${response.status}`)
    }

    const buffer = await response.arrayBuffer()

    return {
      buffer: Buffer.from(buffer),
      filename,
      contentType: "application/pdf",
      size: buffer.byteLength,
    }
  } catch (error: any) {
    if (error.message?.includes("configuration") || error.message?.includes("unauthorized")) {
      throw new FatalError(`PDF service error: ${error.message}`)
    }

    throw error
  }
}
