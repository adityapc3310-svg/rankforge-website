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
    default: "RankForge — The Operating System for Ambitious People",
    template: "%s · RankForge",
  },
  description:
    "RankForge is an AI-powered, offline-first execution operating system. Planning, focus, habits, analytics, and coaching in one desktop app that helps you execute consistently — for board/JEE/NEET exams or any ambitious goal.",
  keywords: [
    "execution operating system",
    "AI planner",
    "focus app",
    "habit system",
    "exam preparation",
    "JEE NEET CBSE",
    "offline productivity",
    "RankForge",
  ],
  authors: [{ name: "RankForge" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: "RankForge — The Operating System for Ambitious People",
    description:
      "Stop managing tools. Start building yourself. Planning, focus, habits, analytics & AI in one offline-first system. One system, every goal.",
    siteName: "RankForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "RankForge — The Operating System for Ambitious People",
    description:
      "Stop managing tools. Start building yourself. One offline-first system for every goal.",
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
