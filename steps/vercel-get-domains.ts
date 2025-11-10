import { FatalError } from "workflow"

/**
 * Get all domains for a Vercel project
 *
 * @param projectId - The project ID or name
 * @returns List of domains with their configuration
 */
export async function getVercelDomains(projectId: string) {
  "use step"

  const token = process.env.VERCEL_TOKEN
  if (!token) {
    throw new FatalError("VERCEL_TOKEN environment variable is required")
  }

  if (!projectId) {
    throw new FatalError("projectId is required")
  }

  const teamId = process.env.VERCEL_TEAM_ID
  const url = teamId
    ? `https://api.vercel.com/v9/projects/${projectId}/domains?teamId=${teamId}`
    : `https://api.vercel.com/v9/projects/${projectId}/domains`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get domains: ${error}`)
  }

  const data = await response.json()
  return data.domains.map((domain: any) => ({
    name: domain.name,
    verified: domain.verified,
    primary: domain.primary,
    redirect: domain.redirect,
    redirectStatusCode: domain.redirectStatusCode,
  }))
}
