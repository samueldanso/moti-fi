"use client"

import { useState } from "react"
import { useAgent } from "@/hooks/use-agent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { SystemEvent } from "@/lib/types"

interface Message {
  id: string
  content: string
  isUser: boolean
  systemEvent?: SystemEvent
}

export function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const { sendMessage, isLoading } = useAgent({
    onError: (error) => console.error("Chat error:", error),
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return

    try {
      const newUserMessage = {
        id: `${Date.now()}-user`,
        content: message,
        isUser: true,
      }
      // Add user message to history
      setMessages((prev) => [...prev, newUserMessage])

      const response = await sendMessage(message)
      // Add agent response to history
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-agent`,
          content: response.content,
          isUser: false,
        },
      ])

      setMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-h-[500px] min-h-[200px] flex-col gap-3 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg p-2 ${
              msg.isUser ? "ml-auto bg-primary/10" : "bg-muted"
            } max-w-[80%]`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  )
}
