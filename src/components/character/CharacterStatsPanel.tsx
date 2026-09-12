import React, { useState, useEffect, useRef } from 'react';
import type { PlayerState } from '../../types/progression';
import { LEAGUE_CONFIGS } from '../../types/progression';
import {
  calculateProgressMetrics,
  addPlayerXp,
  modifyPlayerHealth,
  modifyPlayerStat,
} from '../../utils/progression';
import { playStatIncreaseSound, playLevelUpSound } from '../../utils/soundEffects';
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
} from 'lucide-react';

interface CharacterStatsPanelProps {
  initialPlayer: PlayerState;
  onEditCharacter: () => void;
  onContinueToQuests?: () => void;
  onLogOut: () => void;
  isDevMode?: boolean;
}

export const CharacterStatsPanel: React.FC<CharacterStatsPanelProps> = ({
  initialPlayer,
  onEditCharacter,
  onContinueToQuests,
  onLogOut,
  isDevMode = false,
}) => {
  const [player, setPlayer] = useState<PlayerState>(initialPlayer);
  const [levelUpGlow, setLevelUpGlow] = useState(false);
  const [activePulseStat, setActivePulseStat] = useState<{
    strength?: boolean;
    stamina?: boolean;
    health?: boolean;
  }>({});
  const [levelUpToast, setLevelUpToast] = useState(false);

  // Reference to track previous values to detect actual increases
  const prevStatsRef = useRef({
    level: player.progression.level,
    xp: player.progression.xp,
    health: player.stats.health,
    strength: player.stats.strength,
    stamina: player.stats.stamina,
  });
  const isFirstRender = useRef(true);

  // Keep state synchronized if initialPlayer prop changes
  useEffect(() => {
    setPlayer(initialPlayer);
  }, [initialPlayer]);

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

    const levelIncreased = currentLevel > prev.level;
    const xpIncreased = currentXp > prev.xp || levelIncreased;
    const healthIncreased = currentHealth > prev.health;
    const strengthIncreased = currentStrength > prev.strength;
    const staminaIncreased = currentStamina > prev.stamina;

    // 3. Level up feedback
    if (levelIncreased) {
      playLevelUpSound();
      setLevelUpGlow(true);
      setLevelUpToast(true);
      setTimeout(() => setLevelUpGlow(false), 1500);
      setTimeout(() => setLevelUpToast(false), 2400);
    } else if (xpIncreased || healthIncreased || strengthIncreased || staminaIncreased) {
      // 2. Short, satisfying RPG-style stat increased sound
      playStatIncreaseSound();
    }

    // 5. Stat card visual highlight pulse
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

    // Update previous values ref
    prevStatsRef.current = {
      level: currentLevel,
      xp: currentXp,
      health: currentHealth,
      strength: currentStrength,
      stamina: currentStamina,
    };
  }, [
    player.progression.level,
    player.progression.xp,
    player.stats.health,
    player.stats.strength,
    player.stats.stamina,
  ]);

  // Keyboard shortcut listener to easily test feedback effects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore typing in input fields
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'x') {
        // Test XP increase
        setPlayer((prev) => addPlayerXp(prev, 25).updatedPlayer);
      } else if (key === 'l') {
        // Test Level increase
        setPlayer((prev) => addPlayerXp(prev, 100).updatedPlayer);
      } else if (key === 'h') {
        // Test Health increase / toggle
        setPlayer((prev) =>
          prev.stats.health < 100 ? modifyPlayerHealth(prev, 20) : modifyPlayerHealth(prev, -20)
        );
      } else if (key === 's') {
        // Test Strength increase
        setPlayer((prev) => modifyPlayerStat(prev, 'strength', 1));
      } else if (key === 't') {
        // Test Stamina increase
        setPlayer((prev) => modifyPlayerStat(prev, 'stamina', 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const metrics = calculateProgressMetrics(
    player.progression.level,
    player.progression.xp
  );

  const leagueConfig = LEAGUE_CONFIGS[player.league.name] || LEAGUE_CONFIGS.Bronze;
  const isFullHealth = player.stats.health >= 100;

  return (
    <div className="w-full max-w-2xl mx-auto my-auto relative z-10 px-3 sm:px-4 py-4 animate-fadeIn">
      {/* Level Up Celebration Toast */}
      {levelUpToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-amber-950/95 border-2 border-amber-400 text-amber-200 text-xs font-pixel shadow-[0_6px_20px_rgba(245,158,11,0.5)] animate-bounce text-center flex items-center gap-2">
          <Sparkles size={16} className="text-yellow-300 animate-spin" />
          <span className="font-bold tracking-wider">LEVEL UP! Reached Level {player.progression.level}!</span>
        </div>
      )}

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
              {/* 3. Level Badge with Glowing Level-Up Feedback */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 border-2 font-pixel text-xs font-bold transition-all duration-500 shadow-[2px_2px_0_0_#000] ${
                      levelUpGlow
                        ? 'animate-level-up-glow bg-amber-400/40 text-yellow-200 border-yellow-300'
                        : 'bg-amber-500/20 border-amber-400 text-amber-300'
                    }`}
                  >
                    LVL {player.progression.level}
                  </span>
                </div>
              </div>

              {/* 1 & 6. HEALTH BAR: Gently pulses when at maximum 100/100 HP */}
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

              {/* 4. LARGE PROMINENT XP BAR: Smooth animation on XP increase */}
              <div className="space-y-1.5 p-2.5 bg-[#171427] border-2 border-indigo-900/60 shadow-[2px_2px_0_0_#000]">
                <div className="flex items-center justify-between text-xs font-pixel">
                  <span className="text-indigo-300 flex items-center gap-1.5 font-bold">
                    <Zap size={14} className="fill-indigo-400 text-indigo-400" />
                    <span>XP PROGRESS</span>
                  </span>
                  <span className="text-cyan-300 font-bold tracking-wider">
                    <AnimatedStatNumber value={metrics.currentXp} /> / {metrics.requiredXp} XP
                  </span>
                </div>
                {/* Large Smooth XP Progress Bar */}
                <div className="w-full h-5 bg-black/80 border-2 border-[#43376a] p-0.5 relative shadow-inner overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-400 transition-all duration-700 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                    style={{ width: `${metrics.progressPercent}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-pixel text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] select-none">
                    {metrics.progressPercent}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEAGUE, GOLD & STREAK SECTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* League Section */}
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
                  <AnimatedStatNumber value={player.economy.gold} /> G
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
                  <AnimatedStatNumber value={player.consistency.streak} />{' '}
                  {player.consistency.streak === 1 ? 'Day' : 'Days'}
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
              {/* Intelligence */}
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
                    <AnimatedStatNumber value={player.stats.intelligence} />
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">Rank I</span>
                </div>
              </div>

              {/* 5. Strength (Smooth count-up & highlight pulse on increase) */}
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

              {/* 5. Stamina (Smooth count-up & highlight pulse on increase) */}
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

              {/* Skills / Skill XP */}
              <div className="p-2.5 bg-[#12101e] border-2 border-[#2b2545] hover:border-purple-500/50 transition-colors">
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

          {/* Discreet Developer / Testing Shortcuts Hint (Displayed if dev mode or testing) */}
          {isDevMode && (
            <div className="p-2.5 bg-[#100e1c] border border-amber-500/40 text-[10px] font-pixel text-slate-400 flex flex-wrap gap-2 items-center justify-between">
              <span className="text-amber-300">⌨️ Quick Test Keys:</span>
              <span><kbd className="px-1 bg-black/60 border border-slate-600 text-amber-200">X</kbd> +25 XP</span>
              <span><kbd className="px-1 bg-black/60 border border-slate-600 text-amber-200">L</kbd> Level Up</span>
              <span><kbd className="px-1 bg-black/60 border border-slate-600 text-amber-200">H</kbd> HP Toggle</span>
              <span><kbd className="px-1 bg-black/60 border border-slate-600 text-amber-200">S</kbd> +1 Str</span>
              <span><kbd className="px-1 bg-black/60 border border-slate-600 text-amber-200">T</kbd> +1 Sta</span>
            </div>
          )}

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
    </div>
  );
};
