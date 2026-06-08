"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import {
  Sparkles,
  CornerDownLeft,
  BookOpen,
  Brain,
  RotateCcw,
  Users,
  Briefcase,
  Coffee,
  Dumbbell,
  Moon,
  Wand2,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading, Reveal } from "../primitives"

/* -------------------------------------------------------------------------- */
/*  Data model                                                                */
/* -------------------------------------------------------------------------- */

type BlockType = "study" | "pyq" | "revision" | "meeting" | "deep" | "break" | "habit" | "rest"

type Block = {
  id: string
  time: string
  end: string
  title: string
  sub: string
  type: BlockType
  span: 1 | 2 | 3
}

type DemoKey = "exam" | "restructure"

const TYPE_STYLE: Record<
  BlockType,
  { bar: string; chip: string; chipText: string; icon: LucideIcon; label: string; glow: string }
> = {
  study: {
    bar: "bg-iris-500",
    chip: "bg-iris-500/10 border-iris-500/30",
    chipText: "text-iris-300",
    icon: BookOpen,
    label: "Study",
    glow: "shadow-[0_0_24px_-6px_rgba(139,92,246,0.6)]",
  },
  pyq: {
    bar: "bg-cyan-400",
    chip: "bg-cyan-500/10 border-cyan-500/30",
    chipText: "text-cyan-300",
    icon: Brain,
    label: "PYQ",
    glow: "shadow-[0_0_24px_-6px_rgba(56,189,248,0.55)]",
  },
  revision: {
    bar: "bg-amber-400",
    chip: "bg-amber-500/10 border-amber-500/30",
    chipText: "text-amber-300",
    icon: RotateCcw,
    label: "Revision",
    glow: "shadow-[0_0_24px_-6px_rgba(251,191,36,0.5)]",
  },
  meeting: {
    bar: "bg-rose-400",
    chip: "bg-rose-500/10 border-rose-500/30",
    chipText: "text-rose-300",
    icon: Users,
    label: "Meetings",
    glow: "shadow-[0_0_24px_-6px_rgba(251,113,133,0.5)]",
  },
  deep: {
    bar: "bg-iris-400",
    chip: "bg-iris-500/10 border-iris-500/30",
    chipText: "text-iris-300",
    icon: Briefcase,
    label: "Deep work",
    glow: "shadow-[0_0_24px_-6px_rgba(167,139,250,0.55)]",
  },
  break: {
    bar: "bg-ink-500",
    chip: "bg-white/[0.04] border-line",
    chipText: "text-text-dim",
    icon: Coffee,
    label: "Break",
    glow: "",
  },
  habit: {
    bar: "bg-emerald-400",
    chip: "bg-emerald-500/10 border-emerald-500/30",
    chipText: "text-emerald-300",
    icon: Dumbbell,
    label: "Habit",
    glow: "shadow-[0_0_24px_-6px_rgba(52,211,153,0.5)]",
  },
  rest: {
    bar: "bg-ink-500",
    chip: "bg-white/[0.04] border-line",
    chipText: "text-text-dim",
    icon: Moon,
    label: "Wind down",
    glow: "",
  },
}

const DEMOS: Record<
  DemoKey,
  { command: string; toggle: string; outcome: string; blocks: Block[] }
