/**
 * Create a pull request on GitHub
 *
 * @param owner - Repository owner (username or organization)
 * @param repo - Repository name
 * @param title - PR title
 * @param head - The branch containing changes
 * @param base - The branch to merge into
 * @param body - Optional PR description (supports Markdown)
 * @returns The created PR with URL and number
 *
 * @env GITHUB_TOKEN - GitHub personal access token
 */

import { FatalError } from "workflow"

interface CreatePROptions {
  owner: string
  repo: string
  title: string
  head: string
  base: string
  body?: string
}

export async function githubCreatePR({ owner, repo, title, head, base, body }: CreatePROptions) {
  "use step"

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new FatalError("GITHUB_TOKEN environment variable is required")
  }

  if (!owner || !repo || !title || !head || !base) {
    throw new FatalError("owner, repo, title, head, and base are required")
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/pulls`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      head,
      base,
      body,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create GitHub PR: ${error}`)
  }

  const data = await response.json()
  return {
    number: data.number,
    url: data.html_url,
    id: data.id,
    state: data.state,
  }
}
