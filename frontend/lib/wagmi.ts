"use client";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useMemo } from "react";
import { http, createConfig } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { NEXT_PUBLIC_WC_PROJECT_ID } from "./config";

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? "";
  if (!projectId) {
    throw new Error(
      "To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable"
    );
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: "Recommended",
          wallets: [coinbaseWallet],
        },
        {
          groupName: "Other",
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: "MotiFi",
        projectId,
      }
    );

    return createConfig({
      chains: [base, baseSepolia],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
      },
    });
  }, [projectId]);
}
