import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { SITE_URL } from "@/lib/content"

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

const SITE = SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "RankForge — The Operating System for Ambitious People",
    template: "%s · RankForge",
  },
  description:
    "RankForge is an AI-powered, offline-first execution operating system. Planning, focus, habits, analytics, and coaching in one desktop app that helps you execute consistently — for board/JEE/NEET exams or any ambitious goal.",
  applicationName: "RankForge",
  keywords: [
    "execution operating system",
    "AI planner",
    "focus app",
    "habit system",
    "exam preparation",
    "JEE NEET CBSE",
    "offline productivity",
    "accountability app",
    "study planner",
    "RankForge",
  ],
  authors: [{ name: "RankForge" }],
  creator: "RankForge",
  publisher: "RankForge",
  alternates: {
    canonical: "/",
  },
  category: "productivity",
  verification: {
    google: [
      "8TcjJlcViSwA4DdxGTqK8OylUvzugbA_9drtfFKQ674", // github.io property
      "2LzP6ZH3E0L-WHgiS7PtDtPgtKlhTOvzSeGgPUK4R7U", // rank-rankforge.vercel.app property
    ],
  },
  openGraph: {
    type: "website",
    url: SITE,
    title: "RankForge — The Operating System for Ambitious People",
    description:
      "Stop managing tools. Start building yourself. Planning, focus, habits, analytics & AI in one offline-first system. One system, every goal.",
    siteName: "RankForge",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RankForge — The Operating System for Ambitious People",
    description:
      "Stop managing tools. Start building yourself. One offline-first system for every goal.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

// Structured data (schema.org) — helps Google render rich results for the app.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "RankForge",
      operatingSystem: "Windows 10, Windows 11",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Productivity",
      description:
        "An AI-powered, offline-first execution operating system: planning, focus, habits, analytics, accountability and coaching in one desktop app.",
      url: SITE,
      downloadUrl: `${SITE}/download/`,
      softwareVersion: "0.7.8",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "AI daily planner with adaptive replanning",
        "Full-screen focus mode with distraction blocking",
        "Habits, streaks and XP",
        "Progress analytics and insights",
        "Adaptive Accountability Lockdown",
        "Offline-first, private local database",
      ],
    },
    {
      "@type": "Organization",
      name: "RankForge",
      url: SITE,
    },
    {
      "@type": "WebSite",
      name: "RankForge",
      url: SITE,
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="relative min-h-screen antialiased">{children}</body>
    </html>
  )
}
