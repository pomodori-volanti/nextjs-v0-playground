"use client"

import { config } from "@/lib/config"
import { isDevelopment, isProduction } from "@/lib/env"

export function EnvironmentInfo() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Environment Configuration</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">App Information</h4>
          <div className="space-y-1 text-sm">
            <div>
              <strong>Name:</strong> {config.app.name}
            </div>
            <div>
              <strong>Version:</strong> {config.app.version}
            </div>
            <div>
              <strong>Build ID:</strong> {config.app.buildId}
            </div>
            <div>
              <strong>Environment:</strong> {isDevelopment ? "Development" : isProduction ? "Production" : "Other"}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">URLs</h4>
          <div className="space-y-1 text-sm">
            <div>
              <strong>App URL:</strong> {config.urls.app}
            </div>
            <div>
              <strong>API URL:</strong> {config.urls.api}
            </div>
            <div>
              <strong>CDN URL:</strong> {config.urls.cdn || "Not configured"}
            </div>
            <div>
              <strong>Assets URL:</strong> {config.urls.assets}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">External Services</h4>
          <div className="space-y-1 text-sm">
            <div>
              <strong>Auth Service:</strong> {config.urls.auth || "Not configured"}
            </div>
            <div>
              <strong>Translation Service:</strong> {config.urls.translations || "Not configured"}
            </div>
            <div>
              <strong>Analytics URL:</strong> {config.urls.analytics || "Not configured"}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Feature Flags</h4>
          <div className="space-y-1 text-sm">
            <div>
              <strong>Analytics:</strong> {config.features.analytics ? "✅" : "❌"}
            </div>
            <div>
              <strong>Debug Mode:</strong> {config.features.debug ? "✅" : "❌"}
            </div>
            <div>
              <strong>Sentry:</strong> {config.features.sentry ? "✅" : "❌"}
            </div>
            <div>
              <strong>Hotjar:</strong> {config.features.hotjar ? "✅" : "❌"}
            </div>
          </div>
        </div>
      </div>

      {isDevelopment && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800 mb-2">Development Mode</h4>
          <p className="text-sm text-yellow-700">
            Additional debugging information and features are available in development mode.
          </p>
        </div>
      )}
    </div>
  )
}
