"use client"

import { motion } from "framer-motion"
import { GraduationCap, Rocket, Check, ArrowLeftRight } from "lucide-react"
import { SectionHeading, Reveal, SpotlightCard } from "./primitives"

const MODES = [
  {
    icon: GraduationCap,
    name: "Exam Prep OS",
    tagline: "Strict, board & entrance focused.",
    accent: "from-iris-500 to-iris-700",
    chip: "text-iris-300 bg-iris-500/12 border-iris-500/20",
    points: [
      "Exam tracks — CBSE, ICSE, JEE Main/Advanced, NEET",
      "Mocks, PYQs, flashcards & question bank",
      "Readiness score, revision ladder & Crunch Mode",
      "Planner that bends the day toward your exam",
    ],
  },
  {
    icon: Rocket,
    name: "Productivity OS",
    tagline: "A calm general tracker for anyone.",
    accent: "from-cyan-500 to-cyan-300",
    chip: "text-cyan-300 bg-cyan-500/12 border-cyan-500/20",
    points: [
      "Your own areas — Work, Health, Side project…",
      "Describe your day in words → AI builds your timetable",
      "Deep-work blocks, habits, focus & analytics",
      "No exams, no jargon — just momentum",
    ],
  },
]

export function TwoModes() {
  return (
    <section id="modes" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 w-2/3 rounded-full bg-iris-600/10 blur-[130px]" />
      <div className="container-rf">
        <SectionHeading
          kicker="New · Two modes, one app"
          title={
            <>
              Two operating systems. <span className="text-gradient">One app.</span>
            </>
          }
          subtitle="Flip a single switch in Settings and the entire experience transforms — same install, same data, no second download. Built for students cramming for boards and for anyone who just wants to get more done."
        />

        <div className="relative mt-16 grid gap-5 lg:grid-cols-2">
          {MODES.map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal key={m.name} delay={i * 0.1}>
                <SpotlightCard className="h-full p-7">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${m.accent} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{m.name}</h3>
                      <p className="text-sm text-text-muted">{m.tagline}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted">
                        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${m.chip}`}>
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            )
          })}

          {/* center switch badge */}
          <Reveal>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, type: "spring", stiffness: 240, damping: 18 }}
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            >
              <div className="flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs font-semibold text-text shadow-card">
                <ArrowLeftRight className="h-4 w-4 text-iris-300" />
                Switch anytime
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
