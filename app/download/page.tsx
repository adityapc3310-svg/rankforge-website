import type { Metadata } from "next"
import Link from "next/link"
import {
  Download,
  Monitor,
  ShieldCheck,
  Check,
  ArrowLeft,
  Cpu,
  HardDrive,
  Lock,
  Sparkles,
} from "lucide-react"
import { AmbientBackground } from "@/components/Backgrounds"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/primitives"
import { DOWNLOAD, withBase } from "@/lib/content"

export const metadata: Metadata = {
  title: "Download for Windows",
  description: `Download RankForge ${DOWNLOAD.version} for Windows — the offline-first operating system for high achievers. ${DOWNLOAD.sizeLabel}.`,
}

const STEPS = [
  {
    title: "Download the installer",
    desc: `Grab RankForge-Setup (${DOWNLOAD.sizeLabel}). It is a standard Windows wizard.`,
  },
  {
    title: "Click More info, then Run anyway",
    desc: "The build is not code-signed yet, so SmartScreen warns once. That is expected for early access.",
  },
  {
    title: "Install and launch",
    desc: "Pick a location, finish the wizard, and RankForge opens — no terminal, no account.",
  },
  {
    title: "Onboard in 2 minutes",
    desc: "Set your exam, schedule and study window. The planner builds your first day instantly.",
  },
]

const REQS = [
  { icon: Monitor, label: "OS", value: "Windows 10 or 11 (64-bit)" },
  { icon: Cpu, label: "Processor", value: "Any modern x64 CPU" },
  { icon: HardDrive, label: "Disk", value: "~250 MB free" },
  { icon: Lock, label: "Privacy", value: "100% offline · local data" },
]

export default function DownloadPage() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="relative">
        <section className="container-rf pb-16 pt-36 sm:pt-44">
          <Reveal>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </Reveal>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left: the download */}
            <div>
              <Reveal>
                <span className="kicker mb-6">
                  <Sparkles className="h-3.5 w-3.5 text-iris-400" /> Early access · v
                  {DOWNLOAD.version}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance text-4xl font-bold tracking-tight text-text sm:text-5xl">
                  Download RankForge <br /> for{" "}
                  <span className="text-gradient">Windows</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                  The full operating system — planner, focus, habits, exam prep
                  and AI mentor — running natively on your machine. Offline-first
                  and private by default.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-9">
                  <a
                    href={withBase(DOWNLOAD.file)}
                    download={DOWNLOAD.fileName}
                    className="btn-primary !px-7 !py-4 !text-base"
                  >
                    <Download className="h-5 w-5" /> Download for Windows
                  </a>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Monitor className="h-3.5 w-3.5" /> {DOWNLOAD.platform}
                    </span>
                    <span>· {DOWNLOAD.sizeLabel}</span>
                    <span>· Free during early access</span>
                  </div>
                </div>
              </Reveal>

              {/* SmartScreen note */}
              <Reveal delay={0.2}>
                <div className="mt-7 flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-amber-400" />
                  <p className="text-sm leading-relaxed text-text-muted">
                    <span className="font-medium text-text">First-run note:</span> the
                    installer is not code-signed yet, so Windows SmartScreen shows a
                    warning. Click{" "}
                    <span className="text-text">More info, then Run anyway</span> — your
                    data never leaves your device.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: install steps */}
            <Reveal delay={0.15}>
              <div className="glass-strong rounded-3xl p-6 shadow-card sm:p-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
                  Up and running in 4 steps
                </h2>
                <ol className="mt-6 space-y-6">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-iris-500 to-iris-700 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-semibold tracking-tight text-text">
                          {s.title}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Requirements */}
        <section className="container-rf pb-28">
          <Reveal>
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-white/[0.02] p-4 sm:grid-cols-4 sm:p-6">
              {REQS.map((r) => {
                const Icon = r.icon
                return (
                  <div key={r.label} className="flex flex-col gap-2 px-2 py-2">
                    <Icon className="h-5 w-5 text-iris-400" />
                    <div className="text-[11px] uppercase tracking-wider text-text-dim">
                      {r.label}
                    </div>
                    <div className="text-sm font-medium text-text">{r.value}</div>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
              {[
                "No account required",
                "Works fully offline",
                "Auto-imports older data",
                "Uninstall anytime",
              ].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
