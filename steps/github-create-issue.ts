/**
 * Create an issue on GitHub
 *
 * @param owner - Repository owner (username or organization)
 * @param repo - Repository name
 * @param title - Issue title
 * @param body - Issue body content (supports Markdown)
 * @param labels - Optional array of label names
 * @returns The created issue with URL and number
 *
 * @env GITHUB_TOKEN - GitHub personal access token
 */

import { FatalError } from "workflow"

interface CreateIssueOptions {
  owner: string
  repo: string
  title: string
  body?: string
  labels?: string[]
}

export async function githubCreateIssue({ owner, repo, title, body, labels }: CreateIssueOptions) {
  "use step"

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new FatalError("GITHUB_TOKEN environment variable is required")
  }

  if (!owner || !repo || !title) {
    throw new FatalError("owner, repo, and title are required")
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/issues`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      labels,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create GitHub issue: ${error}`)
  }

  const data = await response.json()
  return {
    number: data.number,
    url: data.html_url,
    id: data.id,
    state: data.state,
  }
}
