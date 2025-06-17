import { redirect } from "next/navigation"
import { headers } from "next/headers"

// Basic redirect function
export function redirectTo(path: string): never {
  redirect(path)
}

// Conditional redirect with authentication check
export async function redirectIfNotAuthenticated(redirectPath = "/auth/login"): Promise<void> {
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  const session = cookieStore.get("session")

  if (!session) {
    const headersList = await headers()
    const currentPath = headersList.get("x-pathname") || "/"

    // Preserve the current path for redirect after login
    const loginUrl = `${redirectPath}?redirect=${encodeURIComponent(currentPath)}`
    redirect(loginUrl)
  }
}

// Redirect with role-based access control
export async function redirectIfUnauthorized(requiredRole: string, redirectPath = "/unauthorized"): Promise<void> {
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    redirect("/auth/login")
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    if (session.role !== requiredRole && session.role !== "admin") {
      redirect(redirectPath)
    }
  } catch {
    redirect("/auth/login")
  }
}

// Redirect based on user preferences
export async function redirectBasedOnPreferences(): Promise<void> {
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()

  const onboardingComplete = cookieStore.get("onboarding-complete")
  const userRole = cookieStore.get("user-role")

  if (!onboardingComplete) {
    redirect("/onboarding")
  }

  if (userRole?.value === "admin") {
    redirect("/admin/dashboard")
  } else {
    redirect("/dashboard")
  }
}
