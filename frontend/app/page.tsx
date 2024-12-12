'use client'

import { Chat } from '@/components/chat'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Sparkles, Wallet } from 'lucide-react'
import { useState } from 'react'

const agents = [
	{
		name: 'Social Sentiment Agent',
		description: 'Tracks social signals and top influencer activity on X/Twitter',
		icon: Sparkles,
		status: 'Ready',
		color: 'text-blue-500',
		tech: 'Base',
	},
	{
		name: 'Investment Planner Agent',
		description: 'Analyzes top coins and provides market insights using advanced AI',
		icon: Brain,
		status: 'Ready',
		color: 'text-violet-500',
		tech: 'Gaia LLM',
	},
	{
		name: 'Portfolio Manager Agent',
		description: 'Executes trades and manages investment positions with risk controls',
		icon: Wallet,
		status: 'Ready',
		color: 'text-emerald-500',
		tech: 'CDP SDK',
	},
]

interface SystemEvent {
	id: string
	message: string
	timestamp: string
}

export default function Home() {
	const [systemEvents] = useState([
		{
			id: '1',
			message: 'Initializing AI agents...',
			timestamp: '06:54 AM',
		},
		{
			id: '2',
			message: 'AI agents initialized successfully',
			timestamp: '06:54 AM',
		},
	])

	return (
		<div className="flex h-[calc(100vh-6rem)] bg-background/30">
			{/* Left Column - Available Agents */}
			<div className="w-[320px] p-6 border-r border-border/40">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-lg font-semibold tracking-tight">Available Agents</h2>
					<span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
						{agents.length} Active
					</span>
				</div>
				<div className="space-y-3 overflow-auto max-h-[calc(100vh-12rem)] pr-2">
					{agents.map((agent) => {
						const Icon = agent.icon
						return (
							<Card
								key={agent.name}
								className="hover:bg-muted/50 cursor-pointer transition-colors border-border/40 bg-background/50"
							>
								<CardHeader className="p-4 space-y-2">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-md bg-background">
											<Icon className={`h-4 w-4 ${agent.color}`} />
										</div>
										<div>
											<CardTitle className="text-sm font-medium">
												{agent.name}
											</CardTitle>
											<div className="text-xs text-muted-foreground">
												{agent.tech}
											</div>
										</div>
									</div>
									<CardDescription className="text-xs">
										{agent.description}
									</CardDescription>
								</CardHeader>
							</Card>
						)
					})}
				</div>
			</div>

			{/* Middle Column - Chat */}
			<div className="flex-1 p-6 border-r border-border/40">
				<Card className="h-full border-border/40 bg-background/50">
					<CardHeader className="border-b border-border/40">
						<CardTitle>Chat with AI Agent</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<Chat />
					</CardContent>
				</Card>
			</div>

			{/* Right Column - System Events */}
			<div className="w-[320px] p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-lg font-semibold tracking-tight">System Events</h2>
					<span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
						Live
					</span>
				</div>
				<Card className="border-border/40 bg-background/50">
					<CardContent className="p-4 space-y-4">
						{systemEvents.map((event) => (
							<div key={event.id} className="flex flex-col gap-1.5">
								<div className="flex items-center gap-2">
									<div
										className={`w-1.5 h-1.5 rounded-full ${
											event.id === '1' ? 'bg-blue-500' : 'bg-emerald-500'
										}`}
									/>
									<p className="text-sm">{event.message}</p>
								</div>
								<span className="text-xs text-muted-foreground pl-3.5">
									{event.timestamp}
								</span>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
