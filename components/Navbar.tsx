"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Flame } from "lucide-react"
import { NAV_LINKS } from "@/lib/content"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`flex w-full max-w-container items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 md:px-5 ${
          scrolled ? "glass-strong shadow-card" : "border border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight text-text">
            RankForge
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a href="#pricing" className="px-3.5 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text">
            Pricing
          </a>
          <Link href="/download" className="btn-primary !px-5 !py-2.5">
            Download
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-4 right-4 top-20 z-50 rounded-2xl glass-strong p-3 md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-text"
              >
                {l.label}
              </a>
            ))}
            <Link href="/download" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              Download
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-iris-500 to-iris-700 shadow-[0_4px_16px_-4px_rgba(124,58,237,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] ${className}`}
    >
      <Flame className="h-4 w-4 text-white" strokeWidth={2.5} />
    </span>
  )
}
