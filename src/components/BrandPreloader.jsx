import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const VISIBLE_MS = 1750;
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
      <div
        className="absolute inset-0 bg-[url('/assets/loading-mobile.jpg')] bg-center bg-no-repeat lg:bg-[url('/assets/loading-desktop.jpg')]"
        style={{ backgroundSize: '100% auto' }}
        aria-hidden="true"
      />

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-navy-950">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">loading...</span>
        <LoadingBar className="w-64 sm:w-80" />
      </div>
    </div>
  );
}
