import React, { useRef, useMemo, Component, ErrorInfo, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
export { WebGLErrorBoundary };

function TechCore() {
  const coreRef = useRef<THREE.Group>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const midRingRef = useRef<THREE.Mesh>(null!);
  const innerPolyRef = useRef<THREE.Mesh>(null!);
  const glowSphereRef = useRef<THREE.Mesh>(null!);

  // Generate constellation of 400 nodes
  const [particles, nodePositions] = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    const nodes: [number, number, number][] = [];
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.2 + Math.random() * 2.8;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      if (i < 8) {
        nodes.push([x * 0.7, y * 0.7, z * 0.7]);
      }
    }
    return [pos, nodes];
  }, []);

  useFrame((state, delta) => {
    // Gentle mouse parallax
    const targetX = state.pointer.x * 0.35;
    const targetY = -state.pointer.y * 0.25;

    coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, targetX, 0.04);
    coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, targetY, 0.04);

    // Continuous technological rotation
    outerRingRef.current.rotation.z += delta * 0.22;
    outerRingRef.current.rotation.x += delta * 0.12;

    midRingRef.current.rotation.y -= delta * 0.18;
    midRingRef.current.rotation.z -= delta * 0.15;

    innerPolyRef.current.rotation.y += delta * 0.25;
    innerPolyRef.current.rotation.x += delta * 0.18;

    // Subtle pulsing core glow
    const time = state.clock.getElapsedTime();
    if (glowSphereRef.current) {
      const scale = 1.0 + Math.sin(time * 2.0) * 0.06;
      glowSphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={coreRef}>
      {/* Central Floating Geometric Technological Sculpture */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Core Crystalline Icosahedron */}
        <mesh ref={innerPolyRef}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#DCE5F2"
            metalness={0.9}
            roughness={0.15}
            flatShading
            wireframe={false}
          />
        </mesh>

        {/* Outer Translucent Holographic Cage */}
        <mesh scale={1.4}>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshPhysicalMaterial
            color="#55D6FF"
            transparent
            opacity={0.16}
            roughness={0.05}
            transmission={0.6}
            thickness={0.5}
            wireframe
          />
        </mesh>

        {/* Luminous Inner Core Sphere */}
        <mesh ref={glowSphereRef} scale={0.75}>
          <sphereGeometry args={[0.75, 24, 24]} />
          <meshBasicMaterial color="#55D6FF" transparent opacity={0.25} />
        </mesh>

        {/* Orbiting Tech Nodes */}
        {nodePositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color={idx % 2 === 0 ? "#55D6FF" : "#2563EB"} />
          </mesh>
        ))}
      </Float>

      {/* Primary Cyan Orbiting Torus Ring */}
      <mesh ref={outerRingRef} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[2.2, 0.016, 16, 128]} />
        <meshBasicMaterial color="#55D6FF" />
      </mesh>

      {/* Secondary Electric Blue Orbiting Ring */}
      <mesh ref={midRingRef} rotation={[-0.8, 0.6, 0.2]}>
        <torusGeometry args={[2.7, 0.012, 16, 128]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>

      {/* Subtle Background Node Particle Field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particles}
            count={400}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.024}
          color="#DCE5F2"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* Directed Cinematic Neon Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 3]} intensity={45} color="#55D6FF" distance={12} />
      <pointLight position={[-4, -3, 2]} intensity={35} color="#2563EB" distance={10} />
      <pointLight position={[0, -2, -3]} intensity={20} color="#DCE5F2" distance={8} />
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
      style={{ pointerEvents: "auto", width: "100%", height: "100%" }}
    >
      <TechCore />
    </Canvas>
  );
}
