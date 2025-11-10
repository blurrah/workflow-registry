/**
 * Create an entry in a Notion database
 *
 * @param databaseId - The database ID
 * @param properties - Object containing property names and values
 * @returns The created database entry with ID
 *
 * @env NOTION_API_KEY - Notion integration token
 */

import { FatalError } from "workflow"

interface CreateDatabaseEntryOptions {
  databaseId: string
  properties: Record<string, any>
}

export async function notionCreateDatabaseEntry({ databaseId, properties }: CreateDatabaseEntryOptions) {
  "use step"

  const apiKey = process.env.NOTION_API_KEY
  if (!apiKey) {
    throw new FatalError("NOTION_API_KEY environment variable is required")
  }

  if (!databaseId || !properties) {
    throw new FatalError("databaseId and properties are required")
  }

  // Convert simple values to Notion property format
  const notionProperties: Record<string, any> = {}
  for (const [key, value] of Object.entries(properties)) {
    if (typeof value === "string") {
      notionProperties[key] = {
        rich_text: [{ text: { content: value } }],
      }
    } else if (typeof value === "number") {
      notionProperties[key] = { number: value }
    } else if (typeof value === "boolean") {
      notionProperties[key] = { checkbox: value }
    } else {
      notionProperties[key] = value
    }
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: notionProperties,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create Notion database entry: ${error}`)
  }

  const data = await response.json()
  return {
    id: data.id,
    url: data.url,
    createdTime: data.created_time,
  }
}
