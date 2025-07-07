'use client';

import * as THREE from 'three';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from 'next-themes';

function Particles({
  count = 5000,
  mouse,
  particleColor,
  lightColor,
}: {
  count?: number;
  mouse: React.MutableRefObject<number[]>;
  particleColor: string;
  lightColor: string;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const light = useRef<THREE.PointLight>(null!);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current || !light.current) return;

    light.current.position.set(
      mouse.current[0] / aspect,
      -mouse.current[1] / aspect,
      0
    );

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      particle.mx += (mouse.current[0] - particle.mx) * 0.01;
      particle.my += (mouse.current[1] * -1 - particle.my) * 0.01;

      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight
        ref={light}
        distance={100}
        intensity={10}
        color={lightColor}
      />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color={particleColor} roughness={0.5} />
      </instancedMesh>
    </>
  );
}

export function Hero3DScene() {
  const mouse = useRef([0, 0]);
  const { resolvedTheme } = useTheme();
  // State to hold the theme-dependent colors
  const [colors, setColors] = useState<{
    bgColor: string;
    fogColor: string;
    particleColor: string;
    lightColor: string;
  } | null>(null);

  // Effect to update colors when the theme changes
  useEffect(() => {
    // Wait until the theme is resolved
    if (resolvedTheme) {
      if (resolvedTheme === 'dark') {
        setColors({
          bgColor: 'hsl(224, 80%, 5%)',
          fogColor: 'hsl(224, 80%, 5%)',
          particleColor: 'hsl(220, 20%, 90%)',
          lightColor: 'hsl(255, 85%, 65%)',
        });
      } else {
        setColors({
          bgColor: 'hsl(220, 30%, 98%)',
          fogColor: 'hsl(220, 30%, 98%)',
          particleColor: 'hsl(220, 20%, 10%)',
          lightColor: 'hsl(255, 80%, 60%)',
        });
      }
    }
  }, [resolvedTheme]);

  // Don't render the canvas until the colors are determined to prevent FOUC
  if (!colors) {
    return null; 
  }

  return (
    <Canvas
      camera={{ fov: 100, position: [0, 0, 30] }}
      onPointerMove={(e) =>
        (mouse.current = [
          e.clientX - window.innerWidth / 2,
          e.clientY - window.innerHeight / 2,
        ])
      }
    >
      <color attach="background" args={[colors.bgColor]} />
      <fog attach="fog" args={[colors.fogColor, 60, 100]} />
      <Particles
        mouse={mouse}
        particleColor={colors.particleColor}
        lightColor={colors.lightColor}
      />
    </Canvas>
  );
}
