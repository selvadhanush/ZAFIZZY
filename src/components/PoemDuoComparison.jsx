import React, { useState, useRef, useCallback, useEffect } from 'react';

/**
 * The Poem Collection — M7 Oud Day / Night banner
 * Vertical reveal slider: drag (or use arrow keys) to move the split between
 * the Day side (top) and the Night side (bottom). Pure CSS clip-path, rAF-throttled.
 */
const MIN = 8;
const MAX = 92;

export default function PoemDuoComparison({ onOpenConcierge }) {
  const [pos, setPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef(null);
  const pending = useRef(50);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const clamp = (v) => Math.max(MIN, Math.min(MAX, v));

  const moveTo = useCallback((clientY) => {
    if (!stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    pending.current = clamp(((clientY - r.top) / r.height) * 100);
    if (!raf.current) {
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        setPos(pending.current);
      });
    }
  }, []);

  const onPointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientY);
  };
  const onPointerMove = (e) => { if (isDragging) moveTo(e.clientY); };
  const onPointerUp = () => setIsDragging(false);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setPos((p) => clamp(p - 4));
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setPos((p) => clamp(p + 4));
  };

  const inquire = (edition) => (e) => {
    e.stopPropagation();
    if (onOpenConcierge) onOpenConcierge(edition);
  };

  const bottleBase = {
    position: 'absolute',
    zIndex: 1,
    left: '50%',
    top: '50%',
    height: '72cqh',
    maxWidth: 'none',
    transform: 'translate(-50%, -50%) rotate(-34deg)',
    pointerEvents: 'none',
  };
  const tagBase = {
    position: 'absolute',
    zIndex: 2,
    maxWidth: '30%',
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 'clamp(16px, 2.4cqw, 28px)',
    letterSpacing: '.02em',
    fontStyle: 'italic',
    fontWeight: 600,
    lineHeight: 1.15,
    textShadow: '0 1px 8px rgba(0,0,0,.25)',
  };
  const btnBase = {
    position: 'absolute',
    zIndex: 2,
    padding: '12px 18px',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '.14em',
    color: '#1a1208',
    background: '#fff',
    cursor: 'pointer',
  };

  return (
    <section
      id="poem-collection"
      className="relative py-16 sm:py-24 md:py-32 bg-ivory-warm/40 border-t border-b border-navy-900/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
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
        </div>

        {/* M7 OUD DAY / NIGHT BANNER */}
        <div
          ref={stageRef}
          role="slider"
          tabIndex={0}
          aria-label="Perfume For Him vs Perfume For Her"
          aria-orientation="vertical"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={Math.round(pos)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
          className="relative w-full max-w-[1000px] mx-auto aspect-video min-h-[360px] overflow-hidden rounded-[6px] select-none bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-950"
          style={{ containerType: 'size', touchAction: 'none', cursor: 'ns-resize' }}
        >
          {/* gold frame */}
          <div
            className="absolute pointer-events-none"
            style={{ inset: 10, border: '1px solid rgba(201,162,77,.7)', zIndex: 4 }}
          />

          {/* DAY (top) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ background: 'url(/m7/day-bg.jpg) center/cover' }}
          >
            <img
              src="/m7/day-bottle.webp"
              alt="Perfume For Him"
              decoding="async"
              draggable={false}
              style={{ ...bottleBase, filter: 'drop-shadow(0 0 10px rgba(70,40,10,.45))' }}
            />
            <span style={{ ...tagBase, left: 28, top: 30, color: '#efe2c6' }}>Remembered in the dark.</span>
            <button type="button" onClick={inquire('Perfume For Him')} style={{ ...btnBase, left: 28, top: 72 }}>
              SHOP PERFUME FOR HIM
            </button>
          </div>

          {/* NIGHT (bottom, revealed by clip) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: 'url(/m7/night-bg.jpg) center/cover',
              clipPath: `inset(${pos}% 0 0 0)`,
            }}
          >
            <img
              src="/m7/night-bottle.webp"
              alt="Perfume For Her"
              decoding="async"
              draggable={false}
              style={{ ...bottleBase, filter: 'drop-shadow(0 0 24px rgba(255,255,255,.28))' }}
            />
            <span style={{ ...tagBase, right: 28, bottom: 76, textAlign: 'right', color: '#f3d9a6' }}>
              Worn in the light.
            </span>
            <button
              type="button"
              onClick={inquire('Perfume For Her')}
              style={{ ...btnBase, right: 28, bottom: 26, background: '#e8b35c' }}
            >
              SHOP PERFUME FOR HER
            </button>
          </div>

          {/* hint */}
          <div
            className={`absolute top-3.5 left-1/2 -translate-x-1/2 z-[3] pointer-events-none transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-100'}`}
          >
            <span
              className="font-sans"
              style={{
                fontSize: 11,
                letterSpacing: '.2em',
                padding: '7px 14px',
                borderRadius: 99,
                background: 'rgba(10,10,10,.6)',
                color: '#fff',
              }}
            >
              ↕ DRAG TO REVEAL HIM & HER
            </span>
          </div>

          {/* divider + knob */}
          <div
            className="absolute pointer-events-none"
            style={{ top: `${pos}%`, left: 10, right: 10, height: 2, background: '#fff', zIndex: 2 }}
          />
          <div
            className="absolute pointer-events-none rounded-full overflow-hidden"
            style={{
              top: `${pos}%`,
              left: '50%',
              width: 'clamp(50px, 6cqw, 62px)',
              aspectRatio: '1/1',
              transform: 'translate(-50%, -50%)',
              background: '#14100d',
              border: '1.5px solid #c9a24d',
              boxShadow: '0 4px 18px rgba(0,0,0,.55)',
              zIndex: 3,
            }}
          >
            <img src="/m7/knob.webp" alt="Zafizzy" draggable={false} className="w-full h-full block" />
          </div>
        </div>
      </div>
    </section>
  );
}
