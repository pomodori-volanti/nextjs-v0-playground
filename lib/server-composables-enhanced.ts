import { headers, cookies } from "next/headers"
import { cache } from "react"

// Composables que usan datos del middleware
export const useServerRequest = cache(async () => {
  const headersList = await headers()

  return {
    pathname: headersList.get("x-pathname") || "/",
    timestamp: headersList.get("x-timestamp"),
    userAgent: headersList.get("x-user-agent"),
    locale: headersList.get("x-locale") || "en",
    clientIp: headersList.get("x-client-ip"),
    isBetaUser: headersList.get("x-beta-access") === "true",
  }
})

export const useServerAnalytics = cache(async () => {
  const headersList = await headers()
  const cookieStore = await cookies()

  return {
    trackingPage: headersList.get("x-track-page"),
    abTestVariant: cookieStore.get("ab-test-variant")?.value,
    sessionId: cookieStore.get("session-id")?.value,
  }
})

export const useServerAuth = cache(async () => {
  const cookieStore = await cookies()
  const headersList = await headers()

  const authToken = cookieStore.get("auth-token")?.value
  const isAdminRoute = headersList.get("x-pathname")?.startsWith("/admin")

  return {
    isAuthenticated: !!authToken,
    token: authToken,
    requiresAuth: isAdminRoute,
    canAccessAdmin: !!authToken && isAdminRoute,
  }
})
