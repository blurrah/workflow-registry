import { FatalError } from "workflow"

interface CompressFileOptions {
  input: Buffer | string
  format?: "gzip" | "brotli" | "deflate"
  level?: number
}

/**
 * Compress data using various compression algorithms
 *
 * @example
 * const compressed = await compressFile({
 *   input: largeTextData,
 *   format: 'gzip',
 *   level: 9
 * });
 */
export async function compressFile(options: CompressFileOptions) {
  "use step"

  const { input, format = "gzip", level = 6 } = options

  if (!input) {
    throw new FatalError("input is required")
  }

  const { promisify } = await import("util")
  const zlib = await import("zlib")

  const buffer = typeof input === "string" ? Buffer.from(input) : input
  const originalSize = buffer.length

  let compressed: Buffer

  try {
    switch (format) {
      case "gzip":
        const gzip = promisify(zlib.gzip)
        compressed = await gzip(buffer, { level })
        break
      case "brotli":
        const brotli = promisify(zlib.brotliCompress)
        compressed = await brotli(buffer, {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: level,
          },
        })
        break
      case "deflate":
        const deflate = promisify(zlib.deflate)
        compressed = await deflate(buffer, { level })
        break
      default:
        throw new FatalError(`Unsupported compression format: ${format}`)
    }
  } catch (error) {
    throw new FatalError(`Compression failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }

  const compressedSize = compressed.length
  const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(2)

  return {
    compressed,
    originalSize,
    compressedSize,
    compressionRatio: `${compressionRatio}%`,
    format,
  }
}
