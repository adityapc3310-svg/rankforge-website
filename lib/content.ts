// Centralized content + data for the RankForge marketing site.
// Icons are referenced by lucide-react name and resolved in components.

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
  { label: "Dashboard", href: "#dashboard" },
  { label: "AI", href: "#ai" },
  { label: "Compare", href: "#compare" },
  { label: "Pricing", href: "#pricing" },
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

export const DOWNLOAD = {
  version: "0.7.6",
  fileName: "RankForge-Setup-0.7.6.exe",
  file: "/downloads/RankForge-Setup-0.7.6.exe",
  platform: "Windows 10 / 11 · 64-bit",
  sizeLabel: "~83 MB",
}
