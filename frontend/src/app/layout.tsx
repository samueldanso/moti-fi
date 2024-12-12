import "@coinbase/onchainkit/styles.css"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Providers } from "@/components/providers"
import { Sidebar } from "@/components/sidebar"

export const metadata = {
  title: "Moti-fi: AI Investment Collective",
  description:
    "AI agents working together to manage your Web3 investments on Base",
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          <div className="relative min-h-screen">
            <div className="fixed inset-y-0 z-50 hidden h-full w-72 flex-col md:flex bg-muted/50">
              <Sidebar />
            </div>
            <main className="md:pl-72 relative">
              <Navbar />
              <div className="p-8 pt-24">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
