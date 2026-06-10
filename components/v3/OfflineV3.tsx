"use client"

import { motion } from "framer-motion"
import {
  Database,
  UserX,
  EyeOff,
  WifiOff,
  Lock,
  Cloud,
  Smartphone,
  Wifi,
  ShieldCheck,
} from "lucide-react"
import { Reveal, SectionHeading, SpotlightCard } from "../primitives"
import { FloatingShape } from "../three/FloatingShape"

const EASE = [0.16, 1, 0.3, 1] as const

/* ------------------------------------------------------------------ */
/* Trust pills                                                         */
/* ------------------------------------------------------------------ */

const PILLS = [
  {
    icon: Database,
    title: "100% local SQLite",
    body: "Every plan, session and stat lives in a single database file on your disk.",
  },
  {
    icon: UserX,
    title: "No sign-up",
    body: "No email, no password, no profile. Open the app and you're already in.",
  },
  {
    icon: EyeOff,
    title: "Zero tracking",
    body: "No telemetry, no analytics, no phone-home. Nothing watches what you do.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    body: "Planes, trains, dead Wi-Fi — the full system runs without a connection.",
  },
] as const

/* ------------------------------------------------------------------ */
/* The privacy diagram: device holds your data, cloud is severed       */
/* ------------------------------------------------------------------ */

function PrivacyDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto w-full max-w-3xl"
    >
      {/* depth glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-6 top-10 -z-10 h-40 w-40 rounded-full bg-ink-700/20 blur-[110px]" />

      <div className="glass-strong relative overflow-hidden rounded-4xl border border-line-strong p-px shadow-card">
        {/* top accent line */}
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-iris-400/60 to-transparent" />

        <div className="relative rounded-[calc(2rem-1px)] bg-ink-900/60 p-6 sm:p-8">
          {/* faint dotted texture */}
          <div className="pointer-events-none absolute inset-0 rounded-[calc(2rem-1px)] bg-dots opacity-[0.4]" />

          <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
            {/* ---- Your device node ---- */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                {/* pulse ring */}
                <span
                  className="absolute inset-0 -z-10 rounded-3xl bg-iris-500/25 blur-xl"
                  aria-hidden
                />
                <motion.span
                  className="absolute -inset-2 -z-10 rounded-[1.6rem] ring-1 ring-iris-400/30"
                  animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
                <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-iris-400/30 bg-gradient-to-br from-iris-500/15 to-ink-850 shadow-glow sm:h-28 sm:w-28">
                  {/* lock / shield drawn with inline SVG */}
                  <svg
                    viewBox="0 0 48 56"
                    className="h-12 w-12 sm:h-14 sm:w-14"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="rf-shield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c4b5fd" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    {/* shield body */}
                    <path
                      d="M24 3 L43 11 V27 C43 41 34 50 24 53 C14 50 5 41 5 27 V11 Z"
                      fill="url(#rf-shield)"
                      fillOpacity="0.12"
                      stroke="url(#rf-shield)"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    {/* lock shackle */}
                    <path
                      d="M19 27 V23 a5 5 0 0 1 10 0 V27"
                      fill="none"
                      stroke="#c4b5fd"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    {/* lock body */}
                    <rect
                      x="16"
                      y="27"
                      width="16"
                      height="13"
                      rx="2.5"
                      fill="#0a0a0f"
                      stroke="#c4b5fd"
                      strokeWidth="1.6"
                    />
                    <circle cx="24" cy="32.5" r="1.8" fill="#c4b5fd" />
                    <rect x="23.2" y="33.5" width="1.6" height="3.6" rx="0.8" fill="#c4b5fd" />
                  </svg>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-text">Your device</p>
              <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-iris-400/25 bg-iris-500/[0.08] px-2.5 py-1 font-mono text-[10px] text-iris-300">
                <Lock className="h-3 w-3" strokeWidth={2.25} />
                rankforge.db
              </p>
            </div>

            {/* ---- Severed link ---- */}
            <div className="flex flex-col items-center px-1">
              <svg
                viewBox="0 0 120 40"
                className="h-10 w-20 sm:w-28"
                aria-hidden
                preserveAspectRatio="none"
              >
                {/* dashed broken link, gap in middle */}
                <line
                  x1="2"
                  y1="20"
                  x2="48"
                  y2="20"
                  stroke="#3f3f52"
                  strokeWidth="1.6"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                />
                <line
                  x1="72"
                  y1="20"
                  x2="118"
                  y2="20"
                  stroke="#3f3f52"
                  strokeWidth="1.6"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                />
              </svg>
              {/* the "blocked" marker */}
              <span
                className="-mt-[2.05rem] flex h-7 w-7 items-center justify-center rounded-full border border-ink-600 bg-ink-850 text-text-dim shadow-card"
                aria-label="Blocked — no connection to the cloud"
                role="img"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <circle
                    cx="12"
                    cy="12"
                    r="8.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-text-dim sm:text-[10px]">
                no upload
              </span>
            </div>

            {/* ---- Cloud node (disconnected) ---- */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-dashed border-ink-600 bg-ink-850/40 sm:h-28 sm:w-28">
                  <Cloud
                    className="h-12 w-12 text-text-faint sm:h-14 sm:w-14"
                    strokeWidth={1.25}
                  />
                  {/* slash through the cloud */}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="h-[1.5px] w-[78%] rotate-[-32deg] rounded-full bg-text-dim/70" />
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-text-dim">Cloud</p>
              <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-text-faint">
                never used
              </p>
            </div>
          </div>

          {/* caption */}
          <p className="relative mt-8 text-center text-[13px] leading-relaxed text-text-muted">
            Data is written, read and stored entirely on{" "}
            <span className="text-text">your machine</span>. It never crosses
            the gap.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Phone companion reassurance line                                    */
/* ------------------------------------------------------------------ */

function CompanionNote() {
  return (
    <Reveal delay={0.15}>
      <SpotlightCard className="relative overflow-hidden rounded-4xl p-6 md:p-7">
        <div className="pointer-events-none absolute -right-12 -top-10 -z-10 h-40 w-40 rounded-full bg-cyan-500/12 blur-[90px]" />

        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
            <Smartphone className="h-6 w-6" strokeWidth={1.75} />
            <span className="absolute inset-0 -z-10 rounded-2xl bg-cyan-500/20 blur-md" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-base font-semibold text-text">
                The optional phone companion
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-300">
                <Wifi className="h-3 w-3" strokeWidth={2.25} />
                Local network
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
              It&apos;s a local-network server you control, running on your own
              hardware — your phone talks directly to your desktop over your
              Wi-Fi. Still no cloud, no account, no data leaving your home.
            </p>
          </div>

          <span
            className="hidden shrink-0 items-center gap-2 self-center rounded-xl border border-line bg-ink-850/70 px-3 py-2 text-xs font-medium text-text-muted sm:inline-flex"
            aria-hidden
          >
            <ShieldCheck className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
            You own the link
          </span>
        </div>
      </SpotlightCard>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function OfflineV3() {
  return (
    <section id="offline" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient depth */}
      <div className="pointer-events-none absolute left-1/2 top-28 -z-10 h-72 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-iris-600/10 blur-[150px]" />

      {/* floating 3D accent */}
      <FloatingShape
        variant="octa"
        className="pointer-events-none absolute right-[3%] top-12 -z-10 hidden h-[300px] w-[300px] lg:block"
      />

      <div className="container-rf">
        <SectionHeading
          kicker="Private by design"
          title={
            <>
              Your data never{" "}
              <span className="text-gradient">leaves your machine</span>
            </>
          }
          subtitle="No accounts. No cloud. No telemetry. RankForge stores everything in a local database on your computer — it works fully offline, forever."
        />

        <div className="mt-16 lg:mt-20">
          <PrivacyDiagram />
        </div>

        {/* Trust pills */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {PILLS.map((p, i) => (
            <Reveal key={p.title} delay={0.06 + i * 0.07}>
              <SpotlightCard className="h-full rounded-3xl p-5">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-ink-800 text-iris-300 shadow-card">
                  <p.icon className="h-5 w-5" strokeWidth={1.75} />
                  <span className="absolute inset-0 -z-10 rounded-2xl bg-iris-500/15 blur-md" />
                </span>
                <p className="mt-4 text-[15px] font-semibold text-text">
                  {p.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 lg:mt-8">
          <CompanionNote />
        </div>
      </div>
    </section>
  )
}
