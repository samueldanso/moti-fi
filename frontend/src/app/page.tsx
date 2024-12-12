"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Brain, Sparkles, Wallet } from "lucide-react"

const agents = [
  {
    name: "Social Sentiment Agent",
    description:
      "Tracks social signals and top influencer activity on X/Twitter",
    icon: Sparkles,
    status: "Ready",
    color: "text-blue-500",
    tech: "Base",
  },
  {
    name: "Investment Planner Agent",
    description:
      "Analyzes top coins and provides market insights using advanced AI",
    icon: Brain,
    status: "Ready",
    color: "text-violet-500",
    tech: "Gaia LLM",
  },
  {
    name: "Portfolio Manager Agent",
    description:
      "Executes trades and manages investment positions with risk controls",
    icon: Wallet,
    status: "Ready",
    color: "text-emerald-500",
    tech: "CDP SDK",
  },
]

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Investment Collective
        </h2>
        <p className="text-muted-foreground">
          AI agents analyzing crypto investments across platforms
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => {
          const Icon = agent.icon
          return (
            <Card
              key={agent.name}
              className="hover:bg-muted/50 cursor-pointer transition"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className={agent.color} />
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {agent.tech}
                    </div>
                  </div>
                </div>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-medium text-emerald-500">
                    {agent.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
