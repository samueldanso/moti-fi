"use client"

import { OnchainKitProvider } from "@coinbase/onchainkit"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"
import { baseSepolia } from "wagmi/chains"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark"
    >
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={baseSepolia}
      >
        {children}
      </OnchainKitProvider>
    </NextThemesProvider>
  )
}
