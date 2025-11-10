import { FatalError } from "workflow"

/**
 * Purge the cache for a Vercel deployment
 *
 * @param deploymentId - The deployment ID or URL
 * @returns Cache purge confirmation
 */
export async function purgeVercelCache(deploymentId: string) {
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
    ? `https://api.vercel.com/v1/deployments/${deploymentId}/cache?teamId=${teamId}`
    : `https://api.vercel.com/v1/deployments/${deploymentId}/cache`

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to purge cache: ${error}`)
  }

  return {
    deploymentId,
    cachePurged: true,
  }
}
