import React from 'react';
import type { PetDef } from '../../types/pet';
import type { PlayerState } from '../../types/progression';
import { PetShopModalContent } from './PetShopModalContent';

interface PetShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerState;
  onUpdatePlayer: (updatedPlayer: PlayerState) => void;
  onOpenCreatureDex: () => void;
  onPetUnlocked: (pet: PetDef) => void;
  completedQuestsCount?: number;
}

export const PetShopModal: React.FC<PetShopModalProps> = ({
  isOpen,
  onClose,
  player,
  onUpdatePlayer,
  onOpenCreatureDex,
  onPetUnlocked,
  completedQuestsCount = 0,
}) => {
  if (!isOpen) return null;

  const currentGold = player.economy?.gold ?? 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[90vh] max-h-[780px] bg-slate-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/80 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow">🐾</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide font-pixel">
                PET SHOP
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Adopt loyal companions with magical auras to follow you on your adventures
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Player Gold Pill */}
            <div className="flex items-center gap-2 bg-slate-950 border border-amber-400/50 px-4 py-1.5 rounded-full shadow-inner">
              <span className="text-base">🪙</span>
              <span className="text-sm font-black text-amber-300 font-mono tracking-tight">
                {currentGold.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-500">Gold</span>
            </div>

            {/* Quick Dex Button */}
            <button
              onClick={() => {
                onClose();
                onOpenCreatureDex();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-bold transition-all active:scale-95 shadow"
            >
              <span>📖</span>
              <span>CreatureDex</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-500/80 text-slate-300 hover:text-white flex items-center justify-center font-bold text-base transition-colors border border-slate-700"
              aria-label="Close Pet Shop"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <PetShopModalContent
          player={player}
          onUpdatePlayer={onUpdatePlayer}
          onOpenCreatureDex={onOpenCreatureDex}
          onPetUnlocked={onPetUnlocked}
          completedQuestsCount={completedQuestsCount}
        />
      </div>
    </div>
  );
};
