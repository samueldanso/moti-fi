Quickstart
Start building on Story quickly.

You want to start building on Story quickly... so let's get started!

I'm building an app
I'm a smart contract developer
📘
Looking to read up on Story first?

If you'd like to read up on Story before diving into the technical details, check out our awesome Learn Hub which will explain the who, what, and why of Story.

App Developers
If you want to deploy an app using Story, this section is for you.

⏩
Skip everything. Go to the code.

If you want to skip everything and go right to coding, we have a clone-able quickstart for you to check out. You can clone it directly and follow the associated README.

🛠️ TypeScript SDK Node.js Example ▶️ Here

🏗️ Story Network Infra
The Story Network Guide provides all RPC, explorer, and faucet info.

💻 Use our SDKs
We have built a 🛠️ TypeScript SDK with its own in-depth tutorials for popular functions and use cases.

🌐 Use our API
Check out the entire API Reference for learning how to use our API.

📝 Register IP on Story
Let's start with the most basic question: "What does it take to register IP on Story in my app? How do I do this?"

To register IP on Story, you'll first need an NFT. If your IP is an ERC-721 NFT (ex. an Azuki or Pudgy Penguin on Story), you're already set. If not, you must mint an NFT to represent your off-chain IP. And don't worry, we'll help you do this in the following tutorials.

Next you'd register that NFT on Story, ultimately creating an 🧩 IP Asset. An "IP Asset" is your IP registered on Story, empowered by:

all of Story's 🧱 Modules like transparent licensing, automatic royalty payments, and disputing of wrongfully registered IP
IP protection through the 💊 Programmable IP License (PIL)
To actually do this in code, our SDK tutorial will show you exactly how to do these things:

Register an IP Asset
Difference Between IP Metadata vs. NFT Metadata
A common question we get from developers while registering their IP on Story is: "What metadata should be/is expected to be attached to the NFT, and then separately, the IP Asset?"

To answer that question, please see NFT vs. IP Metadata.

📜 Licensing Your IP
You may be wondering, "How do I take advantage of Story's on-chain licensing? How do I make sure my registered IP has a license ready to go?"

Before you attach any sort of licenses or license terms to your 🧩 IP Asset, it would be best to first understand what the 💊 Programmable IP License (PIL) actually is. This "PIL" is what defines the available License Terms on Story, which in turn - when attached to an IP Asset - is what defines how others can use (commercially, create derivatives, etc) that IP Asset.

Our SDK tutorial will show you exactly how to attach license terms to your IP Asset:

Attach Terms to an IPA
📘
Learn More

For more information on licensing and the terminology behind it, check out the 📜 Licensing Module.

💸 Royalties / Revenue Sharing
Now you may be wondering, "How do I set up automatic royalty sharing between my IP Asset and someone else's? How do I then collect that payment?"

When you attach License Terms to your 🧩 IP Asset, you can specify certain commercial terms such as commercialRevShare, which is the amount of revenue (from any source, original & derivative) that must be shared by derivative works with the original IP. See the above section for licensing questions.

If someone then creates a derivative of my IP Asset - which has a commercialRevShare of let's say 10% in its license terms - and earns revenue on it, Story enforces the share of this revenue through the 💊 Programmable IP License (PIL) (otherwise resulting in an on-chain dispute using the ❌ Dispute Module or traditional legal arbitration) and then handles the upstream revenue share at the protocol level. If the derivative work earns 100 $USDC, my original IP Asset could claim 10 $USDC.

Our SDK tutorial will show you exactly how to claim revenue:

Claim Revenue
📘
Learn More

For more information on royalty and how it functions, check out the 💸 Royalty Module.

Smart Contract Developers
If you want to deploy/build smart contracts on Story, this section is for you.

⏩
Skip everything. Go to the code.

If you want to skip everything and go right to coding, we have a boilerplate for you to check out. You can clone it directly, study the example smart contracts, and follow the associated README for running the tests.

🏗️ Story Network Infra
The Story Network Guide provides all RPC, explorer, and faucet info.

⚙️ Deployed Smart Contracts
Check out the addresses for the deployed smart contracts here. Note that there are two different kinds of contracts:

Story Protocol Core - This repository contains the core protocol logic, consisting of a thin IP registry (the IP Asset Registry), a set of 🧱 Modules defining logic around 📜 Licensing, 💸 Royalty, ❌ Dispute, metadata, and a module manager for administering module and user access control.
Story Protocol Periphery- Whereas the core contracts deal with the underlying protocol logic, the periphery contracts deal with protocol extensions that greatly increase UX and simplify IPA management. This is mostly handled through the 📦 SPG.
📝 Register IP on Story
Let's start with the most basic question: "What does it take to register IP on Story in my smart contract? How do I do this?"

To register IP on Story, you'll first need an NFT. If your IP is an ERC-721 NFT (ex. an Azuki or Pudgy Penguin on Story), you're already set. If not, you must mint an NFT to represent your off-chain IP. And don't worry, we'll help you do this in the following tutorial.

Next you'd register that NFT on Story, ultimately creating an 🧩 IP Asset. An "IP Asset" is your IP registered on Story, empowered by:

all of Story's 🧱 Modules like transparent licensing, automatic royalty payments, and disputing of wrongfully registered IP
IP protection through the 💊 Programmable IP License (PIL)
To actually do this in your smart contract, follow our smart contract tutorial:

Register an NFT as an IP Asset
Difference Between IP Metadata vs. NFT Metadata
A common question we get from developers while registering their IP on Story is: "What metadata should be/is expected to be attached to the NFT, and then separately, the IP Asset?"

To answer that question, please see NFT vs. IP Metadata.

📜 Licensing Your IP
You may be wondering, "How do I take advantage of Story's on-chain licensing? How do I make sure my registered IP has a license ready to go?"

Before you attach any sort of licenses or license terms to your 🧩 IP Asset, it would be best to first understand what the 💊 Programmable IP License (PIL) actually is. This "PIL" is what defines the available License Terms on Story, which in turn - when attached to an IP Asset - is what defines how others can use (commercially, create derivatives, etc) that IP Asset.

Our smart contract tutorial will show you exactly how to attach license terms to your IP Asset:

Adding License Terms to an IP Asset
📘
Learn More

For more information on licensing and the terminology behind it, check out the 📜 Licensing Module.

💸 Royalties / Revenue Sharing
Now you may be wondering, "How do I set up automatic royalty sharing between my IP Asset and someone else's? How do I then collect that payment?"

When you attach License Terms to your 🧩 IP Asset, you can specify certain commercial terms such as commercialRevShare, which is the amount of revenue (from any source, original & derivative) that must be shared by derivative works with the original IP. See the above section for licensing questions.

If someone then creates a derivative of my IP Asset - which has a commercialRevShare of let's say 10% in its license terms - and earns revenue on it, Story enforces the share of this revenue through the 💊 Programmable IP License (PIL) (otherwise resulting in an on-chain dispute using the ❌ Dispute Module or traditional legal arbitration) and then handles the upstream revenue share at the protocol level. If the derivative work earns 100 $USDC, my original IP Asset could claim 10 $USDC.

Our smart contract tutorial will show you exactly how to claim royalty from a child IP Asset:

Claiming Royalty
📘
Learn More

For more information on royalty and how it functions, check out the 💸 Royalty Module.

Updated 22 days ago

FAQ
