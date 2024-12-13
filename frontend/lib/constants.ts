import { Wallet, Brain, Sparkles } from "lucide-react"

export const agents = [
  {
    name: "Social Sentiment Agent",
    description:
      "Tracks social signals and top influencer activity on X/Twitter",
    icon: Sparkles,
    status: "Ready",
    color: "text-blue-500",
  },
  {
    name: "Investment Planner Agent",
    description:
      "Analyzes top coins and provides market insights using advanced AI",
    icon: Brain,
    status: "Ready",
    color: "text-violet-500",
  },
  {
    name: "Portfolio Manager Agent",
    description:
      "Executes trades and manages investment positions with risk controls",
    icon: Wallet,
    status: "Ready",
    color: "text-emerald-500",
  },
]
