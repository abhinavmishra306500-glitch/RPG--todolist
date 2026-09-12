import React from 'react';

/**
 * Handcrafted 16-Bit Pixel-Art Bronze Village World Map
 * Faithfully recreating the 90% top-down hedge forest maze structure of the reference image
 * using rich, layered pixel-art sprites, varied tree clusters, ponds, rocks, and animated life.
 */
export const BronzeVillageWorld: React.FC = () => {
  return (
    <g id="bronze-village-rpg-world">
      <defs>
        {/* Pixel Grass Texture Pattern */}
        <pattern id="rpgGrassTile" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#1b4d3e" />
          {/* Subtle pixel grass shading */}
          <rect x="0" y="0" width="20" height="20" fill="#205c4b" opacity="0.45" />
          <rect x="20" y="20" width="20" height="20" fill="#163f33" opacity="0.45" />
          {/* Grass blades */}
          <rect x="6" y="8" width="2" height="6" fill="#4ade80" opacity="0.3" />
          <rect x="8" y="6" width="2" height="8" fill="#86efac" opacity="0.35" />
          <rect x="26" y="24" width="2" height="6" fill="#34d399" opacity="0.3" />
          <rect x="28" y="22" width="2" height="8" fill="#6ee7b7" opacity="0.35" />
          {/* Tiny soil/pebble spots */}
          <rect x="18" y="34" width="2" height="2" fill="#0f2b23" opacity="0.6" />
          <rect x="34" y="10" width="2" height="2" fill="#0f2b23" opacity="0.6" />
        </pattern>

        {/* Deep Under-Canopy Shadow Filter */}
        <filter id="rpgTreeShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="4" dy="12" stdDeviation="5" floodColor="#041812" floodOpacity="0.85" />
        </filter>

        {/* Rock Shadow */}
        <filter id="rockShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#041812" floodOpacity="0.7" />
        </filter>

        {/* Water Gradient */}
        <linearGradient id="rpgWaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="35%" stopColor="#0284c7" />
          <stop offset="70%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Pixel Tree Unit Definition */}
        <g id="pixelTreeSprite">
          {/* Base Trunk Shadow */}
          <ellipse cx="16" cy="30" rx="14" ry="6" fill="#041812" opacity="0.8" />
          {/* Trunk */}
          <rect x="13" y="18" width="6" height="12" fill="#382212" />
          <rect x="12" y="24" width="8" height="4" fill="#24140a" />
          <rect x="14" y="19" width="2" height="10" fill="#52321b" />
          {/* Canopy Layer 1 (Dark Base) */}
          <rect x="2" y="6" width="28" height="20" rx="4" fill="#0f382a" />
          <rect x="0" y="10" width="32" height="14" rx="4" fill="#0f382a" />
          {/* Canopy Layer 2 (Mid Foliage) */}
          <rect x="3" y="4" width="26" height="18" rx="3" fill="#15803d" />
          <rect x="1" y="8" width="30" height="12" rx="3" fill="#15803d" />
          <rect x="5" y="2" width="22" height="16" rx="3" fill="#16a34a" />
          {/* Canopy Layer 3 (Bright Leaf Clusters) */}
          <rect x="6" y="2" width="10" height="8" rx="2" fill="#22c55e" />
          <rect x="18" y="5" width="9" height="7" rx="2" fill="#22c55e" />
          <rect x="9" y="11" width="14" height="7" rx="2" fill="#22c55e" />
          {/* Canopy Layer 4 (Sunlight Pixel Highlights) */}
          <rect x="7" y="2" width="5" height="3" fill="#86efac" />
          <rect x="19" y="5" width="4" height="2" fill="#86efac" />
          <rect x="10" y="11" width="6" height="3" fill="#4ade80" />
        </g>

        {/* Smaller Dense Bush Sprite */}
        <g id="pixelBushSprite">
          <ellipse cx="10" cy="14" rx="10" ry="4" fill="#041812" opacity="0.75" />
          <rect x="1" y="4" width="18" height="10" rx="3" fill="#0f382a" />
          <rect x="2" y="2" width="16" height="10" rx="2" fill="#15803d" />
          <rect x="4" y="1" width="12" height="8" rx="2" fill="#22c55e" />
          <rect x="5" y="2" width="4" height="2" fill="#86efac" />
          <rect x="11" y="4" width="4" height="2" fill="#86efac" />
        </g>
      </defs>

      {/* 1. Base Pixel Grass Map Surface */}
      <rect width="1000" height="1000" fill="url(#rpgGrassTile)" />

      {/* 2. Natural Meadow Patches & Wildflower Fields */}
      <g id="ground-vegetation" opacity="0.85">
        {/* Lighter Green Clearing Swathes */}
        <path
          d="M 80 680 Q 200 640 320 690 Q 450 630 580 660 Q 750 600 900 640 L 920 900 Q 600 920 300 900 Q 120 910 80 680 Z"
          fill="#22c55e"
          opacity="0.12"
        />
        <path
          d="M 120 120 Q 300 90 500 130 Q 700 90 880 120 L 900 480 Q 700 450 500 480 Q 300 450 120 480 Z"
          fill="#34d399"
          opacity="0.08"
        />

        {/* Scattered Wildflower Dots & Clover Tufts */}
        {[
          { x: 140, y: 740, c: '#f472b6' },
          { x: 155, y: 755, c: '#fbcfe8' },
          { x: 180, y: 820, c: '#fde047' },
          { x: 195, y: 810, c: '#ffffff' },
          { x: 270, y: 850, c: '#f472b6' },
          { x: 290, y: 840, c: '#67e8f9' },
          { x: 420, y: 760, c: '#fde047' },
          { x: 445, y: 775, c: '#f472b6' },
          { x: 490, y: 690, c: '#a7f3d0' },
          { x: 530, y: 670, c: '#fde047' },
          { x: 860, y: 680, c: '#fbcfe8' },
          { x: 890, y: 660, c: '#f472b6' },
          { x: 870, y: 400, c: '#fde047' },
          { x: 895, y: 380, c: '#67e8f9' },
          { x: 720, y: 260, c: '#f472b6' },
          { x: 745, y: 245, c: '#ffffff' },
          { x: 460, y: 390, c: '#fde047' },
          { x: 495, y: 410, c: '#a7f3d0' },
          { x: 260, y: 520, c: '#fbcfe8' },
          { x: 230, y: 535, c: '#fde047' },
          { x: 110, y: 280, c: '#67e8f9' },
          { x: 135, y: 265, c: '#f472b6' },
        ].map((fl, i) => (
          <g key={`flower-${i}`}>
            <circle cx={fl.x} cy={fl.y} r="2.5" fill={fl.c} />
            <rect x={fl.x - 0.5} y={fl.y + 1.5} width="1" height="2.5" fill="#15803d" />
          </g>
        ))}

        {/* Mossy Stone Boulders */}
        {[
          { x: 170, y: 720, rx: 8, ry: 6 },
          { x: 330, y: 850, rx: 11, ry: 8 },
          { x: 510, y: 640, rx: 9, ry: 7 },
          { x: 850, y: 580, rx: 12, ry: 9 },
          { x: 780, y: 240, rx: 10, ry: 7 },
          { x: 430, y: 330, rx: 9, ry: 6 },
          { x: 210, y: 460, rx: 11, ry: 8 },
          { x: 150, y: 220, rx: 8, ry: 6 },
        ].map((rk, i) => (
          <g key={`rock-${i}`} filter="url(#rockShadow)">
            <ellipse cx={rk.x} cy={rk.y} rx={rk.rx} ry={rk.ry} fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
            <ellipse cx={rk.x - 2} cy={rk.y - 2} rx={rk.rx * 0.6} ry={rk.ry * 0.6} fill="#64748b" />
            {/* Moss patches */}
            <circle cx={rk.x + 2} cy={rk.y - 1} r={rk.rx * 0.35} fill="#16a34a" opacity="0.8" />
          </g>
        ))}
      </g>

      {/* 3. Azure Blue Pond with Water Lilies & Streams (South-East Opening) */}
      <g id="crystal-water-pond" filter="url(#rpgTreeShadow)">
        {/* Pond Sand/Moss Shoreline */}
        <path
          d="M 640 730 Q 720 700 800 725 Q 860 755 845 835 Q 805 895 710 880 Q 630 850 640 730 Z"
          fill="#14532d"
          stroke="#052e16"
          strokeWidth="3"
        />
        {/* Crystal Clear Deep Water */}
        <path
          d="M 650 740 Q 725 715 790 738 Q 848 765 830 828 Q 795 880 715 868 Q 645 840 650 740 Z"
          fill="url(#rpgWaterGrad)"
        />
        {/* Water Foam Wave Lines */}
        <path d="M 670 760 Q 720 745 770 760" stroke="#e0f2fe" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M 690 820 Q 740 805 790 820" stroke="#bae6fd" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Animated Expanding Water Ripples */}
        <circle cx="725" cy="785" r="16" fill="none" stroke="#e0f2fe" strokeWidth="2" className="animate-ping" style={{ animationDuration: '3.5s' }} />
        <circle cx="775" cy="815" r="12" fill="none" stroke="#bae6fd" strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '4.5s', animationDelay: '1.2s' }} />

        {/* Water Lily Pads & Flowers */}
        <circle cx="685" cy="770" r="7" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        <circle cx="685" cy="770" r="3" fill="#f472b6" />
        <circle cx="760" cy="840" r="8" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        <circle cx="760" cy="840" r="3" fill="#fbcfe8" />
        <circle cx="710" cy="845" r="6" fill="#15803d" stroke="#14532d" strokeWidth="1" />

        {/* Small South-West Spring Pool */}
        <ellipse cx="100" cy="890" rx="20" ry="12" fill="url(#rpgWaterGrad)" stroke="#14532d" strokeWidth="2" />
        <circle cx="100" cy="890" r="6" fill="none" stroke="#e0f2fe" strokeWidth="1" className="animate-ping" style={{ animationDuration: '3s' }} />
      </g>

      {/* 4. Dense Outer Perimeter Forest Border (Top, Bottom, Left, Right) */}
      <g id="dense-perimeter-forest" filter="url(#rpgTreeShadow)">
        {/* Top Forest Border Rows */}
        {Array.from({ length: 34 }).map((_, i) => (
          <use key={`top-row1-${i}`} href="#pixelTreeSprite" x={i * 29 - 10} y={-5} />
        ))}
        {Array.from({ length: 34 }).map((_, i) => (
          <use key={`top-row2-${i}`} href="#pixelTreeSprite" x={i * 29 + 5} y={35} />
        ))}

        {/* Bottom Forest Border Rows */}
        {Array.from({ length: 34 }).map((_, i) => (
          <use key={`bot-row1-${i}`} href="#pixelTreeSprite" x={i * 29 - 10} y={915} />
        ))}
        {Array.from({ length: 34 }).map((_, i) => (
          <use key={`bot-row2-${i}`} href="#pixelTreeSprite" x={i * 29 + 5} y={950} />
        ))}

        {/* Left Forest Border Rows */}
        {Array.from({ length: 30 }).map((_, i) => (
          <use key={`left-col1-${i}`} href="#pixelTreeSprite" x={-5} y={i * 30 + 10} />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <use key={`left-col2-${i}`} href="#pixelTreeSprite" x={30} y={i * 30 + 25} />
        ))}

        {/* Right Forest Border Rows */}
        {Array.from({ length: 30 }).map((_, i) => (
          <use key={`right-col1-${i}`} href="#pixelTreeSprite" x={915} y={i * 30 + 10} />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <use key={`right-col2-${i}`} href="#pixelTreeSprite" x={950} y={i * 30 + 25} />
        ))}
      </g>

      {/* 5. Strategic Internal Hedge & Tree Clusters (Recreating 90% Reference Composition) */}
      <g id="internal-forest-clusters" filter="url(#rpgTreeShadow)">
        {/* Cluster A: Upper-Left Grove (x: 80-280, y: 150-300) */}
        <g id="cluster-upper-left">
          {[
            { x: 80, y: 140 }, { x: 110, y: 135 }, { x: 140, y: 140 }, { x: 170, y: 145 }, { x: 200, y: 150 }, { x: 230, y: 155 }, { x: 260, y: 160 },
            { x: 90, y: 175 }, { x: 120, y: 170 }, { x: 150, y: 175 }, { x: 180, y: 180 }, { x: 210, y: 185 }, { x: 240, y: 190 },
            { x: 155, y: 215 }, { x: 185, y: 220 }, { x: 215, y: 225 }, { x: 170, y: 255 }, { x: 200, y: 260 }
          ].map((pt, i) => (
            <use key={`cl-a-${i}`} href="#pixelTreeSprite" x={pt.x} y={pt.y} />
          ))}
          <use href="#pixelBushSprite" x={245} y={270} />
          <use href="#pixelBushSprite" x={140} y={280} />
        </g>

        {/* Cluster B: Upper-Center Forest Island (x: 470-660, y: 150-320) */}
        <g id="cluster-upper-center">
          {[
            { x: 470, y: 140 }, { x: 500, y: 135 }, { x: 530, y: 140 }, { x: 560, y: 145 }, { x: 590, y: 150 }, { x: 620, y: 155 },
            { x: 485, y: 175 }, { x: 515, y: 170 }, { x: 545, y: 175 }, { x: 575, y: 180 }, { x: 605, y: 185 },
            { x: 560, y: 215 }, { x: 590, y: 220 }, { x: 620, y: 225 }, { x: 575, y: 255 }, { x: 605, y: 260 }, { x: 590, y: 295 }
          ].map((pt, i) => (
            <use key={`cl-b-${i}`} href="#pixelTreeSprite" x={pt.x} y={pt.y} />
          ))}
          <use href="#pixelBushSprite" x={450} y={200} />
          <use href="#pixelBushSprite" x={635} y={275} />
        </g>

        {/* Cluster C: Upper-Right Corner Spire (x: 810-910, y: 150-330) */}
        <g id="cluster-upper-right">
          {[
            { x: 810, y: 140 }, { x: 840, y: 145 }, { x: 870, y: 150 },
            { x: 825, y: 175 }, { x: 855, y: 180 }, { x: 885, y: 185 },
            { x: 840, y: 215 }, { x: 870, y: 220 },
            { x: 855, y: 255 }, { x: 885, y: 260 }, { x: 865, y: 295 }
          ].map((pt, i) => (
            <use key={`cl-c-${i}`} href="#pixelTreeSprite" x={pt.x} y={pt.y} />
          ))}
          <use href="#pixelBushSprite" x={800} y={230} />
        </g>

        {/* Cluster D: Middle-Left Wall (x: 160-380, y: 530-650) */}
        <g id="cluster-middle-left">
          {[
            { x: 160, y: 520 }, { x: 190, y: 515 }, { x: 220, y: 520 }, { x: 250, y: 525 }, { x: 280, y: 530 }, { x: 310, y: 525 }, { x: 340, y: 520 }, { x: 370, y: 525 },
            { x: 175, y: 555 }, { x: 205, y: 550 }, { x: 235, y: 555 }, { x: 265, y: 560 }, { x: 295, y: 565 }, { x: 325, y: 560 }, { x: 355, y: 555 },
            { x: 190, y: 590 }, { x: 220, y: 585 }, { x: 250, y: 590 }, { x: 280, y: 595 }, { x: 310, y: 590 },
            { x: 205, y: 625 }, { x: 235, y: 620 }
          ].map((pt, i) => (
            <use key={`cl-d-${i}`} href="#pixelTreeSprite" x={pt.x} y={pt.y} />
          ))}
          <use href="#pixelBushSprite" x={140} y={540} />
          <use href="#pixelBushSprite" x={395} y={545} />
        </g>

        {/* Cluster E: Central Long Horizontal Divider (x: 420-910, y: 520-650) */}
        <g id="cluster-central-divider">
          {[
            { x: 420, y: 520 }, { x: 450, y: 515 }, { x: 480, y: 520 }, { x: 510, y: 525 }, { x: 540, y: 530 }, { x: 570, y: 525 }, { x: 600, y: 520 }, { x: 630, y: 525 }, { x: 660, y: 530 }, { x: 690, y: 525 }, { x: 720, y: 520 }, { x: 750, y: 525 }, { x: 780, y: 530 }, { x: 810, y: 525 }, { x: 840, y: 520 }, { x: 870, y: 525 },
            { x: 435, y: 555 }, { x: 465, y: 550 }, { x: 495, y: 555 }, { x: 525, y: 560 }, { x: 555, y: 565 }, { x: 585, y: 560 }, { x: 615, y: 555 }, { x: 645, y: 560 }, { x: 675, y: 565 }, { x: 705, y: 560 }, { x: 735, y: 555 }, { x: 765, y: 560 }, { x: 795, y: 565 }, { x: 825, y: 560 }, { x: 855, y: 555 },
            { x: 600, y: 590 }, { x: 630, y: 595 }, { x: 660, y: 590 }, { x: 690, y: 585 }, { x: 720, y: 590 }, { x: 750, y: 595 }
          ].map((pt, i) => (
            <use key={`cl-e-${i}`} href="#pixelTreeSprite" x={pt.x} y={pt.y} />
          ))}
          <use href="#pixelBushSprite" x={400} y={535} />
          <use href="#pixelBushSprite" x={890} y={540} />
        </g>

        {/* Cluster F: South-Middle Hedge Island (x: 340-440, y: 720-830) */}
        <g id="cluster-south-middle">
          {[
            { x: 340, y: 720 }, { x: 370, y: 715 }, { x: 400, y: 720 },
            { x: 355, y: 755 }, { x: 385, y: 750 }, { x: 415, y: 755 },
            { x: 370, y: 790 }, { x: 400, y: 785 }
          ].map((pt, i) => (
            <use key={`cl-f-${i}`} href="#pixelTreeSprite" x={pt.x} y={pt.y} />
          ))}
        </g>

        {/* Cluster G: South-Central Hedge Block (x: 500-600, y: 720-830) */}
        <g id="cluster-south-central">
          {[
            { x: 500, y: 720 }, { x: 530, y: 715 }, { x: 560, y: 720 },
            { x: 515, y: 755 }, { x: 545, y: 750 }, { x: 575, y: 755 },
            { x: 530, y: 790 }, { x: 560, y: 785 }
          ].map((pt, i) => (
            <use key={`cl-g-${i}`} href="#pixelTreeSprite" x={pt.x} y={pt.y} />
          ))}
        </g>
      </g>

      {/* 6. Active Living In-Game Animations */}
      {/* Fluttering Butterflies in Meadows */}
      <g className="animate-pulse" style={{ animationDuration: '2s' }}>
        {/* Butterfly 1 (South-West Meadow) */}
        <g transform="translate(180, 750)">
          <animateTransform attributeName="transform" type="translate" values="180,750; 215,725; 245,755; 195,775; 180,750" dur="8s" repeatCount="indefinite" />
          <polygon points="0,0 -7,-6 -5,-10 0,-3" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
          <polygon points="0,0 7,-6 5,-10 0,-3" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
          <line x1="0" y1="-8" x2="0" y2="1" stroke="#451a03" strokeWidth="1.5" />
        </g>
        {/* Butterfly 2 (Central Avenue) */}
        <g transform="translate(480, 320)">
          <animateTransform attributeName="transform" type="translate" values="480,320; 520,290; 460,270; 500,340; 480,320" dur="10s" repeatCount="indefinite" />
          <polygon points="0,0 -7,-6 -5,-10 0,-3" fill="#67e8f9" stroke="#0e7490" strokeWidth="0.8" />
          <polygon points="0,0 7,-6 5,-10 0,-3" fill="#38bdf8" stroke="#0e7490" strokeWidth="0.8" />
          <line x1="0" y1="-8" x2="0" y2="1" stroke="#083344" strokeWidth="1.5" />
        </g>
        {/* Butterfly 3 (Eastern Gateway) */}
        <g transform="translate(860, 500)">
          <animateTransform attributeName="transform" type="translate" values="860,500; 890,460; 840,440; 880,520; 860,500" dur="9s" repeatCount="indefinite" />
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
      <g opacity="0.15">
        <g className="animate-pulse" style={{ animationDuration: '10s' }}>
          <ellipse cx="300" cy="400" rx="90" ry="35" fill="#041812" />
          <ellipse cx="680" cy="300" rx="110" ry="40" fill="#041812" />
          <ellipse cx="500" cy="750" rx="80" ry="30" fill="#041812" />
        </g>
      </g>
    </g>
  );
};
