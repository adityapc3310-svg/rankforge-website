"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  BrainCircuit,
  MessageSquareHeart,
  Flame,
  BatteryCharging,
  Waves,
  RefreshCcwDot,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading, Reveal } from "../primitives"

/* -------------------------------------------------------------------------- */
/*  Data model                                                                */
/* -------------------------------------------------------------------------- */

type Accent = "iris" | "cyan" | "amber"

type Engine = {
  id: string
  icon: LucideIcon
  name: string
  desc: string
  accent: Accent
  /* satellite position on the desktop ring, in percent of the stage box */
  pos: { x: number; y: number }
  /* anchor side used to attach the connecting line to the hub edge */
  side: "left" | "right" | "top"
}

const ENGINES: Engine[] = [
  {
    id: "mentor",
    icon: MessageSquareHeart,
    name: "AI Mentor",
    desc: "Reads your week and nudges the next right move.",
    accent: "iris",
    pos: { x: 14, y: 16 },
    side: "left",
  },
  {
    id: "burnout",
    icon: Flame,
    name: "Burnout Engine",
    desc: "Catches overload early and dials the plan back.",
    accent: "amber",
    pos: { x: 86, y: 16 },
    side: "right",
  },
  {
    id: "energy",
    icon: BatteryCharging,
    name: "Energy Engine",
    desc: "Maps your peaks, schedules hard work into them.",
    accent: "cyan",
    pos: { x: 6, y: 62 },
    side: "left",
  },
  {
    id: "friction",
    icon: Waves,
    name: "Friction Engine",
    desc: "Finds where you stall and clears the path.",
    accent: "iris",
    pos: { x: 94, y: 62 },
    side: "right",
  },
  {
    id: "replan",
    icon: RefreshCcwDot,
    name: "Adaptive Replanning",
    desc: "Rebuilds the days ahead the moment reality shifts.",
    accent: "cyan",
    pos: { x: 50, y: 92 },
    side: "top",
  },
]

const ACCENT: Record<
  Accent,
  {
    ring: string
    text: string
    dot: string
    glow: string
    stroke: string
    stop: string
  }
> = {
  iris: {
    ring: "border-iris-500/30 bg-iris-500/10",
    text: "text-iris-300",
    dot: "bg-iris-400",
    glow: "bg-iris-600/25",
    stroke: "rgba(139,92,246,0.9)",
    stop: "rgba(139,92,246,0.55)",
  },
  cyan: {
    ring: "border-cyan-400/30 bg-cyan-500/10",
    text: "text-cyan-300",
    dot: "bg-cyan-400",
    glow: "bg-cyan-500/25",
    stroke: "rgba(56,189,248,0.9)",
    stop: "rgba(56,189,248,0.5)",
  },
  amber: {
    ring: "border-amber-400/30 bg-amber-500/10",
    text: "text-amber-300",
    dot: "bg-amber-400",
    glow: "bg-amber-500/25",
    stroke: "rgba(251,191,36,0.85)",
    stop: "rgba(251,191,36,0.5)",
  },
}

const EASE = [0.16, 1, 0.3, 1] as const

/* hub center + radius on the SVG viewBox (0..100 each axis) */
const HUB = { x: 50, y: 50 }
const HUB_RX = 13 // half-width of hub in viewBox units
const HUB_RY = 9 // half-height of hub in viewBox units

/* Compute the point on the hub's rounded edge nearest a satellite so the
   line appears to leave the hub rather than its abstract center. */
function hubAnchor(side: Engine["side"]) {
  switch (side) {
    case "left":
      return { x: HUB.x - HUB_RX, y: HUB.y }
    case "right":
      return { x: HUB.x + HUB_RX, y: HUB.y }
    case "top":
      return { x: HUB.x, y: HUB.y + HUB_RY }
  }
}

/* -------------------------------------------------------------------------- */
/*  Connecting link (desktop SVG): gradient line + animated pulse traveling    */
/* -------------------------------------------------------------------------- */

