import React from 'react';

// Original Pixel Tree Component with 2D RPG canopy shading
interface TreeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  swayDelay?: string;
}

export const PixelTree: React.FC<TreeProps> = ({ size = 'md', className = '', swayDelay = '0s' }) => {
  const dimensions = {
    sm: { width: 36, height: 48 },
    md: { width: 50, height: 66 },
    lg: { width: 64, height: 84 },
  }[size];

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        filter: 'drop-shadow(0 6px 4px rgba(44, 82, 57, 0.45))',
      }}
    >
      <svg
        viewBox="0 0 48 64"
        width="100%"
        height="100%"
        className="animate-tree-sway"
        style={{
          animationDelay: swayDelay,
          shapeRendering: 'crispEdges',
        }}
      >
        {/* Tree Trunk */}
        <rect x="20" y="44" width="8" height="16" fill="#6d4327" />
        <rect x="22" y="46" width="4" height="14" fill="#845331" />
        <rect x="18" y="58" width="12" height="3" fill="#52321b" />
        <rect x="20" y="59" width="8" height="3" fill="#412715" />

        {/* Tree Foliage (Canopy) - Dark shadow base */}
        <rect x="10" y="10" width="28" height="36" rx="2" fill="#1b5e32" />
        <rect x="6" y="16" width="36" height="26" rx="2" fill="#1b5e32" />
        <rect x="14" y="6" width="20" height="42" rx="2" fill="#1b5e32" />

        {/* Foliage - Midtone green */}
        <rect x="8" y="12" width="32" height="30" fill="#2e7d43" />
        <rect x="12" y="8" width="24" height="36" fill="#2e7d43" />
        <rect x="6" y="18" width="36" height="20" fill="#2e7d43" />

        {/* Foliage - Highlights (top & left light source) */}
        <rect x="14" y="8" width="16" height="10" fill="#43a05b" />
        <rect x="10" y="14" width="18" height="12" fill="#43a05b" />
        <rect x="16" y="6" width="12" height="6" fill="#66bb6a" />
        <rect x="12" y="12" width="10" height="8" fill="#66bb6a" />
        <rect x="16" y="10" width="6" height="6" fill="#a5d6a7" />

        {/* Texture leaves specks */}
        <rect x="28" y="16" width="4" height="4" fill="#43a05b" />
        <rect x="24" y="24" width="6" height="4" fill="#43a05b" />
        <rect x="12" y="30" width="6" height="4" fill="#1b5e32" />
        <rect x="26" y="34" width="8" height="4" fill="#1b5e32" />
      </svg>
    </div>
  );
};

