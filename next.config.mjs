import { execSync } from "child_process"
import { watch } from "fs"
import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // Environment variables
  env: {
    // This is used for absolute URLs in server components
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Enable Turbopack
  experimental: {
    // Enable Turbopack compilation
    turbo: {
      // Turbopack-specific options
      rules: {
        // Example rule for handling specific file types
        // '*.module.css': ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Enable logging for Turbopack
      logLevel: 'error',
    },
  },
  
  // Lifecycle hooks - alternative to webpack configuration
  onDemandEntries: {
    // Keep pages in memory for longer during development
    maxInactiveAge: 25 * 1000,
    // Number of pages to keep in memory
    pagesBufferLength: 5,
  },
}

export default nextConfig
