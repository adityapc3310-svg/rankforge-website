"use client"

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react"
import { Canvas } from "@react-three/fiber"

/**
 * Shared R3F canvas wrapper used by every 3D scene on the site.
 *
 * Performance guarantees:
 *  - Mounts the WebGL canvas only when the wrapper scrolls near the viewport
 *    (IntersectionObserver, 200px margin) and unmounts the frameloop when
 *    fully offscreen, so multiple scenes never compete for GPU time.
 *  - DPR capped at 1.75 to keep fill-rate sane on 4k displays.
 *  - Respects prefers-reduced-motion: renders the static `fallback` instead.
 *  - Transparent canvas — sections keep their existing CSS backgrounds.
 */
export function SceneCanvas({
  children,
  className = "",
  fallback = null,
  camera = { position: [0, 0, 6] as [number, number, number], fov: 45 },
}: {
  children: ReactNode
  className?: string
  fallback?: ReactNode
  camera?: { position: [number, number, number]; fov: number }
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Mount once when near the viewport…
    const mount = new IntersectionObserver(
      ([e]) => e.isIntersecting && setNear(true),
      { rootMargin: "200px" },
    )
    // …and pause the frameloop whenever fully offscreen.
    const pause = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    mount.observe(el)
    pause.observe(el)
    return () => {
      mount.disconnect()
      pause.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={className} aria-hidden>
      {reduced ? (
        fallback
      ) : near ? (
        <Canvas
          camera={camera}
          dpr={[1, 1.75]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  )
}
