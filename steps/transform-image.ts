import { FatalError } from "workflow"
import { Buffer } from "buffer"

interface TransformImageOptions {
  imageUrl: string
  width?: number
  height?: number
  format?: "jpeg" | "png" | "webp" | "avif"
  quality?: number
  fit?: "cover" | "contain" | "fill" | "inside" | "outside"
}

/**
 * Transform and optimize images using sharp
 *
 * @example
 * const buffer = await transformImage({
 *   imageUrl: 'https://example.com/image.jpg',
 *   width: 800,
 *   height: 600,
 *   format: 'webp',
 *   quality: 80
 * });
 */
export async function transformImage(options: TransformImageOptions) {
  "use step"

  const { imageUrl, width, height, format = "webp", quality = 80, fit = "cover" } = options

  if (!imageUrl) {
    throw new FatalError("imageUrl is required")
  }

  // Fetch the image
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Dynamic import sharp (server-side only)
  const sharp = (await import("sharp")).default

  let transformer = sharp(buffer)

  // Apply transformations
  if (width || height) {
    transformer = transformer.resize(width, height, { fit })
  }

  // Convert format
  switch (format) {
    case "jpeg":
      transformer = transformer.jpeg({ quality })
      break
    case "png":
      transformer = transformer.png({ quality })
      break
    case "webp":
      transformer = transformer.webp({ quality })
      break
    case "avif":
      transformer = transformer.avif({ quality })
      break
  }

  const transformedBuffer = await transformer.toBuffer()

  return {
    buffer: transformedBuffer,
    size: transformedBuffer.length,
    format,
    dimensions: width && height ? { width, height } : undefined,
  }
}