// Original Cozy Cottage / Home Component with animated chimney smoke
export const PixelCottage: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        width: 156,
        height: 120,
        filter: 'drop-shadow(0 10px 8px rgba(35, 68, 47, 0.5))',
      }}
    >
      {/* Animated Chimney Smoke Puffs */}
      <div className="absolute -top-6 left-[102px] pointer-events-none">
        <div className="w-3 h-3 bg-white/70 rounded-full animate-smoke-1" />
      </div>
      <div className="absolute -top-8 left-[106px] pointer-events-none">
        <div className="w-3.5 h-3.5 bg-white/60 rounded-full animate-smoke-2" />
      </div>

      <svg
        viewBox="0 0 130 100"
        width="100%"
        height="100%"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* House Shadow on Grass */}
        <ellipse cx="65" cy="92" rx="60" ry="8" fill="#589a6c" opacity="0.8" />

        {/* Chimney */}
        <rect x="88" y="4" width="16" height="22" fill="#9c5b31" />
        <rect x="86" y="2" width="20" height="4" fill="#b86d3b" />
        <rect x="90" y="6" width="12" height="18" fill="#824823" />
        <rect x="92" y="6" width="4" height="18" fill="#b86d3b" />
        <rect x="91" y="3" width="10" height="2" fill="#302016" />

        {/* Roof Base & Shadow */}
        <rect x="6" y="16" width="118" height="38" fill="#2d6a4f" />

        {/* Roof Tiles - Gabled 2D Shingle Rows */}
        <rect x="10" y="14" width="110" height="36" fill="#40916c" />
        <rect x="10" y="20" width="110" height="2" fill="#1b4332" />
        <rect x="10" y="28" width="110" height="2" fill="#1b4332" />
        <rect x="10" y="36" width="110" height="2" fill="#1b4332" />
        <rect x="10" y="44" width="110" height="2" fill="#1b4332" />

        {/* Roof Vertical Ridge Strips */}
        <rect x="16" y="14" width="4" height="34" fill="#52b788" />
        <rect x="28" y="14" width="4" height="34" fill="#52b788" />
        <rect x="40" y="14" width="4" height="34" fill="#52b788" />
        <rect x="52" y="14" width="4" height="34" fill="#52b788" />
        <rect x="64" y="14" width="4" height="34" fill="#52b788" />
        <rect x="76" y="14" width="4" height="34" fill="#52b788" />
        <rect x="88" y="14" width="4" height="34" fill="#52b788" />
        <rect x="100" y="14" width="4" height="34" fill="#52b788" />
        <rect x="112" y="14" width="4" height="34" fill="#52b788" />

        {/* Roof Ridge Cap (Top) */}
        <rect x="8" y="12" width="114" height="4" fill="#74c69d" />
        <rect x="6" y="13" width="118" height="2" fill="#95d5b2" />

        {/* Roof Eaves Trim */}
        <rect x="6" y="48" width="118" height="4" fill="#1b4332" />

        {/* House Walls (Plaster & Timber) */}
        <rect x="14" y="52" width="102" height="38" fill="#f8f5e6" />
        <rect x="14" y="86" width="102" height="4" fill="#d8d2be" />

        {/* Corner Timber Posts */}
        <rect x="14" y="52" width="10" height="38" fill="#e9c46a" />
        <rect x="16" y="52" width="6" height="38" fill="#f4a261" />
        <rect x="106" y="52" width="10" height="38" fill="#e9c46a" />
        <rect x="108" y="52" width="6" height="38" fill="#f4a261" />

        {/* Wooden Entrance Door */}
        <rect x="30" y="58" width="22" height="32" fill="#264653" />
        <rect x="32" y="60" width="18" height="30" fill="#1d353f" />
        <rect x="46" y="74" width="2" height="4" fill="#e76f51" />

        {/* Cozy Window with frame & glass shine */}
        <rect x="68" y="60" width="30" height="18" fill="#3a4b56" />
        <rect x="70" y="62" width="12" height="14" fill="#90e0ef" />
        <rect x="84" y="62" width="12" height="14" fill="#90e0ef" />
        <rect x="68" y="68" width="30" height="2" fill="#2b2d42" />
        <rect x="82" y="60" width="2" height="18" fill="#2b2d42" />
        <rect x="72" y="63" width="4" height="5" fill="#caf0f8" />
        <rect x="86" y="63" width="4" height="5" fill="#caf0f8" />

        {/* Flowerbox under Window */}
        <rect x="67" y="79" width="32" height="5" fill="#8d5b4c" />
        <rect x="71" y="77" width="4" height="3" fill="#e63946" />
        <rect x="78" y="76" width="4" height="4" fill="#f4a261" />
        <rect x="85" y="77" width="4" height="3" fill="#ffb703" />
        <rect x="91" y="76" width="4" height="4" fill="#e63946" />
      </svg>
    </div>
  );
};

