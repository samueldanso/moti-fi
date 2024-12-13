import { CdpAgentkit } from '@coinbase/cdp-agentkit-core'
import { CdpToolkit } from '@coinbase/cdp-langchain'
import { ReActAgent } from '@langchain/core/agents'
import { MemorySaver } from '@langchain/langgraph'
import { ChatOpenAI } from '@langchain/openai'

export async function createPortfolioManagerAgent() {
	const llm = new ChatOpenAI({
		modelName: 'llama',
		apiKey: 'gaia',
		configuration: {
			baseURL: 'https://llamatool.us.gaianet.network/v1',
		},
	})

	const memory = new MemorySaver()
	const agentkit = await CdpAgentkit.configureWithWallet()
	const cdpToolkit = new CdpToolkit(agentkit)
	const tools = cdpToolkit.getTools()

	const agent = ReActAgent.fromLLMAndTools({
		llm,
		tools,
		memory,
		systemMessage: `
      You are a portfolio management agent specialized in crypto markets.

      Your capabilities:
      1. Use 'get_wallet_details' to show portfolio info
      2. Use 'get_balance' to check asset balances
      3. Execute trades and manage positions

      IMPORTANT:
      - For portfolio queries, ALWAYS use 'get_wallet_details' first
      - For specific assets, use 'get_balance'
    `,
	})

	return {
		agent,
		config: {
			configurable: {
				thread_id: 'moti-fi-portfolio-agent',
			},
		},
	}
}
