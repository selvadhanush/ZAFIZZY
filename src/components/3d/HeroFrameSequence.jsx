import React, { useEffect, useRef } from 'react';

const FRAME_COUNT = 239;
const FRAME_SRC = (i) => `/hero-frames/f${String(i + 1).padStart(3, '0')}.webp`;
const BG = '#060606';

/**
 * Scroll-scrubbed ZÄFIZZY bottle sequence rendered to a <canvas>.
 * Reads scrollProgressRef inside its own rAF loop — zero React re-renders while scrolling.
 * Frames load progressively (coarse pass first) and the nearest loaded frame is always drawn.
 */
export default function HeroFrameSequence({ scrollProgressRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const frames = new Array(FRAME_COUNT).fill(null);
    let cancelled = false;
    let raf = 0;
    let current = 0; // smoothed frame position (float)
    let lastDrawn = -1;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = 1; // source frames are 1280x720; a larger backing store only costs fill-rate
      w = Math.max(1, Math.round(rect.width * dpr));
      h = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      lastDrawn = -1;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    // Progressive loading: every 8th frame first, then fill the gaps.
    const order = [];
    for (let i = 0; i < FRAME_COUNT; i += 8) order.push(i);
    for (let i = 0; i < FRAME_COUNT; i++) if (i % 8 !== 0) order.push(i);
    let cursor = 0;
    const loadNext = () => {
      if (cancelled || cursor >= order.length) return;
      const idx = order[cursor++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        // Pre-decode off the main thread so the first draw of a frame never janks
        const done = () => { frames[idx] = img; lastDrawn = -1; loadNext(); };
        if (img.decode) img.decode().then(done, done); else done();
      };
      img.onerror = loadNext;
      img.src = FRAME_SRC(idx);
    };
    for (let k = 0; k < 4; k++) loadNext(); // 4 parallel loaders

    const nearest = (idx) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (frames[idx - d]) return frames[idx - d];
        if (frames[idx + d]) return frames[idx + d];
      }
      return null;
    };

    const draw = (idx) => {
      const img = nearest(idx);
      if (!img) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      // Cover on landscape; on narrow portrait screens cap the scale so the bottle isn't oversized.
      const scale = Math.min(Math.max(w / iw, h / ih), (w * 2.4) / iw);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    // Don't burn frames while the hero is off-screen or the tab is hidden
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !cancelled) raf = requestAnimationFrame(tick);
    });
    io.observe(canvas);

    const tick = () => {
      raf = 0;
      if (!visible || cancelled) return;
      const target = Math.min(1, Math.max(0, scrollProgressRef.current || 0)) * (FRAME_COUNT - 1);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.01) current = target;
      const idx = Math.round(current);
      if (idx !== lastDrawn) {
        draw(idx);
        lastDrawn = idx;
      }
      // Keep running only while still easing or while scroll position is changing
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [scrollProgressRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="ZÄFIZZY Amber Oud perfume bottle rotating, opening and spraying"
    />
  );
}
