import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { createBottleBrandTexture } from './bottleTexture';

/**
 * High-End Luxury Perfume Bottle (Haute Parfumerie Flacon)
 * Modeled with authentic luxury proportions:
 * - Solid heavy crystal base with matching beveled corners
 * - Curved internal liquid reservoir filled with luminous royal sapphire / midnight navy essence
 * - Precision-turned platinum atomizer collar & nozzle
 * - Weighted cylindrical cap with brushed midnight metal, mirror-chrome bevel trim,
 *   and top-engraved diamond-star medallion (visible during high-angle camera shots)
 * - Gleaming silver/platinum brand plaque on front, subtle etched rear alignment
 */
export default function ProceduralPerfumeBottle({ isMobile = false }) {
  const labelTexture = useMemo(() => {
    if (typeof window !== 'undefined') {
      return createBottleBrandTexture();
    }
    return null;
  }, []);

  return (
    <group position={[0, -0.2, 0]}>
      
      {/* ─────────────────────────────────────────────────────────────
          1. OUTER HEAVY CRYSTAL FLACON
          Solid beveled crystal glass body with high refraction & clearcoat
         ───────────────────────────────────────────────────────────── */}
      <RoundedBox
        args={[2.1, 3.1, 1.25]}
        radius={0.16}
        smoothness={6}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.97}
          opacity={1}
          transparent={true}
          roughness={0.02}
          metalness={0.02}
          ior={1.52}
          thickness={1.8}
          attenuationColor="#E0ECFF"
          attenuationDistance={2.4}
          specularIntensity={1.0}
          specularColor="#FFFFFF"
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          envMapIntensity={2.0}
        />
      </RoundedBox>

      {/* Solid Heavy Crystal Bottom Base (Smoothly Beveled Glace d'Eau) */}
      <RoundedBox
        args={[1.88, 0.72, 1.05]}
        radius={0.12}
        smoothness={6}
        position={[0, -1.04, 0]}
      >
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.96}
          transparent={true}
          roughness={0.03}
          ior={1.52}
          thickness={1.5}
          attenuationColor="#E6F0FA"
          attenuationDistance={1.6}
          envMapIntensity={2.2}
        />
      </RoundedBox>

      {/* ─────────────────────────────────────────────────────────────
          2. INNER LIQUID CAVITY (Midnight Navy / Royal Sapphire Essence)
          Suspended above the heavy solid glass base with curved bottom
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, -0.05, 0]}>
        {/* Main Liquid Body */}
        <RoundedBox
          args={[1.72, 1.95, 0.88]}
          radius={0.12}
          smoothness={6}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#142C5E"
            transmission={0.68}
            opacity={0.96}
            transparent={true}
            roughness={0.06}
            metalness={0.08}
            ior={1.36}
            thickness={1.2}
            attenuationColor="#09142A"
            attenuationDistance={0.7}
            specularIntensity={1.0}
            clearcoat={0.8}
            clearcoatRoughness={0.04}
            envMapIntensity={1.8}
          />
        </RoundedBox>

        {/* Liquid Surface Meniscus Highlight */}
        <mesh position={[0, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.68, 0.84]} />
          <meshPhysicalMaterial
            color="#2A5298"
            roughness={0.02}
            metalness={0.1}
            transmission={0.85}
            transparent={true}
            ior={1.34}
            envMapIntensity={2.2}
          />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          3. DIP TUBE
          Polypropylene translucent tube feeding into the liquid
         ───────────────────────────────────────────────────────────── */}
      <mesh position={[0.02, -0.1, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 2.3, 16]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.92}
          transparent={true}
          opacity={0.5}
          roughness={0.08}
          ior={1.49}
        />
      </mesh>

      {/* ─────────────────────────────────────────────────────────────
          4. METALLIC BRAND PLAQUE (Front Face Embossed Silver/Platinum)
         ───────────────────────────────────────────────────────────── */}
      {labelTexture && (
        <mesh position={[0, 0.05, 0.638]}>
          <planeGeometry args={[1.52, 1.1]} />
          <meshStandardMaterial
            map={labelTexture}
            transparent={true}
            roughness={0.18}
            metalness={0.75}
            envMapIntensity={2.5}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Rear Mirror Plaque Trim (Provides elegant reflections during 360° turn) */}
      <mesh position={[0, 0.05, -0.635]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.52, 1.1]} />
        <meshStandardMaterial
          color="#101E38"
          roughness={0.2}
          metalness={0.85}
          transparent={true}
          opacity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* ─────────────────────────────────────────────────────────────
          5. POLISHED PLATINUM ATOMIZER COLLAR & NECK
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, 1.62, 0]}>
        {/* Crystal Neck Base */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.42, 0.46, 0.14, 36]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.95}
            transparent={true}
            roughness={0.04}
            ior={1.52}
          />
        </mesh>

        {/* Platinum Crimp Ring Collar */}
        <mesh position={[0, 0.10, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.40, 0.18, 40]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.98}
            roughness={0.10}
            envMapIntensity={2.8}
          />
        </mesh>

        {/* Fine Grooved Torus Ring Detail */}
        <mesh position={[0, 0.21, 0]}>
          <torusGeometry args={[0.385, 0.012, 16, 40]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Atomizer Pump Nozzle */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.20, 36]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.96}
            roughness={0.14}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Spray Orifice Micro-Hole */}
        <mesh position={[0, 0.28, 0.341]}>
          <circleGeometry args={[0.018, 16]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          6. WEIGHTED ARCHITECTURAL LUXURY CAP
          Brushed deep midnight navy metal with mirror-chrome bevel trim
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, 2.36, 0]}>
        {/* Mirror-Chrome Base Ring */}
        <mesh position={[0, -0.42, 0]} castShadow>
          <cylinderGeometry args={[0.49, 0.49, 0.08, 48]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.98}
            roughness={0.06}
            envMapIntensity={3.0}
          />
        </mesh>

        {/* Main Midnight Navy Cylindrical Cap Body */}
        <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.48, 0.84, 48]} />
          <meshStandardMaterial
            color="#101E38"
            metalness={0.88}
            roughness={0.20}
            envMapIntensity={1.8}
          />
        </mesh>

        {/* Mirror-Chrome Top Bevel Ring */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.46, 0.48, 0.05, 48]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.98}
            roughness={0.08}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Recessed Top Medallion Disc */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.43, 0.43, 0.02, 48]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Inset Cap Medallion Groove Ring */}
        <mesh position={[0, 0.491, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.34, 0.36, 48]} />
          <meshBasicMaterial color="#94A3B8" />
        </mesh>

        {/* 4-Point Diamond Star Medallion Emblem on Top of Cap */}
        <group position={[0, 0.492, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Diamond Star Shape */}
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry args={[0.16, 0.04]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[0.16, 0.04]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.09, 0.025]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <planeGeometry args={[0.09, 0.025]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          7. FLUTED WARM IVORY MARBLE PEDESTAL
          Provides studio base anchorage and soft ambient bounce
         ───────────────────────────────────────────────────────────── */}
      <group position={[0, -1.82, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.5, 1.55, 0.32, 64]} />
          <meshStandardMaterial
            color="#F4F2ED"
            roughness={0.25}
            metalness={0.08}
            envMapIntensity={0.8}
          />
        </mesh>

        {/* Top Platinum Inset Rim on Pedestal */}
        <mesh position={[0, 0.165, 0]}>
          <cylinderGeometry args={[1.48, 1.48, 0.02, 64]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>
      </group>

    </group>
  );
}
