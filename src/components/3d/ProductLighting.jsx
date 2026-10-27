import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Studio Luxury Lighting Rig
 * Creates razor-sharp glass edge highlights, liquid refraction luminosity,
 * and specular reflections on platinum metals.
 */
export default function ProductLighting({ isDarkTheme = false }) {
  return (
    <>
      {/* Ambient Base Light (Gentle studio diffusion) */}
      <ambientLight intensity={isDarkTheme ? 0.35 : 0.42} color="#F8FAFC" />

      {/* Right Studio Softbox Strip (Produces crisp right vertical crystal highlight) */}
      <directionalLight
        position={[4.2, 4.5, 4.8]}
        intensity={isDarkTheme ? 2.2 : 2.0}
        color="#FFFFFF"
      />

      {/* Left Studio Softbox Fill Light (Subtle warm fill defining left contour) */}
      <directionalLight
        position={[-4.2, 3.8, 4.5]}
        intensity={isDarkTheme ? 1.4 : 1.3}
        color="#F4EFE8"
      />

      {/* Controlled Rear/Rim Light (Illuminates pale champagne liquid through crystal back) */}
      <directionalLight
        position={[1.8, 5.0, -4.2]}
        intensity={isDarkTheme ? 2.8 : 2.4}
        color="#FFF8EC"
      />

      {/* Plinth Marble & Base Crystal Warm Bounce Light */}
      <pointLight
        position={[0, -1.8, 2.2]}
        intensity={isDarkTheme ? 0.6 : 0.7}
        color="#FFF5E4"
        distance={6}
      />
    </>
  );
}
