Build a Conversational App
Next.JS
Learn how to create a web application that enables voice conversations with ElevenLabs AI agents

This tutorial will guide you through creating a web client that can interact with a Conversational AI agent. You’ll learn how to implement real-time voice conversations, allowing users to speak with an AI agent that can listen, understand, and respond naturally using voice synthesis.

​
What You’ll Need
An ElevenLabs agent created following this guide
npm installed on your local system.
We’ll use Typescript for this tutorial, but you can use Javascript if you prefer.
Looking for a complete example? Check out our Next.js demo on GitHub.

Convai Example Project

​
Setup
1
Create a new Next.js project

Open a terminal window and run the following command:

npm create next-app my-conversational-agent
It will ask you some questions about how to build your project. We’ll follow the default suggestions for this tutorial.

2
Navigate to project directory

cd my-conversational-agent
3
Install the ElevenLabs dependency

npm install @11labs/react
4
Test the setup

Run the following command to start the development server and open the provided URL in your browser:

npm run dev
Verce Default Screen

​
Implement Conversational AI
1
Create the conversation component

Create a new file app/components/conversation.tsx:

app/components/conversation.tsx

'use client';

import { useConversation } from '@11labs/react';
import { useCallback } from 'react';

export function Conversation() {
const conversation = useConversation({
onConnect: () => console.log('Connected'),
onDisconnect: () => console.log('Disconnected'),
onMessage: (message) => console.log('Message:', message),
onError: (error) => console.error('Error:', error),
});

const startConversation = useCallback(async () => {
try {
// Request microphone permission
await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: 'YOUR_AGENT_ID', // Replace with your agent ID
      });

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }

}, [conversation]);

const stopConversation = useCallback(async () => {
await conversation.endSession();
}, [conversation]);

return (
<div className="flex flex-col items-center gap-4">
<div className="flex gap-2">
<button
onClick={startConversation}
disabled={conversation.status === 'connected'}
className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300" >
Start Conversation
</button>
<button
onClick={stopConversation}
disabled={conversation.status !== 'connected'}
className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300" >
Stop Conversation
</button>
</div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      </div>
    </div>

);
}
2
Update the main page

Replace the contents of app/page.tsx with:

app/page.tsx

import { Conversation } from './components/conversation';

export default function Home() {
return (
<main className="flex min-h-screen flex-col items-center justify-between p-24">
<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
<h1 className="text-4xl font-bold mb-8 text-center">
ElevenLabs Conversational AI
</h1>
<Conversation />
</div>
</main>
);
}

(Optional) Authenticate the agents with a signed URL

​
Next Steps
Now that you have a basic implementation, you can:

Add visual feedback for voice activity
Implement error handling and retry logic
Add a chat history display
Customize the UI to match your brand
