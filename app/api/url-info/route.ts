import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { nextUrl } = request

  return Response.json({
    pathname: nextUrl.pathname,
    searchParams: Object.fromEntries(nextUrl.searchParams),
    basePath: nextUrl.basePath,
    buildId: nextUrl.buildId,
    fullUrl: nextUrl.href,
  })
}
