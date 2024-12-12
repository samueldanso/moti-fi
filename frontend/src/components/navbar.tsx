"use client"

import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b">
      <div className="container flex h-full items-center justify-end">
        <Wallet>
          <ConnectWallet className="bg-primary hover:bg-primary/90 text-primary-foreground" />
        </Wallet>
      </div>
    </nav>
  )
}
