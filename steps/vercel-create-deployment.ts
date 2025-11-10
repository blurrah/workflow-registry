import { FatalError } from "workflow"

/**
 * Create a new deployment on Vercel
 *
 * @param projectId - The Vercel project ID
 * @param gitRef - Git branch, commit SHA, or tag to deploy (optional, defaults to main)
 * @param target - Deployment target: 'production' or 'preview'
 * @returns Deployment object with URL and ID
 */
export async function createVercelDeployment(
  projectId: string,
  gitRef = "main",
  target: "production" | "preview" = "preview",
) {
  "use step"

  const token = process.env.VERCEL_TOKEN
  if (!token) {
    throw new FatalError("VERCEL_TOKEN environment variable is required")
  }

  const teamId = process.env.VERCEL_TEAM_ID
  const url = teamId
    ? `https://api.vercel.com/v13/deployments?teamId=${teamId}`
    : "https://api.vercel.com/v13/deployments"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectId,
      gitSource: {
        ref: gitRef,
        type: "github",
      },
      target,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create deployment: ${error}`)
  }

  const deployment = await response.json()
  return {
    id: deployment.id,
    url: deployment.url,
    readyState: deployment.readyState,
    target: deployment.target,
  }
}
