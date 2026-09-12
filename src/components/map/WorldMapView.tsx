import React, { useState, useEffect, useCallback } from 'react';
import type { PlayerState } from '../../types/progression';
import type { MapLevelDef, MapWorldDef } from '../../types/map';
import {
  ALL_MAP_WORLDS,
  normalizeMapProgression,
  getMapNodeState,
  getMapLevelDef,
  advanceMapLevel,
  regressMapLevel,
  getPathWaypointsBetweenLevels,
  getWorldById,
  getWorldByLevel,
} from '../../utils/mapData';
import { WorldCanvas } from './WorldCanvas';
import { WorldNodeMarker } from './WorldNodeMarker';
import { WalkingCharacterSprite } from './WalkingCharacterSprite';
import { useCharacterMovement } from './useCharacterMovement';
import {
  playQuestCompleteSound,
  playStatIncreaseSound,
  startForestAmbience,
  stopForestAmbience,
} from '../../utils/soundEffects';
import {
  ArrowLeft,
  Swords,
  Sparkles,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Layers,
  Volume2,
  VolumeX,
  Terminal,
} from 'lucide-react';

interface WorldMapViewProps {
  player: PlayerState;
  onUpdatePlayer: (player: PlayerState) => void;
  onBackToStats: () => void;
  onOpenQuests: () => void;
}

