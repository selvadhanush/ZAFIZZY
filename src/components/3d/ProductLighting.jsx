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
      <ambientLight intensity={isDarkTheme ? 0.4 : 0.6} color="#FAF9F6" />

      {/* Right Studio Softbox Strip (Produces right vertical glass highlight) */}
      <directionalLight
        position={[4.5, 4.5, 5.0]}
        intensity={isDarkTheme ? 2.2 : 2.8}
        color="#FFFFFF"
      />

      {/* Left Studio Softbox Strip (Produces left vertical glass highlight) */}
      <directionalLight
        position={[-4.5, 4.5, 5.0]}
        intensity={isDarkTheme ? 1.8 : 2.4}
        color="#F8FAFC"
      />

      {/* High-Impact Top/Rear Crystal Rim Light */}
      <directionalLight
        ref={rimLightRef}
        position={[2.0, 5.5, -4.0]}
        intensity={isDarkTheme ? 3.2 : 2.5}
        color="#E2E8F0"
      />

      {/* Plinth Marble Warm Bounce Light */}
      <pointLight
        position={[0, -1.8, 2.2]}
        intensity={isDarkTheme ? 0.6 : 1.2}
        color="#FFF9F0"
        distance={6}
      />
    </>
  );
}
