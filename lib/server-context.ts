import { headers, cookies } from "next/headers"
import { cache } from "react"

// Define your app state interface
export interface AppState {
  user: {
    id: string
    name: string
    email: string
    role: "admin" | "user"
  } | null
  theme: "light" | "dark"
  sidebar: {
    collapsed: boolean
  }
  notifications: {
    count: number
    items: Array<{
      id: string
      message: string
      type: "info" | "warning" | "error"
    }>
  }
}

// Cache the context creation to avoid recreating it on each request
export const getServerContext = cache(async (): Promise<AppState> => {
  const headersList = await headers()
  const cookieStore = await cookies()

  // Get current pathname for context-aware state
  const pathname = headersList.get("x-pathname") || "/"

  // Read state from cookies (could also be from database/API)
  const theme = (cookieStore.get("theme")?.value as "light" | "dark") || "light"
  const sidebarCollapsed = cookieStore.get("sidebar-collapsed")?.value === "true"

  // Mock user data (in real app, this would come from session/database)
  const userId = cookieStore.get("user-id")?.value
  const user = userId
    ? {
        id: userId,
        name: "John Doe",
        email: "john@example.com",
        role: "admin" as const,
      }
    : null

  // Mock notifications based on route
  const notifications = {
    count: pathname === "/notifications" ? 0 : 3,
    items: [
      { id: "1", message: "New user registered", type: "info" as const },
      { id: "2", message: "Server maintenance scheduled", type: "warning" as const },
      { id: "3", message: "Backup completed", type: "info" as const },
    ],
  }

  return {
    user,
    theme,
    sidebar: { collapsed: sidebarCollapsed },
    notifications,
  }
})

// Helper functions to access specific parts of the context
export const getUser = cache(async () => {
  const context = await getServerContext()
  return context.user
})

export const getTheme = cache(async () => {
  const context = await getServerContext()
  return context.theme
})

export const getSidebarState = cache(async () => {
  const context = await getServerContext()
  return context.sidebar
})

export const getNotifications = cache(async () => {
  const context = await getServerContext()
  return context.notifications
})
