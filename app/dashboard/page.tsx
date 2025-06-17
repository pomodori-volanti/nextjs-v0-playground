import Link from "next/link"
import { LogoutButton } from "@/components/auth/logout-button"
import { requireAuth } from "@/lib/auth-server"

export default async function DashboardPage() {
  const session = await requireAuth()

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session.user.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {session.user.image && (
                <img
                  src={session.user.image || "/placeholder.svg"}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-600">{session.user.role}</span>
            </div>
            <LogoutButton />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome</h2>
          <p className="mb-4">You are successfully logged in with NextAuth.js!</p>

          <div className="mb-6 p-4 bg-blue-50 rounded-md">
            <h3 className="font-medium text-blue-900 mb-2">Session Information</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>User ID:</strong> {session.user.id}
              </p>
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>Role:</strong> {session.user.role}
              </p>
              <p>
                <strong>Provider:</strong> {session.provider || "credentials"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Link href="/settings" className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
              <h3 className="font-medium">Settings</h3>
              <p className="text-sm text-gray-500">Account settings</p>
            </Link>

            <Link href="/profile" className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm text-gray-500">View your profile</p>
            </Link>

            <Link href="/admin/health" className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
              <h3 className="font-medium">Health</h3>
              <p className="text-sm text-gray-500">Monitor system health</p>
            </Link>

            <Link href="/devtools/app-state" className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
              <h3 className="font-medium">🔧 DevTools Panel</h3>
              <p className="text-sm text-gray-500">Enhanced debugging with Chrome DevTools</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
