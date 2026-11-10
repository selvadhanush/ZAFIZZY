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

    // Compressed frames are kept as Blobs (~5 MB total). Only a small window of decoded
    // ImageBitmaps (+ sparse keyframes) lives in memory instead of 239 x 3.7 MB.
    const blobs = new Array(FRAME_COUNT).fill(null);
    const bitmaps = new Array(FRAME_COUNT).fill(null);
    const pending = new Set();
    const KEY_STEP = 8;
    const WINDOW = 10;

    const order = [];
    for (let i = 0; i < FRAME_COUNT; i += KEY_STEP) order.push(i);
    for (let i = 0; i < FRAME_COUNT; i++) if (i % KEY_STEP !== 0) order.push(i);
    let cursor = 0;
    const decode = (idx) => {
      if (bitmaps[idx] || pending.has(idx) || !blobs[idx]) return;
      pending.add(idx);
      createImageBitmap(blobs[idx]).then((bmp) => {
        pending.delete(idx);
        if (cancelled) { bmp.close(); return; }
        bitmaps[idx] = bmp;
        lastDrawn = -1;
        kick();
      }, () => pending.delete(idx));
    };
    const loadNext = () => {
      if (cancelled || cursor >= order.length) return;
      const idx = order[cursor++];
      fetch(FRAME_SRC(idx))
        .then((r) => r.blob())
        .then((b) => {
          blobs[idx] = b;
          if (idx % KEY_STEP === 0) decode(idx);
          loadNext();
        })
        .catch(loadNext);
    };
    for (let k = 0; k < 4; k++) loadNext(); // 4 parallel loaders

    const updateWindow = (idx) => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const inWin = Math.abs(i - idx) <= WINDOW;
        if (inWin) decode(i);
        else if (bitmaps[i] && i % KEY_STEP !== 0) { bitmaps[i].close(); bitmaps[i] = null; }
      }
    };

    const nearest = (idx) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (bitmaps[idx - d]) return bitmaps[idx - d];
        if (bitmaps[idx + d]) return bitmaps[idx + d];
      }
      return null;
    };

    const draw = (idx) => {
      const img = nearest(idx);
      if (!img) return;
      const iw = img.width;
      const ih = img.height;
      // Cover on landscape; on narrow portrait screens cap the scale so the bottle isn't oversized.
      const scale = Math.min(Math.max(w / iw, h / ih), (w * 2.4) / iw);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    // Don't burn frames while the hero is off-screen, the tab is hidden, or the scroll has settled
    let visible = true;
    let lastWindowIdx = -99;
    function kick() { if (visible && !raf && !cancelled) raf = requestAnimationFrame(tick); }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); });
    io.observe(canvas);
    window.addEventListener('scroll', kick, { passive: true });

    function tick() {
      raf = 0;
      if (!visible || cancelled || document.hidden) return;
      const target = Math.min(1, Math.max(0, scrollProgressRef.current || 0)) * (FRAME_COUNT - 1);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.01) current = target;
      const idx = Math.round(current);
      if (Math.abs(idx - lastWindowIdx) >= 3) { lastWindowIdx = idx; updateWindow(idx); }
      if (idx !== lastDrawn) {
        draw(idx);
        lastDrawn = idx;
      }
      if (current !== target) raf = requestAnimationFrame(tick); // idle once settled
    }
    kick();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('scroll', kick);
      bitmaps.forEach((b) => b && b.close());
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
