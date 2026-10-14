import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createParticleCircleTexture } from './bottleTexture';

/**
 * Luminous airborne fragrance mist particles with soft radial feathering.
 */
export default function AtmosphereParticles({ count = 40, isDarkTheme = false }) {
  const pointsRef = useRef(null);

  const particleTexture = useMemo(() => {
    if (typeof window !== 'undefined') {
      return createParticleCircleTexture();
    }
    return null;
  }, []);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 1.4 + Math.random() * 2.6;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.5;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      scl[i] = 0.5 + Math.random() * 0.8;
    }

    return [pos, scl];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.025;
    const array = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      array[yIdx] += Math.sin(t * 0.4 + i) * 0.0015;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={particleTexture}
        color={isDarkTheme ? "#D8DFE9" : "#3B82F6"}
        transparent={true}
        opacity={isDarkTheme ? 0.7 : 0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
