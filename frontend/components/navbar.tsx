"use client"

import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet"
import { LineChart, Settings } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 h-16 border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-full max-w-screen-2xl items-center justify-between">
        {/* Logo - Left */}
        <div className="flex-none">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight transition-colors hover:text-primary"
          >
            MotiFi
          </Link>
        </div>

        {/* Navigation - Center */}
        <div className="flex items-center gap-8">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
          >
            <LineChart className="h-4 w-4" />
            Portfolio
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-2 font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>

        {/* Wallet - Right */}
        <div className="flex-none">
          <Wallet>
            <ConnectWallet className="rounded-lg bg-primary/90 text-primary-foreground transition-colors hover:bg-primary" />
          </Wallet>
        </div>
      </div>
    </nav>
  )
}
