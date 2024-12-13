import "@coinbase/onchainkit/styles.css"
import "./styles/globals.css"
import { Navbar } from "@/components/navbar"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Providers } from "@/components/providers"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata = {
  title: "MotiFi - Hire AI agents as your autonomous investment team",
  description:
    "MotiFi lets you hire specialized AI agents to manage your Web3 investments automatically on Base.",
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className} bg background min-h-screen`}>
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
