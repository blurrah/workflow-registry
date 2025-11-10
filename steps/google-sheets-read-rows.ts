/**
 * Read rows from a Google Sheet
 *
 * @param spreadsheetId - The ID of the spreadsheet (from the URL)
 * @param sheetName - The name of the sheet/tab
 * @param range - Optional range (e.g., "A1:D10"), defaults to all data
 * @returns Array of rows with values
 *
 * @env GOOGLE_SHEETS_API_KEY - Google Sheets API key
 */

import { FatalError } from "workflow"

interface ReadRowsOptions {
  spreadsheetId: string
  sheetName: string
  range?: string
}

export async function googleSheetsReadRows({ spreadsheetId, sheetName, range }: ReadRowsOptions) {
  "use step"

  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  if (!apiKey) {
    throw new FatalError("GOOGLE_SHEETS_API_KEY environment variable is required")
  }

  if (!spreadsheetId || !sheetName) {
    throw new FatalError("spreadsheetId and sheetName are required")
  }

  const fullRange = range ? `${sheetName}!${range}` : `${sheetName}`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(fullRange)}?key=${apiKey}`

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to read Google Sheet: ${error}`)
  }

  const data = await response.json()
  return {
    range: data.range,
    values: data.values || [],
  }
}
