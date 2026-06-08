"use client"

import { useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  LayoutDashboard,
  CalendarRange,
  Timer,
  BarChart3,
  Sparkles,
  GraduationCap,
  Briefcase,
  Flame,
  Brain,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
  Trophy,
  Send,
  Activity,
  Heart,
  Coffee,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading, Reveal } from "../primitives"

/* ------------------------------------------------------------------ *
 * Tab config
 * ------------------------------------------------------------------ */

type TabId =
  | "dashboard"
  | "planner"
  | "focus"
  | "analytics"
  | "ai"
  | "exam"
  | "productivity"

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "planner", label: "Planner", icon: CalendarRange },
  { id: "focus", label: "Focus", icon: Timer },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "ai", label: "AI Assistant", icon: Sparkles },
  { id: "exam", label: "Exam Prep", icon: GraduationCap },
  { id: "productivity", label: "Productivity", icon: Briefcase },
]

const swap = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(6px)" },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
}

/* ------------------------------------------------------------------ *
 * Shared mockup atoms
 * ------------------------------------------------------------------ */

function Panel({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-ink-850/70 p-4 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}

function PanelLabel({
  icon: Ico,
  children,
  accent = "text-iris-300",
}: {
  icon?: LucideIcon
  children: ReactNode
  accent?: string
}) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-text-dim">
      {Ico && <Ico className={`h-3.5 w-3.5 ${accent}`} />}
      {children}
    </div>
  )
}

