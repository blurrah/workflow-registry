import { FatalError } from "workflow"

/**
 * Cancel a running Vercel deployment
 *
 * @param deploymentId - The deployment ID to cancel
 * @returns Cancellation confirmation
 */
export async function cancelVercelDeployment(deploymentId: string) {
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
    ? `https://api.vercel.com/v12/deployments/${deploymentId}/cancel?teamId=${teamId}`
    : `https://api.vercel.com/v12/deployments/${deploymentId}/cancel`

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to cancel deployment: ${error}`)
  }

  return {
    deploymentId,
    cancelled: true,
  }
}
