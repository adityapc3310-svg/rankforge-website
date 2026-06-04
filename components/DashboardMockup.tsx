"use client"

import { motion } from "framer-motion"
import {
  LayoutDashboard,
  CalendarClock,
  Timer,
  LineChart,
  Repeat,
  Trophy,
  Flame,
  Target,
  Sparkles,
  TrendingUp,
  Play,
} from "lucide-react"

/**
 * A self-contained, production-grade mock of the RankForge desktop dashboard.
 * All charts are hand-built SVG so they animate crisply and carry no chart-lib
 * weight. Used both in the hero (tilted, glow) and the showcase section (flat).
 */
export function DashboardMockup({ animate = true }: { animate?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-line-strong bg-ink-900/90 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs font-medium text-text-dim">RankForge</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
          <Flame className="h-3 w-3" /> 14 day streak
        </span>
      </div>

      <div className="grid grid-cols-[180px_1fr] max-[640px]:grid-cols-1">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-1 border-r border-line p-3 sm:flex">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: CalendarClock, label: "Planner" },
            { icon: Timer, label: "Focus" },
            { icon: Repeat, label: "Habits" },
            { icon: LineChart, label: "Analytics" },
            { icon: Trophy, label: "Rewards" },
          ].map((it) => (
            <div
              key={it.label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                it.active
                  ? "bg-iris-500/15 text-text"
                  : "text-text-dim"
              }`}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </div>
          ))}
          <div className="mt-auto rounded-xl border border-line bg-ink-800 p-3">
            <div className="text-[11px] text-text-dim">Rank</div>
            <div className="mt-0.5 text-sm font-semibold text-gradient-iris">
              Discipline Master
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-600">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-iris-500 to-cyan-400"
                initial={animate ? { width: 0 } : false}
                whileInView={{ width: "68%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
              />
            </div>
            <div className="mt-1.5 text-[10px] text-text-dim">
              Level 12 · 2,940 XP
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="space-y-3 p-4">
          {/* Greeting + verdict */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] text-text-dim">Good morning, Aarav</div>
              <div className="text-lg font-semibold text-text">
                Today is a <span className="text-gradient-iris">WIN</span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-iris-500/15 px-3 py-2 text-[12px] font-medium text-iris-300">
              <Play className="h-3.5 w-3.5" /> Start focus
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-2.5 max-[520px]:grid-cols-2">
            <Stat icon={Timer} tone="iris" label="Focus today" value="3h 12m" sub="+23%" />
            <Stat icon={Flame} tone="amber" label="Streak" value="14" sub="+2 freezes" />
            <Stat icon={Target} tone="cyan" label="Quests" value="4/5" sub="80%" />
            <Stat icon={TrendingUp} tone="iris" label="Score" value="86" sub="WIN" />
          </div>

          {/* Chart + side column */}
          <div className="grid grid-cols-[1.6fr_1fr] gap-2.5 max-[640px]:grid-cols-1">
            <FocusChart animate={animate} />
            <div className="space-y-2.5">
              <AiInsight />
              <NowBlock />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const toneMap = {
  iris: "text-iris-300 bg-iris-500/12",
  cyan: "text-cyan-300 bg-cyan-500/12",
  amber: "text-amber-300 bg-amber-500/12",
} as const

function Stat({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub: string
  tone: keyof typeof toneMap
}) {
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-2.5">
      <div className={`mb-1.5 grid h-7 w-7 place-items-center rounded-lg ${toneMap[tone]}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="text-[10px] text-text-dim">{label}</div>
      <div className="text-base font-bold text-text tabular-nums">{value}</div>
      <div className="text-[10px] text-text-dim">{sub}</div>
    </div>
  )
}

function FocusChart({ animate }: { animate: boolean }) {
  // Smooth area path for a week of focus minutes
  const pts = [22, 40, 34, 58, 48, 72, 86]
  const W = 320
  const H = 120
  const max = 100
  const step = W / (pts.length - 1)
  const coords = pts.map((p, i) => [i * step, H - (p / max) * H])
  const line = coords.map((c, i) => (i === 0 ? `M ${c[0]} ${c[1]}` : `L ${c[0]} ${c[1]}`)).join(" ")
  const area = `${line} L ${W} ${H} L 0 ${H} Z`

  return (
    <div className="rounded-xl border border-line bg-ink-850 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[12px] font-medium text-text">Focus minutes</div>
        <div className="text-[11px] text-cyan-300">This week</div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-28 w-full overflow-visible">
        <defs>
          <linearGradient id="rf-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(139,92,246,0.45)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0)" />
          </linearGradient>
          <linearGradient id="rf-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,0.05)" />
        ))}
        <motion.path
          d={area}
          fill="url(#rf-area)"
          initial={animate ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="url(#rf-line)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : false}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {coords.map((c, i) => (
          <motion.circle
            key={i}
            cx={c[0]}
            cy={c[1]}
            r={i === coords.length - 1 ? 4 : 2.5}
            fill={i === coords.length - 1 ? "#38bdf8" : "#8b5cf6"}
            initial={animate ? { scale: 0 } : false}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.12 }}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-text-faint">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  )
}

function AiInsight() {
  return (
    <div className="rounded-xl border border-iris-500/20 bg-gradient-to-br from-iris-500/10 to-transparent p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-iris-300">
        <Sparkles className="h-3.5 w-3.5" /> AI insight
      </div>
      <p className="text-[11px] leading-relaxed text-text-muted">
        Your focus peaks 7–10 AM. I moved Physics PYQs into that window and
        pushed revision to the evening.
      </p>
    </div>
  )
}

function NowBlock() {
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-3">
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-text-dim">Now</span>
        <span className="flex items-center gap-1 text-cyan-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
          live
        </span>
      </div>
      <div className="text-[13px] font-semibold text-text">Chemistry · PYQ set</div>
      <div className="text-[11px] text-text-dim">08:30 – 09:15 · 45 min</div>
    </div>
  )
}
