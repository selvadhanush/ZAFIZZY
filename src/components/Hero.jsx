import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Sparkles, Compass } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

export default function Hero({ onDiscoverClick }) {
  const heroRef = useRef(null);
  const bottleContainerRef = useRef(null);
  const bottleImgRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const brandBadgeRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const ambientGlowRef = useRef(null);

  // Tilt state for pointer interaction
  const [tilt, setTilt] = useState({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    // GSAP Context for clean React unmount and zero animation leaks
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // Instant presentation for accessibility
        gsap.set([brandBadgeRef.current, titleLine1Ref.current, titleLine2Ref.current, bottleImgRef.current, descRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state
      gsap.set(brandBadgeRef.current, { opacity: 0, y: 20 });
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { opacity: 0, y: 35 });
      gsap.set(bottleImgRef.current, { opacity: 0, scale: 0.94, y: 40 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(ambientGlowRef.current, { opacity: 0 });

      // Coordinated entrance sequence (concise and fluid)
      tl.to(ambientGlowRef.current, { opacity: 0.7, duration: 1.4 })
        .to(brandBadgeRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=1.0")
        .to(titleLine1Ref.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
        .to(titleLine2Ref.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
        .to(bottleImgRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'power2.out' }, "-=0.7")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Desktop Pointer Parallax Tilt
  const handleMouseMove = (e) => {
    if (!heroRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Clamped subtle rotation
    const rx = (-y / (rect.height / 2)) * 6; // max 6 deg
    const ry = (x / (rect.width / 2)) * 8;  // max 8 deg
    setTilt({ x: x * 0.02, y: y * 0.02, rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, rx: 0, ry: 0 });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center bg-white overflow-hidden"
    >
      {/* 1. Subtle Background Light Field & Brand Pattern */}
      <div
        ref={ambientGlowRef}
        className="absolute top-1/2 left-1/2 w-[700px] lg:w-[1000px] h-[700px] lg:h-[1000px] -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full bg-radial-lighting blur-3xl animate-ambient-light"
      />

      {/* 2. Delicate Brand Signature Pattern (BG.png) masked into atmosphere */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.07] mix-blend-multiply pointer-events-none pattern-mask-subtle bg-cover bg-center"
        aria-hidden="true"
      />

      {/* 3. Subtle Luxury Fine Grid Linework */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-900/10 to-transparent" />
      <div className="absolute inset-y-0 left-12 lg:left-24 w-px bg-navy-900/[0.04] hidden md:block" />
      <div className="absolute inset-y-0 right-12 lg:right-24 w-px bg-navy-900/[0.04] hidden md:block" />

      {/* Main Content Layout */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Brand Statement & Typography */}
        <div className="lg:col-span-6 z-10 flex flex-col justify-center text-left">
          
          {/* Brand Identity Stamp */}
          <div ref={brandBadgeRef} className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-navy-900/40" />
            <span className="text-[11px] md:text-xs tracking-widest-2xl uppercase text-navy-muted font-medium">
              {BRAND_IDENTITY.subheading}
            </span>
            <span className="text-[10px] text-navy-900/40 font-mono">/</span>
            <span className="text-[11px] tracking-widest text-navy-900/60 font-serif italic">
              {BRAND_IDENTITY.arabicScript}
            </span>
          </div>

          {/* Editorial Display Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light text-navy-900 leading-[1.08] tracking-tight mb-6">
            <span ref={titleLine1Ref} className="block overflow-hidden">
              THE ESSENCE OF
            </span>
            <span ref={titleLine2Ref} className="block font-normal italic tracking-normal overflow-hidden text-navy-950">
              ACQUIRED WORLDS.
            </span>
          </h1>

          {/* Editorial Supporting Description */}
          <p
            ref={descRef}
            className="text-navy-muted text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-10"
          >
            Formulated in Grasse and inspired by the stillness of deep Mediterranean waters.
            A bespoke architectural fragrance that bridges luminous botanical awakening and nocturnal sillage.
          </p>

          {/* CTA Group */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
            <button
              onClick={onDiscoverClick}
              className="btn-luxury-shimmer group inline-flex items-center gap-4 bg-navy-900 text-white text-xs uppercase tracking-widest-xl px-8 py-4 rounded-sm hover:bg-navy-800 transition-all shadow-luxury hover:shadow-luxury-hover"
            >
              <span>Discover the Flacon</span>
              <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <a
              href="#notes"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-navy-900/80 hover:text-navy-900 transition-colors py-4 px-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-navy-700" />
              <span>Explore Olfactory Notes</span>
            </a>
          </div>

          {/* Subtle Edition Metadata */}
          <div className="mt-12 pt-8 border-t border-navy-900/10 flex items-center gap-8 text-[11px] tracking-widest uppercase text-navy-muted/70">
            <div>
              <span className="block text-navy-900 font-medium">WHITE & NAVY</span>
              <span>Inaugural Showcase</span>
            </div>
            <div className="w-px h-6 bg-navy-900/10" />
            <div>
              <span className="block text-navy-900 font-medium">EXTRAIT DE PARFUM</span>
              <span>28% Pure Essences</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Flacon Centerpiece */}
        <div
          ref={bottleContainerRef}
          className="lg:col-span-6 relative flex items-center justify-center lg:justify-end"
        >
          {/* Subtle halo backdrop */}
          <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full bg-ivory-warm/80 blur-2xl -z-10" />

          {/* Responsive tilt container with smooth interpolation */}
          <div
            className="relative transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
            }}
          >
            <div className="relative group p-2 sm:p-4">
              {/* Product Visual Container */}
              <div
                ref={bottleImgRef}
                className="relative overflow-hidden rounded-md shadow-luxury border border-navy-900/10 bg-ivory-light max-w-sm sm:max-w-md"
              >
                <img
                  src={BRAND_IDENTITY.assets.signatureBottle}
                  alt="ZÄFIZZY Flacon — Bespoke architectural perfume bottle"
                  className="w-full h-auto object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>

              {/* Verified Product Spec Floating Tag */}
              <div className="absolute -bottom-4 -left-4 sm:left-2 bg-white/95 backdrop-blur-md border border-navy-900/10 p-3 sm:p-4 rounded shadow-lg max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-navy-900 animate-pulse" />
                  <span className="text-[10px] tracking-widest-xl uppercase font-semibold text-navy-900">
                    FLACON SPECIMEN
                  </span>
                </div>
                <p className="text-[11px] text-navy-muted leading-tight">
                  Hand-cut crystalline flacon with nocturnal midnight infusion.
                </p>
              </div>

              {/* Decorative Corner Marker */}
              <div className="absolute -top-3 -right-3 text-navy-900/20 text-xs font-mono">
                +01 // SIGNATURE
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[10px] uppercase tracking-widest-2xl text-navy-muted font-medium">
          Scroll to Explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-navy-900 to-transparent" />
      </div>
    </section>
  );
}
