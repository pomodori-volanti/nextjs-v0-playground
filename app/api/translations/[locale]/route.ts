import { type NextRequest, NextResponse } from "next/server"
import { translations } from "@/lib/i18n/translations"
import type { Locale } from "@/lib/i18n/types"

export async function GET(request: NextRequest, { params }: { params: { locale: string } }) {
  // Get the requested locale
  const locale = params.locale as Locale

  // Check if the locale is supported
  if (!translations[locale]) {
    return NextResponse.json({ error: `Locale '${locale}' not supported` }, { status: 404 })
  }

  // Return the translations for the requested locale
  return NextResponse.json(translations[locale], {
    headers: {
      // Cache for 1 hour on CDN, but allow revalidation
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
