import { redirect } from "next/navigation"
import { headers, cookies } from "next/headers"

export interface RedirectOptions {
  permanent?: boolean
  preserveQuery?: boolean
  addQuery?: Record<string, string>
}

// Enhanced redirect with query parameter handling
export function redirectWithQuery(path: string, options: RedirectOptions = {}): never {
  const { preserveQuery = false, addQuery = {} } = options

  let finalPath = path

  if (preserveQuery || Object.keys(addQuery).length > 0) {
    const url = new URL(path, "http://localhost")

    // Add new query parameters
    Object.entries(addQuery).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    finalPath = url.pathname + url.search
  }

  redirect(finalPath)
}

// Redirect with flash message
export async function redirectWithMessage(
  path: string,
  message: string,
  type: "success" | "error" | "info" = "info",
): Promise<never> {
  const cookieStore = await cookies()

  // Set flash message cookie
  cookieStore.set("flash-message", JSON.stringify({ message, type }), {
    httpOnly: true,
    maxAge: 60, // 1 minute
    sameSite: "lax",
  })

  redirect(path)
}

// Conditional redirect based on user agent
export async function redirectBasedOnDevice(mobileUrl: string, desktopUrl: string): Promise<never> {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)

  redirect(isMobile ? mobileUrl : desktopUrl)
}

// Redirect with rate limiting check
export async function redirectWithRateLimit(
  path: string,
  rateLimitKey: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000, // 15 minutes
): Promise<never> {
  const cookieStore = await cookies()
  const rateLimitCookie = cookieStore.get(`rate-limit-${rateLimitKey}`)

  if (rateLimitCookie) {
    const { attempts, resetTime } = JSON.parse(rateLimitCookie.value)

    if (Date.now() < resetTime && attempts >= maxAttempts) {
      redirect("/rate-limited")
    }
  }

  redirect(path)
}

// A/B test redirect
export async function redirectForABTest(variantA: string, variantB: string, testName: string): Promise<never> {
  const cookieStore = await cookies()
  let variant = cookieStore.get(`ab-test-${testName}`)?.value

  if (!variant) {
    // Assign variant if not already assigned
    variant = Math.random() < 0.5 ? "A" : "B"
    cookieStore.set(`ab-test-${testName}`, variant, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    })
  }

  redirect(variant === "A" ? variantA : variantB)
}
