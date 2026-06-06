"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react"
import { DashboardMockup } from "./DashboardMockup"

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section id="top" className="relative pt-36 md:pt-44">
      <div className="container-rf">
        {/* Announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex justify-center"
        >
          <a
            href="#modes"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] py-1.5 pl-1.5 pr-4 text-sm text-text-muted transition-colors hover:border-iris-500/40"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-iris-500/15 px-2.5 py-1 text-xs font-semibold text-iris-300">
              <Sparkles className="h-3 w-3" /> New
            </span>
            Now with Productivity OS mode
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Headline */}
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease, delay: 0.05 }}
            className="text-balance text-5xl font-bold leading-[0.98] tracking-tight text-text md:text-7xl"
          >
            Forge the future
            <br />
            version of <span className="text-gradient">yourself</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-muted"
          >
            RankForge is the AI operating system for high achievers. Every goal,
            habit, and focus session — planned, tracked, and optimized in one
            relentless system.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.32 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/download" className="btn-primary w-full sm:w-auto">
              Download for Windows
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#dashboard" className="btn-ghost w-full sm:w-auto">
              See it in action
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-dim"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-iris-400" /> 100% offline & private
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              Loved by serious students
            </span>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <div className="perspective relative mx-auto mt-16 max-w-5xl">
          {/* Glow behind */}
          <div className="absolute -inset-x-20 -top-10 bottom-0 -z-10 opacity-60 blur-[100px]">
            <div className="mx-auto h-full w-3/4 rounded-full bg-gradient-to-tr from-iris-600/40 via-iris-500/20 to-cyan-500/30" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 6 }}
            transition={{ duration: 1.1, ease, delay: 0.4 }}
            style={{ transformStyle: "preserve-3d" }}
            className="origin-top"
          >
            <DashboardMockup />
          </motion.div>

          {/* Floating chips */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="absolute -left-4 top-1/4 hidden rounded-2xl glass-strong px-4 py-3 shadow-card lg:block"
          >
            <div className="text-[11px] text-text-dim">Adaptive replan</div>
            <div className="text-sm font-semibold text-text">Day rebuilt in 0.3s</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.05 }}
            className="absolute -right-4 top-1/2 hidden rounded-2xl glass-strong px-4 py-3 shadow-card lg:block"
          >
            <div className="flex items-center gap-1.5 text-[11px] text-iris-300">
              <Sparkles className="h-3 w-3" /> Mentor
            </div>
            <div className="text-sm font-semibold text-text">+340 XP today</div>
          </motion.div>
        </div>
      </div>

      {/* fade into next section */}
      <div className="pointer-events-none h-32 bg-gradient-to-b from-transparent to-[#050507]" />
    </section>
  )
}
