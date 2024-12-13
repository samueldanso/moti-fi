import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { createTwitterTools } from "../tools/twitter-tools";

export async function createSentimentAgent() {
	const llm = new ChatOpenAI({
		modelName: "llama",
		apiKey: "gaia",
		configuration: {
			baseURL: "https://llamatool.us.gaianet.network/v1",
		},
	});

	const memory = new MemorySaver();
	const agentkit = await CdpAgentkit.configureWithWallet();
	const cdpToolkit = new CdpToolkit(agentkit);
	const tools = [...cdpToolkit.getTools(), ...(await createTwitterTools())];

	const agent = createReactAgent({
		llm,
		tools,
		checkpointSaver: memory,
		messageModifier: `
      You are a social sentiment analysis agent specialized in crypto markets.

      Your capabilities:
      1. Use 'get_social_sentiment' to analyze specific assets
      2. Use 'analyze_trends' to check market trends
      3. Track trending topics and market sentiment
      4. Provide clear sentiment signals: Bullish, Bearish, or Neutral

      IMPORTANT:
      - ALWAYS try to use your tools before saying you can't do something
      - For market trends, use the 'analyze_trends' tool
      - For specific assets, use 'get_social_sentiment'
    `,
	});

	return {
		agent,
		config: {
			configurable: {
				thread_id: "moti-fi-sentiment-agent",
			},
		},
	};
}
