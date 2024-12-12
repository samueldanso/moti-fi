import { NextResponse } from "next/server"
import { initializeAgent } from "@/lib/agent-setup"

let agent: any = null

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Initialize agent if not already done
    if (!agent) {
      const setup = await initializeAgent()
      agent = setup.agent
    }

    // Use the agent to process the message
    const stream = await agent.stream(
      { messages: [{ role: "user", content: message }] },
      { configurable: { thread_id: "CDP AgentKit Example" } },
    )

    let response = ""
    for await (const chunk of stream) {
      if ("agent" in chunk) {
        response = chunk.agent.messages[0].content
      }
    }

    return NextResponse.json({
      content: response,
      status: "success",
    })
  } catch (error) {
    console.error("Agent error:", error)
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 },
    )
  }
}
