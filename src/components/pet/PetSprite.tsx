import React from 'react';
import type { PetDef } from '../../types/pet';
import { getPetById } from '../../utils/petData';

interface PetSpriteProps {
  petId?: string | null;
  pet?: PetDef;
  size?: number; // Size in px (e.g. 48, 64, 80)
  isAnimated?: boolean;
  animate?: boolean;
  showAura?: boolean;
  facing?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export const PetSprite: React.FC<PetSpriteProps> = ({
  petId,
  pet: directPet,
  size = 48,
  isAnimated,
  animate,
  showAura = false,
  facing = 'right',
  className = '',
}) => {
  const shouldAnimate = animate !== undefined ? animate : (isAnimated ?? true);
  const pet = directPet || (petId ? getPetById(petId) : undefined);

  if (!pet) {
    return null;
  }

  // Flip horizontally if facing left
  const flip = facing === 'left' ? 'scale(-1, 1) translate(-40, 0)' : '';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Rarity Ambient Glow */}
      {showAura && (
        <div
          className="absolute inset-0 rounded-full filter blur-md opacity-50"
          style={{ backgroundColor: pet.glowColor }}
        />
      )}

      <svg
        viewBox="0 0 40 40"
        width="100%"
        height="100%"
        className={`overflow-visible ${shouldAnimate ? 'animate-bounce-gentle' : ''}`}
        style={{ shapeRendering: 'crispEdges' }}
      >
        <g transform={flip}>
          {/* Ground Shadow */}
          <ellipse cx="20" cy="36" rx="10" ry="3" fill="rgba(0,0,0,0.35)" />

          {/* 1. BUNBUN (🐰 Clover Bunny) */}
          {pet.id === 'bunbun' && (
            <g id="pet-bunbun">
              {/* Ears */}
              <ellipse cx="14" cy="11" rx="3.5" ry="8" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
              <ellipse cx="14" cy="11" rx="2" ry="5.5" fill="#f472b6" />
              <ellipse cx="26" cy="11" rx="3.5" ry="8" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
              <ellipse cx="26" cy="11" rx="2" ry="5.5" fill="#f472b6" />
              {/* Body */}
              <ellipse cx="20" cy="27" rx="10" ry="8.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
              {/* Fluffy Tail */}
              <circle cx="10" cy="29" r="3" fill="#ffffff" stroke="#b45309" strokeWidth="0.8" />
              {/* Head */}
              <circle cx="20" cy="19" r="8.5" fill="#fffbeb" stroke="#b45309" strokeWidth="1" />
              {/* Cheeks */}
              <circle cx="15" cy="21" r="2" fill="#fbcfe8" />
              <circle cx="25" cy="21" r="2" fill="#fbcfe8" />
              {/* Eyes */}
              <circle cx="17" cy="18" r="1.5" fill="#1c1917" />
              <circle cx="23" cy="18" r="1.5" fill="#1c1917" />
              <circle cx="16.5" cy="17.5" r="0.5" fill="#fff" />
              <circle cx="22.5" cy="17.5" r="0.5" fill="#fff" />
              {/* Cute Nose & Mouth */}
              <polygon points="20,20 19,21 21,21" fill="#f43f5e" />
              {/* 4-Leaf Clover Bandana */}
              <polygon points="18,25 22,25 20,28" fill="#22c55e" />
              <circle cx="20" cy="26" r="1.2" fill="#86efac" />
            </g>
          )}

