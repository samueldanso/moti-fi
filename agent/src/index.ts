import * as dotenv from 'dotenv'
import * as readline from 'readline'
import { createInvestmentPlannerAgent } from './agents/investment-planner-agent'
import { createPortfolioManagerAgent } from './agents/portfolio-manager-agent'
import { createSentimentAgent } from './agents/sentiment-agent'
import { HumanMessage } from '@langchain/core/messages'

dotenv.config()

// Initialize all agents
async function initializeAgents() {
	const sentimentAgent = await createSentimentAgent()
	const plannerAgent = await createInvestmentPlannerAgent()
	const portfolioAgent = await createPortfolioManagerAgent()

	return {
		sentimentAgent,
		plannerAgent,
		portfolioAgent,
	}
}

async function runChatMode() {
	console.log("Starting chat mode... Type 'exit' to end.")

	const agents = await initializeAgents()
	const defaultAgent = agents.plannerAgent // Use planner as default

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	const question = (prompt: string): Promise<string> =>
		new Promise((resolve) => rl.question(prompt, resolve))

	try {
		while (true) {
			const userInput = await question('\nPrompt: ')

			if (userInput.toLowerCase() === 'exit') {
				break
			}

			const stream = await defaultAgent.agent.stream(
				{ messages: [new HumanMessage(userInput)] },
				defaultAgent.config
			)

			for await (const chunk of stream) {
				if ('agent' in chunk) {
					console.log(chunk.agent.messages[0].content)
				}
				console.log('-------------------')
			}
		}
	} catch (error) {
		console.error('Error:', error)
	} finally {
		rl.close()
	}
}

console.log('Starting Agent...')
runChatMode().catch(console.error)
