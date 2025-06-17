import { ProtectedRoute } from "@/components/auth/protected-route"

interface ProfilePageProps {
  searchParams: {
    success?: string
  }
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        {/* Show success message if redirected with one */}
        {searchParams.success === "profile-updated" && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
            Profile updated successfully!
          </div>
        )}

        {/* Profile content */}
      </div>
    </ProtectedRoute>
  )
}
