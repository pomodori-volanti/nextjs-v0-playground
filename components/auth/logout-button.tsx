"use client"

import { useAuth } from "@/lib/auth-client"

export function LogoutButton() {
  const { logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
    >
      {isLoading ? "loading" : "logout"}
    </button>
  )
}
