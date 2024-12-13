"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PortfolioStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Portfolio Status
          <Badge variant="outline">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Network</span>
            <Badge variant="secondary">Base Sepolia</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Agent Mode</span>
            <Badge variant="default">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="success">Connected</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
