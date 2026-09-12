import React, { useState } from 'react';
import type { PlayerState } from '../../types/progression';
import { LEAGUE_CONFIGS } from '../../types/progression';
import {
  calculateProgressMetrics,
  addPlayerXp,
  modifyPlayerHealth,
  modifyPlayerStat,
  modifyPlayerGold,
  incrementPlayerStreak,
} from '../../utils/progression';
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
  ChevronDown,
  ChevronUp,
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
  const [showSandbox, setShowSandbox] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const metrics = calculateProgressMetrics(
    player.progression.level,
    player.progression.xp
  );

  const leagueConfig = LEAGUE_CONFIGS[player.league.name] || LEAGUE_CONFIGS.Bronze;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2500);
  };

  // Test sandbox handlers
  const handleAddXp = (amount: number) => {
    const { updatedPlayer, leveledUp, levelsGained } = addPlayerXp(player, amount);
    setPlayer(updatedPlayer);
    if (leveledUp) {
      showToast(`🎉 LEVEL UP! Gained ${levelsGained} level(s)! Now Level ${updatedPlayer.progression.level}!`);
    } else {
      showToast(`✨ +${amount} XP Earned! (${updatedPlayer.progression.xp} / ${metrics.requiredXp})`);
    }
  };

  const handleHealthDelta = (delta: number) => {
    const updated = modifyPlayerHealth(player, delta);
    setPlayer(updated);
    showToast(delta > 0 ? `💚 Restored +${delta} Health` : `💔 Took ${delta} Damage`);
  };

  const handleGoldDelta = (delta: number) => {
    const updated = modifyPlayerGold(player, delta);
    setPlayer(updated);
    showToast(`🪙 +${delta} Gold added to purse!`);
  };

  const handleStreakIncrement = () => {
    const updated = incrementPlayerStreak(player);
    setPlayer(updated);
    showToast(`🔥 Streak increased to ${updated.consistency.streak} day(s)!`);
  };

  const handleBoostAllStats = () => {
    let updated = modifyPlayerStat(player, 'intelligence', 1);
    updated = modifyPlayerStat(updated, 'strength', 1);
    updated = modifyPlayerStat(updated, 'stamina', 1);
    updated = modifyPlayerStat(updated, 'skills', 1);
    setPlayer(updated);
    showToast('🌟 +1 to Intelligence, Strength, Stamina & Skills!');
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-auto relative z-10 px-3 sm:px-4 py-4 animate-fadeIn">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900 border-2 border-amber-400 text-amber-200 text-xs font-pixel shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-bounce text-center">
          {notification}
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="text-center mb-4 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181528] border-2 border-[#39325a] text-slate-300 text-[10px] font-pixel uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
          <Sparkles size={12} className="text-amber-400 shrink-0" />
          <span>Character Profile & Stats</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider font-pixel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_3px_4px_rgba(0,0,0,0.85)]">
          {player.character.name}
        </h1>
        <p className="text-xs text-slate-300 font-medium">
          Level {player.progression.level} Adventurer • {leagueConfig.name} League
        </p>
      </div>

      {/* Main Stats Card */}
      <RpgCard theme="player" className="shadow-2xl">
        <div className="space-y-4">
          {/* Top Hero Showcase & Vital Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#110f1e] p-3.5 border-2 border-[#2b2545]">
            {/* 2D Pixel Character Sprite */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-2 bg-[#181528] border border-[#312952]">
              <CharacterPreview profile={player.character} size="md" />
              <div className="mt-2 text-center">
                <span className="text-[10px] font-pixel text-amber-400 uppercase tracking-wide">
                  {player.character.gender === 'male' ? '♂️ Hero' : '♀️ Heroine'}
                </span>
              </div>
            </div>

            {/* Vital Progression Bars */}
            <div className="md:col-span-7 space-y-3">
              {/* Level & League Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-400 text-amber-300 font-pixel text-xs font-bold shadow-[1px_1px_0_0_#000]">
                    LVL {player.progression.level}
                  </span>
                  <span className="text-[11px] text-slate-300 font-medium font-pixel">
                    Adventurer
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1 px-2 py-0.5 border text-[10px] font-pixel ${leagueConfig.badgeBg} ${leagueConfig.badgeBorder} ${leagueConfig.badgeText}`}
                >
                  <span>{leagueConfig.icon}</span>
                  <span>{leagueConfig.name} League</span>
                </div>
              </div>

              {/* Health Bar (0 - 100) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-pixel">
                  <span className="text-rose-400 flex items-center gap-1">
                    <Heart size={12} className="fill-rose-500 text-rose-500" />
                    <span>Health</span>
                  </span>
                  <span className="text-slate-200">
                    {player.stats.health} / 100 HP
                  </span>
                </div>
                <div className="w-full h-3.5 bg-black/60 border border-[#3a3258] p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-emerald-500 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                    style={{ width: `${Math.max(0, Math.min(100, player.stats.health))}%` }}
                  />
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-pixel">
                  <span className="text-indigo-300 flex items-center gap-1">
                    <Zap size={12} className="fill-indigo-400 text-indigo-400" />
                    <span>XP Progress</span>
                  </span>
                  <span className="text-slate-200">
                    {metrics.currentXp} / {metrics.requiredXp} XP ({metrics.progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-3.5 bg-black/60 border border-[#3a3258] p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                    style={{ width: `${metrics.progressPercent}%` }}
                  />
                </div>
                <div className="text-[9px] text-slate-400 text-right">
                  {metrics.requiredXp - metrics.currentXp} XP to Level {player.progression.level + 1}
                </div>
              </div>

              {/* Economy & Consistency Mini Row */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#292241]">
                {/* Gold */}
                <div className="p-2 bg-[#171426] border border-[#312a4f] flex items-center gap-2">
                  <div className="w-7 h-7 bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                    <Coins size={15} className="text-amber-400" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-pixel text-slate-400 uppercase">Gold</span>
                    <span className="text-xs font-bold text-amber-300 font-pixel">
                      {player.economy.gold} G
                    </span>
                  </div>
                </div>

                {/* Streak */}
                <div className="p-2 bg-[#171426] border border-[#312a4f] flex items-center gap-2">
                  <div className="w-7 h-7 bg-orange-500/20 border border-orange-400/50 flex items-center justify-center shrink-0">
                    <Flame size={15} className="text-orange-400" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-pixel text-slate-400 uppercase">Streak</span>
                    <span className="text-xs font-bold text-orange-300 font-pixel">
                      {player.consistency.streak} {player.consistency.streak === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core RPG Attributes Grid (4 Separate Stats) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-pixel text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Shield size={13} className="text-emerald-400" />
                <span>Core RPG Attributes</span>
              </h2>
              <span className="text-[10px] text-slate-400">Independent Game Stats</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Intelligence */}
              <div className="p-2.5 bg-[#12101e] border-2 border-[#2b2545] hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center">
                    <Brain size={13} className="text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-pixel text-slate-300 uppercase">Intellect</span>
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
                  <span className="text-[10px] font-pixel text-slate-300 uppercase">Strength</span>
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
                  <span className="text-[10px] font-pixel text-slate-300 uppercase">Stamina</span>
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
                  <span className="text-[10px] font-pixel text-slate-300 uppercase">Skills</span>
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

          {/* Collapsible Testing & Progression Simulator Sandbox */}
          <div className="border border-[#2f274a] bg-[#100e1c]">
            <button
              type="button"
              onClick={() => setShowSandbox(!showSandbox)}
              className="w-full px-3 py-2 text-left flex items-center justify-between text-xs font-pixel text-amber-300/90 hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <span>🧪</span>
                <span>Test Progression Sandbox (Simulate Rewards & Math)</span>
              </span>
              {showSandbox ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showSandbox && (
              <div className="p-3 border-t border-[#261f3d] bg-[#0c0a17] space-y-2 text-xs">
                <p className="text-[11px] text-slate-400">
                  Verify the dynamic XP calculation, health clamp, and economy updates in real-time:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddXp(25)}
                    className="px-2.5 py-1.5 bg-indigo-950/80 border border-indigo-500 text-indigo-200 text-[10px] font-pixel hover:bg-indigo-900 transition-colors"
                  >
                    +25 XP
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddXp(100)}
                    className="px-2.5 py-1.5 bg-purple-950/80 border border-purple-400 text-purple-200 text-[10px] font-pixel hover:bg-purple-900 transition-colors"
                  >
                    +100 XP (Level Up Test)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGoldDelta(15)}
                    className="px-2.5 py-1.5 bg-amber-950/80 border border-amber-500 text-amber-200 text-[10px] font-pixel hover:bg-amber-900 transition-colors"
                  >
                    +15 Gold
                  </button>
                  <button
                    type="button"
                    onClick={handleStreakIncrement}
                    className="px-2.5 py-1.5 bg-orange-950/80 border border-orange-500 text-orange-200 text-[10px] font-pixel hover:bg-orange-900 transition-colors"
                  >
                    +1 Day Streak
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHealthDelta(-10)}
                    className="px-2.5 py-1.5 bg-rose-950/80 border border-rose-500 text-rose-200 text-[10px] font-pixel hover:bg-rose-900 transition-colors"
                  >
                    -10 HP
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHealthDelta(10)}
                    className="px-2.5 py-1.5 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-[10px] font-pixel hover:bg-emerald-900 transition-colors"
                  >
                    +10 HP
                  </button>
                  <button
                    type="button"
                    onClick={handleBoostAllStats}
                    className="px-2.5 py-1.5 bg-cyan-950/80 border border-cyan-500 text-cyan-200 text-[10px] font-pixel hover:bg-cyan-900 transition-colors"
                  >
                    +1 All Stats
                  </button>
                </div>
              </div>
            )}
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
