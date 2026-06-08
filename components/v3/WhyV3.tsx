"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Reveal, SectionHeading } from "../primitives"

/* -------------------------------------------------------------------------- */
/*  Section 10 — Why it exists (founder story)                                */
/*  A restrained, editorial story block. Not feature-y. Human, sincere.       */
/* -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const

export function WhyV3() {
  return (
    <section id="why" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient depth — a single quiet glow, low and centered */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[460px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris-600/10 blur-[150px]"
      />

      <div className="container-rf">
        <SectionHeading
          kicker="Why we built it"
          title={
            <>
              Built by someone who was{" "}
              <span className="text-gradient">drowning in tabs</span>
            </>
          }
        />

        {/* ------------------------------------------------------------------ */}
        {/*  The story                                                         */}
        {/* ------------------------------------------------------------------ */}
        <Reveal delay={0.1}>
          <figure className="relative mx-auto mt-16 max-w-prose md:mt-20">
            {/* faint vertical accent line down the left edge */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-6 top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-transparent via-iris-500/40 to-transparent md:block"
            />

            {/* small glowing quote mark */}
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.7, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-iris-500/30 bg-ink-850/70 text-iris-300 shadow-glow"
            >
              <Quote className="h-5 w-5 -scale-x-100" />
            </motion.span>

            <blockquote className="space-y-7">
              <p className="text-pretty text-lg leading-relaxed text-text md:text-xl md:leading-relaxed">
                The night before my board exams, I had{" "}
                <span className="text-text">ten apps open</span> and not one of
                them knew what I was actually trying to do. A planner that
                forgot my goals. A habit app that didn&apos;t talk to my notes.
                Flashcards in one window, a timer in another, a to-do list I
                stopped trusting weeks ago.
              </p>

              <p className="text-pretty text-base leading-relaxed text-text-muted md:text-lg md:leading-relaxed">
                I kept telling myself I just needed more discipline. But sitting
                there, watching another goal slip through the cracks between
                tools, it finally clicked: the problem was never me. It was the{" "}
                <span className="text-text">fragmentation</span> — ten honest
                attempts that never added up to a system I could rely on.
              </p>

              <p className="text-pretty text-base leading-relaxed text-text-muted md:text-lg md:leading-relaxed">
                So I built one. One place that remembers the goal, plans the
                day, protects the focus, and shows up the same way every single
                morning — the kind of thing you can actually trust to carry the
                weight when willpower runs low.
              </p>
            </blockquote>

            {/* the quiet, confident closing line */}
            <motion.p
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="mt-10 text-balance text-xl font-medium tracking-tight text-text md:text-2xl"
            >
              RankForge is the tool I{" "}
              <span className="text-gradient-iris">wish I&apos;d had</span>.
            </motion.p>

            {/* signature */}
            <motion.figcaption
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="mt-8 flex items-center gap-3"
            >
              <span
                aria-hidden
                className="h-px w-8 bg-gradient-to-r from-iris-500/60 to-transparent"
              />
              <span className="font-mono text-sm tracking-wide text-text-dim">
                — The RankForge team
              </span>
            </motion.figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
