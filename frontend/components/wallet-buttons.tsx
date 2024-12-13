"use client";

import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletButtons() {
  return (
    <div className="flex items-center gap-2">
      <Wallet>
        <ConnectWallet
          className="rounded-lg bg-slate-200 text-[#030712] hover:bg-slate-300 min-w-[90px]"
          text="Sign up"
        />
      </Wallet>

      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <button
            onClick={openConnectModal}
            className="rounded-lg bg-primary/90 text-primary-foreground transition-colors hover:bg-primary min-w-[90px] px-4 py-2"
          >
            Login
          </button>
        )}
      </ConnectButton.Custom>
    </div>
  );
}
