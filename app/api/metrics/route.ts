import { type NextRequest, NextResponse } from "next/server"

// Metrics endpoint for monitoring systems (Prometheus format)
export async function GET(request: NextRequest) {
  try {
    const memory = process.memoryUsage()
    const uptime = process.uptime()

    // Prometheus-style metrics
    const metrics = `# HELP nodejs_memory_heap_used_bytes Process heap memory used
# TYPE nodejs_memory_heap_used_bytes gauge
nodejs_memory_heap_used_bytes ${memory.heapUsed}

# HELP nodejs_memory_heap_total_bytes Process heap memory total
# TYPE nodejs_memory_heap_total_bytes gauge
nodejs_memory_heap_total_bytes ${memory.heapTotal}

# HELP nodejs_memory_external_bytes Process external memory
# TYPE nodejs_memory_external_bytes gauge
nodejs_memory_external_bytes ${memory.external}

# HELP nodejs_memory_rss_bytes Process resident set size
# TYPE nodejs_memory_rss_bytes gauge
nodejs_memory_rss_bytes ${memory.rss}

# HELP nodejs_process_uptime_seconds Process uptime in seconds
# TYPE nodejs_process_uptime_seconds gauge
nodejs_process_uptime_seconds ${uptime}

# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",status="200"} 1

# HELP app_info Application information
# TYPE app_info gauge
app_info{version="${process.env.npm_package_version || "1.0.0"}",environment="${process.env.NODE_ENV || "development"}"} 1
`

    return new NextResponse(metrics, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return new NextResponse("# Error generating metrics\n", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  }
}
