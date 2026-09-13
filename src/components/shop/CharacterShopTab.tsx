import React, { useState, useEffect } from 'react';
import type { PlayerState } from '../../types/progression';
import type { CosmeticCategory, CosmeticItemDef } from '../../types/cosmetics';
import {
  COSMETICS_CATALOG,
  isCosmeticOwned,
  isCosmeticEquipped,
  isCosmeticDevLocked,
  buyCosmetic,
  equipCosmetic,
} from '../../utils/cosmeticsData';
import {
  devToggleSpecificCosmetic,
  devLockSpecificCosmetic,
  devUnlockSpecificCosmetic,
} from '../../utils/devShopShortcuts';
import { WalkingCharacterSprite } from '../map/WalkingCharacterSprite';
import { RpgBadge } from '../ui/RpgBadge';
import { playCosmeticPurchaseSound, playStatIncreaseSound } from '../../utils/soundEffects';

interface CharacterShopTabProps {
  player: PlayerState;
  onUpdatePlayer: (updatedPlayer: PlayerState) => void;
}

const RARITY_BADGE_VARIANTS: Record<string, 'neutral' | 'success' | 'info' | 'epic' | 'gold'> = {
  Common: 'neutral',
  Uncommon: 'success',
  Rare: 'info',
  Epic: 'epic',
  Legendary: 'gold',
};

