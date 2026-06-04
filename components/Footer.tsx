import Link from "next/link"
import { Logo } from "./Navbar"

const GROUPS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Dashboard", href: "#dashboard" },
      { label: "AI Mentor", href: "#ai" },
      { label: "Pricing", href: "#pricing" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    heading: "For",
    links: [
      { label: "Students", href: "#features" },
      { label: "Exam aspirants", href: "#dashboard" },
      { label: "Creators", href: "#features" },
      { label: "Entrepreneurs", href: "#features" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { label: "Download", href: "/download" },
      { label: "Early access", href: "#join" },
      { label: "Compare", href: "#compare" },
      { label: "Contact", href: "mailto:hello@rankforge.app" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-line py-16">
      <div className="container-rf">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="text-[15px] font-semibold tracking-tight text-text">
                RankForge
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              The operating system for high achievers. Plan, focus, track, and
              forge the future version of yourself.
            </p>
          </div>

          {GROUPS.map((g) => (
            <div key={g.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-dim">
                {g.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="text-sm text-text-muted transition-colors hover:text-text"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-text-muted transition-colors hover:text-text"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-text-muted sm:flex-row">
          <span>© 2026 RankForge. Forge relentlessly.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Offline-first ·
            Private by design
          </span>
        </div>
      </div>
    </footer>
  )
}
