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
      {/* 🥉 Bronze Village: The exact refined pixel art background */}
      {isBronzeVillage ? (
        <div className="w-full h-full absolute inset-0">
          <img
            src="/maps/bronze_village_map.png"
            alt="Bronze Village World Map"
            className="w-full h-full object-fill absolute inset-0 select-none pointer-events-none filter contrast-105"
          />

          {/* ========================================================
              ACTIVE IN-GAME ENVIRONMENTAL MOVING ANIMATIONS
          ======================================================== */}
          <svg
            viewBox="0 0 1000 1000"
            className="w-full h-full block absolute inset-0 pointer-events-none"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Soft Firefly Glow Filter */}
              <filter id="fireflyGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Animated Water Ripples over the Blue Pond (x: 650-800, y: 720-880) */}
            <g id="water-ripples" opacity="0.6">
              <circle cx="730" cy="800" r="14" fill="none" stroke="#93c5fd" strokeWidth="2" className="animate-ping" style={{ animationDuration: '3.5s' }} />
              <circle cx="770" cy="840" r="10" fill="none" stroke="#60a5fa" strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '4.5s', animationDelay: '1.2s' }} />
              <circle cx="700" cy="830" r="8" fill="none" stroke="#93c5fd" strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }} />
            </g>

            {/* 2. Fluttering Pixel Butterflies in the Meadows */}
            {/* Butterfly 1 (South-West Meadow near Level 1 & 2) */}
            <g className="animate-pulse" style={{ animationDuration: '2.5s' }}>
              <g transform="translate(180, 750)">
                <animateTransform attributeName="transform" type="translate" values="180,750; 210,730; 240,760; 200,780; 180,750" dur="8s" repeatCount="indefinite" />
                {/* Left Wing */}
                <polygon points="0,0 -6,-5 -4,-8 0,-2" fill="#fbbf24" stroke="#78350f" strokeWidth="0.5" />
                {/* Right Wing */}
                <polygon points="0,0 6,-5 4,-8 0,-2" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
                {/* Body */}
                <line x1="0" y1="-7" x2="0" y2="1" stroke="#451a03" strokeWidth="1.5" />
              </g>
            </g>

            {/* Butterfly 2 (Central Meadow near Level 8) */}
            <g className="animate-pulse" style={{ animationDuration: '2s' }}>
              <g transform="translate(500, 320)">
                <animateTransform attributeName="transform" type="translate" values="500,320; 530,300; 480,280; 510,340; 500,320" dur="10s" repeatCount="indefinite" />
                {/* Left Wing */}
                <polygon points="0,0 -6,-5 -4,-8 0,-2" fill="#67e8f9" stroke="#0e7490" strokeWidth="0.5" />
                {/* Right Wing */}
                <polygon points="0,0 6,-5 4,-8 0,-2" fill="#38bdf8" stroke="#0e7490" strokeWidth="0.5" />
                <line x1="0" y1="-7" x2="0" y2="1" stroke="#083344" strokeWidth="1.5" />
              </g>
            </g>

            {/* Butterfly 3 (East Meadow near Level 5) */}
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              <g transform="translate(860, 560)">
                <animateTransform attributeName="transform" type="translate" values="860,560; 890,530; 850,500; 880,580; 860,560" dur="9s" repeatCount="indefinite" />
                {/* Wings */}
                <polygon points="0,0 -6,-5 -4,-8 0,-2" fill="#f472b6" stroke="#831843" strokeWidth="0.5" />
                <polygon points="0,0 6,-5 4,-8 0,-2" fill="#fb7185" stroke="#831843" strokeWidth="0.5" />
                <line x1="0" y1="-7" x2="0" y2="1" stroke="#500724" strokeWidth="1.5" />
              </g>
            </g>

            {/* 3. Glowing Ambient Fireflies Drifting over Grass & Hedges */}
            <g id="fireflies" filter="url(#fireflyGlow)">
              {[
                { x: 300, y: 700, d: '0s', dur: '4s' },
                { x: 450, y: 600, d: '1.5s', dur: '5s' },
                { x: 620, y: 400, d: '0.8s', dur: '4.5s' },
                { x: 780, y: 300, d: '2.2s', dur: '6s' },
                { x: 220, y: 420, d: '1.1s', dur: '5.2s' },
                { x: 360, y: 250, d: '3s', dur: '4.8s' },
                { x: 820, y: 700, d: '0.5s', dur: '5.5s' },
              ].map((ff, i) => (
                <g key={`ff-${i}`} opacity="0.85">
                  <circle cx={ff.x} cy={ff.y} r="3" fill="#fef08a">
                    <animate attributeName="cy" values={`${ff.y}; ${ff.y - 30}; ${ff.y}`} dur={ff.dur} begin={ff.d} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2; 0.9; 0.2" dur={ff.dur} begin={ff.d} repeatCount="indefinite" />
                  </circle>
                  <circle cx={ff.x} cy={ff.y} r="1.5" fill="#ffffff">
                    <animate attributeName="cy" values={`${ff.y}; ${ff.y - 30}; ${ff.y}`} dur={ff.dur} begin={ff.d} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </g>

            {/* 4. Floating Sunbeam Dust Motes */}
            <g opacity="0.4" className="animate-pulse" style={{ animationDuration: '6s' }}>
              <circle cx="280" cy="520" r="2" fill="#ffffff" />
              <circle cx="560" cy="460" r="1.5" fill="#ffffff" />
              <circle cx="700" cy="200" r="2" fill="#ffffff" />
              <circle cx="150" cy="300" r="1.5" fill="#ffffff" />
              <circle cx="850" cy="400" r="2" fill="#ffffff" />
            </g>
          </svg>
        </div>
      ) : (
        /* Other Worlds: Neutral dark game canvas */
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full block absolute inset-0"
          preserveAspectRatio="none"
          style={{ imageRendering: 'pixelated' }}
          onClick={onCanvasClick}
        >
          <defs>
            <pattern id="cleanMapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="1000" height="1000" fill="#090d16" />
          <rect width="1000" height="1000" fill="url(#cleanMapGrid)" pointerEvents="none" />
        </svg>
      )}

      {/* Level Nodes and Walking Character Sprite (Rendered directly on top) */}
      <div className="absolute inset-0 pointer-events-none">{children}</div>
    </div>
  );
};