          {/* 2. FLUFFO (🐶 Spirit Pup) */}
          {pet.id === 'fluffo' && (
            <g id="pet-fluffo">
              {/* Ears */}
              <polygon points="12,14 16,6 18,14" fill="#d97706" stroke="#78350f" strokeWidth="1" />
              <polygon points="28,14 24,6 22,14" fill="#d97706" stroke="#78350f" strokeWidth="1" />
              {/* Body */}
              <ellipse cx="20" cy="27" rx="10" ry="8" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
              <ellipse cx="20" cy="28" rx="7" ry="5.5" fill="#fef3c7" />
              {/* Wagging Tail */}
              <path d="M 10 27 Q 7 21 11 19" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Head */}
              <circle cx="20" cy="18" r="8.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
              {/* Snout */}
              <ellipse cx="20" cy="20" rx="4.5" ry="3.5" fill="#fffbeb" />
              <ellipse cx="20" cy="19" rx="1.5" ry="1.2" fill="#1c1917" />
              {/* Eyes */}
              <circle cx="16" cy="16" r="1.5" fill="#1c1917" />
              <circle cx="24" cy="16" r="1.5" fill="#1c1917" />
              <circle cx="15.5" cy="15.5" r="0.5" fill="#fff" />
              <circle cx="23.5" cy="15.5" r="0.5" fill="#fff" />
              {/* Red Bandana */}
              <polygon points="15,24 25,24 20,28" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
            </g>
          )}

          {/* 3. MEWMI (🐱 Starry Feline) */}
          {pet.id === 'mewmi' && (
            <g id="pet-mewmi">
              {/* Ears */}
              <polygon points="12,13 15,5 18,13" fill="#a855f7" stroke="#581c87" strokeWidth="1" />
              <polygon points="14,12 15,7 17,12" fill="#f472b6" />
              <polygon points="28,13 25,5 22,13" fill="#a855f7" stroke="#581c87" strokeWidth="1" />
              <polygon points="26,12 25,7 23,12" fill="#f472b6" />
              {/* Body */}
              <ellipse cx="20" cy="27" rx="9.5" ry="8" fill="#c084fc" stroke="#581c87" strokeWidth="1" />
              {/* Curled Tail */}
              <path d="M 11 28 Q 7 24 8 18 Q 11 16 12 19" stroke="#a855f7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Head */}
              <circle cx="20" cy="18" r="8" fill="#e9d5ff" stroke="#581c87" strokeWidth="1" />
              {/* Eyes */}
              <ellipse cx="16" cy="17" rx="1.8" ry="2.2" fill="#0284c7" />
              <ellipse cx="24" cy="17" rx="1.8" ry="2.2" fill="#0284c7" />
              <circle cx="15.5" cy="16.5" r="0.6" fill="#fff" />
              <circle cx="23.5" cy="16.5" r="0.6" fill="#fff" />
              {/* Nose & Whiskers */}
              <polygon points="20,19.5 19,20.5 21,20.5" fill="#f43f5e" />
              <line x1="12" y1="19" x2="15" y2="20" stroke="#7e22ce" strokeWidth="0.8" />
              <line x1="12" y1="21" x2="15" y2="21" stroke="#7e22ce" strokeWidth="0.8" />
              <line x1="28" y1="19" x2="25" y2="20" stroke="#7e22ce" strokeWidth="0.8" />
              <line x1="28" y1="21" x2="25" y2="21" stroke="#7e22ce" strokeWidth="0.8" />
              {/* Star Pendant */}
              <circle cx="20" cy="25" r="1.8" fill="#facc15" stroke="#ca8a04" strokeWidth="0.5" />
            </g>
          )}

          {/* 4. FROGO (🐸 Lilypad Hopper) */}
          {pet.id === 'frogo' && (
            <g id="pet-frogo">
              {/* Big Frog Eyes on top of head */}
              <circle cx="14" cy="12" r="4.5" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
              <circle cx="14" cy="12" r="2.8" fill="#fef08a" />
              <circle cx="14" cy="12" r="1.5" fill="#1c1917" />
              <circle cx="26" cy="12" r="4.5" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
              <circle cx="26" cy="12" r="2.8" fill="#fef08a" />
              <circle cx="26" cy="12" r="1.5" fill="#1c1917" />
              {/* Body */}
              <ellipse cx="20" cy="26" rx="11" ry="9" fill="#16a34a" stroke="#14532d" strokeWidth="1" />
              <ellipse cx="20" cy="27" rx="7" ry="6" fill="#86efac" />
              {/* Head */}
              <ellipse cx="20" cy="18" rx="9" ry="7.5" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
              {/* Smiling mouth & rosy cheeks */}
              <path d="M 16 20 Q 20 23 24 20" stroke="#14532d" strokeWidth="1.2" fill="none" />
              <circle cx="14" cy="19" r="1.5" fill="#f472b6" opacity="0.7" />
              <circle cx="26" cy="19" r="1.5" fill="#f472b6" opacity="0.7" />
              {/* Water Lily Crown */}
              <ellipse cx="20" cy="11" rx="4" ry="1.5" fill="#15803d" />
              <polygon points="18,10 20,6 22,10" fill="#f472b6" />
              <circle cx="20" cy="9" r="1" fill="#fde047" />
            </g>
          )}

          {/* 5. FOXLET (🦊 Ember Kitsune) */}
          {pet.id === 'foxlet' && (
            <g id="pet-foxlet">
              {/* Big Pointy Ears */}
              <polygon points="11,14 14,4 18,14" fill="#ea580c" stroke="#7c2d12" strokeWidth="1" />
              <polygon points="13,13 14,7 17,13" fill="#ffffff" />
              <polygon points="29,14 26,4 22,14" fill="#ea580c" stroke="#7c2d12" strokeWidth="1" />
              <polygon points="27,13 26,7 23,13" fill="#ffffff" />
              {/* Twin Bushy Tails */}
              <path d="M 11 28 Q 4 23 8 16 Q 13 17 12 25" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
              <polygon points="6,18 8,16 10,19" fill="#ffffff" />
              <path d="M 29 28 Q 36 23 32 16 Q 27 17 28 25" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
              <polygon points="34,18 32,16 30,19" fill="#ffffff" />
              {/* Body */}
              <ellipse cx="20" cy="27" rx="9" ry="8" fill="#ea580c" stroke="#7c2d12" strokeWidth="1" />
              <ellipse cx="20" cy="27" rx="5" ry="6" fill="#fff7ed" />
              {/* Head */}
              <polygon points="12,15 20,24 28,15" fill="#ea580c" stroke="#7c2d12" strokeWidth="1" />
              <polygon points="15,16 20,23 25,16" fill="#fff7ed" />
              {/* Eyes & Nose */}
              <polygon points="16,16 18,17 16,18" fill="#1c1917" />
              <polygon points="24,16 22,17 24,18" fill="#1c1917" />
              <circle cx="20" cy="22" r="1.2" fill="#1c1917" />
            </g>
          )}

          {/* 6. OWLIO (🦉 Astral Owl) */}
          {pet.id === 'owlio' && (
            <g id="pet-owlio">
              {/* Feather Horn Tufts */}
              <polygon points="12,13 14,6 18,13" fill="#1e3a8a" />
              <polygon points="28,13 26,6 22,13" fill="#1e3a8a" />
              {/* Body & Wings */}
              <ellipse cx="20" cy="25" rx="10" ry="10" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1" />
              <ellipse cx="20" cy="26" rx="6.5" ry="7.5" fill="#93c5fd" />
              {/* Chevron breast feathers */}
              <path d="M 18 24 L 20 26 L 22 24 M 18 28 L 20 30 L 22 28" stroke="#1d4ed8" strokeWidth="1" fill="none" />
              {/* Big Astral Eyes with Golden Spectacles */}
              <circle cx="15" cy="17" r="4.5" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
              <circle cx="15" cy="17" r="2.2" fill="#0f172a" />
              <circle cx="14.5" cy="16.5" r="0.8" fill="#ffffff" />
              <circle cx="25" cy="17" r="4.5" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
              <circle cx="25" cy="17" r="2.2" fill="#0f172a" />
              <circle cx="24.5" cy="16.5" r="0.8" fill="#ffffff" />
              {/* Spectacle Bridge */}
              <line x1="19.5" y1="17" x2="20.5" y2="17" stroke="#ca8a04" strokeWidth="1.5" />
              {/* Small Beak */}
              <polygon points="20,18.5 19,21 21,21" fill="#f59e0b" />
            </g>
          )}

          {/* 7. FLAMELING (🔥 Phoenix Ember) */}
          {pet.id === 'flameling' && (
            <g id="pet-flameling">
              {/* Outer Flame Wings */}
              <path
                d="M 20 6 Q 28 14 30 22 Q 32 32 20 35 Q 8 32 10 22 Q 12 14 20 6 Z"
                fill="#ef4444"
                stroke="#b91c1c"
                strokeWidth="1"
              />
              {/* Mid Orange Flame */}
              <path
                d="M 20 10 Q 26 16 27 23 Q 28 30 20 32 Q 12 30 13 23 Q 14 16 20 10 Z"
                fill="#f97316"
              />
              {/* Inner Radiant Core */}
              <ellipse cx="20" cy="24" rx="5" ry="6" fill="#fde047" />
              {/* Big Cute Ember Eyes */}
              <ellipse cx="17" cy="22" rx="1.5" ry="2" fill="#450a0a" />
              <ellipse cx="23" cy="22" rx="1.5" ry="2" fill="#450a0a" />
              <circle cx="16.5" cy="21.5" r="0.6" fill="#fff" />
              <circle cx="22.5" cy="21.5" r="0.6" fill="#fff" />
              {/* Floating Spark Motes */}
              <circle cx="12" cy="12" r="1.2" fill="#fde047" className="animate-pulse" />
              <circle cx="28" cy="10" r="1.5" fill="#fde047" className="animate-pulse" />
            </g>
          )}

          {/* 8. VOLTARI (⚡ Thunder Sprite) */}
          {pet.id === 'voltari' && (
            <g id="pet-voltari">
              {/* Lightning Bolt Ears */}
              <polygon points="12,14 10,6 14,8 13,3 18,12" fill="#facc15" stroke="#a16207" strokeWidth="1" />
              <polygon points="28,14 30,6 26,8 27,3 22,12" fill="#facc15" stroke="#a16207" strokeWidth="1" />
              {/* Body */}
              <ellipse cx="20" cy="26" rx="9.5" ry="8.5" fill="#06b6d4" stroke="#0e7490" strokeWidth="1" />
              <ellipse cx="20" cy="27" rx="6" ry="5.5" fill="#cffafe" />
              {/* Head */}
              <circle cx="20" cy="18" r="8" fill="#22d3ee" stroke="#0e7490" strokeWidth="1" />
              {/* Electric Cheeks */}
              <polygon points="13,19 15,19 14,21" fill="#facc15" />
              <polygon points="27,19 25,19 26,21" fill="#facc15" />
              {/* Eyes */}
              <circle cx="17" cy="17" r="1.6" fill="#083344" />
              <circle cx="23" cy="17" r="1.6" fill="#083344" />
              <circle cx="16.5" cy="16.5" r="0.6" fill="#fff" />
              <circle cx="23.5" cy="16.5" r="0.6" fill="#fff" />
              {/* Forehead Lightning Sigil */}
              <polygon points="20,12 19,15 21,15 20,18" fill="#fde047" />
            </g>
          )}

          {/* 9. MOONPAW / NOCTARA (🌙 Lunar Panther) */}
          {pet.id === 'moonpaw' && (
            <g id="pet-moonpaw">
              {/* Sleek Panther Ears */}
              <polygon points="12,13 14,5 18,13" fill="#4c1d95" stroke="#2e1065" strokeWidth="1" />
              <polygon points="14,12 15,8 17,12" fill="#c084fc" />
              <polygon points="28,13 26,5 22,13" fill="#4c1d95" stroke="#2e1065" strokeWidth="1" />
              <polygon points="26,12 25,8 23,12" fill="#c084fc" />
              {/* Body */}
              <ellipse cx="20" cy="27" rx="10" ry="8" fill="#3b0764" stroke="#1e053a" strokeWidth="1" />
              {/* Long Tail with Stardust Tip */}
              <path d="M 10 28 Q 4 25 6 17 Q 9 14 10 18" stroke="#581c87" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="10" cy="18" r="1.5" fill="#38bdf8" />
              {/* Head */}
              <circle cx="20" cy="18" r="8.5" fill="#581c87" stroke="#2e1065" strokeWidth="1" />
              {/* Luminous Crescent Moon Mark on Forehead */}
              <path d="M 19 12 Q 21 14 19 16 Q 22 15 22 13 Q 22 11 19 12 Z" fill="#67e8f9" />
              {/* Glowing Stardust Eyes */}
              <ellipse cx="16" cy="18" rx="1.6" ry="2.2" fill="#38bdf8" />
              <ellipse cx="24" cy="18" rx="1.6" ry="2.2" fill="#38bdf8" />
              <circle cx="15.5" cy="17.5" r="0.6" fill="#fff" />
              <circle cx="23.5" cy="17.5" r="0.6" fill="#fff" />
            </g>
          )}

          {/* 10. DRAKORI (🐉 Celestial Sky Dragon) */}
          {pet.id === 'drakori' && (
            <g id="pet-drakori">
              {/* Golden Dragon Horns */}
              <path d="M 14 13 Q 9 7 6 5 Q 11 7 15 11" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
              <path d="M 26 13 Q 31 7 34 5 Q 29 7 25 11" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
              {/* Dragon Wings */}
              <path d="M 12 24 Q 4 18 6 12 Q 12 16 14 22" fill="#7e22ce" stroke="#4a044e" strokeWidth="1" />
              <path d="M 28 24 Q 36 18 34 12 Q 28 16 26 22" fill="#7e22ce" stroke="#4a044e" strokeWidth="1" />
              {/* Body */}
              <ellipse cx="20" cy="27" rx="9" ry="8" fill="#9333ea" stroke="#4a044e" strokeWidth="1" />
              <ellipse cx="20" cy="28" rx="5" ry="6" fill="#facc15" />
              {/* Spiny Tail */}
              <path d="M 11 29 Q 5 28 4 23 Q 8 23 10 26" fill="#7e22ce" stroke="#4a044e" strokeWidth="0.8" />
              <polygon points="4,23 2,21 5,21" fill="#f59e0b" />
              {/* Head */}
              <circle cx="20" cy="17" r="8" fill="#a855f7" stroke="#4a044e" strokeWidth="1" />
              {/* Glowing Ruby Eyes */}
              <ellipse cx="16" cy="16" rx="1.6" ry="2.2" fill="#f43f5e" />
              <ellipse cx="24" cy="16" rx="1.6" ry="2.2" fill="#f43f5e" />
              <circle cx="15.5" cy="15.5" r="0.6" fill="#fff" />
              <circle cx="23.5" cy="15.5" r="0.6" fill="#fff" />
              {/* Snout with small smoke puff */}
              <ellipse cx="20" cy="20" rx="3.5" ry="2.5" fill="#7e22ce" />
              <circle cx="19" cy="20" r="0.6" fill="#3b0764" />
              <circle cx="21" cy="20" r="0.6" fill="#3b0764" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
