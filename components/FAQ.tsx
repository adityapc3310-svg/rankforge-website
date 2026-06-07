"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { SectionHeading, Reveal } from "./primitives"

const FAQS = [
  {
    q: "Do I need an account to use it?",
    a: "No. RankForge is offline-first — there are no logins or sign-ups. Everything you create lives in a local database on your own machine.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your tasks, notes, plans, and progress are stored locally in SQLite and never uploaded. AI features are opt-in, and even then only the minimum needed for a request is sent to your chosen provider.",
  },
  {
    q: "Is it for students only, or anyone?",
    a: "Both. Exam Prep OS is tuned for CBSE/ICSE boards and JEE/NEET. Productivity OS turns the same app into a general tracker for work, projects, habits, and goals — switch modes anytime in Settings.",
  },
  {
    q: "Which exams are supported?",
    a: "CBSE Class 9 & 10, ICSE Class 10, CBSE Class 12 (PCM / PCB / Commerce), JEE Main, JEE Advanced, and NEET — each with its own subject weighting.",
  },
  {
    q: "Do I need an AI key?",
    a: "No — the rules-based planner and core features work fully offline with no key. Add an Anthropic, Groq, or RankForge Cloud key to unlock the AI planner, mentor, and assistant.",
  },
  {
    q: "What platforms does it run on?",
    a: "A native Windows desktop app today (download below). macOS and Linux builds are configured and coming next.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-rf">
        <SectionHeading
          kicker="Questions"
          title={
            <>
              Everything you might <span className="text-gradient">ask</span>
            </>
          }
          subtitle="Private by default, free to start, and built to work whether you're chasing a rank or shipping a project."
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white/[0.02]">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={(i % 3) * 0.05}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="text-[15px] font-medium text-text">{item.q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong text-text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-iris-300" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
