import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { ChatOpenAI } from '@langchain/openai'
import { CdpAgentkit } from '@coinbase/cdp-agentkit-core'
import { initializeAgent } from './agents'

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3001
let agent: any = null

app.post('/api', async (req, res) => {
	const { message } = req.json()
	const { agent, config } = await initializeAgent()

	const stream = await agent.stream({ messages: [{ role: 'user', content: message }] }, config)

	let response = ''
	for await (const chunk of stream) {
		if ('agent' in chunk) {
			response = chunk.agent.messages[0].content
		}
	}

	res.json({ content: response })
})

app.listen(port, () => {
	console.log(`Agent running on ${port}`)
})
