"use client"

import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export function WalletButtons() {
  return (
    <div className="flex items-center gap-2">
      <Wallet>
        <ConnectWallet
          className="min-w-[90px] rounded-lg bg-slate-200 text-[#030712] hover:bg-slate-300"
          text="Sign up"
        />
      </Wallet>

      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <button
            type="button"
            onClick={openConnectModal}
            className="min-w-[90px] rounded-lg bg-primary/90 px-4 py-2 text-primary-foreground transition-colors hover:bg-primary"
          >
            Login
          </button>
        )}
      </ConnectButton.Custom>
    </div>
  )
}