// Original Cute 2D RPG Character with idle breathing motion
export const PixelPlayerCharacter: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative select-none pointer-events-none animate-idle-breathe ${className}`}
      style={{
        width: 44,
        height: 56,
        filter: 'drop-shadow(0 6px 3px rgba(44, 82, 57, 0.4))',
      }}
    >
      <svg
        viewBox="0 0 32 40"
        width="100%"
        height="100%"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* Character Ground Shadow */}
        <ellipse cx="16" cy="37" rx="10" ry="3" fill="#589a6c" opacity="0.75" />

        {/* Hair - Spiky Adventurer Style (Dark slate with highlights) */}
        <rect x="10" y="4" width="12" height="4" fill="#2b2d42" />
        <rect x="8" y="6" width="16" height="5" fill="#2b2d42" />
        <rect x="6" y="9" width="5" height="5" fill="#2b2d42" />
        <rect x="21" y="9" width="5" height="5" fill="#2b2d42" />
        <rect x="11" y="5" width="8" height="2" fill="#4a4e69" />
        <rect x="9" y="7" width="4" height="2" fill="#4a4e69" />

        {/* Face / Head */}
        <rect x="10" y="11" width="12" height="9" fill="#ffd166" />
        <rect x="10" y="16" width="2" height="2" fill="#f4978e" />
        <rect x="20" y="16" width="2" height="2" fill="#f4978e" />
        <rect x="12" y="14" width="2" height="3" fill="#1e1e24" />
        <rect x="18" y="14" width="2" height="3" fill="#1e1e24" />
        <rect x="12" y="14" width="1" height="1" fill="#ffffff" />
        <rect x="18" y="14" width="1" height="1" fill="#ffffff" />

        {/* Adventurer Tunic / Jacket */}
        <rect x="9" y="20" width="14" height="9" fill="#1d3557" />
        <rect x="11" y="20" width="10" height="2" fill="#457b9d" />
        <rect x="10" y="27" width="12" height="2" fill="#8338ec" />
        <rect x="15" y="27" width="2" height="2" fill="#ffb703" />

        {/* Arms / Hands */}
        <rect x="7" y="22" width="2" height="6" fill="#1d3557" />
        <rect x="7" y="28" width="2" height="2" fill="#ffd166" />
        <rect x="23" y="22" width="2" height="6" fill="#1d3557" />
        <rect x="23" y="28" width="2" height="2" fill="#ffd166" />

        {/* Trousers */}
        <rect x="11" y="29" width="4" height="5" fill="#3d3a45" />
        <rect x="17" y="29" width="4" height="5" fill="#3d3a45" />

        {/* Boots */}
        <rect x="10" y="34" width="5" height="3" fill="#5c4d3c" />
        <rect x="17" y="34" width="5" height="3" fill="#5c4d3c" />
      </svg>
    </div>
  );
};

// Cute Original RPG Pet Companion (Golden woodland fox-pup with animated tail wag)
export const PixelPet: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative select-none pointer-events-none animate-idle-breathe ${className}`}
      style={{
        width: 32,
        height: 34,
        filter: 'drop-shadow(0 4px 2px rgba(44, 82, 57, 0.45))',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* Pet Ground Shadow */}
        <ellipse cx="12" cy="22" rx="7" ry="2.5" fill="#589a6c" opacity="0.75" />

        {/* Animated Wagging Bushy Tail */}
        <g className="animate-pet-tail" style={{ transformOrigin: '7px 18px' }}>
          <rect x="2" y="13" width="5" height="5" fill="#e76f51" />
          <rect x="4" y="11" width="4" height="4" fill="#f4a261" />
          <rect x="1" y="12" width="3" height="3" fill="#ffffff" />
        </g>

        {/* Pet Body */}
        <rect x="7" y="12" width="10" height="9" fill="#e76f51" />
        <rect x="10" y="13" width="5" height="6" fill="#fefae0" />

        {/* Cute Pointy Ears */}
        <rect x="7" y="3" width="3" height="4" fill="#e76f51" />
        <rect x="8" y="4" width="2" height="2" fill="#ffb4a2" />
        <rect x="14" y="3" width="3" height="4" fill="#e76f51" />
        <rect x="14" y="4" width="2" height="2" fill="#ffb4a2" />

        {/* Pet Head */}
        <rect x="7" y="6" width="10" height="7" fill="#f4a261" />
        <rect x="8" y="7" width="8" height="6" fill="#f4a261" />

        {/* Cheeks / Muzzle */}
        <rect x="9" y="9" width="6" height="4" fill="#fefae0" />
        <rect x="11" y="10" width="2" height="1.5" fill="#2b2d42" />

        {/* Sparkly Eyes */}
        <rect x="8" y="8" width="2" height="2" fill="#264653" />
        <rect x="14" y="8" width="2" height="2" fill="#264653" />
        <rect x="8" y="8" width="1" height="1" fill="#ffffff" />
        <rect x="14" y="8" width="1" height="1" fill="#ffffff" />

        {/* Little Paws */}
        <rect x="7" y="20" width="3" height="2" fill="#fefae0" />
        <rect x="14" y="20" width="3" height="2" fill="#fefae0" />
      </svg>
    </div>
  );
};

