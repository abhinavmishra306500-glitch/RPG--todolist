import React, { useState } from 'react';
import type { PetRarity } from '../../types/pet';
import { PET_ROSTER, isPetOwned, isPetEquipped } from '../../utils/petData';
import type { PlayerState } from '../../types/progression';
import { PetSprite } from './PetSprite';
import { RpgBadge } from '../ui/RpgBadge';

interface CreatureDexModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerState;
  onEquipPet: (petId: string) => void;
  onUnequipPet: () => void;
  onOpenPetShop: () => void;
}

const RARITY_FILTERS: Array<PetRarity | 'ALL'> = [
  'ALL',
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Legendary',
];

const RARITY_BADGE_VARIANTS: Record<PetRarity, 'neutral' | 'success' | 'info' | 'epic' | 'gold'> = {
  Common: 'neutral',
  Uncommon: 'success',
  Rare: 'info',
  Epic: 'epic',
  Legendary: 'gold',
};

export const CreatureDexModal: React.FC<CreatureDexModalProps> = ({
  isOpen,
  onClose,
  player,
  onEquipPet,
  onUnequipPet,
  onOpenPetShop,
}) => {
  const [selectedRarity, setSelectedRarity] = useState<PetRarity | 'ALL'>('ALL');
  const [selectedPetId, setSelectedPetId] = useState<string>(
    player.pets?.equippedPetId || PET_ROSTER[0].id
  );

  if (!isOpen) return null;

  const ownedCount = PET_ROSTER.filter((p) => isPetOwned(player.pets, p.id)).length;
  const totalCount = PET_ROSTER.length;

  const filteredPets = PET_ROSTER.filter((p) => {
    if (selectedRarity === 'ALL') return true;
    return p.rarity === selectedRarity;
  });

  const selectedPet = PET_ROSTER.find((p) => p.id === selectedPetId) || PET_ROSTER[0];
  const isSelectedOwned = isPetOwned(player.pets, selectedPet.id);
  const isSelectedEquipped = isPetEquipped(player.pets, selectedPet.id);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[90vh] max-h-[780px] bg-slate-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow">📖</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide font-pixel">
                CREATUREDEX
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Comprehensive encyclopedia of mystical fantasy companions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dynamic Counter */}
            <div className="flex items-center gap-2 bg-slate-950/90 border border-amber-400/40 px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="text-xs text-amber-200/90 font-bold uppercase tracking-wider">
                Collected:
              </span>
              <span className="text-sm font-black text-amber-300 font-mono">
                {ownedCount} / {totalCount}
              </span>
            </div>

            {/* Quick Link to Pet Shop */}
            <button
              onClick={() => {
                onClose();
                onOpenPetShop();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all active:scale-95 shadow"
            >
              <span>🛒</span>
              <span>Pet Shop</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-500/80 text-slate-300 hover:text-white flex items-center justify-center font-bold text-base transition-colors border border-slate-700"
              aria-label="Close CreatureDex"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Rarity Filter Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Filter:
          </span>
          {RARITY_FILTERS.map((rarity) => (
            <button
              key={rarity}
              onClick={() => setSelectedRarity(rarity)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedRarity === rarity
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-black'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60'
              }`}
            >
              <span>{rarity}</span>
              {rarity !== 'ALL' && (
                <span className="text-[10px] opacity-75 font-mono">
                  ({PET_ROSTER.filter((p) => p.rarity === rarity).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main Body: Grid + Inspector Pane */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Creature Cards Grid */}
          <div className="md:col-span-7 lg:col-span-8 p-4 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredPets.map((pet) => {
                const owned = isPetOwned(player.pets, pet.id);
                const equipped = isPetEquipped(player.pets, pet.id);
                const isSelected = selectedPetId === pet.id;

                return (
                  <button
                    key={pet.id}
                    onClick={() => setSelectedPetId(pet.id)}
                    className={`relative group rounded-2xl p-3 text-left transition-all flex flex-col items-center gap-2 border-2 ${
                      isSelected
                        ? 'border-amber-400 bg-slate-800/90 shadow-lg shadow-amber-500/20 scale-[1.02]'
                        : 'border-slate-800 hover:border-slate-600 bg-slate-950/60 hover:bg-slate-900/80'
                    }`}
                  >
                    {/* Status Badge Top Left */}
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      {equipped && (
                        <span className="bg-emerald-500/90 text-slate-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow">
                          Equipped
                        </span>
                      )}
                      {!equipped && owned && (
                        <span className="bg-blue-500/80 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow">
                          Owned
                        </span>
                      )}
                      {!owned && (
                        <span className="bg-slate-800 text-slate-400 text-[9px] font-medium uppercase px-1.5 py-0.5 rounded border border-slate-700">
                          🔒 Locked
                        </span>
                      )}
                    </div>

                    {/* Sprite Area */}
                    <div className="w-full aspect-square flex items-center justify-center p-2 rounded-xl bg-slate-900/70 border border-white/5 my-1">
                      {owned ? (
                        <PetSprite petId={pet.id} size={54} animate={isSelected} />
                      ) : (
                        <div className="relative flex items-center justify-center filter brightness-0 opacity-40 group-hover:opacity-60 transition-opacity">
                          <PetSprite petId={pet.id} size={54} />
                          <span className="absolute text-xl">❓</span>
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="w-full text-center">
                      <div className="text-xs font-bold text-slate-200 truncate group-hover:text-amber-300">
                        {owned ? pet.name : '???'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        <RpgBadge variant={RARITY_BADGE_VARIANTS[pet.rarity] || 'neutral'}>
                          {pet.rarity}
                        </RpgBadge>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Creature Details Pane (Inspector) */}
          <div className="md:col-span-5 lg:col-span-4 bg-slate-950/90 border-t md:border-t-0 md:border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Header Showcase */}
              <div className="relative rounded-2xl bg-gradient-to-b from-indigo-950/60 to-slate-900 border border-slate-800 p-5 flex flex-col items-center text-center shadow-inner">
                <div className="my-2 p-3 rounded-2xl bg-black/40 border border-white/5">
                  <PetSprite petId={selectedPet.id} size={84} animate />
                </div>

                <h3 className="text-xl font-black text-amber-300 font-pixel mt-1">
                  {isSelectedOwned ? selectedPet.name : 'Unknown Creature'}
                </h3>

                <div className="flex items-center gap-2 mt-1">
                  <RpgBadge variant={RARITY_BADGE_VARIANTS[selectedPet.rarity] || 'neutral'}>
                    {selectedPet.rarity}
                  </RpgBadge>
                  {selectedPet.price > 0 && (
                    <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                      🪙 {selectedPet.price.toLocaleString()} Gold
                    </span>
                  )}
                  {selectedPet.id === 'bunbun' && (
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      🌟 Starter Companion
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Description
                </div>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {isSelectedOwned ? selectedPet.description : 'Undiscovered mystical companion.'}
                </p>
              </div>

              {/* Lore & Aura */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Lore & Companionship
                </div>
                <p className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 italic leading-relaxed">
                  {isSelectedOwned
                    ? selectedPet.lore
                    : 'Unlock this companion through the Pet Shop or heroic achievements to discover its legend.'}
                </p>
              </div>

              {/* Unlock Requirement Info */}
              {!isSelectedOwned && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-600/30 text-xs text-amber-200">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <span>🗝️</span> How to Obtain:
                  </div>
                  <p className="text-[11px] text-amber-300/90 mb-1">
                    {selectedPet.requirement.description}
                  </p>
                  {selectedPet.requirement.type === 'complex' && (
                    <ul className="text-[11px] list-disc list-inside space-y-0.5 text-amber-300/90">
                      {selectedPet.requirement.minLevel && (
                        <li>Reach Level {selectedPet.requirement.minLevel}</li>
                      )}
                      {selectedPet.requirement.goldPrice && (
                        <li>{selectedPet.requirement.goldPrice.toLocaleString()} Gold</li>
                      )}
                      {selectedPet.requirement.minLeague && (
                        <li>Reach {selectedPet.requirement.minLeague} League</li>
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              {isSelectedOwned ? (
                isSelectedEquipped ? (
                  <button
                    onClick={onUnequipPet}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all active:scale-95 shadow"
                  >
                    🐾 Unequip Companion
                  </button>
                ) : (
                  <button
                    onClick={() => onEquipPet(selectedPet.id)}
                    className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border border-amber-300 shadow-lg shadow-amber-500/25 transition-all active:scale-95"
                  >
                    🐾 Equip Companion
                  </button>
                )
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenPetShop();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white border border-indigo-400/60 shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🛒</span>
                  <span>Buy in Pet Shop</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
