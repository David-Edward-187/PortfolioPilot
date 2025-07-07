'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { useTheme } from 'next-themes';

// This is the new, reliable model URL
const modelUrl = 'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/macbook-pro/model.gltf';

// This component loads the 3D model
function Model(props: any) {
  // useGLTF is a hook from @react-three/drei to load GLTF models
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} {...props} />;
}
// Preload the model to improve performance
useGLTF.preload(modelUrl);


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
      camera={{ fov: 45, position: [0, 1.2, 7] }} // Adjusted camera position for a better view
    >
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={2.5} />
      <Environment preset="city" />
      
      {/* Suspense is used to show a fallback while the model is loading */}
      <Suspense fallback={null}>
        <Model scale={1.2} position={[0, -1.2, 0]}/>
      </Suspense>

      <OrbitControls 
        autoRotate // The model will rotate automatically
        autoRotateSpeed={0.5} // Slower rotation
        enableZoom={false} // Disable zooming
        // Constrain vertical rotation to prevent flipping
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
