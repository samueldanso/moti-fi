"use client"

import { Chat } from "@/components/chat"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { agents } from "@/lib/constants"

import { useState } from "react"

export default function Home() {
  const [systemEvents] = useState([
    {
      id: "1",
      message: "Initializing AI agents...",
      timestamp: "06:54 AM",
    },
    {
      id: "2",
      message: "AI agents initialized successfully",
      timestamp: "06:54 AM",
    },
  ])

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-background/30">
      {/* Left Column - Available Agents */}
      <div className="w-[320px] border-border/40 border-r p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-semibold text-lg tracking-tight">
            Available Agents
          </h2>
          <span className="rounded bg-muted px-2 py-1 text-muted-foreground text-xs">
            {agents.length} Active
          </span>
        </div>
        <div className="max-h-[calc(100vh-12rem)] space-y-3 overflow-auto pr-2">
          {agents.map((agent) => {
            const Icon = agent.icon
            return (
              <Card
                key={agent.name}
                className="cursor-pointer border-border/40 bg-background/50 transition-colors hover:bg-muted/50"
              >
                <CardHeader className="space-y-2 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-background p-2">
                      <Icon className={`h-4 w-4 ${agent.color}`} />
                    </div>
                    <div>
                      <CardTitle className="font-medium text-sm">
                        {agent.name}
                      </CardTitle>
                      <div className="text-muted-foreground text-xs" />
                    </div>
                  </div>
                  <CardDescription className="text-xs">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Middle Column - Chat */}
      <div className="flex-1 border-border/40 border-r p-6">
        <Card className="h-full border-border/40 bg-background/50">
          <CardHeader className="border-border/40 border-b">
            <CardTitle>Chat with AI Agent</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Chat />
          </CardContent>
        </Card>
      </div>

      {/* Right Column - System Events */}
      <div className="w-[320px] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-semibold text-lg tracking-tight">
            System Events
          </h2>
          <span className="rounded bg-muted px-2 py-1 text-muted-foreground text-xs">
            Live
          </span>
        </div>
        <Card className="border-border/40 bg-background/50">
          <CardContent className="space-y-4 p-4">
            {systemEvents.map((event) => (
              <div key={event.id} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      event.id === "1" ? "bg-blue-500" : "bg-emerald-500"
                    }`}
                  />
                  <p className="text-sm">{event.message}</p>
                </div>
                <span className="pl-3.5 text-muted-foreground text-xs">
                  {event.timestamp}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
