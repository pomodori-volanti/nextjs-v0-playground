import { type NextRequest, NextResponse } from "next/server"

// Detailed status endpoint for monitoring dashboards
export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Collect system information
    const systemInfo = {
      timestamp: new Date().toISOString(),
      application: {
        name: "My Next.js App",
        version: process.env.npm_package_version || "1.0.0",
        environment: process.env.NODE_ENV || "development",
        buildId: process.env.VERCEL_GIT_COMMIT_SHA || "local",
        region: process.env.VERCEL_REGION || "local",
      },
      runtime: {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime: Math.floor(process.uptime()),
        pid: process.pid,
      },
      memory: {
        heapUsed: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
        heapTotal: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
        external: Math.round((process.memoryUsage().external / 1024 / 1024) * 100) / 100,
        rss: Math.round((process.memoryUsage().rss / 1024 / 1024) * 100) / 100,
      },
      request: {
        userAgent: request.headers.get("user-agent") || "unknown",
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
        method: request.method,
        url: request.url,
      },
    }

    // Add response time
    const responseTime = Date.now() - startTime

    return NextResponse.json(
      {
        ...systemInfo,
        responseTime,
        status: "operational",
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
        timestamp: new Date().toISOString(),
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        responseTime: Date.now() - startTime,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Content-Type": "application/json",
        },
      },
    )
  }
}
