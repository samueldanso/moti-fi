# Coinbase Developer Platform AgentKit Documentation

## Quick Links

-   [Coinbase Developer Platform](https://www.coinbase.com/developer-platform)
-   [AgentKit](https://www.coinbase.com/developer-platform/agentkit)

## Overview

AgentKit is a toolkit for creating and managing autonomous AI agents with onchain functionality. Powered by the CDP SDK, it enables agents to autonomously perform various onchain interactions including:

-   Transfers
-   Swaps
-   Token deployments
-   Arbitrary contract invocations

### Key Features

-   Model-agnostic design supporting multiple LLM APIs (OpenAI, Claude, Llama)
-   Native CDP SDK integration for onchain capabilities
-   Template structure for custom functionality
-   LangChain integration and tool support

## Getting Started

### Prerequisites

-   Node.js 18 or higher
-   CDP API Key
-   OpenAI API Key (or alternative LLM API key)

### Installation

```bash
npm install @coinbase/cdp-langchain
```

### Environment Setup

```bash
export CDP_API_KEY_NAME=<your-api-key-name>
export CDP_API_KEY_PRIVATE_KEY=<your-private-key>
export OPENAI_API_KEY=<your-openai-api-key>
export NETWORK_ID=base-sepolia # Optional: Defaults to base-sepolia
```

## Basic Usage

### Initialize AgentKit

```typescript
import { CdpToolkit } from '@coinbase/cdp-langchain'
import { CdpAgentkit } from '@coinbase/cdp-agentkit-core'

// Initialize CDP AgentKit
const agentkit = await CdpAgentkit.configureWithWallet()

// Create toolkit
const toolkit = new CdpToolkit(agentkit)

// Get available tools
const tools = toolkit.getTools()
```

### Available Tools

-   **Wallet Operations**

    -   `get_wallet_details` - Get wallet information
    -   `get_balance` - Check asset balances
    -   `request_faucet_funds` - Request testnet tokens

-   **Asset Operations**

    -   `transfer` - Transfer assets between addresses
    -   `trade` - Trade assets (Mainnet only)

-   **Token Operations**

    -   `deploy_token` - Deploy ERC-20 tokens
    -   `mint_nft` - Mint NFTs
    -   `deploy_nft` - Deploy NFT contracts
    -   `register_basename` - Register wallet Basename

-   **Zora Integration**
    -   `wow_create_token` - Deploy Zora Wow tokens
    -   `wow_buy_token` - Buy Zora Wow memecoin
    -   `wow_sell_token` - Sell Zora Wow memecoin

### Creating an Agent

```typescript
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage } from '@langchain/core/messages'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

// Initialize LLM
const model = new ChatOpenAI({
	model: 'gpt-4o-mini',
})

// Create agent executor
const agent = createReactAgent({
	llm: model,
	tools,
})

// Example usage
const result = await agent.invoke({
	messages: [new HumanMessage('Send 0.005 ETH to john2879.base.eth')],
})
```

## Advanced Features

### Wallet Management

```typescript
// Export wallet data
const walletData = await agentkit.exportWallet()

// Import wallet data
const importedAgentkit = await CdpAgentkit.configureWithWallet({
	cdpWalletData: walletData,
})
```

### Gasless Transactions

Available on Base Mainnet for:

-   USDC transfers
-   EURC transfers
-   cbBTC transfers

## Development Guide

### Using Templates

1. **Fork the Template**

    - Use Python or NodeJS Replit templates
    - Or clone the GitHub repositories

2. **Set Up API Keys**

    - Generate CDP API key from CDP Portal
    - Obtain OpenAI API key (or alternative)
    - Fund account for testing

3. **Configure Environment**

    **For Replit:**

    ```
    CDP_API_KEY_NAME=your_cdp_key_name
    CDP_API_KEY_PRIVATE_KEY=your_cdp_private_key
    OPENAI_API_KEY=your_openai_key
    NETWORK_ID=base-sepolia
    ```

    **For Local Development:**

    ```bash
    export ENV_NAME="your_environment_variable_name"
    ```

4. **Run the Agent**

    **On Replit:**

    - Click "Run" to start

    **Local Development:**

    ```bash
    cd cdp-Langchain/examples/chatbot
    npm install
    npm start
    ```

## Security Considerations

-   Never commit API keys to version control
-   Use secure secret management
-   Review SECURITY.md for best practices
-   Wallet data in wallet_data.txt contains private keys - not for production use

## Additional Resources

-   [Examples Directory](examples/)
-   [CDP AgentKit Documentation](https://docs.cdp.coinbase.com)
-   [API Reference](https://docs.cdp.coinbase.com/agentkit/langchain)
-   [Contributing Guide](CONTRIBUTING.md)
-   [Security Policy](SECURITY.md)

@coinbase/twitter-langchain
CDP Agentkit Extension - Twitter langchain Toolkit
npm version GitHub star chart Open Issues

This toolkit contains tools that enable an LLM agent to interact with Twitter (X). The toolkit provides a wrapper around the Twitter (X) API, allowing agents to perform social operations like posting text.

Prerequisites
Node.js 18 or higher
OpenAI API Key
Twitter (X) App Developer Keys
Installation
npm install @coinbase/twitter-langchain
Copy
Environment Setup
Set the following environment variables:

export OPENAI_API_KEY=<your-openai-api-key>
export TWITTER_API_KEY=<your-api-key>
export TWITTER_API_SECRET=<your-api-secret>
export TWITTER_ACCESS_TOKEN=<your-access-token>
export TWITTER_ACCESS_TOKEN_SECRET=<your-access-token-secret>
Copy
Usage
Basic Setup
import { TwitterAgentkit, TwitterToolkit } from "@coinbase/twitter-langchain";

// Initialize Twitter AgentKit
const agentkit = new TwitterAgentkit();

// Create toolkit
const toolkit = new TwitterToolkit(agentkit);

// Get available tools
const tools = toolkit.getTools();
Copy
Available Tools
The toolkit provides the following tools:

account_details - Get the authenticated account details
account_mentions - Get mentions for a specified account
post_tweet - Post a tweet to the account
post_tweet_reply - Post a reply to a tweet on Twitter
Using with an Agent
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

// Initialize LLM
const model = new ChatOpenAI({
model: "gpt-4o-mini",
});

// Create agent executor
const agent = createReactAgent({
llm: model,
tools,
});

// Example usage
const result = await agent.invoke({
messages: [new HumanMessage("please post 'hello, world!' to twitter")],
});

console.log(result.messages[result.messages.length - 1].content);
Copy
Examples
Check out examples/ for inspiration and help getting started:

Chatbot: Interactive chatbot with Twitter (X) capabilities
Contributing
See CONTRIBUTING.md for detailed setup instructions and contribution guidelines.

Documentation
CDP AgentKit Documentation
API Reference: CDP AgentKit Twitter Langchain Extension
License
Apache-2.0

@coinbase/cdp-langchain
CDP AgentKit Extension - Langchain Toolkit
npm version GitHub star chart Open Issues

CDP integration with Langchain to enable agentic workflows using the core primitives defined in cdp-agentkit-core. This toolkit contains tools that enable an LLM agent to interact with the Coinbase Developer Platform. The toolkit provides a wrapper around the CDP SDK, allowing agents to perform onchain operations like transfers, trades, and smart contract interactions.

Prerequisites
Node.js 18 or higher
CDP API Key
OpenAI API Key
Installation
npm install @coinbase/cdp-langchain
Copy
Environment Setup
Set the following environment variables:

export CDP_API_KEY_NAME=<your-api-key-name>
export CDP_API_KEY_PRIVATE_KEY=<your-private-key>
export OPENAI_API_KEY=<your-openai-api-key>
export NETWORK_ID=base-sepolia # Optional: Defaults to base-sepolia
Copy
Usage
Basic Setup
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";

// Initialize CDP AgentKit
const agentkit = await CdpAgentkit.configureWithWallet();

// Create toolkit
const toolkit = new CdpToolkit(agentkit);

// Get available tools
const tools = toolkit.getTools();
Copy
Available Tools
The toolkit provides the following tools:

get_wallet_details - Get details about the user's Wallet
get_balance - Get balance for specific assets
request_faucet_funds - Request test tokens from faucet
transfer - Transfer assets between addresses
trade - Trade assets (Mainnet only)
deploy_token - Deploy ERC-20 token contracts
mint_nft - Mint NFTs from existing contracts
deploy_nft - Deploy new NFT contracts
register_basename - Register a Basename for the wallet
wow_create_token - Deploy a token using Zora's Wow Launcher (Bonding Curve)
wow_buy_token - Buy Zora Wow ERC-20 memecoin with ETH
wow_sell_token - Sell Zora Wow ERC-20 memecoin for ETH
Using with an Agent
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

// Initialize LLM
const model = new ChatOpenAI({
model: "gpt-4o-mini",
});

// Create agent executor
const agent = createReactAgent({
llm: model,
tools,
});

// Example usage
const result = await agent.invoke({
messages: [new HumanMessage("Send 0.005 ETH to john2879.base.eth")],
});

console.log(result.messages[result.messages.length - 1].content);
Copy
CDP Toolkit Specific Features
Wallet Management
The toolkit maintains an MPC wallet that persists between sessions:

// Export wallet data
const walletData = await agentkit.exportWallet();

// Import wallet data
const importedAgentkit = await CdpAgentkit.configureWithWallet({ cdpWalletData: walletData });
Copy
Network Support
The toolkit supports multiple networks.

Gasless Transactions
The following operations support gasless transactions on Base Mainnet:

USDC transfers
EURC transfers
cbBTC transfers
Examples
Check out examples/ for inspiration and help getting started:

Chatbot: Interactive chatbot with onchain capabilities
Contributing
See CONTRIBUTING.md for detailed setup instructions and contribution guidelines.

Security and bug reports
The CDP AgentKit team takes security seriously. See SECURITY.md for more information.

Documentation
CDP AgentKit Documentation
API Reference: CDP AgentKit LangChain Extension
License
Apache-2.0

@coinbase/cdp-agentkit-core
AgentKit Core
Framework agnostic primitives that are meant to be composable and used via AgentKit framework extensions.

You can find all of the supported actions under ./cdp_agentkit_core/actions

Contributing
See CONTRIBUTING.md for more information.

Security and bug reports
The CDP AgentKit team takes security seriously. See SECURITY.md for more information.

Documentation
CDP AgentKit Documentation
API Reference: CDP AgentKit Core
License
Apache-2.0
