import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import {
  createBottleBrandTexture,
  createLiquidGradientTexture,
  createBrushedMetalTexture,
} from './bottleTexture';

/**
 * Authentic Haute Parfumerie Flacon — Faithful to signature-bottle.jpg
 * 
 * Key architectural elements:
 * 1. Crisp, precision-beveled optical crystal envelope with ultra-low roughness (0.01)
 * 2. Solid thick crystal base ("Glace d'Eau") occupying bottom ~28% of the bottle
 * 3. Suspended U-curved inner liquid chamber with deep royal midnight to sapphire gradient
 * 4. Pure transparent silkscreened ZÄFIZZY typography floating directly on the glass (no fake plaque boxes)
 * 5. Weighted cylindrical cap with brushed dark slate-navy grain and mirror-chrome bevel trims
 * 6. Classical fluted warm ivory marble plinth
 */
export default function ProceduralPerfumeBottle({ isMobile = false }) {
  // Brand silkscreen typography decal
  const labelTexture = useMemo(() => {
    if (typeof window !== 'undefined') {
      return createBottleBrandTexture();
    }
    return null;
  }, []);

  // Luminous liquid gradient texture (midnight to oceanic sapphire)
  const liquidTexture = useMemo(() => {
    if (typeof window !== 'undefined') {
      return createLiquidGradientTexture();
    }
    return null;
  }, []);

  // Fine brushed metal anisotropic grain for the cap
  const brushedMetalTexture = useMemo(() => {
    if (typeof window !== 'undefined') {
      return createBrushedMetalTexture();
    }
    return null;
  }, []);

  // Mathematically accurate fluted marble pedestal geometry matching signature-bottle.jpg
  const flutedPedestalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const segments = 120;
    const numFlutes = 20;
    const baseRadius = 1.55;
    const fluteDepth = 0.045;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      // Scalloped concave fluting
      const fluteOffset = Math.sin(angle * numFlutes) * fluteDepth;
      const r = baseRadius + fluteOffset;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }

    const extrudeSettings = {
      depth: 0.65,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  return (
    <group position={[0, -0.15, 0]}>
      
      {/* ─────────────────────────────────────────────────────────────
          1. SUSPENDED INNER LIQUID CHAMBER (Royal Midnight Sapphire)
          Opaque PBR mesh so it renders into the WebGL transmission buffer
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0.22, 0]}>
        {/* Main liquid body */}
        <RoundedBox
          args={[1.74, 1.95, 0.88]}
          radius={0.18}
          smoothness={6}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            map={liquidTexture}
            color="#091b38"
            roughness={0.10}
            metalness={0.12}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
            envMapIntensity={2.2}
          />
        </RoundedBox>

        {/* Liquid surface top meniscus */}
        <mesh position={[0, 0.976, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.70, 0.84]} />
          <meshStandardMaterial
            color="#051022"
            roughness={0.05}
            metalness={0.2}
            envMapIntensity={2.5}
          />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          2. OUTER OPTICAL CRYSTAL FLACON
          Solid beveled crystal envelope; bottom 26% is pure clear crystal base
         ───────────────────────────────────────────────────────────── */}
      <RoundedBox
        args={[2.08, 3.16, 1.22]}
        radius={0.07}
        smoothness={6}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.96}
          transparent={true}
          roughness={0.015}
          metalness={0.02}
          ior={1.52}
          thickness={0.6}
          specularIntensity={1.0}
          specularColor="#FFFFFF"
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          envMapIntensity={2.8}
        />
      </RoundedBox>

      {/* ─────────────────────────────────────────────────────────────
          3. BRAND WORDMARK SILKSCREEN (Decal on front glass)
         ───────────────────────────────────────────────────────────── */}
      {labelTexture && (
        <mesh position={[0, 0.02, 0.618]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshBasicMaterial
            map={labelTexture}
            transparent={true}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. ATOMIZER COLLAR & CHROME CRIMPER RING
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, 1.62, 0]}>
        {/* Crystal shoulder neck */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.42, 0.45, 0.12, 40]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transparent={true}
            opacity={0.8}
            roughness={0.02}
            clearcoat={1.0}
            ior={1.52}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Polished mirror-chrome collar ring */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.14, 48]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.98}
            roughness={0.04}
            envMapIntensity={3.2}
          />
        </mesh>

        {/* Fine platinum torus accent */}
        <mesh position={[0, 0.16, 0]}>
          <torusGeometry args={[0.425, 0.01, 16, 48]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.98}
            roughness={0.06}
          />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          6. WEIGHTED BRUSHED METALLIC CAP
          Brushed midnight slate-navy metal with mirror-chrome bevel rim
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, 2.32, 0]}>
        {/* Mirror-chrome bottom bevel ring */}
        <mesh position={[0, -0.46, 0]}>
          <cylinderGeometry args={[0.525, 0.525, 0.05, 48]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.98}
            roughness={0.04}
            envMapIntensity={3.2}
          />
        </mesh>

        {/* Main brushed midnight metal cylinder */}
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.518, 0.518, 0.90, 48]} />
          <meshStandardMaterial
            map={brushedMetalTexture}
            color="#121b2d"
            metalness={0.88}
            roughness={0.22}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Mirror-chrome top bevel rim */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.505, 0.52, 0.06, 48]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.98}
            roughness={0.04}
            envMapIntensity={3.4}
          />
        </mesh>

        {/* Mirror-chrome top recessed disc */}
        <mesh position={[0, 0.495, 0]}>
          <cylinderGeometry args={[0.47, 0.47, 0.02, 48]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.98}
            roughness={0.05}
            envMapIntensity={3.0}
          />
        </mesh>

        {/* Diamond Star Medallion Emblem on Top of Cap (visible on high angles) */}
        <group position={[0, 0.508, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry args={[0.18, 0.04]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.08} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[0.18, 0.04]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.08} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.10, 0.025]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.98} roughness={0.08} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <planeGeometry args={[0.10, 0.025]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.98} roughness={0.08} />
          </mesh>
        </group>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          7. FLUTED WARM IVORY MARBLE PEDESTAL (Exact replica of photo)
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, -1.88, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={flutedPedestalGeometry}>
          <meshStandardMaterial
            color="#F7F4EE"
            roughness={0.28}
            metalness={0.04}
            envMapIntensity={1.4}
          />
        </mesh>
      </group>

    </group>
  );
}
