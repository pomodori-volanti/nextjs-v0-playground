import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import type { Session } from "next-auth"

export async function getServerSession(): Promise<Session | null> {
  return await auth()
}

export async function requireAuth(): Promise<Session> {
  const session = await auth()

  if (!session) {
    redirect("/auth/login")
  }

  return session
}

export async function requireRole(role: string): Promise<Session> {
  const session = await requireAuth()

  if (session.user.role !== role && session.user.role !== "admin") {
    redirect("/unauthorized")
  }

  return session
}

export async function requireAdmin(): Promise<Session> {
  return await requireRole("admin")
}

// Helper to check if user is authenticated without redirecting
export async function isAuthenticated(): Promise<boolean> {
  const session = await auth()
  return !!session
}

// Helper to check user role without redirecting
export async function hasRole(role: string): Promise<boolean> {
  const session = await auth()
  return session?.user.role === role || session?.user.role === "admin"
}
