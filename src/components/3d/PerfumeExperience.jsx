import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, Clock, Compass, ShieldCheck, Droplet, ArrowUpRight } from 'lucide-react';
import ProceduralPerfumeBottle from './ProceduralPerfumeBottle';
import ProductLighting from './ProductLighting';
import StudioEnvironment from './StudioEnvironment';
import AtmosphereParticles from './AtmosphereParticles';
import { BRAND_IDENTITY, FRAGRANCE_DATA } from '../../data/brandData';

gsap.registerPlugin(ScrollTrigger);

/**
 * 3D Scene Core: Runs at 60fps in requestAnimationFrame.
 * Reads scrollProgressRef directly for zero React re-render thrashing.
 */
function BottleScene({ scrollProgressRef, pointerOffset, isDarkTheme, isMobile }) {
  const outerGroupRef = useRef(null);
  const tiltGroupRef = useRef(null);
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const p = scrollProgressRef.current || 0;

    let targetRotY = 0;
    let targetPosY = -0.05;
    let targetCamZ = 8.4;
    let targetCamY = 0.35;
    let targetCamX = 0;

    if (p < 0.2) {
      // Scene 1: Initial Reveal with generous editorial headroom
      const t = p / 0.2;
      targetRotY = THREE.MathUtils.lerp(-0.35, 0.0, t);
      targetCamZ = THREE.MathUtils.lerp(9.2, 8.4, t);
      targetCamY = THREE.MathUtils.lerp(0.5, 0.35, t);
      targetPosY = THREE.MathUtils.lerp(-0.25, -0.05, t);
    } else if (p < 0.45) {
      // Scene 2: Deterministic 360° Flacon Inspection
      const t = (p - 0.2) / 0.25;
      targetRotY = t * Math.PI * 2;
      targetCamZ = 8.4;
      targetCamY = 0.35;
      targetCamX = 0;
    } else if (p < 0.7) {
      // Scene 3: Olfactory Notes Macro Closeup (Bottle offset left, notes on right)
      const t = (p - 0.45) / 0.25;
      targetRotY = Math.PI * 2 + Math.sin(t * Math.PI) * 0.35;
      targetCamZ = THREE.MathUtils.lerp(8.4, 6.2, Math.sin(t * Math.PI));
      targetCamY = THREE.MathUtils.lerp(0.35, 0.15, t);
      targetCamX = THREE.MathUtils.lerp(0, -0.55, Math.sin(t * Math.PI)); // Offsets bottle to left flank
    } else if (p < 0.88) {
      // Scene 4: Nocturnal Terroir Transition (Elevated high-angle shot)
      const t = (p - 0.7) / 0.18;
      targetRotY = Math.PI * 2 + 0.5 + t * 0.4;
      targetCamZ = THREE.MathUtils.lerp(7.8, 8.8, t);
      targetCamY = THREE.MathUtils.lerp(0.2, 1.1, t);
      targetCamX = THREE.MathUtils.lerp(-0.55, -0.4, t);
    } else {
      // Scene 5: Final Hero Composition Settle
      const t = (p - 0.88) / 0.12;
      targetRotY = THREE.MathUtils.lerp(Math.PI * 2 + 0.9, Math.PI * 2 + 0.1, t);
      targetCamZ = THREE.MathUtils.lerp(8.8, 8.2, t);
      targetCamY = THREE.MathUtils.lerp(1.1, 0.3, t);
      targetCamX = THREE.MathUtils.lerp(-0.4, 0, t);
      targetPosY = -0.05;
    }

    // Apply scroll-driven rotation & position to Outer Group (instant, zero double-lag)
    if (outerGroupRef.current) {
      outerGroupRef.current.rotation.y = targetRotY;
      outerGroupRef.current.position.y = targetPosY;
    }

    // Apply additive desktop pointer tilt to Inner Group (never overwrites scroll rotation)
    if (tiltGroupRef.current && !isMobile) {
      const maxTiltX = 0.08;
      const maxTiltZ = 0.10;
      const desiredTiltX = -pointerOffset.y * maxTiltX;
      const desiredTiltZ = -pointerOffset.x * maxTiltZ;

      tiltGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        tiltGroupRef.current.rotation.x,
        desiredTiltX,
        0.1
      );
      tiltGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        tiltGroupRef.current.rotation.z,
        desiredTiltZ,
        0.1
      );
    }

    // Camera Dolly & Position (Smoothly following scrubbed targets)
    state.camera.position.x = targetCamX;
    state.camera.position.y = targetCamY;
    state.camera.position.z = targetCamZ;

    cameraTargetRef.current.set(targetCamX * 0.25, targetPosY + 0.3, 0);
    state.camera.lookAt(cameraTargetRef.current);
  });

  return (
    <>
      {/* Procedural Studio HDR Environment Map for Glass & Metal Reflections */}
      <StudioEnvironment intensity={isDarkTheme ? 1.2 : 1.6} />

      {/* Studio Lighting Rig */}
      <ProductLighting isDarkTheme={isDarkTheme} />

      {/* Airborne Mist Droplets with Soft Glow */}
      <AtmosphereParticles count={isMobile ? 25 : 55} isDarkTheme={isDarkTheme} />

      {/* Outer Group: Master Scroll-Driven Rotation */}
      <group ref={outerGroupRef}>
        {/* Inner Group: Additive Desktop Pointer Tilt */}
        <group ref={tiltGroupRef}>
          <ProceduralPerfumeBottle isMobile={isMobile} />
        </group>

        {/* Soft Studio Contact Shadow */}
        <ContactShadows
          position={[0, -2.22, 0]}
          opacity={isDarkTheme ? 0.6 : 0.45}
          scale={5.8}
          blur={2.2}
          far={3.2}
        />
      </group>
    </>
  );
}

