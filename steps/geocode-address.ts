import { FatalError } from "workflow"

interface GeocodeAddressOptions {
  address: string
  provider?: "google" | "opencage"
}

/**
 * Convert addresses to geographic coordinates
 *
 * @example
 * const location = await geocodeAddress({
 *   address: '1600 Amphitheatre Parkway, Mountain View, CA',
 *   provider: 'google'
 * });
 */
export async function geocodeAddress(options: GeocodeAddressOptions) {
  "use step"

  const { address, provider = "google" } = options

  if (!address) {
    throw new FatalError("address is required")
  }

  let apiKey: string | undefined
  let apiUrl: string

  if (provider === "google") {
    apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      throw new FatalError("GOOGLE_MAPS_API_KEY environment variable is required")
    }
    apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
  } else if (provider === "opencage") {
    apiKey = process.env.OPENCAGE_API_KEY
    if (!apiKey) {
      throw new FatalError("OPENCAGE_API_KEY environment variable is required")
    }
    apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`
  } else {
    throw new FatalError(`Unsupported geocoding provider: ${provider}`)
  }

  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.statusText}`)
  }

  const data = await response.json()

  if (provider === "google") {
    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      throw new Error(`No results found for address: ${address}`)
    }

    const result = data.results[0]
    return {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
      placeId: result.place_id,
      provider,
    }
  } else {
    if (!data.results || data.results.length === 0) {
      throw new Error(`No results found for address: ${address}`)
    }

    const result = data.results[0]
    return {
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
      formattedAddress: result.formatted,
      confidence: result.confidence,
      provider,
    }
  }
}
