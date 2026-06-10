"use client"

import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import {
  Target,
  Wand2,
  Timer,
  CheckCircle2,
  LineChart,
  TrendingUp,
  RotateCw,
  CalendarRange,
  Repeat,
  Sparkles,
  StickyNote,
  Users,
  type LucideIcon,
} from "lucide-react"
import { SceneCanvas } from "@/components/three/SceneCanvas"
import { SectionHeading, Reveal } from "@/components/primitives"

/* -------------------------------------------------------------------------- */
/*  Copy — the six loop steps (carried over from SystemV3)                     */
/* -------------------------------------------------------------------------- */

type Step = {
  id: string
  step: string
  icon: LucideIcon
  label: string
  desc: string
  accent: "iris" | "cyan" | "amber"
}

const STEPS: Step[] = [
  {
    id: "goal",
    step: "01",
    icon: Target,
    label: "Goal",
    desc: "Define the outcome — an exam date or a project deadline.",
    accent: "iris",
  },
  {
    id: "plan",
    step: "02",
    icon: Wand2,
    label: "AI Planning",
    desc: "The engine builds a realistic, weak-spot-aware schedule.",
    accent: "iris",
  },
  {
    id: "focus",
    step: "03",
    icon: Timer,
    label: "Focus",
    desc: "Deep-work sessions turn the plan into time on task.",
    accent: "cyan",
  },
  {
    id: "execution",
    step: "04",
    icon: CheckCircle2,
    label: "Execution",
    desc: "Tasks, mocks, and habits get done and logged locally.",
    accent: "cyan",
  },
  {
    id: "analytics",
    step: "05",
    icon: LineChart,
    label: "Analytics",
    desc: "Every session becomes signal on energy, friction, pace.",
    accent: "amber",
  },
  {
    id: "improvement",
    step: "06",
    icon: TrendingUp,
    label: "Improvement",
    desc: "Adaptive replanning sharpens the next cycle automatically.",
    accent: "amber",
  },
]

const ACCENT: Record<
  Step["accent"],
  { ring: string; text: string; dot: string }
> = {
  iris: {
    ring: "border-iris-500/25 bg-iris-500/10",
    text: "text-iris-300",
    dot: "bg-iris-400",
  },
  cyan: {
    ring: "border-cyan-400/25 bg-cyan-500/10",
    text: "text-cyan-300",
    dot: "bg-cyan-400",
  },
  amber: {
    ring: "border-amber-400/25 bg-amber-500/10",
    text: "text-amber-300",
    dot: "bg-amber-400",
  },
}

/* -------------------------------------------------------------------------- */
/*  Orbit data — eight product modules on three tilted rings                   */
/* -------------------------------------------------------------------------- */

type ModuleDef = {
  name: string
  icon: LucideIcon
  accent: "iris" | "cyan"
}

const MODULES: ModuleDef[] = [
  { name: "Planner", icon: CalendarRange, accent: "iris" },
  { name: "Focus", icon: Timer, accent: "cyan" },
  { name: "Habits", icon: Repeat, accent: "iris" },
  { name: "Analytics", icon: LineChart, accent: "cyan" },
  { name: "AI Coach", icon: Sparkles, accent: "iris" },
  { name: "Tasks", icon: CheckCircle2, accent: "cyan" },
  { name: "Notes", icon: StickyNote, accent: "iris" },
  { name: "Accountability", icon: Users, accent: "cyan" },
]

type RingDef = {
  id: string
  radius: number
  /** static tilt of the orbital plane */
  tilt: [number, number, number]
  /** angular velocity in rad/s (sign = direction) */
  speed: number
  /** starting phase offset for the first node */
  phase: number
  color: string
  opacity: number
  modules: ModuleDef[]
}

const RINGS: RingDef[] = [
  {
    id: "inner",
    radius: 1.7,
    tilt: [0.5, 0.1, 0.18],
    speed: 0.16,
    phase: 0.4,
    color: "#8b5cf6",
    opacity: 0.2,
    modules: MODULES.slice(0, 3), // Planner, Focus, Habits
  },
  {
    id: "middle",
    radius: 2.4,
    tilt: [-0.42, 0.2, -0.3],
    speed: -0.11,
    phase: 1.7,
    color: "#38bdf8",
    opacity: 0.16,
    modules: MODULES.slice(3, 6), // Analytics, AI Coach, Tasks
  },
  {
    id: "outer",
    radius: 3.05,
    tilt: [0.24, -0.15, 0.52],
    speed: 0.08,
    phase: 3.1,
    color: "#a78bfa",
    opacity: 0.13,
    modules: MODULES.slice(6), // Notes, Accountability
  },
]

