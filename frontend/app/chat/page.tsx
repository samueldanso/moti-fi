"use client"

import { Chat } from "@/components/chat"
import { PortfolioStatus } from "@/components/portfolio-status"

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4 md:grid-cols-[1fr_300px]">
        {/* Main Chat */}
        <div className="flex flex-col gap-4">
          <Chat />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <PortfolioStatus />
        </div>
      </div>
    </div>
  )
}
