import { notFound } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  // Simulate user data
  const userId = params.id
  const user =
    userId === "123"
      ? { id: "123", name: "John Doe", email: "john@example.com", role: "admin", status: "active" }
      : userId === "456"
        ? { id: "456", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active" }
        : null

  if (!user) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">User Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {user.name}
            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>ID:</strong> {user.id}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Role:</strong>
            <Badge variant="outline" className="ml-2">
              {user.role}
            </Badge>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              💡 <strong>Try this:</strong> Log out and try to access this URL directly. You'll be redirected to login
              and then brought back here after authentication!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