// Original Pixel Winding River with wooden footbridge, lilypads, and shimmer ripples
export const PixelRiver: React.FC = () => {
  return (
    <div className="absolute inset-y-0 right-0 w-[240px] sm:w-[320px] md:w-[380px] pointer-events-none z-0 overflow-hidden select-none">
      <svg
        viewBox="0 0 380 900"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ shapeRendering: 'crispEdges' }}
      >
        <defs>
          <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48cae4" />
            <stop offset="35%" stopColor="#0096c7" />
            <stop offset="70%" stopColor="#023e8a" />
            <stop offset="100%" stopColor="#03045e" />
          </linearGradient>
        </defs>

        {/* Outer Shoreline / Riverbank Grass Shadow */}
        <path
          d="M 170 0 Q 140 180 200 340 T 150 620 Q 120 780 180 900 L 380 900 L 380 0 Z"
          fill="#529467"
        />

        {/* Sandy / Pebble Riverbank Border */}
        <path
          d="M 182 0 Q 152 180 212 340 T 162 620 Q 132 780 192 900 L 380 900 L 380 0 Z"
          fill="#3a7082"
        />

        {/* Shallow Riverbed Edge */}
        <path
          d="M 194 0 Q 164 180 224 340 T 174 620 Q 144 780 204 900 L 380 900 L 380 0 Z"
          fill="#48cae4"
        />

        {/* Main Deep Flowing River Body */}
        <path
          d="M 206 0 Q 176 180 236 340 T 186 620 Q 156 780 216 900 L 380 900 L 380 0 Z"
          fill="url(#riverGradient)"
        />

        {/* Deep Water Core */}
        <path
          d="M 230 0 Q 200 180 260 340 T 210 620 Q 180 780 240 900 L 380 900 L 380 0 Z"
          fill="#0077b6"
          opacity="0.85"
        />

        {/* Animated Water Ripple & Shimmer 1 */}
        <g className="animate-water-shimmer-1">
          <rect x="220" y="80" width="24" height="3" fill="#caf0f8" opacity="0.75" />
          <rect x="235" y="83" width="12" height="2" fill="#ffffff" opacity="0.9" />

          <rect x="250" y="180" width="30" height="3" fill="#caf0f8" opacity="0.75" />
          <rect x="260" y="183" width="14" height="2" fill="#ffffff" opacity="0.9" />

          <rect x="230" y="440" width="28" height="3" fill="#caf0f8" opacity="0.7" />
          <rect x="240" y="443" width="10" height="2" fill="#ffffff" opacity="0.9" />

          <rect x="210" y="710" width="26" height="3" fill="#caf0f8" opacity="0.75" />
          <rect x="222" y="713" width="10" height="2" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Animated Water Ripple & Shimmer 2 */}
        <g className="animate-water-shimmer-2">
          <rect x="240" y="130" width="22" height="3" fill="#caf0f8" opacity="0.65" />
          <rect x="225" y="270" width="28" height="3" fill="#caf0f8" opacity="0.75" />
          <rect x="236" y="273" width="12" height="2" fill="#ffffff" opacity="0.9" />

          <rect x="215" y="550" width="26" height="3" fill="#caf0f8" opacity="0.75" />
          <rect x="225" y="553" width="12" height="2" fill="#ffffff" opacity="0.9" />

          <rect x="245" y="820" width="24" height="3" fill="#caf0f8" opacity="0.7" />
        </g>

        {/* Lily Pads with Pink Water Blossom */}
        <circle cx="230" cy="220" r="10" fill="#2d6a4f" />
        <circle cx="230" cy="220" r="8" fill="#40916c" />
        <rect x="230" y="212" width="2" height="8" fill="#1b4332" />
        <circle cx="233" cy="218" r="3.5" fill="#ff70a6" />
        <circle cx="233" cy="218" r="1.5" fill="#ffffff" />

        <circle cx="215" cy="650" r="9" fill="#2d6a4f" />
        <circle cx="215" cy="650" r="7" fill="#40916c" />
        <circle cx="217" cy="648" r="3" fill="#ff70a6" />

        {/* Cute Wooden Footbridge crossing the river */}
        <g style={{ filter: 'drop-shadow(0 6px 4px rgba(20,40,25,0.4))' }}>
          <rect x="180" y="340" width="110" height="6" fill="#4a2810" />
          <rect x="180" y="380" width="110" height="6" fill="#4a2810" />

          <rect x="182" y="338" width="12" height="48" fill="#8c5835" />
          <rect x="184" y="340" width="8" height="44" fill="#a46d43" />

          <rect x="198" y="338" width="12" height="48" fill="#7a4b2c" />
          <rect x="200" y="340" width="8" height="44" fill="#935f38" />

          <rect x="214" y="338" width="12" height="48" fill="#8c5835" />
          <rect x="216" y="340" width="8" height="44" fill="#a46d43" />

          <rect x="230" y="338" width="12" height="48" fill="#7a4b2c" />
          <rect x="232" y="340" width="8" height="44" fill="#935f38" />

          <rect x="246" y="338" width="12" height="48" fill="#8c5835" />
          <rect x="248" y="340" width="8" height="44" fill="#a46d43" />

          <rect x="262" y="338" width="12" height="48" fill="#7a4b2c" />
          <rect x="264" y="340" width="8" height="44" fill="#935f38" />

          <rect x="278" y="338" width="12" height="48" fill="#8c5835" />
          <rect x="280" y="340" width="8" height="44" fill="#a46d43" />

          <rect x="178" y="335" width="116" height="4" fill="#5a3416" />
          <rect x="178" y="387" width="116" height="4" fill="#5a3416" />

          <rect x="178" y="333" width="5" height="8" fill="#3c200c" />
          <rect x="235" y="333" width="5" height="8" fill="#3c200c" />
          <rect x="289" y="333" width="5" height="8" fill="#3c200c" />
          <rect x="178" y="385" width="5" height="8" fill="#3c200c" />
          <rect x="235" y="385" width="5" height="8" fill="#3c200c" />
          <rect x="289" y="385" width="5" height="8" fill="#3c200c" />
        </g>
      </svg>
    </div>
  );
};

