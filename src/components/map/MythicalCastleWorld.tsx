import React from 'react';
import { playMythicalCastleSound, playMythicalDragonSound } from '../../utils/soundEffects';

/**
 * Handcrafted 16-Bit Pixel-Art Mythical Castle (World 5) RPG Map
 * The ultimate legendary endgame realm floating among cosmic clouds and mountain peaks:
 * - Massive Gothic Central Mythical Castle with soaring spires, purple slate roofs, and golden crests
 * - Giant floating mountain islands suspended above purple magical cloud banks
 * - Grand celestial arched viaduct bridges spanning deep cosmic chasms
 * - Roaring floating waterfalls pouring down into infinite cosmic clouds
 * - Huge glowing celestial moon, twinkling starry night sky, and distant flying mythical dragon
 * - Glowing magenta & cyan celestial crystal formations, ancient hero monoliths, and flaming braziers
 * - Animated waterfall streams, crystal light pulses, torch fire flickers, and floating stardust mana motes
 */
interface MythicalCastleWorldProps {
  onCastleClick?: () => void;
  onDragonClick?: () => void;
}

export const MythicalCastleWorld: React.FC<MythicalCastleWorldProps> = ({
  onCastleClick,
  onDragonClick,
}) => {
  const handleCastleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playMythicalCastleSound();
    if (onCastleClick) onCastleClick();
  };

  const handleDragonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playMythicalDragonSound();
    if (onDragonClick) onDragonClick();
  };

  return (
    <g id="mythical-castle-rpg-world">
      <defs>
        {/* CSS Keyframes for Epic Endgame Atmospheric Animation */}
        <style>
          {`
            @keyframes mcWaterFlow {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 32; }
            }
            .mc-waterfall-stream {
              stroke-dasharray: 8 6;
              animation: mcWaterFlow 0.85s linear infinite;
            }

            @keyframes mcFlameFlicker {
              0%, 100% { transform: scale(1) translateY(0); opacity: 0.95; }
              50% { transform: scale(1.18, 0.9) translateY(-2px); opacity: 0.75; }
            }
            .mc-torch-flame {
              animation: mcFlameFlicker 0.4s ease-in-out infinite alternate;
              transform-origin: center bottom;
            }

            @keyframes mcCrystalPulse {
              0%, 100% { filter: drop-shadow(0 0 6px #e879f9); opacity: 0.9; }
              50% { filter: drop-shadow(0 0 16px #f43f5e) drop-shadow(0 0 24px #a855f7); opacity: 1; }
            }
            .mc-crystal-magenta {
              animation: mcCrystalPulse 3.0s ease-in-out infinite;
            }

            @keyframes mcCyanGlow {
              0%, 100% { filter: drop-shadow(0 0 6px #38bdf8); opacity: 0.9; }
              50% { filter: drop-shadow(0 0 16px #06b6d4) drop-shadow(0 0 22px #67e8f9); opacity: 1; }
            }
            .mc-crystal-cyan {
              animation: mcCyanGlow 3.4s ease-in-out infinite 0.7s;
            }

            @keyframes mcMoonPulse {
              0%, 100% { filter: drop-shadow(0 0 15px rgba(254, 240, 138, 0.45)); }
              50% { filter: drop-shadow(0 0 30px rgba(254, 240, 138, 0.85)) drop-shadow(0 0 50px rgba(168, 85, 247, 0.4)); }
            }
            .mc-moon-glow {
              animation: mcMoonPulse 4.5s ease-in-out infinite;
            }

            @keyframes mcDragonGlide {
              0% { transform: translate(0px, 0px); }
              50% { transform: translate(35px, -12px); }
              100% { transform: translate(0px, 0px); }
            }
            .mc-flying-dragon {
              animation: mcDragonGlide 7.5s ease-in-out infinite;
            }

            @keyframes mcCloudDrift {
              0% { transform: translateX(0); }
              50% { transform: translateX(18px); }
              100% { transform: translateX(0); }
            }
            .mc-cloud-drift-1 { animation: mcCloudDrift 14s ease-in-out infinite; }
            .mc-cloud-drift-2 { animation: mcCloudDrift 19s ease-in-out infinite reverse; }

            @keyframes mcStardustMote {
              0% { transform: translateY(0) scale(0.5); opacity: 0; }
              25% { opacity: 0.9; }
              75% { opacity: 0.85; }
              100% { transform: translateY(-55px) translateX(12px) scale(1.3); opacity: 0; }
            }
            .mc-stardust-1 { animation: mcStardustMote 4.5s ease-out infinite; }
            .mc-stardust-2 { animation: mcStardustMote 5.2s ease-out infinite 1.4s; }
            .mc-stardust-3 { animation: mcStardustMote 3.8s ease-out infinite 2.2s; }
            .mc-stardust-4 { animation: mcStardustMote 4.9s ease-out infinite 0.8s; }

            @keyframes mcCrownHover {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-6px) rotate(1.5deg); }
            }
            .mc-crown-pinnacle {
              transform-origin: 530px 145px;
              animation: mcCrownHover 3.5s ease-in-out infinite;
            }
          `}
        </style>

        {/* 1. Dark Obsidian Rock Texture Pattern */}
        <pattern id="mcObsidianRock" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill="#0f0728" />
          <path d="M 0 18 L 36 18 M 18 0 L 18 36" stroke="#1d1045" strokeWidth="1" />
          <path d="M 6 6 L 14 12 M 24 22 L 32 28 M 22 8 L 30 14" stroke="#2c1664" strokeWidth="1.2" />
        </pattern>

        {/* 2. Floating Island Top Soil Pattern */}
        <pattern id="mcIslandGrass" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill="#1e1040" />
          <circle cx="8" cy="8" r="1.5" fill="#3b1b7a" />
          <circle cx="24" cy="18" r="1.5" fill="#581c87" />
          <circle cx="16" cy="26" r="1.2" fill="#701a75" />
          <path d="M 4 20 Q 8 16 12 20" stroke="#4c1d95" strokeWidth="1" fill="none" />
        </pattern>

        {/* 3. Castle Cobblestone & Paved Courtyard Pattern */}
        <pattern id="mcCastlePavement" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill="#24134a" />
          <path d="M 0 16 L 32 16 M 16 0 L 16 16 M 0 32 L 32 32 M 8 16 L 8 32 M 24 16 L 24 32" stroke="#150a30" strokeWidth="1.5" />
          <path d="M 4 8 L 12 8 M 20 8 L 28 8 M 12 24 L 20 24" stroke="#3b1d75" strokeWidth="1.2" />
        </pattern>

        {/* 4. Castle Wall Brick Pattern */}
        <pattern id="mcCastleBrick" width="24" height="16" patternUnits="userSpaceOnUse">
          <rect width="24" height="16" fill="#2b1754" />
          <path d="M 0 8 L 24 8 M 12 0 L 12 8 M 0 8 L 0 16 M 24 8 L 24 16" stroke="#170c30" strokeWidth="1.2" />
          <rect x="2" y="2" width="8" height="4" fill="#381f6d" opacity="0.6" />
        </pattern>

        {/* 5. Linear Gradients for Cosmic Atmosphere */}
        <linearGradient id="mcCosmicSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#04010d" />
          <stop offset="35%" stopColor="#0b0424" />
          <stop offset="70%" stopColor="#19093b" />
          <stop offset="100%" stopColor="#290f54" />
        </linearGradient>

        <linearGradient id="mcWaterfallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="80%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="mcCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#311066" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#180738" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="mcRoofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a154b" />
          <stop offset="40%" stopColor="#341038" />
          <stop offset="100%" stopColor="#1e0822" />
        </linearGradient>

        <linearGradient id="mcSpireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#701a75" />
          <stop offset="50%" stopColor="#4a044e" />
          <stop offset="100%" stopColor="#2e0836" />
        </linearGradient>

        <linearGradient id="mcGoldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* ===================================================================
          LAYER 0: COSMIC STAR-FILLED DEEP SKY & CELESTIAL MOON
      =================================================================== */}
      <rect width="1000" height="1000" fill="url(#mcCosmicSky)" />

      {/* Distant Twinkling Stars & Nebula Clouds */}
      <g id="mc-stars" opacity="0.85">
        {[
          { cx: 45, cy: 60, r: 1.5, col: '#fef08a' },
          { cx: 120, cy: 110, r: 1.2, col: '#fff' },
          { cx: 210, cy: 40, r: 2.0, col: '#a78bfa' },
          { cx: 310, cy: 90, r: 1.0, col: '#fff' },
          { cx: 390, cy: 30, r: 1.8, col: '#f472b6' },
          { cx: 480, cy: 75, r: 1.2, col: '#67e8f9' },
          { cx: 620, cy: 50, r: 2.0, col: '#fef08a' },
          { cx: 710, cy: 80, r: 1.2, col: '#fff' },
          { cx: 770, cy: 35, r: 1.5, col: '#c084fc' },
          { cx: 910, cy: 65, r: 1.8, col: '#fef08a' },
          { cx: 960, cy: 130, r: 1.2, col: '#fff' },
          { cx: 70, cy: 220, r: 1.5, col: '#67e8f9' },
          { cx: 160, cy: 310, r: 1.0, col: '#fff' },
          { cx: 890, cy: 290, r: 1.6, col: '#f472b6' },
          { cx: 950, cy: 380, r: 1.2, col: '#a78bfa' },
          { cx: 60, cy: 480, r: 1.5, col: '#fff' },
          { cx: 920, cy: 780, r: 1.5, col: '#67e8f9' },
          { cx: 80, cy: 890, r: 1.2, col: '#fef08a' },
          { cx: 940, cy: 920, r: 1.6, col: '#f472b6' },
        ].map((s, idx) => (
          <circle key={idx} cx={s.cx} cy={s.cy} r={s.r} fill={s.col} />
        ))}
      </g>

      {/* Cosmic Nebula Haze Shimmers */}
      <path
        d="M 0 120 Q 250 80 500 140 T 1000 90 L 1000 240 Q 750 180 500 260 T 0 200 Z"
        fill="url(#mcCloudGrad)"
        opacity="0.35"
      />

      {/* Giant Luminous Celestial Moon (Top Right) */}
      <g id="mc-celestial-moon" className="mc-moon-glow">
        <circle cx="830" cy="115" r="54" fill="#fef08a" />
        <circle cx="830" cy="115" r="54" fill="#fde047" opacity="0.6" />
        {/* Moon craters and lunar texture */}
        <circle cx="815" cy="95" r="9" fill="#facc15" opacity="0.4" />
        <circle cx="848" cy="110" r="14" fill="#eab308" opacity="0.35" />
        <circle cx="820" cy="135" r="11" fill="#facc15" opacity="0.35" />
        <circle cx="852" cy="85" r="6" fill="#eab308" opacity="0.3" />
        {/* Outer Radiant Moon Halo Rings */}
        <circle cx="830" cy="115" r="68" stroke="#fef08a" strokeWidth="2" fill="none" opacity="0.25" />
        <circle cx="830" cy="115" r="82" stroke="#a855f7" strokeWidth="1.5" fill="none" opacity="0.18" />
      </g>

      {/* Distant Flying Mythical Dragon Silhouette */}
      <g
        id="mc-flying-dragon"
        className="mc-flying-dragon"
        cursor="pointer"
        onClick={handleDragonClick}
      >
        <path
          d="M 230 135 Q 242 125 258 130 Q 275 120 290 128 Q 280 134 274 138 Q 285 146 295 142 Q 282 148 268 144 Q 254 150 242 142 Q 235 144 230 135 Z"
          fill="#0f051d"
          stroke="#a855f7"
          strokeWidth="1.2"
        />
        {/* Dragon Wings */}
        <path
          d="M 252 132 Q 262 108 278 114 Q 268 122 264 134 M 256 138 Q 266 156 280 152 Q 270 144 265 138"
          fill="#1c0a38"
          stroke="#c084fc"
          strokeWidth="1.2"
        />
        {/* Glowing Dragon Eye */}
        <circle cx="233" cy="133" r="1.5" fill="#38bdf8" />
      </g>

      {/* ===================================================================
          LAYER 1: DRIFTING PURPLE CELESTIAL CLOUD BANKS & BOTTOM ABYSS
      =================================================================== */}
      <g id="mc-bottom-clouds" className="mc-cloud-drift-1" opacity="0.75">
        <path
          d="M -50 940 Q 150 860 350 920 T 750 870 T 1050 930 L 1050 1000 L -50 1000 Z"
          fill="#180738"
        />
        <path
          d="M -30 960 Q 200 900 420 950 T 820 910 T 1050 970 L 1050 1000 L -30 1000 Z"
          fill="#2e1065"
          opacity="0.8"
        />
      </g>

      <g id="mc-mid-clouds" className="mc-cloud-drift-2" opacity="0.6">
        <path
          d="M -50 480 Q 180 430 400 470 T 800 440 T 1050 490 L 1050 540 Q 750 580 450 530 T -50 560 Z"
          fill="url(#mcCloudGrad)"
        />
      </g>

      {/* ===================================================================
          LAYER 2: GIANT FLOATING MOUNTAIN ISLAND FOUNDATIONS (DARK OBSIDIAN)
      =================================================================== */}

      {/* 2A. Southwest Floating Island (Levels 41) */}
      <g id="mc-island-southwest">
        {/* Bottom Jagged Hanging Obsidian Stalactites */}
        <path
          d="M 50 820 Q 90 970 145 985 Q 200 970 250 840 Q 270 780 230 740 Q 130 730 60 760 Z"
          fill="url(#mcObsidianRock)"
          stroke="#1e1040"
          strokeWidth="3"
        />
        <path
          d="M 120 860 L 145 985 L 170 860 Z M 80 820 L 100 910 L 120 820 Z M 180 820 L 205 920 L 225 820 Z"
          fill="#0a031c"
        />
        {/* Top Floating Island Surface */}
        <ellipse cx="150" cy="850" rx="95" ry="60" fill="url(#mcIslandGrass)" stroke="#3b1d75" strokeWidth="2.5" />
        {/* Ancient Stone Rune Ring on Altar */}
        <circle cx="145" cy="860" r="38" fill="#1b0c3d" stroke="#6d28d9" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="145" cy="860" r="24" fill="#25124d" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="145" cy="860" r="12" fill="#3b1d75" stroke="#f472b6" strokeWidth="1" />
      </g>

      {/* 2B. West Obsidian Bastion Spire Island (Level 42) */}
      <g id="mc-island-west">
        {/* Hanging Rock Formations */}
        <path
          d="M 70 540 Q 120 680 165 710 Q 220 680 270 560 Q 260 480 200 460 Q 110 460 70 510 Z"
          fill="url(#mcObsidianRock)"
          stroke="#1e1040"
          strokeWidth="3"
        />
        <path d="M 140 580 L 165 710 L 190 580 Z" fill="#090218" />
        {/* Top Surface */}
        <ellipse cx="165" cy="550" rx="85" ry="50" fill="url(#mcIslandGrass)" stroke="#3b1d75" strokeWidth="2.5" />
        {/* West Watchtower Bastion Structure */}
        <rect x="135" y="470" width="55" height="60" fill="url(#mcCastleBrick)" stroke="#150a30" strokeWidth="2" />
        {/* Watchtower Conical Roof */}
        <polygon points="125,470 162,390 200,470" fill="url(#mcSpireGrad)" stroke="#a855f7" strokeWidth="1.5" />
        <polygon points="162,390 162,370 166,370 166,390" fill="url(#mcGoldTrim)" />
        {/* Glowing Watchtower Window */}
        <rect x="153" y="488" width="18" height="24" rx="9" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
      </g>

      {/* 2C. East Mountain Waterfall Plateau (Levels 46 & 47) */}
      <g id="mc-island-east">
        {/* Hanging Stalactite Roots */}
        <path
          d="M 720 540 Q 790 730 860 760 Q 940 730 980 560 Q 970 450 880 430 Q 770 440 720 510 Z"
          fill="url(#mcObsidianRock)"
          stroke="#1e1040"
          strokeWidth="3"
        />
        <path d="M 820 590 L 860 760 L 900 590 Z M 760 550 L 785 660 L 810 550 Z" fill="#090218" />
        {/* Top Surface */}
        <ellipse cx="850" cy="540" rx="110" ry="65" fill="url(#mcIslandGrass)" stroke="#3b1d75" strokeWidth="2.5" />
        {/* Hero Knight Monolith Pillars */}
        <rect x="855" y="440" width="24" height="65" fill="#2d1754" stroke="#150a30" strokeWidth="1.5" />
        <polygon points="850,440 867,415 884,440" fill="#4c1d95" stroke="#a855f7" strokeWidth="1" />
        <circle cx="867" cy="455" r="5" fill="#f43f5e" />
      </g>

      {/* 2D. Northeast Floating Star Sanctum (Level 48) */}
      <g id="mc-island-northeast">
        <path
          d="M 720 260 Q 770 380 820 400 Q 880 370 930 270 Q 920 180 840 170 Q 750 180 720 240 Z"
          fill="url(#mcObsidianRock)"
          stroke="#1e1040"
          strokeWidth="3"
        />
        <path d="M 790 290 L 820 400 L 850 290 Z" fill="#080214" />
        <ellipse cx="820" cy="260" rx="85" ry="50" fill="url(#mcIslandGrass)" stroke="#3b1d75" strokeWidth="2.5" />
        {/* Star Sanctum Arcane Obelisks */}
        <polygon points="760,250 766,190 772,250" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" className="mc-crystal-cyan" />
        <polygon points="860,250 866,190 872,250" fill="#e879f9" stroke="#9333ea" strokeWidth="1" className="mc-crystal-magenta" />
      </g>

      {/* ===================================================================
          LAYER 3: ROARING FLOATING WATERFALLS INTO COSMIC CLOUDS
      =================================================================== */}
      <g id="mc-floating-waterfalls">
        {/* Southwest Island Waterfall */}
        <path
          d="M 145 870 L 145 990"
          stroke="url(#mcWaterfallGrad)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          className="mc-waterfall-stream"
        />
        {/* West Viaduct Waterfall */}
        <path
          d="M 330 620 L 330 840"
          stroke="url(#mcWaterfallGrad)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          className="mc-waterfall-stream"
        />
        {/* East Viaduct Waterfall */}
        <path
          d="M 720 620 L 720 860"
          stroke="url(#mcWaterfallGrad)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          className="mc-waterfall-stream"
        />
        {/* East Mountain Waterfall Ridge */}
        <path
          d="M 870 540 L 870 780"
          stroke="url(#mcWaterfallGrad)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          className="mc-waterfall-stream"
        />
      </g>

      {/* ===================================================================
          LAYER 4: GRAND CELESTIAL VIADUCT BRIDGES & ARCHES
      =================================================================== */}

      {/* West Celestial Viaduct Bridge (Connects West Bastion to Central Citadel) */}
      <g id="mc-bridge-west">
        {/* Massive Stone Arches & Pillars */}
        <rect x="230" y="555" width="150" height="32" fill="#1b0d38" stroke="#0e0520" strokeWidth="2" />
        {/* Double Arches under bridge */}
        <path d="M 245 587 Q 275 555 305 587 Z M 315 587 Q 345 555 375 587 Z" fill="#0b041c" stroke="#3b1d75" strokeWidth="2" />
        {/* Bridge Paved Deck */}
        <rect x="230" y="550" width="150" height="14" fill="url(#mcCastlePavement)" stroke="#4c1d95" strokeWidth="1.5" />
        {/* Balustrade Railing & Torches */}
        <path d="M 230 548 L 380 548 M 230 564 L 380 564" stroke="#d97706" strokeWidth="1.5" />
        <rect x="260" y="542" width="6" height="8" fill="#d97706" />
        <rect x="345" y="542" width="6" height="8" fill="#d97706" />
        {/* Bridge Torch Flames */}
        <ellipse cx="263" cy="539" rx="3.5" ry="6" fill="#f59e0b" className="mc-torch-flame" />
        <ellipse cx="348" cy="539" rx="3.5" ry="6" fill="#f59e0b" className="mc-torch-flame" />
      </g>

      {/* East Celestial Causeway Bridge (Connects Central Citadel to East Highlands) */}
      <g id="mc-bridge-east">
        <rect x="630" y="555" width="140" height="32" fill="#1b0d38" stroke="#0e0520" strokeWidth="2" />
        <path d="M 645 587 Q 675 555 705 587 Z M 715 587 Q 745 555 775 587 Z" fill="#0b041c" stroke="#3b1d75" strokeWidth="2" />
        <rect x="630" y="550" width="140" height="14" fill="url(#mcCastlePavement)" stroke="#4c1d95" strokeWidth="1.5" />
        <path d="M 630 548 L 770 548 M 630 564 L 770 564" stroke="#d97706" strokeWidth="1.5" />
        <rect x="660" y="542" width="6" height="8" fill="#d97706" />
        <rect x="740" y="542" width="6" height="8" fill="#d97706" />
        <ellipse cx="663" cy="539" rx="3.5" ry="6" fill="#f59e0b" className="mc-torch-flame" />
        <ellipse cx="743" cy="539" rx="3.5" ry="6" fill="#f59e0b" className="mc-torch-flame" />
      </g>

      {/* Stairway connecting Southwest Island to West Island */}
      <g id="mc-southwest-stairs">
        <path
          d="M 145 840 Q 155 760 160 670 T 165 570"
          stroke="#4c1d95"
          strokeWidth="24"
          fill="none"
          strokeDasharray="6 4"
        />
        <path
          d="M 145 840 Q 155 760 160 670 T 165 570"
          stroke="#7c3aed"
          strokeWidth="16"
          fill="none"
          strokeDasharray="4 6"
        />
      </g>

      {/* ===================================================================
          LAYER 5: CENTRAL CITADEL PLATEAU & GRAND COURTYARD PLAZA
      =================================================================== */}
      <g id="mc-central-citadel-plateau">
        {/* Massive Hanging Foundations */}
        <path
          d="M 320 550 Q 420 810 530 840 Q 640 810 740 550 Q 730 450 630 420 Q 430 420 320 500 Z"
          fill="url(#mcObsidianRock)"
          stroke="#1e1040"
          strokeWidth="3.5"
        />
        <path d="M 480 620 L 530 840 L 580 620 Z M 380 580 L 420 730 L 460 580 Z M 600 580 L 640 730 L 680 580 Z" fill="#090218" />

        {/* Central Courtyard Plaza Paved Surface */}
        <ellipse cx="530" cy="580" rx="175" ry="105" fill="url(#mcCastlePavement)" stroke="#4c1d95" strokeWidth="3" />

        {/* Grand Dragon Circle Plaza (Level 44) */}
        <circle cx="530" cy="640" r="54" fill="#1b0a38" stroke="#a855f7" strokeWidth="2.5" />
        <circle cx="530" cy="640" r="40" fill="#291054" stroke="#e879f9" strokeWidth="2" strokeDasharray="8 5" />
        <circle cx="530" cy="640" r="24" fill="#3b1675" stroke="#f43f5e" strokeWidth="1.5" />
        <polygon points="530,622 542,652 518,652" fill="#facc15" opacity="0.9" />

        {/* Courtyard Braziers (Left & Right of Plaza) */}
        <rect x="440" y="625" width="12" height="18" fill="#1e1040" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="446" cy="620" rx="7" ry="12" fill="#f59e0b" className="mc-torch-flame" />
        <ellipse cx="446" cy="620" rx="4" ry="7" fill="#fef08a" className="mc-torch-flame" />

        <rect x="608" y="625" width="12" height="18" fill="#1e1040" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="614" cy="620" rx="7" ry="12" fill="#f59e0b" className="mc-torch-flame" />
        <ellipse cx="614" cy="620" rx="4" ry="7" fill="#fef08a" className="mc-torch-flame" />
      </g>

      {/* ===================================================================
          LAYER 6: MASSIVE CENTRAL GOTHIC MYTHICAL CASTLE & TOWERS
      =================================================================== */}
      <g
        id="mc-gothic-castle-structure"
        cursor="pointer"
        onClick={handleCastleClick}
      >
        {/* Castle Lower Fortress Walls */}
        <rect x="390" y="380" width="280" height="110" fill="url(#mcCastleBrick)" stroke="#110726" strokeWidth="3" />
        {/* Castle Wall Battlements & Crenellations */}
        {[390, 420, 450, 480, 510, 540, 570, 600, 630, 655].map((bx, i) => (
          <rect key={i} x={bx} y="368" width="15" height="14" fill="#24134a" stroke="#110726" strokeWidth="1.5" />
        ))}

        {/* Grand Portcullis Gateway & Runic Portal (Level 45) */}
        <path d="M 495 490 L 495 435 Q 530 405 565 435 L 565 490 Z" fill="#080214" stroke="#a855f7" strokeWidth="2.5" />
        <rect x="502" y="440" width="56" height="50" fill="#2d0b59" opacity="0.6" />
        {/* Golden Portcullis Iron Grate */}
        <path
          d="M 510 440 L 510 490 M 520 435 L 520 490 M 530 430 L 530 490 M 540 435 L 540 490 M 550 440 L 550 490 M 500 455 L 560 455 M 500 475 L 560 475"
          stroke="#f59e0b"
          strokeWidth="2"
        />

        {/* Flanking Watchtowers (Left & Right of Keep) */}
        {/* Left Outer Tower */}
        <rect x="365" y="310" width="55" height="140" fill="url(#mcCastleBrick)" stroke="#110726" strokeWidth="2" />
        <polygon points="355,310 392,205 430,310" fill="url(#mcSpireGrad)" stroke="#a855f7" strokeWidth="2" />
        <polygon points="390,205 390,185 394,185 394,205" fill="url(#mcGoldTrim)" />
        <polygon points="392,185 385,175 399,175" fill="#38bdf8" className="mc-crystal-cyan" />
        {/* Tower Stained Glass Window */}
        <rect x="382" y="340" width="20" height="34" rx="10" fill="#f43f5e" stroke="#7f1d1d" strokeWidth="1.5" />

        {/* Right Outer Tower */}
        <rect x="640" y="310" width="55" height="140" fill="url(#mcCastleBrick)" stroke="#110726" strokeWidth="2" />
        <polygon points="630,310 667,205 705,310" fill="url(#mcSpireGrad)" stroke="#a855f7" strokeWidth="2" />
        <polygon points="665,205 665,185 669,185 669,205" fill="url(#mcGoldTrim)" />
        <polygon points="667,185 660,175 674,175" fill="#e879f9" className="mc-crystal-magenta" />
        <rect x="657" y="340" width="20" height="34" rx="10" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />

        {/* Central High Keep Palace Cathedral */}
        <rect x="445" y="240" width="170" height="150" fill="url(#mcCastleBrick)" stroke="#110726" strokeWidth="2.5" />
        {/* Magnificent Stained Glass Rose Cathedral Window */}
        <circle cx="530" cy="305" r="28" fill="#1b0838" stroke="#d97706" strokeWidth="3" />
        <circle cx="530" cy="305" r="22" fill="#701a75" stroke="#f472b6" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="530" cy="305" r="10" fill="#facc15" stroke="#e11d48" strokeWidth="1.5" />

        {/* Soaring Supreme Zenith Spire (Level 49 Stairway Ascent) */}
        <polygon points="455,240 530,95 605,240" fill="url(#mcRoofGrad)" stroke="#c084fc" strokeWidth="2.5" />
        {/* Spire Golden Balcony & Heraldic Crests */}
        <rect x="500" y="200" width="60" height="12" fill="url(#mcGoldTrim)" stroke="#78350f" strokeWidth="1.5" />
        <polygon points="530,170 540,195 520,195" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
      </g>

      {/* ===================================================================
          LAYER 7: CROWNING ZENITH PINNACLE (LEVEL 50)
      =================================================================== */}
      <g id="mc-crown-pinnacle" className="mc-crown-pinnacle">
        {/* Floating Radiant Gold Mythical Crown */}
        <path
          d="M 505 155 L 512 125 L 522 145 L 530 115 L 538 145 L 548 125 L 555 155 Z"
          fill="url(#mcGoldTrim)"
          stroke="#fff"
          strokeWidth="2"
          filter="drop-shadow(0 0 12px #facc15)"
        />
        {/* Crown Jewels (Ruby, Sapphire, Diamond) */}
        <circle cx="512" cy="125" r="3" fill="#f43f5e" />
        <circle cx="530" cy="115" r="4" fill="#38bdf8" />
        <circle cx="548" cy="125" r="3" fill="#a855f7" />
        <rect x="508" y="152" width="44" height="6" fill="#78350f" rx="2" />
        {/* Floating Celestial Orb Above Crown */}
        <circle cx="530" cy="92" r="10" fill="#fff" filter="drop-shadow(0 0 16px #67e8f9) drop-shadow(0 0 28px #e879f9)" />
      </g>

      {/* ===================================================================
          LAYER 8: GLOWING CRYSTAL CLUSTERS & AMBIENT FLORA
      =================================================================== */}
      {/* Southwest Island Crystals */}
      <g className="mc-crystal-magenta">
        <polygon points="80,840 90,790 98,840" fill="#e879f9" stroke="#9333ea" strokeWidth="1" />
        <polygon points="95,845 102,805 108,845" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
        <polygon points="210,850 220,800 228,850" fill="#c084fc" stroke="#7e22ce" strokeWidth="1" />
      </g>

      {/* East Plateau Cyan & Amethyst Crystals */}
      <g className="mc-crystal-cyan">
        <polygon points="920,530 930,470 940,530" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.2" />
        <polygon points="940,535 948,485 956,535" fill="#67e8f9" stroke="#0891b2" strokeWidth="1" />
        <polygon points="760,530 770,480 778,530" fill="#a855f7" stroke="#6b21a8" strokeWidth="1" />
      </g>

      {/* Central Plaza Edge Mana Crystals */}
      <g className="mc-crystal-magenta">
        <polygon points="360,600 370,550 378,600" fill="#f43f5e" stroke="#be123c" strokeWidth="1.2" />
        <polygon points="690,600 700,550 708,600" fill="#e879f9" stroke="#a21caf" strokeWidth="1.2" />
      </g>

      {/* ===================================================================
          LAYER 9: FLOATING STARDUST & MANA MOTES
      =================================================================== */}
      <g id="mc-floating-stardust">
        <circle cx="150" cy="830" r="3.5" fill="#f472b6" className="mc-stardust-1" />
        <circle cx="340" cy="560" r="3.0" fill="#38bdf8" className="mc-stardust-2" />
        <circle cx="530" cy="620" r="4.0" fill="#fef08a" className="mc-stardust-3" />
        <circle cx="720" cy="550" r="3.2" fill="#c084fc" className="mc-stardust-4" />
        <circle cx="850" cy="510" r="3.5" fill="#67e8f9" className="mc-stardust-1" />
        <circle cx="530" cy="220" r="4.0" fill="#fde047" className="mc-stardust-2" />
      </g>
    </g>
  );
};
