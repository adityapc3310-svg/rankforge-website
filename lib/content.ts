// Centralized content + data for the RankForge marketing site.
// Icons are referenced by lucide-react name and resolved in components.

/** Prefix a static-asset path with the deploy basePath (for GitHub Pages).
 *  next/link auto-applies basePath to route hrefs, but plain <a> tags and
 *  raw asset URLs do not — use this for those. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
export function withBase(path: string): string {
  // Absolute URLs (e.g. the GitHub Release download) pass through untouched.
  if (/^https?:\/\//.test(path)) return path
  return `${BASE_PATH}${path}`
}

/** Absolute, canonical origin of the live site — used for metadata, canonical
 *  tags, sitemap.xml, robots.txt and structured data.
 *  We've consolidated on the Vercel URL as the single public home: every deploy
 *  (Vercel + the GitHub Pages mirror) declares its canonical here, so search
 *  engines merge all ranking signals onto one URL instead of splitting them.
 *  Override with NEXT_PUBLIC_SITE_URL if you later add a custom domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://rank-rankforge.vercel.app"
).replace(/\/$/, "")

export type IconName = string

export interface Feature {
  icon: IconName
  title: string
  description: string
  accent: "iris" | "cyan" | "amber"
  preview: string[]
}

export const FEATURES: Feature[] = [
  {
    icon: "Sparkles",
    title: "AI Assistant",
    description:
      "A conversational coach that acts, not just chats. It schedules exams, edits your timetable, and surfaces the next right move.",
    accent: "iris",
    preview: ["Plan my week around the JEE mock", "Done — 6 blocks added"],
  },
  {
    icon: "Target",
    title: "Goal Tracking",
    description:
      "Set ambitious targets and watch a live roadmap chart whether you are ahead or behind, week by week.",
    accent: "cyan",
    preview: ["Target 95%", "On track · +2 chapters ahead"],
  },
  {
    icon: "Repeat",
    title: "Habit Building",
    description:
      "Daily disciplines wired into streaks and XP. Burnout-aware, so it builds momentum instead of fear.",
    accent: "amber",
    preview: ["Revision · 14 day streak", "PYQ-a-day · 9 day streak"],
  },
  {
    icon: "CalendarClock",
    title: "Study Planner",
    description:
      "An adaptive engine builds your day from free time, weak subjects, and exam proximity — then replans when life drifts.",
    accent: "iris",
    preview: ["07:00 Physics · Rotational Motion", "08:30 Chem · PYQ set"],
  },
  {
    icon: "Timer",
    title: "Focus Sessions",
    description:
      "Full-screen deep-work mode with distraction detection, a focus score, and optional system-level site blocking.",
    accent: "cyan",
    preview: ["Deep work · 48:12", "0 distractions"],
  },
  {
    icon: "LineChart",
    title: "Progress Analytics",
    description:
      "Focus minutes, productivity trends, a study heatmap, and your best and worst hours — all computed locally.",
    accent: "amber",
    preview: ["Peak window · 7–10 AM", "Focus up 23% this week"],
  },
  {
    icon: "MessageCircle",
    title: "WhatsApp AI Agent",
    description:
      "Calm, constructive weekly summaries delivered to parents — you control exactly what is shared.",
    accent: "iris",
    preview: ["Weekly report sent", "Strengths · Support needed"],
  },
  {
    icon: "Wand2",
    title: "Smart Scheduling",
    description:
      "Respects school, coaching, sleep, holidays, and rest days. Crunch Mode floods the final stretch with revision.",
    accent: "cyan",
    preview: ["Crunch Mode · 18 days left", "Revision + PYQ only"],
  },
  {
    icon: "LayoutDashboard",
    title: "Productivity Dashboard",
    description:
      "One home screen for today: live block, quests, streaks, mentor feed, and a daily win/loss verdict.",
    accent: "amber",
    preview: ["Today · WIN", "4 of 5 quests complete"],
  },
  {
    icon: "Trophy",
    title: "Achievement System",
    description:
      "XP, levels, and ranks from Beginner to Topper. Celebrations fire on streaks, level-ups, and perfect days.",
    accent: "iris",
    preview: ["Rank · Discipline Master", "Level 12 · 2,940 XP"],
  },
]

export interface ComparisonRow {
  capability: string
  rankforge: boolean
  notion: boolean
  todoist: boolean
  habitica: boolean
  calendar: boolean
}

export const COMPARISON: ComparisonRow[] = [
  { capability: "AI that builds your daily plan", rankforge: true, notion: false, todoist: false, habitica: false, calendar: false },
  { capability: "Adaptive replanning when you drift", rankforge: true, notion: false, todoist: false, habitica: false, calendar: false },
  { capability: "Focus mode with distraction blocking", rankforge: true, notion: false, todoist: false, habitica: false, calendar: false },
  { capability: "Habits, streaks & XP", rankforge: true, notion: false, todoist: true, habitica: true, calendar: false },
  { capability: "Exam-aware scheduling", rankforge: true, notion: false, todoist: false, habitica: false, calendar: false },
  { capability: "Progress analytics & insights", rankforge: true, notion: true, todoist: false, habitica: false, calendar: false },
  { capability: "Works fully offline & private", rankforge: true, notion: false, todoist: false, habitica: false, calendar: false },
  { capability: "One system, no app-switching", rankforge: true, notion: false, todoist: false, habitica: false, calendar: false },
]

export const COMPARISON_COLUMNS = [
  { key: "rankforge", label: "RankForge" },
  { key: "notion", label: "Notion" },
  { key: "todoist", label: "Todoist" },
  { key: "habitica", label: "Habitica" },
  { key: "calendar", label: "Calendar" },
] as const

export interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
  accent: "iris" | "cyan" | "amber"
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I stopped juggling five apps. RankForge plans my day, keeps me honest about focus time, and the mentor actually feels like it knows me.",
    name: "Ananya R.",
    role: "Class 12 · NEET aspirant",
    initials: "AR",
    accent: "iris",
  },
  {
    quote:
      "The replanning is the killer feature. I skip a block, it quietly rebuilds the rest of the day instead of guilt-tripping me.",
    name: "Devansh M.",
    role: "JEE Advanced · Dropper year",
    initials: "DM",
    accent: "cyan",
  },
  {
    quote:
      "My focus scores went from embarrassing to consistent in three weeks. Seeing the streak made me protect it.",
    name: "Sara K.",
    role: "Class 10 · CBSE boards",
    initials: "SK",
    accent: "amber",
  },
  {
    quote:
      "As a parent, the weekly summary is calm and honest — no spying, just the picture I actually need.",
    name: "Rajesh P.",
    role: "Parent",
    initials: "RP",
    accent: "iris",
  },
  {
    quote:
      "It feels less like a planner and more like an operating system for my ambition. Everything finally lives in one place.",
    name: "Meera J.",
    role: "Founder · building in public",
    initials: "MJ",
    accent: "cyan",
  },
  {
    quote:
      "Crunch Mode in the last three weeks before boards was unreal. Pure revision and PYQs, zero decision fatigue.",
    name: "Aditya V.",
    role: "Class 12 · PCM",
    initials: "AV",
    accent: "amber",
  },
]

export interface RoadmapItem {
  phase: string
  status: "shipped" | "building" | "vision"
  title: string
  points: string[]
}

export const ROADMAP: RoadmapItem[] = [
  {
    phase: "Now",
    status: "shipped",
    title: "The core operating system",
    points: [
      "AI + rules daily planner with adaptive replanning",
      "Focus mode, habits, streaks, XP & ranks",
      "Analytics, mocks, flashcards & exam prep",
    ],
  },
  {
    phase: "Next",
    status: "building",
    title: "Reach & intelligence",
    points: [
      "WhatsApp AI agent for check-ins & reports",
      "Local LLM (Ollama) for offline mentoring",
      "OCR & PDF chapter import",
    ],
  },
  {
    phase: "Soon",
    status: "vision",
    title: "Everywhere you grow",
    points: [
      "Optional encrypted cloud sync across devices",
      "Native mobile companion app",
      "Voice assistant & ambient capture",
    ],
  },
  {
    phase: "Vision",
    status: "vision",
    title: "Your lifelong growth OS",
    points: [
      "Beyond exams — careers, fitness, finance",
      "Collaborative study circles & accountability",
      "A personal model that grows with you",
    ],
  },
]

export interface PricingPlan {
  name: string
  price: string
  cadence: string
  tagline: string
  features: string[]
  cta: string
  featured: boolean
  accent: "iris" | "cyan" | "amber"
}

export const PRICING: PricingPlan[] = [
  {
    name: "Starter",
    price: "Free",
    cadence: "forever",
    tagline: "Everything you need to build the habit.",
    features: [
      "Full daily planner & calendar",
      "Habits, streaks & focus mode",
      "Offline-first local database",
      "Core analytics dashboard",
    ],
    cta: "Download free",
    featured: false,
    accent: "cyan",
  },
  {
    name: "Pro",
    price: "$8",
    cadence: "/ month",
    tagline: "For serious achievers who want the full engine.",
    features: [
      "Everything in Starter",
      "AI planner, mentor & assistant",
      "Adaptive replanning & Crunch Mode",
      "Question bank, mocks & flashcards",
      "Advanced insights & roadmap",
    ],
    cta: "Start 14-day trial",
    featured: true,
    accent: "iris",
  },
  {
    name: "Family",
    price: "$14",
    cadence: "/ month",
    tagline: "Pro, plus calm visibility for parents.",
    features: [
      "Everything in Pro",
      "WhatsApp weekly parent reports",
      "Up to 3 learner profiles",
      "Priority support",
    ],
    cta: "Get Family",
    featured: false,
    accent: "amber",
  },
]

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Modes", href: "#modes" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export interface Stat {
  value: number
  suffix: string
  label: string
}

export const STATS: Stat[] = [
  { value: 40, suffix: "+", label: "Integrated modules" },
  { value: 3, suffix: "x", label: "More focused study time" },
  { value: 100, suffix: "%", label: "Offline & private" },
  { value: 9, suffix: "", label: "Exam tracks supported" },
]

// The installer is served from the GitHub Release (host-independent, and the
// binary is too large to commit into the repo). `withBase()` passes absolute
// URLs through untouched, so this works on both Vercel and the Pages mirror.
export const DOWNLOAD = {
  version: "0.7.16",
  fileName: "RankForge-Setup-0.7.16.exe",
  file: "https://github.com/adityapc3310-svg/rankforge-website/releases/download/v0.7.16/RankForge-Setup-0.7.16.exe",
  platform: "Windows 10 / 11 · 64-bit",
  sizeLabel: "~102 MB",
}

export interface Faq {
  q: string
  a: string
}

// FAQ — doubles as visible content and FAQPage structured data. Answers are
// written to reinforce the brand entity ("RankForge is …") and to target the
// long-tail brand queries that are realistically winnable. Keep answers honest.
export const FAQS: Faq[] = [
  {
    q: "What is RankForge?",
    a: "RankForge is an offline-first AI productivity and study operating system for Windows. It unifies daily planning, deep-focus sessions, habit tracking, analytics, accountability, and an AI coach into a single desktop app, so you can plan and execute your goals from one place instead of juggling separate tools.",
  },
  {
    q: "What platforms does RankForge support?",
    a: "RankForge is a native desktop app for Windows 10 and Windows 11 (64-bit). It installs with a standard Windows wizard and runs locally on your machine.",
  },
  {
    q: "Does RankForge work offline?",
    a: "Yes. RankForge is offline-first and stores all of your data in a private local database on your own computer. Core features — planner, focus mode, habits, and analytics — work with no internet connection and no cloud account.",
  },
  {
    q: "Do I need an account to use RankForge?",
    a: "No. RankForge does not require you to create an account or sign in. You download the app, install it, and start using it immediately — your data stays on your device.",
  },
  {
    q: "Is RankForge free?",
    a: "RankForge offers a free version you can download and use on Windows today. Optional AI-powered features can use your own API key or a paid plan, but the core planning, focus, habit, and analytics tools are free.",
  },
  {
    q: "How is RankForge different from Notion, Todoist, or a calendar app?",
    a: "Those tools each solve one slice of the problem — notes, tasks, or time. RankForge is a single system: an adaptive AI planner builds your day, a full-screen focus mode protects it, habits and streaks keep you consistent, and analytics show your real progress. It also replans automatically when life drifts, and it runs fully offline and private.",
  },
  {
    q: "What is the Adaptive Accountability Lockdown?",
    a: "It is an optional feature that notices when you have fallen behind on your commitments, asks what happened, and — if needed — guides you through an evidence-based recovery plan before unlocking distractions again. It is always escapable with your own override PIN, and it is off by default until you turn it on.",
  },
]
