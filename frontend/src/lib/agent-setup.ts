import { CdpAgentkit } from '@coinbase/cdp-agentkit-core'
import { CdpToolkit } from '@coinbase/cdp-langchain'
import { ChatOpenAI } from '@langchain/openai'
import { MemorySaver } from '@langchain/langgraph'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

export async function initializeAgent() {
	const llm = new ChatOpenAI({
		modelName: 'llama',
		apiKey: 'gaia',
		configuration: {
			baseURL: 'https://llamatool.us.gaianet.network/v1',
		},
	})

	const config = {
		networkId: process.env.NETWORK_ID || 'base-sepolia',
	}

	const agentkit = await CdpAgentkit.configureWithWallet(config)
	const cdpToolkit = new CdpToolkit(agentkit)
	const tools = cdpToolkit.getTools()

	const memory = new MemorySaver()
	const agentConfig = { configurable: { thread_id: 'CDP AgentKit Example' } }

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

	return { agent, config: agentConfig }
}
