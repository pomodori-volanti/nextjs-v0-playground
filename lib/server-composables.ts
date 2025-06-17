import { headers, cookies } from "next/headers"
import { cache } from "react"
import { getSession } from "./auth-actions"

// Enhanced server composables with authentication
export const useServerContext = cache(async () => {
  const headersList = await headers()
  const cookieStore = await cookies()
  const session = await getSession()

  const pathname = headersList.get("x-pathname") || "/"
  const theme = (cookieStore.get("theme")?.value as "light" | "dark") || "light"
  const sidebarCollapsed = cookieStore.get("sidebar-collapsed")?.value === "true"

  return {
    user: session,
    theme,
    sidebar: { collapsed: sidebarCollapsed },
    pathname,
    isAuthenticated: !!session,
  }
})

export const useServerAuth = cache(async () => {
  const session = await getSession()
  return {
    user: session,
    isAuthenticated: !!session,
    isAdmin: session?.role === "admin",
  }
})

export const useServerUser = cache(async () => {
  const session = await getSession()
  return session
})
