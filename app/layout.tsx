import type React from "react"
import { Inter } from "next/font/google"
import { AuthSessionProvider } from "@/components/auth/session-provider"
import { auth } from "@/lib/auth"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Get server session for SSR
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider session={session}>
          <main>{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
