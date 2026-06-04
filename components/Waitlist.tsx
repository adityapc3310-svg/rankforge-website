"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Loader2, Monitor } from "lucide-react"

type State = "idle" | "submitting" | "success" | "error"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LS_KEY = "rf_waitlisted"

// Optional external form endpoint (e.g. Formspree, Buttondown). When set at
// build time, signups are POSTed there. On a pure static host with no endpoint
// configured, the form validates and confirms client-side and remembers you.
const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT

/** The site's conversion action: an early-access signup that works on a fully
 *  static host (GitHub Pages) — no backend required. */
export function Waitlist({
  source = "site",
  compact = false,
}: {
  source?: string
  compact?: boolean
}) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<State>("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem(LS_KEY)) {
      setState("success")
      setMessage("You are on the early-access list. We will be in touch.")
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (state === "submitting") return
    if (!EMAIL_RE.test(email.trim())) {
      setState("error")
      setMessage("Please enter a valid email.")
      return
    }
    setState("submitting")
    setMessage("")

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: email.trim(), source }),
        })
        if (!res.ok) throw new Error("bad status")
      }
      window.localStorage.setItem(LS_KEY, "1")
      setState("success")
      setMessage("You are on the early-access list. We will be in touch.")
    } catch {
      setState("error")
      setMessage("Could not submit right now — please try again.")
    }
  }

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mx-auto flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 ${
          compact ? "max-w-sm" : "max-w-md"
        }`}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
        <span className="text-sm font-medium text-text">{message}</span>
      </motion.div>
    )
  }

  return (
    <div className={`mx-auto w-full ${compact ? "max-w-sm" : "max-w-md"}`}>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (state === "error") setState("idle")
          }}
          aria-label="Email address"
          className="flex-1 rounded-xl border border-line-strong bg-white/[0.03] px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-iris-500/60"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn-primary justify-center disabled:opacity-70"
        >
          {state === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Joining…
            </>
          ) : (
            <>
              Get early access <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {state === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-center text-xs text-[#ff8080] sm:text-left"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-text-muted">
        <Monitor className="h-3.5 w-3.5" /> Windows desktop app · early access · no spam,
        ever
      </p>
    </div>
  )
}
