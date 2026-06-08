"use client"

import { motion } from "framer-motion"
import {
  Flame,
  Snowflake,
  Trophy,
  Zap,
  Target,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Check,
  TrendingUp,
} from "lucide-react"
import {
  Reveal,
  SectionHeading,
  SpotlightCard,
  Counter,
} from "../primitives"

const EASE = [0.16, 1, 0.3, 1] as const

const CHIPS = [
  { label: "XP", icon: Zap },
  { label: "Levels", icon: TrendingUp },
  { label: "Ranks", icon: Trophy },
  { label: "Streaks", icon: Flame },
  { label: "Quests", icon: Target },
  { label: "Recovery Mode", icon: HeartPulse },
  { label: "Burnout Protection", icon: ShieldCheck },
]

const QUESTS = [
  { label: "Deep work · 2 sessions", done: 2, total: 2, xp: 120 },
  { label: "Physics — 30 problems", done: 22, total: 30, xp: 90 },
  { label: "Review yesterday's notes", done: 0, total: 1, xp: 40 },
]

/* ------------------------------------------------------------------ */
/* Left column: the narrative + feature chips                          */
/* ------------------------------------------------------------------ */

function NarrativeColumn() {
  const points = [
    {
      icon: Zap,
      title: "Every action earns progress",
      body: "Finish a session, clear a quest, hold a streak — XP accrues, levels climb, ranks unlock. Effort becomes visible.",
    },
    {
      icon: Flame,
      title: "Streaks that forgive",
      body: "Miss a day? Freezes protect your run so one bad day never erases a month of momentum.",
    },
    {
      icon: HeartPulse,
      title: "It reads your strain",
      body: "When the Burnout & Energy engines detect you're running on empty, the system eases off instead of piling on.",
    },
  ]

  return (
    <div className="flex flex-col">
      <Reveal>
        <span className="kicker">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(56,189,248,0.7)]" />
          The reward loop
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h3 className="mt-5 max-w-md text-balance text-2xl font-bold tracking-tight text-text md:text-3xl">
          Motivation you can&apos;t out-discipline yourself out of.
        </h3>
      </Reveal>

      <div className="mt-8 flex flex-col gap-6">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={0.12 + i * 0.08}>
            <div className="flex gap-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-800 text-iris-300 shadow-card">
                <p.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-text">{p.title}</p>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Feature chips */}
      <Reveal delay={0.4}>
        <ul className="mt-10 flex flex-wrap gap-2">
          {CHIPS.map((c) => {
            const calm = c.label === "Recovery Mode" || c.label === "Burnout Protection"
            return (
              <li
                key={c.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  calm
                    ? "border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-300"
                    : "border-line bg-ink-800/70 text-text-muted hover:border-line-strong hover:text-text"
                }`}
              >
                <c.icon className="h-3.5 w-3.5" strokeWidth={2} />
                {c.label}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Right column: the live progress-panel mockup                        */
/* ------------------------------------------------------------------ */

function ProgressPanel() {
  const questsDone = QUESTS.filter((q) => q.done >= q.total).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative"
      role="group"
      aria-label="Progress dashboard preview: rank, streak, XP and daily quests"
    >
      {/* depth glows */}
      <div className="pointer-events-none absolute -right-10 -top-12 -z-10 h-56 w-56 rounded-full bg-iris-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-8 -z-10 h-56 w-56 rounded-full bg-cyan-500/15 blur-[120px]" />

      <div className="glass-strong relative overflow-hidden rounded-4xl border border-line-strong p-px shadow-card">
        {/* top accent line */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-iris-400/60 to-transparent" />

        <div className="rounded-[calc(2rem-1px)] bg-ink-900/60 p-5 sm:p-6">
          {/* window chrome */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
              Progress
            </span>
          </div>

          {/* Rank + level */}
          <div className="rounded-2xl border border-line bg-ink-850/70 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-iris-500/30 to-iris-700/20 text-iris-300 ring-1 ring-iris-400/30">
                  <Trophy className="h-5 w-5" strokeWidth={1.75} />
                  <span className="absolute inset-0 -z-10 rounded-xl bg-iris-500/30 blur-md" />
                </span>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-dim">
                    Current rank
                  </p>
                  <p className="text-[15px] font-semibold text-text">
                    Discipline Master
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-xl font-bold leading-none text-text">
                  Lv 24
                </p>
                <p className="mt-1 text-[10px] text-text-dim">next: Lv 25</p>
              </div>
            </div>

            {/* level bar */}
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-[11px]">
                <span className="text-text-muted">2,940 / 3,200 XP</span>
                <span className="text-iris-300">92%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-ink-700">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                  className="relative h-full rounded-full bg-gradient-to-r from-iris-500 to-cyan-400"
                >
                  <span className="absolute inset-0 animate-shimmer rounded-full bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.45)_50%,transparent_60%)] bg-[length:200%_100%]" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Streak + XP stat row */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {/* Streak */}
            <div className="rounded-2xl border border-line bg-ink-850/70 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                  <Flame className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-dim">
                  Streak
                </span>
              </div>
              <p className="mt-3 flex items-baseline gap-1.5 font-mono text-xl font-bold leading-none text-text sm:text-2xl">
                14
                <span className="text-sm font-medium text-text-muted">days</span>
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] px-2 py-1 text-[10px] font-medium text-cyan-300">
                <Snowflake className="h-3 w-3 shrink-0" strokeWidth={2} />
                <span className="whitespace-nowrap">2 freezes left</span>
              </span>
            </div>

            {/* XP */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-850/70 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-iris-500/15 text-iris-300">
                  <Zap className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-dim">
                  Total XP
                </span>
              </div>
              <p className="mt-3 font-mono text-xl font-bold leading-none text-text sm:text-2xl">
                <Counter to={2940} suffix=" XP" duration={2.2} />
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-iris-300">
                <Sparkles className="h-3 w-3" strokeWidth={2} />
                +250 today
              </p>
            </div>
          </div>

          {/* Quests */}
          <div className="mt-3 rounded-2xl border border-line bg-ink-850/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-iris-300" strokeWidth={1.75} />
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-dim">
                  Daily quests
                </span>
              </div>
              <span className="font-mono text-[11px] text-text-muted">
                {questsDone} / {QUESTS.length}
              </span>
            </div>

            <ul className="flex flex-col gap-2.5">
              {QUESTS.map((q, i) => {
                const complete = q.done >= q.total
                const pct = Math.round((q.done / q.total) * 100)
                return (
                  <li key={q.label} className="flex items-center gap-3">
                    <span className="sr-only">
                      {q.label} —{" "}
                      {complete ? "complete" : `${q.done} of ${q.total} done`}
                    </span>
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        complete
                          ? "border-cyan-400/40 bg-cyan-500/20 text-cyan-300"
                          : "border-line-strong bg-ink-800 text-text-faint"
                      }`}
                      aria-hidden
                    >
                      {complete && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <div className="min-w-0 flex-1" aria-hidden>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`truncate text-[13px] ${
                            complete
                              ? "text-text-dim line-through"
                              : "text-text"
                          }`}
                        >
                          {q.label}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] text-iris-300">
                          +{q.xp}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink-700">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            ease: EASE,
                            delay: 0.4 + i * 0.12,
                          }}
                          className={`h-full rounded-full ${
                            complete
                              ? "bg-cyan-400"
                              : "bg-gradient-to-r from-iris-500 to-iris-400"
                          }`}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Recovery Mode callout                                               */
/* ------------------------------------------------------------------ */

function RecoveryCallout() {
  return (
    <Reveal delay={0.15}>
      <SpotlightCard className="relative overflow-hidden rounded-4xl p-6 md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-cyan-500/15 blur-[90px]" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
              <HeartPulse className="h-6 w-6" strokeWidth={1.75} />
              <span className="absolute inset-0 -z-10 rounded-2xl bg-cyan-500/20 blur-md" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-text">
                  Recovery Mode
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]" />
                  Active
                </span>
              </div>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                Strain is high this week, so penalties are suppressed and your
                streak is shielded. Quests scale back to gentle targets — you
                rebuild instead of breaking.
              </p>
            </div>
          </div>

          {/* mini status readout */}
          <div className="flex shrink-0 gap-3">
            {[
              { label: "Penalties", value: "Paused", tone: "text-cyan-300" },
              { label: "Streak", value: "Shielded", tone: "text-cyan-300" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex-1 rounded-2xl border border-line bg-ink-850/70 px-4 py-3 text-center md:flex-none md:min-w-[104px]"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-text-dim">
                  {s.label}
                </p>
                <p className={`mt-1 text-sm font-semibold ${s.tone}`}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function ConsistencyV3() {
  return (
    <section
      id="consistency"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      {/* ambient depth */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-iris-600/10 blur-[140px]" />

      <div className="container-rf">
        <SectionHeading
          kicker="Momentum, engineered"
          title={
            <>
              Discipline without{" "}
              <span className="text-gradient">self-destruction</span>
            </>
          }
          subtitle="XP, levels, ranks, streaks and daily quests make consistency addictive — and when you're running on empty, it eases off instead of punishing you."
        />

        <div className="mt-16 grid items-start gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <NarrativeColumn />
          <ProgressPanel />
        </div>

        <div className="mt-10 lg:mt-12">
          <RecoveryCallout />
        </div>
      </div>
    </section>
  )
}
