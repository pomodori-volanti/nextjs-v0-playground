"use client"

import { useMemo } from "react"
import { config } from "@/lib/config"
import { clientEnv, getApiUrl, getAppUrl, getCdnUrl } from "@/lib/env"

export function useEnv() {
  return useMemo(
    () => ({
      // Direct access to config
      config,

      // Helper functions
      getApiUrl,
      getAppUrl,
      getCdnUrl,

      // Environment checks
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD,
      isTest: import.meta.env.MODE === "test",

      // Raw environment variables (if needed)
      raw: clientEnv,
    }),
    [],
  )
}

// Hook for specific URL building
export function useUrls() {
  return useMemo(
    () => ({
      api: (path?: string) => getApiUrl(path),
      app: (path?: string) => getAppUrl(path),
      cdn: (path?: string) => getCdnUrl(path),

      // Specific service URLs
      auth: config.urls.auth,
      translations: config.urls.translations,
      analytics: config.urls.analytics,

      // OAuth URLs
      googleOAuth: config.urls.oauth.google,
      githubOAuth: config.urls.oauth.github,
    }),
    [],
  )
}
