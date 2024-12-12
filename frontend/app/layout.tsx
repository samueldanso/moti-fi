import '@coinbase/onchainkit/styles.css'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Providers } from '@/components/providers'

export const metadata = {
	title: 'Moti-fi: AI Investment Collective',
	description: 'AI agents working together to manage your Web3 investments on Base',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-background antialiased">
				<Providers>
					<div className="relative min-h-screen">
						<Navbar />
						<main className="container relative">
							<div className="p-8 pt-24">{children}</div>
						</main>
					</div>
				</Providers>
			</body>
		</html>
	)
}
