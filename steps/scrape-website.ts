import { FatalError } from "workflow"

interface ScrapeWebsiteOptions {
  url: string
  selector?: string
  waitFor?: number
}

/**
 * Scrape website content using Puppeteer
 *
 * @example
 * const data = await scrapeWebsite({
 *   url: 'https://example.com',
 *   selector: '.product-price',
 *   waitFor: 2000
 * });
 */
export async function scrapeWebsite(options: ScrapeWebsiteOptions) {
  "use step"

  const { url, selector, waitFor = 1000 } = options

  if (!url) {
    throw new FatalError("url is required")
  }

  // Validate URL
  try {
    new URL(url)
  } catch {
    throw new FatalError(`Invalid URL: ${url}`)
  }

  // Dynamic import puppeteer
  const puppeteer = (await import("puppeteer")).default

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })

  try {
    const page = await browser.newPage()

    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })

    // Wait for selector or timeout
    if (selector) {
      await page.waitForSelector(selector, { timeout: waitFor })
    } else if (waitFor > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitFor))
    }

    // Extract data
    const data = await page.evaluate((sel) => {
      if (sel) {
        const elements = Array.from(document.querySelectorAll(sel))
        return elements.map((el) => el.textContent?.trim())
      }
      return {
        title: document.title,
        body: document.body.innerText,
      }
    }, selector)

    return {
      url,
      data,
      timestamp: new Date().toISOString(),
    }
  } finally {
    await browser.close()
  }
}
