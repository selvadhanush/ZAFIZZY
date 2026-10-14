import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Studio Luxury Lighting Rig
 * Creates razor-sharp glass edge highlights, liquid refraction luminosity,
 * and specular reflections on platinum metals.
 */
export default function ProductLighting({ isDarkTheme = false }) {
  const rimLightRef = useRef(null);

  useFrame((state) => {
    if (rimLightRef.current) {
      const t = state.clock.getElapsedTime();
      rimLightRef.current.position.x = Math.sin(t * 0.3) * 0.6 + 3.0;
    }
  });

  return (
    <>
      {/* Ambient Base Light */}
      <ambientLight intensity={isDarkTheme ? 0.35 : 0.55} color="#FAF9F6" />

      {/* Main Studio Key Light (Front-Right Top) */}
      <directionalLight
        position={[4.5, 6.0, 5.5]}
        intensity={isDarkTheme ? 1.6 : 2.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* High-Impact Glass Rim Light (Back-Right) */}
      <directionalLight
        ref={rimLightRef}
        position={[3.0, 4.5, -4.0]}
        intensity={isDarkTheme ? 3.0 : 2.2}
        color="#E2E8F0"
      />

      {/* Cool Mist-Blue Fill Light (Front-Left) */}
      <directionalLight
        position={[-4.5, 3.0, 4.0]}
        intensity={isDarkTheme ? 0.7 : 0.9}
        color="#D8DFE9"
      />

      {/* Plinth Bounce Light */}
      <pointLight
        position={[0, -1.9, 1.8]}
        intensity={0.6}
        color="#FFFFFF"
        distance={5}
      />
    </>
  );
}
