import React, { useState } from 'react';
import type { PlayerState } from '../../types/progression';
import { WalkingCharacterSprite } from '../map/WalkingCharacterSprite';
import { PetSprite } from '../pet/PetSprite';
import { DEFAULT_HOME_FURNITURE } from '../../utils/homeData';
import type { HomeFurnitureItem } from '../../types/home';
import { PET_ROSTER } from '../../utils/petData';
import { playPetMovementVocalization, playStatIncreaseSound } from '../../utils/soundEffects';

interface HomeViewProps {
  player: PlayerState;
  onOpenShops: (tab?: 'pets' | 'character' | 'home') => void;
  onOpenWorldMap: () => void;
  onOpenQuests: () => void;
  onOpenStats: () => void;
  onUpdatePlayer?: (player: PlayerState) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  player,
  onOpenShops,
  onOpenWorldMap,
  onOpenQuests,
  onOpenStats,
}) => {
  const [selectedFurniture, setSelectedFurniture] = useState<HomeFurnitureItem | null>(null);
  const [petEmote, setPetEmote] = useState<string | null>(null);
  const [characterEmote, setCharacterEmote] = useState<string | null>(null);

  const gold = player.economy?.gold ?? 0;
  const equippedPetId = player.pets?.equippedPetId;
  const equippedPetDef = PET_ROSTER.find((p) => p.id === equippedPetId);

  const handlePetClick = () => {
    if (!equippedPetId) return;
    playPetMovementVocalization(equippedPetId, { force: true });
    setPetEmote('❤️ 🎵');
    setTimeout(() => setPetEmote(null), 1800);
  };

  const handleCharacterClick = () => {
    playStatIncreaseSound();
    setCharacterEmote('✨ ⚔️');
    setTimeout(() => setCharacterEmote(null), 1800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between py-4 px-3 sm:px-6 relative text-slate-100 z-10 animate-fadeIn">
      {/* Top Header Bar */}
      <header className="w-full max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/90 border-2 border-amber-500/50 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
            🏠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-amber-300 font-pixel tracking-wide">
                MY HOME
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-bold text-emerald-300 uppercase">
                Cozy Haven
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Your personal retreat and peaceful sanctuary between epic quests
            </p>
          </div>
        </div>

        {/* Top Actions & Gold Display */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Gold Balance */}
          <div className="flex items-center gap-2 bg-slate-950 border border-amber-400/60 px-3.5 py-1.5 rounded-full shadow-inner">
            <span className="text-base">💰</span>
            <span className="text-sm font-black text-amber-300 font-mono">
              {gold.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-500">Gold</span>
          </div>

          {/* Quick Shops Hub Button */}
          <button
            onClick={() => onOpenShops()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 border-2 border-amber-300 text-xs font-black transition-all active:scale-95 shadow-[0_2px_8px_rgba(245,158,11,0.3)]"
          >
            <span>🛍️</span>
            <span>SHOPS</span>
          </button>

          {/* Quick Navigation Buttons */}
          <button
            onClick={onOpenQuests}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 transition-all active:scale-95"
          >
            📜 Quests
          </button>
          <button
            onClick={onOpenWorldMap}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 transition-all active:scale-95"
          >
            🗺️ World Map
          </button>
          <button
            onClick={onOpenStats}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 transition-all active:scale-95"
          >
            📊 Stats
          </button>
        </div>
      </header>

      {/* Main Cozy Room Environment */}
      <main className="w-full max-w-4xl mx-auto my-4 flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-[#2b1e16] border-4 border-[#5c3e29] rounded-3xl p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Wall Background & Arched Windows */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#1e130d] to-[#3a261a] border-b-4 border-[#52331f] flex items-center justify-around px-8">
            {/* Left Window with Sunbeam */}
            <div className="w-16 h-24 bg-gradient-to-b from-sky-400 via-amber-200 to-amber-100 rounded-t-full border-4 border-[#6d4c33] shadow-inner relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-1 bg-[#6d4c33]" />
              <div className="absolute h-full w-1 bg-[#6d4c33]" />
              <div className="absolute inset-0 bg-yellow-200/20 transform rotate-12 filter blur-[1px]" />
            </div>

            {/* Cozy Painting */}
            <div className="w-20 h-16 bg-[#18110b] border-2 border-amber-600/80 rounded shadow flex items-center justify-center text-xl">
              🏞️
            </div>

            {/* Right Window */}
            <div className="w-16 h-24 bg-gradient-to-b from-sky-400 via-amber-200 to-amber-100 rounded-t-full border-4 border-[#6d4c33] shadow-inner relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-1 bg-[#6d4c33]" />
              <div className="absolute h-full w-1 bg-[#6d4c33]" />
              <div className="absolute inset-0 bg-yellow-200/20 transform -rotate-12 filter blur-[1px]" />
            </div>
          </div>

          {/* Wooden Flooring Grid & Ornate Central Rug */}
          <div className="relative z-10 pt-36 pb-6 px-4">
            {/* Center Woven Carpet */}
            <div className="max-w-md mx-auto h-52 bg-gradient-to-br from-red-950 via-rose-900 to-amber-950 rounded-3xl border-4 border-amber-600/60 shadow-2xl relative flex items-center justify-center p-4">
              <div className="absolute inset-2 border-2 border-dashed border-amber-400/40 rounded-2xl pointer-events-none" />

              {/* ======================================================== */}
              {/* CENTER: CHARACTER & EQUIPPED PET COMPANION                */}
              {/* ======================================================== */}
              <div className="flex items-end justify-center gap-6 relative z-20">
                {/* Character Avatar */}
                <div
                  onClick={handleCharacterClick}
                  className="cursor-pointer group flex flex-col items-center relative transition-transform hover:scale-105 active:scale-95"
                  title="Click to interact with your character"
                >
                  {characterEmote && (
                    <div className="absolute -top-7 px-2 py-0.5 bg-slate-900/90 border border-amber-400 rounded-full text-xs font-bold text-amber-300 animate-bounce shadow">
                      {characterEmote}
                    </div>
                  )}
                  <div className="relative">
                    <WalkingCharacterSprite
                      profile={player.character}
                      league={player.league}
                      facing="down"
                      size={64}
                    />
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded bg-slate-950/80 border border-amber-500/40 text-[10px] font-pixel text-amber-300">
                    {player.character.name || 'Hero'}
                  </span>
                </div>

                {/* Equipped Pet Companion */}
                {equippedPetId && equippedPetDef && (
                  <div
                    onClick={handlePetClick}
                    className="cursor-pointer group flex flex-col items-center relative transition-transform hover:scale-110 active:scale-95"
                    title={`Click to pet ${equippedPetDef.name}`}
                  >
                    {petEmote && (
                      <div className="absolute -top-7 px-2 py-0.5 bg-slate-900/90 border border-emerald-400 rounded-full text-xs font-bold text-emerald-300 animate-bounce shadow">
                        {petEmote}
                      </div>
                    )}
                    <div className="p-1 rounded-2xl bg-amber-950/40 border border-amber-500/30 group-hover:border-amber-400 shadow-md">
                      <PetSprite petId={equippedPetId} size={48} isAnimated={true} />
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded bg-slate-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                      {equippedPetDef.emoji} {equippedPetDef.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ======================================================== */}
            {/* FURNITURE ELEMENTS IN ROOM (Matching prompt specification)*/}
            {/* ======================================================== */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {DEFAULT_HOME_FURNITURE.map((furn) => (
                <div
                  key={furn.id}
                  onClick={() => setSelectedFurniture(furn)}
                  className="cursor-pointer bg-slate-900/85 hover:bg-slate-800/90 border-2 border-amber-500/30 hover:border-amber-400 p-3 rounded-2xl flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 shadow-lg group"
                >
                  <span className="text-3xl mb-1 filter drop-shadow group-hover:scale-110 transition-transform">
                    {furn.icon}
                  </span>
                  <span className="text-xs font-bold text-amber-200 font-pixel">
                    {furn.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Click to inspect
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Furniture Inspection Modal / Card */}
        {selectedFurniture && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border-2 border-amber-400 p-6 rounded-3xl max-w-sm w-full shadow-2xl text-center space-y-4">
              <span className="text-5xl block animate-bounce">
                {selectedFurniture.icon}
              </span>
              <h3 className="text-lg font-black text-amber-300 font-pixel">
                {selectedFurniture.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedFurniture.description}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSelectedFurniture(null)}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Future Customization System Banner */}
        <div className="w-full mt-4 p-3.5 bg-gradient-to-r from-amber-950/40 via-slate-900/70 to-indigo-950/40 border border-amber-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🔨</span>
            <div>
              <span className="font-bold text-amber-300">Home Customization System</span>
              <p className="text-[11px] text-slate-400">
                Future updates will allow rearranging furniture, custom wallpapers, pet decorations, and trophy cabinets using Gold.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenShops('home')}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-bold text-xs transition-all"
          >
            Preview Home Shop →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-[10px] text-slate-400 py-2">
        <span>Life RPG • Step 18: Personal Home • Cozy sanctuary for your hero & companion</span>
      </footer>
    </div>
  );
};
