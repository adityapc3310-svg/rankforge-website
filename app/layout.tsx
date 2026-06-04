import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const SITE = "https://rankforge.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "RankForge — The Operating System for High Achievers",
    template: "%s · RankForge",
  },
  description:
    "RankForge is an AI-powered personal growth and productivity operating system. Plan, focus, and forge the future version of yourself — every goal and habit in one system.",
  keywords: [
    "AI productivity",
    "study planner",
    "habit tracker",
    "focus app",
    "exam preparation",
    "personal operating system",
    "RankForge",
  ],
  authors: [{ name: "RankForge" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: "RankForge — The Operating System for High Achievers",
    description:
      "Stop managing tasks. Start building your future. AI planning, focus, habits, and analytics in one premium system.",
    siteName: "RankForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "RankForge — The Operating System for High Achievers",
    description:
      "AI planning, focus, habits, and analytics in one premium system. Forge the future version of yourself.",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="relative min-h-screen antialiased">{children}</body>
    </html>
  )
}