export const WorldMapView: React.FC<WorldMapViewProps> = ({
  player,
  onUpdatePlayer,
  onBackToStats,
  onOpenQuests,
}) => {
  const mapProgression = normalizeMapProgression(player.map);

  // Active viewed world (default to world matching current map level)
  const initialWorld = getWorldByLevel(mapProgression.currentMapLevel);
  const [selectedWorld, setSelectedWorld] = useState<MapWorldDef>(
    mapProgression.selectedWorldId ? getWorldById(mapProgression.selectedWorldId) : initialWorld
  );

  // Selected level modal
  const [selectedLevelNode, setSelectedLevelNode] = useState<MapLevelDef | null>(null);
  const [showWorldSelector, setShowWorldSelector] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [devToast, setDevToast] = useState<string | null>(null);

  // Forest Ambience Sound Loop
  useEffect(() => {
    if (isSoundOn && selectedWorld.id === 'bronze-village') {
      startForestAmbience(0.08);
    } else {
      stopForestAmbience();
    }
    return () => {
      stopForestAmbience();
    };
  }, [isSoundOn, selectedWorld.id]);

  // Level Definition for current player map position
  const currentLevelDef = getMapLevelDef(mapProgression.currentMapLevel);

  // Movement hook
  const handleArrival = useCallback(
    (_targetLevel: number) => {
      playQuestCompleteSound();
      const result = advanceMapLevel(player);
      if (result.advanced) {
        onUpdatePlayer(result.updatedPlayer);
      }
    },
    [player, onUpdatePlayer]
  );

  const {
    currentPosition,
    facing,
    isWalking,
    walkCycle,
    startWalkingAlongPath,
    teleportToPosition,
  } = useCharacterMovement({
    initialPosition: currentLevelDef.position,
    onMovementComplete: handleArrival,
  });

  const showDevMessage = (msg: string) => {
    setDevToast(msg);
    setTimeout(() => setDevToast(null), 2500);
  };

  // Step backward helper (Dev key: [ or B or Shift+Left)
  const handleStepBackward = useCallback(() => {
    const result = regressMapLevel(player);
    if (result.regressed) {
      playStatIncreaseSound();
      onUpdatePlayer(result.updatedPlayer);
      const prevDef = getMapLevelDef(result.toLevel);
      teleportToPosition(prevDef.position);
      if (prevDef.worldId !== selectedWorld.id) {
        setSelectedWorld(getWorldById(prevDef.worldId));
      }
      showDevMessage(`⏪ DEV: Stepped Back to Level ${result.toLevel} (${prevDef.name})`);
    } else {
      showDevMessage('⚠️ Already at Level 1 (Cannot go backward further)');
    }
  }, [player, onUpdatePlayer, teleportToPosition, selectedWorld.id]);

  // Step forward helper (Dev key: ] or N or Shift+Right)
  const handleAdvanceToNext = useCallback(() => {
    if (isWalking) return;
    const nextLevelNum = mapProgression.currentMapLevel + 1;
    if (nextLevelNum > 50) {
      showDevMessage('⭐ Reached Final Level 50!');
      return;
    }

    const nextDef = getMapLevelDef(nextLevelNum);

    if (nextDef.worldId !== selectedWorld.id) {
      setSelectedWorld(getWorldById(nextDef.worldId));
    }

    playStatIncreaseSound();
    const waypoints = getPathWaypointsBetweenLevels(mapProgression.currentMapLevel, nextLevelNum);
    startWalkingAlongPath(waypoints, nextLevelNum);
    showDevMessage(`⏩ Walking to Level ${nextLevelNum}...`);
  }, [isWalking, mapProgression.currentMapLevel, selectedWorld.id, startWalkingAlongPath]);

  // Developer Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Backward shortcuts: [ , B , b , < , Shift + ArrowLeft
      if (e.key === '[' || e.key === 'b' || e.key === 'B' || e.key === '<' || (e.shiftKey && e.key === 'ArrowLeft')) {
        e.preventDefault();
        handleStepBackward();
      }
      // Forward shortcuts: ] , N , n , > , Shift + ArrowRight
      else if (e.key === ']' || e.key === 'n' || e.key === 'N' || e.key === '>' || (e.shiftKey && e.key === 'ArrowRight')) {
        e.preventDefault();
        handleAdvanceToNext();
      }
      // Reset to Level 1: R, r, 0
      else if (e.key === 'r' || e.key === 'R' || e.key === '0') {
        e.preventDefault();
        const resetMap = {
          ...mapProgression,
          currentMapLevel: 1,
          completedLevels: [],
          selectedWorldId: 'bronze-village',
        };
        onUpdatePlayer({ ...player, map: resetMap });
        setSelectedWorld(getWorldById('bronze-village'));
        const l1Def = getMapLevelDef(1);
        teleportToPosition(l1Def.position);
        showDevMessage('🔄 DEV: Reset Map Progression to Level 1 (Bronze Village)');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStepBackward, handleAdvanceToNext, mapProgression, onUpdatePlayer, player, teleportToPosition]);

  const isHeroInThisWorld = selectedWorld.id === currentLevelDef.worldId;
  const nextLevelNumber = mapProgression.currentMapLevel + 1;
  const canAdvance = nextLevelNumber <= 50;

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-slate-950 select-none flex flex-col z-50">
      {/* ===================================================================
          1. TOP RETRO FANTASY FLOATING BANNER & HUD (Inspired by Reference)
      =================================================================== */}
      <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4 flex items-center justify-between">
        {/* Top-Left Action Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={onBackToStats}
            className="flex items-center gap-2 bg-gradient-to-b from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-900 text-amber-300 border-2 border-amber-600/80 px-3 py-1.5 rounded-lg shadow-2xl transition-all active:scale-95 text-xs sm:text-sm font-black uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Stats</span>
          </button>

          <button
            type="button"
            onClick={onOpenQuests}
            className="flex items-center gap-2 bg-gradient-to-b from-blue-900 to-indigo-950 hover:from-blue-800 hover:to-indigo-900 text-cyan-200 border-2 border-cyan-500/80 px-3 py-1.5 rounded-lg shadow-2xl transition-all active:scale-95 text-xs sm:text-sm font-black uppercase tracking-wider"
          >
            <Swords className="w-4 h-4 text-cyan-300" />
            <span className="hidden sm:inline">Quests</span>
          </button>
        </div>

        {/* Center Floating Fantasy Banner (Level Select / World Name) */}
        <div className="flex flex-col items-center pointer-events-auto filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
          {/* Wooden / Gold Banner Ribbon */}
          <div className="relative bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 border-2 border-amber-300 text-amber-100 font-black px-4 sm:px-8 py-1 rounded-md shadow-2xl flex items-center gap-2 sm:gap-3">
            <span className="text-yellow-300 text-xs sm:text-sm animate-pulse">⭐</span>
            <h1 className="text-xs sm:text-base font-black tracking-widest uppercase font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              LEVEL SELECT
            </h1>
            <span className="text-yellow-300 text-xs sm:text-sm animate-pulse">⭐</span>
          </div>

          {/* Sub-Banner: World Title */}
          <div className="-mt-1 bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/60 text-amber-200 text-[10px] sm:text-xs font-bold px-3 sm:px-6 py-0.5 rounded-b-md shadow-md flex items-center gap-1.5">
            <span>{selectedWorld.badge}</span>
            <span className="text-amber-400/80">•</span>
            <span className="text-white font-extrabold">{selectedWorld.name}</span>
          </div>
        </div>

        {/* Top-Right Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Ambient Sound Toggle Button */}
          <button
            type="button"
            onClick={() => setIsSoundOn(!isSoundOn)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 shadow-2xl transition-all active:scale-95 text-xs font-black ${
              isSoundOn
                ? 'bg-gradient-to-b from-emerald-800 to-emerald-950 text-emerald-300 border-emerald-500'
                : 'bg-gradient-to-b from-slate-800 to-slate-950 text-slate-400 border-slate-700'
            }`}
            title={isSoundOn ? 'Mute Forest Sound' : 'Play Forest Sound'}
          >
            {isSoundOn ? (
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* World Selector Button */}
          <button
            type="button"
            onClick={() => setShowWorldSelector(!showWorldSelector)}
            className="flex items-center gap-1.5 bg-gradient-to-b from-amber-900 to-slate-950 hover:from-amber-800 hover:to-slate-900 text-amber-300 border-2 border-amber-500 px-3 py-1.5 rounded-lg shadow-2xl transition-all active:scale-95 text-xs sm:text-sm font-black"
            title="Switch League World"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{selectedWorld.badge}</span>
          </button>
        </div>
      </header>

      {/* ===================================================================
          2. WORLD SELECTOR POPUP DROPDOWN (Floating)
      =================================================================== */}
      {showWorldSelector && (
        <div className="absolute top-16 right-4 z-40 bg-slate-950/95 border-2 border-amber-500/80 rounded-xl p-3 shadow-2xl backdrop-blur-md w-72 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-500/30 text-amber-300 text-xs font-black uppercase">
            <span>🗺️ Select League World</span>
            <button
              onClick={() => setShowWorldSelector(false)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-1.5">
            {ALL_MAP_WORLDS.map((w) => {
              const isCurrentActive = selectedWorld.id === w.id;
              const hasHero = currentLevelDef.worldId === w.id;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    setSelectedWorld(w);
                    setShowWorldSelector(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                    isCurrentActive
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400'
                      : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{w.badge}</span>
                    <span className="text-white font-extrabold">{w.name}</span>
                  </div>
                  {hasHero && (
                    <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded-full font-black">
                      🧑 Hero
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================
          3. FULL-SCREEN INTERACTIVE GAME WORLD VIEWPORT (100vw × 100vh)
      =================================================================== */}
      <main className="w-full h-full absolute inset-0 overflow-hidden">
        <div className="w-full h-full absolute inset-0">
          <WorldCanvas world={selectedWorld}>
            {/* Level Nodes Markers along path */}
            {selectedWorld.levels.map((level) => {
              const state = getMapNodeState(level.levelNumber, mapProgression);
              return (
                <WorldNodeMarker
                  key={level.id}
                  level={level}
                  state={state}
                  onClick={(node) => setSelectedLevelNode(node)}
                />
              );
            })}

            {/* Walking Hero Character Sprite (Rendered when in this world) */}
            {isHeroInThisWorld && (
              <div
                style={{
                  left: `${(currentPosition.x / 1000) * 100}%`,
                  top: `${(currentPosition.y / 1000) * 100}%`,
                  transform: 'translate(-50%, -75%)',
                }}
                className="absolute pointer-events-none z-20 transition-transform duration-75"
              >
                <WalkingCharacterSprite
                  profile={player.character}
                  league={player.league}
                  facing={facing}
                  isWalking={isWalking}
                  walkCycle={walkCycle}
                  size={52}
                />
              </div>
            )}
          </WorldCanvas>
        </div>
      </main>

      {/* ===================================================================
          4. MINIMAL FLOATING BOTTOM CONTROLS & LEVEL ACTION
      =================================================================== */}
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-3 bg-slate-950/90 border-2 border-amber-500/80 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md">
        {/* Current Hero Location Badge */}
        <div className="flex items-center gap-2 pr-3 border-r border-amber-500/40 text-xs">
          <MapPin className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Current Location
            </span>
            <span className="text-amber-200 font-extrabold whitespace-nowrap">
              Level {mapProgression.currentMapLevel}: {currentLevelDef.name}
            </span>
          </div>
        </div>

        {/* Dev Step Backward Button */}
        {mapProgression.currentMapLevel > 1 && (
          <button
            type="button"
            onClick={handleStepBackward}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300/80 hover:text-amber-200 border border-amber-600/50 rounded-lg text-xs font-bold transition-all active:scale-95 shadow"
            title="Developer: Step Backward 1 Level (Key: [ or B)"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Step Back</span>
            <span className="text-[10px] bg-slate-950 px-1 py-0.2 rounded text-slate-400 font-mono">[</span>
          </button>
        )}

        {/* Walk / Advance to Next Level Button */}
        {canAdvance && (
          <button
            type="button"
            disabled={isWalking}
            onClick={handleAdvanceToNext}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-lg ${
              isWalking
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-wait'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-2 border-amber-300 cursor-pointer animate-pulse'
            }`}
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{isWalking ? 'Walking Along Path...' : `Walk to Level ${nextLevelNumber}`}</span>
            <ChevronRight className="w-4 h-4 text-slate-950" />
            <span className="text-[10px] bg-amber-700/80 px-1 py-0.2 rounded text-amber-100 font-mono hidden sm:inline">]</span>
          </button>
        )}
      </footer>

      {/* Floating Developer Action Toast */}
      {devToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-950/95 border-2 border-amber-400 text-amber-200 px-4 py-1.5 rounded-full shadow-2xl text-xs font-black flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span>{devToast}</span>
        </div>
      )}

      {/* ===================================================================
          5. MINIMAL FLOATING LEVEL DETAILS MODAL (When clicking a node)
      =================================================================== */}
      {selectedLevelNode && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedLevelNode(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border-2 border-amber-500 rounded-2xl p-5 max-w-sm w-full shadow-2xl text-center relative animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Level Icon */}
            <div className="w-16 h-16 mx-auto mb-3 bg-amber-500/20 border-2 border-amber-400 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              {selectedLevelNode.icon}
            </div>

            {/* Level Title & World */}
            <h2 className="text-lg font-black text-amber-200">
              {selectedLevelNode.name}
            </h2>
            <div className="text-xs text-amber-400 font-bold mb-2">
              Level {selectedLevelNode.levelNumber} • {selectedWorld.name}
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              {selectedLevelNode.description}
            </p>

            {/* Node State & Actions */}
            {(() => {
              const nodeState = getMapNodeState(selectedLevelNode.levelNumber, mapProgression);
              if (nodeState === 'current') {
                return (
                  <div className="text-xs font-black text-amber-300 bg-amber-500/20 py-2 rounded-lg border border-amber-500/40">
                    📍 You are currently stationed here!
                  </div>
                );
              }
              if (nodeState === 'completed') {
                return (
                  <div className="text-xs font-black text-emerald-300 bg-emerald-500/20 py-2 rounded-lg border border-emerald-500/40">
                    ⭐ Level Completed & Explored!
                  </div>
                );
              }
              if (nodeState === 'available') {
                return (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLevelNode(null);
                      handleAdvanceToNext();
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg border border-amber-300 active:scale-95"
                  >
                    🚶 Walk to This Level
                  </button>
                );
              }
              return (
                <div className="text-xs font-bold text-slate-400 bg-slate-950 py-2 rounded-lg border border-slate-800">
                  🔒 Locked Area (Complete previous levels to unlock)
                </div>
              );
            })()}

            <button
              type="button"
              onClick={() => setSelectedLevelNode(null)}
              className="mt-3 text-xs text-slate-400 hover:text-white font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
