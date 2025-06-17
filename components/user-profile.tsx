import { useServerUser, useServerAuth } from "@/lib/server-composables"

async function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, Admin!</p>
    </div>
  )
}

export async function UserProfile() {
  const user = await useServerUser()
  const auth = await useServerAuth()

  if (!auth.isAuthenticated) {
    return <div>Please log in</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {auth.isAdmin && <AdminPanel />}
    </div>
  )
}
