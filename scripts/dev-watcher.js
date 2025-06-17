// Alternative approach: Standalone watcher script
import { watch } from "fs"
import { execSync } from "child_process"
import path from "path"

const appDir = path.join(process.cwd(), "app")

console.log("👀 Watching for route changes in app directory...")

let debounceTimer

const watcher = watch(appDir, { recursive: true }, (eventType, filename) => {
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
      console.log(`🔄 Route change detected: ${filename}`)
      try {
        execSync("npm run generate-routes", { stdio: "inherit" })
        console.log("✅ Route types regenerated")
      } catch (error) {
        console.error("❌ Failed to regenerate route types:", error.message)
      }
    }, 500)
  }
})

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
