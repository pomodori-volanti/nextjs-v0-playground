import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const url = request.nextUrl.clone()

  // 1. AUTHENTICATION REDIRECTS
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("session")
    if (!token) {
      url.pathname = "/auth/login"
      url.search = `redirect=${encodeURIComponent(pathname + search)}`
      return NextResponse.redirect(url)
    }
  }

  // 2. ROLE-BASED REDIRECTS
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("session")
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie.value)
        if (session.role !== "admin") {
          url.pathname = "/unauthorized"
          return NextResponse.redirect(url)
        }
      } catch {
        url.pathname = "/auth/login"
        return NextResponse.redirect(url)
      }
    }
  }

  // 3. MAINTENANCE MODE REDIRECT
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true"
  if (maintenanceMode && !pathname.startsWith("/maintenance") && !pathname.startsWith("/api")) {
    url.pathname = "/maintenance"
    return NextResponse.redirect(url)
  }

  // 5. FEATURE FLAG REDIRECTS
  const betaFeatureEnabled = request.cookies.get("beta-features")?.value === "true"
  if (pathname.startsWith("/beta") && !betaFeatureEnabled) {
    url.pathname = "/coming-soon"
    return NextResponse.redirect(url)
  }

  // 6. DEVICE-BASED REDIRECTS
  const userAgent = request.headers.get("user-agent") || ""
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)

  if (pathname === "/app" && isMobile) {
    url.pathname = "/mobile-app"
    return NextResponse.redirect(url)
  }

  // 7. SUBDOMAIN REDIRECTS
  const host = request.headers.get("host") || ""
  if (host.startsWith("api.")) {
    url.hostname = host.replace("api.", "")
    url.pathname = `/api${pathname}`
    return NextResponse.redirect(url)
  }

  // 8. LEGACY URL REDIRECTS
  const legacyRedirects: Record<string, string> = {
    "/old-dashboard": "/dashboard",
    "/user-profile": "/profile",
    "/settings-page": "/settings",
  }

  if (legacyRedirects[pathname]) {
    url.pathname = legacyRedirects[pathname]
    return NextResponse.redirect(url, 301) // Permanent redirect
  }

  // Continue with the request
  const response = NextResponse.next()
  response.headers.set("x-pathname", pathname)

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
