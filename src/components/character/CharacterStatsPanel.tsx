import React, { useState, useEffect } from 'react';
import type { PlayerState } from '../../types/progression';
import { LEAGUE_CONFIGS } from '../../types/progression';
import { calculateProgressMetrics } from '../../utils/progression';
import { CharacterPreview } from './CharacterPreview';
import { RpgCard } from '../ui/RpgCard';
import { RpgButton } from '../ui/RpgButton';
import {
  Heart,
  Zap,
  Flame,
  Coins,
  Shield,
  Brain,
  Swords,
  Target,
  Edit3,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface CharacterStatsPanelProps {
  initialPlayer: PlayerState;
  onEditCharacter: () => void;
  onLogOut: () => void;
}

export const CharacterStatsPanel: React.FC<CharacterStatsPanelProps> = ({
  initialPlayer,
  onEditCharacter,
  onLogOut,
}) => {
  const [player, setPlayer] = useState<PlayerState>(initialPlayer);

  // Keep state synchronized if initialPlayer prop changes (e.g., after editing character)
  useEffect(() => {
    setPlayer(initialPlayer);
  }, [initialPlayer]);

  const metrics = calculateProgressMetrics(
    player.progression.level,
    player.progression.xp
  );

  const leagueConfig = LEAGUE_CONFIGS[player.league.name] || LEAGUE_CONFIGS.Bronze;

  return (
    <div className="w-full max-w-2xl mx-auto my-auto relative z-10 px-3 sm:px-4 py-4 animate-fadeIn">
      {/* Hero Header Banner */}
      <div className="text-center mb-4 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181528] border-2 border-[#39325a] text-slate-300 text-[10px] font-pixel uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
          <Sparkles size={12} className="text-amber-400 shrink-0" />
          <span>Character Profile & Stats</span>
        </div>

        {/* Character Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider font-pixel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_3px_4px_rgba(0,0,0,0.85)]">
          {player.character.name}
        </h1>
        <p className="text-xs text-slate-300 font-medium">
          Level {player.progression.level}
        </p>
      </div>

      {/* Main Stats Card */}
      <RpgCard theme="player" className="shadow-2xl">
        <div className="space-y-4">
          {/* Top Hero Showcase & Vital Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#110f1e] p-3.5 border-2 border-[#2b2545]">
            {/* 2D Pixel Character Sprite - Exact Created Hero */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-2 bg-[#181528] border border-[#312952]">
              <CharacterPreview profile={player.character} size="md" />
              <div className="mt-2 text-center">
                <span className="text-[10px] font-pixel text-amber-400 uppercase tracking-wide">
                  {player.character.gender === 'male' ? '♂️ Hero' : '♀️ Heroine'}
                </span>
              </div>
            </div>

            {/* Vital Progression Bars (Level, Health, Prominent XP Bar) */}
            <div className="md:col-span-7 space-y-3">
              {/* Level Badge (Without 'Adventurer' title) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-pixel text-xs font-bold shadow-[2px_2px_0_0_#000]">
                    LVL {player.progression.level}
                  </span>
                </div>
              </div>

              {/* 6. HEALTH BAR: "100 / 100 HP" */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-pixel">
                  <span className="text-rose-400 flex items-center gap-1">
                    <Heart size={13} className="fill-rose-500 text-rose-500" />
                    <span>Health</span>
                  </span>
                  <span className="text-slate-200 font-bold">
                    {player.stats.health} / 100 HP
                  </span>
                </div>
                <div className="w-full h-4 bg-black/70 border-2 border-[#3a3258] p-0.5 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-emerald-500 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                    style={{ width: `${Math.max(0, Math.min(100, player.stats.health))}%` }}
                  />
                </div>
              </div>

              {/* 1. LARGE PROMINENT XP BAR: "0 / 100 XP" */}
              <div className="space-y-1.5 p-2.5 bg-[#171427] border-2 border-indigo-900/60 shadow-[2px_2px_0_0_#000]">
                <div className="flex items-center justify-between text-xs font-pixel">
                  <span className="text-indigo-300 flex items-center gap-1.5 font-bold">
                    <Zap size={14} className="fill-indigo-400 text-indigo-400" />
                    <span>XP PROGRESS</span>
                  </span>
                  <span className="text-cyan-300 font-bold tracking-wider">
                    {metrics.currentXp} / {metrics.requiredXp} XP
                  </span>
                </div>
                {/* Large XP Progress Bar */}
                <div className="w-full h-5 bg-black/80 border-2 border-[#43376a] p-0.5 relative shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-400 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                    style={{ width: `${metrics.progressPercent}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-pixel text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] select-none">
                    {metrics.progressPercent}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. LEAGUE, GOLD & STREAK SECTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* League Section - Simple "BRONZE" */}
            <div className="p-2.5 bg-[#171426] border-2 border-[#312a4f] flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center shrink-0">
                <span className="text-lg">{leagueConfig.icon}</span>
              </div>
              <div>
                <span className="block text-[9px] font-pixel text-slate-400 uppercase">League</span>
                <span className="text-xs font-bold text-amber-300 font-pixel tracking-wider">
                  {player.league.name.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Gold Section */}
            <div className="p-2.5 bg-[#171426] border-2 border-[#312a4f] flex items-center gap-3">
              <div className="w-9 h-9 bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center shrink-0">
                <Coins size={18} className="text-yellow-400" />
              </div>
              <div>
                <span className="block text-[9px] font-pixel text-slate-400 uppercase">Gold</span>
                <span className="text-xs font-bold text-yellow-300 font-pixel">
                  {player.economy.gold} G
                </span>
              </div>
            </div>

            {/* Streak Section */}
            <div className="p-2.5 bg-[#171426] border-2 border-[#312a4f] flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center shrink-0">
                <Flame size={18} className="text-orange-400" />
              </div>
              <div>
                <span className="block text-[9px] font-pixel text-slate-400 uppercase">Streak</span>
                <span className="text-xs font-bold text-orange-300 font-pixel">
                  {player.consistency.streak} {player.consistency.streak === 1 ? 'Day' : 'Days'}
                </span>
              </div>
            </div>
          </div>

          {/* Core RPG Attributes Grid (4 Separate Independent Stats) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-pixel text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Shield size={13} className="text-emerald-400" />
                <span>Core RPG Attributes</span>
              </h2>
              <span className="text-[10px] text-slate-400">Independent Game Stats</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* 2. INTELLIGENCE (Renamed from Intellect) */}
              <div className="p-2.5 bg-[#12101e] border-2 border-[#2b2545] hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center">
                    <Brain size={13} className="text-cyan-400" />
                  </div>
                  <span className="text-[9px] font-pixel text-slate-300 uppercase tracking-wider truncate">
                    INTELLIGENCE
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold font-pixel text-cyan-300">
                    {player.stats.intelligence}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>

              {/* Strength */}
              <div className="p-2.5 bg-[#12101e] border-2 border-[#2b2545] hover:border-red-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-red-950/60 border border-red-500/40 flex items-center justify-center">
                    <Swords size={13} className="text-red-400" />
                  </div>
                  <span className="text-[9px] font-pixel text-slate-300 uppercase tracking-wider truncate">
                    STRENGTH
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold font-pixel text-red-300">
                    {player.stats.strength}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>

              {/* Stamina */}
              <div className="p-2.5 bg-[#12101e] border-2 border-[#2b2545] hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center">
                    <Zap size={13} className="text-emerald-400" />
                  </div>
                  <span className="text-[9px] font-pixel text-slate-300 uppercase tracking-wider truncate">
                    STAMINA
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold font-pixel text-emerald-300">
                    {player.stats.stamina}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>

              {/* Skills */}
              <div className="p-2.5 bg-[#12101e] border-2 border-[#2b2545] hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-purple-950/60 border border-purple-500/40 flex items-center justify-center">
                    <Target size={13} className="text-purple-400" />
                  </div>
                  <span className="text-[9px] font-pixel text-slate-300 uppercase tracking-wider truncate">
                    SKILLS
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold font-pixel text-purple-300">
                    {player.stats.skills}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Navigation Controls */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <RpgButton
              type="button"
              variant="secondary"
              size="md"
              onClick={onEditCharacter}
              icon={<Edit3 size={14} />}
            >
              Edit Character
            </RpgButton>

            <RpgButton
              type="button"
              variant="player"
              size="md"
              onClick={onLogOut}
              icon={<LogOut size={14} />}
            >
              Log Out
            </RpgButton>
          </div>
        </div>
      </RpgCard>
    </div>
  );
};
