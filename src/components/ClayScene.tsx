'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(time / 4) / 4;
    mesh.current.rotation.y = Math.sin(time / 4) / 4;
    mesh.current.position.y = Math.sin(time / 2) / 10;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bc13fe" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={mesh} args={[1, 64, 64]} scale={1.5}>
          <MeshDistortMaterial
            color="#111111"
            speed={3}
            distort={0.4}
            radius={1}
            roughness={0.2}
            metalness={0.8}
            emissive="#000000"
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function ClayScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
