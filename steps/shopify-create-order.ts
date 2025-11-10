/**
 * Create an order in Shopify
 *
 * @param shopDomain - Your Shopify shop domain (e.g., 'mystore.myshopify.com')
 * @param lineItems - Array of products with variant ID and quantity
 * @param customer - Optional customer information
 * @returns The created order with ID and order number
 *
 * @env SHOPIFY_ACCESS_TOKEN - Shopify Admin API access token
 */

import { FatalError } from "workflow"

interface LineItem {
  variantId: string
  quantity: number
}

interface Customer {
  email?: string
  firstName?: string
  lastName?: string
}

interface CreateOrderOptions {
  shopDomain: string
  lineItems: LineItem[]
  customer?: Customer
}

export async function shopifyCreateOrder({ shopDomain, lineItems, customer }: CreateOrderOptions) {
  "use step"

  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN
  if (!accessToken) {
    throw new FatalError("SHOPIFY_ACCESS_TOKEN environment variable is required")
  }

  if (!shopDomain || !lineItems?.length) {
    throw new FatalError("shopDomain and lineItems are required")
  }

  const url = `https://${shopDomain}/admin/api/2024-01/orders.json`

  const order = {
    line_items: lineItems.map((item) => ({
      variant_id: item.variantId,
      quantity: item.quantity,
    })),
    ...(customer && { customer }),
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create Shopify order: ${error}`)
  }

  const data = await response.json()
  return {
    id: data.order.id,
    orderNumber: data.order.order_number,
    totalPrice: data.order.total_price,
    createdAt: data.order.created_at,
  }
}
