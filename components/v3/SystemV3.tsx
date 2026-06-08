"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Target,
  Wand2,
  Timer,
  CheckCircle2,
  LineChart,
  TrendingUp,
  ArrowRight,
  RotateCw,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading, Reveal } from "../primitives"

type Node = {
  id: string
  step: string
  icon: LucideIcon
  label: string
  desc: string
  accent: "iris" | "cyan" | "amber"
}

const NODES: Node[] = [
  {
    id: "goal",
    step: "01",
    icon: Target,
    label: "Goal",
    desc: "Define the outcome — an exam date or a project deadline.",
    accent: "iris",
  },
  {
    id: "plan",
    step: "02",
    icon: Wand2,
    label: "AI Planning",
    desc: "The engine builds a realistic, weak-spot-aware schedule.",
    accent: "iris",
  },
  {
    id: "focus",
    step: "03",
    icon: Timer,
    label: "Focus",
    desc: "Deep-work sessions turn the plan into time on task.",
    accent: "cyan",
  },
  {
    id: "execution",
    step: "04",
    icon: CheckCircle2,
    label: "Execution",
    desc: "Tasks, mocks, and habits get done and logged locally.",
    accent: "cyan",
  },
  {
    id: "analytics",
    step: "05",
    icon: LineChart,
    label: "Analytics",
    desc: "Every session becomes signal on energy, friction, pace.",
    accent: "amber",
  },
  {
    id: "improvement",
    step: "06",
    icon: TrendingUp,
    label: "Improvement",
    desc: "Adaptive replanning sharpens the next cycle automatically.",
    accent: "amber",
  },
]

const ACCENT: Record<
  Node["accent"],
  { ring: string; text: string; glow: string; dot: string }
> = {
  iris: {
    ring: "border-iris-500/25 bg-iris-500/10",
    text: "text-iris-300",
    glow: "bg-iris-600/20",
    dot: "bg-iris-400",
  },
  cyan: {
    ring: "border-cyan-400/25 bg-cyan-500/10",
    text: "text-cyan-300",
    glow: "bg-cyan-500/20",
    dot: "bg-cyan-400",
  },
  amber: {
    ring: "border-amber-400/25 bg-amber-500/10",
    text: "text-amber-300",
    glow: "bg-amber-500/20",
    dot: "bg-amber-400",
  },
}

const EASE = [0.16, 1, 0.3, 1] as const

/* -------------------------------------------------------------------------- */
/*  Node card                                                                  */
/* -------------------------------------------------------------------------- */

