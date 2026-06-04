"use client"

import { motion } from "framer-motion"
import { Gauge, Brain, Zap, Eye } from "lucide-react"
import { SectionHeading, Reveal } from "./primitives"
import { DashboardMockup } from "./DashboardMockup"

const CALLOUTS = [
  {
    icon: Gauge,
    title: "Live day verdict",
    body: "A single Win / Mixed / Loss score from blocks, tasks, and focus — so you always know where you stand.",
  },
  {
    icon: Brain,
    title: "AI insights inline",
    body: "The mentor reads your patterns and rewrites your schedule around your real peak hours.",
  },
  {
    icon: Zap,
    title: "Quests & streaks",
    body: "Daily quests derived from your actual plan keep momentum high and decision fatigue low.",
  },
  {
    icon: Eye,
    title: "Everything at a glance",
    body: "Focus, streaks, study time, and the live now-block — your whole day on one screen.",
  },
]

export function DashboardShowcase() {
  return (
    <section id="dashboard" className="relative scroll-mt-24 py-24 md:py-32">
      {/* section glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-80 w-3/4 rounded-full bg-iris-600/10 blur-[120px]" />

      <div className="container-rf">
        <SectionHeading
          kicker="The command center"
          title={
            <>
              A dashboard that feels like <span className="text-gradient">mission control</span>
            </>
          }
          subtitle="Not a wall of widgets — a focused home screen that tells you exactly what to do next."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Mockup */}
          <Reveal>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-iris-600/20 to-cyan-500/10 blur-2xl" />
              <DashboardMockup />
            </div>
          </Reveal>

          {/* Callouts */}
          <div className="space-y-6">
            {CALLOUTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex gap-4"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-iris-500/20 bg-iris-500/10 text-iris-300">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                      {c.body}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
