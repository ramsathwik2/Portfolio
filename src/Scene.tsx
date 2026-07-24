import { useRef, useMemo, type MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

const STAR_COUNT = 4000
const DOT_BASE_Y = 1.2

function Starfield() {
  const geometry = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    const colors = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 15 + Math.random() * 60
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      const t = Math.random()
      if (t < 0.1) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.75; colors[i * 3 + 2] = 0.5
      } else if (t < 0.2) {
        colors[i * 3] = 0.65; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function ShootingStars() {
  const lineRef = useRef<any>(null)

  useFrame(({ clock }) => {
    const obj = lineRef.current
    if (!obj) return
    const t = clock.getElapsedTime()
    const cycle = t % 6
    const progress = cycle / 6
    const active = progress < 0.4
    const p = active ? progress / 0.4 : 1

    const startX = -20 + p * 40
    const startY = 8 - p * 16
    const startZ = -30 + p * 30

    const positions = obj.geometry.attributes.position.array as Float32Array
    positions[0] = startX; positions[1] = startY; positions[2] = startZ
    positions[3] = startX - 2; positions[4] = startY - 3; positions[5] = startZ + 2
    obj.geometry.attributes.position.needsUpdate = true
    obj.material.opacity = active ? (1 - p) * 0.8 : 0
  })

  return (
    <Line ref={lineRef} points={[[0, 0, 0], [-2, -3, 2]]} color="#ffffff" transparent opacity={0} lineWidth={1} />
  )
}

function DistantGalaxy() {
  const geometry = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.5 + Math.random() * 4
      const armOffset = angle + radius * 0.8
      const spread = 0.3 + radius * 0.15
      const x = Math.cos(armOffset) * radius + (Math.random() - 0.5) * spread
      const z = Math.sin(armOffset) * radius + (Math.random() - 0.5) * spread
      positions[i * 3] = x + 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.5 + 3
      positions[i * 3 + 2] = -z - 35
      const warmth = 0.6 + Math.random() * 0.4
      colors[i * 3] = warmth
      colors[i * 3 + 1] = warmth * 0.7 + Math.random() * 0.2
      colors[i * 3 + 2] = warmth * 0.4 + Math.random() * 0.15
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function EarthDot() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.position.y = DOT_BASE_Y + Math.sin(clock.getElapsedTime() * 0.5) * 0.05
  })

  return (
    <group ref={groupRef} position={[2.5, DOT_BASE_Y, -8]}>
      <mesh>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#B0D4E8" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color="#87CEEB" transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial color="#B0D4E8" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function ProjectConstellation({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodePositions = useMemo(() => [
    [-2, 1, -7], [3, -1, -9], [-1, -2.5, -5],
    [4, 2, -11], [-3, 2.5, -10], [1, -1, -13],
    [-4, -1.5, -8], [2, 0, -15],
  ] as [number, number, number][], [])

  const connections = useMemo(() => [
    [0, 1], [1, 2], [2, 0], [1, 3], [0, 4],
    [4, 5], [3, 6], [5, 7], [6, 1], [5, 2],
  ], [])

  const opacityRef = useRef(0)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const s = scrollRef.current
    const inRange = s > 0.28 && s < 0.55
    const target = inRange ? 1 : 0
    opacityRef.current += (target - opacityRef.current) * 0.04
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.08
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.04) * 0.05
    groupRef.current.children.forEach((child) => {
      if (child.type === 'Mesh') {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        mat.opacity = opacityRef.current * 0.6
      }
    })
  })

  return (
    <group ref={groupRef} position={[1, 0, -5]}>
      {connections.map(([a, b], i) => (
        <Line
          key={i}
          points={[nodePositions[a], nodePositions[b]]}
          color="#64C5FA"
          transparent
          opacity={0.2}
          lineWidth={0.5}
        />
      ))}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#64C5FA" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  )
}

function SceneContent({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera, pointer } = useThree()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const s = scrollRef.current
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.008 + s * 4 + pointer.x * 0.3
    groupRef.current.rotation.x += (pointer.y * 0.15 - groupRef.current.rotation.x) * 0.05
    camera.position.z = s < 0.05 ? 0 : -(s - 0.05) / 0.95 * 2.5
  })

  return (
    <group ref={groupRef}>
      <Starfield />
      <ShootingStars />
      <DistantGalaxy />
      <EarthDot />
      <ProjectConstellation scrollRef={scrollRef} />
    </group>
  )
}

export default function Scene({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  return <SceneContent scrollRef={scrollRef} />
}