function Link({
  engine,
  index,
  inView,
}: {
  engine: Engine
  index: number
  inView: boolean
}) {
  const a = ACCENT[engine.accent]
  const from = hubAnchor(engine.side)
  const to = engine.pos
  const gradId = `rf-int-link-${engine.id}`
  const delay = 0.45 + index * 0.12

  return (
    <g>
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
        >
          <stop offset="0%" stopColor="rgba(196,181,253,0.65)" />
          <stop offset="100%" stopColor={a.stop} />
        </linearGradient>
      </defs>

      {/* base line drawing in */}
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={`url(#${gradId})`}
        strokeWidth={0.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />

      {/* faint dashed signal flowing toward the hub */}
      <motion.line
        x1={to.x}
        y1={to.y}
        x2={from.x}
        y2={from.y}
        stroke={a.stroke}
        strokeWidth={0.55}
        strokeLinecap="round"
        strokeDasharray="1.5 9"
        opacity={0.85}
        initial={{ opacity: 0 }}
        animate={
          inView
            ? { opacity: [0, 0.85, 0.85], strokeDashoffset: [0, -42] }
            : {}
        }
        transition={{
          opacity: { duration: 0.6, delay: delay + 0.5 },
          strokeDashoffset: {
            duration: 2.4,
            ease: "linear",
            repeat: Infinity,
            delay: delay + 0.5,
          },
        }}
      />
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/*  Satellite node card                                                        */
/* -------------------------------------------------------------------------- */

function NodeCard({
  engine,
  index,
  floating,
}: {
  engine: Engine
  index: number
  floating?: boolean
}) {
  const Ic = engine.icon
  const a = ACCENT[engine.accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: EASE,
        delay: floating ? 0.55 + index * 0.12 : index * 0.08,
      }}
      className={`group relative w-full overflow-hidden rounded-2xl border border-line bg-ink-900/80 p-4 backdrop-blur-xl transition-colors duration-500 hover:border-line-strong ${
        floating ? "shadow-card" : ""
      }`}
    >
      {/* hover glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full ${a.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="flex items-start gap-3">
        <span
          className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${a.ring} ${a.text}`}
        >
          <Ic className="h-[18px] w-[18px]" strokeWidth={1.75} />
          {/* live ping marker */}
          <span className="absolute -right-1 -top-1 flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${a.dot} opacity-60`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${a.dot}`}
            />
          </span>
        </span>
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold leading-tight text-text">
            {engine.name}
          </h3>
          <p className="mt-1 text-[12px] leading-relaxed text-text-muted">
            {engine.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Central hub node                                                           */
/* -------------------------------------------------------------------------- */

function Hub({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      className="relative flex flex-col items-center"
    >
      {/* pulsing concentric ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-iris-500/20 animate-pulse-ring"
      />
      <div className="relative flex items-center gap-3 rounded-2xl border border-iris-500/30 bg-ink-900/90 px-5 py-4 shadow-glow backdrop-blur-xl">
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-iris-500 to-iris-700 shadow-[0_0_28px_-4px_rgba(124,58,237,0.85)]">
          <BrainCircuit className="h-6 w-6 text-white" strokeWidth={1.75} />
        </span>
        <div className="pr-1">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-iris-300">
            Core
          </div>
          <div className="text-[15px] font-semibold leading-tight text-text">
            RankForge
            <br className="hidden sm:block" />
            <span className="text-gradient">Intelligence</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function IntelligenceV3() {
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { once: true, margin: "-100px" })

  return (
    <section
      id="intelligence"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      {/* ambient depth glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris-600/14 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[14%] top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/8 blur-[120px]"
      />

      <div className="container-rf">
        <SectionHeading
          kicker="The intelligence layer"
          title={
            <>
              A mind that{" "}
              <span className="text-gradient">watches your patterns</span>
            </>
          }
          subtitle="Five engines quietly observe how you actually work, then reshape your days around it."
        />

        {/* ----------------------------------------------------------------- */}
        {/*  Desktop: live network diagram                                     */}
        {/* ----------------------------------------------------------------- */}
        <Reveal delay={0.1} className="mt-16 hidden lg:block">
          <div
            ref={stageRef}
            className="relative mx-auto aspect-[16/10] w-full max-w-4xl"
          >
            {/* central glow behind the hub */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris-600/20 blur-[90px]"
            />

            {/* connecting links — drawn beneath the nodes */}
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {ENGINES.map((e, i) => (
                <Link key={e.id} engine={e} index={i} inView={inView} />
              ))}
            </svg>

            {/* hub at center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Hub inView={inView} />
            </div>

            {/* satellite nodes positioned on the ring */}
            {ENGINES.map((e, i) => (
              <div
                key={e.id}
                className="absolute w-[230px] xl:w-[250px]"
                style={{
                  left: `${e.pos.x}%`,
                  top: `${e.pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <NodeCard engine={e} index={i} floating />
              </div>
            ))}
          </div>
        </Reveal>

        {/* ----------------------------------------------------------------- */}
        {/*  Mobile / tablet: hub banner + stacked grid of engines             */}
        {/* ----------------------------------------------------------------- */}
        <div className="mt-12 lg:hidden">
          <Reveal className="mx-auto mb-8 flex max-w-md justify-center">
            <div className="relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-iris-500/30 bg-ink-900/80 px-5 py-4 shadow-glow backdrop-blur-xl">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-iris-600/25 blur-2xl"
              />
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 shadow-[0_0_24px_-4px_rgba(124,58,237,0.8)]">
                <BrainCircuit className="h-5 w-5 text-white" strokeWidth={1.75} />
              </span>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-iris-300">
                  Core
                </div>
                <div className="text-[15px] font-semibold leading-tight text-text">
                  RankForge <span className="text-gradient">Intelligence</span>
                </div>
              </div>
              <span className="ml-auto flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-iris-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-iris-400" />
              </span>
            </div>
          </Reveal>

          <div className="relative">
            {/* feed line up to the hub on the stacked layout */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-iris-500/40 to-transparent"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ENGINES.map((e, i) => (
                <NodeCard key={e.id} engine={e} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
