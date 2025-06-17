import { getUser } from "@/lib/server-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export async function UserInfo() {
  const user = await getUser()

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Please log in to view user information.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div className="flex items-center gap-2">
            <strong>Role:</strong>
            <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
