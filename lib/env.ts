/**
 * Environment variable utilities with type safety and validation
 */

// Client-side environment variables (available in browser)
export const clientEnv = {
  // App URLs
  APP_URL: import.meta.env.VITE_APP_URL || "http://localhost:3000",
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  CDN_URL: import.meta.env.VITE_CDN_URL || "",
  ASSETS_URL: import.meta.env.VITE_ASSETS_URL || "/assets",

  // External Service URLs
  AUTH_SERVICE_URL: import.meta.env.VITE_AUTH_SERVICE_URL || "",
  TRANSLATION_SERVICE_URL: import.meta.env.VITE_TRANSLATION_SERVICE_URL || "",
  ANALYTICS_URL: import.meta.env.VITE_ANALYTICS_URL || "",
  WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL || "",

  // OAuth redirect URLs
  GOOGLE_OAUTH_REDIRECT_URL:
    import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL || `${import.meta.env.VITE_APP_URL}/auth/google/callback`,
  GITHUB_OAUTH_REDIRECT_URL:
    import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URL || `${import.meta.env.VITE_APP_URL}/auth/github/callback`,

  // Feature flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === "true",

  // App metadata
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  BUILD_ID: import.meta.env.VITE_BUILD_ID || "local",

  // Optional third-party services
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  HOTJAR_ID: import.meta.env.VITE_HOTJAR_ID,
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
} as const

// Server-side environment variables (Node.js only)
export const serverEnv = {
  // Database URLs
  DATABASE_URL: process.env.DATABASE_URL || "",
  REDIS_URL: process.env.REDIS_URL || "",

  // Authentication secrets
  JWT_SECRET: process.env.JWT_SECRET || "fallback-secret-for-development",

  // Payment processing
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",

  // External API keys
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,

  // Monitoring
  SENTRY_DSN: process.env.SENTRY_DSN,
} as const

// Validation functions
export function validateClientEnv() {
  const required = ["VITE_APP_URL", "VITE_API_URL"] as const

  const missing = required.filter((key) => !import.meta.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required client environment variables: ${missing.join(", ")}`)
  }
}

export function validateServerEnv() {
  const required = ["DATABASE_URL", "JWT_SECRET"] as const

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required server environment variables: ${missing.join(", ")}`)
  }
}

// Helper function to get environment-specific URLs
export function getApiUrl(path = ""): string {
  const baseUrl = clientEnv.API_URL
  return path ? `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}` : baseUrl
}

export function getAppUrl(path = ""): string {
  const baseUrl = clientEnv.APP_URL
  return path ? `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}` : baseUrl
}

export function getCdnUrl(path = ""): string {
  const baseUrl = clientEnv.CDN_URL || clientEnv.APP_URL
  return path ? `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}` : baseUrl
}

// Type-safe environment variable getter
export function getEnvVar(key: string, fallback?: string): string {
  const value = import.meta.env[key]
  if (!value && !fallback) {
    throw new Error(`Environment variable ${key} is not defined`)
  }
  return value || fallback || ""
}

// Check if we're in a specific environment
export const isDevelopment = import.meta.env.DEV
export const isProduction = import.meta.env.PROD
export const isTest = import.meta.env.MODE === "test"
