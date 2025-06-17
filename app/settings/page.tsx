import Link from "next/link"
import { LogoutButton } from "@/components/auth/logout-button"

export default async function SettingsPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="space-x-4 flex items-center">
            <Link href="/dashboard" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Dashboard
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@example.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="notifications" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                    Email notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="darkmode" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <label htmlFor="darkmode" className="ml-2 block text-sm text-gray-900">
                    Dark mode
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
