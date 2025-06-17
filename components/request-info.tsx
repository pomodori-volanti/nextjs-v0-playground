import { useServerRequest, useServerAnalytics } from "@/lib/server-composables-enhanced"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export async function RequestInfo() {
  const request = await useServerRequest()
  const analytics = await useServerAnalytics()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <strong>Current Path:</strong> {request.pathname}
        </div>
        <div>
          <strong>Timestamp:</strong> {request.timestamp}
        </div>
        <div>
          <strong>Locale:</strong>
          <Badge variant="outline" className="ml-2">
            {request.locale}
          </Badge>
        </div>
        <div>
          <strong>Client IP:</strong> {request.clientIp}
        </div>
        {request.isBetaUser && (
          <div>
            <Badge variant="default">Beta User</Badge>
          </div>
        )}
        {analytics.abTestVariant && (
          <div>
            <strong>A/B Test:</strong>
            <Badge variant="secondary" className="ml-2">
              Variant {analytics.abTestVariant}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
