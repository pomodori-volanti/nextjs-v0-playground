import type React from "react"
import { redirectIfNotAuthenticated } from "@/lib/server-redirects"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export async function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  // This will redirect if not authenticated
  await redirectIfNotAuthenticated()

  // Additional role check if needed
  if (requiredRole) {
    const { redirectIfUnauthorized } = await import("@/lib/server-redirects")
    await redirectIfUnauthorized(requiredRole)
  }

  return <>{children}</>
}
