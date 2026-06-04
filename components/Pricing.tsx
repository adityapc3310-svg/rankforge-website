"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { SectionHeading, Reveal } from "./primitives"
import { PRICING } from "@/lib/content"

export function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <SectionHeading
          kicker="Pricing"
          title={
            <>
              Invest in the person <span className="text-gradient">you are becoming</span>
            </>
          }
          subtitle="Start free, forever. Upgrade when you are ready to bring the full system to your goals."
        />

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {PRICING.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 0.08}
              className={plan.featured ? "lg:-mt-4 lg:mb-0" : ""}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className={`relative flex h-full flex-col rounded-3xl p-7 ${
                  plan.featured
                    ? "glass-strong border-iris-500/30 shadow-glow"
                    : "border border-line bg-white/[0.02]"
                }`}
              >
                {plan.featured && (
                  <>
                    <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-iris-500 to-iris-700 opacity-30 blur-md" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-iris-500 to-iris-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      Most popular
                    </span>
                  </>
                )}

                <div className="text-sm font-semibold text-text-dim">{plan.name}</div>
                <div className="mt-3 flex items-end gap-1.5">
                  <span className="text-4xl font-bold tracking-tight text-text">
                    {plan.price}
                  </span>
                  <span className="mb-1 text-sm text-text-muted">{plan.cadence}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {plan.tagline}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-text-muted">
                      <span
                        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                          plan.featured
                            ? "bg-gradient-to-br from-iris-500 to-iris-700 text-white"
                            : "bg-emerald-500/15 text-emerald-400"
                        }`}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.featured ? "/download" : "#join"}
                  className={`mt-7 ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
