"use client"

import { motion } from "framer-motion"
import {
  CheckSquare,
  FileText,
  CalendarDays,
  Timer,
  Layers,
  Flame,
  RotateCcw,
  ArrowRight,
  Zap,
} from "lucide-react"
import { Reveal, SectionHeading } from "../primitives"

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type Pill = {
  label: string
  icon: typeof CheckSquare
  /* position in % within the chaos field — varied, scattered, intentional */
  x: number
  y: number
  /* per-pill float timing so the drift feels organic, not synced */
  delay: number
  duration: number
}

const PILLS: Pill[] = [
  { label: "Tasks", icon: CheckSquare, x: 8, y: 14, delay: 0, duration: 7.5 },
  { label: "Notes", icon: FileText, x: 60, y: 7, delay: 0.8, duration: 8.5 },
  { label: "Calendar", icon: CalendarDays, x: 38, y: 30, delay: 0.4, duration: 6.5 },
  { label: "Pomodoro", icon: Timer, x: 5, y: 54, delay: 1.2, duration: 9 },
  { label: "Flashcards", icon: Layers, x: 66, y: 46, delay: 0.2, duration: 7 },
  { label: "Habit tracker", icon: Flame, x: 30, y: 72, delay: 1.6, duration: 8 },
  { label: "Revision", icon: RotateCcw, x: 64, y: 76, delay: 0.6, duration: 6.8 },
]

/* Centres (in % of the SVG viewBox) used to draw broken dashed links between
   scattered tools — they roughly track the pill anchor points above. */
const NODES = [
  { x: 16, y: 20 },
  { x: 70, y: 14 },
  { x: 47, y: 37 },
  { x: 14, y: 60 },
  { x: 76, y: 53 },
  { x: 40, y: 78 },
  { x: 74, y: 82 },
]

/* Pairs of node indices to connect with broken/dashed lines. Deliberately
   sparse + misaligned to suggest things that *almost* connect but don't. */
