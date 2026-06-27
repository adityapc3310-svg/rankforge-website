"use client"

// RankForge landing — Stitch design ported to Next.js.
import { useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{name}</span>
}

// Official Stitch RankForge logo (mark + wordmark). The PNG has a dark backdrop,
// so mix-blend-mode: screen drops it out cleanly over the dark UI.
function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.png" alt="RankForge" className={className} style={{ mixBlendMode: "screen" }} />
}

function Reveal({ children, className = "", delay = 0, y = 24 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Privacy", href: "#privacy" },
  { label: "FAQ", href: "#faq" },
]

const PROBLEMS = [
  { icon: "calendar_today", title: "Don't know what to study today", body: "End the paralysis of choice with AI-generated dynamic schedules based on your weaknesses." },
  { icon: "timer_off", title: "Lose hours to distraction", body: "The AI detects when you drift and pulls you back before 5 minutes turns into 2 hours." },
  { icon: "analytics", title: "Can't tell if you're on track", body: "Get a real-time Exam Readiness Score based on your actual focus hours and retention." },
]

const EXAM_PILLS: (string | { label: string; hot?: boolean })[] = [
  "CBSE 9", "CBSE 10", "CBSE 12 PCM", "CBSE 12 PCB", "CBSE 12 Commerce",
  "CBSE 12 Humanities", "ICSE 10",
  { label: "JEE Main", hot: true }, { label: "JEE Advanced", hot: true }, { label: "NEET", hot: true },
]

const DIFFERENTIATORS = [
  "Analyzes real-time behavior to predict focus slumps before they happen.",
  "Finds root gaps in your knowledge by tracking your question-solving speed.",
  "Gets smarter with every hour you study, personalizing your path to Rank 1.",
]

const FAQS = [
  { q: "How does the AI watch my work?", a: "RankForge monitors your active window titles and patterns locally. It identifies when you're in a \"Productive Flow\" versus \"Passive Browsing\" and updates your Focus Score accordingly — none of it leaves your device." },
  { q: "Is it really free to try?", a: "Yes. You can use the core features (Focus Mode, the AI Planner) for free. Advanced features like the live Exam Readiness Score require a Pro subscription." },
  { q: "Will it work on my laptop?", a: "RankForge is optimized for Windows 10 and 11. 8GB of RAM is recommended so the AI features run smoothly without slowing your machine down." },
  { q: "Can I use it for college exams?", a: "Our blueprints are built for CBSE, ICSE, JEE and NEET, but the AI Planner and Focus Mode work for any goal-oriented study — including university exams and certifications." },
  { q: "Is there a mobile app?", a: "A companion app is on the roadmap. It will sync with your desktop Forge while keeping the same strict local-first privacy policy." },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 transition-all ${scrolled ? "bg-surface/95 shadow-xl" : "bg-surface/80"}`}>
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <Logo className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-on-surface-variant font-medium hover:text-on-surface transition-colors">{l.label}</a>
          ))}
        </div>
        <a href="/download/" className="forge-gradient text-on-primary-container px-6 py-2.5 rounded-full font-label-sm forge-btn-glow hover:scale-105 transition-transform">
          Get RankForge
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header id="top" className="pt-40 pb-20 px-6 max-w-[1200px] mx-auto text-center relative">
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
        <span className="font-label-sm text-primary uppercase tracking-widest">Private • Offline-first • AI Coach</span>
      </motion.div>
      <motion.h1
        className="font-display-xl text-display-xl-mobile md:text-display-xl leading-tight tracking-tight mb-6"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Forge your rank.
      </motion.h1>
      <motion.p
        className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        The AI study coach that watches how you actually work — and keeps every byte of it private. Built for those who demand the peak.
      </motion.p>
      <motion.div
        className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="/download/" className="forge-gradient text-on-primary-container px-10 py-4 rounded-full font-headline-md text-lg forge-btn-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
          <Icon name="download" /> Download for Windows
        </a>
        <a href="#features" className="bg-white/5 backdrop-blur-md border border-white/10 px-10 py-4 rounded-full font-headline-md text-lg hover:bg-white/10 transition-all">
          See how it works
        </a>
      </motion.div>
      <motion.div
        className="pt-8 opacity-40"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1, delay: 0.7 }}
      >
        <p className="font-label-sm uppercase tracking-widest mb-6">Optimized for board &amp; entrance exams</p>
        <div className="flex flex-wrap justify-center gap-12 brightness-200">
          <span className="font-display-xl text-headline-md font-bold">CBSE</span>
          <span className="font-display-xl text-headline-md font-bold">ICSE</span>
          <span className="font-display-xl text-headline-md font-bold tracking-widest">JEE</span>
          <span className="font-display-xl text-headline-md font-bold tracking-widest">NEET</span>
        </div>
      </motion.div>
    </header>
  )
}

function ProblemStrip() {
  return (
    <section className="py-20 px-6 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROBLEMS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1} className="glass-card p-8 rounded-xl flex flex-col gap-4">
            <Icon name={p.icon} className="text-tertiary text-4xl" />
            <h3 className="font-headline-md text-xl">{p.title}</h3>
            <p className="text-on-surface-variant font-body-md">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="py-20 px-6 max-w-[1200px] mx-auto" id="features">
      <Reveal className="mb-16 text-center">
        <h2 className="font-display-xl text-headline-lg mb-4">Not a content app. A study operating system.</h2>
        <p className="text-on-surface-variant max-w-xl mx-auto">Engineered to transform your desktop into a distraction-free forge of concentration.</p>
      </Reveal>
      <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-xl md:col-span-2 flex flex-col justify-between min-h-[320px]">
          <div>
            <Icon name="smart_toy" className="text-primary text-4xl mb-4" />
            <h3 className="font-headline-md text-2xl mb-2">AI Daily Planner</h3>
            <p className="text-on-surface-variant">Builds your schedule around school, coaching, sleep, weak subjects and exam date.</p>
          </div>
          <div className="mt-6 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-label-sm">DYNAMIC</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-label-sm">ADAPTIVE</span>
          </div>
        </div>
        <div className="glass-card p-8 rounded-xl flex flex-col justify-between">
          <div>
            <Icon name="center_focus_strong" className="text-primary text-4xl mb-4" />
            <h3 className="font-headline-md text-2xl mb-2">Focus Mode</h3>
            <p className="text-on-surface-variant">Full-screen Pomodoro with distraction detection and a 0–100 focus score.</p>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-6">
            <div className="h-full forge-gradient" style={{ width: "85%" }} />
          </div>
        </div>
        <div className="glass-card p-8 rounded-xl flex flex-col justify-between">
          <div>
            <Icon name="shield_person" className="text-primary text-4xl mb-4" />
            <h3 className="font-headline-md text-2xl mb-2">Strict AI Mentor</h3>
            <p className="text-on-surface-variant">Firm morning/evening coaching; flags a weak chapter before it sinks your mock.</p>
          </div>
        </div>
        <div className="glass-card p-8 rounded-xl md:col-span-2 flex items-center gap-8">
          <div className="w-32 h-32 flex-shrink-0 border-4 border-primary rounded-full flex items-center justify-center relative">
            <span className="text-3xl font-bold">92</span>
            <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
          </div>
          <div>
            <h3 className="font-headline-md text-2xl mb-2">Exam Readiness Score</h3>
            <p className="text-on-surface-variant">A live 0–100 score per subject from coverage, accuracy, focus and practice.</p>
          </div>
        </div>
        <div className="glass-card p-8 rounded-xl flex flex-col justify-between">
          <div>
            <Icon name="rebase_edit" className="text-primary text-4xl mb-4" />
            <h3 className="font-headline-md text-2xl mb-2">Spaced Revision</h3>
            <p className="text-on-surface-variant">Auto-schedules what you&apos;re about to forget.</p>
          </div>
        </div>
        <div className="glass-card p-8 rounded-xl md:col-span-3 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-md">
            <h3 className="font-headline-md text-2xl mb-2">Streaks, XP &amp; Ranks</h3>
            <p className="text-on-surface-variant">Burnout-aware; rewards quality over hours.</p>
          </div>
          <div className="flex gap-4 items-end">
            <div className="w-12 h-20 bg-primary/20 rounded-t-lg" />
            <div className="w-12 h-32 bg-primary/40 rounded-t-lg" />
            <div className="w-12 h-44 forge-gradient rounded-t-lg flex items-center justify-center">
              <Icon name="workspace_premium" className="text-white" />
            </div>
            <div className="w-12 h-24 bg-primary/20 rounded-t-lg" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function ExamPills() {
  return (
    <section className="py-12 bg-white/5 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8">
        <span className="font-label-sm text-on-surface-variant whitespace-nowrap">BUILT FOR YOUR EXAM</span>
        <div className="flex flex-wrap justify-center gap-4">
          {EXAM_PILLS.map((p) => {
            const label = typeof p === "string" ? p : p.label
            const hot = typeof p !== "string" && p.hot
            return (
              <span key={label} className={`px-6 py-2 rounded-full border border-white/10 bg-white/5 font-medium hover:border-primary transition-colors cursor-default ${hot ? "text-tertiary" : ""}`}>
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DashboardMock() {
  return (
    <div className="glass-card aspect-square rounded-3xl overflow-hidden relative p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">Today</span>
        <span className="font-label-sm text-tertiary">Focus 87</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center relative">
          <span className="text-2xl font-bold">74</span>
        </div>
        <div className="flex-1 space-y-3">
          {([["Maths", 82], ["Physics", 61], ["Chemistry", 70]] as [string, number][]).map(([s, v]) => (
            <div key={s}>
              <div className="flex justify-between text-xs text-on-surface-variant mb-1"><span>{s}</span><span>{v}</span></div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full forge-gradient" style={{ width: `${v}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 items-end flex-1">
        {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
          <div key={i} className={`flex-1 rounded-t-md ${i === 5 ? "forge-gradient" : "bg-primary/20"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 forge-gradient blur-[80px] opacity-30" />
    </div>
  )
}

function Differentiator() {
  return (
    <section id="how-it-works" className="py-40 px-6 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <Reveal>
        <h2 className="font-display-xl text-headline-lg mb-6">Most apps give you videos. <span className="text-primary">RankForge gives you discipline.</span></h2>
        <p className="font-body-lg text-on-surface-variant mb-10">We don&apos;t just host content; we manage your cognition. Our engine watches your actual digital behavior to build a profile of your academic stamina.</p>
        <ul className="space-y-6">
          {DIFFERENTIATORS.map((d) => (
            <li key={d} className="flex items-start gap-4">
              <Icon name="check_circle" className="text-primary mt-1" />
              <span className="font-body-md">{d}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="relative" delay={0.15}>
        <DashboardMock />
      </Reveal>
    </section>
  )
}

function Preview() {
  return (
    <section id="preview" className="py-20 px-6 max-w-[1200px] mx-auto">
      <Reveal className="text-center mb-12">
        <h2 className="font-display-xl text-headline-lg mb-4">See the experience</h2>
        <p className="text-on-surface-variant max-w-xl mx-auto">A look at RankForge — desktop and mobile. Click to open the full screen.</p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <Reveal className="md:col-span-2">
          <a href="/previews/desktop.png" target="_blank" rel="noreferrer" className="glass-card rounded-2xl overflow-hidden block group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/previews/desktop.png" alt="RankForge desktop preview" loading="lazy"
                 className="w-full max-h-[460px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <a href="/previews/mobile.png" target="_blank" rel="noreferrer" className="glass-card rounded-2xl overflow-hidden block group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/previews/mobile.png" alt="RankForge mobile preview" loading="lazy"
                 className="w-full max-h-[460px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
          </a>
        </Reveal>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-8 font-label-sm">
        <a href="/previews/desktop.png" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary inline-flex items-center gap-1.5 transition-colors">
          Desktop preview <Icon name="open_in_new" className="text-base" />
        </a>
        <a href="/previews/mobile.png" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary inline-flex items-center gap-1.5 transition-colors">
          Mobile preview <Icon name="open_in_new" className="text-base" />
        </a>
      </div>
    </section>
  )
}

function Privacy() {
  return (
    <section className="py-40 px-6" id="privacy">
      <Reveal className="max-w-[1200px] mx-auto glass-card p-12 md:p-20 rounded-3xl text-center border-primary/20">
        <Icon name="lock_person" className="text-primary text-6xl mb-8" />
        <h2 className="font-display-xl text-headline-lg mb-6">Your data never leaves your device.</h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
          We believe study data is sacred. The AI runs locally on your hardware. No cloud syncing, no data mining, no privacy compromises — just you and your progress.
        </p>
        <div className="flex flex-wrap justify-center gap-12 text-on-surface-variant font-label-sm uppercase tracking-widest opacity-60">
          <div className="flex items-center gap-2"><Icon name="offline_bolt" className="text-base" /> Offline processing</div>
          <div className="flex items-center gap-2"><Icon name="encrypted" className="text-base" /> End-to-end local</div>
        </div>
      </Reveal>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-20 px-6 max-w-[800px] mx-auto" id="faq">
      <h2 className="font-headline-lg text-center mb-16 text-headline-lg">Frequently asked</h2>
      <div className="space-y-4">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className="border-b border-white/10 pb-4">
              <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="w-full flex justify-between items-center py-4 text-left group">
                <span className="font-headline-md text-xl group-hover:text-primary transition-colors">{f.q}</span>
                <Icon name="expand_more" className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="pt-1 pb-5 text-on-surface-variant font-body-md">{f.a}</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="py-40 px-6 text-center relative">
      <Reveal className="max-w-[1200px] mx-auto">
        <h2 className="font-display-xl text-headline-lg mb-6">Stop studying randomly. <br /><span className="text-primary italic">Start forging your rank.</span></h2>
        <div className="mt-12">
          <a href="/download/" className="forge-gradient text-on-primary-container px-12 py-5 rounded-full font-headline-md text-xl forge-btn-glow hover:scale-105 transition-all mb-6 inline-block">
            Download RankForge
          </a>
          <div className="flex flex-wrap justify-center gap-6 text-on-surface-variant font-label-sm">Windows • Free to try • Mobile coming soon</div>
        </div>
      </Reveal>
      <div className="ambient-glow bottom-0 left-1/2 -translate-x-1/2 opacity-50" />
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="w-full py-12 border-t border-outline-variant/30 bg-surface-container-lowest">
      <div className="max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center opacity-80">
            <Logo className="h-7 w-auto" />
          </div>
          <p className="text-on-surface-variant text-sm opacity-60">© 2026 RankForge. Built for serious students.</p>
        </div>
        <div className="flex gap-8">
          {["Terms", "Privacy", "Discord", "Support"].map((l) => (
            <a key={l} href="#" className="text-on-surface-variant hover:text-tertiary transition-colors opacity-80 hover:opacity-100">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <div className="font-body-md text-on-background bg-background min-h-screen">
      <div className="ambient-glow -top-40 -left-40" />
      <div className="ambient-glow top-1/2 -right-40" />
      <Nav />
      <main>
        <Hero />
        <ProblemStrip />
        <Features />
        <ExamPills />
        <Differentiator />
        <Preview />
        <Privacy />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
