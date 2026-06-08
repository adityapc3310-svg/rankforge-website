"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Download, ShieldCheck, MonitorCheck, WifiOff } from "lucide-react"
import { Reveal } from "../primitives"

const EASE = [0.16, 1, 0.3, 1] as const

/* Reassurance chips beneath the button */
const REASSURE = [
  { icon: Download, label: "Free to start" },
  { icon: MonitorCheck, label: "Windows" },
  { icon: WifiOff, label: "100% offline" },
] as const

/* Faint drifting accent points inside the panel — pure decoration */
const PARTICLES = [
  { left: "14%", top: "26%", size: 4, delay: 0, dur: 7, color: "bg-iris-400/50" },
  { left: "82%", top: "20%", size: 3, delay: 1.2, dur: 8, color: "bg-cyan-400/45" },
  { left: "26%", top: "74%", size: 3, delay: 0.6, dur: 9, color: "bg-iris-300/40" },
  { left: "70%", top: "70%", size: 5, delay: 1.8, dur: 7.5, color: "bg-iris-500/40" },
  { left: "48%", top: "16%", size: 2.5, delay: 2.4, dur: 8.5, color: "bg-cyan-300/40" },
  { left: "90%", top: "52%", size: 3, delay: 0.9, dur: 9.5, color: "bg-iris-400/40" },
] as const

export function FinalCTAV3() {
  const reduce = useReducedMotion()

  return (
    <section id="cta" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient depth glow behind the whole section */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[58rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris-600/12 blur-[170px]"
        aria-hidden
      />

      <div className="container-rf">
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.985, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: EASE }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-line-strong bg-ink-900/50 shadow-card"
          >
            {/* radial iris glow inside the panel */}
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[30rem] w-[44rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(139,92,246,0.30), rgba(139,92,246,0.10) 42%, transparent 72%)",
              }}
              aria-hidden
            />
            {/* secondary cool wash for cinematic depth */}
            <div
              className="pointer-events-none absolute right-[-6rem] top-[-4rem] -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]"
              aria-hidden
            />

            {/* dotted texture overlay */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-[0.5] [mask-image:radial-gradient(closest-side,black,transparent)]"
              aria-hidden
            />

            {/* animated top accent hairline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden" aria-hidden>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-iris-400/55 to-transparent" />
              {!reduce && (
                <motion.div
                  className="absolute top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-iris-200/90 to-transparent"
                  initial={{ x: "-120%" }}
                  animate={{ x: "320%" }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                />
              )}
            </div>

            {/* drifting decorative particles */}
            {!reduce && (
              <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
                {PARTICLES.map((p, i) => (
                  <motion.span
                    key={i}
                    className={`absolute rounded-full ${p.color} blur-[1px]`}
                    style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
                    animate={{ y: [0, -14, 0], opacity: [0.25, 0.8, 0.25] }}
                    transition={{
                      duration: p.dur,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* content */}
            <div className="relative px-6 py-20 text-center sm:px-10 md:py-28 lg:px-16">
              {/* small eyebrow line for closure */}
              <Reveal delay={0.05}>
                <span className="inline-flex items-center gap-2 rounded-full border border-iris-400/25 bg-iris-500/[0.07] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-iris-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-iris-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.7)]" />
                  Every goal. One system.
                </span>
              </Reveal>

              <Reveal delay={0.12}>
                <h2 className="mx-auto mt-7 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-text md:text-6xl">
                  <span className="block">Stop managing tools.</span>
                  <span className="mt-1 block">
                    Start <span className="text-gradient">building yourself.</span>
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-text-muted md:text-lg">
                  One system. Every goal.
                </p>
              </Reveal>

              {/* primary CTA */}
              <Reveal delay={0.28}>
                <div className="mt-10 flex justify-center">
                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.025 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="relative"
                  >
                    {/* glow halo behind the button */}
                    <span
                      className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-iris-500/30 blur-2xl"
                      aria-hidden
                    />
                    <Link
                      href="/download"
                      className="btn-primary group relative inline-flex items-center gap-2.5 overflow-hidden px-8 py-4 text-base font-semibold shadow-glow md:px-10 md:py-[1.15rem] md:text-lg"
                    >
                      {/* shimmer sweep on hover */}
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                        aria-hidden
                      />
                      <Download
                        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                        strokeWidth={2.25}
                      />
                      <span className="relative">Download RankForge</span>
                    </Link>
                  </motion.div>
                </div>
              </Reveal>

              {/* tiny reassurance */}
              <Reveal delay={0.36}>
                <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-text-dim">
                  {REASSURE.map((r, i) => (
                    <li key={r.label} className="flex items-center gap-x-4">
                      {i > 0 && (
                        <span
                          className="hidden h-1 w-1 rounded-full bg-text-faint sm:inline-block"
                          aria-hidden
                        />
                      )}
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium">
                        <r.icon className="h-3.5 w-3.5 text-iris-300/80" strokeWidth={2} />
                        {r.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* closing trust seal */}
              <Reveal delay={0.44}>
                <p className="mt-7 inline-flex items-center gap-1.5 text-xs text-text-faint">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-300/70" strokeWidth={2} />
                  No account · No telemetry · Your data stays on your machine
                </p>
              </Reveal>
            </div>

            {/* subtle bottom edge fade into the page */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
              aria-hidden
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
