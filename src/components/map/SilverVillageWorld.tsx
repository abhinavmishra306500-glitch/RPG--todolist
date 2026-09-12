import React from 'react';
import { playSilverFountainSound } from '../../utils/soundEffects';

/**
 * Handcrafted 16-Bit Pixel-Art Silver Village (World 2) RPG Map
 * Faithfully recreating the rich fantasy village layout from the reference design:
 * - Elevated Windmill in the northwest hill
 * - Cascading Left and Top-Right Waterfalls into a winding river
 * - Two Curved Timber Bridges crossing the river
 * - Grand Circular Cobblestone Plaza with Animated Stone Fountain
 * - Village Shops with Striped Awnings & Cozy Red/Blue/Green Cottages
 * - Fenced East Farmland with Golden Wheat Crops
 * - Lush Oak, Pine, and Pink Sakura Cherry Blossom Trees
 * - Animated Water, Chimney Smoke, Windmill, and Sakura Petal Breeze
 */
interface SilverVillageWorldProps {
  onFountainClick?: () => void;
}

export const SilverVillageWorld: React.FC<SilverVillageWorldProps> = ({ onFountainClick }) => {
  const handleFountainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSilverFountainSound();
    if (onFountainClick) onFountainClick();
  };

  return (
    <g id="silver-village-rpg-world">
      <defs>
        {/* CSS Animations for Ambient Village Life */}
        <style>
          {`
            @keyframes svWindmillSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .sv-windmill-blades {
              transform-origin: 110px 95px;
              animation: svWindmillSpin 12s linear infinite;
            }

            @keyframes svWaterFlow {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 32; }
            }
            .sv-waterfall-flow {
              stroke-dasharray: 8 6;
              animation: svWaterFlow 1s linear infinite;
            }
            .sv-waterfall-foam {
              stroke-dasharray: 4 4;
              animation: svWaterFlow 0.6s linear infinite;
            }

            @keyframes svFountainPulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.18); opacity: 0.45; }
            }
            .sv-fountain-ripple {
              transform-origin: 335px 455px;
              animation: svFountainPulse 2.4s ease-in-out infinite;
            }

            @keyframes svSmokeDrift {
              0% { transform: translateY(0) scale(0.8); opacity: 0.7; }
              50% { transform: translateY(-14px) translateX(4px) scale(1.2); opacity: 0.4; }
              100% { transform: translateY(-28px) translateX(10px) scale(1.6); opacity: 0; }
            }
            .sv-smoke-1 { animation: svSmokeDrift 3s ease-out infinite; }
            .sv-smoke-2 { animation: svSmokeDrift 3.5s ease-out infinite 1.2s; }
            .sv-smoke-3 { animation: svSmokeDrift 3.2s ease-out infinite 0.6s; }

            @keyframes svPetalDrift {
              0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
              20% { opacity: 0.9; }
              80% { opacity: 0.9; }
              100% { transform: translate(60px, 80px) rotate(180deg); opacity: 0; }
            }
            .sv-petal-1 { animation: svPetalDrift 6s ease-in-out infinite; }
            .sv-petal-2 { animation: svPetalDrift 7s ease-in-out infinite 2s; }
            .sv-petal-3 { animation: svPetalDrift 5.5s ease-in-out infinite 3.5s; }
            .sv-petal-4 { animation: svPetalDrift 8s ease-in-out infinite 1s; }

            @keyframes svTreeSway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(1.2deg); }
            }
            .sv-tree-sway {
              transform-origin: bottom center;
              animation: svTreeSway 4s ease-in-out infinite;
            }
          `}
        </style>

        {/* 1. Base Meadow Grass Pattern */}
        <pattern id="svGrassTile" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#40916c" />
          <rect x="0" y="0" width="20" height="20" fill="#52b788" opacity="0.25" />
          <rect x="20" y="20" width="20" height="20" fill="#2d6a4f" opacity="0.3" />
          {/* Subtle grass tufts */}
          <rect x="6" y="8" width="2" height="5" fill="#74c69d" opacity="0.4" />
          <rect x="8" y="6" width="2" height="7" fill="#95d5b2" opacity="0.45" />
          <rect x="26" y="24" width="2" height="5" fill="#52b788" opacity="0.4" />
          <rect x="28" y="22" width="2" height="7" fill="#b7e4c7" opacity="0.45" />
        </pattern>

        {/* 2. Natural Dirt / Cobblestone Road Pattern */}
        <pattern id="svDirtPathTile" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#d4a373" />
          <rect x="0" y="0" width="12" height="12" fill="#e9edc9" opacity="0.25" />
          <rect x="12" y="12" width="12" height="12" fill="#bc6c25" opacity="0.2" />
          <rect x="4" y="5" width="3" height="2" rx="1" fill="#ccd5ae" opacity="0.6" />
          <rect x="14" y="15" width="4" height="2" rx="1" fill="#a3704c" opacity="0.5" />
          <rect x="16" y="4" width="2" height="2" rx="1" fill="#faedcd" opacity="0.7" />
          <rect x="6" y="18" width="3" height="2" rx="1" fill="#8d5b4c" opacity="0.4" />
        </pattern>

        {/* 3. Cobblestone Plaza Paving Pattern */}
        <pattern id="svCobblePlazaTile" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#94a3b8" />
          <rect x="1" y="1" width="8" height="8" rx="2" fill="#cbd5e1" />
          <rect x="11" y="1" width="8" height="8" rx="2" fill="#64748b" />
          <rect x="1" y="11" width="8" height="8" rx="2" fill="#64748b" />
          <rect x="11" y="11" width="8" height="8" rx="2" fill="#e2e8f0" />
        </pattern>

        {/* 4. Water Linear Gradient */}
        <linearGradient id="svWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="80%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* 5. Cliff Rock Gradient */}
        <linearGradient id="svCliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9a7b56" />
          <stop offset="40%" stopColor="#78593a" />
          <stop offset="80%" stopColor="#543d2b" />
          <stop offset="100%" stopColor="#38281c" />
        </linearGradient>

        {/* 6. Roof Tile Patterns */}
        <pattern id="svRedRoofTile" width="12" height="8" patternUnits="userSpaceOnUse">
          <rect width="12" height="8" fill="#b91c1c" />
          <rect x="0" y="0" width="12" height="2" fill="#ef4444" />
          <rect x="0" y="4" width="6" height="4" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.5" />
          <rect x="6" y="4" width="6" height="4" fill="#dc2626" stroke="#7f1d1d" strokeWidth="0.5" />
        </pattern>

        <pattern id="svBlueRoofTile" width="12" height="8" patternUnits="userSpaceOnUse">
          <rect width="12" height="8" fill="#1e40af" />
          <rect x="0" y="0" width="12" height="2" fill="#3b82f6" />
          <rect x="0" y="4" width="6" height="4" fill="#1d4ed8" stroke="#172554" strokeWidth="0.5" />
          <rect x="6" y="4" width="6" height="4" fill="#2563eb" stroke="#172554" strokeWidth="0.5" />
        </pattern>

        {/* 7. Drop Shadow Filters */}
        <filter id="svShadowFilter" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="3" dy="8" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.6" />
        </filter>
        <filter id="svBridgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#022c22" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* ===================================================================
          1. TERRAIN BASE LAYER & CLIFF ELEVATIONS
      =================================================================== */}
      {/* Base Meadow Green */}
      <rect width="1000" height="1000" fill="url(#svGrassTile)" />

      {/* Rolling Hill Contours & Highland Shading */}
      <g id="sv-highlands">
        {/* Northwest Windmill Hill Plateau */}
        <path
          d="M -10 -10 L 280 -10 Q 260 120 220 180 Q 180 230 100 240 Q 20 240 -10 210 Z"
          fill="#52b788"
          opacity="0.35"
        />
        {/* Northeast Mountain Cliff Plateau */}
        <path
          d="M 720 -10 L 1010 -10 L 1010 320 Q 940 310 880 260 Q 820 210 770 140 Q 730 70 720 -10 Z"
          fill="#52b788"
          opacity="0.3"
        />
        {/* South Cliff Gorge Base */}
        <path
          d="M -10 740 Q 150 720 280 750 Q 420 780 480 840 L 480 1010 L -10 1010 Z"
          fill="url(#svCliffGrad)"
        />
        <path
          d="M 640 840 Q 720 780 840 760 Q 940 740 1010 760 L 1010 1010 L 640 1010 Z"
          fill="url(#svCliffGrad)"
        />
        {/* Cliff Rock Details & Moss Overhang */}
        <path
          d="M -10 735 Q 150 715 280 745 Q 420 775 480 835"
          fill="none"
          stroke="#74c69d"
          strokeWidth="6"
        />
        <path
          d="M 640 835 Q 720 775 840 755 Q 940 735 1010 755"
          fill="none"
          stroke="#74c69d"
          strokeWidth="6"
        />
      </g>

      {/* ===================================================================
          2. RIVERS & CASCADING WATERFALLS (Winding from Mountains to Canyon)
      =================================================================== */}
      <g id="sv-waterways">
        {/* Upper Right Mountain Pool */}
        <path
          d="M 840 70 Q 860 120 830 170 Q 800 210 740 240 Q 700 270 660 330 Q 640 370 600 420 L 540 400 Q 580 340 610 290 Q 650 220 720 180 Q 770 130 780 70 Z"
          fill="url(#svWaterGrad)"
        />

        {/* Central Winding River (North to South Gorge) */}
        <path
          d="M 570 410 Q 610 470 615 540 Q 620 620 570 680 Q 545 720 545 770 Q 545 840 600 900 Q 650 950 670 1010 L 510 1010 Q 480 940 470 870 Q 460 790 490 730 Q 530 670 540 600 Q 545 520 505 450 Z"
          fill="url(#svWaterGrad)"
        />

        {/* Left Canyon Stream (Originating from Left Waterfall) */}
        <path
          d="M -10 420 L 70 430 Q 100 480 80 560 Q 60 630 10 700 L -10 710 Z"
          fill="url(#svWaterGrad)"
        />
        <path
          d="M -10 720 Q 80 770 120 840 Q 160 920 180 1010 L 80 1010 Q 60 930 20 870 Q -10 830 -10 800 Z"
          fill="url(#svWaterGrad)"
        />

        {/* Animated Water Shimmers & Currents */}
        <g stroke="#ffffff" strokeWidth="1.8" opacity="0.6" strokeLinecap="round">
          <line x1="560" y1="460" x2="590" y2="470" />
          <line x1="550" y1="520" x2="585" y2="535" />
          <line x1="570" y1="580" x2="605" y2="595" />
          <line x1="535" y1="640" x2="565" y2="650" />
          <line x1="520" y1="750" x2="540" y2="765" />
          <line x1="500" y1="820" x2="540" y2="840" />
          <line x1="550" y1="910" x2="600" y2="930" />
          {/* Stream water lines */}
          <line x1="20" y1="490" x2="50" y2="505" />
          <line x1="40" y1="580" x2="70" y2="595" />
          <line x1="70" y1="810" x2="110" y2="835" />
        </g>

        {/* Water Foam Ripples along River Banks */}
        <path
          d="M 505 450 Q 545 520 540 600 Q 530 670 490 730"
          fill="none"
          stroke="#bae6fd"
          strokeWidth="2.5"
          opacity="0.75"
          strokeDasharray="6 4"
        />
        <path
          d="M 570 410 Q 610 470 615 540 Q 620 620 570 680"
          fill="none"
          stroke="#bae6fd"
          strokeWidth="2.5"
          opacity="0.75"
          strokeDasharray="6 4"
        />

        {/* Left Waterfall (Cascading from Rocky Cliff at x: 10, y: 410) */}
        <g id="sv-waterfall-left">
          {/* Rock Cliff Basin Frame */}
          <rect x="-5" y="380" width="35" height="40" rx="3" fill="#543d2b" stroke="#38281c" strokeWidth="2" />
          {/* Rushing Waterfall Column */}
          <rect x="0" y="390" width="22" height="65" fill="#38bdf8" />
          <line x1="4" y1="390" x2="4" y2="455" stroke="#ffffff" strokeWidth="3" className="sv-waterfall-flow" />
          <line x1="11" y1="390" x2="11" y2="455" stroke="#e0f2fe" strokeWidth="4" className="sv-waterfall-flow" />
          <line x1="18" y1="390" x2="18" y2="455" stroke="#ffffff" strokeWidth="2" className="sv-waterfall-flow" />
          {/* Waterfall Splash Mist Pool */}
          <ellipse cx="14" cy="455" rx="18" ry="7" fill="#bae6fd" opacity="0.8" />
          <ellipse cx="14" cy="455" rx="12" ry="4" fill="#ffffff" opacity="0.9" />
          {/* Animated Foam Spray */}
          <circle cx="6" cy="452" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="18" cy="453" r="3.5" fill="#ffffff" opacity="0.8" />
          <circle cx="26" cy="456" r="2.5" fill="#ffffff" opacity="0.7" />
        </g>

        {/* Top-Right Mountain Waterfall (Cascading from High Cliffs at x: 840, y: 50) */}
        <g id="sv-waterfall-right">
          {/* High Mountain Cliff Rocks */}
          <path
            d="M 800 20 L 890 20 L 880 90 L 830 95 L 795 70 Z"
            fill="#543d2b"
            stroke="#38281c"
            strokeWidth="3"
          />
          {/* Waterfall Cascade */}
          <rect x="825" y="40" width="30" height="75" fill="#0284c7" />
          <rect x="828" y="40" width="24" height="75" fill="#38bdf8" />
          <line x1="832" y1="40" x2="832" y2="115" stroke="#ffffff" strokeWidth="3" className="sv-waterfall-flow" />
          <line x1="840" y1="40" x2="840" y2="115" stroke="#f0f9ff" strokeWidth="4" className="sv-waterfall-flow" />
          <line x1="848" y1="40" x2="848" y2="115" stroke="#ffffff" strokeWidth="3" className="sv-waterfall-flow" />
          {/* Pool Splash Basin */}
          <ellipse cx="840" cy="115" rx="26" ry="9" fill="#bae6fd" opacity="0.85" />
          <ellipse cx="840" cy="115" rx="16" ry="5" fill="#ffffff" opacity="0.9" />
          <circle cx="826" cy="113" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="854" cy="114" r="3" fill="#ffffff" opacity="0.8" />
        </g>
      </g>

      {/* ===================================================================
          3. HANDCRAFTED VILLAGE COBBLESTONE & DIRT ROADWAYS
      =================================================================== */}
      <g id="sv-village-roads">
        {/* South-West Approach Road to West Village & Central Bridge */}
        <path
          d="M -10 440 Q 90 440 140 500 Q 180 560 190 640 Q 200 730 220 780 Q 250 820 330 810 Q 420 790 530 720 L 530 670 Q 440 730 350 760 Q 270 770 250 720 Q 240 640 220 540 Q 180 440 100 390 L -10 390 Z"
          fill="url(#svDirtPathTile)"
          stroke="#bc6c25"
          strokeWidth="3"
        />

        {/* Northwest Road to Windmill & North Cottages */}
        <path
          d="M 120 400 Q 150 320 180 230 Q 210 160 270 140 Q 330 120 420 160 Q 490 200 550 280 L 520 310 Q 470 240 410 200 Q 340 170 290 185 Q 240 200 220 260 Q 190 340 160 410 Z"
          fill="url(#svDirtPathTile)"
          stroke="#bc6c25"
          strokeWidth="3"
        />

        {/* Central Fountain Plaza Road Connector */}
        <path
          d="M 230 460 Q 330 440 430 460 Q 480 470 540 450 L 540 490 Q 470 510 420 500 Q 320 480 230 500 Z"
          fill="url(#svDirtPathTile)"
          stroke="#bc6c25"
          strokeWidth="2"
        />

        {/* East Village Main Highway (From North Bridge to East Cottages & Farmland) */}
        <path
          d="M 590 440 Q 640 440 700 480 Q 750 520 740 600 Q 730 670 760 740 Q 780 780 840 790 L 840 750 Q 800 740 780 690 Q 770 610 790 540 Q 820 450 740 380 Q 680 340 600 370 L 590 410 Z"
          fill="url(#svDirtPathTile)"
          stroke="#bc6c25"
          strokeWidth="3"
        />

        {/* Southern Bridge Road Connector (Connecting East Farmland to South Bridge) */}
        <path
          d="M 620 710 Q 690 710 770 740 L 760 780 Q 680 750 615 750 Z"
          fill="url(#svDirtPathTile)"
          stroke="#bc6c25"
          strokeWidth="3"
        />

        {/* Farmland Access Paths & Upper North-East Trail */}
        <path
          d="M 740 380 Q 800 340 870 330 Q 940 330 1010 270 L 1010 230 Q 930 290 860 290 Q 780 300 720 340 Z"
          fill="url(#svDirtPathTile)"
          stroke="#bc6c25"
          strokeWidth="2"
        />

        {/* Grand Western Cobblestone Plaza (Circle at x: 335, y: 455) */}
        <g id="sv-fountain-plaza">
          {/* Plaza Outer Paved Circle */}
          <circle cx="335" cy="455" r="54" fill="url(#svCobblePlazaTile)" stroke="#475569" strokeWidth="4" />
          <circle cx="335" cy="455" r="50" fill="none" stroke="#e2e8f0" strokeWidth="2" opacity="0.7" strokeDasharray="6 3" />
          <circle cx="335" cy="455" r="42" fill="#64748b" opacity="0.4" />
        </g>
      </g>

      {/* ===================================================================
          4. ARCHED TIMBER BRIDGES (Spanning Central River)
      =================================================================== */}
      <g id="sv-timber-bridges">
        {/* North Timber Bridge (Connecting West Plaza & East Market at y: 445) */}
        <g id="sv-north-bridge" filter="url(#svBridgeShadow)">
          {/* Bridge Shadow Base */}
          <rect x="525" y="430" width="75" height="42" rx="4" fill="#1e1b18" opacity="0.7" />
          {/* Timber Planks Deck */}
          <path
            d="M 525 435 Q 562 422 600 435 L 600 465 Q 562 452 525 465 Z"
            fill="#a16207"
            stroke="#713f12"
            strokeWidth="3"
          />
          {/* Individual Vertical Plank Grooves */}
          {[532, 540, 548, 556, 564, 572, 580, 588, 595].map((px, i) => (
            <line key={`nbridge-p-${i}`} x1={px} y1="428" x2={px} y2="462" stroke="#451a03" strokeWidth="1.5" />
          ))}
          {/* Top Wooden Railing */}
          <path d="M 523 430 Q 562 418 602 430" fill="none" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
          <path d="M 523 430 Q 562 418 602 430" fill="none" stroke="#713f12" strokeWidth="1.5" />
          {/* Bottom Wooden Railing */}
          <path d="M 523 468 Q 562 456 602 468" fill="none" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
          <path d="M 523 468 Q 562 456 602 468" fill="none" stroke="#713f12" strokeWidth="1.5" />
          {/* Heavy Stone Abutment Pillars */}
          <rect x="520" y="426" width="8" height="46" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="597" y="426" width="8" height="46" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
        </g>

        {/* South Timber Bridge (Connecting South Riverbanks at y: 705) */}
        <g id="sv-south-bridge" filter="url(#svBridgeShadow)">
          {/* Bridge Shadow Base */}
          <rect x="535" y="690" width="88" height="44" rx="4" fill="#1e1b18" opacity="0.7" />
          {/* Timber Planks Deck */}
          <path
            d="M 535 695 Q 579 680 623 695 L 623 728 Q 579 713 535 728 Z"
            fill="#a16207"
            stroke="#713f12"
            strokeWidth="3"
          />
          {/* Vertical Plank Grooves */}
          {[542, 551, 560, 569, 578, 587, 596, 605, 615].map((px, i) => (
            <line key={`sbridge-p-${i}`} x1={px} y1="688" x2={px} y2="725" stroke="#451a03" strokeWidth="1.5" />
          ))}
          {/* Arched Top Railing */}
          <path d="M 533 690 Q 579 676 625 690" fill="none" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
          {/* Arched Bottom Railing */}
          <path d="M 533 732 Q 579 718 625 732" fill="none" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
          {/* Stone Pillars */}
          <rect x="530" y="686" width="8" height="48" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="620" y="686" width="8" height="48" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
        </g>
      </g>

      {/* ===================================================================
          5. FARMLAND CROPS, GARDENS & FENCES (East Village)
      =================================================================== */}
      <g id="sv-farmland">
        {/* Big East Vegetable & Golden Wheat Field (x: 780 to 920, y: 580 to 680) */}
        <g id="sv-crops-field">
          {/* Soil Plot Base */}
          <rect x="785" y="585" width="130" height="95" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="3" />
          {/* Tilled Earth Rows */}
          {[600, 618, 636, 654, 670].map((ry, i) => (
            <rect key={`row-${i}`} x="790" y={ry} width="120" height="10" rx="2" fill="#92400e" />
          ))}
          {/* Golden Wheat Stalks */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
            <g key={`wheat-c-${col}`}>
              <circle cx={796 + col * 12} cy="605" r="3.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              <circle cx={796 + col * 12} cy="623" r="3.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              <circle cx={796 + col * 12} cy="641" r="3" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
              <circle cx={796 + col * 12} cy="659" r="3.5" fill="#4ade80" stroke="#15803d" strokeWidth="1" />
            </g>
          ))}
          {/* Wooden Post Fence Perimeter */}
          <rect x="782" y="582" width="136" height="101" fill="none" stroke="#d97706" strokeWidth="2.5" strokeDasharray="8 6" />
          {/* Wooden Corner Posts */}
          <rect x="780" y="580" width="5" height="10" fill="#78350f" />
          <rect x="915" y="580" width="5" height="10" fill="#78350f" />
          <rect x="780" y="675" width="5" height="10" fill="#78350f" />
          <rect x="915" y="675" width="5" height="10" fill="#78350f" />
        </g>

        {/* Central Town Garden Fence & Planter (South of Central Shop) */}
        <g id="sv-town-garden">
          <rect x="390" y="580" width="135" height="35" rx="3" fill="#15803d" opacity="0.6" />
          {/* Flower Beds */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((f) => (
            <g key={`townfl-${f}`}>
              <circle cx={400 + f * 16} cy="592" r="3.5" fill="#f472b6" />
              <circle cx={408 + f * 16} cy="602" r="3" fill="#facc15" />
            </g>
          ))}
          {/* Wooden Trellis Fence */}
          <rect x="388" y="578" width="139" height="39" fill="none" stroke="#ca8a04" strokeWidth="2" strokeDasharray="6 4" />
        </g>
      </g>

      {/* ===================================================================
          6. DETAILED BUILDINGS & HOUSES (Matching Reference Design)
      =================================================================== */}
      <g id="sv-buildings" filter="url(#svShadowFilter)">
        {/* ==========================================
            A. NORTHWEST WINDMILL (x: 110, y: 95)
        ========================================== */}
        <g id="sv-windmill">
          {/* Stone Tower Base */}
          <path d="M 90 145 L 98 80 L 122 80 L 130 145 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
          {/* Cobblestone Texture Lines */}
          <line x1="95" y1="100" x2="125" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="93" y1="120" x2="127" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Small Timber Arch Door */}
          <rect x="104" y="125" width="12" height="20" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          {/* Conical Orange-Brown Roof */}
          <path d="M 92 82 L 110 45 L 128 82 Z" fill="#c2410c" stroke="#7c2d12" strokeWidth="2" />
          {/* Center Hub & Rotating 4-Blade Wooden Sails */}
          <g className="sv-windmill-blades">
            {/* 4 Long Wooden Arms */}
            <line x1="110" y1="95" x2="110" y2="35" stroke="#78350f" strokeWidth="3" />
            <line x1="110" y1="95" x2="170" y2="95" stroke="#78350f" strokeWidth="3" />
            <line x1="110" y1="95" x2="110" y2="155" stroke="#78350f" strokeWidth="3" />
            <line x1="110" y1="95" x2="50" y2="95" stroke="#78350f" strokeWidth="3" />
            {/* Canvas Sail Slats */}
            <rect x="112" y="42" width="14" height="42" rx="1" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" opacity="0.9" />
            <rect x="118" y="97" width="42" height="14" rx="1" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" opacity="0.9" />
            <rect x="84" y="105" width="14" height="42" rx="1" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" opacity="0.9" />
            <rect x="60" y="80" width="42" height="14" rx="1" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" opacity="0.9" />
            {/* Center Pivot Pin */}
            <circle cx="110" cy="95" r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          </g>
        </g>

        {/* ==========================================
            B. NORTHWEST HIGHLAND COTTAGE (x: 275, y: 110)
        ========================================== */}
        <g id="sv-cottage-nw">
          <rect x="250" y="105" width="55" height="40" rx="3" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
          {/* Red Roof */}
          <path d="M 242 110 L 278 72 L 312 110 Z" fill="url(#svRedRoofTile)" stroke="#7f1d1d" strokeWidth="2" />
          <rect x="272" y="122" width="12" height="23" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1" />
          <rect x="256" y="118" width="10" height="10" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
          <rect x="290" y="118" width="10" height="10" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
          {/* Stone Chimney & Smoke */}
          <rect x="295" y="76" width="8" height="16" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="299" cy="70" r="4" fill="#cbd5e1" className="sv-smoke-1" />
        </g>

        {/* ==========================================
            C. UPPER-CENTER HAMLET HOUSES (x: 370 & 445, y: 310)
        ========================================== */}
        <g id="sv-cottages-mid-north">
          {/* Cottage 1 (Red Roof) */}
          <rect x="345" y="285" width="50" height="38" rx="2" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
          <path d="M 338 290 L 370 255 L 402 290 Z" fill="url(#svRedRoofTile)" stroke="#7f1d1d" strokeWidth="2" />
          <rect x="364" y="300" width="12" height="23" rx="2" fill="#78350f" />
          <rect x="350" y="296" width="9" height="9" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1" />
          {/* Cottage 2 (Brown/Orange Roof) */}
          <rect x="415" y="285" width="55" height="38" rx="2" fill="#fed7aa" stroke="#78350f" strokeWidth="2" />
          <path d="M 408 290 L 442 250 L 478 290 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
          <rect x="436" y="300" width="13" height="23" rx="2" fill="#78350f" />
          <rect x="455" y="296" width="10" height="10" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1" />
        </g>

        {/* ==========================================
            D. WEST VILLAGE SHOP / TAVERN (x: 240, y: 530)
        ========================================== */}
        <g id="sv-shop-west">
          <rect x="210" y="515" width="65" height="45" rx="3" fill="#ffedd5" stroke="#78350f" strokeWidth="2.5" />
          {/* Purple & Gold Roof */}
          <path d="M 202 520 L 242 475 L 282 520 Z" fill="#7e22ce" stroke="#581c87" strokeWidth="2" />
          {/* Striped Market Awning */}
          <path d="M 205 528 L 275 528 L 270 542 L 210 542 Z" fill="#a855f7" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="218" y1="528" x2="218" y2="542" stroke="#facc15" strokeWidth="4" />
          <line x1="234" y1="528" x2="234" y2="542" stroke="#facc15" strokeWidth="4" />
          <line x1="250" y1="528" x2="250" y2="542" stroke="#facc15" strokeWidth="4" />
          <line x1="266" y1="528" x2="266" y2="542" stroke="#facc15" strokeWidth="4" />
          {/* Shop Stall Crates */}
          <rect x="228" y="542" width="14" height="18" fill="#78350f" />
          <circle cx="218" cy="548" r="4" fill="#ef4444" />
          <circle cx="262" cy="548" r="4" fill="#3b82f6" />
        </g>

        {/* ==========================================
            E. SOUTH-WEST RESIDENCE COTTAGE (x: 285, y: 720)
        ========================================== */}
        <g id="sv-cottage-sw">
          <rect x="250" y="695" width="68" height="52" rx="3" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
          {/* Large Red Gabled Roof */}
          <path d="M 240 700 L 285 645 L 328 700 Z" fill="url(#svRedRoofTile)" stroke="#7f1d1d" strokeWidth="2.5" />
          {/* Wooden Door & Front Steps */}
          <rect x="278" y="718" width="14" height="29" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          <rect x="274" y="744" width="22" height="4" rx="1" fill="#94a3b8" />
          {/* Windows with Flower Planters */}
          <rect x="257" y="712" width="12" height="12" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
          <rect x="255" y="724" width="16" height="4" fill="#e11d48" rx="1" />
          <rect x="301" y="712" width="12" height="12" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
          <rect x="299" y="724" width="16" height="4" fill="#e11d48" rx="1" />
          {/* Stone Chimney */}
          <rect x="312" y="655" width="10" height="22" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="317" cy="648" r="4.5" fill="#cbd5e1" className="sv-smoke-2" />
        </g>

        {/* ==========================================
            F. CENTRAL GRAND GUILDHALL / TOWN SHOP (x: 470, y: 505)
        ========================================== */}
        <g id="sv-guildhall-center">
          <rect x="428" y="465" width="84" height="62" rx="4" fill="#fde68a" stroke="#78350f" strokeWidth="3" />
          {/* Rich Blue Grand Roof */}
          <path d="M 418 470 L 470 410 L 522 470 Z" fill="url(#svBlueRoofTile)" stroke="#172554" strokeWidth="3" />
          {/* Gold Roof Crest */}
          <circle cx="470" cy="408" r="5" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
          {/* Blue & White Striped Front Awning */}
          <path d="M 445 498 L 495 498 L 490 514 L 450 514 Z" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5" />
          <line x1="455" y1="498" x2="455" y2="514" stroke="#ffffff" strokeWidth="4" />
          <line x1="467" y1="498" x2="467" y2="514" stroke="#ffffff" strokeWidth="4" />
          <line x1="479" y1="498" x2="479" y2="514" stroke="#ffffff" strokeWidth="4" />
          {/* Arch Entrance Doorway */}
          <rect x="462" y="504" width="16" height="23" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          {/* Upper Glass Window */}
          <circle cx="470" cy="445" r="9" fill="#93c5fd" stroke="#facc15" strokeWidth="2" />
        </g>

        {/* ==========================================
            G. EAST MARKET SHOP (x: 760, y: 360)
        ========================================== */}
        <g id="sv-shop-east">
          <rect x="730" y="340" width="60" height="42" rx="3" fill="#ffedd5" stroke="#78350f" strokeWidth="2" />
          <path d="M 722 345 L 760 305 L 798 345 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
          {/* Red & White Market Awning */}
          <path d="M 728 350 L 792 350 L 788 365 L 732 365 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
          <line x1="740" y1="350" x2="740" y2="365" stroke="#ffffff" strokeWidth="4" />
          <line x1="755" y1="350" x2="755" y2="365" stroke="#ffffff" strokeWidth="4" />
          <line x1="770" y1="350" x2="770" y2="365" stroke="#ffffff" strokeWidth="4" />
          <line x1="785" y1="350" x2="785" y2="365" stroke="#ffffff" strokeWidth="4" />
          <rect x="752" y="360" width="14" height="22" rx="2" fill="#78350f" />
        </g>

        {/* ==========================================
            H. EAST RIVERBANK COTTAGES (x: 695 & 855, y: 500)
        ========================================== */}
        <g id="sv-cottages-east">
          {/* Cottage 1 (Red Roof at x: 695, y: 500) */}
          <rect x="665" y="475" width="60" height="46" rx="3" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
          <path d="M 655 480 L 695 430 L 735 480 Z" fill="url(#svRedRoofTile)" stroke="#7f1d1d" strokeWidth="2.5" />
          <rect x="688" y="495" width="14" height="26" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          <rect x="672" y="490" width="10" height="10" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
          <rect x="712" y="490" width="10" height="10" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
          {/* Stone Chimney */}
          <rect x="718" y="440" width="8" height="20" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="722" cy="434" r="4.5" fill="#cbd5e1" className="sv-smoke-3" />

          {/* Cottage 2 (Blue Roof at x: 855, y: 500) */}
          <rect x="830" y="475" width="55" height="42" rx="3" fill="#ffedd5" stroke="#78350f" strokeWidth="2" />
          <path d="M 822 480 L 858 435 L 892 480 Z" fill="url(#svBlueRoofTile)" stroke="#172554" strokeWidth="2" />
          <rect x="850" y="492" width="13" height="25" rx="2" fill="#78350f" />
          <rect x="836" y="488" width="9" height="9" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1" />
        </g>

        {/* ==========================================
            I. SOUTH-EAST FOREST FORGE / COTTAGE (x: 815, y: 840)
        ========================================== */}
        <g id="sv-forge-se">
          <rect x="785" y="815" width="62" height="45" rx="3" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />
          {/* Mossy Teal Roof */}
          <path d="M 775 820 L 816 775 L 858 820 Z" fill="#0f766e" stroke="#134e4a" strokeWidth="2.5" />
          <rect x="808" y="832" width="15" height="28" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          {/* Blacksmith Anvil & Lantern */}
          <rect x="794" y="842" width="8" height="6" fill="#1e293b" />
          <circle cx="788" cy="830" r="4" fill="#facc15" />
        </g>
      </g>

      {/* ===================================================================
          7. GRAND FOUNTAIN OF SILVER VILLAGE (West Plaza at x: 335, y: 455)
      =================================================================== */}
      <g
        id="sv-grand-fountain"
        filter="url(#svShadowFilter)"
        onClick={handleFountainClick}
        className="cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Tier 1: Outer Stone Basin */}
        <ellipse cx="335" cy="455" rx="36" ry="24" fill="#64748b" stroke="#334155" strokeWidth="3" />
        <ellipse cx="335" cy="455" rx="32" ry="20" fill="url(#svWaterGrad)" />
        {/* Animated Water Ripple */}
        <ellipse cx="335" cy="455" rx="26" ry="16" fill="none" stroke="#bae6fd" strokeWidth="2" className="sv-fountain-ripple" />

        {/* Tier 2: Mid-Level Pedestal Basin */}
        <ellipse cx="335" cy="445" rx="20" ry="12" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
        <ellipse cx="335" cy="445" rx="17" ry="10" fill="#38bdf8" />

        {/* Tier 3: Sculpted Center Spire Column */}
        <rect x="331" y="420" width="8" height="26" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
        <circle cx="335" cy="418" r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />

        {/* Animated Fountain Water Jets (Spurting Arch Sprays) */}
        <g stroke="#ffffff" strokeWidth="2" opacity="0.85" strokeLinecap="round">
          <path d="M 335 414 Q 320 404 316 435" fill="none" />
          <path d="M 335 414 Q 350 404 354 435" fill="none" />
          <path d="M 335 412 Q 335 398 335 440" fill="none" strokeWidth="2.5" />
          {/* Water Splash Dots */}
          <circle cx="316" cy="438" r="2.5" fill="#bae6fd" />
          <circle cx="354" cy="438" r="2.5" fill="#bae6fd" />
          <circle cx="335" cy="442" r="3" fill="#ffffff" />
        </g>
      </g>

      {/* ===================================================================
          8. RICH FOLIAGE, LUSH OAKS, PINES & SAKURA CHERRY BLOSSOMS
      =================================================================== */}
      <g id="sv-trees-and-nature">
        {/* Pixel Oak Tree Helper Template */}
        {/* --- Lush Green Oaks --- */}
        {[
          { x: 50, y: 260, s: 1.2 },
          { x: 170, y: 440, s: 1.3 },
          { x: 70, y: 620, s: 1.1 },
          { x: 195, y: 690, s: 1.2 },
          { x: 375, y: 220, s: 1.3 },
          { x: 505, y: 240, s: 1.1 },
          { x: 360, y: 580, s: 1.1 },
          { x: 470, y: 840, s: 1.4 },
          { x: 670, y: 790, s: 1.3 },
          { x: 765, y: 600, s: 1.1 },
          { x: 620, y: 360, s: 1.2 },
          { x: 825, y: 280, s: 1.1 },
          { x: 875, y: 240, s: 1.2 },
          { x: 940, y: 460, s: 1.3 },
          { x: 955, y: 640, s: 1.2 },
          { x: 605, y: 940, s: 1.4 },
          { x: 400, y: 920, s: 1.2 },
        ].map((tr, i) => (
          <g
            key={`sv-oak-${i}`}
            className="sv-tree-sway"
            style={{ transformOrigin: `${tr.x}px ${tr.y + 20}px`, animationDelay: `${(i % 5) * 0.8}s` }}
            filter="url(#svShadowFilter)"
          >
            {/* Tree Trunk */}
            <rect x={tr.x - 4 * tr.s} y={tr.y} width={8 * tr.s} height={20 * tr.s} fill="#543d2b" stroke="#38281c" strokeWidth="1" />
            {/* Bottom Dark Foliage */}
            <circle cx={tr.x} cy={tr.y - 6 * tr.s} r={18 * tr.s} fill="#166534" />
            <circle cx={tr.x - 10 * tr.s} cy={tr.y - 4 * tr.s} r={14 * tr.s} fill="#166534" />
            <circle cx={tr.x + 10 * tr.s} cy={tr.y - 4 * tr.s} r={14 * tr.s} fill="#166534" />
            {/* Mid Vibrant Green Foliage */}
            <circle cx={tr.x} cy={tr.y - 12 * tr.s} r={16 * tr.s} fill="#22c55e" />
            <circle cx={tr.x - 8 * tr.s} cy={tr.y - 10 * tr.s} r={12 * tr.s} fill="#22c55e" />
            <circle cx={tr.x + 8 * tr.s} cy={tr.y - 10 * tr.s} r={12 * tr.s} fill="#22c55e" />
            {/* Top Sunlit Leaves */}
            <circle cx={tr.x - 3 * tr.s} cy={tr.y - 18 * tr.s} r={9 * tr.s} fill="#86efac" />
            <circle cx={tr.x + 5 * tr.s} cy={tr.y - 16 * tr.s} r={8 * tr.s} fill="#4ade80" />
          </g>
        ))}

        {/* --- Blooming Pink Sakura (Cherry Blossom) Trees (Matching Reference) --- */}
        {[
          { x: 30, y: 100, s: 1.3 },
          { x: 140, y: 380, s: 1.0 },
          { x: 910, y: 280, s: 1.2 },
          { x: 940, y: 720, s: 1.3 },
        ].map((sak, i) => (
          <g
            key={`sv-sakura-${i}`}
            className="sv-tree-sway"
            style={{ transformOrigin: `${sak.x}px ${sak.y + 20}px`, animationDelay: `${i * 1.1}s` }}
            filter="url(#svShadowFilter)"
          >
            {/* Dark Trunk */}
            <rect x={sak.x - 4 * sak.s} y={sak.y} width={8 * sak.s} height={20 * sak.s} fill="#4a2e18" />
            {/* Deep Pink Canopy Base */}
            <circle cx={sak.x} cy={sak.y - 6 * sak.s} r={18 * sak.s} fill="#db2777" />
            <circle cx={sak.x - 9 * sak.s} cy={sak.y - 4 * sak.s} r={13 * sak.s} fill="#db2777" />
            <circle cx={sak.x + 9 * sak.s} cy={sak.y - 4 * sak.s} r={13 * sak.s} fill="#db2777" />
            {/* Light Pink Sakura Blossoms */}
            <circle cx={sak.x} cy={sak.y - 12 * sak.s} r={15 * sak.s} fill="#f472b6" />
            <circle cx={sak.x - 7 * sak.s} cy={sak.y - 10 * sak.s} r={11 * sak.s} fill="#f472b6" />
            <circle cx={sak.x + 7 * sak.s} cy={sak.y - 10 * sak.s} r={11 * sak.s} fill="#f472b6" />
            {/* White/Pastel Highlight Petals */}
            <circle cx={sak.x - 2 * sak.s} cy={sak.y - 17 * sak.s} r={8 * sak.s} fill="#fbcfe8" />
            <circle cx={sak.x + 4 * sak.s} cy={sak.y - 15 * sak.s} r={7 * sak.s} fill="#ffffff" opacity="0.8" />
          </g>
        ))}

        {/* --- Mossy Boulders & Small Flowering Bushes --- */}
        {[
          { x: 110, y: 640, r: 8 },
          { x: 130, y: 660, r: 11 },
          { x: 260, y: 780, r: 7 },
          { x: 620, y: 490, r: 9 },
          { x: 740, y: 770, r: 10 },
          { x: 880, y: 730, r: 8 },
          { x: 780, y: 220, r: 12 },
          { x: 670, y: 170, r: 10 },
        ].map((bk, i) => (
          <g key={`sv-boulder-${i}`}>
            <ellipse cx={bk.x} cy={bk.y} rx={bk.r} ry={bk.r * 0.75} fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx={bk.x - 2} cy={bk.y - 2} r={bk.r * 0.4} fill="#94a3b8" />
            <circle cx={bk.x + 2} cy={bk.y - 1} r={bk.r * 0.3} fill="#16a34a" />
          </g>
        ))}

        {/* Scattered Colorful Wildflowers across Meadows */}
        {[
          { x: 160, y: 580, c: '#f472b6' },
          { x: 190, y: 610, c: '#facc15' },
          { x: 300, y: 650, c: '#38bdf8' },
          { x: 330, y: 680, c: '#ffffff' },
          { x: 380, y: 740, c: '#f472b6' },
          { x: 440, y: 770, c: '#facc15' },
          { x: 660, y: 660, c: '#a855f7' },
          { x: 700, y: 630, c: '#f472b6' },
          { x: 730, y: 680, c: '#ffffff' },
          { x: 860, y: 780, c: '#facc15' },
          { x: 920, y: 550, c: '#f472b6' },
          { x: 840, y: 380, c: '#38bdf8' },
          { x: 640, y: 290, c: '#facc15' },
          { x: 490, y: 170, c: '#f472b6' },
          { x: 280, y: 220, c: '#ffffff' },
        ].map((fl, i) => (
          <g key={`sv-fl-${i}`}>
            <circle cx={fl.x} cy={fl.y} r="2.8" fill={fl.c} />
            <circle cx={fl.x} cy={fl.y} r="1.2" fill="#ffffff" />
          </g>
        ))}
      </g>

      {/* ===================================================================
          9. AMBIENT PARTICLES (Floating Sakura Petals & Magic Village Sparkles)
      =================================================================== */}
      <g id="sv-ambient-particles" pointerEvents="none">
        {/* Floating Pink Sakura Petals */}
        <g className="sv-petal-1">
          <ellipse cx="60" cy="140" rx="3" ry="1.8" fill="#fbcfe8" />
        </g>
        <g className="sv-petal-2">
          <ellipse cx="160" cy="400" rx="3" ry="1.8" fill="#f472b6" />
        </g>
        <g className="sv-petal-3">
          <ellipse cx="920" cy="310" rx="3.5" ry="2" fill="#fbcfe8" />
        </g>
        <g className="sv-petal-4">
          <ellipse cx="940" cy="740" rx="3" ry="1.8" fill="#f472b6" />
        </g>
      </g>
    </g>
  );
};
