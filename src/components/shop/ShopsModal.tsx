import React, { useState, useEffect, useCallback } from 'react';
import type { PlayerState } from '../../types/progression';
import type { PetDef } from '../../types/pet';
import { PetShopModalContent } from '../pet/PetShopModalContent';
import { CharacterShopTab } from './CharacterShopTab';
import { HomeShopTab } from './HomeShopTab';
import { devUnlockAllShopItems, devLockAllShopItems } from '../../utils/devShopShortcuts';
import { playLevelUpSound, playStatIncreaseSound } from '../../utils/soundEffects';

export type ShopTab = 'pets' | 'character' | 'home';

interface ShopsModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerState;
  onUpdatePlayer: (updatedPlayer: PlayerState) => void;
  onOpenCreatureDex: () => void;
  onPetUnlocked: (pet: PetDef) => void;
  completedQuestsCount?: number;
  initialTab?: ShopTab;
}

export const ShopsModal: React.FC<ShopsModalProps> = ({
  isOpen,
  onClose,
  player,
  onUpdatePlayer,
  onOpenCreatureDex,
  onPetUnlocked,
  completedQuestsCount = 0,
  initialTab = 'pets',
}) => {
  const [activeTab, setActiveTab] = useState<ShopTab>(initialTab);
  const [devToast, setDevToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setDevToast(msg);
    setTimeout(() => setDevToast(null), 3000);
  };

  const handleDevUnlockAll = useCallback(() => {
    const { updatedPlayer, message } = devUnlockAllShopItems(player);
    playLevelUpSound();
    onUpdatePlayer(updatedPlayer);
    showToast(message);
  }, [player, onUpdatePlayer]);

  const handleDevLockAll = useCallback(() => {
    const { updatedPlayer, message } = devLockAllShopItems(player);
    playStatIncreaseSound();
    onUpdatePlayer(updatedPlayer);
    showToast(message);
  }, [player, onUpdatePlayer]);

  // Keyboard shortcut listener for developer mode:
  // Key U / Shift+U -> Unlock All
  // Key L / Shift+L -> Lock All
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in text input fields
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        handleDevUnlockAll();
      } else if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        handleDevLockAll();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleDevUnlockAll, handleDevLockAll, onClose]);

  if (!isOpen) return null;

  const currentGold = player.economy?.gold ?? 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[820px] bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Floating Dev Toast Notification */}
        {devToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 font-black text-xs rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.6)] border-2 border-white animate-bounce">
            {devToast}
          </div>
        )}

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/80 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow">🛍️</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide font-pixel">
                  SHOPS & BAZAAR
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-bold text-amber-300">
                  Kingdom Market
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Spend your hard-earned Gold on magical creature companions & character cosmetics
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Developer Fast Unlock / Lock Shortcut Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950/90 border border-amber-500/40 p-1 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={handleDevUnlockAll}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold transition-all active:scale-95"
                title="Developer Shortcut: Press 'U' on keyboard to Unlock All items in Pet & Character Shop"
              >
                <span>🔓</span>
                <span>Unlock All</span>
                <kbd className="ml-1 px-1 py-0.2 bg-slate-900 border border-emerald-400/50 rounded text-[9px] font-mono font-black text-white">
                  U
                </kbd>
              </button>

              <button
                type="button"
                onClick={handleDevLockAll}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-900/30 hover:bg-rose-900/50 text-rose-300 border border-rose-500/40 text-[11px] font-bold transition-all active:scale-95"
                title="Developer Shortcut: Press 'L' on keyboard to Lock All items back to defaults"
              >
                <span>🔒</span>
                <span>Lock All</span>
                <kbd className="ml-1 px-1 py-0.2 bg-slate-900 border border-rose-400/50 rounded text-[9px] font-mono font-black text-white">
                  L
                </kbd>
              </button>
            </div>

            {/* Player Gold Balance Display */}
            <div className="flex items-center gap-2 bg-slate-950 border border-amber-400/50 px-4 py-1.5 rounded-full shadow-inner">
              <span className="text-base">💰</span>
              <span className="text-sm font-black text-amber-300 font-mono tracking-tight">
                {currentGold.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-500">Gold</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm transition-colors border border-slate-700"
              title="Close Shops"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Shop Navigation Tabs (ONLY Pets, Character Cosmetics, Home Shop - NO Magic Shop) */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-950/70 border-b border-slate-800 overflow-x-auto">
          {/* Tab 1: Pet Shop */}
          <button
            onClick={() => setActiveTab('pets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'pets'
                ? 'bg-amber-500 text-slate-950 font-black shadow-[0_2px_8px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>🐾</span>
            <span>Pet Shop</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-950/60 text-amber-200 border border-amber-500/30">
              10 Creatures
            </span>
          </button>

          {/* Tab 2: Character Shop */}
          <button
            onClick={() => setActiveTab('character')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'character'
                ? 'bg-amber-500 text-slate-950 font-black shadow-[0_2px_8px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>👕</span>
            <span>Character Shop</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-950/60 text-indigo-200 border border-indigo-500/30">
              Cosmetics
            </span>
          </button>

          {/* Tab 3: Home Shop */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-amber-500 text-slate-950 font-black shadow-[0_2px_8px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>🏠</span>
            <span>Home Shop</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
              Coming Soon
            </span>
          </button>
        </div>

        {/* Tab Content Rendering */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'pets' && (
            <PetShopModalContent
              player={player}
              onUpdatePlayer={onUpdatePlayer}
              onOpenCreatureDex={() => {
                onClose();
                onOpenCreatureDex();
              }}
              onPetUnlocked={onPetUnlocked}
              completedQuestsCount={completedQuestsCount}
            />
          )}

          {activeTab === 'character' && (
            <CharacterShopTab
              player={player}
              onUpdatePlayer={onUpdatePlayer}
            />
          )}

          {activeTab === 'home' && (
            <HomeShopTab />
          )}
        </div>
      </div>
    </div>
  );
};
