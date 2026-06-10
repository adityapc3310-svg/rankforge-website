"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei"
import * as THREE from "three"

/**
 * ForgeCore — the signature hero object.
 *
 * A slowly-rotating faceted "forge" core: dark-glass icosahedron with an
 * iris emissive heart, a low-opacity wireframe shell, two thin glowing
 * orbit rings (cyan + iris), drei Sparkles for ember dust, and a breathing
 * point light buried inside the core so the whole thing reads as a forge.
 *
 * Must be rendered inside a <SceneCanvas>. Scene lighting (ambient + colored
 * point lights / fog) is supplied by the parent scene.
 */
export function ForgeCore({ scale = 1 }: { scale?: number }) {
  const parallax = useRef<THREE.Group>(null!)
  const spinner = useRef<THREE.Group>(null!)
  const wire = useRef<THREE.Mesh>(null!)
  const ringA = useRef<THREE.Group>(null!)
  const ringB = useRef<THREE.Group>(null!)
  const forgeLight = useRef<THREE.PointLight>(null!)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Slow continuous spin of the core assembly.
    spinner.current.rotation.y += delta * 0.12

    // Wireframe shell counter-rotates for parallax depth.
    wire.current.rotation.y -= delta * 0.07
    wire.current.rotation.x += delta * 0.03

    // Rings precess gently on independent axes.
    ringA.current.rotation.x = Math.PI / 2.45 + Math.sin(t * 0.22) * 0.1
    ringA.current.rotation.y += delta * 0.1
    ringB.current.rotation.x = -Math.PI / 2.9 + Math.cos(t * 0.18) * 0.08
    ringB.current.rotation.y -= delta * 0.08

    // The forge "breathes" — slow pulse on the inner light.
    forgeLight.current.intensity = 4.2 + Math.sin(t * 1.4) * 1.1

    // Gentle pointer parallax on the outermost group.
    parallax.current.rotation.x = THREE.MathUtils.lerp(
      parallax.current.rotation.x,
      state.pointer.y * 0.16,
      0.06,
    )
    parallax.current.rotation.y = THREE.MathUtils.lerp(
      parallax.current.rotation.y,
      state.pointer.x * 0.22,
      0.06,
    )
  })

  return (
    <group ref={parallax} scale={scale}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
        {/* Ember light buried inside the core */}
        <pointLight
          ref={forgeLight}
          color="#8b5cf6"
          intensity={4.2}
          distance={7}
          decay={2}
        />

        <group ref={spinner}>
          {/* Faceted dark-glass core */}
          <mesh>
            <icosahedronGeometry args={[1.35, 1]} />
            <MeshDistortMaterial
              distort={0.18}
              speed={1.3}
              color="#0b0b12"
              roughness={0.22}
              metalness={0.6}
              clearcoat={1}
              clearcoatRoughness={0.35}
              flatShading
              emissive="#7c3aed"
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>

        {/* Low-opacity glowing wireframe shell */}
        <mesh ref={wire} rotation={[0.4, 0.8, 0]}>
          <icosahedronGeometry args={[1.62, 1]} />
          <meshBasicMaterial
            color="#a78bfa"
            wireframe
            transparent
            opacity={0.16}
          />
        </mesh>

        {/* Tilted orbit ring — cyan */}
        <group ref={ringA} rotation={[Math.PI / 2.45, 0, 0.35]}>
          <mesh>
            <torusGeometry args={[2.05, 0.016, 12, 128]} />
            <meshStandardMaterial
              color="#06121a"
              emissive="#38bdf8"
              emissiveIntensity={2.2}
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        </group>

        {/* Tilted orbit ring — iris */}
        <group ref={ringB} rotation={[-Math.PI / 2.9, 0, -0.5]}>
          <mesh>
            <torusGeometry args={[2.4, 0.012, 12, 128]} />
            <meshStandardMaterial
              color="#100a1d"
              emissive="#8b5cf6"
              emissiveIntensity={2}
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        </group>

        {/* Ember dust */}
        <Sparkles
          count={70}
          scale={5.5}
          size={2}
          speed={0.3}
          opacity={0.45}
          color="#c4b5fd"
          noise={0.6}
        />
      </Float>
    </group>
  )
}
