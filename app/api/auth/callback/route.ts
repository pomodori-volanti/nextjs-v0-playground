import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  // Handle OAuth error
  if (error) {
    const redirectUrl = new URL("/auth/login", request.url)
    redirectUrl.searchParams.set("error", error)
    return NextResponse.redirect(redirectUrl)
  }

  // Handle missing code
  if (!code) {
    const redirectUrl = new URL("/auth/login", request.url)
    redirectUrl.searchParams.set("error", "missing-code")
    return NextResponse.redirect(redirectUrl)
  }

  try {
    // Exchange code for token (simulate OAuth flow)
    const userInfo = {
      id: "oauth_user_123",
      email: "oauth@example.com",
      name: "OAuth User",
      role: "user",
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("session", JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Redirect to intended destination or dashboard
    const redirectTo = state ? decodeURIComponent(state) : "/dashboard"
    const redirectUrl = new URL(redirectTo, request.url)

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error("OAuth callback error:", error)

    const redirectUrl = new URL("/auth/login", request.url)
    redirectUrl.searchParams.set("error", "oauth-failed")
    return NextResponse.redirect(redirectUrl)
  }
}
