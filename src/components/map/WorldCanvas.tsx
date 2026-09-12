import React from 'react';
import type { MapWorldDef } from '../../types/map';

interface WorldCanvasProps {
  world: MapWorldDef;
  onCanvasClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  children?: React.ReactNode;
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({ world, onCanvasClick, children }) => {
  const isBronzeVillage = world.id === 'bronze-village';

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-slate-950">
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full block absolute inset-0"
        preserveAspectRatio="none"
        style={{ imageRendering: 'pixelated' }}
        onClick={onCanvasClick}
      >
        <defs>
          {/* Subtle 16-Bit Grid & Grass Texture */}
          <pattern id="pixelGrassGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="#22c55e" />
            <rect x="0" y="0" width="16" height="16" fill="#16a34a" opacity="0.2" />
            <rect x="16" y="16" width="16" height="16" fill="#15803d" opacity="0.25" />
            <circle cx="8" cy="8" r="1.5" fill="#86efac" opacity="0.4" />
            <circle cx="24" cy="24" r="1.5" fill="#4ade80" opacity="0.4" />
          </pattern>

          {/* Gradients */}
          <linearGradient id="pondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          <linearGradient id="hedgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="25%" stopColor="#22c55e" />
            <stop offset="70%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          {/* Hedge Drop Shadow */}
          <filter id="hedgeShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="3" dy="8" stdDeviation="4" floodColor="#052e16" floodOpacity="0.7" />
          </filter>

          {/* Soft Firefly Glow */}
          <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ========================================================
            1. BASE TERRAIN: Vibrant 16-Bit Pixel Grass
        ======================================================== */}
        <rect width="1000" height="1000" fill="url(#pixelGrassGrid)" />

        {/* 🥉 BRONZE VILLAGE CUSTOM 16-BIT HEDGE MAZE ARTWORK (90% MATCHING) */}
        {isBronzeVillage && (
          <g id="custom-bronze-forest-art">
            {/* 2. Azure Blue Water Pond (South-East Opening) */}
            <g id="south-east-pond" filter="url(#hedgeShadow)">
              {/* Pond Sand/Moss Border */}
              <path
                d="M 640 730 Q 720 700 800 730 Q 860 760 840 840 Q 800 900 700 880 Q 630 850 640 730 Z"
                fill="#166534"
              />
              {/* Water Body */}
              <path
                d="M 650 740 Q 725 715 790 740 Q 845 770 825 830 Q 790 885 710 865 Q 645 840 650 740 Z"
                fill="url(#pondGrad)"
              />
              {/* Water Ripples Animation */}
              <circle cx="730" cy="790" r="14" fill="none" stroke="#e0f2fe" strokeWidth="2" className="animate-ping" style={{ animationDuration: '3.5s' }} />
              <circle cx="780" cy="820" r="10" fill="none" stroke="#bae6fd" strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '4.5s', animationDelay: '1.2s' }} />
              {/* Water Lilies */}
              <circle cx="690" cy="770" r="7" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
              <circle cx="690" cy="770" r="3" fill="#f472b6" />
              <circle cx="760" cy="840" r="8" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
              <circle cx="760" cy="840" r="3" fill="#fbcfe8" />
            </g>

            {/* 3. Outer Perimeter Dense Forest Border (Top, Bottom, Left, Right) */}
            <g id="perimeter-hedge" filter="url(#hedgeShadow)">
              {/* Top Border */}
              <rect x="0" y="0" width="1000" height="90" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="4" />
              {/* Bottom Border */}
              <rect x="0" y="920" width="1000" height="80" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="4" />
              {/* Left Border */}
              <rect x="0" y="0" width="75" height="1000" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="4" />
              {/* Right Border */}
              <rect x="925" y="0" width="75" height="1000" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="4" />

              {/* Pixel Canopy Treetop Tufts along Borders */}
              {Array.from({ length: 30 }).map((_, i) => (
                <circle key={`top-tuft-${i}`} cx={35 * i + 15} cy={80} r={22} fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <circle key={`bot-tuft-${i}`} cx={35 * i + 15} cy={925} r={22} fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <circle key={`left-tuft-${i}`} cx={70} cy={35 * i + 30} r={22} fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <circle key={`right-tuft-${i}`} cx={930} cy={35 * i + 30} r={22} fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              ))}
            </g>

            {/* 4. Strategic Internal Hedge Clusters (Matching 90% Composition) */}
            <g id="internal-hedges" filter="url(#hedgeShadow)">
              {/* Cluster A: Upper-Left Grove */}
              <g>
                <rect x="75" y="170" width="220" height="90" rx="15" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <rect x="160" y="240" width="95" height="70" rx="12" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <circle cx="120" cy="180" r="26" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="210" cy="190" r="30" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="270" cy="210" r="25" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="200" cy="285" r="28" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              </g>

              {/* Cluster B: Upper-Center Island */}
              <g>
                <rect x="470" y="170" width="180" height="85" rx="14" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <rect x="560" y="240" width="90" height="80" rx="12" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <circle cx="510" cy="180" r="28" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="585" cy="190" r="32" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="615" cy="280" r="30" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              </g>

              {/* Cluster C: Upper-Right Corner Spire */}
              <g>
                <rect x="815" y="170" width="115" height="140" rx="16" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <circle cx="850" cy="190" r="30" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="875" cy="270" r="32" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              </g>

