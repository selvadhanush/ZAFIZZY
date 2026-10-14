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
  ctx.font = '500 132px "Cormorant Garamond", "Cinzel", Georgia, serif';
  ctx.letterSpacing = '16px';
  ctx.fillText('ZÄFIZZY', canvas.width / 2, canvas.height / 2 + 80);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Creates authentic luminous liquid gradient texture matching signature-bottle.jpg
 * (Deep midnight navy at top transitioning to glowing sapphire at bottom)
 */
export function createLiquidGradientTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0.0, '#051124');   // Deepest midnight navy meniscus
  grad.addColorStop(0.35, '#0a1e3f');  // Saturated royal midnight
  grad.addColorStop(0.70, '#0f2d5c');  // Vibrant oceanic sapphire
  grad.addColorStop(0.88, '#16407a');  // Luminous sapphire refraction
  grad.addColorStop(1.0, '#1c4f8e');   // Radiant bottom curve highlight

  ctx.fillStyle = grad;
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
