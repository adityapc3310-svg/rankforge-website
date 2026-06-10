"use client"

import { useRef, useState, type PointerEvent, type ReactNode } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const

/** Spring used for the pointer-tracked rotation — snappy but never twitchy. */
const SPRING = { stiffness: 180, damping: 22, mass: 0.6 }

/* Two-layer shadow: soft drop + faint iris glow. Idle state keeps the same
 * structure so framer-motion can interpolate cleanly. boxShadow (not filter)
 * so children using backdrop-blur keep working. */
const SHADOW_IDLE = "0 0 0 0 rgba(5,5,7,0), 0 0 0 0 rgba(139,92,246,0)"
const SHADOW_HOVER =
  "0 28px 60px -20px rgba(5,5,7,0.6), 0 0 44px -12px rgba(139,92,246,0.22)"

/**
 * Pointer-tracking perspective tilt wrapper. Pure CSS 3D — no canvas.
 *
 * Wrap any card in <Tilt3D> and it rotates toward the cursor (up to `max`
 * degrees on each axis), lifts slightly on the Z axis with a soft iris-tinted
 * shadow while hovered, and springs back to rest on pointer leave.
 * Respects prefers-reduced-motion (renders inert).
 */
export function Tilt3D({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null!)
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, SPRING)
  const rotateY = useSpring(ry, SPRING)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = ref.current.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    // Normalised cursor position in [-0.5, 0.5] from the card centre.
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rx.set(-py * 2 * max)
    ry.set(px * 2 * max)
  }

  const reset = () => {
    rx.set(0)
    ry.set(0)
    setHovered(false)
  }

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerEnter={() => {
          if (!reduce) setHovered(true)
        }}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{
          z: hovered ? 18 : 0,
          boxShadow: hovered ? SHADOW_HOVER : SHADOW_IDLE,
        }}
        transition={{ duration: 0.45, ease: EASE }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