function Sidebar({ active }: { active: string }) {
  const items = [
    { label: "Today", icon: LayoutDashboard },
    { label: "Planner", icon: CalendarRange },
    { label: "Focus", icon: Timer },
    { label: "Analytics", icon: BarChart3 },
    { label: "Mentor", icon: Brain },
  ]
  return (
    <aside className="hidden w-[168px] shrink-0 flex-col gap-1 border-r border-line/70 bg-ink-900/50 p-3 lg:flex">
      <div className="mb-3 flex items-center gap-2 px-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-iris-500 to-cyan-500 shadow-glow">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-text">
          RankForge
        </span>
      </div>
      {items.map((it) => {
        const on = it.label === active
        return (
          <div
            key={it.label}
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
              on
                ? "bg-iris-500/15 text-text ring-1 ring-inset ring-iris-500/30"
                : "text-text-dim"
            }`}
          >
            <it.icon
              className={`h-4 w-4 ${on ? "text-iris-300" : "text-text-faint"}`}
            />
            {it.label}
          </div>
        )
      })}
      <div className="mt-auto rounded-lg border border-line bg-ink-850/60 p-2.5">
        <div className="flex items-center gap-1.5 text-[11px] text-text-dim">
          <Flame className="h-3.5 w-3.5 text-amber-400" />
          <span className="tabular-nums text-text">47-day</span> streak
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-dim">
          <Trophy className="h-3.5 w-3.5 text-iris-300" />
          Rank <span className="text-text">Architect</span>
        </div>
      </div>
    </aside>
  )
}

/* tiny inline area-chart used in a couple of mockups */
function MiniArea({
  data,
  stroke = "#a78bfa",
  fill = "rgba(167,139,250,0.18)",
  className = "",
}: {
  data: number[]
  stroke?: string
  fill?: string
  className?: string
}) {
  const w = 240
  const h = 64
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const step = w / (data.length - 1)
  const pts = data.map((d, i) => {
    const x = i * step
    const y = h - ((d - min) / span) * (h - 8) - 4
    return [x, y] as const
  })
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={`h-16 w-full ${className}`}
    >
      <path d={area} fill={fill} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Ring({
  value,
  size = 116,
  stroke = 9,
  color = "#a78bfa",
  track = "rgba(255,255,255,0.08)",
  children,
}: {
  value: number
  size?: number
  stroke?: number
  color?: string
  track?: string
  children?: ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (value / 100) * c
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={track}
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup: Dashboard
 * ------------------------------------------------------------------ */

function MockDashboard() {
  const stats = [
    { label: "Focus today", value: "4h 12m", icon: Timer, tint: "text-iris-300" },
    { label: "Tasks done", value: "11 / 14", icon: CheckCircle2, tint: "text-cyan-300" },
    { label: "Day streak", value: "47", icon: Flame, tint: "text-amber-400" },
    { label: "XP this week", value: "2,840", icon: Zap, tint: "text-iris-300" },
  ]
  return (
    <div className="flex">
      <Sidebar active="Today" />
      <div className="flex-1 space-y-4 p-4 md:p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-text-dim">
              Monday · Jun 8
            </p>
            <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-text">
              Good morning, Aarav
            </h3>
          </div>
          <span className="rounded-full border border-iris-500/30 bg-iris-500/10 px-2.5 py-1 text-[11px] font-medium text-iris-300">
            On track
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <Panel key={s.label} className="p-3">
              <s.icon className={`h-4 w-4 ${s.tint}`} />
              <div className="mt-3 text-xl font-semibold tabular-nums tracking-tight text-text">
                {s.value}
              </div>
              <div className="mt-0.5 text-[11px] text-text-dim">{s.label}</div>
            </Panel>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          <Panel className="md:col-span-3">
            <PanelLabel icon={Clock}>Now block</PanelLabel>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-iris-500/30 bg-iris-500/10 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-iris-500/20">
                <Brain className="h-5 w-5 text-iris-300" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-text">
                  Deep work · Physics — Rotational Motion
                </div>
                <div className="text-[11px] text-text-dim">
                  09:00 – 10:30 · 38 min left
                </div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-base font-semibold tabular-nums text-iris-300">
                  38:04
                </div>
              </div>
            </div>
            <div className="mt-3">
              <PanelLabel icon={TrendingUp}>Focus this week</PanelLabel>
              <MiniArea
                className="mt-2"
                data={[22, 35, 28, 48, 41, 62, 54]}
              />
            </div>
          </Panel>

          <Panel className="md:col-span-2">
            <PanelLabel icon={Target}>Up next</PanelLabel>
            <ul className="mt-3 space-y-2.5">
              {[
                { t: "Maths mock — Set C", time: "11:00", c: "bg-cyan-400" },
                { t: "Revise: Organic reactions", time: "13:30", c: "bg-iris-400" },
                { t: "Habit · Read 20 pages", time: "20:00", c: "bg-amber-400" },
              ].map((r) => (
                <li key={r.t} className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full ${r.c}`} />
                  <span className="flex-1 truncate text-[13px] text-text-muted">
                    {r.t}
                  </span>
                  <span className="text-[11px] tabular-nums text-text-dim">
                    {r.time}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup: Planner
 * ------------------------------------------------------------------ */

function MockPlanner() {
  const blocks = [
    { t: "08:00", h: "Morning routine", type: "Habit", c: "amber", span: 1, now: false },
    { t: "09:00", h: "Deep work · Physics", type: "Focus", c: "iris", span: 1.5, now: true },
    { t: "11:00", h: "Maths mock — Set C", type: "Exam", c: "cyan", span: 1, now: false },
    { t: "13:30", h: "Revise organic reactions", type: "Revision", c: "iris", span: 1, now: false },
    { t: "16:00", h: "Side project · Landing", type: "Project", c: "cyan", span: 1.5, now: false },
    { t: "20:00", h: "Read 20 pages", type: "Habit", c: "amber", span: 1, now: false },
  ]
  const tint: Record<string, string> = {
    iris: "border-iris-500/40 bg-iris-500/12",
    cyan: "border-cyan-500/40 bg-cyan-500/12",
    amber: "border-amber-500/40 bg-amber-500/12",
  }
  const dot: Record<string, string> = {
    iris: "bg-iris-400",
    cyan: "bg-cyan-400",
    amber: "bg-amber-400",
  }
  return (
    <div className="flex">
      <Sidebar active="Planner" />
      <div className="flex-1 p-4 md:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-text">
            Today&apos;s plan
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-text-dim">
            <span className="rounded-full bg-iris-500/15 px-2 py-1 text-iris-300">
              AI-balanced
            </span>
            <span className="tabular-nums">6 blocks · 7h 30m</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {blocks.map((b) => (
            <div key={b.t} className="flex gap-3">
              <div className="w-12 shrink-0 pt-2 text-right text-[11px] tabular-nums text-text-dim">
                {b.t}
              </div>
              <div
                className={`relative flex-1 rounded-xl border px-3.5 py-2.5 ${tint[b.c]} ${
                  b.now ? "ring-1 ring-iris-400/60" : ""
                }`}
                style={{ minHeight: `${b.span * 44}px` }}
              >
                {b.now && (
                  <span className="absolute -left-[6.5px] top-1/2 flex h-3 w-3 -translate-y-1/2 items-center justify-center">
                    <span className="absolute h-3 w-3 animate-pulse-ring rounded-full bg-iris-400/60" />
                    <span className="h-2 w-2 rounded-full bg-iris-300 shadow-[0_0_8px_2px_rgba(167,139,250,0.8)]" />
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${dot[b.c]}`} />
                  <span className="text-[13px] font-medium text-text">
                    {b.h}
                  </span>
                  {b.now && (
                    <span className="ml-auto rounded-full bg-iris-500/20 px-2 py-0.5 text-[10px] font-medium text-iris-300">
                      Now
                    </span>
                  )}
                </div>
                <div className="mt-1 pl-4 text-[11px] text-text-dim">
                  {b.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup: Focus
 * ------------------------------------------------------------------ */

function FlipDigit({ d }: { d: string }) {
  return (
    <div className="relative flex h-20 w-14 items-center justify-center rounded-xl border border-line-strong bg-gradient-to-b from-ink-700 to-ink-850 shadow-card md:h-24 md:w-16">
      <span className="text-4xl font-semibold tabular-nums tracking-tight text-text md:text-5xl">
        {d}
      </span>
      <span className="absolute left-0 right-0 top-1/2 h-px bg-black/40" />
    </div>
  )
}

function MockFocus() {
  return (
    <div className="flex">
      <Sidebar active="Focus" />
      <div className="flex-1 p-4 md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-iris-400/70" />
              <span className="h-2 w-2 rounded-full bg-iris-300" />
            </span>
            <span className="text-[13px] font-medium text-iris-300">
              Deep work — in session
            </span>
          </div>
          <span className="rounded-full border border-line bg-ink-850/60 px-2.5 py-1 text-[11px] text-text-dim">
            Do Not Disturb
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 py-4 md:flex-row md:justify-center md:gap-10">
          <div className="flex items-end gap-2">
            <FlipDigit d="2" />
            <FlipDigit d="4" />
            <span className="pb-6 text-3xl font-semibold text-text-dim md:text-4xl">
              :
            </span>
            <FlipDigit d="0" />
            <FlipDigit d="7" />
          </div>

          <Ring value={68} size={140} stroke={10} color="#a78bfa">
            <span className="text-2xl font-semibold tabular-nums text-text">
              68%
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-text-dim">
              session
            </span>
          </Ring>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { l: "Task", v: "Physics — Rotation", i: Brain },
            { l: "Blocks today", v: "3 / 5", i: Target },
            { l: "Focus streak", v: "12 days", i: Flame },
          ].map((s) => (
            <Panel key={s.l} className="p-3 text-center">
              <s.i className="mx-auto h-4 w-4 text-iris-300" />
              <div className="mt-2 truncate text-[13px] font-medium text-text">
                {s.v}
              </div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-text-dim">
                {s.l}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup: Analytics
 * ------------------------------------------------------------------ */

function Heatmap() {
  const weeks = 14
  const days = 7
  // deterministic pseudo-data
  const level = (w: number, d: number) => {
    const v = (Math.sin(w * 1.7 + d * 0.9) + 1) / 2
    return Math.floor(v * 4)
  }
  const cls = [
    "bg-ink-700",
    "bg-iris-500/30",
    "bg-iris-500/55",
    "bg-iris-400/80",
  ]
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: days }).map((_, d) => (
            <span
              key={d}
              className={`h-2.5 w-2.5 rounded-[3px] ${cls[level(w, d)]}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function MockAnalytics() {
  return (
    <div className="flex">
      <Sidebar active="Analytics" />
      <div className="flex-1 space-y-4 p-4 md:p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-text">
            Performance
          </h3>
          <div className="flex gap-1 rounded-lg border border-line bg-ink-850/60 p-0.5 text-[11px]">
            {["Week", "Month", "Year"].map((t, i) => (
              <span
                key={t}
                className={`rounded-md px-2 py-1 ${
                  i === 1 ? "bg-iris-500/20 text-iris-300" : "text-text-dim"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { l: "Total focus", v: "86h", d: "+14%", up: true },
            { l: "Avg / day", v: "3h 4m", d: "+22m", up: true },
            { l: "Consistency", v: "92%", d: "+6%", up: true },
          ].map((k) => (
            <Panel key={k.l} className="p-3">
              <div className="text-[11px] text-text-dim">{k.l}</div>
              <div className="mt-1 text-lg font-semibold tabular-nums tracking-tight text-text">
                {k.v}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-cyan-300">
                <TrendingUp className="h-3 w-3" />
                {k.d}
              </div>
            </Panel>
          ))}
        </div>

        <Panel>
          <div className="flex items-center justify-between">
            <PanelLabel icon={Activity}>Focus minutes</PanelLabel>
            <span className="text-[11px] tabular-nums text-text-dim">
              peak 4h 50m · Sat
            </span>
          </div>
          <MiniArea
            className="mt-3 !h-24"
            data={[42, 58, 50, 74, 66, 96, 88, 70, 84, 60, 78, 92]}
            stroke="#38bdf8"
            fill="rgba(56,189,248,0.16)"
          />
          <div className="mt-1 flex justify-between text-[10px] tabular-nums text-text-faint">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between">
            <PanelLabel icon={Flame} accent="text-amber-400">
              Consistency map
            </PanelLabel>
            <span className="text-[11px] text-text-dim">last 14 weeks</span>
          </div>
          <div className="mt-3 overflow-hidden">
            <Heatmap />
          </div>
        </Panel>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup: AI Assistant
 * ------------------------------------------------------------------ */

function MockAI() {
  return (
    <div className="flex">
      <Sidebar active="Mentor" />
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-iris-500 to-cyan-500 shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-text">AI Mentor</div>
            <div className="text-[11px] text-text-dim">
              Runs 100% on-device
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm border border-line bg-ink-700/70 px-3.5 py-2.5 text-[13px] text-text-muted">
            Plan my week for the Physics + Maths mocks. I have ~5h a day.
          </div>

          <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-iris-500/25 bg-iris-500/10 px-3.5 py-3">
            <p className="text-[13px] leading-relaxed text-text">
              Done. I balanced your week around your energy peaks and protected
              recovery time. Here&apos;s what changed:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { t: "Added 6 focus blocks", i: CheckCircle2, c: "iris" },
                { t: "Scheduled 2 mocks", i: GraduationCap, c: "cyan" },
                { t: "Protected sleep window", i: Heart, c: "amber" },
                { t: "Replanned Thu (low energy)", i: Brain, c: "iris" },
              ].map((chip) => (
                <span
                  key={chip.t}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                    chip.c === "iris"
                      ? "border-iris-500/30 bg-iris-500/15 text-iris-300"
                      : chip.c === "cyan"
                        ? "border-cyan-500/30 bg-cyan-500/15 text-cyan-300"
                        : "border-amber-500/30 bg-amber-500/15 text-amber-300"
                  }`}
                >
                  <chip.i className="h-3 w-3" />
                  {chip.t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-text-dim">
            <Activity className="h-3.5 w-3.5 text-cyan-300" />
            Friction engine flagged: 2 tasks too vague — I split them.
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-ink-850/80 px-3 py-2.5">
            <Sparkles className="h-4 w-4 text-iris-300" />
            <span className="flex-1 text-[13px] text-text-dim">
              Ask anything, or type a command…
            </span>
            <button
              aria-label="Send message to AI Mentor"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-iris-500 text-white shadow-glow"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup: Exam Prep
 * ------------------------------------------------------------------ */

function MockExam() {
  const chapters = [
    { name: "Rotational Motion", v: 86, c: "bg-iris-400" },
    { name: "Thermodynamics", v: 72, c: "bg-cyan-400" },
    { name: "Organic Chemistry", v: 54, c: "bg-amber-400" },
    { name: "Calculus", v: 91, c: "bg-iris-400" },
    { name: "Electrostatics", v: 38, c: "bg-amber-400" },
  ]
  return (
    <div className="flex">
      <Sidebar active="Analytics" />
      <div className="flex-1 space-y-4 p-4 md:p-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[11px] font-medium text-cyan-300">
              JEE 2027
            </span>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-text">
              Exam readiness
            </h3>
          </div>
          <span className="text-[11px] tabular-nums text-text-dim">
            312 days left
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          <Panel className="flex flex-col items-center justify-center md:col-span-2">
            <Ring value={74} size={124} color="#38bdf8">
              <span className="text-2xl font-semibold tabular-nums text-text">
                74
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-text-dim">
                readiness
              </span>
            </Ring>
            <div className="mt-2 text-[11px] text-text-dim">
              On pace for <span className="text-cyan-300">top 5%</span>
            </div>
          </Panel>

          <Panel className="md:col-span-3">
            <PanelLabel icon={Target}>Chapter mastery</PanelLabel>
            <ul className="mt-3 space-y-2.5">
              {chapters.map((c) => (
                <li key={c.name} className="space-y-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-text-muted">{c.name}</span>
                    <span className="tabular-nums text-text-dim">{c.v}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
                    <motion.div
                      className={`h-full rounded-full ${c.c}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${c.v}%` }}
                      transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel>
          <PanelLabel icon={GraduationCap} accent="text-cyan-300">
            Recent mocks
          </PanelLabel>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { n: "Full Mock 14", s: "248 / 300", d: "+18" },
              { n: "Physics Set C", s: "92 / 120", d: "+7" },
              { n: "Chem Set A", s: "78 / 120", d: "−4" },
            ].map((m, i) => (
              <div
                key={m.n}
                className="rounded-xl border border-line bg-ink-800/60 p-2.5"
              >
                <div className="text-[11px] text-text-dim">{m.n}</div>
                <div className="mt-1 text-sm font-semibold tabular-nums text-text">
                  {m.s}
                </div>
                <div
                  className={`text-[11px] tabular-nums ${
                    i === 2 ? "text-amber-400" : "text-cyan-300"
                  }`}
                >
                  {m.d} vs last
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup: Productivity
 * ------------------------------------------------------------------ */

function MockProductivity() {
  const areas = [
    { name: "Work", icon: Briefcase, v: 62, c: "iris", hrs: "18h" },
    { name: "Health", icon: Heart, v: 81, c: "amber", hrs: "6h" },
    { name: "Side project", icon: Coffee, v: 45, c: "cyan", hrs: "9h" },
  ]
  const tint: Record<string, string> = {
    iris: "text-iris-300",
    amber: "text-amber-400",
    cyan: "text-cyan-300",
  }
  const bar: Record<string, string> = {
    iris: "bg-iris-400",
    amber: "bg-amber-400",
    cyan: "bg-cyan-400",
  }
  const blocks = [
    { t: "Q3 roadmap draft", area: "Work", time: "90m", c: "iris" },
    { t: "Strength training", area: "Health", time: "45m", c: "amber" },
    { t: "Landing page build", area: "Side project", time: "120m", c: "cyan" },
  ]
  return (
    <div className="flex">
      <Sidebar active="Today" />
      <div className="flex-1 space-y-4 p-4 md:p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-text">
            Life areas
          </h3>
          <span className="rounded-full bg-iris-500/15 px-2.5 py-1 text-[11px] font-medium text-iris-300">
            Productivity OS
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {areas.map((a) => (
            <Panel key={a.name} className="p-3">
              <div className="flex items-center justify-between">
                <a.icon className={`h-4 w-4 ${tint[a.c]}`} />
                <span className="text-[11px] tabular-nums text-text-dim">
                  {a.hrs}
                </span>
              </div>
              <div className="mt-3 text-[13px] font-medium text-text">
                {a.name}
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-700">
                <motion.div
                  className={`h-full rounded-full ${bar[a.c]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${a.v}%` }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="mt-1 text-[10px] tabular-nums text-text-dim">
                {a.v}% of weekly goal
              </div>
            </Panel>
          ))}
        </div>

        <Panel>
          <div className="flex items-center justify-between">
            <PanelLabel icon={Timer}>Deep-work blocks</PanelLabel>
            <span className="text-[11px] tabular-nums text-text-dim">
              today · 4h 15m
            </span>
          </div>
          <ul className="mt-3 space-y-2.5">
            {blocks.map((b) => (
              <li
                key={b.t}
                className="flex items-center gap-3 rounded-xl border border-line bg-ink-800/50 px-3 py-2.5"
              >
                <span className={`h-7 w-1 rounded-full ${bar[b.c]}`} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-text">
                    {b.t}
                  </div>
                  <div className="text-[11px] text-text-dim">{b.area}</div>
                </div>
                <span className="rounded-md border border-line bg-ink-850/70 px-2 py-1 text-[11px] tabular-nums text-text-muted">
                  {b.time}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="grid grid-cols-3 gap-3">
          {[
            { l: "Habits kept", v: "5 / 6", i: CheckCircle2 },
            { l: "Flow time", v: "2h 40m", i: Zap },
            { l: "Energy", v: "High", i: Activity },
          ].map((s) => (
            <Panel key={s.l} className="p-3">
              <s.i className="h-4 w-4 text-iris-300" />
              <div className="mt-2 text-base font-semibold tabular-nums text-text">
                {s.v}
              </div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-text-dim">
                {s.l}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup router
 * ------------------------------------------------------------------ */

function MockContent({ id }: { id: TabId }) {
  switch (id) {
    case "dashboard":
      return <MockDashboard />
    case "planner":
      return <MockPlanner />
    case "focus":
      return <MockFocus />
    case "analytics":
      return <MockAnalytics />
    case "ai":
      return <MockAI />
    case "exam":
      return <MockExam />
    case "productivity":
      return <MockProductivity />
    default:
      return null
  }
}

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */

export function ShowcaseV3() {
  const [active, setActive] = useState<TabId>("dashboard")

  return (
    <section id="showcase" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-iris-600/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 -z-10 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <div className="container-rf">
        <SectionHeading
          kicker="See it in motion"
          title={
            <>
              The whole system,{" "}
              <span className="text-gradient">on one screen</span>
            </>
          }
          subtitle="Real workspaces — not concept art."
        />

        {/* Tab bar */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Product showcase views"
            className="mask-fade-edges mt-12 flex gap-1.5 overflow-x-auto pb-1 md:justify-center"
          >
            {TABS.map((tab) => {
              const on = tab.id === active
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(tab.id)}
                  className={`relative shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    on ? "text-text" : "text-text-dim hover:text-text-muted"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="showcase-tab-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-iris-500/40 bg-iris-500/15 shadow-[0_0_24px_-6px_rgba(139,92,246,0.6)]"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="flex items-center gap-1.5">
                    <tab.icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* App window */}
        <Reveal delay={0.15}>
          <div className="perspective mt-8">
            <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-900/80 shadow-card backdrop-blur-xl md:rounded-[20px]">
              {/* Title bar */}
              <div className="flex items-center gap-3 border-b border-line bg-ink-850/80 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md border border-line bg-ink-800/70 px-3 py-1 text-[11px] text-text-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_1px_rgba(56,189,248,0.7)]" />
                  RankForge — {TABS.find((t) => t.id === active)?.label}
                  <span className="ml-1 hidden text-text-faint sm:inline">
                    · offline
                  </span>
                </div>
                <div className="flex w-[54px] items-center justify-end gap-1.5">
                  <span className="h-1 w-3 rounded-full bg-ink-600" />
                  <span className="h-3 w-3 rounded-[3px] border border-ink-500" />
                </div>
              </div>

              {/* Swappable content */}
              <div className="relative min-h-[420px] bg-ink-950/40 md:min-h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    role="tabpanel"
                    initial={swap.initial}
                    animate={swap.animate}
                    exit={swap.exit}
                    transition={swap.transition}
                  >
                    <MockContent id={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-[13px] text-text-dim">
            One engine. Switch between{" "}
            <span className="text-iris-300">Exam Prep</span> and{" "}
            <span className="text-cyan-300">Productivity</span> without leaving
            the app — everything stays{" "}
            <span className="text-text-muted">100% local</span>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
