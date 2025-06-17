import { type NextRequest, NextResponse } from "next/server"

// Simple ping endpoint for basic connectivity checks
export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString()

  return NextResponse.json(
    {
      message: "pong",
      timestamp,
      server: "nextjs",
      version: process.env.npm_package_version || "1.0.0",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    },
  )
}

// Support HEAD requests
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  })
}

// Support POST for testing purposes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const timestamp = new Date().toISOString()

    return NextResponse.json(
      {
        message: "pong",
        timestamp,
        echo: body,
        server: "nextjs",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "pong",
        timestamp: new Date().toISOString(),
        error: "Invalid JSON body",
        server: "nextjs",
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Content-Type": "application/json",
        },
      },
    )
  }
}
