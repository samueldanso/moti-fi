export { createSentimentAgent } from './sentiment-agent'
export { createPortfolioManagerAgent } from './portfolio-manager-agent'
export { createInvestmentPlannerAgent } from './investment-planner-agent'

// Export the initialize function
export async function initializeAgent() {
	// Use your existing initialization code
	const { agent, config } = await createSentimentAgent()
	return { agent, config }
}
