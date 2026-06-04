"use client"

import { motion } from "framer-motion"
import { SectionHeading, Reveal, Icon, SpotlightCard } from "./primitives"
import { FEATURES, type Feature } from "@/lib/content"

const accentMap = {
  iris: {
    chip: "text-iris-300 bg-iris-500/12 border-iris-500/20",
    dot: "bg-iris-400",
  },
  cyan: {
    chip: "text-cyan-300 bg-cyan-500/12 border-cyan-500/20",
    dot: "bg-cyan-400",
  },
  amber: {
    chip: "text-amber-300 bg-amber-500/12 border-amber-500/20",
    dot: "bg-amber-400",
  },
} as const

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <SectionHeading
          kicker="One system, every domain"
          title={
            <>
              Every goal. Every habit.
              <br className="hidden sm:block" /> <span className="text-gradient">One system.</span>
            </>
          }
          subtitle="Ten deeply-integrated modules that replace your scattered stack of apps — each one built to push consistency without burnout."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.07} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <FeatureCard feature={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  const a = accentMap[feature.accent]
  return (
    <SpotlightCard className="flex h-full flex-col p-6">
      <div className={`mb-5 grid h-11 w-11 place-items-center rounded-xl border ${a.chip}`}>
        <Icon name={feature.icon} className="h-5 w-5" />
      </div>

      <h3 className="text-lg font-semibold text-text">{feature.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
        {feature.description}
      </p>

      {/* Mini preview */}
      <div className="mt-5 space-y-1.5 rounded-xl border border-line bg-ink-850/60 p-3">
        {feature.preview.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-[12px]"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
            <span className={i === 0 ? "text-text-muted" : "text-text-dim"}>
              {line}
            </span>
          </motion.div>
        ))}
      </div>
    </SpotlightCard>
  )
}
