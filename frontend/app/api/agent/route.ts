import { NextResponse } from "next/server"
import { initializeAgent } from "@/lib/agents"

let agent: any = null

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Initialize agent if not already done
    if (!agent) {
      const setup = await initializeAgent()
      agent = setup.agent
    }

    const stream = await agent.stream(
      { messages: [{ role: "user", content: message }] },
      { configurable: { thread_id: "moti-fi-agent" } },
    )

    let response = ""
    for await (const chunk of stream) {
      if ("agent" in chunk) {
        response = chunk.agent.messages[0].content
      }
    }

    return NextResponse.json({ content: response })
  } catch (error) {
    console.error("Agent error:", error)
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
