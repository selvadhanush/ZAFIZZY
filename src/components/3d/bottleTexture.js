import * as THREE from 'three';

/**
 * Creates an ultra-crisp high-resolution 2048x2048 metallic platinum/silver plaque
 * for the ZÄFIZZY flacon face.
 */
export function createBottleBrandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const plaqueW = 1380;
  const plaqueH = 1000;
  const plaqueX = (canvas.width - plaqueW) / 2;
  const plaqueY = (canvas.height - plaqueH) / 2;

  // 1. Plaque background: Semi-translucent deep glass frosted backing
  ctx.save();
  ctx.fillStyle = 'rgba(16, 30, 56, 0.45)';
  ctx.beginPath();
  ctx.roundRect(plaqueX, plaqueY, plaqueW, plaqueH, 24);
  ctx.fill();

  // 2. Beveled platinum border
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 6;
  ctx.stroke();

  // 3. Inner fine hairline border
  ctx.strokeStyle = 'rgba(216, 223, 233, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(plaqueX + 24, plaqueY + 24, plaqueW - 48, plaqueH - 48, 16);
  ctx.stroke();

  // 4. Diamond-Star Monogram
  const drawDiamondStar = (cx, cy, spikes, outerRadius, innerRadius) => {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  };

  drawDiamondStar(canvas.width / 2, plaqueY + 160, 4, 48, 14);

  // 5. Arabic Calligraphy: زافيزي
  ctx.fillStyle = '#FAF9F6';
  ctx.font = '300 76px "Cormorant Garamond", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('زافيزي', canvas.width / 2, plaqueY + 280);

  // 6. Brand Wordmark: ZÄFIZZY
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 136px "Cormorant Garamond", serif';
  ctx.letterSpacing = '18px';
  ctx.fillText('ZÄFIZZY', canvas.width / 2, plaqueY + 450);

  // 7. Hairline Accent Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(plaqueX + 220, plaqueY + 560);
  ctx.lineTo(plaqueX + plaqueW - 220, plaqueY + 560);
  ctx.stroke();

  // 8. Subtitle: PERFUMERS & PERFUMERY
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '500 42px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '24px';
  ctx.fillText('PERFUMERS & PERFUMERY', canvas.width / 2, plaqueY + 650);

  // 9. Tagline: ACQUIRE THE WORLD
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '400 32px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '32px';
  ctx.fillText('ACQUIRE THE WORLD', canvas.width / 2, plaqueY + 740);

  // 10. Edition Spec
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 24px monospace';
  ctx.letterSpacing = '8px';
  ctx.fillText('EXTRAIT DE PARFUM  100 ML — 3.4 FL. OZ.', canvas.width / 2, plaqueY + 840);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
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
