import { CdpAgentkit } from "@coinbase/cdp-agentkit-core"
import { CdpToolkit } from "@coinbase/cdp-langchain"
import { ChatOpenAI } from "@langchain/openai"

export async function initializeAgent() {
  const llm = new ChatOpenAI({
    modelName: "llama",
    openAIApiKey: "gaia",
    configuration: {
      baseURL: "https://llamatool.us.gaianet.network/v1",
    },
  })

  const config = {
    networkId: process.env.NETWORK_ID || "base-sepolia",
  }

  const agentkit = await CdpAgentkit.configureWithWallet(config)
  const cdpToolkit = new CdpToolkit(agentkit)
  const _tools = cdpToolkit.getTools()

  // Simplified agent implementation
  const agent = {
    stream: async ({ messages }: { messages: any[] }) => {
      try {
        const response = await llm.invoke(messages)
        return [
          {
            agent: {
              messages: [{ content: response.content }],
            },
          },
        ]
      } catch (error) {
        console.error("Agent error:", error)
        throw error
      }
    },
  }

  return {
    agent,
    config: { configurable: { thread_id: "CDP AgentKit Example" } },
  }
}
