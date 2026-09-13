import React, { useState, useEffect } from 'react';
import type { PetDef, PetRarity } from '../../types/pet';
import {
  PET_ROSTER,
  isPetOwned,
  checkPetUnlockEligibility,
  buyOrUnlockPet,
} from '../../utils/petData';
import type { PlayerState } from '../../types/progression';
import { PetSprite } from './PetSprite';
import { RpgBadge } from '../ui/RpgBadge';
import { playPetUnlockSound, playStatIncreaseSound } from '../../utils/soundEffects';
import {
  devToggleSpecificPet,
  devLockSpecificPet,
  devUnlockSpecificPet,
} from '../../utils/devShopShortcuts';

interface PetShopModalContentProps {
  player: PlayerState;
  onUpdatePlayer: (updatedPlayer: PlayerState) => void;
  onOpenCreatureDex: () => void;
  onPetUnlocked: (pet: PetDef) => void;
  completedQuestsCount?: number;
}

const RARITY_BADGE_VARIANTS: Record<PetRarity, 'neutral' | 'success' | 'info' | 'epic' | 'gold'> = {
  Common: 'neutral',
  Uncommon: 'success',
  Rare: 'info',
  Epic: 'epic',
  Legendary: 'gold',
};

export const PetShopModalContent: React.FC<PetShopModalContentProps> = ({
  player,
  onUpdatePlayer,
  onOpenCreatureDex,
  onPetUnlocked,
  completedQuestsCount = 0,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hoveredPetId, setHoveredPetId] = useState<string | null>(null);
  const [devToast, setDevToast] = useState<string | null>(null);

  const currentGold = player.economy?.gold ?? 0;

  const showToast = (msg: string) => {
    setDevToast(msg);
    setTimeout(() => setDevToast(null), 2500);
  };

  const handleToggleSpecific = (petId: string) => {
    const { updatedPlayer, unlocked, message } = devToggleSpecificPet(player, petId);
    if (unlocked) {
      playPetUnlockSound();
    } else {
      playStatIncreaseSound();
    }
    onUpdatePlayer(updatedPlayer);
    showToast(message);
  };

  const handleLockSpecific = (petId: string) => {
    const { updatedPlayer, message } = devLockSpecificPet(player, petId);
    playStatIncreaseSound();
    onUpdatePlayer(updatedPlayer);
    showToast(message);
  };

  const handleUnlockSpecific = (petId: string) => {
    const { updatedPlayer, message } = devUnlockSpecificPet(player, petId);
    playPetUnlockSound();
    onUpdatePlayer(updatedPlayer);
    showToast(message);
  };

  // Keyboard shortcut listener:
  // When hovering over a pet:
  // - Pressing 'L' locks that pet
  // - Pressing 'U' unlocks that pet
  // - Pressing 'T' / 'X' toggles lock/unlock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (hoveredPetId) {
        if (!e.shiftKey && (e.key === 'l' || e.key === 'L')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleLockSpecific(hoveredPetId);
        } else if (!e.shiftKey && (e.key === 'u' || e.key === 'U')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleUnlockSpecific(hoveredPetId);
        } else if (e.key === 't' || e.key === 'T' || e.key === 'x' || e.key === 'X') {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleToggleSpecific(hoveredPetId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [hoveredPetId, player]);

  const handlePurchase = (pet: PetDef) => {
    setErrorMessage(null);
    const result = buyOrUnlockPet(player, pet.id, completedQuestsCount);
    if (!result.success || !result.updatedPlayer) {
      setErrorMessage(result.message || result.error || 'Failed to adopt companion.');
      return;
    }

    playPetUnlockSound();
    onUpdatePlayer(result.updatedPlayer);
    onPetUnlocked(pet);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Dev Toast Banner */}
      {devToast && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full shadow-lg border border-white animate-bounce pointer-events-none">
          {devToast}
        </div>
      )}

      {/* Sub-header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-2 bg-slate-950/40 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">
            🐾 10 Original Companions Available
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-amber-300 font-mono">
            Dev Keys on Hover: <kbd className="text-white font-bold">L</kbd> to Lock, <kbd className="text-white font-bold">U</kbd> to Unlock, <kbd className="text-white font-bold">T</kbd> or Alt+Click to Toggle
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenCreatureDex}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 font-bold transition-all active:scale-95"
        >
          <span>📖</span>
          <span>View CreatureDex</span>
        </button>
      </div>

      {/* Error Toast if purchase failed */}
      {errorMessage && (
        <div className="bg-red-900/80 border-b border-red-500 px-6 py-2 text-xs font-bold text-red-200 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-300 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Pet Shop Content Grid */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {PET_ROSTER.map((pet) => {
            const isOwned = isPetOwned(player.pets, pet.id);
            const isDevLocked = player.pets?.devLockedPetIds?.includes(pet.id) ?? false;
            const eligibility = checkPetUnlockEligibility(player, pet, completedQuestsCount);
            const canAfford = currentGold >= pet.price;

            return (
              <div
                key={pet.id}
                onMouseEnter={() => setHoveredPetId(pet.id)}
                onMouseLeave={() => setHoveredPetId((prev) => (prev === pet.id ? null : prev))}
                onClick={(e) => {
                  if (e.altKey || e.shiftKey) {
                    e.preventDefault();
                    handleToggleSpecific(pet.id);
                  }
                }}
                className={`relative rounded-2xl p-4 border-2 transition-all flex flex-col justify-between group ${
                  isOwned
                    ? 'bg-slate-950/50 border-emerald-500/40 hover:border-emerald-400 shadow-md'
                    : isDevLocked || !eligibility.eligible
                    ? 'bg-slate-950/80 border-slate-800/80 opacity-80'
                    : 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10'
                }`}
              >
                {/* Top Bar: Rarity + Badge + Dev Quick Toggle */}
                <div className="flex items-center justify-between mb-2">
                  <RpgBadge variant={RARITY_BADGE_VARIANTS[pet.rarity] || 'neutral'}>
                    {pet.rarity}
                  </RpgBadge>

                  <div className="flex items-center gap-1.5">
                    {/* Developer 1-Click Toggle for this specific pet */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSpecific(pet.id);
                      }}
                      className="px-1.5 py-0.5 rounded bg-slate-900/90 hover:bg-slate-800 border border-amber-400/40 text-[9px] font-bold text-amber-300 transition-all opacity-80 group-hover:opacity-100"
                      title="Developer: Click to toggle lock/unlock for this specific pet (or press L / U / T while hovering)"
                    >
                      {isDevLocked ? '🔓 Unlock [U]' : '🔒 Lock [L]'}
                    </button>

                    {isOwned && (
                      <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/70 border border-emerald-600/40 px-2 py-0.5 rounded-full">
                        ✓ Owned
                      </span>
                    )}
                    {!isOwned && (isDevLocked || !eligibility.eligible) && (
                      <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
                        🔒 Locked
                      </span>
                    )}
                  </div>
                </div>

                {/* Pet Showcase */}
                <div className="flex items-center gap-3 my-2 bg-slate-900/70 p-3 rounded-xl border border-white/5">
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center">
                    <PetSprite petId={pet.id} size={56} animate={isOwned || (!isDevLocked && eligibility.eligible)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-black text-amber-200 font-pixel truncate">
                      {pet.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                      {pet.description}
                    </p>
                  </div>
                </div>

                {/* Requirements / Special Conditions */}
                {pet.requirement.type !== 'gold' && !isOwned && (
                  <div className="my-2 p-2 rounded-lg bg-indigo-950/30 border border-indigo-600/30 text-[10px] text-indigo-200">
                    <div className="font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>✨</span> Requirement: {pet.requirement.description}
                    </div>
                    <div className="space-y-0.5">
                      {pet.requirement.minQuestsCompleted && (
                        <div className={completedQuestsCount >= pet.requirement.minQuestsCompleted ? 'text-emerald-400' : 'text-slate-400'}>
                          • {completedQuestsCount} / {pet.requirement.minQuestsCompleted} Quests Completed
                        </div>
                      )}
                      {pet.requirement.minStreak && (
                        <div className={(player.consistency?.streak ?? 0) >= pet.requirement.minStreak ? 'text-emerald-400' : 'text-slate-400'}>
                          • {(player.consistency?.streak ?? 0)} / {pet.requirement.minStreak} Day Streak
                        </div>
                      )}
                      {pet.requirement.minLeague && (
                        <div className={player.league?.tier === pet.requirement.minLeague ? 'text-emerald-400' : 'text-slate-400'}>
                          • Reach {pet.requirement.minLeague} League (Current: {player.league?.tier})
                        </div>
                      )}
                      {pet.requirement.minLevel && (
                        <div className={(player.progression?.level ?? 1) >= pet.requirement.minLevel ? 'text-emerald-400' : 'text-slate-400'}>
                          • Level {(player.progression?.level ?? 1)} / {pet.requirement.minLevel}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Action Area */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🪙</span>
                    <span className="text-sm font-black font-mono text-amber-300">
                      {pet.price.toLocaleString()}
                    </span>
                  </div>

                  {isOwned ? (
                    <button
                      disabled
                      className="px-4 py-1.5 rounded-xl bg-slate-800/60 text-slate-500 text-xs font-bold border border-slate-700/50 cursor-not-allowed"
                    >
                      Owned
                    </button>
                  ) : isDevLocked ? (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-xl bg-slate-800/60 text-slate-500 text-xs font-bold border border-slate-850 cursor-not-allowed"
                    >
                      🔒 Locked by Dev
                    </button>
                  ) : !eligibility.eligible ? (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-xl bg-slate-800/40 text-slate-500 text-xs font-semibold border border-slate-800 cursor-not-allowed text-right truncate max-w-[150px]"
                      title={eligibility.reason}
                    >
                      {eligibility.reason || 'Locked'}
                    </button>
                  ) : !canAfford ? (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-xl bg-red-950/40 text-red-400/80 text-xs font-bold border border-red-800/40 cursor-not-allowed"
                    >
                      Need Gold
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchase(pet)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md shadow-amber-500/20 border border-amber-300 transition-all active:scale-95"
                    >
                      Adopt 🐾
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
