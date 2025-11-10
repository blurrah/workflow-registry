import { FatalError } from "workflow"

interface ParseCSVOptions {
  csvData: string | Buffer
  delimiter?: string
  hasHeader?: boolean
  skipEmptyLines?: boolean
}

/**
 * Parse CSV data into structured JSON
 *
 * @example
 * const data = await parseCSV({
 *   csvData: csvString,
 *   hasHeader: true,
 *   delimiter: ','
 * });
 */
export async function parseCSV(options: ParseCSVOptions) {
  "use step"

  const { csvData, delimiter = ",", hasHeader = true, skipEmptyLines = true } = options

  if (!csvData) {
    throw new FatalError("csvData is required")
  }

  const content = typeof csvData === "string" ? csvData : csvData.toString("utf-8")

  // Simple CSV parser (for production, consider using a library like papaparse)
  const lines = content.split("\n").filter((line) => {
    return !skipEmptyLines || line.trim().length > 0
  })

  if (lines.length === 0) {
    throw new FatalError("CSV data is empty")
  }

  const parseRow = (row: string): string[] => {
    const values: string[] = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < row.length; i++) {
      const char = row[i]
      const nextChar = row[i + 1]

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"'
          i++ // Skip next quote
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === delimiter && !inQuotes) {
        values.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    values.push(current.trim())

    return values
  }

  let headers: string[] = []
  let startIndex = 0

  if (hasHeader) {
    headers = parseRow(lines[0])
    startIndex = 1
  }

  const rows = lines.slice(startIndex).map((line) => {
    const values = parseRow(line)

    if (hasHeader) {
      const obj: Record<string, string> = {}
      headers.forEach((header, index) => {
        obj[header] = values[index] || ""
      })
      return obj
    }

    return values
  })

  return {
    headers: hasHeader ? headers : undefined,
    rows,
    rowCount: rows.length,
  }
}
