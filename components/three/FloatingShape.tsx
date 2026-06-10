"use client"

import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { SceneCanvas } from "@/components/three/SceneCanvas"

export type FloatingShapeVariant = "knot" | "octa" | "rings"

/* ------------------------------------------------------------------ *
 * Variant geometry
 * ------------------------------------------------------------------ */

/** Thin emissive torus-knot wireframe — a glowing wire ribbon. */
function Knot() {
  return (
    <mesh scale={1.05}>
      <torusKnotGeometry args={[1, 0.22, 140, 18]} />
      <meshStandardMaterial
        color="#0b0b12"
        emissive="#8b5cf6"
        emissiveIntensity={1.4}
        wireframe
        transparent
        opacity={0.45}
      />
    </mesh>
  )
}

/** Dark glass octahedron with a glowing core and faint wire overlay. */
function Octa() {
  return (
    <group>
      {/* inner light makes the glass faces catch colour */}
      <pointLight color="#a78bfa" intensity={4} distance={3.5} decay={2} />
      <mesh scale={1.25}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#13101f"
          metalness={0.2}
          roughness={0.18}
          transparent
          opacity={0.38}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={1.26}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#0b0b12"
          emissive="#a78bfa"
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* glowing core */}
      <mesh scale={0.32}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#c4b5fd"
          emissiveIntensity={2.2}
        />
      </mesh>
    </group>
  )
}

/** Three nested, tilted emissive rings spinning at different speeds. */
const RING_CONF: {
  radius: number
  tube: number
  color: string
  tilt: [number, number, number]
  speed: number
}[] = [
  { radius: 1.5, tube: 0.026, color: "#8b5cf6", tilt: [Math.PI / 2.4, 0, 0], speed: 0.22 },
  { radius: 1.12, tube: 0.022, color: "#38bdf8", tilt: [Math.PI / 3, Math.PI / 5, 0], speed: -0.3 },
  { radius: 0.78, tube: 0.02, color: "#c4b5fd", tilt: [Math.PI / 5, -Math.PI / 4, 0], speed: 0.38 },
]

function Rings() {
  const refs = useRef<(THREE.Group | null)[]>([])
  useFrame((_, delta) => {
    refs.current.forEach((g, i) => {
      if (g) g.rotation.y += delta * RING_CONF[i].speed
    })
  })
  return (
    <group>
      {RING_CONF.map((r, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          rotation={r.tilt}
        >
          <mesh>
            <torusGeometry args={[r.radius, r.tube, 16, 96]} />
            <meshStandardMaterial
              color="#0b0b12"
              emissive={r.color}
              emissiveIntensity={1.6}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ *
 * Slow ambient spin shared by every variant
 * ------------------------------------------------------------------ */

function Spinner({ variant }: { variant: FloatingShapeVariant }) {
  const group = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x += delta * 0.05
  })
  return (
    <group ref={group}>
      {variant === "knot" && <Knot />}
      {variant === "octa" && <Octa />}
      {variant === "rings" && <Rings />}
    </group>
  )
}

/* ------------------------------------------------------------------ *
 * Public component
 * ------------------------------------------------------------------ */

/**
 * Small decorative 3D accent meant to sit absolutely-positioned at a section
 * edge (~260–380px square), pointer-events-none. Three variants:
 *  - "knot":  thin emissive torus-knot wireframe
 *  - "octa":  dark glass octahedron with an inner light + glowing core
 *  - "rings": three nested tilted rings spinning at different speeds
 *
 * Rendered through the shared <SceneCanvas> (lazy mount, offscreen pause,
 * reduced-motion fallback). One to four draw calls per variant.
 */
export function FloatingShape({
  variant,
  className = "",
}: {
  variant: FloatingShapeVariant
  className?: string
}) {
  return (
    <SceneCanvas
      className={`pointer-events-none ${className}`}
      camera={{ position: [0, 0, 5.2], fov: 40 }}
      fallback={
        <div className="h-full w-full rounded-full bg-iris-500/10 blur-3xl" />
      }
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} intensity={8} color="#8b5cf6" />
      <pointLight position={[-3, -2, 3]} intensity={5} color="#38bdf8" />
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
        <Spinner variant={variant} />
      </Float>
    </SceneCanvas>
  )
}
