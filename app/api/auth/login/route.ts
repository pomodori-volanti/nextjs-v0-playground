import { type NextRequest, NextResponse } from "next/server"
import { loginWithCredentials } from "@/lib/auth-actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, redirectTo } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Attempt login
    const result = await loginWithCredentials(email, password, redirectTo)

    if (result.success) {
      return NextResponse.json({
        success: true,
        user: result.user,
        redirectUrl: redirectTo || "/dashboard",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}
