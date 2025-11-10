/**
 * Append a row to a Google Sheet
 *
 * @param spreadsheetId - The ID of the spreadsheet (from the URL)
 * @param sheetName - The name of the sheet/tab
 * @param values - Array of values to append as a row
 * @returns The updated range and values
 *
 * @env GOOGLE_SHEETS_API_KEY - Google Sheets API key
 */

import { FatalError } from "workflow"

interface AppendRowOptions {
  spreadsheetId: string
  sheetName: string
  values: string[]
}

export async function googleSheetsAppendRow({ spreadsheetId, sheetName, values }: AppendRowOptions) {
  "use step"

  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  if (!apiKey) {
    throw new FatalError("GOOGLE_SHEETS_API_KEY environment variable is required")
  }

  if (!spreadsheetId || !sheetName || !values?.length) {
    throw new FatalError("spreadsheetId, sheetName, and values are required")
  }

  const range = `${sheetName}!A:Z`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&key=${apiKey}`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [values],
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to append row to Google Sheet: ${error}`)
  }

  const data = await response.json()
  return {
    updatedRange: data.updates.updatedRange,
    updatedRows: data.updates.updatedRows,
  }
}