// Flower Patch Component with rich petal colors
export const PixelFlowerPatch: React.FC<{
  className?: string;
  color?: 'red' | 'yellow' | 'white' | 'pink' | 'blue' | 'purple';
  scale?: number;
}> = ({
  className = '',
  color = 'red',
  scale = 1,
}) => {
  const flowerColor = {
    red: '#e63946',
    yellow: '#ffb703',
    white: '#f1faee',
    pink: '#ff70a6',
    blue: '#4cc9f0',
    purple: '#9d4edd',
  }[color];

  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{
        width: 18 * scale,
        height: 14 * scale,
        filter: 'drop-shadow(0 2px 2px rgba(40,75,50,0.3))',
      }}
    >
      <svg viewBox="0 0 16 12" width="100%" height="100%" style={{ shapeRendering: 'crispEdges' }}>
        <rect x="7" y="5" width="2" height="6" fill="#2d6a4f" />
        <rect x="5" y="7" width="2" height="2" fill="#40916c" />
        <rect x="9" y="8" width="2" height="2" fill="#40916c" />
        <rect x="6" y="2" width="4" height="4" fill={flowerColor} />
        <rect x="7" y="1" width="2" height="6" fill={flowerColor} />
        <rect x="5" y="3" width="6" height="2" fill={flowerColor} />
        <rect x="7" y="3" width="2" height="2" fill="#ffd166" />
      </svg>
    </div>
  );
};

