"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Download,
  Play,
  Star,
  LayoutDashboard,
  CalendarRange,
  Timer,
  Flame,
  BarChart3,
  Sparkles,
  Trophy,
  Target,
  Zap,
  ShieldCheck,
  WifiOff,
  UserX,
  MonitorCheck,
} from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

/* -------------------------------------------------------------------------- */
/*  Focus-minutes chart geometry (hand-built)                                 */
/* -------------------------------------------------------------------------- */

const CHART_W = 520
const CHART_H = 150
// Daily focus minutes across the last fortnight — a believable, climbing curve.
const FOCUS_POINTS = [38, 52, 30, 64, 58, 86, 72, 95, 78, 112, 98, 132, 120, 158]

function buildChart(points: number[]) {
  const max = Math.max(...points) * 1.12
  const stepX = CHART_W / (points.length - 1)
  const coords = points.map((p, i) => ({
    x: i * stepX,
    y: CHART_H - (p / max) * CHART_H,
  }))

  // Smooth Catmull-Rom -> cubic bezier path for a premium curve.
  let line = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i - 1] ?? coords[i]
    const p1 = coords[i]
    const p2 = coords[i + 1]
    const p3 = coords[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    line += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(
      1
    )} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  const area = `${line} L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`
  return { line, area, coords }
}

const CHART = buildChart(FOCUS_POINTS)

/* -------------------------------------------------------------------------- */
/*  Trust chips                                                               */
/* -------------------------------------------------------------------------- */

const TRUST = [
  { label: "100% offline", icon: WifiOff },
  { label: "No account needed", icon: UserX },
  { label: "Windows", icon: MonitorCheck },
]

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Planner", icon: CalendarRange, active: false },
  { label: "Focus", icon: Timer, active: false },
  { label: "Habits", icon: Flame, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
]

const STATS = [
  { label: "Focus today", value: "3h12m", icon: Timer, tint: "iris" },
  { label: "Streak", value: "14", icon: Flame, tint: "amber" },
  { label: "Quests", value: "4/5", icon: Target, tint: "cyan" },
  { label: "Score", value: "86", icon: Trophy, tint: "iris" },
] as const

