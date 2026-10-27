import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { BRAND_IDENTITY } from '../data/brandData';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Luxury Brand Preloader
 * Inspired by the reference design from yusufbhaifragrances.in:
 * - Deep luxury midnight-navy atmospheric backdrop
 * - Grand spaced editorial typography (ZÄFIZZY / PERFUMERS & PERFUMERY)
 * - Refined tagline & LOADING... status indicator
 * - Delicate golden progress line that smoothly advances from 0% to 100%
 * - Graceful exit transition revealing the 3D flacon experience
 */
export default function BrandPreloader({ onLoaded }) {
  const { progress: threeProgress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Progressively advance display counter, synchronized with 3D loader
      const target = Math.max(current + 2, threeProgress || 0);
      current = Math.min(100, Math.floor(current + (target - current) * 0.16 + 1.2));
      setDisplayProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Hold at 100% briefly for visual elegance, then trigger smooth fade-out
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsDone(true);
            if (onLoaded) onLoaded();
            ScrollTrigger.refresh();
          }, 700);
        }, 280);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [threeProgress, onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070E1B] text-white transition-all duration-800 select-none ${
        isFadingOut ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 48%, #102344 0%, #0A162B 45%, #050B15 85%, #03070E 100%)',
      }}
      aria-label="Loading ZÄFIZZY Experience"
      role="status"
    >
      {/* Subtle Brand Pattern Sheet Overlay */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.04] pointer-events-none bg-cover bg-center mix-blend-screen"
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Light Field */}
      <div className="absolute w-[700px] h-[700px] rounded-full blur-3xl bg-navy-800/35 pointer-events-none" />

      {/* Center Preloader Brand Composition (Matching Reference Layout) */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        
        {/* Brand Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={BRAND_IDENTITY.assets.logo}
            alt="ZAFIZZY Logo"
            className="h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Primary Luxury Wordmark: ZAFIZZY (Single Unified Word) */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide text-[#F4F1EA] mb-2 uppercase drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          ZAFIZZY
        </h1>

        {/* Subtitle: Fragrances */}
        <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-mist-blue/90 font-sans font-medium mb-2">
          Fragrances
        </div>

        {/* Tagline: Crafting scented stories */}
        <div className="text-[10px] sm:text-xs tracking-[0.22em] text-mist-blue/60 font-mono mb-10 sm:mb-12">
          Crafting scented stories
        </div>

        {/* Status: loading (No percentage numbers) */}
        <div className="text-[10px] sm:text-xs tracking-[0.3em] font-mono text-mist-blue/75 uppercase mb-3">
          loading...
        </div>

        {/* Elegant Golden Progress Bar */}
        <div className="relative w-64 sm:w-80 md:w-96 h-[1.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-amber-200 to-champagne transition-all duration-150 ease-out shadow-[0_0_10px_rgba(245,158,11,0.9)]"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

      </div>
    </div>
  );
}
