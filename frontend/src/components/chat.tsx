'use client'

import { useState } from 'react'
import { useAgent } from '@/hooks/use-agent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
	content: string
	isUser: boolean
}

export function Chat() {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState<Message[]>([])
	const { sendMessage, isLoading } = useAgent({
		onError: (error) => console.error('Chat error:', error),
	})

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!message.trim()) return

		try {
			// Add user message to history
			setMessages((prev) => [...prev, { content: message, isUser: true }])

			const response = await sendMessage(message)
			// Add agent response to history
			setMessages((prev) => [...prev, { content: response.content, isUser: false }])

			setMessage('')
		} catch (error) {
			console.error('Failed to send message:', error)
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-3 min-h-[200px] max-h-[500px] overflow-y-auto">
				{messages.map((msg, i) => (
					<div
						key={i}
						className={`p-2 rounded-lg ${
							msg.isUser ? 'bg-primary/10 ml-auto' : 'bg-muted'
						} max-w-[80%]`}
					>
						{msg.content}
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type a message..."
					disabled={isLoading}
				/>
				<Button type="submit" disabled={isLoading}>
					Send
				</Button>
			</form>
		</div>
	)
}
