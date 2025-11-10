import { FatalError } from "workflow"

interface FetchAPIDataParams {
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

/**
 * Fetch data from an external API with automatic retries for transient failures.
 *
 * This step handles network errors, timeouts, and rate limits automatically
 * by retrying the request. It throws FatalError for 4xx client errors that
 * shouldn't be retried.
 *
 * @param url - The API endpoint URL
 * @param method - HTTP method (default: 'GET')
 * @param headers - HTTP headers to include
 * @param body - Request body for POST/PUT/PATCH
 * @param timeout - Request timeout in milliseconds (default: 30000)
 * @returns Parsed JSON response
 */
export async function fetchAPIData({ url, method = "GET", headers = {}, body, timeout = 30000 }: FetchAPIDataParams) {
  "use step"

  if (!url || !url.startsWith("http")) {
    throw new FatalError("Invalid URL provided")
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // 4xx errors are client errors and should not be retried
    if (response.status >= 400 && response.status < 500) {
      const errorText = await response.text()
      throw new FatalError(`API client error (${response.status}): ${errorText}`)
    }

    // 5xx errors and network issues will retry automatically
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      data,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    }
  } catch (error: any) {
    clearTimeout(timeoutId)

    if (error.name === "AbortError") {
      throw new Error("Request timeout - will retry")
    }

    throw error
  }
}
