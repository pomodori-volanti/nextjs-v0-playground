#!/usr/bin/env node

import { execSync } from "child_process"
import { watch } from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appDir = path.join(__dirname, "..", "app")

console.log("👀 Watching for route changes in app directory...")

// Generate routes initially
try {
  console.log("🔄 Generating route types...")
  execSync("npm run generate-routes", { stdio: "inherit" })
  console.log("✅ Route types generated")
} catch (error) {
  console.error("❌ Failed to generate route types:", error.message)
}

// Set up file watcher
let debounceTimer
const watcher = watch(
  appDir,
  { recursive: true },
  (eventType, filename) => {
    // Only trigger on directory changes or page.tsx/route.tsx files
    if (
      filename &&
      (filename.includes("page.tsx") ||
        filename.includes("page.js") ||
        filename.includes("route.tsx") ||
        filename.includes("route.js") ||
        eventType === "rename") // Directory creation/deletion
    ) {
      // Debounce to avoid multiple rapid executions
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        console.log(`🔄 Route change detected: ${filename}`)
        try {
          execSync("npm run generate-routes", { stdio: "inherit" })
          console.log("✅ Route types regenerated")
        } catch (error) {
          console.error("❌ Failed to regenerate route types:", error.message)
        }
      }, 500)
    }
  }
)

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n👋 Stopping route watcher...")
  watcher.close()
  process.exit(0)
})

process.on("SIGTERM", () => {
  watcher.close()
  process.exit(0)
})

console.log("✅ Route watcher started. Press Ctrl+C to stop.")
