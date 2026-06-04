"use client"

import { Counter, Reveal } from "./primitives"
import { STATS } from "@/lib/content"

const TRACKS = [
  "CBSE Class 9",
  "CBSE Class 10",
  "ICSE Class 10",
  "CBSE 12 · PCM",
  "CBSE 12 · PCB",
  "CBSE 12 · Commerce",
  "JEE Main",
  "JEE Advanced",
  "NEET",
]

export function StatsBar() {
  return (
    <section className="relative py-16">
      <div className="container-rf">
        {/* Counters */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center justify-center gap-1 bg-ink-900 px-6 py-8 text-center">
                <div className="text-4xl font-bold tracking-tight text-gradient md:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-text-dim">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tracks marquee */}
        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-text-faint">
            Built for every serious track
          </p>
        </Reveal>
        <div className="mask-fade-edges relative mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-3">
            {[...TRACKS, ...TRACKS].map((t, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-full border border-line bg-white/[0.02] px-5 py-2 text-sm text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
