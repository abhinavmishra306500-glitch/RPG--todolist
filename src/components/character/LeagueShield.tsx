import React from 'react';
import type { PlayerLeague } from '../../types/progression';
import { normalizeLeague } from '../../utils/league';

export interface ShieldMetadata {
  name: string;
  description: string;
  tier: string;
  division?: string;
}

export const getShieldMetadata = (league: Partial<PlayerLeague> | null | undefined): ShieldMetadata => {
  const norm = normalizeLeague(league);
  const tier = norm.tier;
  const div = norm.division || 'III';

  if (tier === 'Bronze') {
    if (div === 'III') {
      return {
        name: 'Rusty Bronze Buckler',
        description: 'Weathered oak core with battle-worn, rusty bronze plating',
        tier: 'Bronze',
        division: 'III',
      };
    }
    if (div === 'II') {
      return {
        name: 'Reinforced Bronze Shield',
        description: 'Sturdy hammered bronze heater shield with riveted rim',
        tier: 'Bronze',
        division: 'II',
      };
    }
    return {
      name: 'Furnished Bronze Aegis',
      description: 'Masterfully burnished bronze shield with golden rim & star crest',
      tier: 'Bronze',
      division: 'I',
    };
  }

  if (tier === 'Silver') {
    if (div === 'III') {
      return {
        name: 'Sturdy Silver Buckler',
        description: 'Polished silver-steel buckler with concentric reinforcement rings',
        tier: 'Silver',
        division: 'III',
      };
    }
    if (div === 'II') {
      return {
        name: 'Knightly Silver Shield',
        description: 'Gleaming silver heater shield with royal azure heraldic chevron',
        tier: 'Silver',
        division: 'II',
      };
    }
    return {
      name: 'Paladin Silver Aegis',
      description: 'Burnished mirror silver aegis with gilded gold trim & cyan gem',
      tier: 'Silver',
      division: 'I',
    };
  }

  if (tier === 'Gold') {
    if (div === 'III') {
      return {
        name: 'Golden Champion Buckler',
        description: 'Radiant gold round shield embossed with sunburst motifs',
        tier: 'Gold',
        division: 'III',
      };
    }
    if (div === 'II') {
      return {
        name: 'Royal Gilded Tower Shield',
        description: 'Impenetrable gold tower shield adorned with ruby gemstone',
        tier: 'Gold',
        division: 'II',
      };
    }
    return {
      name: 'Sovereign Gold Aegis',
      description: 'Pure burnished auric aegis with diamond star core & wing filigree',
      tier: 'Gold',
      division: 'I',
    };
  }

  if (tier === 'Diamond') {
    if (div === 'III') {
      return {
        name: 'Crystalline Diamond Kite',
        description: 'Faceted cyan diamond kite shield resonating with energy',
        tier: 'Diamond',
        division: 'III',
      };
    }
    if (div === 'II') {
      return {
        name: 'Prismatic Diamond Pavise',
        description: 'Shimmering diamond pavise with prismatic refraction facets',
        tier: 'Diamond',
        division: 'II',
      };
    }
    return {
      name: 'Astral Diamond Aegis',
      description: 'Supernova diamond aegis pulsing with celestial cyan starlight',
      tier: 'Diamond',
      division: 'I',
    };
  }

  // Mythical
  return {
    name: 'Cosmic Divine Aegis',
    description: 'Transcendent void amethyst shield crowned with celestial star core',
    tier: 'Mythical',
  };
};

/**
 * Renders the SVG pixel-art shield attached to the character's hand.
 * Shield center: (24, 76).
 */
