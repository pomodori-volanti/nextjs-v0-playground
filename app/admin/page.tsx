import { redirect } from "next/navigation"
import { cookies } from "next/headers"

async function checkAdminAccess() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    redirect("/auth/login?redirect=/admin")
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    if (session.role !== "admin") {
      redirect("/unauthorized")
    }
    return session
  } catch {
    redirect("/auth/login")
  }
}

export default async function AdminPage() {
  const session = await checkAdminAccess()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {session.name}!</p>
    </div>
  )
}
