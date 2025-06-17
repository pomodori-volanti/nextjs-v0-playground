#!/usr/bin/env node

// Required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_APP_URL',
  // Add other required environment variables here
]

// Optional environment variables with defaults
const optionalEnvVars = {
  'NODE_ENV': 'development',
  // Add other optional environment variables with defaults here
}

// Check for required environment variables
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:')
  missingEnvVars.forEach(envVar => {
    console.error(`   - ${envVar}`)
  })
  console.error('\nPlease set these environment variables and try again.')
  
  // Don't exit in development to allow for easier debugging
  if (process.env.NODE_ENV === 'production') {
    process.exit(1)
  }
} else {
  console.log('✅ All required environment variables are set')
}

// Set defaults for optional environment variables
Object.entries(optionalEnvVars).forEach(([envVar, defaultValue]) => {
  if (!process.env[envVar]) {
    process.env[envVar] = defaultValue
    console.log(`ℹ️ Setting default value for ${envVar}: ${defaultValue}`)
  }
})

console.log('✅ Environment validation complete')
