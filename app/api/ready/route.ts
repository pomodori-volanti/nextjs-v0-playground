import { type NextRequest, NextResponse } from "next/server"

// Readiness probe for Kubernetes/container orchestration
export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check if the application is ready to serve traffic
    const readinessChecks = {
      timestamp: new Date().toISOString(),
      status: "ready",
      checks: {
        server: "ok",
        // Add more readiness checks as needed
      },
    }

    // Example: Check if critical services are available
    // Uncomment and modify as needed
    /*
    // Database readiness check
    try {
      await db.raw('SELECT 1')
      readinessChecks.checks.database = 'ready'
    } catch (error) {
      readinessChecks.checks.database = 'not ready'
      readinessChecks.status = 'not ready'
    }

    // External API readiness check
    try {
      const response = await fetch('https://api.example.com/health', {
        method: 'HEAD',
        timeout: 3000
      })
      readinessChecks.checks.externalApi = response.ok ? 'ready' : 'not ready'
    } catch (error) {
      readinessChecks.checks.externalApi = 'not ready'
      readinessChecks.status = 'not ready'
    }
    */

    readinessChecks.responseTime = Date.now() - startTime

    const isReady = readinessChecks.status === "ready"
    const statusCode = isReady ? 200 : 503

    return NextResponse.json(readinessChecks, {
      status: statusCode,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: "not ready",
        error: error instanceof Error ? error.message : "Unknown error",
        responseTime: Date.now() - startTime,
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Content-Type": "application/json",
        },
      },
    )
  }
}

// Support HEAD requests
export async function HEAD() {
  try {
    // Quick readiness check without detailed response
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return new NextResponse(null, {
      status: 503,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  }
}
