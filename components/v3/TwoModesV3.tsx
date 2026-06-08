"use client"

import { motion } from "framer-motion"
import {
  GraduationCap,
  Rocket,
  Check,
  Cpu,
  BookOpen,
  FlaskConical,
  Stethoscope,
  RotateCcw,
  ClipboardList,
  Database,
  Gauge,
  FolderKanban,
  Timer,
  Repeat,
  Focus,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { SectionHeading, Reveal } from "../primitives"

type Item = { label: string; icon: typeof Check }

const LEFT: Item[] = [
  { label: "Board exams", icon: BookOpen },
  { label: "JEE", icon: FlaskConical },
  { label: "NEET", icon: Stethoscope },
  { label: "Revision", icon: RotateCcw },
  { label: "Mocks", icon: ClipboardList },
  { label: "Question banks", icon: Database },
  { label: "Readiness tracking", icon: Gauge },
]

const RIGHT: Item[] = [
  { label: "Projects", icon: FolderKanban },
  { label: "Deep work", icon: Timer },
  { label: "Habits", icon: Repeat },
  { label: "Focus sessions", icon: Focus },
  { label: "Execution analytics", icon: BarChart3 },
  { label: "Personal growth", icon: Sparkles },
]

const EASE = [0.16, 1, 0.3, 1] as const

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const rowVariants = {
  hidden: { opacity: 0, x: 0, y: 12 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function ModeRow({
  item,
  accent,
}: {
  item: Item
  accent: "iris" | "cyan"
}) {
  const RowIcon = item.icon
  const tint =
    accent === "iris"
      ? "border-iris-500/25 bg-iris-500/10 text-iris-300"
      : "border-cyan-500/25 bg-cyan-500/10 text-cyan-300"
  const check = accent === "iris" ? "text-iris-300" : "text-cyan-300"

  return (
    <motion.li
      variants={rowVariants}
      className="group/row flex items-center gap-3 rounded-2xl border border-line bg-white/[0.015] px-3.5 py-3 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.03]"
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${tint} transition-transform duration-300 group-hover/row:scale-105`}
      >
        <RowIcon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
      </span>
      <span className="flex-1 truncate text-sm font-medium text-text">
        {item.label}
      </span>
      <Check
        aria-hidden
        className={`h-4 w-4 shrink-0 ${check} opacity-50 transition-opacity duration-300 group-hover/row:opacity-100`}
        strokeWidth={2.25}
      />
    </motion.li>
  )
}

function ModeHeader({
  accent,
  icon: HeaderIcon,
  name,
  tag,
  toggleRight,
}: {
  accent: "iris" | "cyan"
  icon: typeof GraduationCap
  name: string
  tag: string
  toggleRight: boolean
}) {
  const badge =
    accent === "iris"
      ? "bg-gradient-to-br from-iris-400 to-iris-700 shadow-glow"
      : "bg-gradient-to-br from-cyan-400 to-cyan-500 shadow-glow-cyan"
  const dot = accent === "iris" ? "bg-iris-400" : "bg-cyan-400"
  const track =
    accent === "iris"
      ? "border-iris-500/30 bg-iris-500/10"
      : "border-cyan-500/30 bg-cyan-500/10"
  const knob = accent === "iris" ? "bg-iris-300" : "bg-cyan-300"

  return (
    <div className="flex items-center gap-4">
      <div
        aria-hidden
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white ${badge}`}
      >
        <HeaderIcon className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          <h3 className="truncate text-base font-semibold tracking-tight text-text">
            {name}
          </h3>
        </div>
        <p className="mt-0.5 truncate text-xs text-text-muted">{tag}</p>
      </div>
      {/* faux toggle, mirrored per panel */}
      <div
        aria-hidden
        className={`flex h-6 w-11 shrink-0 items-center rounded-full border px-0.5 ${track}`}
      >
        <span
          className={`h-4 w-4 rounded-full ${knob} shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all ${
            toggleRight ? "ml-auto" : "mr-auto"
          }`}
        />
      </div>
    </div>
  )
}

export function TwoModesV3() {
  return (
    <section id="modes" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient depth — twin tints mirroring the two operating systems */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute left-0 top-1/2 h-[420px] w-[440px] -translate-y-1/2 rounded-full bg-iris-600/12 blur-[150px]" />
        <div className="absolute right-0 top-1/2 h-[420px] w-[440px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>

      <div className="container-rf">
        <SectionHeading
          kicker="Two modes, one engine"
          title={
            <>
              Two operating systems. <span className="text-gradient">One app.</span>
            </>
          }
          subtitle="Flip a switch in Settings and the whole experience transforms — same install, same data."
        />

        <div className="relative mt-12 md:mt-16">
          {/* glowing center divider (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-6 left-1/2 z-20 hidden -translate-x-1/2 lg:block"
          >
            <div className="relative h-full w-px bg-gradient-to-b from-transparent via-line-strong to-transparent">
              <div className="absolute left-1/2 top-1/2 h-48 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-iris-300/0 via-iris-300/80 to-cyan-300/0 blur-[2px]" />
            </div>
          </div>

          <div
            role="group"
            aria-label="Two operating systems, one shared engine"
            className="relative grid gap-5 lg:grid-cols-2 lg:gap-0"
          >
            {/* ---------- LEFT · Exam Prep OS (iris) ---------- */}
            <Reveal>
              <div className="group relative h-full lg:rounded-r-none">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-iris-600/20 opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                />
                <div className="card-frame relative h-full overflow-hidden p-6 sm:p-7 lg:rounded-r-none lg:p-8">
                  {/* tint wash */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(124,58,237,0.14),transparent_55%)]"
                  />
                  <ModeHeader
                    accent="iris"
                    icon={GraduationCap}
                    name="Exam Prep OS"
                    tag="CBSE · ICSE · JEE · NEET"
                    toggleRight={false}
                  />
                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mt-7 space-y-2.5"
                  >
                    {LEFT.map((item) => (
                      <ModeRow key={item.label} item={item} accent="iris" />
                    ))}
                  </motion.ul>
                </div>
              </div>
            </Reveal>

            {/* mobile connector — bridges the stacked panels with the shared-engine cue */}
            <div
              aria-hidden
              className="relative flex items-center justify-center py-1 lg:hidden"
            >
              <span className="h-8 w-px bg-gradient-to-b from-iris-300/0 via-iris-300/50 to-line-strong" />
              <span className="glass-strong absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-card">
                <Cpu className="h-3.5 w-3.5 text-iris-300" strokeWidth={2} />
                <span className="text-[0.7rem] font-semibold tracking-tight text-text">
                  same engine
                </span>
              </span>
            </div>

            {/* ---------- RIGHT · Productivity OS (cyan) ---------- */}
            <Reveal delay={0.12}>
              <div className="group relative h-full lg:rounded-l-none">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-cyan-500/20 opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                />
                <div className="card-frame relative h-full overflow-hidden p-6 sm:p-7 lg:rounded-l-none lg:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(14,165,233,0.14),transparent_55%)]"
                  />
                  <ModeHeader
                    accent="cyan"
                    icon={Rocket}
                    name="Productivity OS"
                    tag="Projects · Deep work · Focus"
                    toggleRight
                  />
                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mt-7 space-y-2.5"
                  >
                    {RIGHT.map((item) => (
                      <ModeRow key={item.label} item={item} accent="cyan" />
                    ))}
                  </motion.ul>
                </div>
              </div>
            </Reveal>

            {/* center "same engine" badge */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 18 }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            >
              <div className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 shadow-card">
                <span className="relative grid h-6 w-6 place-items-center">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-iris-400/40" />
                  <Cpu className="relative h-4 w-4 text-iris-300" strokeWidth={2} />
                </span>
                <span className="text-xs font-semibold tracking-tight text-text">
                  same engine
                </span>
              </div>
            </motion.div>
          </div>

          {/* center caption */}
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center justify-center gap-3 text-sm text-text-muted">
              <span className="hidden h-px w-12 bg-gradient-to-r from-transparent to-line-strong sm:block" />
              <Cpu className="h-4 w-4 text-text-dim lg:hidden" strokeWidth={1.8} />
              <span className="text-balance text-center">
                Both powered by the{" "}
                <span className="font-medium text-text">same core engine</span>.
              </span>
              <span className="hidden h-px w-12 bg-gradient-to-l from-transparent to-line-strong sm:block" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
