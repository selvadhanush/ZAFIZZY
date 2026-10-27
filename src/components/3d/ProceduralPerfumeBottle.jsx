import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import {
  createLiquidGradientTexture,
  createBrushedMetalTexture,
} from './bottleTexture';
import { BRAND_IDENTITY } from '../../data/brandData';

/**
 * Authentic Haute Parfumerie Flacon — ZÄFIZZY
 * 
 * Key architectural elements:
 * 1. Precision-beveled transparent optical crystal glass envelope (IOR 1.52, transmission 0.97)
 * 2. Solid thick crystal foundation ("Glace d'Eau") occupying bottom ~28% of the bottle
 * 3. Fully filled inner chamber with translucent rich brown alcohol perfume liquid (aged bourbon / cognac)
 * 4. Level liquid surface meniscus with delicate surface tension boundary
 * 5. Official ZÄFIZZY brand logo decal physically silkscreened on the front crystal face
 * 6. Signature midnight navy blue weighted cylindrical cap with brushed metal texture and platinum trims
 * 7. Classical fluted warm ivory marble plinth
 */
export default function ProceduralPerfumeBottle({ isMobile = false }) {
  // Official ZÄFIZZY brand logo texture from assets
  const logoTexture = useMemo(() => {
    if (typeof window !== 'undefined') {
      const loader = new THREE.TextureLoader();
      const tex = loader.load(encodeURI(BRAND_IDENTITY.assets.logo));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    }
    return null;
  }, []);

  // Luminous pale straw-gold / light champagne perfume alcohol gradient texture
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

  // Mathematically accurate fluted marble pedestal geometry
  const flutedPedestalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const segments = 120;
    const numFlutes = 20;
    const baseRadius = 1.55;
    const fluteDepth = 0.045;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
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

  const groupScale = isMobile ? 0.82 : 1.0;
  const groupPosY = isMobile ? -0.22 : -0.15;

  return (
    <group position={[0, groupPosY, 0]} scale={groupScale}>
      
      {/* ─────────────────────────────────────────────────────────────
          1. PERFUME LIQUID CHAMBER (AUTHENTIC RICH BROWN ALCOHOL)
          Completely fills flacon (Full Capacity) with aged bourbon/cognac brown perfume
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, 0]}>
        {/* Main Luminous Rich Brown Alcohol Liquid Volume (Full Bottle Fill) */}
        <RoundedBox
          args={[1.74, 2.38, 0.88]}
          radius={0.16}
          smoothness={6}
          position={[0, 0.285, 0]}
        >
          <meshPhysicalMaterial
            map={liquidTexture}
            color="#56220A"
            roughness={0.06}
            metalness={0.02}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            envMapIntensity={2.2}
          />
        </RoundedBox>

        {/* Level Liquid Surface Meniscus at Full Fill Line */}
        <mesh position={[0, 1.475, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.70, 0.84]} />
          <meshPhysicalMaterial
            color="#260C03"
            roughness={0.04}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Meniscus surface boundary tension rim */}
        <mesh position={[0, 1.477, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.74, 0.84, 48]} />
          <meshStandardMaterial
            color="#7E320E"
            roughness={0.05}
            metalness={0.20}
          />
        </mesh>

        {/* Fine clear atomizer dip tube descending through the dark liquid */}
        <mesh position={[0.02, 0.32, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 2.45, 24]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.88}
            transparent={true}
            roughness={0.04}
            ior={1.48}
            thickness={0.03}
            envMapIntensity={2.0}
          />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          2. OUTER OPTICAL CRYSTAL FLACON
          Precision-beveled transparent crystal envelope enclosing the brown perfume
         ───────────────────────────────────────────────────────────── */}
      <RoundedBox
        args={[2.08, 3.16, 1.22]}
        radius={0.08}
        smoothness={8}
        position={[0, 0, 0]}
        renderOrder={1}
      >
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.97}
          transparent={true}
          roughness={0.02}
          metalness={0.01}
          ior={1.52}
          thickness={0.65}
          attenuationColor="#FFFFFF"
          attenuationDistance={12.0}
          specularIntensity={1.0}
          specularColor="#FFFFFF"
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          envMapIntensity={1.8}
        />
      </RoundedBox>

      {/* ─────────────────────────────────────────────────────────────
          3. OFFICIAL ZÄFIZZY BRAND LOGO (Applied Front Glass Emblem)
          Exact brand asset rendered directly onto front glass face
         ───────────────────────────────────────────────────────────── */}
      {logoTexture && (
        <mesh position={[0, 0.08, 0.614]} renderOrder={2}>
          <planeGeometry args={[1.32, 0.704]} />
          <meshStandardMaterial
            map={logoTexture}
            transparent={true}
            opacity={0.96}
            roughness={0.15}
            metalness={0.12}
            depthWrite={false}
            polygonOffset={true}
            polygonOffsetFactor={-1.5}
            polygonOffsetUnits={-1.5}
            side={THREE.FrontSide}
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
          6. WEIGHTED METALLIC CAP IN SIGNATURE MIDNIGHT NAVY BLUE
          Haute parfumerie lacquered midnight navy cap (#101E38)
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, 2.32, 0]}>
        {/* Polished deep navy bevel ring base */}
        <mesh position={[0, -0.46, 0]}>
          <cylinderGeometry args={[0.525, 0.525, 0.05, 48]} />
          <meshStandardMaterial
            color="#182A4D"
            metalness={0.70}
            roughness={0.12}
            envMapIntensity={2.4}
          />
        </mesh>

        {/* Main signature midnight navy blue cylinder */}
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.518, 0.518, 0.90, 48]} />
          <meshPhysicalMaterial
            map={brushedMetalTexture}
            color="#101E38"
            metalness={0.58}
            roughness={0.18}
            clearcoat={0.85}
            clearcoatRoughness={0.12}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Polished deep navy top bevel rim */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.505, 0.52, 0.06, 48]} />
          <meshStandardMaterial
            color="#182A4D"
            metalness={0.70}
            roughness={0.12}
            envMapIntensity={2.4}
          />
        </mesh>

        {/* Midnight navy recessed disc */}
        <mesh position={[0, 0.495, 0]}>
          <cylinderGeometry args={[0.47, 0.47, 0.02, 48]} />
          <meshPhysicalMaterial
            color="#101E38"
            metalness={0.62}
            roughness={0.16}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            envMapIntensity={2.2}
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
