"use client"

import { motion } from "framer-motion"
import { Sparkles, Check, CalendarClock, Target, BookOpen, ArrowUp } from "lucide-react"
import { SectionHeading, Reveal } from "./primitives"

const CAPABILITIES = [
  { icon: CalendarClock, label: "Plans your day" },
  { icon: Target, label: "Tracks your goals" },
  { icon: BookOpen, label: "Quizzes & explains" },
  { icon: Sparkles, label: "Optimizes your life" },
]

export function AISection() {
  return (
    <section id="ai" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: copy */}
          <div>
            <SectionHeading
              align="left"
              kicker="Intelligence, built in"
              title={
                <>
                  An AI that <span className="text-gradient">acts</span>,
                  <br /> not just chats
                </>
              }
              subtitle="Talk to RankForge like a coach. It schedules exams, rebuilds your timetable, quizzes you on weak chapters, and learns what makes you tick — then quietly optimizes around it."
            />

            <div className="mt-8 grid grid-cols-2 gap-3">
              {CAPABILITIES.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.07}>
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3">
                    <c.icon className="h-[18px] w-[18px] text-iris-300" />
                    <span className="text-sm text-text-muted">{c.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: chat UI */}
          <Reveal delay={0.1}>
            <ChatDemo />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ChatDemo() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-iris-600/20 via-transparent to-cyan-500/15 blur-3xl" />

      <div className="overflow-hidden rounded-3xl border border-line-strong bg-ink-900/90 shadow-card backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-line px-5 py-4">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-iris-500 to-iris-700">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <div>
            <div className="text-sm font-semibold text-text">RankForge Assistant</div>
            <div className="flex items-center gap-1.5 text-[11px] text-text-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4 px-5 py-6">
          <Bubble side="user" delay={0}>
            I have a Physics mock on Sunday and I&apos;m weak at Optics. Sort my week out.
          </Bubble>

          <Bubble side="ai" delay={0.5}>
            On it. Here&apos;s what I&apos;m doing:
            <div className="mt-3 space-y-2">
              <ToolChip delay={0.9}>Added mock · Sunday 9:00 AM</ToolChip>
              <ToolChip delay={1.15}>Front-loaded Optics theory + PYQs (Mon–Wed)</ToolChip>
              <ToolChip delay={1.4}>Scheduled 2 revision passes before the mock</ToolChip>
            </div>
          </Bubble>

          <Bubble side="ai" delay={1.7}>
            Your focus dips after 9 PM, so I kept the hard sets in the morning.
            Want me to add a self-quiz on Optics tonight?
          </Bubble>
        </div>

        {/* Composer */}
        <div className="border-t border-line p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-ink-850 px-4 py-2.5">
            <input
              disabled
              placeholder="Ask anything — it will handle the rest"
              className="flex-1 bg-transparent text-sm text-text-muted placeholder:text-text-faint focus:outline-none"
            />
            <button className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 text-white">
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Bubble({
  side,
  delay,
  children,
}: {
  side: "user" | "ai"
  delay: number
  children: React.ReactNode
}) {
  const isUser = side === "user"
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-iris-500/15 text-text"
            : "border border-line bg-ink-850 text-text-muted"
        }`}
      >
        {children}
      </div>
    </motion.div>
  )
}

function ToolChip({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-2 rounded-lg border border-iris-500/20 bg-iris-500/10 px-3 py-2 text-[12px] text-iris-200"
    >
      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
      {children}
    </motion.div>
  )
}