const LINKS: [number, number][] = [
  [0, 2],
  [2, 1],
  [2, 4],
  [0, 3],
  [3, 5],
  [5, 6],
  [4, 6],
  [1, 4],
]

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function ProblemV3() {
  return (
    <section id="problem" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-iris-600/10 blur-[140px]"
      />

      <div className="container-rf">
        <SectionHeading
          kicker="The problem"
          title={
            <>
              Your tools don&apos;t{" "}
              <span className="text-gradient">talk to each other</span>
            </>
          }
          subtitle="Tasks here. Notes there. A calendar that has no idea what your goals are. Consistency leaks out through the gaps between apps."
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 grid max-w-5xl items-center gap-6 md:mt-20 md:grid-cols-[1fr_auto_0.78fr]">
            {/* ---------------------------------------------------------- */}
            {/*  CHAOS PANEL                                                */}
            {/* ---------------------------------------------------------- */}
            <ChaosPanel />

            {/* ---------------------------------------------------------- */}
            {/*  TRANSITION  (vs / arrow)                                   */}
            {/* ---------------------------------------------------------- */}
            <Transition />

            {/* ---------------------------------------------------------- */}
            {/*  UNIFIED CORE PANEL                                         */}
            {/* ---------------------------------------------------------- */}
            <CorePanel />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Chaos panel — scattered, broken, desaturated                              */
/* -------------------------------------------------------------------------- */

function ChaosPanel() {
  return (
    <figure className="m-0">
      <div className="relative h-[360px] overflow-hidden rounded-3xl border border-line bg-ink-900/40 sm:h-[400px]">
        {/* faint grid texture for the "workspace" feel */}
        <div aria-hidden className="absolute inset-0 bg-dots opacity-[0.35]" />
        {/* desaturating veil — chaos reads cold + dim next to the bright core */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-ink-950/40 via-transparent to-ink-950/60"
        />

        {/* Broken dashed connections (they don't really connect) */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {LINKS.map(([a, b], i) => {
            const p1 = NODES[a]
            const p2 = NODES[b]
            return (
              <motion.line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="rgba(148,163,184,0.32)"
                strokeWidth={0.4}
                strokeDasharray="2.4 3.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 1,
                  delay: 0.15 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
          {/* little "frayed end" dots to underline the broken-link idea */}
          {NODES.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={0.7}
              fill="rgba(148,163,184,0.45)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Floating tool pills */}
        {PILLS.map((pill) => (
          <FloatingPill key={pill.label} pill={pill} />
        ))}
      </div>

      <figcaption className="mt-4 text-center text-sm text-text-dim">
        Seven apps. Zero memory of your goals.
      </figcaption>
    </figure>
  )
}

function FloatingPill({ pill }: { pill: Pill }) {
  const { label, icon: PillIcon, x, y, delay, duration } = pill
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* drift — subtle, organic, slightly desaturated */}
      <motion.div
        animate={{ y: [0, -7, 0], x: [0, 3, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-text-muted shadow-card saturate-[0.6]"
      >
        <PillIcon className="h-3.5 w-3.5 text-text-dim" aria-hidden />
        <span className="whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Transition — vs / arrow between the two states                            */
/* -------------------------------------------------------------------------- */

function Transition() {
  return (
    <div className="flex items-center justify-center py-2 md:py-0">
      {/* horizontal arrow on desktop */}
      <div className="hidden flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-faint">
          vs
        </span>
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-ink-850 text-iris-300 shadow-glow"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </motion.div>
      </div>

      {/* down arrow on mobile (stacked layout) */}
      <div className="flex flex-col items-center gap-1.5 md:hidden">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-faint">
          vs
        </span>
        <div className="flex h-9 w-9 rotate-90 items-center justify-center rounded-full border border-line-strong bg-ink-850 text-iris-300 shadow-glow">
          <ArrowRight className="h-4 w-4" aria-hidden />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Core panel — one steady, glowing unified node                             */
/* -------------------------------------------------------------------------- */

function CorePanel() {
  /* the seven capabilities, now folded into one engine */
  const spokes = PILLS.map((p) => p.label)

  return (
    <figure className="m-0">
      <div className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-iris-500/30 bg-ink-900/50 sm:h-[400px]">
        {/* steady iris glow behind the core */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris-600/25 blur-[80px]"
        />

        {/* solid converging connectors — everything points inward, cleanly */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {spokes.map((_, i) => {
            const angle = (i / spokes.length) * Math.PI * 2 - Math.PI / 2
            const r = 38
            const x = 50 + Math.cos(angle) * r
            const y = 50 + Math.sin(angle) * r
            return (
              <motion.line
                key={i}
                x1={50}
                y1={50}
                x2={x}
                y2={y}
                stroke="rgba(139,92,246,0.4)"
                strokeWidth={0.4}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>

        {/* the small bright endpoints where every capability now plugs in */}
        {spokes.map((label, i) => {
          const angle = (i / spokes.length) * 360 - 90
          return (
            <div
              key={label}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-iris-300 shadow-[0_0_8px_2px_rgba(196,181,253,0.6)]"
              style={{
                transform: `rotate(${angle}deg) translateX(118px) rotate(${-angle}deg)`,
              }}
              aria-hidden
            />
          )
        })}

        {/* pulsing ring + unified core node */}
        <div className="relative flex items-center justify-center">
          <span
            aria-hidden
            className="absolute h-28 w-28 rounded-full border border-iris-500/40 animate-pulse-ring"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 flex flex-col items-center gap-2 rounded-2xl border border-iris-500/40 bg-ink-850/80 px-6 py-5 shadow-glow"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 text-white shadow-glow">
              <Zap className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-sm font-semibold tracking-tight text-text">
              RankForge
            </span>
            <span className="text-[11px] text-text-dim">One engine</span>
          </motion.div>
        </div>
      </div>

      <figcaption className="mt-4 text-center text-sm font-medium text-iris-300">
        One system that remembers everything.
      </figcaption>
    </figure>
  )
}
