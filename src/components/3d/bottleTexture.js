import * as THREE from 'three';

/**
 * Creates an ultra-crisp 2048x2048 transparent silkscreen brand mark
 * matching the authentic luxury flacon (no fake plaque boxes or borders).
 */
export function createBottleBrandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  // Pure transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Pure white/silver silkscreened wordmark with subtle dimensional shadow
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Subtle soft ambient shadow for laser-sharp readability over refracting liquid
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  // Primary Luxury Wordmark: ZÄFIZZY
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 136px "Cormorant Garamond", "Cinzel", Georgia, serif';
  ctx.letterSpacing = '18px';
  ctx.fillText('ZÄFIZZY', canvas.width / 2, canvas.height / 2 + 45);

  // Subtitle: PERFUMERS & PERFUMERY
  ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
  ctx.font = '400 32px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('PERFUMERS & PERFUMERY', canvas.width / 2, canvas.height / 2 + 115);

  // Volume & Concentration notation
  ctx.fillStyle = 'rgba(255, 255, 255, 0.60)';
  ctx.font = '300 22px "Plus Jakarta Sans", monospace';
  ctx.letterSpacing = '6px';
  ctx.fillText('EXTRAIT DE PARFUM  •  100 ML', canvas.width / 2, canvas.height / 2 + 165);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Creates authentic luminous rich brown alcohol perfume liquid texture
 * Aged bourbon, cognac, and warm amber-brown tones that mimic fine aged liquor
 */
export function createLiquidGradientTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Vertical gradient with rich brown alcohol & aged bourbon tones
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0.0, '#260D04');   // Deep dark roasted mahogany meniscus line
  grad.addColorStop(0.12, '#3E1707');  // Rich aged bourbon brown
  grad.addColorStop(0.35, '#5A230A');  // Deep warm cognac brown alcohol
  grad.addColorStop(0.60, '#7A320E');  // Luminous amber-brown alcohol body
  grad.addColorStop(0.82, '#964012');  // Glowing warm amber heart
  grad.addColorStop(1.0, '#582108');   // Deep bottom refraction warmth

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle crystal facet refraction lines in warm amber
  ctx.save();
  ctx.strokeStyle = 'rgba(235, 155, 60, 0.18)';
  ctx.lineWidth = 1.5;
  const step = 64;
  for (let y = canvas.height * 0.1; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width + step; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, y - step / 2);
      ctx.lineTo(x + step / 2, y);
      ctx.lineTo(x, y + step / 2);
      ctx.lineTo(x - step / 2, y);
      ctx.closePath();
      ctx.stroke();
    }
  }
  ctx.restore();

  // Internal luminous cognac/bourbon amber radial warmth
  const radial = ctx.createRadialGradient(
    canvas.width / 2, canvas.height * 0.55, 25,
    canvas.width / 2, canvas.height * 0.55, canvas.width * 0.6
  );
  radial.addColorStop(0.0, 'rgba(200, 90, 22, 0.45)'); // Glowing luminous amber core
  radial.addColorStop(0.55, 'rgba(110, 42, 10, 0.28)'); // Rich cognac brown body
  radial.addColorStop(1.0, 'rgba(38, 14, 4, 0.05)');   // Deep edge falloff

  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates fine brushed metallic anisotropic grain texture for the luxury cap
 */
export function createBrushedMetalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Base metal tone
  ctx.fillStyle = '#141d2f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Micro-fine vertical brushed lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * canvas.width;
    const w = 1 + Math.random() * 2;
    ctx.fillRect(x, 0, w, canvas.height);
  }

  // Subtle darker grain
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * canvas.width;
    const w = 1 + Math.random() * 2;
    ctx.fillRect(x, 0, w, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates soft feathered circular texture for 3D mist particles
 * (eliminating square pixels)
 */
export function createParticleCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.3, 'rgba(216, 223, 233, 0.8)');
  grad.addColorStop(0.7, 'rgba(16, 30, 56, 0.2)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
