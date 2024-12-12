'use client'

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet'
import { LineChart, Settings } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
	return (
		<nav className="fixed top-0 left-0 right-0 h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
			<div className="container h-full flex items-center justify-between max-w-screen-2xl">
				{/* Logo - Left */}
				<div className="flex-none">
					<Link
						href="/"
						className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
					>
						Moti-fi
					</Link>
				</div>

				{/* Navigation - Center */}
				<div className="flex items-center gap-8">
					<Link
						href="/portfolio"
						className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
					>
						<LineChart className="h-4 w-4" />
						Portfolio
					</Link>

					<Link
						href="/settings"
						className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
					>
						<Settings className="h-4 w-4" />
						Settings
					</Link>
				</div>

				{/* Wallet - Right */}
				<div className="flex-none">
					<Wallet>
						<ConnectWallet className="bg-primary/90 hover:bg-primary text-primary-foreground transition-colors rounded-lg" />
					</Wallet>
				</div>
			</div>
		</nav>
	)
}