// Cute Single Wildflower for micro-detailing the meadow
export const PixelTinyFlower: React.FC<{
  className?: string;
  color?: 'yellow' | 'white' | 'pink' | 'blue' | 'red' | 'purple';
}> = ({ className = '', color = 'yellow' }) => {
  const flowerColor = {
    red: '#e63946',
    yellow: '#ffb703',
    white: '#f8f9fa',
    pink: '#ff85a1',
    blue: '#48cae4',
    purple: '#9d4edd',
  }[color];

  return (
    <div className={`select-none pointer-events-none ${className}`} style={{ width: 10, height: 10 }}>
      <svg viewBox="0 0 8 8" width="100%" height="100%" style={{ shapeRendering: 'crispEdges' }}>
        <rect x="3" y="4" width="2" height="4" fill="#38b000" />
        <rect x="2" y="1" width="4" height="4" fill={flowerColor} />
        <rect x="3" y="2" width="2" height="2" fill="#fff3b0" />
      </svg>
    </div>
  );
};

// Cute Double Flower Cluster (Two blooming wildflowers together)
export const PixelFlowerCluster: React.FC<{
  className?: string;
  color1?: 'red' | 'yellow' | 'pink' | 'blue' | 'purple';
  color2?: 'white' | 'yellow' | 'pink';
}> = ({ className = '', color1 = 'pink', color2 = 'white' }) => {
  const c1 = {
    red: '#e63946',
    yellow: '#ffb703',
    pink: '#ff70a6',
    blue: '#00b4d8',
    purple: '#9d4edd',
  }[color1];

  const c2 = {
    white: '#f1faee',
    yellow: '#ffd166',
    pink: '#ff85a1',
  }[color2];

  return (
    <div className={`select-none pointer-events-none ${className}`} style={{ width: 22, height: 16 }}>
      <svg viewBox="0 0 20 14" width="100%" height="100%" style={{ shapeRendering: 'crispEdges' }}>
        {/* Flower 1 */}
        <rect x="5" y="6" width="2" height="6" fill="#2d6a4f" />
        <rect x="3" y="8" width="2" height="2" fill="#40916c" />
        <rect x="4" y="2" width="4" height="4" fill={c1} />
        <rect x="5" y="1" width="2" height="6" fill={c1} />
        <rect x="3" y="3" width="6" height="2" fill={c1} />
        <rect x="5" y="3" width="2" height="2" fill="#ffd166" />

        {/* Flower 2 */}
        <rect x="13" y="7" width="2" height="6" fill="#2d6a4f" />
        <rect x="15" y="9" width="2" height="2" fill="#40916c" />
        <rect x="12" y="3" width="4" height="4" fill={c2} />
        <rect x="13" y="2" width="2" height="6" fill={c2} />
        <rect x="11" y="4" width="6" height="2" fill={c2} />
        <rect x="13" y="4" width="2" height="2" fill="#ffb703" />
      </svg>
    </div>
  );
};

// Grass Tuft Component
export const PixelGrassTuft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`select-none pointer-events-none opacity-45 ${className}`} style={{ width: 14, height: 10 }}>
    <svg viewBox="0 0 12 8" width="100%" height="100%" style={{ shapeRendering: 'crispEdges' }}>
      <rect x="2" y="2" width="2" height="5" fill="#509163" />
      <rect x="5" y="0" width="2" height="7" fill="#407851" />
      <rect x="8" y="3" width="2" height="4" fill="#509163" />
    </svg>
  </div>
);

