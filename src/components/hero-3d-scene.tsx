'use client';

import * as THREE from 'three';
import { Suspense, useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';

function Particles({ count = 5000 }) {
  const points = useRef<THREE.Points>(null!);
  const { resolvedTheme } = useTheme();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 30;
      let y = (Math.random() - 0.5) * 30;
      let z = (Math.random() - 0.5) * 30;
      pos.set([x, y, z], i * 3);
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
      points.current.rotation.x += delta * 0.02;
    }
  });
  
  const particleColor = resolvedTheme === 'dark' ? '#ffffff' : '#16171a';

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={particleColor}
        sizeAttenuation
        transparent={false}
      />
    </points>
  );
}

export function Hero3DScene() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This hook ensures the component only renders on the client, after mounting.
    // This is crucial for theme-dependent components to avoid hydration mismatch.
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render nothing on the server or before hydration.
    return null;
  }

  const bgColor = resolvedTheme === 'dark' ? 'hsl(224, 80%, 5%)' : 'hsl(220, 30%, 98%)';

  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
      <color attach="background" args={[bgColor]} />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  );
}