const tintMap = {
  iris: "text-iris-300",
  amber: "text-amber-300",
  cyan: "text-cyan-300",
} as const

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export function HeroV3() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden pb-28 pt-32 md:pb-36 md:pt-40"
    >
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-8%] -z-10 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-iris-600/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[28%] -z-10 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px] animate-float-slower"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[4%] top-[16%] -z-10 h-[280px] w-[280px] rounded-full bg-iris-500/10 blur-[120px] animate-float-slow"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-[0.35] mask-fade-b" />

      <div className="container-rf">
        {/* ---------------------------------------------------------------- */}
        {/*  Copy block                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Announcement pill */}
          <motion.a
            href="#modes"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm text-text-muted transition-colors hover:text-text"
          >
            <span className="rounded-full bg-gradient-to-r from-iris-500 to-iris-700 px-2.5 py-0.5 text-xs font-semibold text-white shadow-glow">
              New
            </span>
            <span>Two operating systems in one</span>
            <ArrowRight className="h-3.5 w-3.5 text-iris-300 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>

          {/* H1 */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="mt-7 text-balance text-5xl font-bold leading-[1.02] tracking-tight text-text md:text-7xl"
          >
            Forge the person{" "}
            <span className="text-gradient">you want to become.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-text-muted md:text-lg"
          >
            RankForge unifies planning, focus, habits, analytics, coaching, and
            AI into one offline-first system that helps you execute —
            consistently.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.26 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a href="/download" className="btn-primary w-full sm:w-auto">
              <Download className="h-4 w-4" />
              Download for Windows
            </a>
            <a href="#showcase" className="btn-ghost w-full sm:w-auto">
              <Play className="h-4 w-4 fill-current text-iris-300" />
              Watch demo
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
            className="mt-7 flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2.5 text-sm text-text-muted">
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
              <span>Loved by serious students &amp; ambitious builders</span>
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {TRUST.map(({ label, icon: I }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-3 py-1 text-xs font-medium text-text-dim"
                >
                  <I className="h-3.5 w-3.5 text-iris-300" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  Product mockup                                                  */}
        {/* ---------------------------------------------------------------- */}
        <div className="perspective relative mx-auto mt-16 max-w-5xl md:mt-20">
          {/* glow behind window */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-6 bottom-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-iris-600/30 via-iris-500/15 to-cyan-500/25 blur-[90px]"
          />

          <motion.div
            initial={
              reduce
                ? false
                : { opacity: 0, y: 60, rotateX: 14, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.3 }}
            style={{ transformPerspective: 2000 }}
            className="relative"
          >
            {/* Floating chips */}
            <FloatingChip
              className="left-[-1.5rem] top-16 hidden md:flex lg:left-[-3.5rem]"
              delay={0.9}
              reduce={reduce}
              icon={<Zap className="h-4 w-4 text-cyan-300" />}
              title="Adaptive replan"
              sub="Day rebuilt in 0.3s"
              float="animate-float-slow"
            />
            <FloatingChip
              className="bottom-20 right-[-1.5rem] hidden md:flex lg:right-[-3.5rem]"
              delay={1.05}
              reduce={reduce}
              icon={<Sparkles className="h-4 w-4 text-iris-300" />}
              title="Mentor"
              sub="+340 XP today"
              float="animate-float-slower"
            />

            {/* The window */}
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-card">
              {/* Title bar */}
              <div className="flex items-center gap-3 border-b border-line bg-ink-850/80 px-4 py-3">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-text-muted">
                  RankForge
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                  <Flame className="h-3.5 w-3.5" />
                  14-day streak
                </span>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
                {/* Sidebar */}
                <aside className="hidden flex-col gap-1 border-r border-line bg-ink-900/60 p-3 sm:flex">
                  {NAV.map(({ label, icon: I, active }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-iris-500/15 font-medium text-text ring-1 ring-inset ring-iris-500/30"
                          : "text-text-dim"
                      }`}
                    >
                      <I
                        className={`h-4 w-4 ${
                          active ? "text-iris-300" : "text-text-faint"
                        }`}
                      />
                      {label}
                    </div>
                  ))}

                  {/* Rank card */}
                  <div className="mt-auto rounded-xl border border-line bg-ink-850 p-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-iris-500 to-iris-700 text-white shadow-glow">
                        <Trophy className="h-4 w-4" />
                      </span>
                      <div className="leading-tight">
                        <p className="text-xs font-semibold text-text">
                          Discipline Master
                        </p>
                        <p className="text-[10px] text-text-dim">
                          Lv 12 · 2,940 XP
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
                      <motion.div
                        initial={reduce ? false : { width: 0 }}
                        animate={{ width: "72%" }}
                        transition={{
                          duration: 1.1,
                          ease: EASE,
                          delay: 1,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-iris-400 to-cyan-400"
                      />
                    </div>
                  </div>
                </aside>

                {/* Main */}
                <main className="space-y-4 p-4 md:p-5">
                  {/* Greeting */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-dim">
                      Sunday · June 8
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-text md:text-2xl">
                      Today is a <span className="text-gradient">WIN</span>
                    </h3>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                    {STATS.map(({ label, value, icon: I, tint }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-line bg-ink-850 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wide text-text-dim">
                            {label}
                          </span>
                          <I className={`h-3.5 w-3.5 ${tintMap[tint]}`} />
                        </div>
                        <p className="mt-1.5 text-lg font-bold tabular-nums text-text">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="rounded-xl border border-line bg-ink-850 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-text">
                          Focus minutes
                        </p>
                        <p className="text-[11px] text-text-dim">
                          Last 14 days
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-300">
                        <ArrowRight className="h-3 w-3 -rotate-45" />
                        +42%
                      </span>
                    </div>
                    <svg
                      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                      className="h-32 w-full overflow-visible"
                      preserveAspectRatio="none"
                      role="img"
                      aria-label="Focus minutes trending upward over the last 14 days"
                    >
                      <defs>
                        <linearGradient
                          id="rf-area"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#8b5cf6"
                            stopOpacity="0.32"
                          />
                          <stop
                            offset="100%"
                            stopColor="#8b5cf6"
                            stopOpacity="0"
                          />
                        </linearGradient>
                        <linearGradient
                          id="rf-line"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#a78bfa" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>

                      {/* gridlines */}
                      {[0.25, 0.5, 0.75].map((g) => (
                        <line
                          key={g}
                          x1="0"
                          x2={CHART_W}
                          y1={CHART_H * g}
                          y2={CHART_H * g}
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1"
                        />
                      ))}

                      {/* area fill */}
                      <motion.path
                        d={CHART.area}
                        fill="url(#rf-area)"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                      />

                      {/* animated stroke */}
                      <motion.path
                        d={CHART.line}
                        fill="none"
                        stroke="url(#rf-line)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={
                          reduce
                            ? false
                            : { pathLength: 0, opacity: 0 }
                        }
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          duration: 1.4,
                          ease: EASE,
                          delay: 0.9,
                        }}
                      />

                      {/* end marker */}
                      <motion.circle
                        cx={CHART.coords[CHART.coords.length - 1].x}
                        cy={CHART.coords[CHART.coords.length - 1].y}
                        r="4"
                        fill="#38bdf8"
                        stroke="#050507"
                        strokeWidth="2"
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 2.2 }}
                      />
                    </svg>
                  </div>

                  {/* Bottom row: AI insight + Now block */}
                  <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
                    {/* AI insight */}
                    <div className="rounded-xl border border-iris-500/20 bg-gradient-to-br from-iris-500/10 to-transparent p-3.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-iris-300" />
                        <p className="text-xs font-semibold text-text">
                          AI insight
                        </p>
                      </div>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-text-muted">
                        You focus 23% deeper before 10am. I&apos;ve front-loaded
                        Chemistry PYQs into your morning block.
                      </p>
                    </div>

                    {/* Now block */}
                    <div className="rounded-xl border border-line bg-ink-850 p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-text-dim">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400/70 animate-pulse-ring" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                          </span>
                          Now
                        </span>
                        <span className="text-[11px] tabular-nums text-text-dim">
                          08:30 – 09:15
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-text">
                        Chemistry · PYQ set
                      </p>
                      <p className="text-[11px] text-text-dim">
                        Deep work · 45 min
                      </p>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </motion.div>

          {/* soft fade to ink-950 at the bottom */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[-2rem] h-40 bg-gradient-to-b from-transparent to-ink-950"
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Floating glass chip                                                       */
/* -------------------------------------------------------------------------- */

function FloatingChip({
  className = "",
  delay,
  reduce,
  icon,
  title,
  sub,
  float,
}: {
  className?: string
  delay: number
  reduce: boolean | null
  icon: React.ReactNode
  title: string
  sub: string
  float: string
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={`absolute z-20 ${className}`}
    >
      <div className={`glass-strong flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 shadow-card ${reduce ? "" : float}`}>
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/[0.04]">
          {icon}
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-text">{title}</p>
          <p className="text-[11px] text-text-muted">{sub}</p>
        </div>
      </div>
    </motion.div>
  )
}