function NodeCard({ node, index }: { node: Node; index: number }) {
  const Ic = node.icon
  const a = ACCENT[node.accent]
  return (
    <Reveal delay={index * 0.07} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-5 transition-colors duration-500 hover:border-line-strong sm:p-6">
        {/* soft per-card glow on hover */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${a.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
        />
        <div className="flex items-center justify-between">
          <span
            className={`grid h-11 w-11 place-items-center rounded-xl border ${a.ring} ${a.text}`}
          >
            <Ic className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${a.dot} opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
            />
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-text-faint">
              {node.step}
            </span>
          </span>
        </div>
        <h3 className="mt-5 text-base font-semibold text-text">{node.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {node.desc}
        </p>
      </div>
    </Reveal>
  )
}

/* -------------------------------------------------------------------------- */
/*  Inline arrow connector (desktop, between cards in a row)                   */
/*  Crisp lucide arrow + an undistorted animated hairline with a flow dot.     */
/* -------------------------------------------------------------------------- */

function RowArrow({
  delay,
  reverse = false,
}: {
  delay: number
  reverse?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <div
      ref={ref}
      className="relative flex flex-1 items-center self-center px-2"
      aria-hidden="true"
    >
      {/* drawing hairline */}
      <span className="relative h-px flex-1 overflow-visible">
        <motion.span
          className={`absolute inset-y-0 left-0 block h-px w-full origin-left ${
            reverse
              ? "bg-gradient-to-l from-amber-400/15 via-amber-400/50 to-iris-500/45"
              : "bg-gradient-to-r from-iris-500/15 via-iris-400/55 to-cyan-400/45"
          }`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay }}
          style={{ transformOrigin: reverse ? "right" : "left" }}
        />
        {/* traveling flow dot */}
        <motion.span
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(125,211,252,0.7)]"
          initial={{
            left: reverse ? "100%" : "0%",
            opacity: 0,
          }}
          animate={
            inView
              ? {
                  left: reverse ? ["100%", "0%"] : ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            delay: delay + 0.4,
            repeat: Infinity,
            repeatDelay: 2.6,
          }}
        />
      </span>
      <ArrowRight
        className={`h-4 w-4 shrink-0 text-cyan-300/80 ${reverse ? "rotate-180" : ""}`}
        strokeWidth={2}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Vertical connector (mobile / tablet stacked layout)                        */
/* -------------------------------------------------------------------------- */

function ColumnConnector({ delay }: { delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <div
      ref={ref}
      className="relative mx-auto h-10 w-px"
      aria-hidden="true"
    >
      <motion.span
        className="absolute inset-0 block w-px origin-top bg-gradient-to-b from-iris-500/50 to-cyan-400/40"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay }}
      />
      <motion.span
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(125,211,252,0.7)]"
        initial={{ top: "0%", opacity: 0 }}
        animate={inView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{
          duration: 1.4,
          ease: "easeInOut",
          delay: delay + 0.3,
          repeat: Infinity,
          repeatDelay: 2.6,
        }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function SystemV3() {
  const loopRef = useRef(null)
  const loopInView = useInView(loopRef, { once: true, margin: "-80px" })

  // Desktop is laid out as a serpentine: top row L→R (0,1,2), bottom row R→L
  // (5,4,3). Reversing the bottom row renders Improvement on the far right so
  // the loop-back ribbon can sweep up the right edge back to Goal.
  const topRow = NODES.slice(0, 3)
  const bottomRow = [...NODES.slice(3)].reverse() // [improvement, analytics, execution]

  return (
    <section id="system" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient depth glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-iris-600/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/8 blur-[120px]"
      />

      <div className="container-rf">
        <SectionHeading
          kicker="How it fits together"
          title={
            <>
              One continuous <span className="text-gradient">loop</span>
            </>
          }
          subtitle="Every part feeds the next. Your goal shapes the plan, the plan drives focus, focus produces data, data improves the plan."
        />

        <div className="relative mt-16 md:mt-20">
          {/* ----------------------------------------------------------------- */}
          {/*  Desktop: serpentine flow — top row L→R, bottom row R→L,           */}
          {/*  closed by a loop-back ribbon up the right edge.                   */}
          {/* ----------------------------------------------------------------- */}
          <div className="hidden lg:block">
            {/* Top row: Goal → AI Planning → Focus */}
            <div className="flex items-stretch">
              {topRow.map((node, i) => (
                <div key={node.id} className="flex flex-1 items-stretch">
                  <div className="w-full min-w-0">
                    <NodeCard node={node} index={i} />
                  </div>
                  {i < topRow.length - 1 && (
                    <div className="flex w-16 shrink-0 xl:w-20">
                      <RowArrow delay={0.4 + i * 0.12} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right-side downward turn: Focus → Execution */}
            <div className="relative flex justify-end pr-[calc((100%/3-1.25rem)/2)]">
              <DownTurn delay={0.7} />
            </div>

            {/* Bottom row: Execution ← Analytics ← Improvement (rendered R→L) */}
            <div className="flex items-stretch">
              {bottomRow.map((node, i) => {
                const globalIndex = NODES.length - 1 - i
                return (
                  <div key={node.id} className="flex flex-1 items-stretch">
                    <div className="w-full min-w-0">
                      <NodeCard node={node} index={globalIndex} />
                    </div>
                    {i < bottomRow.length - 1 && (
                      <div className="flex w-16 shrink-0 xl:w-20">
                        <RowArrow delay={0.85 + i * 0.12} reverse />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Loop-back ribbon: from Improvement (bottom-left) sweeping back to
                Goal (top-left) to close the cycle. */}
            <div
              ref={loopRef}
              className="relative mt-8 h-20"
              aria-hidden="true"
            >
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 1000 80"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id="rf-loop-back"
                    x1="1"
                    y1="0"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="rgba(251,191,36,0.5)" />
                    <stop offset="50%" stopColor="rgba(139,92,246,0.45)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0.65)" />
                  </linearGradient>
                </defs>
                {/* Improvement sits at the far LEFT of the bottom row, so the
                    ribbon dips from the left, runs along, and rises back up to
                    the Goal column (also far left). */}
                <motion.path
                  d="M 40 0 C 40 36, 40 64, 90 66 L 910 66 C 960 64, 960 36, 960 0"
                  fill="none"
                  stroke="url(#rf-loop-back)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="2 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={loopInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
                />
              </svg>

              {/* "loops back" badge centered on the ribbon */}
              <motion.div
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-line-strong bg-ink-900/80 px-4 py-1.5 backdrop-blur"
                initial={{ opacity: 0, y: 6 }}
                animate={loopInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
              >
                <RotateCw
                  className="h-3.5 w-3.5 text-iris-300"
                  strokeWidth={2}
                />
                <span className="text-xs font-medium tracking-wide text-text-muted">
                  Improvement feeds the next goal
                </span>
              </motion.div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/*  Tablet: two-column grid                                           */}
          {/* ----------------------------------------------------------------- */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:hidden">
            {NODES.map((node, i) => (
              <NodeCard key={node.id} node={node} index={i} />
            ))}
          </div>

          {/* ----------------------------------------------------------------- */}
          {/*  Mobile: single stacked column with downward connectors            */}
          {/* ----------------------------------------------------------------- */}
          <div className="sm:hidden">
            {NODES.map((node, i) => (
              <div key={node.id}>
                <NodeCard node={node} index={i} />
                {i < NODES.length - 1 && (
                  <ColumnConnector delay={0.3 + i * 0.1} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile / tablet loop-back chip */}
          <Reveal className="mt-8 flex justify-center lg:hidden">
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-900/80 px-4 py-1.5 backdrop-blur">
              <RotateCw className="h-3.5 w-3.5 text-iris-300" strokeWidth={2} />
              <span className="text-xs font-medium tracking-wide text-text-muted">
                And the loop begins again
              </span>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Right-edge downward turn connecting the top row to the bottom row.         */
/* -------------------------------------------------------------------------- */

function DownTurn({ delay }: { delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <div ref={ref} className="relative my-6 h-12 w-px" aria-hidden="true">
      <motion.span
        className="absolute inset-0 block w-px origin-top bg-gradient-to-b from-cyan-400/50 to-amber-400/40"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay }}
      />
      <motion.span
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(125,211,252,0.7)]"
        initial={{ top: "0%", opacity: 0 }}
        animate={inView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{
          duration: 1.3,
          ease: "easeInOut",
          delay: delay + 0.3,
          repeat: Infinity,
          repeatDelay: 2.8,
        }}
      />
      <ArrowRight
        className="absolute -bottom-1.5 left-1/2 h-4 w-4 -translate-x-1/2 rotate-90 text-amber-300/80"
        strokeWidth={2}
      />
    </div>
  )
}
