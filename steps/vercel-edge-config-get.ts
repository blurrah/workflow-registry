import { FatalError } from "workflow"

/**
 * Get a value from Vercel Edge Config
 *
 * @param key - The key to retrieve
 * @param edgeConfigId - Optional Edge Config ID (uses EDGE_CONFIG env var if not provided)
 * @returns The value stored at the key
 */
export async function getEdgeConfigValue(key: string, edgeConfigId?: string) {
  "use step"

  const token = process.env.VERCEL_TOKEN
  const configId = edgeConfigId || process.env.EDGE_CONFIG_ID

  if (!token) {
    throw new FatalError("VERCEL_TOKEN environment variable is required")
  }

  if (!configId) {
    throw new FatalError("EDGE_CONFIG_ID environment variable or edgeConfigId parameter is required")
  }

  if (!key) {
    throw new FatalError("key is required")
  }

  const teamId = process.env.VERCEL_TEAM_ID
  const url = teamId
    ? `https://api.vercel.com/v1/edge-config/${configId}/item/${key}?teamId=${teamId}`
    : `https://api.vercel.com/v1/edge-config/${configId}/item/${key}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    const error = await response.text()
    throw new Error(`Failed to get Edge Config value: ${error}`)
  }

  return await response.json()
}
