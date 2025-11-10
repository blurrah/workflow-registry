/**
 * Create a page in Notion
 *
 * @param parentPageId - The parent page or database ID
 * @param title - The page title
 * @param content - Array of content blocks
 * @returns The created page with ID
 *
 * @env NOTION_API_KEY - Notion integration token
 */

import { FatalError } from "workflow"

interface CreatePageOptions {
  parentPageId: string
  title: string
  content?: Array<{
    type: "paragraph" | "heading_1" | "heading_2" | "heading_3"
    text: string
  }>
}

export async function notionCreatePage({ parentPageId, title, content = [] }: CreatePageOptions) {
  "use step"

  const apiKey = process.env.NOTION_API_KEY
  if (!apiKey) {
    throw new FatalError("NOTION_API_KEY environment variable is required")
  }

  if (!parentPageId || !title) {
    throw new FatalError("parentPageId and title are required")
  }

  const children = content.map((block) => ({
    object: "block",
    type: block.type,
    [block.type]: {
      rich_text: [
        {
          type: "text",
          text: { content: block.text },
        },
      ],
    },
  }))

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { page_id: parentPageId },
      properties: {
        title: {
          title: [
            {
              text: { content: title },
            },
          ],
        },
      },
      children,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create Notion page: ${error}`)
  }

  const data = await response.json()
  return {
    id: data.id,
    url: data.url,
    createdTime: data.created_time,
  }
}
