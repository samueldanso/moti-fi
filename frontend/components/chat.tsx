"use client"

import { useState } from "react"
import { useAgent } from "@/lib/hooks/use-agent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import type { Message } from "@/lib/types"

export function Chat() {
  const { messages = [], sendMessage, isLoading } = useAgent()
  const [input, setInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    await sendMessage(input)
    setInput("")
  }

  return (
    <Card>
      <CardContent className="p-4">
        {/* Messages */}
        <div className="mb-4 flex max-h-[600px] min-h-[400px] flex-col gap-2 overflow-y-auto">
          {messages?.map((msg: Message) => (
            <div
              key={`${msg.role}-${msg.content}`}
              className={`rounded-lg p-2 ${
                msg.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              } max-w-[80%]`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about market sentiment, portfolio status..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
