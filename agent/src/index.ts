import * as readline from "node:readline";
import * as dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { createTwitterTools } from "./tools/twitter-tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";

dotenv.config();

async function initializeAgent() {
	const llm = new ChatOpenAI({
		modelName: "llama",
		apiKey: "gaia",
		configuration: {
			baseURL: "https://llamatool.us.gaianet.network/v1",
		},
	});

	const agentkit = await CdpAgentkit.configureWithWallet();
	const cdpToolkit = new CdpToolkit(agentkit);
	const tools = [...cdpToolkit.getTools(), ...(await createTwitterTools())];

	const memory = new MemorySaver();
	const config = { configurable: { thread_id: "moti-fi-agent" } };

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
	});

	return { agent, config };
}

async function runChatMode(agent: any, config: any) {
	console.log('Starting chat mode... Type "exit" to end.');

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const question = (prompt: string): Promise<string> =>
		new Promise((resolve) => rl.question(prompt, resolve));

	try {
		while (true) {
			const userInput = await question("\nPrompt: ");

			if (userInput.toLowerCase() === "exit") {
				break;
			}

			const stream = await agent.stream(
				{ messages: [new HumanMessage(userInput)] },
				config,
			);

			for await (const chunk of stream) {
				if ("agent" in chunk) {
					console.log(chunk.agent.messages[0].content);
				} else if ("tools" in chunk) {
					console.log(chunk.tools.messages[0].content);
				}
				console.log("-------------------");
			}
		}
	} catch (error) {
		console.error("Error:", error);
		process.exit(1);
	} finally {
		rl.close();
	}
}

async function runAutoMode(agent: any, config: any, interval = 30) {
	console.log("Starting autonomous mode...");

	while (true) {
		try {
			const tasks = [
				"Check ETH sentiment and market trends",
				"Review portfolio status and balances",
				"Look for trading opportunities",
			];

			for (const task of tasks) {
				console.log(`\nExecuting: ${task}`);
				const stream = await agent.stream(
					{ messages: [new HumanMessage(task)] },
					config,
				);

				for await (const chunk of stream) {
					if ("agent" in chunk) {
						console.log(chunk.agent.messages[0].content);
					}
					console.log("-------------------");
				}

				await new Promise((resolve) => setTimeout(resolve, interval * 1000));
			}
		} catch (error) {
			console.error("Auto mode error:", error);
			await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
		}
	}
}

async function main() {
	try {
		const { agent, config } = await initializeAgent();

		console.log("\nAvailable modes:");
		console.log("1. chat - Interactive chat mode");
		console.log("2. auto - Autonomous mode");

		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		const mode = await new Promise<string>((resolve) =>
			rl.question("\nChoose mode (1/2): ", resolve),
		);
		rl.close();

		if (mode === "2") {
			await runAutoMode(agent, config);
		} else {
			await runChatMode(agent, config);
		}
	} catch (error) {
		console.error("Error:", error);
		process.exit(1);
	}
}

if (require.main === module) {
	console.log("Starting Agent System...");
	main().catch((error) => {
		console.error("Fatal error:", error);
		process.exit(1);
	});
}
