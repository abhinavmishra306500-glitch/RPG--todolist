import React from 'react';
import {
  playGoldPalaceChime,
  playGoldFountainSound,
  playGoldMarketSound,
  playGoldShipSound,
  playGoldGateSound,
} from '../../utils/soundEffects';

/**
 * Handcrafted 16-Bit Pixel-Art Gold City (World 3) RPG Map
 * Faithfully recreating the grand fantasy capital design:
 * - Stately Stone Fortress Battlement Wall & Dual Arched Portcullis Gates (South)
 * - Grand Central Royal Palace / Cathedral with Golden Onion Domes & Blue Cupolas
 * - Grand Plaza with Hero Monument Statue & Ornate Victorian Street Lamps
 * - West District Bazaar Marketplace with Striped Stalls & Dual Fountains
 * - East Maritime Harbor with Pier Boardwalks, Red/White Pavilion, and Bobbing Ships
 * - Manicured Emerald Parks, Rose Gardens, and Floating Golden Magic Sparkles
 */
interface GoldCityWorldProps {
  onPalaceClick?: () => void;
  onFountainClick?: () => void;
}

export const GoldCityWorld: React.FC<GoldCityWorldProps> = ({ onPalaceClick, onFountainClick }) => {
  const handlePalaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGoldPalaceChime();
    if (onPalaceClick) onPalaceClick();
  };

  const handleFountainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGoldFountainSound();
    if (onFountainClick) onFountainClick();
  };

  const handleMarketClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGoldMarketSound();
  };

  const handleShipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGoldShipSound();
  };

  const handleGateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGoldGateSound();
  };

  return (
    <g id="gold-city-rpg-world">
      <defs>
        {/* CSS Animations for Ambient Capital City Life */}
        <style>
          {`
            @keyframes gcShipBob {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-5px) rotate(1.5deg); }
            }
            .gc-ship-1 {
              transform-origin: 930px 320px;
              animation: gcShipBob 4.2s ease-in-out infinite;
            }
            .gc-ship-2 {
              transform-origin: 940px 540px;
              animation: gcShipBob 4.8s ease-in-out infinite 1.2s;
            }
            .gc-ship-3 {
              transform-origin: 910px 710px;
              animation: gcShipBob 3.9s ease-in-out infinite 0.6s;
            }

            @keyframes gcFountainPulse {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.15); opacity: 0.5; }
            }
            .gc-fountain-ripple-w {
              transform-origin: 335px 690px;
              animation: gcFountainPulse 2.2s ease-in-out infinite;
            }
            .gc-fountain-ripple-nw {
              transform-origin: 230px 280px;
              animation: gcFountainPulse 2.6s ease-in-out infinite 0.8s;
            }

            @keyframes gcBannerWave {
              0%, 100% { transform: skewY(0deg); }
              50% { transform: skewY(3deg); }
            }
            .gc-banner {
              transform-origin: top center;
              animation: gcBannerWave 3s ease-in-out infinite;
            }

            @keyframes gcGoldSparkle {
              0% { transform: translateY(0) scale(0.6); opacity: 0; }
              40% { opacity: 0.95; }
              80% { opacity: 0.9; }
              100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
            }
            .gc-sparkle-1 { animation: gcGoldSparkle 3.5s ease-out infinite; }
            .gc-sparkle-2 { animation: gcGoldSparkle 4.2s ease-out infinite 1.1s; }
            .gc-sparkle-3 { animation: gcGoldSparkle 3.8s ease-out infinite 2.2s; }
            .gc-sparkle-4 { animation: gcGoldSparkle 4.5s ease-out infinite 0.5s; }

            @keyframes gcWaterWave {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 24; }
            }
            .gc-water-shimmer {
              stroke-dasharray: 6 6;
              animation: gcWaterWave 2s linear infinite;
            }

            @keyframes gcLampGlow {
              0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 6px #facc15); }
              50% { opacity: 1; filter: drop-shadow(0 0 12px #fde047); }
            }
            .gc-lamp-light {
              animation: gcLampGlow 2.5s ease-in-out infinite;
            }
          `}
        </style>

        {/* 1. Base Marble & Paved Cobblestone Pattern */}
        <pattern id="gcMarblePave" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#cbd5e1" />
          <rect x="0" y="0" width="12" height="12" fill="#e2e8f0" />
          <rect x="12" y="12" width="12" height="12" fill="#f1f5f9" />
          <line x1="0" y1="12" x2="24" y2="12" stroke="#94a3b8" strokeWidth="1" />
          <line x1="12" y1="0" x2="12" y2="24" stroke="#94a3b8" strokeWidth="1" />
        </pattern>

        {/* 2. Plaza Cobble Hex Tile */}
        <pattern id="gcPlazaTile" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="#94a3b8" />
          <polygon points="15,2 28,10 28,20 15,28 2,20 2,10" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="3" fill="#e2e8f0" />
        </pattern>

        {/* 3. Manicured Royal Lawn Grass Pattern */}
        <pattern id="gcRoyalLawn" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill="#15803d" />
          <rect x="0" y="0" width="16" height="16" fill="#16a34a" opacity="0.35" />
          <rect x="16" y="16" width="16" height="16" fill="#166534" opacity="0.4" />
          <rect x="6" y="6" width="2" height="5" fill="#4ade80" opacity="0.5" />
          <rect x="22" y="22" width="2" height="5" fill="#86efac" opacity="0.5" />
        </pattern>

        {/* 4. Ocean Harbor Water Gradient */}
        <linearGradient id="gcOceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="40%" stopColor="#0369a1" />
          <stop offset="80%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        {/* 5. Gilded Roof Metallic Gradient */}
        <linearGradient id="gcGoldRoofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="30%" stopColor="#facc15" />
          <stop offset="70%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>

        {/* 6. Royal Blue Cupola Gradient */}
        <linearGradient id="gcRoyalBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="35%" stopColor="#2563eb" />
          <stop offset="75%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* 7. Stone Masonry Wall Texture Pattern */}
        <pattern id="gcStoneWallPattern" width="20" height="12" patternUnits="userSpaceOnUse">
          <rect width="20" height="12" fill="#64748b" />
          <rect x="0" y="0" width="10" height="6" fill="#94a3b8" stroke="#475569" strokeWidth="0.8" />
          <rect x="10" y="0" width="10" height="6" fill="#64748b" stroke="#475569" strokeWidth="0.8" />
          <rect x="5" y="6" width="10" height="6" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
          <rect x="15" y="6" width="5" height="6" fill="#94a3b8" stroke="#475569" strokeWidth="0.8" />
          <rect x="0" y="6" width="5" height="6" fill="#64748b" stroke="#475569" strokeWidth="0.8" />
        </pattern>

        {/* 8. Drop Shadows */}
        <filter id="gcShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="3" dy="8" stdDeviation="5" floodColor="#020617" floodOpacity="0.65" />
        </filter>
        <filter id="gcBigPalaceShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="4" dy="14" stdDeviation="8" floodColor="#020617" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* ===================================================================
          1. BASE CITY PAVING & HARBOR OCEAN
      =================================================================== */}
      {/* Base Marble Streets */}
      <rect width="1000" height="1000" fill="url(#gcMarblePave)" />

      {/* East Maritime Ocean Body (x: 860 to 1000) */}
      <path
        d="M 860 -10 L 1010 -10 L 1010 1010 L 880 1010 Q 860 880 870 760 Q 855 640 870 520 Q 855 380 865 240 Q 850 120 860 -10 Z"
        fill="url(#gcOceanGrad)"
      />

      {/* Ocean Coastal Surf & Shimmer Wave Lines */}
      <g stroke="#bae6fd" strokeWidth="2" opacity="0.6" strokeLinecap="round">
        <line x1="875" y1="80" x2="980" y2="80" className="gc-water-shimmer" />
        <line x1="885" y1="180" x2="990" y2="180" className="gc-water-shimmer" />
        <line x1="870" y1="360" x2="975" y2="360" className="gc-water-shimmer" />
        <line x1="880" y1="580" x2="990" y2="580" className="gc-water-shimmer" />
        <line x1="890" y1="780" x2="995" y2="780" className="gc-water-shimmer" />
        <line x1="885" y1="920" x2="980" y2="920" className="gc-water-shimmer" />
      </g>

      {/* Manicured City Parks & Green Lawns */}
      <g id="gc-parks">
        {/* Northwest Noble Gardens */}
        <rect x="18" y="180" width="140" height="160" rx="6" fill="url(#gcRoyalLawn)" stroke="#ca8a04" strokeWidth="2.5" />
        {/* West Central Park Strip */}
        <path d="M 280 200 L 410 200 L 410 380 L 370 410 L 280 410 Z" fill="url(#gcRoyalLawn)" stroke="#ca8a04" strokeWidth="2" />
        {/* South-West Garden Plot */}
        <rect x="25" y="700" width="130" height="130" rx="4" fill="url(#gcRoyalLawn)" stroke="#ca8a04" strokeWidth="2" />
        {/* East Palace Park Wing */}
        <path d="M 645 200 L 730 200 L 730 380 L 645 380 Z" fill="url(#gcRoyalLawn)" stroke="#ca8a04" strokeWidth="2" />
        {/* South-East Citadel Garden */}
        <rect x="650" y="700" width="65" height="130" rx="4" fill="url(#gcRoyalLawn)" stroke="#ca8a04" strokeWidth="2" />
      </g>

      {/* ===================================================================
          2. GRAND ESPLANADE & CENTRAL PLAZAS
      =================================================================== */}
      <g id="gc-plazas">
        {/* Grand Palace Plaza (Center at x: 585, y: 640) */}
        <ellipse cx="585" cy="640" rx="95" ry="60" fill="url(#gcPlazaTile)" stroke="#a16207" strokeWidth="3" />
        <ellipse cx="585" cy="640" rx="85" ry="50" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="8 4" />

        {/* West Fountain Plaza (x: 335, y: 690) */}
        <circle cx="335" cy="690" r="48" fill="url(#gcPlazaTile)" stroke="#475569" strokeWidth="2.5" />
        <circle cx="335" cy="690" r="42" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 3" />

        {/* Upper Northwest Fountain Plaza (x: 230, y: 280) */}
        <circle cx="230" cy="280" r="40" fill="url(#gcPlazaTile)" stroke="#475569" strokeWidth="2" />
      </g>

      {/* ===================================================================
          3. MARITIME HARBOR PIERS & BOARDWALKS (East Ocean Waterfront)
      =================================================================== */}
      <g id="gc-harbor-piers" filter="url(#gcShadow)">
        {/* North Stone Sea Wall Quayside */}
        <rect x="850" y="0" width="22" height="1000" fill="#64748b" stroke="#334155" strokeWidth="2" />
        <rect x="852" y="0" width="6" height="1000" fill="#94a3b8" />

        {/* Harbor Main Pier 1 (Top Pier at y: 260) */}
        <g id="gc-pier-1">
          <rect x="855" y="245" width="110" height="24" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          {[865, 880, 895, 910, 925, 940, 955].map((px, i) => (
            <line key={`pier1-plank-${i}`} x1={px} y1="245" x2={px} y2="269" stroke="#451a03" strokeWidth="1.5" />
          ))}
          <circle cx="960" cy="257" r="3.5" fill="#facc15" stroke="#78350f" strokeWidth="1" />
        </g>

        {/* Harbor Main Pier 2 (Mid Boardwalk at y: 690 - 750) */}
        <g id="gc-pier-2">
          <rect x="740" y="685" width="145" height="42" rx="3" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
          {[750, 765, 780, 795, 810, 825, 840, 855, 870].map((px, i) => (
            <line key={`pier2-plank-${i}`} x1={px} y1="685" x2={px} y2="727" stroke="#451a03" strokeWidth="1.5" />
          ))}
          {/* Heavy Timber Mooring Posts */}
          <circle cx="750" cy="690" r="4" fill="#451a03" />
          <circle cx="820" cy="690" r="4" fill="#451a03" />
          <circle cx="875" cy="690" r="4" fill="#451a03" />
          <circle cx="750" cy="722" r="4" fill="#451a03" />
          <circle cx="820" cy="722" r="4" fill="#451a03" />
          <circle cx="875" cy="722" r="4" fill="#451a03" />
          {/* Dock Cargo Crates & Barrels */}
          <rect x="756" y="694" width="14" height="14" fill="#b45309" stroke="#78350f" strokeWidth="1" />
          <rect x="772" y="696" width="12" height="12" fill="#d97706" stroke="#78350f" strokeWidth="1" />
          <circle cx="762" cy="716" r="5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
        </g>

        {/* Pier Extension 3 (South Finger Pier at y: 790) */}
        <g id="gc-pier-3">
          <rect x="855" y="780" width="85" height="20" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          {[865, 880, 895, 910, 925].map((px, i) => (
            <line key={`pier3-plank-${i}`} x1={px} y1="780" x2={px} y2="800" stroke="#451a03" strokeWidth="1.5" />
          ))}
        </g>
      </g>

      {/* ===================================================================
          4. BOBBING GOLDEN AGE CARAVELS / SAILING SHIPS
      =================================================================== */}
      <g
        id="gc-sailing-ships"
        filter="url(#gcShadow)"
        onClick={handleShipClick}
        className="cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Ship 1 (Top Ocean Caravel at x: 935, y: 310) */}
        <g className="gc-ship-1">
          {/* Wooden Hull */}
          <path d="M 890 320 Q 935 345 980 320 L 975 305 L 895 305 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <rect x="915" y="302" width="40" height="5" fill="#ca8a04" />
          {/* Mast & Spars */}
          <line x1="935" y1="305" x2="935" y2="235" stroke="#451a03" strokeWidth="3" />
          <line x1="910" y1="255" x2="960" y2="255" stroke="#451a03" strokeWidth="2" />
          {/* Billowing White/Gold Canvas Sail */}
          <path d="M 912 255 Q 935 242 958 255 Q 948 290 912 290 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Masthead Royal Gold Flag */}
          <polygon points="935,235 955,242 935,249" fill="#dc2626" />
        </g>

        {/* Ship 2 (Mid Ocean Caravel at x: 945, y: 530) */}
        <g className="gc-ship-2">
          <path d="M 905 540 Q 945 565 985 540 L 980 525 L 910 525 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <rect x="925" y="522" width="40" height="5" fill="#ca8a04" />
          <line x1="945" y1="525" x2="945" y2="455" stroke="#451a03" strokeWidth="3" />
          <line x1="920" y1="475" x2="970" y2="475" stroke="#451a03" strokeWidth="2" />
          <path d="M 922 475 Q 945 462 968 475 Q 958 510 922 510 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <polygon points="945,455 965,462 945,469" fill="#2563eb" />
        </g>

        {/* Ship 3 (South Ocean Caravel at x: 915, y: 700) */}
        <g className="gc-ship-3">
          <path d="M 875 710 Q 915 735 955 710 L 950 695 L 880 695 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <line x1="915" y1="695" x2="915" y2="625" stroke="#451a03" strokeWidth="3" />
          <line x1="890" y1="645" x2="940" y2="645" stroke="#451a03" strokeWidth="2" />
          <path d="M 892 645 Q 915 632 938 645 Q 928 680 892 680 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <polygon points="915,625 935,632 915,639" fill="#16a34a" />
        </g>
      </g>

      {/* ===================================================================
          5. BAZAAR MARKETPLACE & STRIPED CANOPY STALLS (West District)
      =================================================================== */}
      <g
        id="gc-west-bazaar"
        filter="url(#gcShadow)"
        onClick={handleMarketClick}
        className="cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Stall 1 (Orange & Yellow Striped Awning at x: 170, y: 640) */}
        <g id="gc-stall-1">
          <rect x="150" y="635" width="48" height="28" fill="#ffedd5" stroke="#78350f" strokeWidth="1.5" />
          <path d="M 146 635 L 202 635 L 198 648 L 150 648 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
          <line x1="158" y1="635" x2="158" y2="648" stroke="#fde047" strokeWidth="3.5" />
          <line x1="172" y1="635" x2="172" y2="648" stroke="#fde047" strokeWidth="3.5" />
          <line x1="186" y1="635" x2="186" y2="648" stroke="#fde047" strokeWidth="3.5" />
          <rect x="156" y="648" width="12" height="15" fill="#78350f" />
          <circle cx="180" cy="652" r="3.5" fill="#ef4444" />
          <circle cx="190" cy="652" r="3.5" fill="#22c55e" />
        </g>

        {/* Stall 2 (Blue & White Striped Awning at x: 230, y: 640) */}
        <g id="gc-stall-2">
          <rect x="210" y="635" width="48" height="28" fill="#eff6ff" stroke="#1e3a8a" strokeWidth="1.5" />
          <path d="M 206 635 L 262 635 L 258 648 L 210 648 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
          <line x1="218" y1="635" x2="218" y2="648" stroke="#ffffff" strokeWidth="3.5" />
          <line x1="232" y1="635" x2="232" y2="648" stroke="#ffffff" strokeWidth="3.5" />
          <line x1="246" y1="635" x2="246" y2="648" stroke="#ffffff" strokeWidth="3.5" />
          <rect x="216" y="648" width="12" height="15" fill="#78350f" />
          <circle cx="240" cy="652" r="3.5" fill="#facc15" />
          <circle cx="250" cy="652" r="3.5" fill="#a855f7" />
        </g>

        {/* Stall 3 (Red & Gold Striped Awning at x: 190, y: 560) */}
        <g id="gc-stall-3">
          <rect x="170" y="555" width="52" height="30" fill="#fef2f2" stroke="#7f1d1d" strokeWidth="1.5" />
          <path d="M 166 555 L 226 555 L 222 568 L 170 568 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
          <line x1="178" y1="555" x2="178" y2="568" stroke="#facc15" strokeWidth="4" />
          <line x1="196" y1="555" x2="196" y2="568" stroke="#facc15" strokeWidth="4" />
          <line x1="214" y1="555" x2="214" y2="568" stroke="#facc15" strokeWidth="4" />
        </g>

        {/* Grand Harbor Bazaar Pavilion Tent (East District at x: 815, y: 480) */}
        <g
          id="gc-harbor-pavilion"
          onClick={handleMarketClick}
          className="cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <path d="M 785 520 L 815 450 L 845 520 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          {/* White Circus / Royal Stripes */}
          <polygon points="795,520 815,450 805,520" fill="#ffffff" />
          <polygon points="825,520 815,450 835,520" fill="#ffffff" />
          {/* Gold Finial Crest */}
          <circle cx="815" cy="448" r="4" fill="#facc15" stroke="#a16207" strokeWidth="1" />
          {/* Pavilion Walls */}
          <rect x="790" y="520" width="50" height="26" fill="#fef2f2" stroke="#7f1d1d" strokeWidth="1.5" />
          <rect x="806" y="526" width="18" height="20" rx="3" fill="#78350f" />
        </g>
      </g>

      {/* ===================================================================
          6. FOUNTAINS OF GOLD CITY (West Plaza & Northwest Garden)
      =================================================================== */}
      <g id="gc-fountains" filter="url(#gcShadow)">
        {/* West Lower Plaza Fountain (x: 335, y: 690) */}
        <g
          id="gc-fountain-west"
          onClick={handleFountainClick}
          className="cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Outer Stone Basin */}
          <ellipse cx="335" cy="690" rx="34" ry="22" fill="#64748b" stroke="#334155" strokeWidth="3" />
          <ellipse cx="335" cy="690" rx="30" ry="18" fill="url(#gcRoyalBlueGrad)" />
          <ellipse cx="335" cy="690" rx="24" ry="14" fill="none" stroke="#bae6fd" strokeWidth="2" className="gc-fountain-ripple-w" />
          {/* Golden Lion Pedestal Column */}
          <rect x="331" y="660" width="8" height="26" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
          <circle cx="335" cy="658" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
          {/* Water Jets */}
          <g stroke="#ffffff" strokeWidth="2" opacity="0.9" strokeLinecap="round">
            <path d="M 335 654 Q 320 644 316 675" fill="none" />
            <path d="M 335 654 Q 350 644 354 675" fill="none" />
            <circle cx="316" cy="678" r="2.5" fill="#bae6fd" />
            <circle cx="354" cy="678" r="2.5" fill="#bae6fd" />
          </g>
        </g>

        {/* Northwest Garden Fountain (x: 230, y: 280) */}
        <g
          id="gc-fountain-nw"
          onClick={handleFountainClick}
          className="cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <ellipse cx="230" cy="280" rx="28" ry="18" fill="#64748b" stroke="#334155" strokeWidth="2.5" />
          <ellipse cx="230" cy="280" rx="24" ry="14" fill="url(#gcRoyalBlueGrad)" />
          <ellipse cx="230" cy="280" rx="18" ry="10" fill="none" stroke="#bae6fd" strokeWidth="1.5" className="gc-fountain-ripple-nw" />
          <rect x="227" y="258" width="6" height="20" fill="#facc15" stroke="#713f12" strokeWidth="1" />
          <circle cx="230" cy="256" r="4.5" fill="#fde047" stroke="#a16207" strokeWidth="1" />
        </g>
      </g>

      {/* ===================================================================
          7. MONUMENTS & GILDED RESIDENCES
      =================================================================== */}
      <g id="gc-monuments-and-mansions" filter="url(#gcShadow)">
        {/* Grand Plaza Hero Knight Statue (x: 585, y: 640) */}
        <g id="gc-hero-statue">
          {/* Carved Marble Pedestal Base */}
          <rect x="572" y="645" width="26" height="18" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          <rect x="570" y="660" width="30" height="5" rx="1" fill="#64748b" />
          {/* Sculpted Stone Hero Knight (Shield & Raised Sword) */}
          <circle cx="585" cy="625" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
          <path d="M 580 630 L 590 630 L 592 645 L 578 645 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
          {/* Golden Knight Sword */}
          <line x1="591" y1="620" x2="591" y2="642" stroke="#facc15" strokeWidth="2" />
          {/* Golden Knight Shield */}
          <ellipse cx="578" cy="636" rx="4" ry="6" fill="#facc15" stroke="#a16207" strokeWidth="1" />
        </g>

        {/* Ornate Black & Gold Victorian Street Lamps */}
        {[
          { x: 495, y: 620 },
          { x: 675, y: 620 },
          { x: 125, y: 390 },
          { x: 300, y: 390 },
          { x: 740, y: 390 },
          { x: 800, y: 610 },
        ].map((lamp, i) => (
          <g key={`gc-lamp-${i}`} id={`gc-lamp-${i}`}>
            <rect x={lamp.x - 2} y={lamp.y - 18} width="4" height="20" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
            <circle cx={lamp.x} cy={lamp.y - 20} r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" className="gc-lamp-light" />
            <circle cx={lamp.x} cy={lamp.y - 20} r="2.5" fill="#ffffff" />
          </g>
        ))}

        {/* Northwest Gold-Roofed Guildhall (x: 75, y: 130) */}
        <g id="gc-guildhall-nw">
          <rect x="45" y="110" width="60" height="46" rx="3" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
          <path d="M 38 115 L 75 65 L 112 115 Z" fill="url(#gcGoldRoofGrad)" stroke="#78350f" strokeWidth="2.5" />
          <circle cx="75" cy="62" r="5" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          <rect x="68" y="128" width="14" height="28" rx="2" fill="#78350f" />
          <rect x="52" y="122" width="10" height="12" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
          <rect x="88" y="122" width="10" height="12" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
        </g>

        {/* Southwest Gilded Manor (x: 65, y: 580) */}
        <g id="gc-manor-sw">
          <rect x="35" y="555" width="60" height="48" rx="3" fill="#ffedd5" stroke="#78350f" strokeWidth="2.5" />
          <path d="M 28 560 L 65 505 L 102 560 Z" fill="url(#gcGoldRoofGrad)" stroke="#78350f" strokeWidth="2.5" />
          <rect x="58" y="575" width="14" height="28" rx="2" fill="#78350f" />
          <rect x="42" y="570" width="10" height="12" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
          <rect x="78" y="570" width="10" height="12" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
        </g>

        {/* Northeast Admiral's Customs House (x: 805, y: 280) */}
        <g id="gc-customs-ne">
          <rect x="775" y="260" width="60" height="45" rx="3" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
          <path d="M 768 265 L 805 215 L 842 265 Z" fill="url(#gcGoldRoofGrad)" stroke="#78350f" strokeWidth="2" />
          <rect x="798" y="278" width="14" height="27" rx="2" fill="#78350f" />
        </g>
      </g>

      {/* ===================================================================
          8. GRAND CENTRAL ROYAL PALACE / CATHEDRAL (The Crown of Gold City)
      =================================================================== */}
      <g
        id="gc-grand-royal-palace"
        filter="url(#gcBigPalaceShadow)"
        onClick={handlePalaceClick}
        className="cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Main Central Palace Stone Bastion Block */}
        <rect x="440" y="220" width="210" height="175" rx="5" fill="#f1f5f9" stroke="#475569" strokeWidth="3.5" />
        {/* Stone Balustrade Level Lines */}
        <line x1="440" y1="280" x2="650" y2="280" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="440" y1="340" x2="650" y2="340" stroke="#cbd5e1" strokeWidth="3" />

        {/* Left Palace Tower Wing (x: 465, y: 230) */}
        <g id="gc-palace-left-wing">
          <rect x="445" y="260" width="45" height="135" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          {/* Royal Blue Dome Cupola */}
          <path d="M 442 260 Q 467.5 200 493 260 Z" fill="url(#gcRoyalBlueGrad)" stroke="#1e3a8a" strokeWidth="2" />
          {/* Golden Spire & Finial */}
          <rect x="465" y="170" width="5" height="35" fill="#facc15" stroke="#78350f" strokeWidth="1" />
          <circle cx="467.5" cy="168" r="4.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        </g>

        {/* Right Palace Tower Wing (x: 625, y: 230) */}
        <g id="gc-palace-right-wing">
          <rect x="600" y="260" width="45" height="135" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          {/* Royal Blue Dome Cupola */}
          <path d="M 597 260 Q 622.5 200 648 260 Z" fill="url(#gcRoyalBlueGrad)" stroke="#1e3a8a" strokeWidth="2" />
          {/* Golden Spire & Finial */}
          <rect x="620" y="170" width="5" height="35" fill="#facc15" stroke="#78350f" strokeWidth="1" />
          <circle cx="622.5" cy="168" r="4.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        </g>

        {/* Grand Center Supreme Onion Dome & Spire (Crown of Palace at x: 545, y: 140) */}
        <g id="gc-palace-center-dome">
          {/* Outer Gilded Dome Base */}
          <path d="M 505 225 Q 545 130 585 225 Z" fill="url(#gcRoyalBlueGrad)" stroke="#1e3a8a" strokeWidth="3" />
          {/* Massive Golden Onion Dome Core */}
          <path d="M 515 225 Q 545 110 575 225 Z" fill="url(#gcGoldRoofGrad)" stroke="#78350f" strokeWidth="2.5" />
          {/* Supreme Gold Crown Spire */}
          <rect x="542" y="70" width="6" height="50" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          <circle cx="545" cy="65" r="7" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <polygon points="545,45 549,58 541,58" fill="#facc15" />
        </g>

        {/* Palace Grand Arched Entrance Portal (x: 545, y: 395) */}
        <g id="gc-palace-portal">
          <path d="M 520 395 L 520 320 Q 545 285 570 320 L 570 395 Z" fill="#ca8a04" stroke="#78350f" strokeWidth="3" />
          {/* Golden Double Doors */}
          <rect x="525" y="325" width="19" height="70" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          <rect x="546" y="325" width="19" height="70" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          <circle cx="540" cy="360" r="2.5" fill="#451a03" />
          <circle cx="550" cy="360" r="2.5" fill="#451a03" />
          {/* Royal Heraldic Banners (Flanking Portal) */}
          <g className="gc-banner">
            <rect x="500" y="310" width="14" height="45" rx="2" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <polygon points="500,355 507,348 514,355" fill="#f1f5f9" />
            <circle cx="507" cy="325" r="3" fill="#facc15" />
          </g>
          <g className="gc-banner">
            <rect x="576" y="310" width="14" height="45" rx="2" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <polygon points="576,355 583,348 590,355" fill="#f1f5f9" />
            <circle cx="583" cy="325" r="3" fill="#facc15" />
          </g>
        </g>

        {/* Grand Marble Staircase (Cascading Down from Palace Portal) */}
        <g id="gc-palace-stairs">
          <rect x="505" y="395" width="80" height="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="495" y="403" width="100" height="8" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <rect x="485" y="411" width="120" height="8" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
        </g>
      </g>

      {/* ===================================================================
          9. SOUTH FORTRESS BATTLEMENT WALL & DUAL GATES (Bottom of World)
      =================================================================== */}
      <g
        id="gc-citadel-wall"
        filter="url(#gcShadow)"
        onClick={handleGateClick}
        className="cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Stone Masonry Wall Foundation (Spanning entire width at y: 840 to 980) */}
        <rect x="-10" y="860" width="1020" height="120" fill="url(#gcStoneWallPattern)" stroke="#334155" strokeWidth="3" />
        {/* Upper Crenellations (Teeth) */}
        {[0, 40, 80, 120, 160, 200, 240, 280, 420, 460, 500, 640, 680, 720, 760, 800, 840, 880, 920, 960].map((cx, i) => (
          <rect key={`cren-${i}`} x={cx} y="845" width="22" height="18" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        ))}

        {/* West Arched Gatehouse (x: 345, y: 880) */}
        <g id="gc-gate-west">
          <rect x="310" y="820" width="70" height="140" fill="#475569" stroke="#1e293b" strokeWidth="3" />
          {/* Twin Flanking Turrets */}
          <rect x="298" y="805" width="20" height="160" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
          <rect x="372" y="805" width="20" height="160" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
          {/* Golden Onion Roofs on Turrets */}
          <path d="M 296 805 Q 308 775 320 805 Z" fill="url(#gcGoldRoofGrad)" stroke="#78350f" strokeWidth="1.5" />
          <path d="M 370 805 Q 382 775 394 805 Z" fill="url(#gcGoldRoofGrad)" stroke="#78350f" strokeWidth="1.5" />
          {/* Golden Arched Portcullis */}
          <path d="M 322 960 L 322 880 Q 345 845 368 880 L 368 960 Z" fill="#ca8a04" stroke="#78350f" strokeWidth="2.5" />
          {/* Portcullis Iron Grate */}
          <line x1="334" y1="860" x2="334" y2="960" stroke="#451a03" strokeWidth="2" />
          <line x1="345" y1="850" x2="345" y2="960" stroke="#451a03" strokeWidth="2" />
          <line x1="356" y1="860" x2="356" y2="960" stroke="#451a03" strokeWidth="2" />
          <line x1="322" y1="895" x2="368" y2="895" stroke="#451a03" strokeWidth="2" />
          <line x1="322" y1="925" x2="368" y2="925" stroke="#451a03" strokeWidth="2" />
          {/* Royal Red Banners */}
          <rect x="303" y="860" width="10" height="35" fill="#dc2626" />
          <rect x="377" y="860" width="10" height="35" fill="#dc2626" />
        </g>

        {/* East Arched Gatehouse (x: 580, y: 880) */}
        <g id="gc-gate-east">
          <rect x="540" y="820" width="80" height="140" fill="#475569" stroke="#1e293b" strokeWidth="3" />
          <rect x="528" y="805" width="20" height="160" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
          <rect x="612" y="805" width="20" height="160" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
          <path d="M 526 805 Q 538 775 550 805 Z" fill="url(#gcRoyalBlueGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
          <path d="M 610 805 Q 622 775 634 805 Z" fill="url(#gcRoyalBlueGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
          <path d="M 552 960 L 552 880 Q 580 845 608 880 L 608 960 Z" fill="#ca8a04" stroke="#78350f" strokeWidth="2.5" />
          {/* Portcullis Grate */}
          <line x1="565" y1="860" x2="565" y2="960" stroke="#451a03" strokeWidth="2" />
          <line x1="580" y1="850" x2="580" y2="960" stroke="#451a03" strokeWidth="2" />
          <line x1="595" y1="860" x2="595" y2="960" stroke="#451a03" strokeWidth="2" />
          {/* Royal Blue Banners */}
          <rect x="533" y="860" width="10" height="35" fill="#2563eb" />
          <rect x="617" y="860" width="10" height="35" fill="#2563eb" />
        </g>
      </g>

      {/* ===================================================================
          10. CITY FOLIAGE, CYPRESS TREES, FLOWERBEDS & AMBIENT SPARKLES
      =================================================================== */}
      <g id="gc-city-foliage">
        {/* Manicured Royal Cypress / Cone Pine Trees */}
        {[
          { x: 190, y: 220, h: 36 },
          { x: 340, y: 240, h: 42 },
          { x: 390, y: 310, h: 46 },
          { x: 440, y: 460, h: 40 },
          { x: 670, y: 460, h: 40 },
          { x: 720, y: 310, h: 46 },
          { x: 740, y: 230, h: 38 },
          { x: 270, y: 730, h: 38 },
          { x: 650, y: 730, h: 42 },
        ].map((cp, i) => (
          <g key={`gc-cypress-${i}`} filter="url(#gcShadow)">
            <rect x={cp.x - 3} y={cp.y} width="6" height="14" fill="#451a03" />
            <polygon points={`${cp.x},${cp.y - cp.h} ${cp.x + 12},${cp.y} ${cp.x - 12},${cp.y}`} fill="#166534" />
            <polygon points={`${cp.x},${cp.y - cp.h - 8} ${cp.x + 10},${cp.y - 12} ${cp.x - 10},${cp.y - 12}`} fill="#15803d" />
            <polygon points={`${cp.x},${cp.y - cp.h - 14} ${cp.x + 7},${cp.y - 22} ${cp.x - 7},${cp.y - 22}`} fill="#22c55e" />
          </g>
        ))}

        {/* Flowering Golden & Red Rose Bushes */}
        {[
          { x: 140, y: 740, c: '#facc15' },
          { x: 155, y: 765, c: '#dc2626' },
          { x: 280, y: 260, c: '#facc15' },
          { x: 310, y: 270, c: '#dc2626' },
          { x: 470, y: 490, c: '#facc15' },
          { x: 640, y: 490, c: '#facc15' },
          { x: 700, y: 750, c: '#dc2626' },
          { x: 715, y: 770, c: '#facc15' },
        ].map((rb, i) => (
          <g key={`gc-rose-${i}`}>
            <circle cx={rb.x} cy={rb.y} r="6" fill="#15803d" />
            <circle cx={rb.x} cy={rb.y} r="3" fill={rb.c} />
          </g>
        ))}
      </g>

      {/* ===================================================================
          11. AMBIENT FLOATING GOLDEN PARTICLES / SPARKLES
      =================================================================== */}
      <g id="gc-ambient-sparkles" pointerEvents="none">
        <g className="gc-sparkle-1">
          <circle cx="545" cy="180" r="3.5" fill="#fef08a" opacity="0.9" />
        </g>
        <g className="gc-sparkle-2">
          <circle cx="585" cy="580" r="3" fill="#fde047" opacity="0.85" />
        </g>
        <g className="gc-sparkle-3">
          <circle cx="335" cy="670" r="3" fill="#facc15" opacity="0.85" />
        </g>
        <g className="gc-sparkle-4">
          <circle cx="815" cy="460" r="3.5" fill="#fef08a" opacity="0.9" />
        </g>
      </g>
    </g>
  );
};
