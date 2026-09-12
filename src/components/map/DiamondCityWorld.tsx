import React from 'react';
import { playDiamondCrystalChime, playDiamondPalaceSound } from '../../utils/soundEffects';

/**
 * Handcrafted 16-Bit Pixel-Art Diamond City (World 4) RPG Map
 * Faithfully recreating the mystical crystalline wonderland:
 * - Central Grand Arcane Crystal Palace with Floating Giant Diamond Core
 * - Majestic Grand Diamond Fountain with Glowing Runic Rim & Water Jets
 * - West & East Arched Viaduct Bridges with Roaring Waterfalls into River Chasms
 * - Multi-Tier Mountain Ledges with Indigo Cliff Foundations
 * - Glowing Cyan, Amethyst, and Magenta Crystal Clusters & Floating Island Altars
 * - Bioluminescent Pink & Violet Trees, Crystal Spires, and Ambient Mana Particles
 */
interface DiamondCityWorldProps {
  onPalaceClick?: () => void;
  onCrystalClick?: () => void;
}

export const DiamondCityWorld: React.FC<DiamondCityWorldProps> = ({ onPalaceClick, onCrystalClick }) => {
  const handlePalaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playDiamondPalaceSound();
    if (onPalaceClick) onPalaceClick();
  };

  const handleCrystalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playDiamondCrystalChime();
    if (onCrystalClick) onCrystalClick();
  };

  return (
    <g id="diamond-city-rpg-world">
      <defs>
        {/* CSS Animations for Ambient Crystalline & Mana Life */}
        <style>
          {`
            @keyframes dcCrystalPulse {
              0%, 100% { filter: drop-shadow(0 0 6px #38bdf8); opacity: 0.92; }
              50% { filter: drop-shadow(0 0 16px #67e8f9) drop-shadow(0 0 24px #06b6d4); opacity: 1; }
            }
            .dc-crystal-glow-cyan {
              animation: dcCrystalPulse 3.2s ease-in-out infinite;
            }

            @keyframes dcAmethystPulse {
              0%, 100% { filter: drop-shadow(0 0 6px #d946ef); opacity: 0.9; }
              50% { filter: drop-shadow(0 0 16px #f472b6) drop-shadow(0 0 22px #c084fc); opacity: 1; }
            }
            .dc-crystal-glow-purple {
              animation: dcAmethystPulse 3.6s ease-in-out infinite 0.8s;
            }

            @keyframes dcWaterFlow {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 32; }
            }
            .dc-waterfall-stream {
              stroke-dasharray: 8 6;
              animation: dcWaterFlow 0.9s linear infinite;
            }
            .dc-water-shimmer {
              stroke-dasharray: 6 6;
              animation: dcWaterFlow 1.6s linear infinite;
            }

            @keyframes dcFountainPulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.16); opacity: 0.45; }
            }
            .dc-fountain-ripple {
              transform-origin: 585px 560px;
              animation: dcFountainPulse 2.4s ease-in-out infinite;
            }

            @keyframes dcManaDrift {
              0% { transform: translateY(0) scale(0.6); opacity: 0; }
              30% { opacity: 0.95; }
              80% { opacity: 0.9; }
              100% { transform: translateY(-48px) translateX(8px) scale(1.25); opacity: 0; }
            }
            .dc-mana-1 { animation: dcManaDrift 4.2s ease-out infinite; }
            .dc-mana-2 { animation: dcManaDrift 4.8s ease-out infinite 1.2s; }
            .dc-mana-3 { animation: dcManaDrift 3.9s ease-out infinite 2.0s; }
            .dc-mana-4 { animation: dcManaDrift 5.1s ease-out infinite 0.6s; }

            @keyframes dcFloatCore {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-7px) rotate(2deg); }
            }
            .dc-floating-diamond-core {
              transform-origin: 585px 180px;
              animation: dcFloatCore 3.8s ease-in-out infinite;
            }
          `}
        </style>

        {/* 1. Base Indigo Rock Cliff & Soil Texture */}
        <pattern id="dcIndigoRock" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill="#1e1b4b" />
          <rect x="0" y="0" width="18" height="18" fill="#2e1065" opacity="0.6" />
          <rect x="18" y="18" width="18" height="18" fill="#0f172a" opacity="0.7" />
          {/* Subtle glowing mana veins */}
          <line x1="4" y1="8" x2="14" y2="12" stroke="#6366f1" strokeWidth="1" opacity="0.4" />
          <line x1="22" y1="26" x2="32" y2="30" stroke="#818cf8" strokeWidth="1" opacity="0.4" />
        </pattern>

        {/* 2. Luminescent Cobblestone Paving Pattern */}
        <pattern id="dcCobblePave" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#312e81" />
          <rect x="1" y="1" width="10" height="10" rx="2" fill="#4338ca" />
          <rect x="13" y="1" width="10" height="10" rx="2" fill="#3730a3" />
          <rect x="1" y="13" width="10" height="10" rx="2" fill="#3730a3" />
          <rect x="13" y="13" width="10" height="10" rx="2" fill="#4f46e5" />
          <circle cx="12" cy="12" r="1.5" fill="#a5b4fc" opacity="0.8" />
        </pattern>

        {/* 3. Luminescent Azure River Gradient */}
        <linearGradient id="dcRiverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="35%" stopColor="#06b6d4" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* 4. Pure Crystalline Diamond Spire Gradient */}
        <linearGradient id="dcDiamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#e0f2fe" />
          <stop offset="55%" stopColor="#67e8f9" />
          <stop offset="85%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>

        {/* 5. Magenta/Amethyst Crystal Gradient */}
        <linearGradient id="dcAmethystGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="30%" stopColor="#f472b6" />
          <stop offset="70%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>

        {/* 6. Cliff Shadow Filters */}
        <filter id="dcShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="3" dy="8" stdDeviation="5" floodColor="#020617" floodOpacity="0.85" />
        </filter>
        <filter id="dcBridgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="6" floodColor="#020617" floodOpacity="0.9" />
        </filter>
      </defs>

      {/* ===================================================================
          1. TERRAIN BASE LAYER: MULTI-TIER INDIGO CLIFFS & CHASM VALLEYS
      =================================================================== */}
      {/* Base Dark Indigo Rock */}
      <rect width="1000" height="1000" fill="url(#dcIndigoRock)" />

      {/* Terraced Plateau Contours */}
      <g id="dc-cliff-plateaus">
        {/* Northwest Highland Plateau (West Spire Cliff) */}
        <path
          d="M -10 -10 L 320 -10 Q 300 160 260 280 Q 220 380 180 460 Q 120 540 -10 560 Z"
          fill="#312e81"
          stroke="#4f46e5"
          strokeWidth="3"
        />

        {/* Northeast Arcane Ridge Plateau */}
        <path
          d="M 680 -10 L 1010 -10 L 1010 460 Q 940 440 880 390 Q 820 340 760 240 Q 710 140 680 -10 Z"
          fill="#312e81"
          stroke="#4f46e5"
          strokeWidth="3"
        />

        {/* Center Palace High Terraced Island */}
        <ellipse cx="585" cy="450" rx="160" ry="110" fill="#3730a3" stroke="#6366f1" strokeWidth="3.5" />
      </g>

      {/* ===================================================================
          2. LUMINESCENT RIVERS & MULTI-TIER CASCADING WATERFALLS
      =================================================================== */}
      <g id="dc-waterways">
        {/* Upper Center-Left Lake Basin (Origin of West Waterfall) */}
        <path
          d="M 220 380 Q 330 360 410 420 Q 430 490 380 540 Q 300 560 220 500 Z"
          fill="url(#dcRiverGrad)"
        />

        {/* Lower Central Gorge River (Underneath Bridges to South Ocean) */}
        <path
          d="M 330 520 Q 380 640 370 780 Q 360 920 390 1010 L 260 1010 Q 250 880 270 760 Q 290 640 330 520 Z"
          fill="url(#dcRiverGrad)"
        />

        {/* East Gorge River (Underneath East Viaduct Bridge) */}
        <path
          d="M 770 510 Q 840 620 830 760 Q 820 900 870 1010 L 740 1010 Q 720 880 730 750 Q 740 620 770 510 Z"
          fill="url(#dcRiverGrad)"
        />

        {/* South-Central Plunging Waterfall Stream (From Fountain Plaza) */}
        <path
          d="M 560 660 L 610 660 Q 610 820 590 920 Q 570 980 550 1010 L 480 1010 Q 500 940 520 840 Q 540 740 560 660 Z"
          fill="url(#dcRiverGrad)"
        />

        {/* Flowing Water Shimmers & Currents */}
        <g stroke="#bae6fd" strokeWidth="2" opacity="0.75" strokeLinecap="round">
          <line x1="280" y1="440" x2="340" y2="455" className="dc-water-shimmer" />
          <line x1="310" y1="620" x2="350" y2="640" className="dc-water-shimmer" />
          <line x1="320" y1="820" x2="360" y2="840" className="dc-water-shimmer" />
          <line x1="780" y1="620" x2="820" y2="640" className="dc-water-shimmer" />
          <line x1="770" y1="820" x2="810" y2="840" className="dc-water-shimmer" />
          <line x1="530" y1="780" x2="570" y2="800" className="dc-water-shimmer" />
        </g>

        {/* Upper-Right High Mountain Waterfall (x: 840, y: 160) */}
        <g id="dc-waterfall-ne">
          <rect x="835" y="160" width="24" height="70" fill="#38bdf8" />
          <line x1="839" y1="160" x2="839" y2="230" stroke="#ffffff" strokeWidth="3" className="dc-waterfall-stream" />
          <line x1="847" y1="160" x2="847" y2="230" stroke="#e0f2fe" strokeWidth="4" className="dc-waterfall-stream" />
          <line x1="855" y1="160" x2="855" y2="230" stroke="#ffffff" strokeWidth="2" className="dc-waterfall-stream" />
          <ellipse cx="847" cy="230" rx="18" ry="6" fill="#67e8f9" opacity="0.9" />
        </g>
      </g>

      {/* ===================================================================
          3. CRYSTAL ROADWAYS & COBBLESTONE PATHS
      =================================================================== */}
      <g id="dc-roads">
        {/* Southwest Approach Path (Level 31 to West Spire) */}
        <path
          d="M 140 920 Q 140 820 150 720 Q 160 620 170 540 L 210 545 Q 195 630 185 730 Q 175 830 180 920 Z"
          fill="url(#dcCobblePave)"
          stroke="#818cf8"
          strokeWidth="2.5"
        />

        {/* West Winding Path to Double Waterfall Bridge */}
        <path
          d="M 170 540 Q 210 470 270 480 Q 320 490 350 530 L 350 570 Q 300 535 250 525 Q 195 520 170 575 Z"
          fill="url(#dcCobblePave)"
          stroke="#818cf8"
          strokeWidth="2.5"
        />

        {/* Center Grand Fountain Plaza Ring (Circle at x: 585, y: 560) */}
        <g id="dc-fountain-plaza-circle">
          <circle cx="585" cy="560" r="74" fill="url(#dcCobblePave)" stroke="#6366f1" strokeWidth="4" />
          <circle cx="585" cy="560" r="68" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.8" strokeDasharray="8 4" />
          <circle cx="585" cy="560" r="58" fill="#1e1b4b" opacity="0.6" />
        </g>

        {/* Bridge to Plaza Connector Roads */}
        <path
          d="M 430 535 Q 470 535 520 550 L 520 580 Q 470 565 430 565 Z"
          fill="url(#dcCobblePave)"
          stroke="#818cf8"
          strokeWidth="2"
        />
        <path
          d="M 655 550 Q 700 535 750 535 L 750 565 Q 700 565 655 580 Z"
          fill="url(#dcCobblePave)"
          stroke="#818cf8"
          strokeWidth="2"
        />

        {/* Palace Grand Ascent Stairway Road */}
        <path
          d="M 560 500 L 610 500 L 610 440 L 560 440 Z"
          fill="url(#dcCobblePave)"
          stroke="#c084fc"
          strokeWidth="2"
        />

        {/* Upper Northeast Highway to Observatory & East Viaduct */}
        <path
          d="M 640 430 Q 710 360 760 280 Q 820 220 890 220 L 890 255 Q 830 255 785 305 Q 740 375 675 445 Z"
          fill="url(#dcCobblePave)"
          stroke="#818cf8"
          strokeWidth="2.5"
        />
        <path
          d="M 870 255 Q 870 380 840 470 Q 825 510 810 540 L 775 530 Q 795 490 810 440 Q 835 360 835 255 Z"
          fill="url(#dcCobblePave)"
          stroke="#818cf8"
          strokeWidth="2"
        />
      </g>

      {/* ===================================================================
          4. ARCHED WATERFALL AQUEDUCT & VIADUCT BRIDGES
      =================================================================== */}
      <g id="dc-aqueduct-bridges" filter="url(#dcBridgeShadow)">
        {/* ==========================================
            A. WEST DOUBLE WATERFALL BRIDGE (x: 340 - 435, y: 520 - 640)
        ========================================== */}
        <g id="dc-west-bridge">
          {/* Main Stone Viaduct Deck */}
          <rect x="345" y="525" width="88" height="26" rx="3" fill="#312e81" stroke="#4f46e5" strokeWidth="2.5" />
          {/* Top Crystal Railing */}
          <path d="M 342 522 Q 389 514 436 522" fill="none" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 342 552 Q 389 544 436 552" fill="none" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" />
          {/* Arched Stone Piers */}
          <rect x="345" y="548" width="16" height="85" fill="#1e1b4b" stroke="#312e81" strokeWidth="2" />
          <rect x="415" y="548" width="16" height="85" fill="#1e1b4b" stroke="#312e81" strokeWidth="2" />
          {/* Cascading Waterfalls Plunging Through the Arches */}
          <rect x="365" y="545" width="20" height="80" fill="#38bdf8" />
          <line x1="371" y1="545" x2="371" y2="625" stroke="#ffffff" strokeWidth="3" className="dc-waterfall-stream" />
          <line x1="379" y1="545" x2="379" y2="625" stroke="#e0f2fe" strokeWidth="4" className="dc-waterfall-stream" />
          <rect x="390" y="545" width="20" height="80" fill="#38bdf8" />
          <line x1="396" y1="545" x2="396" y2="625" stroke="#ffffff" strokeWidth="3" className="dc-waterfall-stream" />
          <line x1="404" y1="545" x2="404" y2="625" stroke="#e0f2fe" strokeWidth="4" className="dc-waterfall-stream" />
          {/* Bottom Water Splash Foam */}
          <ellipse cx="389" cy="625" rx="30" ry="8" fill="#67e8f9" opacity="0.85" />
        </g>

        {/* ==========================================
            B. EAST FORTIFIED VIADUCT BRIDGE (x: 745 - 845, y: 520 - 640)
        ========================================== */}
        <g id="dc-east-bridge">
          <rect x="750" y="525" width="90" height="26" rx="3" fill="#312e81" stroke="#4f46e5" strokeWidth="2.5" />
          <path d="M 748 522 Q 795 514 842 522" fill="none" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 748 552 Q 795 544 842 552" fill="none" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="750" y="548" width="16" height="85" fill="#1e1b4b" stroke="#312e81" strokeWidth="2" />
          <rect x="822" y="548" width="16" height="85" fill="#1e1b4b" stroke="#312e81" strokeWidth="2" />
          {/* Waterfall Cascade */}
          <rect x="772" y="545" width="44" height="80" fill="#38bdf8" />
          <line x1="782" y1="545" x2="782" y2="625" stroke="#ffffff" strokeWidth="3" className="dc-waterfall-stream" />
          <line x1="794" y1="545" x2="794" y2="625" stroke="#e0f2fe" strokeWidth="4" className="dc-waterfall-stream" />
          <line x1="806" y1="545" x2="806" y2="625" stroke="#ffffff" strokeWidth="3" className="dc-waterfall-stream" />
          <ellipse cx="794" cy="625" rx="32" ry="8" fill="#67e8f9" opacity="0.85" />
        </g>
      </g>

      {/* ===================================================================
          5. GLOWING CRYSTAL FORMATIONS & FLOATING ISLAND ALTARS
      =================================================================== */}
      <g
        id="dc-crystal-formations"
        onClick={handleCrystalClick}
        className="cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {/* ==========================================
            A. SOUTH-WEST GIANT BLUE CRYSTAL SPIRE SANCTUARY (x: 145, y: 870)
        ========================================== */}
        <g id="dc-sanctuary-sw" className="dc-crystal-glow-cyan" filter="url(#dcShadow)">
          {/* Stone Altar Pedestal */}
          <polygon points="120,890 145,860 170,890 145,910" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
          <circle cx="145" cy="885" r="16" fill="url(#dcRiverGrad)" />
          {/* Giant Faceted Cyan Crystal Spire */}
          <polygon points="145,790 156,845 145,885 134,845" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <polygon points="145,790 156,845 145,885" fill="#ffffff" opacity="0.4" />
          {/* Flanking Small Crystal Shards */}
          <polygon points="126,860 132,880 122,885" fill="#67e8f9" />
          <polygon points="164,860 168,885 158,880" fill="#67e8f9" />
        </g>

        {/* ==========================================
            B. SOUTH-CENTER MAGENTA FLOATING CRYSTAL ALTAR (x: 390, y: 910)
        ========================================== */}
        <g id="dc-altar-south" className="dc-crystal-glow-purple" filter="url(#dcShadow)">
          <ellipse cx="390" cy="935" rx="22" ry="12" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
          {/* Magenta Crystal Shard */}
          <polygon points="390,855 400,905 390,935 380,905" fill="url(#dcAmethystGrad)" stroke="#f472b6" strokeWidth="1.5" />
          <polygon points="390,855 400,905 390,935" fill="#ffffff" opacity="0.4" />
        </g>

        {/* ==========================================
            C. SOUTH-EAST AMETHYST FLOATING CRYSTAL ISLAND (x: 805, y: 810)
        ========================================== */}
        <g id="dc-altar-se" className="dc-crystal-glow-purple" filter="url(#dcShadow)">
          <ellipse cx="805" cy="835" rx="26" ry="14" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
          {/* Vibrant Amethyst Obelisk */}
          <polygon points="805,745 818,800 805,835 792,800" fill="url(#dcAmethystGrad)" stroke="#d946ef" strokeWidth="1.5" />
          <polygon points="805,745 818,800 805,835" fill="#ffffff" opacity="0.4" />
        </g>

        {/* ==========================================
            D. FAR-LEFT CLIFFTOP CRYSTAL MONOLITHS (x: 48, y: 450 & x: 50, y: 150)
        ========================================== */}
        <g id="dc-monolith-left-1" className="dc-crystal-glow-cyan" filter="url(#dcShadow)">
          <ellipse cx="48" cy="470" rx="24" ry="12" fill="#312e81" stroke="#67e8f9" strokeWidth="2" />
          <polygon points="48,390 58,445 48,470 38,445" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="1.5" />
        </g>
        <g id="dc-monolith-left-2" className="dc-crystal-glow-purple" filter="url(#dcShadow)">
          <ellipse cx="50" cy="170" rx="22" ry="11" fill="#312e81" stroke="#c084fc" strokeWidth="2" />
          <polygon points="50,95 60,145 50,170 40,145" fill="url(#dcAmethystGrad)" stroke="#d946ef" strokeWidth="1.5" />
        </g>

        {/* ==========================================
            E. SCATTERED CRYSTAL CLUSTERS ALONG CLIFFS & PATHS
        ========================================== */}
        {[
          { x: 235, y: 550, c: 'cyan', s: 1 },
          { x: 275, y: 450, c: 'purple', s: 1.2 },
          { x: 305, y: 640, c: 'cyan', s: 0.9 },
          { x: 470, y: 480, c: 'purple', s: 1.1 },
          { x: 700, y: 480, c: 'cyan', s: 1 },
          { x: 740, y: 640, c: 'purple', s: 1.2 },
          { x: 930, y: 440, c: 'cyan', s: 1.3 },
          { x: 960, y: 600, c: 'purple', s: 1.1 },
          { x: 920, y: 840, c: 'cyan', s: 1.2 },
          { x: 420, y: 280, c: 'purple', s: 1.1 },
          { x: 745, y: 280, c: 'cyan', s: 1 },
        ].map((ccl, i) => (
          <g
            key={`dc-cluster-${i}`}
            className={ccl.c === 'cyan' ? 'dc-crystal-glow-cyan' : 'dc-crystal-glow-purple'}
          >
            <polygon
              points={`${ccl.x},${ccl.y - 24 * ccl.s} ${ccl.x + 8 * ccl.s},${ccl.y} ${ccl.x - 8 * ccl.s},${ccl.y}`}
              fill={ccl.c === 'cyan' ? 'url(#dcDiamondGrad)' : 'url(#dcAmethystGrad)'}
              stroke={ccl.c === 'cyan' ? '#38bdf8' : '#d946ef'}
              strokeWidth="1"
            />
            <polygon
              points={`${ccl.x - 6 * ccl.s},${ccl.y - 14 * ccl.s} ${ccl.x},${ccl.y} ${ccl.x - 12 * ccl.s},${ccl.y}`}
              fill={ccl.c === 'cyan' ? '#67e8f9' : '#f472b6'}
              opacity="0.8"
            />
            <polygon
              points={`${ccl.x + 6 * ccl.s},${ccl.y - 16 * ccl.s} ${ccl.x + 12 * ccl.s},${ccl.y} ${ccl.x},${ccl.y}`}
              fill={ccl.c === 'cyan' ? '#e0f2fe' : '#c084fc'}
              opacity="0.8"
            />
          </g>
        ))}
      </g>

      {/* ===================================================================
          6. GRAND DIAMOND FOUNTAIN (Center Plaza at x: 585, y: 560)
      =================================================================== */}
      <g
        id="dc-grand-diamond-fountain"
        onClick={handleCrystalClick}
        className="cursor-pointer"
        style={{ pointerEvents: 'auto' }}
        filter="url(#dcShadow)"
      >
        {/* Outer Stone Basin */}
        <ellipse cx="585" cy="560" rx="42" ry="26" fill="#312e81" stroke="#6366f1" strokeWidth="3" />
        <ellipse cx="585" cy="560" rx="38" ry="22" fill="url(#dcRiverGrad)" />
        {/* Animated Fountain Wave Ripple */}
        <ellipse cx="585" cy="560" rx="30" ry="17" fill="none" stroke="#67e8f9" strokeWidth="2" className="dc-fountain-ripple" />

        {/* Sculpted Golden Runic Base Pedestal */}
        <ellipse cx="585" cy="554" rx="24" ry="14" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
        <ellipse cx="585" cy="554" rx="20" ry="11" fill="#facc15" />

        {/* Giant Floating Glowing Center Diamond Crystal */}
        <g className="dc-crystal-glow-cyan">
          <polygon points="585,490 600,535 585,565 570,535" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="585,490 600,535 585,565" fill="#ffffff" opacity="0.45" />
        </g>

        {/* Fountain Water Arch Sprays */}
        <g stroke="#ffffff" strokeWidth="2" opacity="0.85" strokeLinecap="round">
          <path d="M 585 520 Q 565 505 560 545" fill="none" />
          <path d="M 585 520 Q 605 505 610 545" fill="none" />
          <circle cx="560" cy="548" r="2.5" fill="#67e8f9" />
          <circle cx="610" cy="548" r="2.5" fill="#67e8f9" />
        </g>
      </g>

      {/* ===================================================================
          7. MYSTICAL BUILDINGS, WATCHTOWERS & MANORS
      =================================================================== */}
      <g id="dc-buildings" filter="url(#dcShadow)">
        {/* ==========================================
            A. WEST CRYSTAL SPIRE WATCHTOWER (x: 160, y: 440)
        ========================================== */}
        <g id="dc-tower-west">
          <rect x="135" y="420" width="50" height="120" rx="4" fill="#e2e8f0" stroke="#475569" strokeWidth="3" />
          <line x1="135" y1="460" x2="185" y2="460" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="135" y1="500" x2="185" y2="500" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="150" y="495" width="20" height="45" rx="3" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
          {/* Crystal Blue Spire Dome */}
          <path d="M 132 420 Q 160 350 188 420 Z" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="160,320 166,355 160,370 154,355" fill="#67e8f9" stroke="#38bdf8" strokeWidth="1" className="dc-crystal-glow-cyan" />
        </g>

        {/* ==========================================
            B. NORTHWEST HIGHLAND SPIRE CITADEL (x: 125, y: 140)
        ========================================== */}
        <g id="dc-manor-nw">
          <rect x="100" y="130" width="50" height="45" rx="3" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
          <path d="M 95 135 L 125 80 L 155 135 Z" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="2" />
          <rect x="118" y="145" width="14" height="30" rx="2" fill="#312e81" />
        </g>

        {/* ==========================================
            C. NORTHEAST WATCHTOWER SPIRE (x: 710, y: 160)
        ========================================== */}
        <g id="dc-tower-ne">
          <rect x="690" y="150" width="40" height="75" rx="3" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <path d="M 686 150 Q 710 90 734 150 Z" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="710,70 714,95 710,105 706,95" fill="#67e8f9" className="dc-crystal-glow-cyan" />
          <rect x="702" y="185" width="16" height="40" rx="2" fill="#312e81" />
        </g>

        {/* ==========================================
            D. EAST ARCANE OBSERVATORY MANOR (x: 910, y: 220)
        ========================================== */}
        <g id="dc-observatory-east">
          <rect x="875" y="195" width="70" height="52" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" />
          <path d="M 868 200 L 910 135 L 952 200 Z" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="910" cy="132" r="6" fill="#67e8f9" stroke="#0284c7" strokeWidth="1.5" className="dc-crystal-glow-cyan" />
          <rect x="900" y="215" width="20" height="32" rx="2" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
          <circle cx="910" cy="170" r="8" fill="#93c5fd" stroke="#6366f1" strokeWidth="1.5" />
        </g>

        {/* ==========================================
            E. EAST FORTIFIED GATEHOUSE TOWER (x: 885, y: 550)
        ========================================== */}
        <g id="dc-gatehouse-east">
          <rect x="860" y="525" width="50" height="85" rx="3" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <path d="M 855 525 Q 885 460 915 525 Z" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="2" />
          <rect x="875" y="560" width="20" height="50" rx="2" fill="#312e81" />
        </g>
      </g>

      {/* ===================================================================
          8. GRAND CENTRAL ARCANE CRYSTAL PALACE (The Zenith of World 4)
      =================================================================== */}
      <g
        id="dc-grand-arcane-palace"
        filter="url(#dcShadow)"
        onClick={handlePalaceClick}
        className="cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Main Celestial Stone Palace Base Structure */}
        <rect x="475" y="240" width="220" height="170" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="3.5" />
        {/* Balustrade Tier Lines */}
        <line x1="475" y1="300" x2="695" y2="300" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="475" y1="360" x2="695" y2="360" stroke="#cbd5e1" strokeWidth="3" />

        {/* Left Wing Tower (x: 505, y: 240) */}
        <g id="dc-palace-wing-l">
          <rect x="480" y="280" width="50" height="130" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <path d="M 476 280 Q 505 200 534 280 Z" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="505,170 511,205 505,215 499,205" fill="#67e8f9" className="dc-crystal-glow-cyan" />
        </g>

        {/* Right Wing Tower (x: 665, y: 240) */}
        <g id="dc-palace-wing-r">
          <rect x="640" y="280" width="50" height="130" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <path d="M 636 280 Q 665 200 694 280 Z" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="665,170 671,205 665,215 659,205" fill="#67e8f9" className="dc-crystal-glow-cyan" />
        </g>

        {/* Grand Center Supreme Palace Spire & Floating Diamond Core */}
        <g id="dc-palace-center-tower">
          <rect x="540" y="230" width="90" height="180" fill="#f1f5f9" stroke="#475569" strokeWidth="2.5" />
          {/* Main Crystal Arch Spire Structure */}
          <path d="M 535 240 Q 585 140 635 240 Z" fill="url(#dcDiamondGrad)" stroke="#38bdf8" strokeWidth="3" />

          {/* Floating Giant Diamond Core (Supreme Zenith at x: 585, y: 150) */}
          <g className="dc-floating-diamond-core dc-crystal-glow-cyan">
            {/* Giant Faceted Diamond */}
            <polygon points="585,90 615,160 585,210 555,160" fill="url(#dcDiamondGrad)" stroke="#ffffff" strokeWidth="3" />
            <polygon points="585,90 615,160 585,210" fill="#ffffff" opacity="0.5" />
            {/* Diamond Facet Lines */}
            <line x1="585" y1="90" x2="585" y2="210" stroke="#ffffff" strokeWidth="2" />
            <line x1="555" y1="160" x2="615" y2="160" stroke="#ffffff" strokeWidth="2" />
          </g>
        </g>

        {/* Grand Arched Palace Portal Doorway (x: 585, y: 410) */}
        <g id="dc-palace-doorway">
          <path d="M 560 410 L 560 340 Q 585 305 610 340 L 610 410 Z" fill="#ca8a04" stroke="#78350f" strokeWidth="3" />
          <rect x="566" y="345" width="18" height="65" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          <rect x="586" y="345" width="18" height="65" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          {/* Glowing Crystal Portal Halo */}
          <path d="M 552 410 Q 585 285 618 410" fill="none" stroke="#67e8f9" strokeWidth="4" className="dc-crystal-glow-cyan" />
        </g>

        {/* Cascading Marble Steps */}
        <g id="dc-palace-stairs">
          <rect x="545" y="410" width="80" height="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="535" y="418" width="100" height="8" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <rect x="525" y="426" width="120" height="8" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
        </g>
      </g>

      {/* ===================================================================
          9. BIOLUMINESCENT FANTASY TREES & MAGICAL FLORA
      =================================================================== */}
      <g id="dc-magical-flora">
        {/* Bioluminescent Pink & Violet Magic Trees */}
        {[
          { x: 75, y: 110, s: 1.2 },
          { x: 240, y: 640, s: 1.3 },
          { x: 460, y: 620, s: 1.2 },
          { x: 490, y: 840, s: 1.4 },
          { x: 710, y: 720, s: 1.3 },
          { x: 760, y: 120, s: 1.2 },
          { x: 960, y: 620, s: 1.3 },
        ].map((tr, i) => (
          <g key={`dc-tree-${i}`} filter="url(#dcShadow)">
            {/* Trunk */}
            <rect x={tr.x - 4 * tr.s} y={tr.y} width={8 * tr.s} height={20 * tr.s} fill="#312e81" stroke="#1e1b4b" strokeWidth="1" />
            {/* Deep Violet Canopy Base */}
            <circle cx={tr.x} cy={tr.y - 6 * tr.s} r={18 * tr.s} fill="#7e22ce" />
            <circle cx={tr.x - 9 * tr.s} cy={tr.y - 4 * tr.s} r={13 * tr.s} fill="#7e22ce" />
            <circle cx={tr.x + 9 * tr.s} cy={tr.y - 4 * tr.s} r={13 * tr.s} fill="#7e22ce" />
            {/* Glowing Magenta Mid Canopy */}
            <circle cx={tr.x} cy={tr.y - 12 * tr.s} r={15 * tr.s} fill="#d946ef" />
            <circle cx={tr.x - 7 * tr.s} cy={tr.y - 10 * tr.s} r={11 * tr.s} fill="#d946ef" />
            <circle cx={tr.x + 7 * tr.s} cy={tr.y - 10 * tr.s} r={11 * tr.s} fill="#d946ef" />
            {/* Bright Pastel Pink Sunlit Leaves */}
            <circle cx={tr.x - 2 * tr.s} cy={tr.y - 17 * tr.s} r={8 * tr.s} fill="#fbcfe8" />
            <circle cx={tr.x + 4 * tr.s} cy={tr.y - 15 * tr.s} r={7 * tr.s} fill="#ffffff" opacity="0.85" />
          </g>
        ))}

        {/* Enchanted Teal / Emerald Cypress Cones */}
        {[
          { x: 200, y: 220, h: 36 },
          { x: 300, y: 340, h: 42 },
          { x: 475, y: 700, h: 38 },
          { x: 670, y: 700, h: 42 },
          { x: 770, y: 350, h: 40 },
        ].map((cp, i) => (
          <g key={`dc-cypress-${i}`} filter="url(#dcShadow)">
            <rect x={cp.x - 3} y={cp.y} width={6} height="14" fill="#1e1b4b" />
            <polygon points={`${cp.x},${cp.y - cp.h} ${cp.x + 12},${cp.y} ${cp.x - 12},${cp.y}`} fill="#0f766e" />
            <polygon points={`${cp.x},${cp.y - cp.h - 8} ${cp.x + 10},${cp.y - 12} ${cp.x - 10},${cp.y - 12}`} fill="#06b6d4" />
            <polygon points={`${cp.x},${cp.y - cp.h - 14} ${cp.x + 7},${cp.y - 22} ${cp.x - 7},${cp.y - 22}`} fill="#67e8f9" />
          </g>
        ))}
      </g>

      {/* ===================================================================
          10. AMBIENT FLOATING MANA PARTICLES & STARDUST SPARKLES
      =================================================================== */}
      <g id="dc-ambient-particles" pointerEvents="none">
        <g className="dc-mana-1">
          <circle cx="585" cy="190" r="3.5" fill="#e0f2fe" opacity="0.95" />
        </g>
        <g className="dc-mana-2">
          <circle cx="585" cy="530" r="3" fill="#67e8f9" opacity="0.9" />
        </g>
        <g className="dc-mana-3">
          <circle cx="145" cy="850" r="3.5" fill="#a5b4fc" opacity="0.9" />
        </g>
        <g className="dc-mana-4">
          <circle cx="805" cy="780" r="3" fill="#f472b6" opacity="0.9" />
        </g>
      </g>
    </g>
  );
};
