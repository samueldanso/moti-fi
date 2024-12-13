import { CdpAgentkit } from "@coinbase/cdp-agentkit-core"
import { CdpToolkit } from "@coinbase/cdp-langchain"
import { ChatOpenAI } from "@langchain/openai"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { MemorySaver } from "@langchain/langgraph"

export async function initializeAgent() {
  const llm = new ChatOpenAI({
    modelName: "llama",
    openAIApiKey: "gaia",
    configuration: {
      baseURL: "https://llamatool.us.gaianet.network/v1",
    },
  })

  const config = {
    networkId: process.env.NEXT_PUBLIC_NETWORK_ID || "base-sepolia",
    enableTwitter: false,
  }

  const agentkit = await CdpAgentkit.configureWithWallet(config)
  const cdpToolkit = new CdpToolkit(agentkit)
  const tools = cdpToolkit.getTools()

  const memory = new MemorySaver()

  const agent = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: `
      You are an AI investment management agent with multiple capabilities:
      1. Use 'get_social_sentiment' for asset sentiment
      2. Use 'get_wallet_details' for portfolio info
      3. Use 'get_balance' for asset balances
      4. Use CDP tools for onchain actions

      IMPORTANT: Always use appropriate tools for each task.
    `,
  })

  return {
    agent,
    config: { configurable: { thread_id: "moti-fi-agent" } },
  }
}
