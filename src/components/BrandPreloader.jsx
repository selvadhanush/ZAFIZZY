import React, { useState, useEffect } from 'react';
import { BRAND_IDENTITY } from '../data/brandData';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const VISIBLE_MS = 850;
const FADE_MS = 250;

function LoadingBar({ className }) {
  return (
    <div className={`h-[3px] overflow-hidden rounded-full bg-black/25 ${className}`} aria-hidden="true">
      <div
        className="h-full w-full origin-left bg-black"
        style={{ animation: `preloader-fill ${VISIBLE_MS}ms linear forwards` }}
      />
    </div>
  );
}

export default function BrandPreloader() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIsFadingOut(true), VISIBLE_MS);
    const doneTimer = window.setTimeout(() => {
      setIsDone(true);
      ScrollTrigger.refresh();
    }, VISIBLE_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f7f6f3] transition-opacity duration-[250ms] select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading ZÄFIZZY Experience"
      role="status"
    >
      <div className="absolute inset-0 bg-brand-pattern bg-cover bg-center lg:hidden" aria-hidden="true" />
      <div
        className="absolute inset-0 hidden bg-[url('/assets/loading-desktop.jpg')] bg-center bg-no-repeat lg:block"
        style={{ backgroundSize: '100% auto' }}
        aria-hidden="true"
      />

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-navy-950 lg:flex">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">loading...</span>
        <LoadingBar className="w-64 lg:w-80" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto lg:hidden">
        <div className="mb-6 sm:mb-8 flex flex-col items-center justify-center">
          <img
            src={BRAND_IDENTITY.assets.logo}
            alt="ZÄFIZZY Logo"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          />
          <img
            src={BRAND_IDENTITY.assets.bismillah}
            alt="Bismillah ir-Rahman ir-Rahim"
            className="h-4 sm:h-5 md:h-6 w-auto object-contain mt-2.5 sm:mt-3 brightness-0 opacity-95"
          />
        </div>

        <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-black font-sans font-medium mb-2">
          Fragrances
        </div>

        <div className="text-[10px] sm:text-xs tracking-[0.22em] text-black/80 font-mono mb-10 sm:mb-12">
          Crafting scented stories
        </div>

        <div className="text-[10px] sm:text-xs tracking-[0.3em] font-mono text-black uppercase mb-3">
          loading...
        </div>

        <LoadingBar className="w-64 sm:w-80" />
      </div>
    </div>
  );
}
