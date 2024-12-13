import { Tool, DynamicTool } from "@langchain/core/tools";

// Simulated crypto influencers and their typical behaviors
const SIMULATED_INFLUENCERS = [
	{ name: "@CryptoExpert", followers: 100000, sentiment: "bullish" },
	{ name: "@TradingGuru", followers: 75000, sentiment: "neutral" },
	{ name: "@BlockchainDev", followers: 50000, sentiment: "bearish" },
];

// Simulated market trends and their typical sentiment impact
const MARKET_TRENDS = {
	defi: { sentiment: "bullish", confidence: 0.8 },
	nft: { sentiment: "neutral", confidence: 0.6 },
	layer2: { sentiment: "bullish", confidence: 0.9 },
	memecoins: { sentiment: "bearish", confidence: 0.7 },
	web3gaming: { sentiment: "bullish", confidence: 0.75 },
};

export async function createTwitterTools(): Promise<Tool[]> {
	return [
		new DynamicTool({
			name: "get_social_sentiment",
			description: "Get social sentiment for a crypto asset",
			func: async (input: string) => {
				// Simulate varying sentiment based on asset and time
				const randomSentiment = Math.random();
				const sentiment =
					randomSentiment > 0.6
						? "bullish"
						: randomSentiment > 0.3
						  ? "neutral"
						  : "bearish";

				// Simulate active discussions
				const activeInfluencers = SIMULATED_INFLUENCERS.filter(
					() => Math.random() > 0.5,
				);

				return JSON.stringify({
					asset: input,
					sentiment,
					confidence: 0.7 + Math.random() * 0.2, // 0.7-0.9
					sources: ["twitter"],
					signals: ["trending", "influencer_activity"],
					discussions: {
						volume: Math.floor(Math.random() * 1000) + 500,
						influencers: activeInfluencers,
						trending_hashtags: [`#${input}`, "#crypto", "#trading"],
					},
				});
			},
		}),
		new DynamicTool({
			name: "analyze_trends",
			description: "Analyze current crypto trends on social media",
			func: async () => {
				// Pick random trends for variety
				const trendingTopics = Object.keys(MARKET_TRENDS)
					.sort(() => Math.random() - 0.5)
					.slice(0, 3);

				const trends = trendingTopics.map((topic) => ({
					topic,
					...MARKET_TRENDS[topic],
					volume: Math.floor(Math.random() * 10000),
				}));

				return JSON.stringify({
					trending_topics: trends,
					overall_sentiment: "bullish",
					timestamp: new Date().toISOString(),
					market_activity: {
						total_discussions: Math.floor(Math.random() * 50000),
						active_traders: Math.floor(Math.random() * 10000),
						sentiment_breakdown: {
							bullish: 45 + Math.floor(Math.random() * 10),
							neutral: 30 + Math.floor(Math.random() * 10),
							bearish: 15 + Math.floor(Math.random() * 10),
						},
					},
				});
			},
		}),
	];
}
