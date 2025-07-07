
'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { useTheme } from 'next-themes';

// This component loads the 3D model
function Model(props: any) {
  // useGLTF is a hook from @react-three/drei to load GLTF models
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-pc/model.gltf');
  return <primitive object={scene} {...props} />;
}
// Preload the model to improve performance
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-pc/model.gltf');


export function Hero3DScene() {
  const { resolvedTheme } = useTheme();
  const [bgColor, setBgColor] = useState<string | null>(null);

  // Set the background color based on the current theme
  useEffect(() => {
    if (resolvedTheme) {
      if (resolvedTheme === 'dark') {
        setBgColor('hsl(224, 80%, 5%)'); // Dark theme background
      } else {
        setBgColor('hsl(220, 30%, 98%)'); // Light theme background
      }
    }
  }, [resolvedTheme]);

  // Don't render the canvas until the theme and background color are resolved
  if (!bgColor) {
    return null; 
  }

  return (
    <Canvas
      camera={{ fov: 45, position: [0, 1.5, 8] }} // Set camera field of view and position
    >
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={1.5} />
      <Environment preset="city" />
      
      {/* Suspense is used to show a fallback while the model is loading */}
      <Suspense fallback={null}>
        <Model scale={0.8} position={[0, -1.5, 0]}/>
      </Suspense>

      <OrbitControls 
        autoRotate // The model will rotate automatically
        autoRotateSpeed={0.75} 
        enableZoom={false} // Disable zooming
        // Constrain vertical rotation to prevent flipping
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}
