import { FatalError } from "workflow"

/**
 * List deployments for a Vercel project
 *
 * @param projectId - The project ID or name
 * @param limit - Maximum number of deployments to return (default: 20)
 * @param state - Filter by deployment state: 'BUILDING', 'ERROR', 'INITIALIZING', 'QUEUED', 'READY', 'CANCELED'
 * @returns List of deployments with their details
 */
export async function listVercelDeployments(
  projectId: string,
  limit = 20,
  state?: "BUILDING" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY" | "CANCELED",
) {
  "use step"

  const token = process.env.VERCEL_TOKEN
  if (!token) {
    throw new FatalError("VERCEL_TOKEN environment variable is required")
  }

  if (!projectId) {
    throw new FatalError("projectId is required")
  }

  const teamId = process.env.VERCEL_TEAM_ID
  const params = new URLSearchParams({
    projectId,
    limit: limit.toString(),
    ...(teamId && { teamId }),
    ...(state && { state }),
  })

  const url = `https://api.vercel.com/v6/deployments?${params.toString()}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to list deployments: ${error}`)
  }

  const data = await response.json()
  return data.deployments.map((deployment: any) => ({
    id: deployment.uid,
    name: deployment.name,
    url: deployment.url,
    state: deployment.readyState,
    target: deployment.target,
    createdAt: deployment.createdAt,
  }))
}
