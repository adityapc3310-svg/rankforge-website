"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Monitor } from "lucide-react";

type State = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LS_KEY = "rf_waitlisted";

/** The site's one real conversion action: a working early-access signup.
 *  Posts to /api/waitlist, validates, and remembers you across visits. */
export function Waitlist({ source = "site", compact = false }: { source?: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem(LS_KEY)) {
      setState("success");
      setMessage("You're on the early-access list. We'll be in touch.");
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;
    if (!EMAIL_RE.test(email.trim())) {
      setState("error");
      setMessage("Please enter a valid email.");
      return;
    }
    setState("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        window.localStorage.setItem(LS_KEY, "1");
        setState("success");
        setMessage(data.message ?? "You're on the list.");
      } else {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error — please try again.");
    }
  }

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mx-auto flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 ${compact ? "max-w-sm" : "max-w-md"}`}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
        <span className="text-sm font-medium text-text">{message}</span>
      </motion.div>
    );
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
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-label="Email address"
          className="flex-1 rounded-xl border border-line-strong bg-white/[0.03] px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-iris-500/60"
        />
        <button type="submit" disabled={state === "submitting"} className="btn-primary justify-center disabled:opacity-70">
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
        <Monitor className="h-3.5 w-3.5" /> Windows desktop app · early access · no spam, ever
      </p>
    </div>
  );
}