              {/* Cluster D: Middle-Left Wall */}
              <g>
                <rect x="165" y="535" width="220" height="95" rx="16" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <circle cx="205" cy="555" r="32" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="275" cy="565" r="34" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="345" cy="560" r="30" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              </g>

              {/* Cluster E: Central Long Horizontal Divider */}
              <g>
                <rect x="420" y="535" width="490" height="90" rx="16" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <circle cx="460" cy="550" r="30" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="540" cy="555" r="34" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="630" cy="560" r="36" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="730" cy="565" r="34" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="830" cy="560" r="32" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="885" cy="555" r="28" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              </g>

              {/* Cluster F: South-Middle Hedge Island */}
              <g>
                <rect x="340" y="735" width="95" height="90" rx="14" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <circle cx="375" cy="750" r="28" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="395" cy="790" r="26" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              </g>

              {/* Cluster G: South-Central Hedge Block */}
              <g>
                <rect x="505" y="735" width="95" height="90" rx="14" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="3" />
                <circle cx="540" cy="750" r="28" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
                <circle cx="560" cy="795" r="26" fill="url(#hedgeGrad)" stroke="#14532d" strokeWidth="2" />
              </g>
            </g>

            {/* 5. In-Game Active Moving Animations */}
            {/* Fluttering Butterflies in Meadows */}
            <g className="animate-pulse" style={{ animationDuration: '2s' }}>
              {/* Butterfly 1 (South-West) */}
              <g transform="translate(180, 750)">
                <animateTransform attributeName="transform" type="translate" values="180,750; 210,725; 240,755; 190,775; 180,750" dur="8s" repeatCount="indefinite" />
                <polygon points="0,0 -7,-6 -5,-10 0,-3" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
                <polygon points="0,0 7,-6 5,-10 0,-3" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
                <line x1="0" y1="-8" x2="0" y2="1" stroke="#451a03" strokeWidth="1.5" />
              </g>
              {/* Butterfly 2 (Central Corridor) */}
              <g transform="translate(480, 320)">
                <animateTransform attributeName="transform" type="translate" values="480,320; 520,290; 460,270; 500,340; 480,320" dur="10s" repeatCount="indefinite" />
                <polygon points="0,0 -7,-6 -5,-10 0,-3" fill="#67e8f9" stroke="#0e7490" strokeWidth="0.8" />
                <polygon points="0,0 7,-6 5,-10 0,-3" fill="#38bdf8" stroke="#0e7490" strokeWidth="0.8" />
                <line x1="0" y1="-8" x2="0" y2="1" stroke="#083344" strokeWidth="1.5" />
              </g>
              {/* Butterfly 3 (East Gateway) */}
              <g transform="translate(860, 520)">
                <animateTransform attributeName="transform" type="translate" values="860,520; 890,480; 840,460; 880,540; 860,520" dur="9s" repeatCount="indefinite" />
                <polygon points="0,0 -7,-6 -5,-10 0,-3" fill="#f472b6" stroke="#831843" strokeWidth="0.8" />
                <polygon points="0,0 7,-6 5,-10 0,-3" fill="#fb7185" stroke="#831843" strokeWidth="0.8" />
                <line x1="0" y1="-8" x2="0" y2="1" stroke="#500724" strokeWidth="1.5" />
              </g>
            </g>

            {/* Glowing Ambient Fireflies */}
            <g id="fireflies" filter="url(#glowFilter)">
              {[
                { x: 280, y: 700, d: '0s', dur: '4s' },
                { x: 440, y: 620, d: '1.5s', dur: '5s' },
                { x: 620, y: 390, d: '0.8s', dur: '4.5s' },
                { x: 770, y: 280, d: '2.2s', dur: '6s' },
                { x: 210, y: 410, d: '1.1s', dur: '5.2s' },
                { x: 350, y: 230, d: '3s', dur: '4.8s' },
                { x: 810, y: 690, d: '0.5s', dur: '5.5s' },
              ].map((ff, i) => (
                <g key={`ff-${i}`} opacity="0.85">
                  <circle cx={ff.x} cy={ff.y} r="3.5" fill="#fef08a">
                    <animate attributeName="cy" values={`${ff.y}; ${ff.y - 25}; ${ff.y}`} dur={ff.dur} begin={ff.d} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2; 0.95; 0.2" dur={ff.dur} begin={ff.d} repeatCount="indefinite" />
                  </circle>
                  <circle cx={ff.x} cy={ff.y} r="1.5" fill="#ffffff">
                    <animate attributeName="cy" values={`${ff.y}; ${ff.y - 25}; ${ff.y}`} dur={ff.dur} begin={ff.d} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </g>

            {/* Floating Soft Cloud Shadows */}
            <g opacity="0.18">
              <g className="animate-pulse" style={{ animationDuration: '10s' }}>
                <ellipse cx="300" cy="400" rx="90" ry="35" fill="#052e16" />
                <ellipse cx="680" cy="300" rx="110" ry="40" fill="#052e16" />
                <ellipse cx="500" cy="750" rx="80" ry="30" fill="#052e16" />
              </g>
            </g>
          </g>
        )}
      </svg>

      {/* Level Nodes and Walking Character Sprite (Rendered directly on top) */}
      <div className="absolute inset-0 pointer-events-none">{children}</div>
    </div>
  );
};
