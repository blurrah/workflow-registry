import { FatalError } from "workflow"

/**
 * Get details about a Vercel project
 *
 * @param projectId - The project ID or name
 * @returns Project details including settings, environment variables count, and metadata
 */
export async function getVercelProject(projectId: string) {
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
    ? `https://api.vercel.com/v9/projects/${projectId}?teamId=${teamId}`
    : `https://api.vercel.com/v9/projects/${projectId}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get project: ${error}`)
  }

  const project = await response.json()
  return {
    id: project.id,
    name: project.name,
    framework: project.framework,
    devCommand: project.devCommand,
    buildCommand: project.buildCommand,
    outputDirectory: project.outputDirectory,
    updatedAt: project.updatedAt,
  }
}
