'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.cos(time / 4) / 4;
      mesh.current.rotation.y = Math.sin(time / 4) / 4;
      mesh.current.position.y = Math.sin(time / 2) / 10;
    }
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
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  // Fallback if WebGL is not available
  if (hasWebGL === false) {
    return (
      <div className="absolute inset-0 z-0 opacity-40 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-neon-purple/20 to-neon-cyan/20 blur-[120px] animate-pulse" />
      </div>
    );
  }

  // Pre-hydration or checking state
  if (hasWebGL === null) return null;

  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#010101'), 0);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
