"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Mock user database (replace with real database)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password123", // In real app, this would be hashed
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "password123",
    name: "Regular User",
    role: "user",
  },
  {
    id: "3",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
    role: "user",
  },
]

export interface LoginResult {
  success: boolean
  error?: string
  user?: {
    id: string
    email: string
    name: string
    role: string
  }
}

export async function loginWithCredentials(email: string, password: string, redirectTo?: string): Promise<LoginResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Validate input
  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
    }
  }

  // Find user (in real app, query database with hashed password comparison)
  const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

  if (!user) {
    return {
      success: false,
      error: "Invalid email or password",
    }
  }

  // Create session (in real app, use proper session management)
  const cookieStore = await cookies()
  const sessionData = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    loginTime: new Date().toISOString(),
  }

  // Set session cookie
  cookieStore.set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  // Revalidate any cached pages
  revalidatePath("/")

  console.log(`✅ User ${user.email} logged in successfully. Redirect to: ${redirectTo || "/dashboard"}`)

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
}

// Server action for form submission
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectTo = formData.get("redirectTo") as string

  const result = await loginWithCredentials(email, password, redirectTo)

  if (result.success) {
    // Redirect to the intended destination
    redirect(redirectTo || "/dashboard")
  } else {
    // Redirect back to login with error
    const loginUrl = new URL("/auth/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
    loginUrl.searchParams.set("error", result.error || "login-failed")
    if (redirectTo) {
      loginUrl.searchParams.set("redirect", redirectTo)
    }
    redirect(loginUrl.toString())
  }
}

export async function loginWithGoogle(redirectTo?: string) {
  // In a real app, this would redirect to Google OAuth
  // For demo purposes, we'll simulate a successful Google login

  // Simulate Google OAuth flow
  const googleUser = {
    id: "google_123",
    email: "google.user@gmail.com",
    name: "Google User",
    role: "user",
  }

  const cookieStore = await cookies()
  const sessionData = {
    userId: googleUser.id,
    email: googleUser.email,
    name: googleUser.name,
    role: googleUser.role,
    loginTime: new Date().toISOString(),
    provider: "google",
  }

  cookieStore.set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  console.log(`✅ User ${googleUser.email} logged in with Google. Redirect to: ${redirectTo || "/dashboard"}`)

  return {
    success: true,
    redirectUrl: redirectTo || "/dashboard",
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  revalidatePath("/")
  redirect("/auth/login")
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

// Helper function to validate and sanitize redirect URLs
export function validateRedirectUrl(url: string): string {
  // Ensure the URL is safe and internal
  if (!url || url === "/auth/login") {
    return "/dashboard"
  }

  // Remove any potential XSS or external redirects
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
    return "/dashboard"
  }

  // Ensure it starts with /
  if (!url.startsWith("/")) {
    return "/dashboard"
  }

  // Don't redirect back to auth pages
  if (url.startsWith("/auth/")) {
    return "/dashboard"
  }

  return url
}