const NODE_ACCENT: Record<ModuleDef["accent"], { hex: string; text: string }> =
  {
    iris: { hex: "#8b5cf6", text: "text-iris-300" },
    cyan: { hex: "#38bdf8", text: "text-cyan-300" },
  }

/** Deterministic PRNG so particle positions are stable across re-renders. */
function mulberry32(seed: number) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* -------------------------------------------------------------------------- */
/*  3D pieces                                                                  */
/* -------------------------------------------------------------------------- */

/** Glowing core — dark sphere with iris emissive + slow wireframe shell. */
function Core() {
  const shellRef = useRef<THREE.Mesh>(null!)
  const matRef = useRef<THREE.MeshStandardMaterial>(null!)

  useFrame((state, delta) => {
    shellRef.current.rotation.y += delta * 0.12
    shellRef.current.rotation.x += delta * 0.05
    // gentle breathing glow
    matRef.current.emissiveIntensity =
      0.85 + Math.sin(state.clock.elapsedTime * 1.1) * 0.22
  })

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.48, 48, 48]} />
        <meshStandardMaterial
          ref={matRef}
          color="#14101f"
          roughness={0.35}
          metalness={0.6}
          emissive="#8b5cf6"
          emissiveIntensity={0.85}
        />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
      {/* core light tints nearby nodes — no white light anywhere */}
      <pointLight color="#8b5cf6" intensity={1.5} distance={9} decay={0} />
    </group>
  )
}

/** A single module node orbiting in its ring's local XY plane. */
function OrbitNode({
  module: mod,
  radius,
  speed,
  phase,
}: {
  module: ModuleDef
  radius: number
  speed: number
  phase: number
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const accent = NODE_ACCENT[mod.accent]
  const Ic = mod.icon

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * speed + phase
    groupRef.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t) * radius,
      0,
    )
    meshRef.current.rotation.x += delta * 0.25
    meshRef.current.rotation.y += delta * 0.18
  })

  return (
    <group ref={groupRef}>
      {/* dark glass body */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color="#101018"
          roughness={0.25}
          metalness={0.75}
          emissive={accent.hex}
          emissiveIntensity={0.45}
        />
      </mesh>
      {/* glowing wireframe overlay */}
      <mesh>
        <octahedronGeometry args={[0.21, 0]} />
        <meshBasicMaterial
          color={accent.hex}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* DOM label chip */}
      <Html
        center
        distanceFactor={9}
        position={[0, 0.38, 0]}
        zIndexRange={[40, 0]}
        className="pointer-events-none select-none"
        style={{ pointerEvents: "none" }}
      >
        <div className="pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line-strong glass px-2.5 py-1">
          <Ic className={`h-3 w-3 ${accent.text}`} strokeWidth={2} />
          <span className="text-[11px] font-medium tracking-wide text-text-muted">
            {mod.name}
          </span>
        </div>
      </Html>
    </group>
  )
}

/** One tilted orbital ring: thin torus + its module nodes. */
function OrbitRing({ ring }: { ring: RingDef }) {
  return (
    <group rotation={ring.tilt}>
      <mesh>
        <torusGeometry args={[ring.radius, 0.006, 8, 160]} />
        <meshBasicMaterial
          color={ring.color}
          transparent
          opacity={ring.opacity}
        />
      </mesh>
      {ring.modules.map((mod, i) => (
        <OrbitNode
          key={mod.name}
          module={mod}
          radius={ring.radius}
          speed={ring.speed}
          phase={ring.phase + (i / ring.modules.length) * Math.PI * 2}
        />
      ))}
    </group>
  )
}

/** Sparse iris dust for depth — positions seeded, stable across renders. */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const rand = mulberry32(0x5247) // "RG"
    const count = 240
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.4 + rand() * 4.2
      const theta = rand() * Math.PI * 2
      arr[i * 3] = Math.cos(theta) * r
      arr[i * 3 + 1] = (rand() - 0.5) * 5.5
      arr[i * 3 + 2] = Math.sin(theta) * r - 1.2
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  )
}

