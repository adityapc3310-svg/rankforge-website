import Link from "next/link"
import { Flame } from "lucide-react"

const GROUPS = [
  {
    heading: "Product",
    links: [
      { label: "The system", href: "#system" },
      { label: "Two modes", href: "#modes" },
      { label: "AI that acts", href: "#ai" },
      { label: "Showcase", href: "#showcase" },
      { label: "Offline-first", href: "#offline" },
    ],
  },
  {
    heading: "For",
    links: [
      { label: "Exam aspirants", href: "#modes" },
      { label: "Students", href: "#modes" },
      { label: "Founders", href: "#modes" },
      { label: "Professionals", href: "#modes" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { label: "Download for Windows", href: "/download" },
      { label: "Why we built it", href: "#why" },
      { label: "GitHub", href: "https://github.com/adityapc3310-svg/rankforge-website" },
    ],
  },
]

export function FooterV3() {
  return (
    <footer className="relative border-t border-line py-16">
      <div className="container-rf">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-iris-500 to-iris-700 shadow-[0_4px_16px_-4px_rgba(124,58,237,0.8)]">
                <Flame className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-text">RankForge</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              The operating system for ambitious people. Plan, focus, execute, and improve —
              every goal in one offline-first system.
            </p>
            <p className="mt-4 text-xs text-text-faint">Every goal. One system.</p>
          </div>

          {GROUPS.map((g) => (
            <div key={g.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-dim">
                {g.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) =>
                  l.href.startsWith("/") ? (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-text-muted transition-colors hover:text-text">
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(l.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-text-muted transition-colors hover:text-text"
                      >
                        {l.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-text-muted sm:flex-row">
          <span>© 2026 RankForge. Forge relentlessly.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Offline-first · Private by design
          </span>
        </div>
      </div>
    </footer>
  )
}
