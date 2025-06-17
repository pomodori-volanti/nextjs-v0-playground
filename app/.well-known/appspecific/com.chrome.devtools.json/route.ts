import { NextResponse } from "next/server"

export async function GET() {
  // Chrome DevTools configuration
  const devToolsConfig = {
    // Version of the configuration format
    version: "1.0",

    // Application metadata
    application: {
      name: "My Next.js App",
      version: process.env.npm_package_version || "1.0.0",
      description: "Next.js application with enhanced DevTools support",
    },

    // Development server information
    devServer: {
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      protocol: "http",
      host: "localhost",
      port: 3000,
    },

    // Source maps configuration
    sourceMaps: {
      enabled: process.env.NODE_ENV === "development",
      // Path to source maps (if different from default)
      path: "/_next/static/chunks/",
    },

    // Debugging features
    debugging: {
      // Enable React DevTools integration
      reactDevTools: true,
      // Enable performance profiling
      performance: process.env.NODE_ENV === "development",
      // Enable network inspection
      network: true,
      // Enable console enhancements
      console: true,
    },

    // Custom DevTools panels (if you have any)
    panels: [
      {
        name: "App State",
        url: "/devtools/app-state",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjNjM2NjcwIi8+Cjwvc3ZnPgo=",
      },
      {
        name: "API Inspector",
        url: "/devtools/api-inspector",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTBNMjEgMTJDMjEgMTYuOTcwNiAxNi45NzA2IDIxIDEyIDIxQzcuMDI5NDQgMjEgMyAxNi45NzA2IDMgMTJDMyA3LjAyOTQ0IDcuMDI5NDQgMyAxMiAzQzE2Ljk3MDYgMyAyMSA3LjAyOTQ0IDIxIDEyWiIgc3Ryb2tlPSIjNjM2NjcwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K",
      },
    ],

    // Hot reload configuration
    hotReload: {
      enabled: process.env.NODE_ENV === "development",
      // WebSocket endpoint for hot reload
      websocket: "ws://localhost:3000/_next/webpack-hmr",
    },

    // Error handling
    errorHandling: {
      // Show detailed error information in development
      detailed: process.env.NODE_ENV === "development",
      // Error overlay configuration
      overlay: true,
    },

    // Performance monitoring
    performance: {
      // Enable performance monitoring
      enabled: process.env.NODE_ENV === "development",
      // Metrics to collect
      metrics: ["FCP", "LCP", "FID", "CLS", "TTFB"],
    },
  }

  return NextResponse.json(devToolsConfig, {
    headers: {
      "Content-Type": "application/json",
      // Cache for a short time in development
      "Cache-Control":
        process.env.NODE_ENV === "development" ? "no-cache, no-store, must-revalidate" : "public, max-age=3600",
    },
  })
}
