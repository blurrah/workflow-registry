import { put } from "@vercel/blob"
import { FatalError } from "workflow"

interface UploadToStorageParams {
  filename: string
  content: string | Buffer | ReadableStream
  contentType?: string
  access?: "public" | "private"
}

/**
 * Upload a file to Vercel Blob storage with automatic retries.
 *
 * This step handles file uploads to cloud storage, making it easy to
 * store generated files, user uploads, or processed data.
 *
 * @param filename - Name for the file in storage
 * @param content - File content (string, Buffer, or stream)
 * @param contentType - MIME type (e.g., 'image/png', 'application/pdf')
 * @param access - Access level ('public' or 'private')
 * @returns URL of the uploaded file
 */
export async function uploadToStorage({
  filename,
  content,
  contentType = "application/octet-stream",
  access = "public",
}: UploadToStorageParams) {
  "use step"

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN

  if (!blobToken) {
    throw new FatalError("BLOB_READ_WRITE_TOKEN environment variable is not configured")
  }

  if (!filename || filename.length === 0) {
    throw new FatalError("Filename cannot be empty")
  }

  try {
    const blob = await put(filename, content, {
      access,
      contentType,
      token: blobToken,
    })

    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: blob.size,
    }
  } catch (error: any) {
    // Most blob errors are configuration issues
    if (error.message?.includes("token") || error.message?.includes("unauthorized")) {
      throw new FatalError(`Storage upload failed: ${error.message}`)
    }

    // Network errors should retry
    throw error
  }
}
