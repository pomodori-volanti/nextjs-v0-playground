/// <reference types="vite/client" />

// Extend the ImportMetaEnv interface to include custom environment variables
interface ImportMetaEnv {
  // App URLs
  readonly VITE_APP_URL: string
}

// Extend the ImportMeta interface to include the env property
interface ImportMeta {
  readonly env: ImportMetaEnv
}

// For Next.js specific environment variables (if you're using both Vite and Next.js)
declare namespace NodeJS {
  interface ProcessEnv {
    // Next.js specific environment variables
    readonly NEXT_PUBLIC_APP_URL: string
    readonly NEXT_PUBLIC_API_URL: string
  }
}
