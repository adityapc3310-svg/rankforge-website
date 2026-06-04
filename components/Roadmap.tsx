"use client"

import { Check, Loader2, Telescope } from "lucide-react"
import { SectionHeading, Reveal } from "./primitives"
import { ROADMAP, type RoadmapItem } from "@/lib/content"

const STATUS: Record<
  RoadmapItem["status"],
  { icon: typeof Check; cls: string; dot: string }
> = {
  shipped: { icon: Check, cls: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10", dot: "bg-emerald-400" },
  building: { icon: Loader2, cls: "text-iris-300 border-iris-500/40 bg-iris-500/10", dot: "bg-iris-400" },
  vision: { icon: Telescope, cls: "text-cyan-300 border-cyan-500/40 bg-cyan-500/10", dot: "bg-cyan-400" },
}

export function Roadmap() {
  return (
    <section id="roadmap" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <SectionHeading
          kicker="Where this is going"
          title={
            <>
              A product with <span className="text-gradient">momentum</span>
            </>
          }
          subtitle="RankForge ships fast. Here is what is live, what is being built, and the future we are forging toward."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-emerald-500/40 via-iris-500/40 to-cyan-500/40 lg:block" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((item, i) => {
              const s = STATUS[item.status]
              const Icon = s.icon
              return (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <span className={`relative grid h-12 w-12 place-items-center rounded-2xl border ${s.cls}`}>
                        <Icon
                          className={`h-5 w-5 ${
                            item.status === "building" ? "animate-spin [animation-duration:3s]" : ""
                          }`}
                        />
                      </span>
                      <span className={`kicker !border-current ${s.cls}`}>
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${s.dot} ${
                            item.status !== "vision" ? "animate-pulse" : ""
                          }`}
                        />
                        {item.phase}
                      </span>
                    </div>
                    <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                      <h3 className="text-lg font-semibold tracking-tight text-text">
                        {item.title}
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {item.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