/**
 * Master Scroll-Driven 3D Storytelling Experience
 * High-performance architecture: DOM updates only on scene threshold transitions.
 */
export default function PerfumeExperience({ onOpenAudit, onOpenConcierge }) {
  const containerRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const progressTextRef = useRef(null);

  const [activeScene, setActiveScene] = useState(1);
  const [activeNoteStage, setActiveNoteStage] = useState('top');
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Check mobile & WebGL support
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch (e) {
      setWebglSupported(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger Master Timeline (Optimized for minimal React re-renders)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        scrollProgressRef.current = 0.5;
        setActiveScene(3);
        return;
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        fastScrollEnd: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;

          // Direct DOM percentage update (0 React re-renders)
          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${Math.round(self.progress * 100)}%`;
          }

          // Discrete Scene Transitions
          const p = self.progress;
          let scene = 1;
          if (p >= 0.20 && p < 0.45) scene = 2;
          else if (p >= 0.45 && p < 0.70) scene = 3;
          else if (p >= 0.70 && p < 0.88) scene = 4;
          else if (p >= 0.88) scene = 5;

          setActiveScene((prev) => (prev !== scene ? scene : prev));

          // Discrete Note Stage
          if (p >= 0.45 && p < 0.54) {
            setActiveNoteStage((prev) => (prev !== 'top' ? 'top' : prev));
          } else if (p >= 0.54 && p < 0.63) {
            setActiveNoteStage((prev) => (prev !== 'heart' ? 'heart' : prev));
          } else if (p >= 0.63 && p < 0.72) {
            setActiveNoteStage((prev) => (prev !== 'base' ? 'base' : prev));
          }
        },
      });

      // Refresh on initial mount to guarantee accurate metrics
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Desktop Pointer Move handler
  const handlePointerMove = useCallback((e) => {
    if (isMobile) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    setPointerOffset({ x, y });
  }, [isMobile]);

  const handlePointerLeave = useCallback(() => {
    setPointerOffset({ x: 0, y: 0 });
  }, []);

  const isDarkTheme = activeScene === 4;

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative w-full h-[520vh] transition-colors duration-1000 ease-in-out"
      style={{
        backgroundColor: isDarkTheme ? '#070E1B' : '#FFFFFF',
        color: isDarkTheme ? '#FFFFFF' : '#101E38',
      }}
    >
      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Subtle Brand Pattern Sheet Overlay (BG.png) */}
        <div
          className={`absolute inset-0 bg-brand-pattern pointer-events-none transition-opacity duration-1000 bg-cover bg-center ${
            isDarkTheme ? 'opacity-[0.06] mix-blend-screen' : 'opacity-[0.05] mix-blend-multiply'
          }`}
          aria-hidden="true"
        />

        {/* Ambient Shifting Light Halo */}
        <div
          className={`absolute w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
            isDarkTheme
              ? 'bg-navy-800/40 opacity-70'
              : 'bg-radial-lighting opacity-80'
          }`}
        />

        {/* 3D REAL-TIME CANVAS */}
        {webglSupported ? (
          <div className="absolute inset-0 z-10 w-full h-full">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0.4, 8.4], fov: 36 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.18,
              }}
            >
              <BottleScene
                scrollProgressRef={scrollProgressRef}
                pointerOffset={pointerOffset}
                isDarkTheme={isDarkTheme}
                isMobile={isMobile}
              />
            </Canvas>
          </div>
        ) : (
          /* WebGL Fallback if device lacks hardware 3D */
          <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
            <div className="max-w-md bg-white p-6 rounded shadow-xl border border-navy-900/10 text-center">
              <img
                src={BRAND_IDENTITY.assets.signatureBottle}
                alt="ZÄFIZZY Flacon"
                className="w-48 mx-auto rounded mb-4"
              />
              <p className="text-xs text-navy-muted">
                3D WebGL acceleration not detected. High-resolution visual fallback engaged.
              </p>
            </div>
          </div>
        )}

        {/* SYNCHRONIZED EDITORIAL OVERLAYS (Z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12">
          
          {/* Top Brand Indicator Bar */}
          <div className="flex items-center justify-between text-xs tracking-widest-2xl uppercase font-mono opacity-80 pt-16 sm:pt-14 md:pt-12">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full transition-colors"
                style={{ backgroundColor: isDarkTheme ? '#D8DFE9' : '#101E38' }}
              />
              <span>3D CHOREOGRAPHY // </span>
              <span ref={progressTextRef} className="font-semibold">0%</span>
            </div>
            <div className="hidden sm:block">
              {activeScene === 1 && "STAGE I: THE REVEAL"}
              {activeScene === 2 && "STAGE II: 360° INSPECTION"}
              {activeScene === 3 && "STAGE III: OLFACTORY NOTES"}
              {activeScene === 4 && "STAGE IV: NOCTURNAL TERROIR"}
              {activeScene === 5 && "STAGE V: THE MASTERWORK"}
            </div>
          </div>

          {/* DYNAMIC SCENE CONTENT */}

          {/* SCENE 1: THE REVEAL (0 - 20%) */}
          <div
            className={`transition-all duration-700 max-w-xl self-start ${
              activeScene === 1 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-navy-900/40" />
              <span className="text-[11px] tracking-widest-2xl uppercase text-navy-muted font-medium">
                {BRAND_IDENTITY.subheading}
              </span>
              <span className="text-[10px] text-navy-900/40">/</span>
              <span className="text-[11px] font-serif italic text-navy-900/70">
                {BRAND_IDENTITY.arabicScript}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-navy-900 leading-[1.08] mb-6">
              THE ESSENCE OF <br />
              <span className="italic font-normal">ACQUIRED WORLDS.</span>
            </h1>

            <p className="text-navy-muted text-sm sm:text-base font-light leading-relaxed max-w-md mb-8">
              A bespoke architectural fragrance that bridges luminous botanical awakening and deep midnight sillage.
            </p>

            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-navy-900 font-medium">
              <span className="animate-pulse">↓</span>
              <span>Scroll to Begin 3D Flacon Exploration</span>
            </div>
          </div>

          {/* SCENE 2: THE 360° INSPECTION (20% - 45%) */}
          <div
            className={`transition-all duration-700 max-w-md self-end text-right ${
              activeScene === 2 ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-navy-muted block mb-2">
              02 // THREE-DIMENSIONAL TURNTABLE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-900 font-light mb-4">
              Crystalline Facets & Midnight Depth
            </h2>
            <p className="text-navy-muted text-xs sm:text-sm font-light leading-relaxed mb-6">
              Rotated in real-time space as you scroll. The hand-beveled crystalline glass captures natural refraction, encasing the midnight navy liquid essence and brushed platinum collar.
            </p>
            <div className="p-4 bg-white/95 backdrop-blur-sm border border-navy-900/10 rounded inline-block text-left text-[11px] text-navy-900 font-mono space-y-1.5 shadow-md">
              <div>FLACON: Hand-Cut Crown Glass (IOR 1.52)</div>
              <div>BASE: Solid Crystal "Glace d'Eau" Foundation</div>
              <div>CAP: Brushed Midnight Metal & Chrome Bevel</div>
              <div>CONCENTRATION: 28% Extrait de Parfum</div>
            </div>
          </div>

          {/* SCENE 3: OLFACTORY NOTES CHOREOGRAPHY (45% - 70%) - ASYMMETRICAL EDITORIAL DOCK */}
          <div
            className={`transition-all duration-700 max-w-md lg:max-w-lg self-end ${
              activeScene === 3 ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-sm border border-navy-900/10 shadow-luxury">
              {/* Note Stage Tabs */}
              <div className="flex items-center justify-between pb-4 border-b border-navy-900/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <Droplet className="w-4 h-4 text-navy-900" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-navy-900">
                    {FRAGRANCE_DATA.notesPyramid[activeNoteStage].title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-navy-muted uppercase">
                  {FRAGRANCE_DATA.notesPyramid[activeNoteStage].phase}
                </span>
              </div>

              {/* Stage Switcher Controls */}
              <div className="flex gap-2 mb-4">
                {['top', 'heart', 'base'].map((stg) => (
                  <button
                    key={stg}
                    onClick={() => setActiveNoteStage(stg)}
                    className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider font-mono transition-colors ${
                      activeNoteStage === stg
                        ? 'bg-navy-900 text-white font-medium'
                        : 'bg-navy-900/5 text-navy-muted hover:text-navy-900'
                    }`}
                  >
                    {stg.toUpperCase()}
                  </button>
                ))}
              </div>

              <p className="text-xs text-navy-muted font-light mb-4 leading-relaxed">
                {FRAGRANCE_DATA.notesPyramid[activeNoteStage].description}
              </p>

              {/* Accords Grid */}
              <div className="space-y-2.5">
                {FRAGRANCE_DATA.notesPyramid[activeNoteStage].accords.map((accord) => (
                  <div key={accord.name} className="p-2.5 bg-ivory-warm/40 rounded border border-navy-900/5 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-navy-900 font-serif block">{accord.name}</strong>
                      <span className="text-[10px] text-navy-muted/80 italic">"{accord.note}"</span>
                    </div>
                    <span className="text-[10px] text-navy-muted font-mono">{accord.origin}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SCENE 4: ATMOSPHERIC TERROIR TRANSITION (70% - 88%) */}
          <div
            className={`transition-all duration-700 max-w-xl self-start ${
              activeScene === 4 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-mist-blue block mb-2">
              04 // NOCTURNAL TERROIR
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light mb-4">
              Where Midnight Coastlines Meet Pure Essence
            </h2>
            <p className="text-mist-blue/80 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Harvested during dawn's earliest moisture window before solar evaporation dissipates delicate molecular esters. Extracted via cold supercritical CO₂ to preserve botanical truth.
            </p>
            <div className="flex items-center gap-6 text-[11px] font-mono text-mist-blue/70">
              <div>GRASSE, FRANCE</div>
              <div className="w-1 h-1 rounded-full bg-mist-blue" />
              <div>MEDITERRANEAN BASIN</div>
              <div className="w-1 h-1 rounded-full bg-mist-blue" />
              <div>100% PURE EXTRACTION</div>
            </div>
          </div>

          {/* SCENE 5: THE FINAL HERO MASTERWORK (88% - 100%) */}
          <div
            className={`transition-all duration-700 max-w-xl self-center text-center ${
              activeScene === 5 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <img
              src={BRAND_IDENTITY.assets.logo}
              alt="ZÄFIZZY"
              className="h-10 sm:h-12 mx-auto mb-4 object-contain"
            />
            <p className="font-serif text-2xl sm:text-3xl text-navy-900 font-light leading-snug mb-6">
              "To wear ZÄFIZZY is to inhabit a realm where memory, architecture, and noble essence converge."
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenConcierge}
                className="btn-luxury-shimmer inline-flex items-center gap-3 bg-navy-900 text-white text-xs uppercase tracking-widest-xl px-8 py-3.5 rounded-sm hover:bg-navy-800 transition-all shadow-luxury"
              >
                <span>Inquire Private Atelier</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAudit}
                className="inline-flex items-center gap-2 border border-navy-900/20 text-navy-900 text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm hover:bg-navy-900/5 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-navy-800" />
                <span>Examine 3D Dossier</span>
              </button>
            </div>
          </div>

          {/* Bottom Navigation Hint */}
          <div className="flex items-center justify-between text-[11px] font-mono opacity-60">
            <span className="hidden md:inline">DESKTOP: POINTER PARALLAX ACTIVE</span>
            <span>CONTINUE SCROLLING FOR BRAND ATELIER & SPECIFICATIONS ↓</span>
          </div>

        </div>

      </div>
    </div>
  );
}
