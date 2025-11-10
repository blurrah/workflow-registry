import { FatalError } from "workflow"

/**
 * Set an environment variable for a Vercel project
 *
 * @param projectId - The Vercel project ID or name
 * @param key - Environment variable key
 * @param value - Environment variable value
 * @param targets - Target environments (production, preview, development)
 * @param type - Variable type: 'encrypted', 'plain', or 'secret'
 * @returns Created environment variable
 */
export async function setVercelEnvVar(
  projectId: string,
  key: string,
  value: string,
  targets: ("production" | "preview" | "development")[] = ["production", "preview", "development"],
  type: "encrypted" | "plain" | "secret" = "encrypted",
) {
  "use step"

  const token = process.env.VERCEL_TOKEN
  if (!token) {
    throw new FatalError("VERCEL_TOKEN environment variable is required")
  }

  if (!key || !value) {
    throw new FatalError("Both key and value are required")
  }

  const teamId = process.env.VERCEL_TEAM_ID
  const url = teamId
    ? `https://api.vercel.com/v10/projects/${projectId}/env?teamId=${teamId}&upsert=true`
    : `https://api.vercel.com/v10/projects/${projectId}/env?upsert=true`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
      value,
      target: targets,
      type,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to set environment variable: ${error}`)
  }

  return await response.json()
}
