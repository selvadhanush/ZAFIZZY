import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Droplet, MoveHorizontal } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandData';

/**
 * Interactive Poem Collection Duality Comparison Slider
 * Inspired by Yusuf Bhai Fragrances (yusufbhaifragrances.in)
 * 
 * Features:
 * - Fluid draggable split slider revealing "Poem for Him" (Black Silk) and "Poem for Her" (Brown Leather)
 * - Touch & mouse dragging with hardware-accelerated clip-path
 * - Quick presets: [100% For Him] | [50/50 Split] | [100% For Her]
 * - Keyboard navigation (Arrow keys)
 * - Interactive [BUY NOW] buttons triggering boutique concierge inquiry
 */
export default function PoemDuoComparison({ onOpenConcierge }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  // Touch drag handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleGlobalTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
      window.addEventListener('touchend', handleGlobalMouseUp);
      window.addEventListener('touchcancel', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
      window.removeEventListener('touchcancel', handleGlobalMouseUp);
    };
  }, [isDragging, handleMove]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  const handleBuyNow = (edition) => {
    if (onOpenConcierge) {
      onOpenConcierge(edition);
    }
  };

  return (
    <section
      id="poem-collection"
      className="relative py-16 sm:py-24 md:py-32 bg-ivory-warm/40 border-t border-b border-navy-900/10 overflow-hidden"
    >
      {/* Background Subtle Watermark Pattern */}
      <div
        className="absolute inset-0 bg-brand-pattern opacity-[0.03] mix-blend-multiply pointer-events-none bg-center bg-cover"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <span className="w-8 sm:w-10 h-[1.5px] bg-navy-950/70" />
              <span className="text-[10px] sm:text-xs tracking-widest-xl sm:tracking-widest-2xl uppercase text-navy-950 font-semibold font-mono">
                03.5 // ATELIER DUALITY
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-navy-950 font-normal leading-tight">
              The Poem Collection
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-navy-muted text-xs sm:text-sm font-light leading-relaxed">
              Two complementary expressions born from the same architectural flacon. Slide to unveil <strong className="text-navy-950 font-medium">Poem for Him</strong> (draped in obsidian raw silk) and <strong className="text-navy-950 font-medium">Poem for Her</strong> (encased in aged saddle leather).
            </p>
          </div>
        </div>

        {/* Quick Mode Preset Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
          <button
            onClick={() => setSliderPosition(100)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all ${
              sliderPosition >= 85
                ? 'bg-navy-950 text-white shadow-md'
                : 'bg-white/80 text-navy-900/80 hover:bg-white hover:text-navy-950 border border-navy-900/10'
            }`}
          >
            Poem For Him (100%)
          </button>

          <button
            onClick={() => setSliderPosition(50)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all ${
              sliderPosition > 40 && sliderPosition < 60
                ? 'bg-navy-950 text-white shadow-md'
                : 'bg-white/80 text-navy-900/80 hover:bg-white hover:text-navy-950 border border-navy-900/10'
            }`}
          >
            50 / 50 Duality
          </button>

          <button
            onClick={() => setSliderPosition(0)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all ${
              sliderPosition <= 15
                ? 'bg-navy-950 text-white shadow-md'
                : 'bg-white/80 text-navy-900/80 hover:bg-white hover:text-navy-950 border border-navy-900/10'
            }`}
          >
            Poem For Her (100%)
          </button>
        </div>

        {/* ─── INTERACTIVE COMPARISON SLIDER STAGE ─── */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-label="Poem For Him vs Poem For Her Comparison Slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          className="relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[21/10] max-h-[640px] rounded-sm sm:rounded overflow-hidden shadow-2xl border border-navy-900/15 cursor-ew-resize select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 bg-black"
        >
          {/* BASE LAYER: POEM FOR HER (Brown Leather) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={BRAND_IDENTITY.assets.poemForHer}
              alt="Poem For Her — Flacon on Saddle Leather"
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />

            {/* Overlaid Label & BUY NOW button for HER (Bottom Right) */}
            <div
              className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-20 flex flex-col items-end gap-2 sm:gap-2.5 transition-opacity duration-300 pointer-events-auto"
              style={{
                opacity: sliderPosition < 85 ? 1 : 0.2,
              }}
            >
              <span className="font-mono text-[10px] sm:text-xs tracking-widest-2xl uppercase text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                POEM FOR HER
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow('Poem For Her');
                }}
                className="btn-luxury-shimmer bg-white text-navy-950 hover:bg-navy-950 hover:text-white px-5 sm:px-7 py-2 sm:py-2.5 rounded-[1px] text-[10px] sm:text-xs font-semibold uppercase tracking-widest-xl shadow-2xl border border-navy-950/20 transition-all cursor-pointer"
              >
                BUY NOW
              </button>
            </div>
          </div>

          {/* TOP CLIPPED LAYER: POEM FOR HIM (Black Silk) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            <img
              src={BRAND_IDENTITY.assets.poemForHim}
              alt="Poem For Him — Flacon on Obsidian Silk"
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />

            {/* Overlaid Label & BUY NOW button for HIM (Bottom Left) */}
            <div
              className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 z-20 flex flex-col items-start gap-2 sm:gap-2.5 transition-opacity duration-300 pointer-events-auto"
              style={{
                opacity: sliderPosition > 15 ? 1 : 0.2,
              }}
            >
              <span className="font-mono text-[10px] sm:text-xs tracking-widest-2xl uppercase text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                POEM FOR HIM
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow('Poem For Him');
                }}
                className="btn-luxury-shimmer bg-white text-navy-950 hover:bg-navy-950 hover:text-white px-5 sm:px-7 py-2 sm:py-2.5 rounded-[1px] text-[10px] sm:text-xs font-semibold uppercase tracking-widest-xl shadow-2xl border border-navy-950/20 transition-all cursor-pointer"
              >
                BUY NOW
              </button>
            </div>
          </div>

          {/* ─── SLIDER DIVIDER LINE & DRAG HANDLE ─── */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Fine Vertical Line */}
            <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.8)]" />

            {/* Center Circular Knob */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-navy-950/95 text-white flex items-center justify-center shadow-2xl border-2 border-white/80 transition-transform ${
                isDragging ? 'scale-110 ring-4 ring-white/30' : 'hover:scale-105'
              }`}
            >
              <div className="flex items-center gap-0.5 text-white/90">
                <ChevronLeft className="w-3.5 h-3.5" />
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Drag Interaction Hint Banner (Fades out when interacting) */}
          <div
            className={`absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500 ${
              isDragging ? 'opacity-0' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-2 bg-navy-950/75 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 text-[9px] sm:text-[10px] font-mono tracking-wider text-white uppercase shadow-lg">
              <MoveHorizontal className="w-3 h-3 text-champagne" />
              <span>Drag to Reveal Duality</span>
            </div>
          </div>
        </div>

        {/* ─── DUAL SCENT DOSSIER COMPARISON CARDS ─── */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Card 1: For Him */}
          <div
            onClick={() => setSliderPosition(100)}
            className={`p-5 sm:p-6 rounded-sm border transition-all duration-300 cursor-pointer ${
              sliderPosition >= 50
                ? 'bg-navy-950 text-white border-navy-950 shadow-xl'
                : 'bg-white/80 text-navy-950 border-navy-900/10 hover:border-navy-900/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-mono tracking-widest uppercase ${sliderPosition >= 50 ? 'text-mist-blue' : 'text-navy-muted'}`}>
                NOBLE EDITION // MASCULINE SILLAGE
              </span>
              <span className="text-xs font-serif italic opacity-70">Eau de Parfum</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal mb-2">Poem For Him</h3>
            <p className={`text-xs font-light leading-relaxed mb-4 ${sliderPosition >= 50 ? 'text-mist-blue/80' : 'text-navy-muted'}`}>
              An enigmatic aura of smoked vetiver, dark Mediterranean cypress, and black amber woven through draped obsidian silk.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-current/10">
              <span className="text-[10px] font-mono uppercase tracking-wider">Top: Calabrian Bergamot • Heart: Smoked Cypress • Base: Midnight Oud</span>
              <ArrowRight className="w-4 h-4 ml-2 shrink-0 opacity-80" />
            </div>
          </div>

          {/* Card 2: For Her */}
          <div
            onClick={() => setSliderPosition(0)}
            className={`p-5 sm:p-6 rounded-sm border transition-all duration-300 cursor-pointer ${
              sliderPosition < 50
                ? 'bg-navy-950 text-white border-navy-950 shadow-xl'
                : 'bg-white/80 text-navy-950 border-navy-900/10 hover:border-navy-900/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-mono tracking-widest uppercase ${sliderPosition < 50 ? 'text-mist-blue' : 'text-navy-muted'}`}>
                NOBLE EDITION // FEMININE RESONANCE
              </span>
              <span className="text-xs font-serif italic opacity-70">Eau de Parfum</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal mb-2">Poem For Her</h3>
            <p className={`text-xs font-light leading-relaxed mb-4 ${sliderPosition < 50 ? 'text-mist-blue/80' : 'text-navy-muted'}`}>
              Velvety Damask rose and saffron suede resting atop hand-stitched cognac saddle leather and warm bourbon vanilla.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-current/10">
              <span className="text-[10px] font-mono uppercase tracking-wider">Top: Damask Rose • Heart: Saffron Suede • Base: Bourbon Leather</span>
              <ArrowRight className="w-4 h-4 ml-2 shrink-0 opacity-80" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
