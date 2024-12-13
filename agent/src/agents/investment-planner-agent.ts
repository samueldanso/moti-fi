import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

export async function createInvestmentPlannerAgent() {
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
	const tools = cdpToolkit.getTools();

	const agent = createReactAgent({
		llm,
		tools,
		checkpointSaver: memory,
		messageModifier: `
      You are an investment planning agent specialized in crypto markets.

      Your responsibilities:
      1. Analyze market trends and opportunities
      2. Consider social sentiment signals
      3. Evaluate risk/reward ratios
      4. Provide clear investment recommendations

      Always explain your analysis and reasoning.
    `,
	});

	return {
		agent,
		config: {
			configurable: {
				thread_id: "moti-fi-planner-agent",
			},
		},
	};
}
