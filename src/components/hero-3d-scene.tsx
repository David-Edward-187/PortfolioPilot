"use client";

import * as THREE from 'three';
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// This component is adapted from a public example by @0xca0a on CodeSandbox
function Swarm({ count = 150, mouse }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const [dummy] = useState(() => new THREE.Object3D());

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    // Fades in the mouse effect
    particles.forEach(p => {
        p.mx += (mouse.current[0] * state.viewport.width - p.mx) * 0.02;
        p.my += (mouse.current[1] * -1 * state.viewport.height - p.my) * 0.02;
    })

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      t = particle.t += speed;

      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#ffffff" roughness={0.5} />
    </instancedMesh>
  );
}


export function Hero3DScene() {
  const mouse = useRef([0, 0]);
  return (
    <Canvas
      camera={{ fov: 100, position: [0, 0, 30] }}
      onPointerMove={(e) => {
        if(e.pointerType === "mouse") {
            mouse.current = [(e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2];
        }
      }}
      className="!absolute !inset-0 !z-0"
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[100, 100, 100]} intensity={2} color="hsl(var(--accent))" />
      <pointLight position={[-100, -100, -100]} intensity={3} color="hsl(var(--primary))" />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Swarm count={150} mouse={mouse} />
      </Float>
    </Canvas>
  );
}
