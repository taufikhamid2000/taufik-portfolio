'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Distorted wireframe sphere that drifts on its own and gently leans
 * toward the pointer — the hero's signature "wow" element. Kept to a
 * single low-poly mesh + a scattered point cloud so it stays light on
 * the GPU despite the visual presence.
 */
function DistortedBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;

    // Lean toward the pointer, normalized to viewport so it works at any size.
    const targetX = (state.pointer.x * viewport.width) / 8;
    const targetY = (state.pointer.y * viewport.height) / 8;
    meshRef.current.rotation.z += (targetX * 0.02 - meshRef.current.rotation.z) * 0.05;
    meshRef.current.position.x += (targetX * 0.15 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY * 0.15 - meshRef.current.position.y) * 0.05;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.8, 6]}>
      <MeshDistortMaterial
        color="#7c8cff"
        attach="material"
        distort={0.45}
        speed={1.4}
        roughness={0.15}
        metalness={0.6}
        wireframe
      />
    </Icosahedron>
  );
}

// Deterministic PRNG (mulberry32) — a fixed seed keeps particle layout
// stable across renders instead of calling the impure Math.random.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 220;
    const rand = mulberry32(1337);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 12;
      arr[i * 3 + 1] = (rand() - 0.5) * 12;
      arr[i * 3 + 2] = (rand() - 0.5) * 6 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#5eead4" size={0.035} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff3ea5" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#2dd4bf" />
      <ParticleField />
      <DistortedBlob />
    </Canvas>
  );
}
