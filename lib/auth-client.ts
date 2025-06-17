"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (email: string, password: string, redirectTo?: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      if (result?.ok) {
        router.push(redirectTo || "/dashboard")
        return { success: true }
      }

      throw new Error("Login failed")
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    }
  }

  const loginWithGoogle = async (redirectTo?: string) => {
    try {
      await signIn("google", {
        callbackUrl: redirectTo || "/dashboard",
      })
    } catch (error) {
      console.error("Google login error:", error)
    }
  }

  const logout = async () => {
    await signOut({
      callbackUrl: "/auth/login",
    })
  }

  return {
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    user: session?.user,
    login,
    loginWithGoogle,
    logout,
  }
}

export function useRequireAuth() {
  const { session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return { isLoading: true, session: null }
  }

  if (!session) {
    router.push("/auth/login")
    return { isLoading: false, session: null }
  }

  return { isLoading: false, session }
}

export function useRequireRole(role: string) {
  const { session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return { isLoading: true, session: null, hasAccess: false }
  }

  if (!session) {
    router.push("/auth/login")
    return { isLoading: false, session: null, hasAccess: false }
  }

  const hasAccess = session.user.role === role || session.user.role === "admin"

  if (!hasAccess) {
    router.push("/unauthorized")
    return { isLoading: false, session, hasAccess: false }
  }

  return { isLoading: false, session, hasAccess: true }
}
