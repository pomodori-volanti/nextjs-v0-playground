// Option 3: Custom Next.js plugin approach
import type { NextConfig } from "next"
import { generateRouteTypes } from "../scripts/generate-route-types"

export function withRouteGeneration(nextConfig: NextConfig = {}): NextConfig {
  return {
    ...nextConfig,
    webpack(config, options) {
      if (options.dev && options.isServer) {
        // Generate routes on dev server start
        generateRouteTypes()

        // Set up file watcher
        const { watch } = require("fs")
        const path = require("path")

        const appDir = path.join(process.cwd(), "app")
        let debounceTimer: NodeJS.Timeout

        watch(appDir, { recursive: true }, (eventType: string, filename: string) => {
          if (
            filename &&
            (filename.includes("page.tsx") ||
              filename.includes("page.js") ||
              filename.includes("route.tsx") ||
              filename.includes("route.js") ||
              eventType === "rename")
          ) {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {
              console.log(`🔄 Regenerating routes for: ${filename}`)
              generateRouteTypes()
            }, 500)
          }
        })
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}
