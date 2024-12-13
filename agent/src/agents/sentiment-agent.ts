import { CdpAgentkit } from '@coinbase/cdp-agentkit-core'
import { CdpToolkit } from '@coinbase/cdp-langchain'
import { ReActAgent } from '@langchain/core/agents'
import { MemorySaver } from '@langchain/langgraph'
import { ChatOpenAI } from '@langchain/openai'

export async function createSentimentAgent() {
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
      You are a social sentiment analysis agent specialized in crypto markets.

      Your capabilities:
      1. Use 'get_social_sentiment' to analyze specific assets
      2. Use 'analyze_trends' to check market trends
      3. Track trending topics and market sentiment
      4. Provide clear sentiment signals: Bullish, Bearish, or Neutral

      IMPORTANT: Always use appropriate tools for each task.
    `,
	})

	return {
		agent,
		config: {
			configurable: {
				thread_id: 'moti-fi-sentiment-agent',
			},
		},
	}
}