// Main Full Overworld Background Container
export const RpgOverworldBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none rpg-grass-field select-none"
      aria-hidden="true"
    >
      {/* 2D Winding Pixel River with Bridge (Right side) */}
      <PixelRiver />

      {/* Background Soft Grass Tufts evenly sprinkled */}
      <PixelGrassTuft className="absolute top-10 left-[8%]" />
      <PixelGrassTuft className="absolute top-24 left-[28%]" />
      <PixelGrassTuft className="absolute top-16 right-[35%]" />
      <PixelGrassTuft className="absolute top-36 left-[38%]" />
      <PixelGrassTuft className="absolute top-[48%] left-[6%]" />
      <PixelGrassTuft className="absolute top-[56%] left-[34%]" />
      <PixelGrassTuft className="absolute bottom-28 left-[14%]" />
      <PixelGrassTuft className="absolute bottom-12 left-[36%]" />
      <PixelGrassTuft className="absolute bottom-20 left-[22%]" />
      <PixelGrassTuft className="absolute bottom-8 left-[45%]" />

      {/* --- FLOWER GARDEN & MEADOW BLOOMS --- */}
      {/* Cottage Garden Area (Upper Left) */}
      <PixelFlowerPatch color="pink" className="absolute top-36 left-[4%]" />
      <PixelFlowerPatch color="yellow" className="absolute top-44 left-[10%]" />
      <PixelFlowerPatch color="red" className="absolute top-48 left-[14%]" />
      <PixelFlowerCluster color1="purple" color2="pink" className="absolute top-38 left-[18%]" />
      <PixelTinyFlower color="yellow" className="absolute top-32 left-[15%]" />
      <PixelTinyFlower color="white" className="absolute top-42 left-[7%]" />
      <PixelTinyFlower color="pink" className="absolute top-52 left-[11%]" />

      {/* Companion Meadow Glade (Around Character & Pet) */}
      <PixelFlowerCluster color1="blue" color2="white" className="absolute top-52 left-[32%]" />
      <PixelFlowerPatch color="purple" className="absolute top-56 left-[22%]" />
      <PixelTinyFlower color="yellow" className="absolute top-46 left-[20%]" />
      <PixelTinyFlower color="red" className="absolute top-48 left-[29%]" />
      <PixelTinyFlower color="blue" className="absolute top-58 left-[27%]" />

      {/* Upper Meadow & Sunlit Clearing */}
      <PixelFlowerPatch color="white" className="absolute top-26 left-[34%]" />
      <PixelFlowerPatch color="blue" className="absolute top-14 left-[46%] hidden sm:block" />
      <PixelFlowerCluster color1="pink" color2="yellow" className="absolute top-18 right-[36%]" />
      <PixelTinyFlower color="white" className="absolute top-22 left-[40%]" />
      <PixelTinyFlower color="pink" className="absolute top-12 left-[24%]" />

      {/* Mid Left Meadow Flank */}
      <PixelFlowerPatch color="red" className="absolute top-[58%] left-[8%]" />
      <PixelFlowerCluster color1="yellow" color2="white" className="absolute top-[66%] left-[12%]" />
      <PixelTinyFlower color="purple" className="absolute top-[62%] left-[4%]" />
      <PixelTinyFlower color="blue" className="absolute top-[72%] left-[9%]" />

      {/* Riverbank Wildflowers (Right side along the river shore) */}
      <PixelFlowerPatch color="blue" className="absolute top-24 right-[28%]" />
      <PixelFlowerCluster color1="purple" color2="pink" className="absolute top-42 right-[24%]" />
      <PixelFlowerPatch color="pink" className="absolute top-[62%] right-[22%]" />
      <PixelFlowerCluster color1="red" color2="yellow" className="absolute top-[75%] right-[25%]" />
      <PixelTinyFlower color="yellow" className="absolute top-34 right-[30%]" />
      <PixelTinyFlower color="white" className="absolute top-[50%] right-[26%]" />
      <PixelTinyFlower color="blue" className="absolute top-[68%] right-[29%]" />

      {/* Lower Meadow & Foreground Blooms (Bottom area) */}
      <PixelFlowerPatch color="red" className="absolute bottom-36 left-[16%]" />
      <PixelFlowerPatch color="yellow" className="absolute bottom-24 left-[26%]" />
      <PixelFlowerCluster color1="pink" color2="white" className="absolute bottom-16 left-[12%]" />
      <PixelFlowerCluster color1="blue" color2="yellow" className="absolute bottom-28 left-[38%]" />
      <PixelFlowerPatch color="white" className="absolute bottom-14 right-[42%]" />
      <PixelFlowerPatch color="purple" className="absolute bottom-20 right-[34%]" />
      <PixelTinyFlower color="pink" className="absolute bottom-32 left-[20%]" />
      <PixelTinyFlower color="white" className="absolute bottom-10 left-[29%]" />
      <PixelTinyFlower color="red" className="absolute bottom-6 left-[18%]" />
      <PixelTinyFlower color="yellow" className="absolute bottom-18 right-[46%]" />
      <PixelTinyFlower color="blue" className="absolute bottom-10 right-[38%]" />

      {/* Cozy Pixel Cottage (Upper-Left background area) */}
      <div className="absolute top-6 sm:top-10 left-[3%] sm:left-[8%] lg:left-[12%] z-0">
        <PixelCottage />
      </div>

      {/* Cute Animated Adventurer Character & Pet Companion */}
      <div className="absolute top-44 sm:top-40 left-[24%] sm:left-[22%] lg:left-[25%] z-10 flex items-end gap-2">
        <PixelPlayerCharacter />
        {/* Cute Pet Companion sitting beside the player */}
        <PixelPet className="mb-0.5" />
      </div>

      {/* Natural Tree Perimeter */}
      {/* TOP ROW TREES */}
      <PixelTree size="md" className="absolute -top-3 left-[32%] hidden sm:block" swayDelay="0.2s" />
      <PixelTree size="lg" className="absolute -top-4 right-[42%] hidden sm:block" swayDelay="1.4s" />
      <PixelTree size="sm" className="absolute top-2 right-[28%]" swayDelay="0.7s" />

      {/* LEFT FLANK TREES */}
      <PixelTree size="lg" className="absolute top-36 -left-3 hidden sm:block" swayDelay="0.5s" />
      <PixelTree size="md" className="absolute top-[48%] left-[2%] sm:left-[4%]" swayDelay="1.8s" />
      <PixelTree size="lg" className="absolute bottom-24 left-[1%] sm:left-[5%]" swayDelay="0.9s" />
      <PixelTree size="sm" className="absolute bottom-6 left-[8%]" swayDelay="2.1s" />

      {/* RIGHT FLANK TREES (Right side & riverbank) */}
      <PixelTree size="lg" className="absolute top-16 right-[2%] sm:right-[4%]" swayDelay="1.6s" />
      <PixelTree size="md" className="absolute top-[46%] right-[1%] sm:right-[3%]" swayDelay="0.4s" />
      <PixelTree size="lg" className="absolute bottom-20 right-[2%] sm:right-[4%]" swayDelay="1.2s" />
      <PixelTree size="sm" className="absolute bottom-4 right-[16%] hidden sm:block" swayDelay="2.3s" />

      {/* BOTTOM TREES */}
      <PixelTree size="md" className="absolute -bottom-4 left-[24%] hidden md:block" swayDelay="1.5s" />
      <PixelTree size="sm" className="absolute -bottom-3 left-[40%] hidden md:block" swayDelay="0.8s" />

      {/* Floating Breeze Leaves / Petals */}
      <div className="absolute top-16 left-[20%] animate-breeze-drift pointer-events-none">
        <div className="w-1.5 h-1 bg-emerald-700 rounded-full" />
      </div>
      <div className="absolute top-32 left-[45%] animate-breeze-drift pointer-events-none" style={{ animationDelay: '3s' }}>
        <div className="w-1.5 h-1 bg-amber-600 rounded-full" />
      </div>
      <div className="absolute bottom-40 left-[15%] animate-breeze-drift pointer-events-none" style={{ animationDelay: '5s' }}>
        <div className="w-1.5 h-1 bg-emerald-600 rounded-full" />
      </div>
    </div>
  );
};
