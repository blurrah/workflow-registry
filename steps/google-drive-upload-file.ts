/**
 * Upload a file to Google Drive
 *
 * @param fileName - Name for the uploaded file
 * @param fileContent - File content as string or buffer
 * @param mimeType - MIME type of the file
 * @param folderId - Optional parent folder ID
 * @returns The uploaded file details with ID and web link
 *
 * @env GOOGLE_DRIVE_API_KEY - Google Drive API key
 */

import { FatalError } from "workflow"

interface UploadFileOptions {
  fileName: string
  fileContent: string | Buffer
  mimeType: string
  folderId?: string
}

export async function googleDriveUploadFile({ fileName, fileContent, mimeType, folderId }: UploadFileOptions) {
  "use step"

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY
  if (!apiKey) {
    throw new FatalError("GOOGLE_DRIVE_API_KEY environment variable is required")
  }

  if (!fileName || !fileContent || !mimeType) {
    throw new FatalError("fileName, fileContent, and mimeType are required")
  }

  const metadata = {
    name: fileName,
    ...(folderId && { parents: [folderId] }),
  }

  const form = new FormData()
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }))
  form.append("file", new Blob([fileContent], { type: mimeType }))

  const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&key=${apiKey}`, {
    method: "POST",
    body: form,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to upload file to Google Drive: ${error}`)
  }

  const data = await response.json()
  return {
    id: data.id,
    name: data.name,
    webViewLink: `https://drive.google.com/file/d/${data.id}/view`,
  }
}
