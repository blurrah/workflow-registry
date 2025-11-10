/**
 * Create a record in Airtable
 *
 * @param baseId - The Airtable base ID
 * @param tableId - The table name or ID
 * @param fields - Object containing field names and values
 * @returns The created record with ID
 *
 * @env AIRTABLE_API_KEY - Airtable personal access token
 */

import { FatalError } from "workflow"

interface CreateRecordOptions {
  baseId: string
  tableId: string
  fields: Record<string, any>
}

export async function airtableCreateRecord({ baseId, tableId, fields }: CreateRecordOptions) {
  "use step"

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) {
    throw new FatalError("AIRTABLE_API_KEY environment variable is required")
  }

  if (!baseId || !tableId || !fields) {
    throw new FatalError("baseId, tableId, and fields are required")
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create Airtable record: ${error}`)
  }

  const data = await response.json()
  return {
    id: data.id,
    fields: data.fields,
    createdTime: data.createdTime,
  }
}
