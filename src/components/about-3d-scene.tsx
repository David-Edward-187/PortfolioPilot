'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from 'next-themes';

function Scene() {
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === 'dark' ? '#8c66ff' : '#7d4dff'; // Using primary colors from globals.css

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.8} color={color} />
      
      <Suspense fallback={null}>
        <Icosahedron args={[2.5, 0]} position={[0, 0, 0]}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.55}
                speed={1.75}
                roughness={0.1}
            />
        </Icosahedron>
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
    </>
  );
}

export function About3DScene() {
  return (
    <Canvas camera={{ fov: 25 }}>
      <Scene />
    </Canvas>
  );
}
