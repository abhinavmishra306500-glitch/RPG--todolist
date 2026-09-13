import React from 'react';
import type { PetDef } from '../../types/pet';
import { PetSprite } from './PetSprite';
import { RpgBadge } from '../ui/RpgBadge';

interface PetUnlockCelebrationModalProps {
  pet: PetDef | null;
  onClose: () => void;
  onEquip?: (petId: string) => void;
  onOpenDex?: () => void;
  isEquipped?: boolean;
}

export const PetUnlockCelebrationModal: React.FC<PetUnlockCelebrationModalProps> = ({
  pet,
  onClose,
  onEquip,
  onOpenDex,
  isEquipped = false,
}) => {
  if (!pet) return null;

  const rarityGlows: Record<string, string> = {
    Common: 'from-amber-500/20 via-slate-700/80 to-slate-900/90 border-slate-500/50 shadow-slate-500/30',
    Uncommon: 'from-emerald-500/20 via-slate-800/80 to-slate-900/90 border-emerald-500/50 shadow-emerald-500/30',
    Rare: 'from-blue-500/20 via-slate-800/80 to-slate-900/90 border-blue-500/50 shadow-blue-500/30',
    Epic: 'from-purple-500/25 via-slate-800/80 to-slate-900/90 border-purple-500/50 shadow-purple-500/30',
    Legendary: 'from-amber-500/30 via-yellow-900/80 to-slate-900/90 border-yellow-400/60 shadow-yellow-500/40',
  };

  const rarityBadgeVariant: Record<string, 'neutral' | 'success' | 'info' | 'epic' | 'gold'> = {
    Common: 'neutral',
    Uncommon: 'success',
    Rare: 'info',
    Epic: 'epic',
    Legendary: 'gold',
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Background Starburst / Magic Sparks */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-400/10 to-indigo-500/10 blur-3xl animate-pulse" />
      </div>

      <div
        className={`relative w-full max-w-md bg-gradient-to-b ${rarityGlows[pet.rarity] || rarityGlows.Common} border-2 rounded-2xl p-6 text-center shadow-2xl flex flex-col items-center gap-4 text-white animate-scaleUp`}
      >
        {/* Confetti & Header Ribbon */}
        <div className="text-xs uppercase tracking-widest font-black text-amber-300 drop-shadow flex items-center gap-1.5">
          <span>✨</span> NEW COMPANION UNLOCKED! <span>✨</span>
        </div>

        {/* Pet Avatar Display */}
        <div className="relative my-2 p-6 rounded-2xl bg-black/40 border border-white/10 shadow-inner flex items-center justify-center">
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent rounded-2xl pointer-events-none" />
          <PetSprite petId={pet.id} size={96} animate />
        </div>

        {/* Pet Info */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-black text-amber-200 tracking-wide font-pixel">
              {pet.name}
            </h2>
            <RpgBadge variant={rarityBadgeVariant[pet.rarity] || 'neutral'}>
              {pet.rarity}
            </RpgBadge>
          </div>
          <p className="text-xs font-semibold text-slate-300 italic">
            "{pet.description}"
          </p>
        </div>

        {/* Lore / Aura */}
        <div className="w-full bg-black/30 border border-white/5 rounded-xl p-3 text-left">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">
            Companion Lore
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {pet.lore}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-2 mt-2">
          {onEquip && (
            <button
              onClick={() => {
                onEquip(pet.id);
                onClose();
              }}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
                isEquipped
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-500'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black border border-amber-300 shadow-amber-500/30'
              }`}
            >
              {isEquipped ? '🐾 Already Equipped' : '🐾 Equip Companion'}
            </button>
          )}

          {onOpenDex && (
            <button
              onClick={() => {
                onClose();
                onOpenDex();
              }}
              className="py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600/80 hover:bg-indigo-500 text-white border border-indigo-400/50 shadow-md transition-all active:scale-95"
            >
              📖 CreatureDex
            </button>
          )}

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600/50 transition-all active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
