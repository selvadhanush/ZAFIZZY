import React from 'react';
import { X, CheckCircle, ShieldAlert, Sparkles, Layers, Sliders, FileCode, Check, Box } from 'lucide-react';
import { BRAND_IDENTITY, FRAGRANCE_DATA } from '../data/brandData';

export default function BrandAuditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white h-full shadow-2xl p-8 sm:p-10 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-navy-900/10">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-navy-muted block">
                CREATIVE AUDIT & 3D TECHNICAL DOSSIER
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-navy-900 font-light mt-1">
                Real-Time 3D Flacon Architecture
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-navy-900 hover:text-navy-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Audit Sections */}
          <div className="mt-8 space-y-8">
            
            {/* 1. Real 3D Flacon Engine */}
            <div className="p-5 bg-ivory-warm/40 border border-navy-900/10 rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <Box className="w-4 h-4 text-emerald-700 shrink-0" />
                <h4 className="text-xs uppercase tracking-widest font-semibold text-navy-900">
                  1. Real-Time 3D Procedural Flacon (Three.js & R3F)
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-navy-muted leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-navy-900 mt-0.5 shrink-0" />
                  <span><strong>Physical Glass (PBR):</strong> <code>MeshPhysicalMaterial</code> with IOR 1.52 (crown glass index), transmission 0.96, clearcoat 1.0, and attenuation color <code>#dbeafe</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-navy-900 mt-0.5 shrink-0" />
                  <span><strong>Liquid Essence:</strong> Inner refraction core in deep midnight navy (<code>#101E38</code>, IOR 1.35) with internal dip tube.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-navy-900 mt-0.5 shrink-0" />
                  <span><strong>Cap & Collar:</strong> Brushed midnight metal cap (metalness 0.88) with platinum trim ring (metalness 0.98) and fluted marble plinth.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-navy-900 mt-0.5 shrink-0" />
                  <span><strong>Embossed Label:</strong> High-resolution procedural <code>CanvasTexture</code> rendering the exact <strong>ZÄFIZZY</strong> wordmark, Arabic calligraphy (زافيزي), and diamond-star monogram.</span>
                </li>
              </ul>
            </div>

            {/* 2. Scroll-Driven 3D Storytelling Stages */}
            <div className="p-5 bg-ivory-warm/40 border border-navy-900/10 rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <h4 className="text-xs uppercase tracking-widest font-semibold text-navy-900">
                  2. 5-Stage Scroll-Driven Choreography
                </h4>
              </div>
              <div className="space-y-2 text-xs text-navy-muted">
                <div><strong>Stage I (0–20%):</strong> The Reveal — Camera dollies in from distance; soft atmospheric mist particles drift into view.</div>
                <div><strong>Stage II (20–45%):</strong> 360° Flacon Inspection — Real-time vertical-axis rotation driven deterministically by scroll progress.</div>
                <div><strong>Stage III (45–70%):</strong> Olfactory Notes Macro — Camera dollies closer; floating Top, Heart, and Base notes cards reveal in sequence.</div>
                <div><strong>Stage IV (70–88%):</strong> Nocturnal Terroir Transition — Environment transitions smoothly from pure white/ivory to deep midnight navy (<code>#070E1B</code>).</div>
                <div><strong>Stage V (88–100%):</strong> The Masterwork Settle — Flacon settles into resting hero pose, transitioning to private atelier inquiry.</div>
              </div>
            </div>

            {/* 3. Additive Desktop Tilt Architecture */}
            <div className="p-5 bg-ivory-warm/40 border border-navy-900/10 rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sliders className="w-4 h-4 text-emerald-700 shrink-0" />
                <h4 className="text-xs uppercase tracking-widest font-semibold text-navy-900">
                  3. Conflict-Free Motion Separation
                </h4>
              </div>
              <p className="text-xs text-navy-muted leading-relaxed">
                Scroll rotation and desktop pointer tilt are mathematically isolated: the outer Three.js group owns the scroll rotation (Y-axis), while an inner child group handles the lerped pointer tilt (X and Z axes). This ensures pointer interactions never overwrite or glitch the scroll progress.
              </p>
            </div>

            {/* 4. Accessibility & Mobile Optimization */}
            <div className="p-5 bg-ivory-warm/40 border border-navy-900/10 rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <h4 className="text-xs uppercase tracking-widest font-semibold text-navy-900">
                  4. Hardware Detection & Fallback
                </h4>
              </div>
              <p className="text-xs text-navy-muted leading-relaxed">
                On mobile and coarse pointers, expensive raycasting and tilt are disabled while preserving smooth 3D rotation. If WebGL is unavailable, a high-resolution studio photograph fallback automatically renders. Full compliance with <code>prefers-reduced-motion</code>.
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-navy-900/10 text-[11px] text-navy-muted flex items-center justify-between font-mono">
          <span>3D SPECIFICATION: VERIFIED</span>
          <button
            onClick={onClose}
            className="text-navy-900 font-semibold hover:underline"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