export const LeagueShieldSvg: React.FC<{ league?: Partial<PlayerLeague> | null }> = ({ league }) => {
  const norm = normalizeLeague(league);
  const tier = norm.tier;
  const div = norm.division || 'III';

  // --- BRONZE III: Rusty Bronze Buckler ---
  if (tier === 'Bronze' && div === 'III') {
    return (
      <g className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {/* Hand grip strap underneath */}
        <rect x="27" y="74" width="4" height="6" fill="#38220f" />

        {/* Aged weathered wood base */}
        <circle cx="24" cy="76" r="10.5" fill="#4a2e18" />
        <circle cx="24" cy="76" r="9.5" fill="#5c381e" />

        {/* Rusty weathered bronze rim */}
        <circle cx="24" cy="76" r="9.5" fill="none" stroke="#78350f" strokeWidth="2.5" />
        <circle cx="24" cy="76" r="8.5" fill="none" stroke="#92400e" strokeWidth="1" strokeDasharray="4 2" />

        {/* Pitted Iron Cross Straps */}
        <rect x="22.5" y="67" width="3" height="18" fill="#362213" />
        <rect x="15" y="74.5" width="18" height="3" fill="#362213" />

        {/* Rust & wear spots */}
        <rect x="19" y="70" width="2" height="2" fill="#78350f" />
        <rect x="27" y="79" width="3" height="2" fill="#713f12" />
        <rect x="18" y="79" width="2" height="2" fill="#451a03" />

        {/* Central Weathered Bronze Boss */}
        <circle cx="24" cy="76" r="4" fill="#a16207" />
        <circle cx="24" cy="76" r="2.5" fill="#78350f" />
        <circle cx="23.5" cy="75.5" r="1" fill="#ca8a04" />

        {/* Rusty Rivets */}
        <circle cx="24" cy="68" r="1" fill="#854d0e" />
        <circle cx="24" cy="84" r="1" fill="#854d0e" />
        <circle cx="16" cy="76" r="1" fill="#854d0e" />
        <circle cx="32" cy="76" r="1" fill="#854d0e" />
      </g>
    );
  }

  // --- BRONZE II: Reinforced Polished Bronze Shield ---
  if (tier === 'Bronze' && div === 'II') {
    return (
      <g className="filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
        {/* Grip strap */}
        <rect x="27" y="74" width="4" height="6" fill="#451a03" />

        {/* Outer Bronze Rim */}
        <polygon points="15,65 33,65 34,78 24,88 14,78" fill="#78350f" />
        {/* Main Bronze Plate */}
        <polygon points="17,67 31,67 32,77 24,85 16,77" fill="#b45309" />
        {/* Polished bronze inner face */}
        <polygon points="19,69 29,69 30,75 24,82 18,75" fill="#d97706" />

        {/* Polish highlight line */}
        <line x1="20" y1="69" x2="20" y2="78" stroke="#fcd34d" strokeWidth="1.5" />

        {/* Bronze Center Boss */}
        <circle cx="24" cy="75" r="3.5" fill="#f59e0b" />
        <circle cx="24" cy="75" r="2" fill="#78350f" />
        <circle cx="23.5" cy="74.5" r="0.8" fill="#fef08a" />

        {/* Golden-bronze Corner Studs */}
        <circle cx="17" cy="67" r="1" fill="#fbbf24" />
        <circle cx="31" cy="67" r="1" fill="#fbbf24" />
        <circle cx="24" cy="84" r="1" fill="#fbbf24" />
      </g>
    );
  }

  // --- BRONZE I: Furnished / Burnished Bronze Aegis ---
  if (tier === 'Bronze' && div === 'I') {
    return (
      <g className="filter drop-shadow-[0_2px_6px_rgba(217,119,6,0.6)]">
        {/* Grip strap */}
        <rect x="27" y="74" width="4" height="6" fill="#52321b" />

        {/* Outer Gilded Rim */}
        <polygon points="14,64 34,64 35,78 24,90 13,78" fill="#78350f" />
        <polygon points="14,64 34,64 35,78 24,90 13,78" stroke="#fbbf24" strokeWidth="1.5" fill="none" />

        {/* Rich Burnished Bronze Body */}
        <polygon points="16,66 32,66 33,77 24,87 15,77" fill="#d97706" />
        {/* Radiant Center Highlight */}
        <polygon points="18,68 30,68 31,75 24,83 17,75" fill="#f59e0b" />

        {/* 4-Point Burnished Bronze Star Crest */}
        <polygon points="24,69 26,73 30,75 26,77 24,81 22,77 18,75 22,73" fill="#fef08a" />
        <circle cx="24" cy="75" r="1.5" fill="#d97706" />
        <circle cx="23.5" cy="74.5" r="0.6" fill="#ffffff" />

        {/* Gleaming Corner Accents */}
        <rect x="15" y="65" width="2" height="2" fill="#fef08a" />
        <rect x="31" y="65" width="2" height="2" fill="#fef08a" />
      </g>
    );
  }

  // --- SILVER III: Sturdy Silver Buckler ---
  if (tier === 'Silver' && div === 'III') {
    return (
      <g className="filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
        <rect x="27" y="74" width="4" height="6" fill="#1e293b" />

        {/* Steel Outer Rim */}
        <circle cx="24" cy="76" r="10.5" fill="#334155" />
        <circle cx="24" cy="76" r="9.5" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Inner Silver Plate */}
        <circle cx="24" cy="76" r="7" fill="#94a3b8" />
        <circle cx="24" cy="76" r="5" fill="#cbd5e1" />

        {/* Center Silver Boss */}
        <circle cx="24" cy="76" r="3" fill="#f8fafc" />
        <circle cx="23.5" cy="75.5" r="1" fill="#ffffff" />

        {/* Silver Studs */}
        <circle cx="24" cy="68" r="1" fill="#f8fafc" />
        <circle cx="24" cy="84" r="1" fill="#f8fafc" />
        <circle cx="16" cy="76" r="1" fill="#f8fafc" />
        <circle cx="32" cy="76" r="1" fill="#f8fafc" />
      </g>
    );
  }

  // --- SILVER II: Knightly Silver Shield (with Cobalt Chevron) ---
  if (tier === 'Silver' && div === 'II') {
    return (
      <g className="filter drop-shadow-[0_2px_6px_rgba(148,163,184,0.5)]">
        <rect x="27" y="74" width="4" height="6" fill="#1e293b" />

        {/* Outer Steel Border */}
        <polygon points="14,64 34,64 35,78 24,89 13,78" fill="#334155" />
        {/* Polished Silver Plate */}
        <polygon points="16,66 32,66 33,76 24,86 15,76" fill="#cbd5e1" />
        <polygon points="18,67 30,67 31,75 24,83 17,75" fill="#e2e8f0" />

        {/* Royal Cobalt Heraldic Chevron */}
        <polygon points="16,72 24,78 32,72 32,75 24,82 16,75" fill="#2563eb" />
        <polygon points="18,72 24,76 30,72 30,74 24,78 18,74" fill="#3b82f6" />

        {/* Mirror Highlight */}
        <polyline points="18,67 18,74 24,82" stroke="#ffffff" strokeWidth="1" fill="none" />
      </g>
    );
  }

  // --- SILVER I: Paladin Silver Aegis (Burnished Silver + Gilded Gold) ---
  if (tier === 'Silver' && div === 'I') {
    return (
      <g className="filter drop-shadow-[0_2px_8px_rgba(203,213,225,0.6)]">
        <rect x="27" y="74" width="4" height="6" fill="#1e293b" />

        {/* Gold Filigree Outer Rim */}
        <polygon points="13,63 35,63 36,78 24,91 12,78" fill="#92400e" />
        <polygon points="13,63 35,63 36,78 24,91 12,78" stroke="#fbbf24" strokeWidth="1.5" fill="none" />

        {/* Mirror Silver Plate */}
        <polygon points="15,65 33,65 34,77 24,88 14,77" fill="#e2e8f0" />
        <polygon points="17,67 31,67 32,75 24,84 16,75" fill="#f8fafc" />

        {/* Radiant Azure Star Core */}
        <polygon points="24,68 27,73 32,75 27,77 24,82 21,77 16,75 21,73" fill="#0284c7" />
        <polygon points="24,70 26,73 30,75 26,77 24,80 22,77 18,75 22,73" fill="#38bdf8" />
        <circle cx="24" cy="75" r="1.5" fill="#ffffff" />
      </g>
    );
  }

  // --- GOLD III: Golden Champion Buckler ---
  if (tier === 'Gold' && div === 'III') {
    return (
      <g className="filter drop-shadow-[0_2px_7px_rgba(234,179,8,0.6)]">
        <rect x="27" y="74" width="4" height="6" fill="#713f12" />

        {/* Outer Gold Rim */}
        <circle cx="24" cy="76" r="11" fill="#713f12" />
        <circle cx="24" cy="76" r="10" fill="#ca8a04" stroke="#fde047" strokeWidth="1.5" />

        {/* Radiant Sunburst Plate */}
        <circle cx="24" cy="76" r="7.5" fill="#eab308" />

        {/* Sunburst Rays */}
        <rect x="23" y="67" width="2" height="18" fill="#fef08a" />
        <rect x="15" y="75" width="18" height="2" fill="#fef08a" />
        <polygon points="19,71 29,81 27,83 17,73" fill="#fef08a" />
        <polygon points="29,71 19,81 17,83 27,73" fill="#fef08a" />

        {/* Center Amber Jewel */}
        <circle cx="24" cy="76" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
        <circle cx="23.5" cy="75.5" r="1.2" fill="#ffffff" />
      </g>
    );
  }

  // --- GOLD II: Royal Gilded Tower Shield (with Ruby) ---
  if (tier === 'Gold' && div === 'II') {
    return (
      <g className="filter drop-shadow-[0_2px_8px_rgba(234,179,8,0.7)]">
        <rect x="27" y="74" width="4" height="6" fill="#713f12" />

        {/* Tower Shield Body */}
        <polygon points="13,62 35,62 36,79 24,90 12,79" fill="#713f12" />
        <polygon points="15,64 33,64 34,77 24,87 14,77" fill="#eab308" />
        <polygon points="17,66 31,66 32,75 24,83 16,75" fill="#facc15" />

        {/* Golden Wings Engraving */}
        <polygon points="18,68 24,73 20,77" fill="#ca8a04" />
        <polygon points="30,68 24,73 28,77" fill="#ca8a04" />

        {/* Royal Ruby Gem Center */}
        <polygon points="24,70 28,75 24,80 20,75" fill="#b91c1c" />
        <polygon points="24,71 27,75 24,79 21,75" fill="#ef4444" />
        <polygon points="24,72 26,75 24,77 22,75" fill="#f87171" />
        <circle cx="23.5" cy="74.5" r="0.8" fill="#ffffff" />
      </g>
    );
  }

  // --- GOLD I: Sovereign Gold Aegis (Diamond Crest + Winged) ---
  if (tier === 'Gold' && div === 'I') {
    return (
      <g className="filter drop-shadow-[0_2px_10px_rgba(234,179,8,0.8)]">
        <rect x="27" y="74" width="4" height="6" fill="#713f12" />

        {/* Sovereign Gold Rim */}
        <polygon points="12,61 36,61 37,78 24,92 11,78" fill="#78350f" />
        <polygon points="12,61 36,61 37,78 24,92 11,78" stroke="#fef08a" strokeWidth="1.5" fill="none" />

        {/* Mirror Polished Gold */}
        <polygon points="14,63 34,63 35,76 24,89 13,76" fill="#facc15" />
        <polygon points="16,65 32,65 33,74 24,85 15,74" fill="#fef08a" />

        {/* Diamond Core Star */}
        <polygon points="24,67 28,73 34,75 28,77 24,83 20,77 14,75 20,73" fill="#0284c7" />
        <polygon points="24,69 27,73 31,75 27,77 24,81 21,77 17,75 21,73" fill="#38bdf8" />
        <polygon points="24,71 26,74 29,75 26,76 24,79 22,76 19,75 22,74" fill="#ffffff" />
        <circle cx="24" cy="75" r="1.5" fill="#ffffff" />
      </g>
    );
  }

  // --- DIAMOND III: Cyan Crystalline Kite Shield ---
  if (tier === 'Diamond' && div === 'III') {
    return (
      <g className="filter drop-shadow-[0_2px_8px_rgba(6,182,212,0.7)]">
        <rect x="27" y="74" width="4" height="6" fill="#083344" />

        {/* Dark Cyan Facet Rim */}
        <polygon points="13,62 35,62 36,78 24,90 12,78" fill="#0e7490" />
        {/* Cyan Crystal Body */}
        <polygon points="15,64 33,64 34,76 24,87 14,76" fill="#06b6d4" />
        {/* Lighter Crystalline Facet */}
        <polygon points="17,66 31,66 32,74 24,83 16,74" fill="#22d3ee" />

        {/* Diamond Crystal Core */}
        <polygon points="24,68 29,74 24,81 19,74" fill="#a5f3fc" />
        <polygon points="24,70 27,74 24,78 21,74" fill="#ffffff" />
      </g>
    );
  }

  // --- DIAMOND II: Prismatic Diamond Pavise ---
  if (tier === 'Diamond' && div === 'II') {
    return (
      <g className="filter drop-shadow-[0_2px_10px_rgba(6,182,212,0.8)]">
        <rect x="27" y="74" width="4" height="6" fill="#083344" />

        {/* Prismatic Border */}
        <polygon points="12,61 36,61 37,78 24,92 11,78" fill="#0891b2" />
        <polygon points="14,63 34,63 35,76 24,89 13,76" fill="#06b6d4" />
        <polygon points="16,65 32,65 33,74 24,85 15,74" fill="#67e8f9" />

        {/* Prismatic Refraction Lines */}
        <polyline points="14,63 24,75 34,63" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <polyline points="14,76 24,75 34,76" stroke="#cffafe" strokeWidth="1" fill="none" />

        {/* Glowing Diamond Core */}
        <polygon points="24,68 30,75 24,82 18,75" fill="#a5f3fc" />
        <polygon points="24,70 28,75 24,80 20,75" fill="#ffffff" />
      </g>
    );
  }

  // --- DIAMOND I: Radiant Astral Diamond Aegis ---
  if (tier === 'Diamond' && div === 'I') {
    return (
      <g className="filter drop-shadow-[0_2px_12px_rgba(34,211,238,0.9)]">
        <rect x="27" y="74" width="4" height="6" fill="#083344" />

        {/* Astral Cyan Core */}
        <polygon points="12,60 36,60 37,78 24,93 11,78" fill="#083344" />
        <polygon points="12,60 36,60 37,78 24,93 11,78" stroke="#67e8f9" strokeWidth="1.5" fill="none" />

        <polygon points="14,62 34,62 35,76 24,90 13,76" fill="#06b6d4" />
        <polygon points="16,64 32,64 33,74 24,86 15,74" fill="#a5f3fc" />

        {/* Supernova Astral Star Core */}
        <polygon points="24,65 28,72 35,75 28,78 24,85 20,78 13,75 20,72" fill="#0284c7" />
        <polygon points="24,67 27,73 32,75 27,77 24,82 21,77 16,75 21,73" fill="#38bdf8" />
        <polygon points="24,69 26,73 29,75 26,77 24,80 22,77 19,75 22,73" fill="#ffffff" />
        <circle cx="24" cy="75" r="2" fill="#ffffff" />
      </g>
    );
  }

  // --- 👑 MYTHICAL: Cosmic Divine Aegis ---
  return (
    <g className="filter drop-shadow-[0_2px_14px_rgba(168,85,247,0.95)]">
      <rect x="27" y="74" width="4" height="6" fill="#2e1065" />

      {/* Cosmic Void Rim with Golden Celestial Trim */}
      <polygon points="12,59 36,59 37,78 24,94 11,78" fill="#3b0764" />
      <polygon points="12,59 36,59 37,78 24,94 11,78" stroke="#facc15" strokeWidth="1.8" fill="none" />

      {/* Deep Amethyst Nebula Crystal */}
      <polygon points="14,61 34,61 35,76 24,91 13,76" fill="#7e22ce" />
      <polygon points="16,63 32,63 33,74 24,86 15,74" fill="#a855f7" />
      <polygon points="18,65 30,65 31,72 24,81 17,72" fill="#c084fc" />

      {/* Celestial Crown Crest on top */}
      <polygon points="19,59 24,54 29,59 27,57 24,59 21,57" fill="#fde047" />

      {/* Pulsing Celestial Divine Star Core */}
      <polygon points="24,64 28,71 36,75 28,79 24,86 20,79 12,75 20,71" fill="#fbbf24" />
      <polygon points="24,66 27,72 32,75 27,78 24,83 21,78 16,75 21,72" fill="#e879f9" />
      <polygon points="24,68 26,73 30,75 26,77 24,81 22,77 18,75 22,73" fill="#ffffff" />
      <circle cx="24" cy="75" r="2.2" fill="#ffffff" />
    </g>
  );
};