/** Whole system: slow precession + pointer parallax on the outer group. */
function OrbitSystem() {
  const parallaxRef = useRef<THREE.Group>(null!)
  const spinRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    spinRef.current.rotation.y += delta * 0.06
    parallaxRef.current.rotation.y = THREE.MathUtils.lerp(
      parallaxRef.current.rotation.y,
      state.pointer.x * 0.22,
      0.08,
    )
    parallaxRef.current.rotation.x = THREE.MathUtils.lerp(
      parallaxRef.current.rotation.x,
      -state.pointer.y * 0.14,
      0.08,
    )
  })

  return (
    <>
      <fog attach="fog" args={["#050507", 8, 18]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 5]} color="#8b5cf6" intensity={1.2} decay={0} />
      <pointLight position={[-4, -2, 3]} color="#38bdf8" intensity={0.7} decay={0} />

      <group ref={parallaxRef}>
        <group ref={spinRef}>
          <Core />
          {RINGS.map((ring) => (
            <OrbitRing key={ring.id} ring={ring} />
          ))}
        </group>
        <ParticleField />
      </group>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Reduced-motion fallback — static grid of the same module chips             */
/* -------------------------------------------------------------------------- */

function StaticModuleGrid() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {MODULES.map((mod) => {
          const accent = NODE_ACCENT[mod.accent]
          const Ic = mod.icon
          return (
            <div
              key={mod.name}
              className="flex items-center gap-2 rounded-full border border-line-strong glass px-4 py-2.5"
            >
              <Ic className={`h-4 w-4 shrink-0 ${accent.text}`} strokeWidth={2} />
              <span className="truncate text-sm font-medium text-text-muted">
                {mod.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Step row (text side) — same copy as SystemV3, compact layout               */
/* -------------------------------------------------------------------------- */

function StepRow({ step, index }: { step: Step; index: number }) {
  const Ic = step.icon
  const a = ACCENT[step.accent]
  return (
    <Reveal delay={index * 0.06}>
      <div className="group flex items-start gap-4 rounded-2xl border border-line bg-white/[0.02] p-4 transition-colors duration-500 hover:border-line-strong">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${a.ring} ${a.text}`}
        >
          <Ic className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-semibold text-text">{step.label}</h3>
            <span
              aria-hidden="true"
              className={`h-1 w-1 rounded-full ${a.dot} opacity-70`}
            />
            <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-text-faint">
              {step.step}
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            {step.desc}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function SystemOrbit3D() {
  return (
    <section id="system" className="relative scroll-mt-24 py-24 md:py-32">
      {/* ambient depth glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-iris-600/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/8 blur-[120px]"
      />

      <div className="container-rf">
        <SectionHeading
          kicker="How it fits together"
          title={
            <>
              One continuous <span className="text-gradient">loop</span>
            </>
          }
          subtitle="Every part feeds the next. Your goal shapes the plan, the plan drives focus, focus produces data, data improves the plan."
        />

        <div className="mt-16 grid items-center gap-12 md:mt-20 lg:grid-cols-2 lg:gap-10">
          {/* --------------------------------------------------------------- */}
          {/*  Visual side: the orbit scene (canvas-free text stays in DOM)    */}
          {/* --------------------------------------------------------------- */}
          <div className="order-1 lg:order-2">
            <SceneCanvas
              className="relative h-[480px] w-full overflow-hidden sm:h-[520px] lg:h-[560px]"
              camera={{ position: [0, 0, 8.5], fov: 45 }}
              fallback={<StaticModuleGrid />}
            >
              <OrbitSystem />
            </SceneCanvas>
          </div>

          {/* --------------------------------------------------------------- */}
          {/*  Text side: the six loop steps, copy preserved from SystemV3     */}
          {/* --------------------------------------------------------------- */}
          <div className="order-2 lg:order-1">
            <div className="flex flex-col gap-3">
              {STEPS.map((step, i) => (
                <StepRow key={step.id} step={step} index={i} />
              ))}
            </div>

            {/* loop-back chip */}
            <Reveal delay={0.4} className="mt-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-900/80 px-4 py-1.5 backdrop-blur">
                <RotateCw
                  className="h-3.5 w-3.5 text-iris-300"
                  strokeWidth={2}
                />
                <span className="text-xs font-medium tracking-wide text-text-muted">
                  Improvement feeds the next goal
                </span>
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
