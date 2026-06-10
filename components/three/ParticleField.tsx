"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

/**
 * Deterministic PRNG (mulberry32) so particle positions/colors are identical
 * across re-renders, HMR and server/client — never regenerate per render.
 */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const IRIS = "#a78bfa"
const CYAN = "#7dd3fc"
const WHITE = "#ECECF1"

/**
 * Ambient star-dust field: ~2500 additive points drifting inside a large,
 * slightly squashed sphere. Single draw call. Inside-canvas component —
 * must be rendered as a child of <SceneCanvas>.
 */
export function ParticleField({
  count = 2500,
  radius = 9,
  parallax = 0.16,
}: {
  /** Number of points (one draw call regardless). */
  count?: number
  /** Radius of the spherical volume the field fills. */
  radius?: number
  /** Strength of the mouse-parallax sway applied to the whole field. */
  parallax?: number
}) {
  const outer = useRef<THREE.Group>(null!) // mouse parallax
  const inner = useRef<THREE.Group>(null!) // continuous slow drift

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(0x52464f52) // "RFOR" — stable seed
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      // Uniform distribution inside a sphere, squashed on Y for a wide field.
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const r = radius * Math.cbrt(rand())
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Weighted palette: iris 50%, cyan 30%, white 20% — dimmed per-particle.
      const pick = rand()
      c.set(pick < 0.5 ? IRIS : pick < 0.8 ? CYAN : WHITE)
      const brightness = 0.35 + rand() * 0.65
      colors[i * 3] = c.r * brightness
      colors[i * 3 + 1] = c.g * brightness
      colors[i * 3 + 2] = c.b * brightness
    }
    return { positions, colors }
  }, [count, radius])

  useFrame((state, delta) => {
    // Very slow continuous drift.
    inner.current.rotation.y += delta * 0.018
    inner.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.04

    // Mouse parallax of the whole field — frame-rate-independent lerp.
    const k = 1 - Math.exp(-3 * delta)
    const o = outer.current
    o.position.x += (state.pointer.x * parallax * 1.2 - o.position.x) * k
    o.position.y += (state.pointer.y * parallax * 0.8 - o.position.y) * k
    o.rotation.y += (state.pointer.x * parallax * 0.4 - o.rotation.y) * k
    o.rotation.x += (-state.pointer.y * parallax * 0.3 - o.rotation.x) * k
  })

  return (
    <group ref={outer}>
      <group ref={inner}>
        {/* The field surrounds the camera — never frustum-cull it away. */}
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            sizeAttenuation
            vertexColors
            transparent
            opacity={0.45}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  )
}
