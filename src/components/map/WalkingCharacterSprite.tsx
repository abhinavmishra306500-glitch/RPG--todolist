import React from 'react';
import type { CharacterProfile } from '../../types/character';
import type { PlayerLeague } from '../../types/progression';
import type { FacingDirection } from '../../types/map';
import {
  SKIN_TONES,
  HAIR_COLORS,
  OUTFIT_COLORS,
} from '../../types/character';
import { LeagueShieldSvg } from '../character/LeagueShield';

import { PetSprite } from '../pet/PetSprite';

interface WalkingCharacterSpriteProps {
  profile: CharacterProfile;
  league?: Partial<PlayerLeague> | null;
  facing?: FacingDirection;
  isWalking?: boolean;
  walkCycle?: number; // 0 to 1 continuous or step index
  size?: number; // Default 64px
  showShadow?: boolean;
  equippedPetId?: string | null;
}

export const WalkingCharacterSprite: React.FC<WalkingCharacterSpriteProps> = ({
  profile,
  league,
  facing = 'up',
  isWalking = false,
  walkCycle = 0,
  size = 56,
  showShadow = true,
  equippedPetId,
}) => {
  const skin = SKIN_TONES.find((s) => s.id === profile.skinToneId) || SKIN_TONES[0];
  const hair = HAIR_COLORS.find((h) => h.id === profile.hairColorId) || HAIR_COLORS[0];
  const outfit = OUTFIT_COLORS.find((o) => o.id === profile.outfitColorId) || OUTFIT_COLORS[0];

  // Calculate synchronized sinusoidal swing offsets for arms, legs, and body bounce
  // Continuous phase t: 0 to 2*PI
  const phase = isWalking ? walkCycle * Math.PI * 2 : 0;
  const legSwing = Math.sin(phase) * 7; // -7 to +7 px swing
  const armSwing = -Math.sin(phase) * 6; // Opposite to leg swing
  const bodyBob = isWalking ? Math.abs(Math.sin(phase * 2)) * 2 : 0; // Vertical bounce

  // Companion pet follow bounce
  const petBounce = isWalking ? Math.sin(phase + 1) * 3 : 0;

  return (
    <div
      className="relative select-none pointer-events-none flex flex-col items-center justify-center"
      style={{ width: `${size}px`, height: `${size * 1.25}px` }}
    >
      {/* Ground Shadow */}
      {showShadow && (
        <div
          className="absolute bottom-1 w-8 h-2.5 bg-black/60 rounded-full filter blur-[1px] transition-all duration-200"
          style={{ transform: `scale(${isWalking ? 0.9 + bodyBob * 0.05 : 1})` }}
        />
      )}

      {/* Main Character SVG */}
      <svg
        viewBox="0 0 80 100"
        width="100%"
        height="100%"
        className="overflow-visible filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* Transform for vertical body bobbing during stride */}
        <g transform={`translate(0, ${-bodyBob})`}>
          {/* =================================================================== */}
          {/* DIRECTION: FACING UP (Northbound - back view)                      */}
          {/* =================================================================== */}
          {facing === 'up' && (
            <g>
              {/* Left Leg & Boot */}
              <g transform={`translate(0, ${legSwing})`}>
                <rect x="29" y="66" width="8" height="12" fill="#2c2a38" />
                <rect x="27" y="77" width="10" height="7" fill="#4a3728" />
                <rect x="26" y="82" width="12" height="3" fill="#2b1e16" />
              </g>

              {/* Right Leg & Boot */}
              <g transform={`translate(0, ${-legSwing})`}>
                <rect x="43" y="66" width="8" height="12" fill="#2c2a38" />
                <rect x="43" y="77" width="10" height="7" fill="#4a3728" />
                <rect x="42" y="82" width="12" height="3" fill="#2b1e16" />
              </g>

              {/* Torso / Outfit Back */}
              <rect x="26" y="38" width="28" height="30" fill={outfit.primaryHex} />
              <rect x="28" y="38" width="24" height="6" fill={outfit.shadowHex} />
              {/* Back Cloak / Seam detail */}
              <line x1="40" y1="42" x2="40" y2="68" stroke={outfit.shadowHex} strokeWidth="2" />
              <rect x="25" y="58" width="30" height="4" fill="#52321b" />

              {/* Left Arm (Swinging opposite to left leg) */}
              <g transform={`translate(0, ${armSwing})`}>
                <rect x="18" y="40" width="8" height="18" fill={outfit.primaryHex} />
                <rect x="19" y="56" width="6" height="6" fill={skin.shadowHex} />
              </g>

              {/* Right Arm with Shield */}
              <g transform={`translate(0, ${-armSwing})`}>
                <rect x="54" y="40" width="8" height="18" fill={outfit.primaryHex} />
                <rect x="55" y="56" width="6" height="6" fill={skin.shadowHex} />
                {/* Shield held on side */}
                <g transform="translate(38, -15) scale(0.65)">
                  <LeagueShieldSvg league={league} />
                </g>
              </g>

              {/* Head Back */}
              <rect x="27" y="16" width="26" height="24" rx="2" fill={hair.baseHex} />
              <rect x="29" y="14" width="22" height="6" fill={hair.highlightHex} />
              {/* Hair strands hanging at back */}
              {profile.hairStyleId === 'flowing' && (
                <rect x="24" y="28" width="32" height="22" fill={hair.baseHex} />
              )}
              {profile.hairStyleId === 'ponytail' && (
                <polygon points="40,10 46,2 48,22" fill={hair.highlightHex} />
              )}
            </g>
          )}

          {/* =================================================================== */}
          {/* DIRECTION: FACING DOWN (Southbound - front view)                   */}
          {/* =================================================================== */}
          {facing === 'down' && (
            <g>
              {/* Left Leg & Boot */}
              <g transform={`translate(0, ${legSwing})`}>
                <rect x="29" y="66" width="8" height="12" fill="#2c2a38" />
                <rect x="27" y="77" width="10" height="7" fill="#4a3728" />
                <rect x="26" y="82" width="12" height="3" fill="#2b1e16" />
                <rect x="30" y="79" width="4" height="2" fill="#d4af37" />
              </g>

              {/* Right Leg & Boot */}
              <g transform={`translate(0, ${-legSwing})`}>
                <rect x="43" y="66" width="8" height="12" fill="#2c2a38" />
                <rect x="43" y="77" width="10" height="7" fill="#4a3728" />
                <rect x="42" y="82" width="12" height="3" fill="#2b1e16" />
                <rect x="46" y="79" width="4" height="2" fill="#d4af37" />
              </g>

              {/* Torso & Outfit Front */}
              <rect x="26" y="38" width="28" height="30" fill={outfit.primaryHex} />
              <rect x="29" y="38" width="22" height="5" fill={outfit.accentHex} />
              <rect x="25" y="58" width="30" height="4" fill="#52321b" />
              <rect x="37" y="57" width="6" height="6" fill="#fbbf24" />

              {/* Left Arm */}
              <g transform={`translate(0, ${armSwing})`}>
                <rect x="18" y="40" width="8" height="18" fill={outfit.primaryHex} />
                <rect x="19" y="56" width="6" height="6" fill={skin.baseHex} />
              </g>

              {/* Right Arm with Equipped Shield */}
              <g transform={`translate(0, ${-armSwing})`}>
                <rect x="54" y="40" width="8" height="18" fill={outfit.primaryHex} />
                <rect x="55" y="56" width="6" height="6" fill={skin.baseHex} />
                <g transform="translate(38, -15) scale(0.65)">
                  <LeagueShieldSvg league={league} />
                </g>
              </g>

              {/* Head & Face */}
              <rect x="27" y="16" width="26" height="24" rx="2" fill={skin.baseHex} />
              {/* Eyes */}
              <rect x="32" y="24" width="4" height="5" fill="#1e1e24" />
              <rect x="44" y="24" width="4" height="5" fill="#1e1e24" />
              <rect x="32" y="24" width="2" height="2" fill="#ffffff" />
              <rect x="44" y="24" width="2" height="2" fill="#ffffff" />
              {/* Smile */}
              <rect x="38" y="33" width="4" height="2" fill="#9c5b33" />

              {/* Front Hair */}
              <rect x="25" y="12" width="30" height="10" rx="2" fill={hair.baseHex} />
              <rect x="28" y="10" width="24" height="5" fill={hair.highlightHex} />
              {/* Hair Bangs */}
              <polygon points="30,22 35,27 38,22" fill={hair.baseHex} />
              <polygon points="40,22 45,28 48,22" fill={hair.baseHex} />
            </g>
          )}

          {/* =================================================================== */}
          {/* DIRECTION: FACING RIGHT (Eastbound)                                */}
          {/* =================================================================== */}
          {facing === 'right' && (
            <g>
              {/* Back Leg (Left) */}
              <g transform={`translate(${-legSwing * 0.8}, ${legSwing * 0.3})`}>
                <rect x="32" y="66" width="7" height="12" fill="#1e1d28" />
                <rect x="30" y="77" width="9" height="7" fill="#38291e" />
                <rect x="29" y="82" width="11" height="3" fill="#1f150f" />
              </g>

              {/* Front Leg (Right) */}
              <g transform={`translate(${legSwing * 0.8}, ${-legSwing * 0.3})`}>
                <rect x="39" y="66" width="7" height="12" fill="#2c2a38" />
                <rect x="38" y="77" width="11" height="7" fill="#4a3728" />
                <rect x="37" y="82" width="13" height="3" fill="#2b1e16" />
                <rect x="41" y="79" width="3" height="2" fill="#d4af37" />
              </g>

              {/* Torso Profile */}
              <rect x="30" y="38" width="20" height="30" fill={outfit.primaryHex} />
              <rect x="32" y="38" width="16" height="5" fill={outfit.accentHex} />
              <rect x="29" y="58" width="22" height="4" fill="#52321b" />

              {/* Head Profile */}
              <rect x="32" y="16" width="20" height="24" rx="2" fill={skin.baseHex} />
              <rect x="45" y="24" width="4" height="5" fill="#1e1e24" />
              <rect x="46" y="24" width="2" height="2" fill="#ffffff" />
              <rect x="47" y="32" width="3" height="2" fill="#9c5b33" />

              {/* Hair Profile */}
              <rect x="28" y="12" width="22" height="12" fill={hair.baseHex} />
              <rect x="30" y="10" width="18" height="5" fill={hair.highlightHex} />

              {/* Arm & Shield Profile in Foreground */}
              <g transform={`translate(${armSwing * 0.7}, 0)`}>
                <rect x="36" y="42" width="7" height="16" fill={outfit.primaryHex} />
                <rect x="38" y="56" width="5" height="5" fill={skin.baseHex} />
                {/* Shield front view */}
                <g transform="translate(24, -15) scale(0.65)">
                  <LeagueShieldSvg league={league} />
                </g>
              </g>
            </g>
          )}

          {/* =================================================================== */}
          {/* DIRECTION: FACING LEFT (Westbound - mirrored right)                */}
          {/* =================================================================== */}
          {facing === 'left' && (
            <g transform="translate(80, 0) scale(-1, 1)">
              {/* Back Leg */}
              <g transform={`translate(${-legSwing * 0.8}, ${legSwing * 0.3})`}>
                <rect x="32" y="66" width="7" height="12" fill="#1e1d28" />
                <rect x="30" y="77" width="9" height="7" fill="#38291e" />
                <rect x="29" y="82" width="11" height="3" fill="#1f150f" />
              </g>

              {/* Front Leg */}
              <g transform={`translate(${legSwing * 0.8}, ${-legSwing * 0.3})`}>
                <rect x="39" y="66" width="7" height="12" fill="#2c2a38" />
                <rect x="38" y="77" width="11" height="7" fill="#4a3728" />
                <rect x="37" y="82" width="13" height="3" fill="#2b1e16" />
                <rect x="41" y="79" width="3" height="2" fill="#d4af37" />
              </g>

              {/* Torso Profile */}
              <rect x="30" y="38" width="20" height="30" fill={outfit.primaryHex} />
              <rect x="32" y="38" width="16" height="5" fill={outfit.accentHex} />
              <rect x="29" y="58" width="22" height="4" fill="#52321b" />

              {/* Head Profile */}
              <rect x="32" y="16" width="20" height="24" rx="2" fill={skin.baseHex} />
              <rect x="45" y="24" width="4" height="5" fill="#1e1e24" />
              <rect x="46" y="24" width="2" height="2" fill="#ffffff" />
              <rect x="47" y="32" width="3" height="2" fill="#9c5b33" />

              {/* Hair Profile */}
              <rect x="28" y="12" width="22" height="12" fill={hair.baseHex} />
              <rect x="30" y="10" width="18" height="5" fill={hair.highlightHex} />

              {/* Arm & Shield Profile */}
              <g transform={`translate(${armSwing * 0.7}, 0)`}>
                <rect x="36" y="42" width="7" height="16" fill={outfit.primaryHex} />
                <rect x="38" y="56" width="5" height="5" fill={skin.baseHex} />
                <g transform="translate(24, -15) scale(0.65)">
                  <LeagueShieldSvg league={league} />
                </g>
              </g>
            </g>
          )}
        </g>
      </svg>

      {/* =================================================================== */}
      {/* COMPANION PET: Cute Loyal Sprite bouncing right behind character    */}
      {/* =================================================================== */}
      {equippedPetId && (
        <div
          className="absolute z-10 pointer-events-none transition-transform duration-75"
          style={{
            bottom: '-4px',
            right: facing === 'left' ? '-14px' : 'auto',
            left: facing === 'right' ? '-14px' : facing === 'up' ? '-10px' : '-12px',
            transform: `translateY(${-petBounce}px)`,
          }}
        >
          <PetSprite
            petId={equippedPetId}
            size={Math.round(size * 0.55)}
            isAnimated={isWalking}
            facing={facing === 'left' ? 'left' : 'right'}
          />
        </div>
      )}
    </div>
  );
};

