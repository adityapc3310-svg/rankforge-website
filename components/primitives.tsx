"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"
import * as Icons from "lucide-react"

/* ----------------------------- Icon resolver ----------------------------- */

export function Icon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    name
  ]
  if (!Cmp) return null
  return <Cmp className={className} />
}

/* --------------------------- Reveal on scroll ---------------------------- */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: "div" | "li" | "span"
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={revealVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode
  className?: string
  gap?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChild({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={revealVariants}>
      {children}
    </motion.div>
  )
}

/* --------------------------- Animated counter ---------------------------- */

export function Counter({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 })
  const rounded = useTransform(spring, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) mv.set(to)
  }, [inView, to, mv])

  useEffect(() => rounded.on("change", (v) => setDisplay(v)), [rounded])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

/* --------------------------- Section heading ----------------------------- */

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="kicker">
      <span className="h-1.5 w-1.5 rounded-full bg-iris-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.7)]" />
      {children}
    </span>
  )
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: {
  kicker: string
  title: ReactNode
  subtitle?: string
  align?: "center" | "left"
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <Reveal>
        <Kicker>{kicker}</Kicker>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-text md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-prose text-balance text-base leading-relaxed text-text-muted md:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ------------------------- Tilt / spotlight card ------------------------- */

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50, active: false })

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          active: true,
        })
      }}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      className={`card-frame group relative overflow-hidden transition-shadow duration-500 hover:shadow-card-hover ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(139,92,246,0.16), transparent 65%)`,
        }}
      />
      {children}
    </div>
  )
}