> = {
  exam: {
    command: "Create a study plan for my Physics exam.",
    toggle: "Exam plan",
    outcome: "Built a 5-block exam day — theory front-loaded, PYQs mid-day, two revision passes before sleep.",
    blocks: [
      { id: "e1", time: "07:00", end: "08:30", title: "Optics — theory", sub: "Weak chapter · front-loaded", type: "study", span: 2 },
      { id: "e2", time: "09:00", end: "10:30", title: "Mechanics — concepts", sub: "Active recall set", type: "study", span: 2 },
      { id: "e3", time: "11:30", end: "13:00", title: "PYQ drill — 2019–2024", sub: "Timed · Optics + Modern", type: "pyq", span: 2 },
      { id: "e4", time: "16:00", end: "17:00", title: "Revision pass 1", sub: "Flashcards · spaced", type: "revision", span: 1 },
      { id: "e5", time: "20:30", end: "21:30", title: "Revision pass 2", sub: "Error log review", type: "revision", span: 1 },
    ],
  },
  restructure: {
    command: "I have meetings 10–3, finish the client project today.",
    toggle: "Restructure day",
    outcome: "Slotted the 10–3 meeting block, then rebuilt two deep-work sprints around it to ship the project.",
    blocks: [
      { id: "r1", time: "07:30", end: "08:00", title: "Morning workout", sub: "Habit · streak protected", type: "habit", span: 1 },
      { id: "r2", time: "08:00", end: "10:00", title: "Deep work — build", sub: "Client project · core feature", type: "deep", span: 2 },
      { id: "r3", time: "10:00", end: "15:00", title: "Meetings", sub: "Fixed · locked by you", type: "meeting", span: 3 },
      { id: "r4", time: "15:00", end: "15:30", title: "Reset break", sub: "Energy recovery", type: "break", span: 1 },
      { id: "r5", time: "15:30", end: "18:00", title: "Deep work — ship", sub: "Final polish + handoff", type: "deep", span: 2 },
    ],
  },
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export function AIActsV3() {
  const [demo, setDemo] = useState<DemoKey>("exam")

  return (
    <section id="ai" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-iris-600/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[12%] top-1/2 -z-10 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <div className="container-rf">
        <SectionHeading
          kicker="Intelligence that executes"
          title={
            <>
              Most AI gives advice. <span className="text-gradient">RankForge acts.</span>
            </>
          }
          subtitle="You describe the outcome. It rebuilds your day — real blocks on a real timetable, not a chat reply."
        />

        <Reveal delay={0.1} className="mt-14">
          <CommandConsole demo={demo} setDemo={setDemo} />
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Console: command bar + toggle + transforming timetable                    */
/* -------------------------------------------------------------------------- */

function CommandConsole({
  demo,
  setDemo,
}: {
  demo: DemoKey
  setDemo: (d: DemoKey) => void
}) {
  const active = DEMOS[demo]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      {/* frame glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.75rem] bg-gradient-to-br from-iris-600/20 via-transparent to-cyan-500/15 blur-3xl"
      />

      <div className="overflow-hidden rounded-3xl border border-line-strong bg-ink-900/90 shadow-card backdrop-blur-xl">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-ink-600" />
            <span className="h-3 w-3 rounded-full bg-ink-600" />
            <span className="h-3 w-3 rounded-full bg-ink-600" />
          </div>
          <div className="flex items-center gap-2 text-[12px] text-text-dim">
            <span className="hidden font-mono sm:inline">rankforge</span>
            <span className="hidden text-text-faint sm:inline">/</span>
            <span className="font-mono">today</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 rounded-full border border-iris-500/25 bg-iris-500/10 px-2.5 py-1 text-[11px] font-medium text-iris-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-iris-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-iris-400" />
            </span>
            AI Mentor
          </div>
        </div>

        {/* command bar */}
        <div className="px-5 pt-5 sm:px-7">
          <CommandBar demo={demo} active={inView} />
        </div>

        {/* toggle */}
        <div className="px-5 pt-5 sm:px-7">
          <div
            role="tablist"
            aria-label="Choose a command to run"
            className="inline-flex rounded-2xl border border-line bg-ink-850 p-1"
          >
            {(Object.keys(DEMOS) as DemoKey[]).map((key) => {
              const isActive = demo === key
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setDemo(key)}
                  className={`relative rounded-xl px-4 py-2 text-[13px] font-medium transition-colors ${
                    isActive ? "text-white" : "text-text-dim hover:text-text-muted"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="ai-acts-toggle"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 shadow-[0_0_20px_-4px_rgba(124,58,237,0.7)]"
                    />
                  )}
                  {DEMOS[key].toggle}
                </button>
              )
            })}
          </div>
        </div>

        {/* outcome line */}
        <div className="px-5 pt-4 sm:px-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={demo}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-2.5 rounded-xl border border-iris-500/15 bg-iris-500/[0.06] px-3.5 py-2.5"
            >
              <Wand2 className="mt-0.5 h-4 w-4 shrink-0 text-iris-300" />
              <p className="text-[13px] leading-relaxed text-text-muted">{active.outcome}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* divider with label */}
        <div className="flex items-center gap-3 px-5 pb-3 pt-6 sm:px-7">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-dim">
            Today&apos;s timetable
          </span>
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[11px] text-text-faint">
            {active.blocks.length} blocks · auto-built
          </span>
        </div>

        {/* timetable */}
        <div className="px-3 pb-5 sm:px-5 sm:pb-6">
          <Timetable demo={demo} blocks={active.blocks} active={inView} />
        </div>
      </div>

      {/* legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {(["study", "pyq", "revision", "deep", "meeting", "habit"] as BlockType[]).map((t) => (
          <div key={t} className="flex items-center gap-2 text-[12px] text-text-dim">
            <span className={`h-2.5 w-2.5 rounded-full ${TYPE_STYLE[t].bar}`} />
            {TYPE_STYLE[t].label}
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Command bar — typed prompt that retypes when the demo switches            */
/* -------------------------------------------------------------------------- */

function CommandBar({ demo, active }: { demo: DemoKey; active: boolean }) {
  const full = DEMOS[demo].command
  const [typed, setTyped] = useState("")
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!active) return
    setTyped("")
    setRunning(false)
    let i = 0
    let interval = 0
    let runTimer = 0
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1
        setTyped(full.slice(0, i))
        if (i >= full.length) {
          window.clearInterval(interval)
          runTimer = window.setTimeout(() => setRunning(true), 350)
        }
      }, 26)
    }, 220)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
      window.clearTimeout(runTimer)
    }
  }, [demo, active, full])

  const done = typed.length >= full.length

  return (
    <div className="group relative flex items-center gap-3 rounded-2xl border border-line-strong bg-ink-850 px-4 py-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 shadow-[0_0_18px_-4px_rgba(124,58,237,0.8)]">
        <Sparkles className="h-4 w-4 text-white" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-faint">
          Command
        </div>
        <div className="flex items-center text-[14px] leading-snug text-text sm:text-[15px]">
          <span className="truncate">{typed || " "}</span>
          {!done && (
            <motion.span
              aria-hidden
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[1px] bg-iris-300"
            />
          )}
        </div>
      </div>

      <div
        className={`hidden shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:flex ${
          running
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : "border-line bg-white/[0.03] text-text-dim"
        }`}
      >
        {running ? (
          <>
            <Sparkles className="h-3.5 w-3.5" /> Done
          </>
        ) : (
          <>
            <CornerDownLeft className="h-3.5 w-3.5" /> Run
          </>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Timetable — animates blocks in / restructures between states              */
/* -------------------------------------------------------------------------- */

function Timetable({
  demo,
  blocks,
  active,
}: {
  demo: DemoKey
  blocks: Block[]
  active: boolean
}) {
  return (
    <motion.ul layout className="relative space-y-2 pt-1">
      {/* timeline rail */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-2 left-[58px] top-2 w-px bg-gradient-to-b from-transparent via-line to-transparent sm:left-[70px]"
      />
      <AnimatePresence mode="popLayout" initial={false}>
        {blocks.map((b, i) => (
          <TimeBlock key={b.id} block={b} index={i} demo={demo} active={active} />
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}

function TimeBlock({
  block,
  index,
  demo,
  active,
}: {
  block: Block
  index: number
  demo: DemoKey
  active: boolean
}) {
  const s = TYPE_STYLE[block.type]
  const BlockIcon = s.icon
  const heights: Record<1 | 2 | 3, string> = {
    1: "min-h-[60px]",
    2: "min-h-[76px]",
    3: "min-h-[100px]",
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -18, filter: "blur(6px)" }}
      animate={
        active
          ? { opacity: 1, x: 0, filter: "blur(0px)" }
          : { opacity: 0, x: -18, filter: "blur(6px)" }
      }
      exit={{ opacity: 0, x: 16, filter: "blur(6px)" }}
      transition={{
        layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        duration: 0.5,
        delay: active ? 0.15 + index * 0.09 : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex items-stretch gap-3 sm:gap-4"
    >
      {/* time label */}
      <div className="flex w-[50px] shrink-0 flex-col items-end pt-1 sm:w-[62px]">
        <span className="font-mono text-[12px] font-medium tabular-nums text-text-muted sm:text-[13px]">
          {block.time}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-text-faint">{block.end}</span>
      </div>

      {/* node on rail */}
      <span className="relative z-10 mt-2 hidden h-2.5 w-2.5 shrink-0 sm:block">
        <span className={`absolute inset-0 rounded-full ${s.bar} ${s.glow}`} />
        <span className="absolute inset-0 rounded-full ring-4 ring-ink-900" />
      </span>

      {/* card */}
      <div
        className={`group relative flex flex-1 items-center gap-3 overflow-hidden rounded-xl border border-line bg-ink-850/80 pl-3 pr-3.5 sm:pl-4 ${heights[block.span]}`}
      >
        {/* colored left bar */}
        <span className={`absolute inset-y-0 left-0 w-[3px] ${s.bar}`} />
        {/* type chip */}
        <span
          className={`hidden h-9 w-9 shrink-0 place-items-center rounded-lg border ${s.chip} ${s.chipText} sm:grid`}
        >
          <BlockIcon className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[14px] font-semibold text-text">{block.title}</p>
            <span
              className={`hidden rounded-md border px-1.5 py-0.5 text-[10px] font-medium sm:inline-block ${s.chip} ${s.chipText}`}
            >
              {s.label}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[12px] text-text-dim">{block.sub}</p>
        </div>
        {block.type === "meeting" && demo === "restructure" && (
          <span className="hidden shrink-0 rounded-md border border-rose-500/25 bg-rose-500/10 px-2 py-1 text-[10px] font-medium text-rose-300 md:inline-block">
            Locked
          </span>
        )}
      </div>
    </motion.li>
  )
}
