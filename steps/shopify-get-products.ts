/**
 * Get products from Shopify store
 *
 * @param shopDomain - Your Shopify shop domain (e.g., 'mystore.myshopify.com')
 * @param limit - Maximum number of products to return (default: 50)
 * @returns Array of products with details
 *
 * @env SHOPIFY_ACCESS_TOKEN - Shopify Admin API access token
 */

import { FatalError } from "workflow"

interface GetProductsOptions {
  shopDomain: string
  limit?: number
}

export async function shopifyGetProducts({ shopDomain, limit = 50 }: GetProductsOptions) {
  "use step"

  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN
  if (!accessToken) {
    throw new FatalError("SHOPIFY_ACCESS_TOKEN environment variable is required")
  }

  if (!shopDomain) {
    throw new FatalError("shopDomain is required")
  }

  const url = `https://${shopDomain}/admin/api/2024-01/products.json?limit=${limit}`

  const response = await fetch(url, {
    headers: {
      "X-Shopify-Access-Token": accessToken,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get Shopify products: ${error}`)
  }

  const data = await response.json()
  return {
    products: data.products.map((product: any) => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      variants: product.variants,
      images: product.images,
    })),
  }
}
