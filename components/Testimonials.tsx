"use client"

import { Quote } from "lucide-react"
import { SectionHeading, Reveal } from "./primitives"
import { TESTIMONIALS } from "@/lib/content"

const accentMap = {
  iris: "from-iris-500 to-iris-700",
  cyan: "from-cyan-500 to-cyan-300",
  amber: "from-amber-500 to-amber-300",
} as const

export function Testimonials() {
  return (
    <section id="stories" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <SectionHeading
          kicker="Built with real students"
          title={
            <>
              Loved by the people <span className="text-gradient">chasing the top</span>
            </>
          }
          subtitle="Not corporate testimonials — the kind of progress that shows up in mock scores and morning routines."
        />

        <div className="mt-16 columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08}>
              <figure className="group break-inside-avoid rounded-2xl border border-line bg-white/[0.02] p-6 transition-colors hover:border-line-strong">
                <Quote className="h-6 w-6 text-iris-400/50" />
                <blockquote className="mt-4 text-[15px] leading-relaxed text-text-muted">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${accentMap[t.accent]} text-sm font-bold text-white`}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-text">{t.name}</div>
                    <div className="text-xs text-text-dim">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
