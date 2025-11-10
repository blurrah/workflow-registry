import { FatalError } from "workflow"

/**
 * Set a value in Vercel Edge Config
 *
 * @param key - The key to set
 * @param value - The value to store (must be JSON serializable)
 * @param edgeConfigId - Optional Edge Config ID (uses EDGE_CONFIG_ID env var if not provided)
 * @returns Confirmation of the set operation
 */
export async function setEdgeConfigValue(key: string, value: any, edgeConfigId?: string) {
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
    ? `https://api.vercel.com/v1/edge-config/${configId}/items?teamId=${teamId}`
    : `https://api.vercel.com/v1/edge-config/${configId}/items`

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          operation: "upsert",
          key,
          value,
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to set Edge Config value: ${error}`)
  }

  return {
    key,
    success: true,
  }
}
