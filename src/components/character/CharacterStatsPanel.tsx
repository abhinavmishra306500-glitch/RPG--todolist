import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { PlayerState, PlayerLeague } from '../../types/progression';
import {
  calculateProgressMetrics,
  addPlayerXp,
  modifyPlayerHealth,
  modifyPlayerStat,
} from '../../utils/progression';
import { getNextStreakMilestone } from '../../utils/streakDecay';
import {
  getLeagueVisualConfig,
  getLeagueIndex,
  getLeagueFromIndex,
  promoteLeague,
  demoteLeague,
  normalizeLeague,
  formatLeagueRankWithEmoji,
} from '../../utils/league';
import { getShieldMetadata } from './LeagueShield';
import { LeagueChangeModal } from './LeagueChangeModal';
import {
  playStatIncreaseSound,
  playLevelUpSound,
  playLeaguePromotedSound,
  playLeagueDemotedSound,
} from '../../utils/soundEffects';
import { AnimatedStatNumber } from '../common/AnimatedStatNumber';
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
  Wrench,
  Edit3,
  LogOut,
  Sparkles,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Terminal,
  RefreshCw,
  Skull,
} from 'lucide-react';

interface CharacterStatsPanelProps {
  initialPlayer: PlayerState;
  onEditCharacter: () => void;
  onContinueToQuests?: () => void;
  onLogOut: () => void;
  onUpdatePlayer?: (player: PlayerState) => void;
  isDevMode?: boolean;
}

