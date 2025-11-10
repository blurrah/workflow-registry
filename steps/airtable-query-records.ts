/**
 * Query records from Airtable with filtering
 *
 * @param baseId - The Airtable base ID
 * @param tableId - The table name or ID
 * @param filterByFormula - Optional Airtable formula for filtering
 * @param maxRecords - Maximum number of records to return
 * @returns Array of matching records
 *
 * @env AIRTABLE_API_KEY - Airtable personal access token
 */

import { FatalError } from "workflow"

interface QueryRecordsOptions {
  baseId: string
  tableId: string
  filterByFormula?: string
  maxRecords?: number
}

export async function airtableQueryRecords({
  baseId,
  tableId,
  filterByFormula,
  maxRecords = 100,
}: QueryRecordsOptions) {
  "use step"

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) {
    throw new FatalError("AIRTABLE_API_KEY environment variable is required")
  }

  if (!baseId || !tableId) {
    throw new FatalError("baseId and tableId are required")
  }

  const params = new URLSearchParams()
  if (filterByFormula) params.append("filterByFormula", filterByFormula)
  params.append("maxRecords", maxRecords.toString())

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}?${params}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to query Airtable records: ${error}`)
  }

  const data = await response.json()
  return {
    records: data.records.map((record: any) => ({
      id: record.id,
      fields: record.fields,
      createdTime: record.createdTime,
    })),
  }
}
