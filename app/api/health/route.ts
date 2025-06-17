import { type NextRequest, NextResponse } from "next/server"

// Health check endpoint for infrastructure monitoring
export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Basic health checks
    const checks = {
      timestamp: new Date().toISOString(),
      status: "healthy",
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime(),
      memory: {
        used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
        total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
        external: Math.round((process.memoryUsage().external / 1024 / 1024) * 100) / 100,
      },
      responseTime: 0, // Will be calculated below
    }

    // Optional: Add database connectivity check
    // Uncomment when you have a database
    /*
    try {
      // Example database ping
      // await db.raw('SELECT 1')
      checks.database = { status: 'connected' }
    } catch (error) {
      checks.database = { status: 'disconnected', error: error.message }
      checks.status = 'degraded'
    }
    */

    // Optional: Add external service checks
    // Uncomment and modify as needed
    /*
    try {
      // Example external API check
      const externalCheck = await fetch('https://api.example.com/health', {
        method: 'GET',
        timeout: 5000
      })
      checks.externalServices = {
        api: externalCheck.ok ? 'healthy' : 'unhealthy'
      }
    } catch (error) {
      checks.externalServices = {
        api: 'unhealthy',
        error: error.message
      }
      checks.status = 'degraded'
    }
    */

    // Calculate response time
    checks.responseTime = Date.now() - startTime

    // Determine overall status
    const isHealthy = checks.status === "healthy"
    const statusCode = isHealthy ? 200 : 503

    return NextResponse.json(checks, {
      status: statusCode,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    // Critical error - service is unhealthy
    const errorResponse = {
      timestamp: new Date().toISOString(),
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      responseTime: Date.now() - startTime,
    }

    return NextResponse.json(errorResponse, {
      status: 503,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    })
  }
}

// Support HEAD requests for load balancers that prefer them
export async function HEAD() {
  try {
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
