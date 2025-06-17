import { clientEnv, serverEnv, getApiUrl, getAppUrl, getCdnUrl } from "./env"

// Application configuration
export const config = {
  // App information
  app: {
    name: "My Next.js App",
    version: clientEnv.APP_VERSION,
    buildId: clientEnv.BUILD_ID,
    url: clientEnv.APP_URL,
  },

  // API configuration
  api: {
    baseUrl: clientEnv.API_URL,
    timeout: 10000,
    retries: 3,
  },

  // URLs for different services
  urls: {
    app: getAppUrl(),
    api: getApiUrl(),
    cdn: getCdnUrl(),
    assets: clientEnv.ASSETS_URL,

    // External services
    auth: clientEnv.AUTH_SERVICE_URL,
    translations: clientEnv.TRANSLATION_SERVICE_URL,
    analytics: clientEnv.ANALYTICS_URL,
    webhooks: clientEnv.WEBHOOK_URL,

    // OAuth redirects
    oauth: {
      google: clientEnv.GOOGLE_OAUTH_REDIRECT_URL,
      github: clientEnv.GITHUB_OAUTH_REDIRECT_URL,
    },
  },

  // Feature flags
  features: {
    analytics: clientEnv.ENABLE_ANALYTICS,
    debug: clientEnv.ENABLE_DEBUG,
    sentry: !!clientEnv.SENTRY_DSN,
    hotjar: !!clientEnv.HOTJAR_ID,
    googleAnalytics: !!clientEnv.GOOGLE_ANALYTICS_ID,
  },

  // Third-party service IDs
  services: {
    sentry: {
      dsn: clientEnv.SENTRY_DSN,
    },
    hotjar: {
      id: clientEnv.HOTJAR_ID,
    },
    googleAnalytics: {
      id: clientEnv.GOOGLE_ANALYTICS_ID,
    },
  },
} as const

// Server-only configuration
export const serverConfig = {
  database: {
    url: serverEnv.DATABASE_URL,
  },
  redis: {
    url: serverEnv.REDIS_URL,
  },
  auth: {
    jwtSecret: serverEnv.JWT_SECRET,
  },
  stripe: {
    secretKey: serverEnv.STRIPE_SECRET_KEY,
    webhookSecret: serverEnv.STRIPE_WEBHOOK_SECRET,
  },
  openai: {
    apiKey: serverEnv.OPENAI_API_KEY,
  },
  resend: {
    apiKey: serverEnv.RESEND_API_KEY,
  },
} as const

// Export types for use in other files
export type Config = typeof config
export type ServerConfig = typeof serverConfig
