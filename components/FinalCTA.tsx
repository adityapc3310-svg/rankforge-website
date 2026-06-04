"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Waitlist } from "./Waitlist"

export function FinalCTA() {
  return (
    <section id="cta" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-line-strong px-6 py-20 text-center sm:px-10"
        >
          {/* glow field */}
          <div className="absolute -top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-iris-600/30 blur-[160px]" />
          <div className="absolute inset-0 -z-10 bg-dots opacity-30" />

          <span className="kicker mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-iris-400" /> Your future self is waiting
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-text sm:text-5xl md:text-6xl">
            Start building the person <br className="hidden sm:block" />
            you <span className="text-gradient">want to become</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            One system for your goals, habits, focus and growth. Join the
            early-access list and be first to forge your best self.
          </p>

          {/* The real, working conversion action. */}
          <div id="join" className="mt-9 scroll-mt-24">
            <Waitlist source="final-cta" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
