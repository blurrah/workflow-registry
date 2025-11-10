import { FatalError } from "workflow"

/**
 * Get details about a Vercel deployment
 *
 * @param deploymentId - The deployment ID or URL
 * @returns Deployment details including status, URL, and metadata
 */
export async function getVercelDeployment(deploymentId: string) {
  "use step"

  const token = process.env.VERCEL_TOKEN
  if (!token) {
    throw new FatalError("VERCEL_TOKEN environment variable is required")
  }

  if (!deploymentId) {
    throw new FatalError("deploymentId is required")
  }

  const teamId = process.env.VERCEL_TEAM_ID
  const url = teamId
    ? `https://api.vercel.com/v13/deployments/${deploymentId}?teamId=${teamId}`
    : `https://api.vercel.com/v13/deployments/${deploymentId}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get deployment: ${error}`)
  }

  const deployment = await response.json()
  return {
    id: deployment.id,
    url: deployment.url,
    state: deployment.readyState,
    target: deployment.target,
    creator: deployment.creator,
    createdAt: deployment.createdAt,
    buildingAt: deployment.buildingAt,
    ready: deployment.ready,
  }
}
