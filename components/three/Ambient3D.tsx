"use client"

import { useMemo, useRef, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { SceneCanvas } from "@/components/three/SceneCanvas"
import { ParticleField } from "@/components/three/ParticleField"

/**
 * Site-wide ambient 3D background. Fixed, full-viewport, behind everything,
 * never intercepts pointer events. Layering (bottom → top):
 *
 *   1. CSS radial-gradient glows (always present — the page keeps its
 *      aesthetic while WebGL lazily mounts, and they double as the
 *      reduced-motion fallback).
 *   2. Transparent <SceneCanvas>: ParticleField + a few far, very dim
 *      emissive wireframe shapes drifting in the fog.
 *
 * Atmosphere, not a screensaver.
 */
export function Ambient3D() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Permanent CSS glow layer — visible before/under the canvas. */}
      <div className="absolute inset-0">
        <GlowLayer />
      </div>

      <SceneCanvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 9], fov: 50 }}
        fallback={<GlowLayer />}
      >
        <AmbientScene />
      </SceneCanvas>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* CSS glow (mirrors the old AmbientBackground orbs in Backgrounds.tsx) */
/* ------------------------------------------------------------------ */

function GlowLayer() {
  return (
    <>
      {/* Violet aurora, top center */}
      <div
        className="absolute -top-1/4 left-1/2 h-[820px] w-[1100px] -translate-x-1/2 rounded-full opacity-35 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,58,237,0.5), rgba(124,58,237,0) 70%)",
        }}
      />
      {/* Cyan orb, right side */}
      <div
        className="absolute right-[4%] top-[42%] h-[460px] w-[520px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.45), transparent 70%)",
        }}
      />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* WebGL scene                                                          */
/* ------------------------------------------------------------------ */

function AmbientScene() {
  return (
    <>
      <fog attach="fog" args={["#050507", 8, 18]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 4, 4]} intensity={18} color="#8b5cf6" />
      <pointLight position={[-6, -3, 2]} intensity={12} color="#38bdf8" />

      <ParticleField />

      <ShapeLayer>
        <WireShape position={[-5.5, 2.6, -5]} color="#8b5cf6" speed={0.07} bob={0.4}>
          <icosahedronGeometry args={[2.3, 1]} />
        </WireShape>
        <WireShape position={[6, -2.8, -6]} color="#38bdf8" speed={0.05} bob={0.5}>
          <torusGeometry args={[2.6, 0.7, 10, 40]} />
        </WireShape>
        <WireShape position={[2.6, 3.6, -8]} color="#c4b5fd" speed={0.1} bob={0.3}>
          <icosahedronGeometry args={[1.4, 0]} />
        </WireShape>
      </ShapeLayer>
    </>
  )
}

/** Group that sways very slightly with the pointer so the shapes share the field's parallax. */
function ShapeLayer({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    const k = 1 - Math.exp(-2.5 * delta)
    const g = group.current
    g.rotation.y += (state.pointer.x * 0.05 - g.rotation.y) * k
    g.rotation.x += (-state.pointer.y * 0.04 - g.rotation.x) * k
  })

  return <group ref={group}>{children}</group>
}

/**
 * A large, far-away, barely-there emissive wireframe shape: very slow tumble
 * plus a gentle sine bob. Geometry is supplied as children.
 */
function WireShape({
  position,
  color,
  speed = 0.08,
  bob = 0.4,
  children,
}: {
  position: [number, number, number]
  color: string
  /** Tumble speed in rad/s (keep within 0.05–0.2). */
  speed?: number
  /** Vertical bob amplitude in world units. */
  bob?: number
  children: ReactNode
}) {
  const mesh = useRef<THREE.Mesh>(null!)
  // De-sync the bob between shapes without extra props.
  const phase = useMemo(() => position[0] * 1.7 + position[1] * 2.3, [position])

  useFrame((state, delta) => {
    const m = mesh.current
    m.rotation.x += speed * 0.6 * delta
    m.rotation.y += speed * delta
    m.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.25 + phase) * bob
  })

  return (
    <mesh ref={mesh} position={position}>
      {children}
      <meshStandardMaterial
        wireframe
        color="#0b0b12"
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.16}
        depthWrite={false}
      />
    </mesh>
  )
}
