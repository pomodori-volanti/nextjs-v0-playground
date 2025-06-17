import { SidebarTrigger } from "@/components/ui/sidebar"
import { getNotifications } from "@/lib/server-context"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function NotificationsPage() {
  const notifications = await getNotifications()

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Badge variant="secondary">{notifications.count} unread</Badge>
      </div>

      <div className="space-y-4">
        {notifications.items.map((notification) => (
          <Card key={notification.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{notification.message}</CardTitle>
                <Badge
                  variant={
                    notification.type === "error"
                      ? "destructive"
                      : notification.type === "warning"
                        ? "outline"
                        : "default"
                  }
                >
                  {notification.type}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