export const CharacterShopTab: React.FC<CharacterShopTabProps> = ({
  player,
  onUpdatePlayer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CosmeticCategory | 'all'>('all');
  const [previewItem, setPreviewItem] = useState<CosmeticItemDef | null>(null);
  const [hoveredCosmeticId, setHoveredCosmeticId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const currentGold = player.economy?.gold ?? 0;

  const filteredItems = COSMETICS_CATALOG.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleToggleSpecific = (cosmeticId: string) => {
    const { updatedPlayer, unlocked, message } = devToggleSpecificCosmetic(player, cosmeticId);
    if (unlocked) {
      playCosmeticPurchaseSound();
    } else {
      playStatIncreaseSound();
    }
    onUpdatePlayer(updatedPlayer);
    setFeedbackMessage({ text: message });
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  const handleLockSpecific = (cosmeticId: string) => {
    const { updatedPlayer, message } = devLockSpecificCosmetic(player, cosmeticId);
    playStatIncreaseSound();
    onUpdatePlayer(updatedPlayer);
    setFeedbackMessage({ text: message });
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  const handleUnlockSpecific = (cosmeticId: string) => {
    const { updatedPlayer, message } = devUnlockSpecificCosmetic(player, cosmeticId);
    playCosmeticPurchaseSound();
    onUpdatePlayer(updatedPlayer);
    setFeedbackMessage({ text: message });
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  // Keyboard shortcut listener:
  // When hovering over a cosmetic:
  // - Pressing 'L' locks that item
  // - Pressing 'U' unlocks that item
  // - Pressing 'T' / 'X' toggles lock/unlock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (hoveredCosmeticId) {
        if (!e.shiftKey && (e.key === 'l' || e.key === 'L')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleLockSpecific(hoveredCosmeticId);
        } else if (!e.shiftKey && (e.key === 'u' || e.key === 'U')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleUnlockSpecific(hoveredCosmeticId);
        } else if (e.key === 't' || e.key === 'T' || e.key === 'x' || e.key === 'X') {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleToggleSpecific(hoveredCosmeticId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [hoveredCosmeticId, player]);

  const handleBuy = (item: CosmeticItemDef) => {
    setFeedbackMessage(null);
    const result = buyCosmetic(player, item.id);
    if (!result.success || !result.updatedPlayer) {
      setFeedbackMessage({ text: result.message || 'Purchase failed', isError: true });
      return;
    }

    playCosmeticPurchaseSound();
    onUpdatePlayer(result.updatedPlayer);
    setFeedbackMessage({ text: `✨ Successfully purchased and equipped ${item.name}!` });
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleEquipToggle = (item: CosmeticItemDef) => {
    const isEquipped = isCosmeticEquipped(player, item.id);
    const newId = isEquipped ? null : item.id;
    const result = equipCosmetic(player, newId, item.category);

    if (result.success) {
      playStatIncreaseSound();
      onUpdatePlayer(result.updatedPlayer);
      setFeedbackMessage({
        text: isEquipped ? `Unequipped ${item.name}` : `Equipped ${item.name}`,
      });
      setTimeout(() => setFeedbackMessage(null), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 p-4 sm:p-6 overflow-hidden">
      {/* Left Column: Live Character Wardrobe Preview */}
      <div className="w-full md:w-72 bg-slate-950/80 border-2 border-amber-500/30 rounded-2xl p-4 flex flex-col items-center justify-between shadow-xl shrink-0">
        <div className="text-center w-full">
          <h3 className="text-sm font-bold text-amber-300 font-pixel uppercase tracking-wider">
            Wardrobe Preview
          </h3>
          <p className="text-[11px] text-slate-400">
            {player.character.name || 'Hero'}
          </p>
        </div>

        {/* Character Stage */}
        <div className="my-4 py-6 px-4 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-amber-950/40 rounded-2xl border border-amber-500/20 w-full flex flex-col items-center justify-center relative shadow-inner">
          <div className="relative transform hover:scale-110 transition-transform duration-200">
            <WalkingCharacterSprite
              profile={player.character}
              league={player.league}
              facing="down"
              size={72}
            />
          </div>
          <span className="mt-3 text-[11px] font-bold text-amber-300">
            {previewItem ? `Inspecting: ${previewItem.name}` : 'Current Appearance'}
          </span>
        </div>

        {/* Feedback Message */}
        {feedbackMessage && (
          <div
            className={`w-full py-2 px-3 rounded-xl text-center text-xs font-bold mb-2 animate-fadeIn ${
              feedbackMessage.isError
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {feedbackMessage.text}
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="w-full grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800">
          {(['all', 'headwear', 'outfit', 'accessory'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? '✨ All' : cat === 'headwear' ? '👑 Headwear' : cat === 'outfit' ? '👕 Outfits' : '🧣 Accessories'}
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Cosmetic Items Grid */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 custom-scrollbar">
          {filteredItems.map((item) => {
            const owned = isCosmeticOwned(player, item.id);
            const isDevLocked = isCosmeticDevLocked(player, item.id);
            const equipped = isCosmeticEquipped(player, item.id);
            const canAfford = currentGold >= item.price;

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setPreviewItem(item);
                  setHoveredCosmeticId(item.id);
                }}
                onMouseLeave={() => {
                  setPreviewItem(null);
                  setHoveredCosmeticId((prev) => (prev === item.id ? null : prev));
                }}
                onClick={(e) => {
                  if (e.altKey || e.shiftKey) {
                    e.preventDefault();
                    handleToggleSpecific(item.id);
                  }
                }}
                className={`bg-slate-900/90 border-2 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-lg group ${
                  equipped
                    ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)] bg-gradient-to-b from-amber-950/20 to-slate-900'
                    : owned
                    ? 'border-emerald-500/40 hover:border-emerald-400'
                    : isDevLocked
                    ? 'border-slate-800/80 bg-slate-950/80 opacity-80'
                    : 'border-slate-800 hover:border-amber-500/50'
                }`}
              >
                {/* Header with Icon, Name & Rarity + Dev Toggle */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl p-1.5 bg-slate-950 rounded-xl border border-slate-800 shadow">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-100 font-pixel leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5">
                        <RpgBadge
                          variant={RARITY_BADGE_VARIANTS[item.rarity] || 'neutral'}
                          size="sm"
                        >
                          {item.rarity}
                        </RpgBadge>

                        {isDevLocked && !owned && (
                          <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
                            🔒 Locked
                          </span>
                        )}
                        {owned && (
                          <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/70 border border-emerald-600/40 px-2 py-0.5 rounded-full">
                            ✓ Owned
                          </span>
                        )}
                      </div>

                      {/* Developer 1-Click Toggle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSpecific(item.id);
                        }}
                        className="px-1.5 py-0.5 rounded bg-slate-950 border border-amber-400/40 text-[9px] font-bold text-amber-300 transition-all opacity-80 group-hover:opacity-100"
                        title="Developer: Click to toggle lock/unlock for this cosmetic (or press L / U / T while hovering)"
                      >
                        {isDevLocked ? '🔓 Unlock [U]' : '🔒 Lock [L]'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                    {item.description}
                  </p>

                  {item.perkText && (
                    <div className="inline-block px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30 text-[10px] font-semibold text-indigo-300 mb-3">
                      ✨ {item.perkText}
                    </div>
                  )}
                </div>

                {/* Purchase / Equip Action Footer */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 font-mono">
                    <span>💰</span>
                    <span>{item.price.toLocaleString()}</span>
                    <span className="text-[10px] text-amber-500 font-sans uppercase">Gold</span>
                  </div>

                  {owned ? (
                    <button
                      onClick={() => handleEquipToggle(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                        equipped
                          ? 'bg-amber-500 text-slate-950 font-black shadow'
                          : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40'
                      }`}
                    >
                      {equipped ? '✓ Equipped' : 'Equip'}
                    </button>
                  ) : isDevLocked ? (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-xl bg-slate-800/60 text-slate-500 border border-slate-800 text-xs font-bold cursor-not-allowed"
                    >
                      🔒 Locked by Dev
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black shadow'
                          : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Buy with Gold' : 'Need More Gold'}
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
