import * as fs from "node:fs"
import * as readline from "node:readline"
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core"
import { CdpToolkit } from "@coinbase/cdp-langchain"
import { HumanMessage } from "@langchain/core/messages"
import { MemorySaver } from "@langchain/langgraph"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { ChatOpenAI } from "@langchain/openai"
import * as dotenv from "dotenv"

dotenv.config()

const WALLET_DATA_FILE = "wallet_data.txt"

async function initializeAgent() {
  try {
    let walletDataStr: string | null = null

    if (fs.existsSync(WALLET_DATA_FILE)) {
      try {
        walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8")
      } catch (error) {
        console.error("Error reading wallet data:", error)
      }
    }

    const llm = new ChatOpenAI({
      modelName: "llama",
      apiKey: "gaia",
      configuration: {
        baseURL: "https://llamatool.us.gaianet.network/v1",
      },
    })

    const config = {
      cdpWalletData: walletDataStr || undefined,
      networkId: process.env.NETWORK_ID || "base-sepolia",
    }

    const agentkit = await CdpAgentkit.configureWithWallet(config)
    const cdpToolkit = new CdpToolkit(agentkit)
    const tools = cdpToolkit.getTools()

    const memory = new MemorySaver()
    const agentConfig = { configurable: { thread_id: "CDP AgentKit Example" } }

    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
					You are a helpful agent that can interact onchain using CDP AgentKit.
					If you need funds, request them from the faucet if you are on network ID 'base-sepolia'.
					Before executing your first action, get the wallet details to see what network you're on.
					If there is a 5XX error, ask to try again later.
					Be concise and helpful with your responses.
				`,
    })

    const exportedWallet = await agentkit.exportWallet()
    fs.writeFileSync(WALLET_DATA_FILE, exportedWallet)

    return { agent, config: agentConfig }
  } catch (error) {
    console.error("Failed to initialize agent:", error)
    throw error
  }
}

async function runChatMode(agent: any, config: any) {
  console.log('Starting chat mode... Type "exit" to end.')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const question = (prompt: string): Promise<string> =>
    new Promise((resolve) => rl.question(prompt, resolve))

  try {
    while (true) {
      const userInput = await question("\nPrompt: ")

      if (userInput.toLowerCase() === "exit") {
        break
      }

      const stream = await agent.stream(
        { messages: [new HumanMessage(userInput)] },
        config,
      )

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content)
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content)
        }
        console.log("-------------------")
      }
    }
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

async function main() {
  try {
    const { agent, config } = await initializeAgent()
    await runChatMode(agent, config)
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

if (require.main === module) {
  console.log("Starting Agent...")
  main().catch((error) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
}
