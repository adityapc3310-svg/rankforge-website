"use client"

/**
 * Ambient background system. Layered, fixed-position glows + a faint animated
 * grid that fades toward the page bottom. Kept GPU-light: blurred radial
 * gradients on long, slow transforms — no per-frame JS.
 */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base grid */}
      <div className="absolute inset-0 bg-grid-fade opacity-[0.5]" />

      {/* Top vignette + violet aurora */}
      <div
        className="absolute -top-1/3 left-1/2 h-[900px] w-[1200px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,58,237,0.55), rgba(124,58,237,0) 70%)",
        }}
      />

      {/* Floating ambient orbs */}
      <div
        className="absolute left-[8%] top-[20%] h-[420px] w-[420px] rounded-full opacity-25 blur-[110px] animate-float-slow"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.6), transparent 70%)",
        }}
      />
      <div
        className="absolute right-[6%] top-[44%] h-[480px] w-[480px] rounded-full opacity-20 blur-[120px] animate-float-slower"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.5), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[6%] left-[34%] h-[420px] w-[520px] rounded-full opacity-[0.14] blur-[120px] animate-float-slow"
        style={{
          background:
            "radial-gradient(closest-side, rgba(245,158,11,0.4), transparent 70%)",
        }}
      />

      {/* Subtle grain via noise-like overlay */}
      <div className="absolute inset-0 bg-[#050507]/0 mix-blend-overlay" />
    </div>
  )
}

/** A localized grid panel used inside section backgrounds. */
export function GridPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-dots opacity-[0.35] ${className}`}
    />
  )
}
