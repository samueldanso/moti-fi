"use client"

import { Chat } from "@/components/chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat with AI Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <Chat />
      </CardContent>
    </Card>
  )
}
