"use client"

import { motion } from "framer-motion"
import { Check, Minus } from "lucide-react"
import { SectionHeading, Reveal } from "./primitives"
import { COMPARISON, COMPARISON_COLUMNS } from "@/lib/content"
import { Logo } from "./Navbar"

export function Comparison() {
  return (
    <section id="compare" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <SectionHeading
          kicker="Stop the app-switching tax"
          title={
            <>
              One system instead of <span className="text-gradient">five</span>
            </>
          }
          subtitle="Notion holds notes. Todoist holds tasks. Habitica gamifies. Calendar holds time. RankForge does all of it — and connects them with AI."
        />

        <Reveal>
          <div className="mt-16 overflow-x-auto rounded-3xl border border-line-strong bg-ink-900/60">
            <div className="min-w-[680px]">
              {/* Header row */}
              <div className="grid grid-cols-[1.6fr_repeat(5,1fr)] border-b border-line bg-ink-850/80">
                <div className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-text-dim">
                  Capability
                </div>
                {COMPARISON_COLUMNS.map((col) => {
                  const isRF = col.key === "rankforge"
                  return (
                    <div
                      key={col.key}
                      className={`flex items-center justify-center gap-1.5 px-2 py-4 text-center text-[13px] font-semibold ${
                        isRF ? "text-text" : "text-text-dim"
                      }`}
                    >
                      {isRF && <Logo className="!h-5 !w-5" />}
                      {col.label}
                    </div>
                  )
                })}
              </div>

              {/* Body rows */}
              {COMPARISON.map((row, ri) => (
                <motion.div
                  key={row.capability}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: ri * 0.04 }}
                  className="grid grid-cols-[1.6fr_repeat(5,1fr)] border-b border-line last:border-0"
                >
                  <div className="flex items-center px-5 py-4 text-sm text-text-muted">
                    {row.capability}
                  </div>
                  {COMPARISON_COLUMNS.map((col) => {
                    const val = row[col.key as keyof typeof row] as boolean
                    const isRF = col.key === "rankforge"
                    return (
                      <div
                        key={col.key}
                        className={`flex items-center justify-center py-4 ${
                          isRF ? "bg-iris-500/[0.06]" : ""
                        }`}
                      >
                        {val ? (
                          <span
                            className={`grid h-6 w-6 place-items-center rounded-full ${
                              isRF
                                ? "bg-gradient-to-br from-iris-500 to-iris-700 text-white shadow-[0_0_16px_-2px_rgba(124,58,237,0.8)]"
                                : "bg-emerald-500/15 text-emerald-400"
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                        ) : (
                          <Minus className="h-4 w-4 text-text-faint" />
                        )}
                      </div>
                    )
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
