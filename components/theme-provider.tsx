"use client"

import type React from "react"

import { createContext, useContext } from "react"

interface ThemeContextType {
  theme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode
  theme: "light" | "dark"
}) {
  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