export const CharacterStatsPanel: React.FC<CharacterStatsPanelProps> = ({
  initialPlayer,
  onEditCharacter,
  onContinueToQuests,
  onLogOut,
  onUpdatePlayer,
  isDevMode = true,
}) => {
  const [player, setPlayer] = useState<PlayerState>(() => ({
    ...initialPlayer,
    league: normalizeLeague(initialPlayer.league),
  }));
  const [levelUpGlow, setLevelUpGlow] = useState(false);
  const [levelDecayToast, setLevelDecayToast] = useState<{ oldLevel: number; newLevel: number } | null>(null);
  const [leagueToast, setLeagueToast] = useState<{
    type: 'promoted' | 'demoted';
    rankText: string;
    shieldName: string;
  } | null>(null);
  const [leagueModal, setLeagueModal] = useState<{
    isOpen: boolean;
    type: 'promoted' | 'demoted';
    oldLeague: PlayerLeague;
    newLeague: PlayerLeague;
  } | null>(null);
  const [activePulseStat, setActivePulseStat] = useState<{
    strength?: boolean;
    stamina?: boolean;
    health?: boolean;
    intelligence?: boolean;
    skillXp?: boolean;
  }>({});
  const [levelUpToast, setLevelUpToast] = useState(false);
  const [leagueAuraActive, setLeagueAuraActive] = useState(false);
  const [devDockExpanded, setDevDockExpanded] = useState(isDevMode);

  // Reference to track previous values to detect actual increases
  const prevStatsRef = useRef({
    level: initialPlayer.progression.level,
    xp: initialPlayer.progression.xp,
    health: initialPlayer.stats.health,
    strength: initialPlayer.stats.strength,
    stamina: initialPlayer.stats.stamina,
    intelligence: initialPlayer.stats.intelligence,
    skills: initialPlayer.stats.skills,
    league: normalizeLeague(initialPlayer.league),
    leagueIndex: getLeagueIndex(initialPlayer.league),
  });
  const isFirstRender = useRef(true);

  // Keep state synchronized if initialPlayer prop changes from outside
  useEffect(() => {
    setPlayer((current) => {
      const normalizedProp = {
        ...initialPlayer,
        league: normalizeLeague(initialPlayer.league),
      };
      // Only replace if deeply different to avoid wiping dev state
      if (JSON.stringify(current) !== JSON.stringify(normalizedProp)) {
        return normalizedProp;
      }
      return current;
    });
  }, [initialPlayer]);

  // Update state helper that notifies parent immediately
  const updatePlayerState = useCallback((updater: (prev: PlayerState) => PlayerState) => {
    setPlayer((prev) => {
      const updated = updater(prev);
      if (onUpdatePlayer) {
        onUpdatePlayer(updated);
      }
      return updated;
    });
  }, [onUpdatePlayer]);

  // Detect actual increases and trigger feedback animations & sounds
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const prev = prevStatsRef.current;
    const currentLevel = player.progression.level;
    const currentXp = player.progression.xp;
    const currentHealth = player.stats.health;
    const currentStrength = player.stats.strength;
    const currentStamina = player.stats.stamina;
    const currentIntelligence = player.stats.intelligence;
    const currentSkills = player.stats.skills;
    const currentLeagueIndex = getLeagueIndex(player.league);

    const levelIncreased = currentLevel > prev.level;
    const levelDecreased = currentLevel < prev.level;
    const xpIncreased = currentXp > prev.xp || levelIncreased;
    const healthIncreased = currentHealth > prev.health;
    const strengthIncreased = currentStrength > prev.strength;
    const staminaIncreased = currentStamina > prev.stamina;
    const intelligenceIncreased = currentIntelligence > prev.intelligence;
    const skillXpIncreased = currentSkills > prev.skills;

    // League promotion / demotion non-blocking feedback
    if (currentLeagueIndex > prev.leagueIndex) {
      playLeaguePromotedSound();
      // Trigger 2-3 second radiant power aura burst around character sprite
      setLeagueAuraActive(true);
      setTimeout(() => setLeagueAuraActive(false), 2800);

      const meta = getShieldMetadata(player.league);
      setLeagueToast({
        type: 'promoted',
        rankText: formatLeagueRankWithEmoji(player.league),
        shieldName: meta.name,
      });
      setTimeout(() => setLeagueToast(null), 3000);
    } else if (currentLeagueIndex < prev.leagueIndex) {
      playLeagueDemotedSound();
      const meta = getShieldMetadata(player.league);
      setLeagueToast({
        type: 'demoted',
        rankText: formatLeagueRankWithEmoji(player.league),
        shieldName: meta.name,
      });
      setTimeout(() => setLeagueToast(null), 3000);
    }

    // Level up feedback
    if (levelIncreased) {
      playLevelUpSound();
      setLevelUpGlow(true);
      setLevelUpToast(true);
      setTimeout(() => setLevelUpGlow(false), 1500);
      setTimeout(() => setLevelUpToast(false), 2400);
    } else if (levelDecreased) {
      // Level decay feedback
      setLevelDecayToast({ oldLevel: prev.level, newLevel: currentLevel });
      setTimeout(() => setLevelDecayToast(null), 3000);
    } else if (
      xpIncreased ||
      healthIncreased ||
      strengthIncreased ||
      staminaIncreased ||
      intelligenceIncreased ||
      skillXpIncreased
    ) {
      // Short, satisfying RPG-style stat increased sound
      playStatIncreaseSound();
    }

    // Stat card visual highlight pulse
    if (strengthIncreased) {
      setActivePulseStat((p) => ({ ...p, strength: true }));
      setTimeout(() => setActivePulseStat((p) => ({ ...p, strength: false })), 1200);
    }
    if (staminaIncreased) {
      setActivePulseStat((p) => ({ ...p, stamina: true }));
      setTimeout(() => setActivePulseStat((p) => ({ ...p, stamina: false })), 1200);
    }
    if (healthIncreased) {
      setActivePulseStat((p) => ({ ...p, health: true }));
      setTimeout(() => setActivePulseStat((p) => ({ ...p, health: false })), 1200);
    }
    if (intelligenceIncreased) {
      setActivePulseStat((p) => ({ ...p, intelligence: true }));
      setTimeout(() => setActivePulseStat((p) => ({ ...p, intelligence: false })), 1200);
    }
    if (skillXpIncreased) {
      setActivePulseStat((p) => ({ ...p, skillXp: true }));
      setTimeout(() => setActivePulseStat((p) => ({ ...p, skillXp: false })), 1200);
    }

    // Update previous values ref
    prevStatsRef.current = {
      level: currentLevel,
      xp: currentXp,
      health: currentHealth,
      strength: currentStrength,
      stamina: currentStamina,
      intelligence: currentIntelligence,
      skills: currentSkills,
      league: player.league,
      leagueIndex: currentLeagueIndex,
    };
  }, [
    player.progression.level,
    player.progression.xp,
    player.stats.health,
    player.stats.strength,
    player.stats.stamina,
    player.stats.intelligence,
    player.stats.skills,
    player.league,
  ]);

  // Dev Action Handlers
  const handlePromoteLeague = useCallback(() => {
    updatePlayerState((prev) => {
      const result = promoteLeague(prev);
      if (result.promoted) {
        setLeagueModal({
          isOpen: true,
          type: 'promoted',
          oldLeague: result.oldLeague,
          newLeague: result.newLeague,
        });
        return result.updatedPlayer;
      }
      return prev;
    });
  }, [updatePlayerState]);

  const handleDemoteLeague = useCallback(() => {
    updatePlayerState((prev) => {
      const result = demoteLeague(prev);
      if (result.demoted) {
        setLeagueModal({
          isOpen: true,
          type: 'demoted',
          oldLeague: result.oldLeague,
          newLeague: result.newLeague,
        });
        return result.updatedPlayer;
      }
      return prev;
    });
  }, [updatePlayerState]);

  const handleDamageHp = useCallback(() => {
    updatePlayerState((prev) => {
      const currentHp = prev.stats.health;
      const targetHp = Math.max(0, currentHp - 20);
      let newLevel = prev.progression.level;
      let levelDecayProcessed = prev.consistency.levelDecayProcessed || false;

      if (currentHp > 0 && targetHp === 0) {
        newLevel = Math.max(1, newLevel - 1);
        levelDecayProcessed = true;
      } else if (currentHp === 0 && targetHp === 0) {
        if (!levelDecayProcessed) {
          newLevel = Math.max(1, newLevel - 1);
          levelDecayProcessed = true;
        }
      }

      return {
        ...prev,
        progression: {
          ...prev.progression,
          level: newLevel,
        },
        stats: {
          ...prev.stats,
          health: targetHp,
        },
        consistency: {
          ...prev.consistency,
          levelDecayProcessed: targetHp === 0 ? levelDecayProcessed : false,
        },
      };
    });
  }, [updatePlayerState]);

  const handleDropToZeroHp = useCallback(() => {
    updatePlayerState((prev) => {
      const currentHp = prev.stats.health;
      let newLevel = prev.progression.level;
      let levelDecayProcessed = prev.consistency.levelDecayProcessed || false;

      if (currentHp > 0) {
        newLevel = Math.max(1, newLevel - 1);
        levelDecayProcessed = true;
      } else if (!levelDecayProcessed) {
        newLevel = Math.max(1, newLevel - 1);
        levelDecayProcessed = true;
      }

      return {
        ...prev,
        progression: {
          ...prev.progression,
          level: newLevel,
        },
        stats: {
          ...prev.stats,
          health: 0,
        },
        consistency: {
          ...prev.consistency,
          levelDecayProcessed: true,
        },
      };
    });
  }, [updatePlayerState]);

  const handleRestoreHp = useCallback(() => {
    updatePlayerState((prev) => modifyPlayerHealth(prev, 100));
  }, [updatePlayerState]);

  const handleAddXp = useCallback((amount: number = 25) => {
    updatePlayerState((prev) => addPlayerXp(prev, amount).updatedPlayer);
  }, [updatePlayerState]);

  const handleLevelUp = useCallback(() => {
    updatePlayerState((prev) => addPlayerXp(prev, 100).updatedPlayer);
  }, [updatePlayerState]);

  const handleOpenLeagueModal = useCallback(() => {
    const currentIdx = getLeagueIndex(player.league);
    const sampleOldLeague = currentIdx > 0 ? getLeagueFromIndex(currentIdx - 1) : getLeagueFromIndex(0);
    setLeagueModal({
      isOpen: true,
      type: 'promoted',
      oldLeague: sampleOldLeague,
      newLeague: player.league,
    });
  }, [player.league]);

  // Keyboard shortcut listener to easily test feedback effects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore typing in input fields
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'p' || key === ']') {
        // Dev Key 'P' or ']': Raise League Level / Promote (+1 Rank, clamped at Mythical)
        handlePromoteLeague();
      } else if (key === 'o' || key === '[') {
        // Dev Key 'O' or '[': Lower League Level / Demote (-1 Rank, clamped at Bronze III)
        handleDemoteLeague();
      } else if (key === 'd') {
        // Dev Key 'D': Lower Health by -20 HP
        handleDamageHp();
      } else if (key === '0' || key === 'k') {
        // Dev Key '0' or 'K': Drop Health to 0 HP
        handleDropToZeroHp();
      } else if (key === 'r') {
        // Dev Key 'R': Restore Full Health
        handleRestoreHp();
      } else if (key === 'x') {
        // Dev Key 'X': Test XP increase
        handleAddXp(25);
      } else if (key === 'l') {
        // Dev Key 'L': Test Level increase
        handleLevelUp();
      } else if (key === 's') {
        // Dev Key 'S': Test Strength increase
        updatePlayerState((prev) => modifyPlayerStat(prev, 'strength', 1));
      } else if (key === 't') {
        // Dev Key 'T': Test Stamina increase
        updatePlayerState((prev) => modifyPlayerStat(prev, 'stamina', 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handlePromoteLeague,
    handleDemoteLeague,
    handleDamageHp,
    handleDropToZeroHp,
    handleRestoreHp,
    handleAddXp,
    handleLevelUp,
    updatePlayerState,
  ]);

  const metrics = calculateProgressMetrics(
    player.progression.level,
    player.progression.xp
  );

  const isFullHealth = player.stats.health >= 100;
  const shieldMeta = getShieldMetadata(player.league);

  return (
    <div className="w-full max-w-2xl mx-auto my-auto relative z-10 px-3 sm:px-4 py-4 animate-fadeIn">
      {/* Level Up Celebration Toast */}
      {levelUpToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-amber-950/95 border-2 border-amber-400 text-amber-200 text-xs font-pixel shadow-[0_6px_20px_rgba(245,158,11,0.5)] animate-bounce text-center flex items-center gap-2">
          <Sparkles size={16} className="text-yellow-300 animate-spin" />
          <span className="font-bold tracking-wider">LEVEL UP! Reached Level {player.progression.level}!</span>
        </div>
      )}

      {/* Level Decay Warning Toast */}
      {levelDecayToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-red-950/95 border-2 border-red-500 text-red-200 text-xs font-pixel shadow-[0_6px_20px_rgba(239,68,68,0.6)] animate-bounce text-center flex items-center gap-2">
          <Heart size={16} className="text-red-400 animate-pulse" />
          <span className="font-bold tracking-wider">
            💀 LEVEL DECAY! HP hit 0 — Level dropped from {levelDecayToast.oldLevel} to {levelDecayToast.newLevel}!
          </span>
        </div>
      )}

      {/* League Rank Change Floating Toast */}
      {leagueToast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 border-2 text-xs font-pixel shadow-[0_6px_20px_rgba(0,0,0,0.8)] animate-bounce text-center flex items-center gap-2 ${
            leagueToast.type === 'promoted'
              ? 'bg-amber-950/95 border-amber-400 text-amber-200 shadow-amber-500/40'
              : 'bg-indigo-950/95 border-indigo-400 text-indigo-200 shadow-indigo-500/40'
          }`}
        >
          <Sparkles
            size={16}
            className={leagueToast.type === 'promoted' ? 'text-yellow-300 animate-spin' : 'text-indigo-400'}
          />
          <div className="flex flex-col text-left">
            <span className="font-bold tracking-wider uppercase">
              {leagueToast.type === 'promoted' ? '⭐ LEAGUE PROMOTED!' : '📉 LEAGUE DEMOTED'}
            </span>
            <span className="text-[10px] text-slate-300">
              Rank: {leagueToast.rankText} • Shield: {leagueToast.shieldName}
            </span>
          </div>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="text-center mb-4 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181528] border-2 border-[#39325a] text-slate-300 text-[10px] font-pixel uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
          <Sparkles size={12} className="text-amber-400 shrink-0" />
          <span>Character Profile & Stats</span>
        </div>

        {/* Character Name */}
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider font-pixel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_3px_4px_rgba(0,0,0,0.85)] truncate max-w-full px-2"
          title={player.character.name}
        >
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
            {/* 2D Pixel Character Sprite - Exact Created Hero with Equipped League Shield */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-2 bg-[#181528] border border-[#312952]">
              <CharacterPreview
                profile={player.character}
                league={player.league}
                isAuraActive={leagueAuraActive}
                size="md"
              />
              <div className="mt-2 text-center">
                <span className="text-[10px] font-pixel text-amber-400 uppercase tracking-wide">
                  {player.character.gender === 'male' ? '♂️ Hero' : '♀️ Heroine'}
                </span>
                <div className="text-[9px] font-mono text-cyan-300/90 mt-0.5 truncate max-w-[180px]">
                  🛡️ {shieldMeta.name}
                </div>
              </div>
            </div>

            {/* Vital Progression Bars (Level, Health, Prominent XP Bar) */}
            <div className="md:col-span-7 space-y-3">
              {/* Level Badge with Glowing Level-Up Feedback */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 border-2 font-pixel text-xs font-bold transition-all duration-500 shadow-[2px_2px_0_0_#000] ${
                      levelUpGlow
                        ? 'animate-level-up-glow bg-amber-400/40 text-yellow-200 border-yellow-300'
                        : 'bg-amber-500/20 border-amber-400 text-amber-300'
                    }`}
                  >
                    LVL {player.progression.level} {metrics.isMaxLevel ? '(MAX)' : ''}
                  </span>
                </div>
              </div>

              {/* HEALTH BAR: Gently pulses when at maximum 100/100 HP */}
              <div
                className={`space-y-1 transition-all duration-300 ${
                  activePulseStat.health ? 'p-1 bg-rose-950/40 border border-rose-500/50 rounded-none' : ''
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-pixel">
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <Heart
                      size={13}
                      className={`fill-rose-500 text-rose-500 transition-transform ${
                        isFullHealth ? 'animate-rpg-heartbeat' : ''
                      }`}
                    />
                    <span>Health</span>
                  </span>
                  <span className="text-slate-200 font-bold">
                    <AnimatedStatNumber value={player.stats.health} /> / 100 HP
                  </span>
                </div>
                <div className="w-full h-4 bg-black/70 border-2 border-[#3a3258] p-0.5 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-emerald-500 transition-all duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                    style={{ width: `${Math.max(0, Math.min(100, player.stats.health))}%` }}
                  />
                </div>
              </div>

              {/* LARGE PROMINENT XP BAR: Smooth animation on XP increase */}
              <div className="space-y-1.5 p-2.5 bg-[#171427] border-2 border-indigo-900/60 shadow-[2px_2px_0_0_#000]">
                <div className="flex items-center justify-between text-xs font-pixel">
                  <span className="text-indigo-300 flex items-center gap-1.5 font-bold">
                    <Zap size={14} className="fill-indigo-400 text-indigo-400" />
                    <span>XP PROGRESS</span>
                  </span>
                  <span className="text-cyan-300 font-bold tracking-wider">
                    {metrics.isMaxLevel ? (
                      <span className="text-amber-300 font-pixel">MAX LEVEL (100)</span>
                    ) : (
                      <>
                        <AnimatedStatNumber value={metrics.currentXp} /> / {metrics.requiredXp} XP
                      </>
                    )}
                  </span>
                </div>
                {/* Large Smooth XP Progress Bar */}
                <div className="w-full h-5 bg-black/80 border-2 border-[#43376a] p-0.5 relative shadow-inner overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-400 transition-all duration-700 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                    style={{ width: `${metrics.progressPercent}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-pixel text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] select-none">
                    {metrics.isMaxLevel ? 'MAX (100%)' : `${metrics.progressPercent}%`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEAGUE, GOLD & STREAK SECTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* League Section (Rank & Division) */}
            {(() => {
              const visual = getLeagueVisualConfig(player.league);
              return (
                <div
                  className={`p-2.5 bg-[#171426] border-2 flex items-center gap-3 transition-all duration-300 ${visual.badgeBorder}`}
                  style={{ boxShadow: `0 0 10px ${visual.glowColor}` }}
                >
                  <div
                    className={`w-9 h-9 border-2 flex items-center justify-center shrink-0 ${visual.badgeBg} ${visual.badgeBorder}`}
                  >
                    <span className="text-xl filter drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
                      {visual.emoji}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] font-pixel text-slate-400 uppercase">League</span>
                    <span className={`text-xs font-bold font-pixel tracking-wider truncate block ${visual.badgeText}`}>
                      {visual.label.toUpperCase()}
                    </span>
                    <span className="block text-[8px] text-slate-400 font-mono truncate">
                      {visual.description}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Gold Section */}
            <div className="p-2.5 bg-[#171426] border-2 border-[#312a4f] flex items-center gap-3">
              <div className="w-9 h-9 bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center shrink-0">
                <Coins size={18} className="text-yellow-400" />
              </div>
              <div>
                <span className="block text-[9px] font-pixel text-slate-400 uppercase">Gold</span>
                <span className="text-xs font-bold text-yellow-300 font-pixel">
                  <AnimatedStatNumber value={player.economy.gold} /> G
                </span>
              </div>
            </div>

            {/* Streak Section */}
            <div className="p-2.5 bg-[#171426] border-2 border-[#312a4f] flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center shrink-0">
                <Flame size={18} className="text-orange-400" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] font-pixel text-slate-400 uppercase">Streak</span>
                <span className="text-xs font-bold text-orange-300 font-pixel">
                  <AnimatedStatNumber value={player.consistency.streak} />{' '}
                  {player.consistency.streak === 1 ? 'Day' : 'Days'}
                </span>
                {(() => {
                  const nextM = getNextStreakMilestone(player.consistency.streak);
                  return (
                    <span className="block text-[8px] text-amber-400/90 font-mono truncate">
                      {nextM ? `Next: ${nextM} Days` : 'Max Milestone!'}
                    </span>
                  );
                })()}
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
              {/* Intelligence */}
              <div
                className={`p-2.5 bg-[#12101e] border-2 transition-all duration-300 ${
                  activePulseStat.intelligence
                    ? 'animate-stat-pulse border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                    : 'border-[#2b2545] hover:border-cyan-500/50'
                }`}
              >
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
                    <AnimatedStatNumber value={player.stats.intelligence} />
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>

              {/* Strength */}
              <div
                className={`p-2.5 bg-[#12101e] border-2 transition-all duration-300 ${
                  activePulseStat.strength
                    ? 'animate-stat-pulse border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                    : 'border-[#2b2545] hover:border-red-500/50'
                }`}
              >
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
                    <AnimatedStatNumber value={player.stats.strength} />
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>

              {/* Stamina */}
              <div
                className={`p-2.5 bg-[#12101e] border-2 transition-all duration-300 ${
                  activePulseStat.stamina
                    ? 'animate-stat-pulse border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                    : 'border-[#2b2545] hover:border-emerald-500/50'
                }`}
              >
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
                    <AnimatedStatNumber value={player.stats.stamina} />
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>

              {/* Skill XP */}
              <div
                className={`p-2.5 bg-[#12101e] border-2 transition-all duration-300 ${
                  activePulseStat.skillXp
                    ? 'animate-stat-pulse border-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.5)]'
                    : 'border-[#2b2545] hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-purple-950/60 border border-purple-500/40 flex items-center justify-center">
                    <Wrench size={13} className="text-purple-400" />
                  </div>
                  <span className="text-[9px] font-pixel text-slate-300 uppercase tracking-wider truncate">
                    SKILL XP
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold font-pixel text-purple-300">
                    <AnimatedStatNumber value={player.stats.skills} />
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>
            </div>
          </div>

          {/* CLICKABLE DEVELOPER TOOLBAR & KEY SHORTCUTS (Instant Testing Dock) */}
          <div className="p-3 bg-[#0d0b17] border-2 border-amber-500/40 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-[#2b2545]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-amber-400" />
                <span className="text-[11px] font-pixel text-amber-300 tracking-wider">
                  🧪 DEVELOPER QUICK-TEST DOCK & SHORTCUTS
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDevDockExpanded(!devDockExpanded)}
                className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-1 font-mono"
              >
                {devDockExpanded ? (
                  <>
                    <span>Hide Dock</span>
                    <ChevronUp size={12} />
                  </>
                ) : (
                  <>
                    <span>Show Dock</span>
                    <ChevronDown size={12} />
                  </>
                )}
              </button>
            </div>

            {devDockExpanded && (
              <div className="mt-2.5 space-y-2.5">
                {/* Row 1: League & Health Quick-Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Promote League Button */}
                  <button
                    type="button"
                    onClick={handlePromoteLeague}
                    className="px-2 py-1.5 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/80 text-amber-200 text-[10px] font-pixel flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0_0_#000]"
                    title="Dev Key: P or ]"
                  >
                    <span>▲ Promote League</span>
                    <kbd className="px-1 py-0.2 bg-black/60 border border-amber-500/50 text-[9px] text-yellow-300">P</kbd>
                  </button>

                  {/* Demote League Button */}
                  <button
                    type="button"
                    onClick={handleDemoteLeague}
                    className="px-2 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-400/80 text-indigo-200 text-[10px] font-pixel flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0_0_#000]"
                    title="Dev Key: O or ["
                  >
                    <span>▼ Demote League</span>
                    <kbd className="px-1 py-0.2 bg-black/60 border border-indigo-500/50 text-[9px] text-indigo-300">O</kbd>
                  </button>

                  {/* Damage -20 HP */}
                  <button
                    type="button"
                    onClick={handleDamageHp}
                    className="px-2 py-1.5 bg-rose-500/20 hover:bg-rose-500/40 border border-rose-400/80 text-rose-200 text-[10px] font-pixel flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0_0_#000]"
                    title="Dev Key: D"
                  >
                    <span>-20 HP</span>
                    <kbd className="px-1 py-0.2 bg-black/60 border border-rose-500/50 text-[9px] text-rose-300">D</kbd>
                  </button>

                  {/* Drop to 0 HP */}
                  <button
                    type="button"
                    onClick={handleDropToZeroHp}
                    className="px-2 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500 text-red-200 text-[10px] font-pixel flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0_0_#000]"
                    title="Dev Key: 0 or K (Triggers Level Decay on 0 HP)"
                  >
                    <Skull size={11} className="text-red-400" />
                    <span>Drop 0 HP</span>
                    <kbd className="px-1 py-0.2 bg-black/60 border border-red-500 text-[9px] text-red-300">0</kbd>
                  </button>
                </div>

                {/* Row 2: Stats & Modal Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Restore HP Button */}
                  <button
                    type="button"
                    onClick={handleRestoreHp}
                    className="px-2 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-400/80 text-emerald-200 text-[10px] font-pixel flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0_0_#000]"
                    title="Dev Key: R"
                  >
                    <RefreshCw size={11} className="text-emerald-400" />
                    <span>Restore HP</span>
                    <kbd className="px-1 py-0.2 bg-black/60 border border-emerald-500/50 text-[9px] text-emerald-300">R</kbd>
                  </button>

                  {/* +25 XP Button */}
                  <button
                    type="button"
                    onClick={() => handleAddXp(25)}
                    className="px-2 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/80 text-cyan-200 text-[10px] font-pixel flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0_0_#000]"
                    title="Dev Key: X"
                  >
                    <span>+25 XP</span>
                    <kbd className="px-1 py-0.2 bg-black/60 border border-cyan-500/50 text-[9px] text-cyan-300">X</kbd>
                  </button>

                  {/* Level Up Button */}
                  <button
                    type="button"
                    onClick={handleLevelUp}
                    className="px-2 py-1.5 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-400/80 text-purple-200 text-[10px] font-pixel flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0_0_#000]"
                    title="Dev Key: L"
                  >
                    <span>⭐ Level Up</span>
                    <kbd className="px-1 py-0.2 bg-black/60 border border-purple-500/50 text-[9px] text-purple-300">L</kbd>
                  </button>

                  {/* View Full League Modal */}
                  <button
                    type="button"
                    onClick={handleOpenLeagueModal}
                    className="px-2 py-1.5 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-400 text-amber-200 text-[10px] font-pixel flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0_0_#000]"
                    title="Open full celebratory league modal preview"
                  >
                    <span>📜 View Modal</span>
                  </button>
                </div>

                {/* Shortcuts Key Legend Footer */}
                <div className="pt-2 border-t border-[#201c36] text-[9px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
                  <span className="text-amber-300 font-bold">⌨️ Active Keys:</span>
                  <span><kbd className="px-1 bg-black/60 border border-slate-700 text-yellow-300">P / ]</kbd> +League</span>
                  <span><kbd className="px-1 bg-black/60 border border-slate-700 text-indigo-300">O / [</kbd> -League</span>
                  <span><kbd className="px-1 bg-black/60 border border-slate-700 text-rose-300">D</kbd> -20 HP</span>
                  <span><kbd className="px-1 bg-black/60 border border-slate-700 text-red-400">0 / K</kbd> 0 HP</span>
                  <span><kbd className="px-1 bg-black/60 border border-slate-700 text-emerald-300">R</kbd> Full HP</span>
                  <span><kbd className="px-1 bg-black/60 border border-slate-700 text-cyan-300">X</kbd> +XP</span>
                  <span><kbd className="px-1 bg-black/60 border border-slate-700 text-purple-300">L</kbd> Level+</span>
                  <span><kbd className="px-1 bg-black/60 border border-slate-700 text-slate-300">S / T</kbd> +STR/STA</span>
                </div>
              </div>
            )}
          </div>

          {/* CHARACTER STATS → QUEST PAGE: Clear CONTINUE / NEXT button */}
          {onContinueToQuests && (
            <div className="pt-2 border-t-2 border-[#2b2545]">
              <RpgButton
                type="button"
                variant="player"
                size="lg"
                fullWidth
                onClick={onContinueToQuests}
                icon={<ArrowRight size={16} className="text-slate-950 stroke-[3]" />}
              >
                CONTINUE TO QUESTS ➔
              </RpgButton>
            </div>
          )}

          {/* Secondary Action Navigation Controls */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <RpgButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={onEditCharacter}
              icon={<Edit3 size={13} />}
            >
              Edit Character
            </RpgButton>

            <RpgButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={onLogOut}
              icon={<LogOut size={13} />}
            >
              Log Out
            </RpgButton>
          </div>
        </div>
      </RpgCard>

      {/* League Promotion / Demotion Celebration Modal */}
      {leagueModal && (
        <LeagueChangeModal
          isOpen={leagueModal.isOpen}
          onClose={() => setLeagueModal(null)}
          type={leagueModal.type}
          oldLeague={leagueModal.oldLeague}
          newLeague={leagueModal.newLeague}
        />
      )}
    </div>
  );
};

