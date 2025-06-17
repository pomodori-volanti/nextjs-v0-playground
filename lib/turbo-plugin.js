/**
 * Custom plugin for Turbopack
 * This is a simple example of how to extend Turbopack functionality
 */

// Function to run before Turbopack starts
export function beforeBuild() {
  console.log("🚀 Running pre-build tasks for Turbopack...")

  // You can run any pre-build tasks here
  // For example, generating types, validating environment variables, etc.

  console.log("✅ Pre-build tasks completed")
}

// Function to run after Turbopack build completes
export function afterBuild() {
  console.log("🎉 Turbopack build completed")

  // You can run any post-build tasks here
  // For example, copying files, sending notifications, etc.
}

// Helper to create custom Turbopack rules
export function createTurbopackRules(rules = {}) {
  return {
    // Default rules
    "*.module.css": ["style-loader", "css-loader", "postcss-loader"],
    "*.css": ["style-loader", "css-loader", "postcss-loader"],
    "*.svg": ["@svgr/webpack"],

    // Custom rules
    ...rules,
  }
}

// Export a function to create a Turbopack configuration
export function createTurbopackConfig(options = {}) {
  return {
    // Enable Turbopack
    turbo: {
      // Turbopack-specific options
      rules: createTurbopackRules(options.rules),
      // Enable logging for Turbopack
      logLevel: options.logLevel || "error",
    },
  }
}
