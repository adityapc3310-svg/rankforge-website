"use client"

import { ToggleRight, Sparkles, LineChart } from "lucide-react"
import { SectionHeading, Reveal } from "./primitives"

const STEPS = [
  {
    n: "01",
    icon: ToggleRight,
    title: "Pick your mode",
    body: "Exam Prep OS or Productivity OS — one switch sets your whole workspace, vocabulary, and planner. Switch back anytime; your data stays put.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Describe your day",
    body: "Tell the AI your commitments and goals in plain English. It builds a realistic timetable around school/work, sleep, habits, and your weak spots.",
  },
  {
    n: "03",
    icon: LineChart,
    title: "Execute & track",
    body: "Run focus sessions, tick habits, and watch streaks, XP, and analytics turn daily consistency into visible momentum — burnout-aware, never toxic.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <SectionHeading
          kicker="How it works"
          title={
            <>
              From a blank day to a plan in <span className="text-gradient">three steps</span>
            </>
          }
          subtitle="No setup marathon. You're planning your first day within minutes of opening the app."
        />

        <div className="relative mt-16 grid gap-5 md:grid-cols-3">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-iris-500/40 to-transparent md:block" />
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-iris-500/20 bg-iris-500/10 text-iris-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-text-faint">{s.n}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-text">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
