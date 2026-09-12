import type { CharacterProfile } from '../types/character';
import type { PlayerState, PlayerStats, LeagueTier, PlayerLeague } from '../types/progression';

export const MAX_PLAYER_LEVEL = 100;

/**
 * Calculates the XP required to advance from the current level to the next level.
 * Formula: 100 * level^1.5 (rounded to whole number)
 * - Level 1: 100 XP required
 * - Level 2: ~283 XP required
 * - Level 3: ~520 XP required
 * - Level 10: ~3162 XP required
 */
export const getXPRequiredForLevel = (level: number): number => {
  const safeLevel = Math.max(1, Math.floor(level));
  return Math.round(100 * Math.pow(safeLevel, 1.5));
};

// Backwards-compatible alias for existing imports
export const getXpThresholdForLevel = getXPRequiredForLevel;

/**
 * Creates the initial PlayerState with all Step 3 baseline values.
 * - Level starts at 1 (NEVER 0, cannot go below 1)
 * - XP starts at 0
 * - Health starts at 100 (Max 100)
 * - Intelligence, Strength, Stamina, Skills start at 0
 * - Gold starts at 0
 * - Streak starts at 0
 * - League starts at Bronze
 */
export const createInitialPlayerState = (character: CharacterProfile): PlayerState => {
  return {
    character,
    progression: {
      level: 1,
      xp: 0,
    },
    stats: {
      health: 100,
      intelligence: 0,
      strength: 0,
      stamina: 0,
      skills: 0,
    },
    economy: {
      gold: 0,
    },
    consistency: {
      streak: 0,
    },
    league: {
      tier: 'Bronze',
      division: 'III',
      name: 'Bronze',
    },
  };
};

/**
 * Computes level progression metrics from current level and current XP.
 */
export const calculateProgressMetrics = (level: number, xp: number) => {
  const safeLevel = Math.max(1, Math.min(MAX_PLAYER_LEVEL, Math.floor(level)));
  const isMaxLevel = safeLevel >= MAX_PLAYER_LEVEL;
  const requiredXp = getXPRequiredForLevel(safeLevel);
  const safeXp = isMaxLevel ? requiredXp : Math.max(0, xp);
  const progressPercent = isMaxLevel
    ? 100
    : Math.min(100, Math.max(0, Math.round((safeXp / requiredXp) * 100)));

  return {
    level: safeLevel,
    currentXp: isMaxLevel ? requiredXp : Math.max(0, xp),
    requiredXp,
    progressPercent,
    isMaxLevel,
  };
};

/**
 * Adds Overall XP to the player and handles non-linear level-up thresholds and rollovers.
 * - XP carries over into subsequent levels if it exceeds the threshold.
 * - Multi-level jumps are accurately processed.
 * - Level is capped at MAX_PLAYER_LEVEL (100).
 * - Level never drops below 1. XP is earned, not spent.
 */
export const addPlayerXp = (
  player: PlayerState,
  amount: number
): { updatedPlayer: PlayerState; leveledUp: boolean; levelsGained: number } => {
  if (amount <= 0) {
    return { updatedPlayer: player, leveledUp: false, levelsGained: 0 };
  }

  let currentLevel = Math.max(1, Math.min(MAX_PLAYER_LEVEL, player.progression.level));
  let currentXp = Math.max(0, player.progression.xp);
  let levelsGained = 0;

  // If already at Max Level (100), do not advance further
  if (currentLevel >= MAX_PLAYER_LEVEL) {
    return {
      updatedPlayer: {
        ...player,
        progression: {
          level: MAX_PLAYER_LEVEL,
          xp: getXPRequiredForLevel(MAX_PLAYER_LEVEL),
        },
      },
      leveledUp: false,
      levelsGained: 0,
    };
  }

  currentXp += amount;

  // Level up loop with rollover
  while (currentLevel < MAX_PLAYER_LEVEL && currentXp >= getXPRequiredForLevel(currentLevel)) {
    currentXp -= getXPRequiredForLevel(currentLevel);
    currentLevel += 1;
    levelsGained += 1;
  }

  // If reached Level 100 cap
  if (currentLevel >= MAX_PLAYER_LEVEL) {
    currentLevel = MAX_PLAYER_LEVEL;
    currentXp = getXPRequiredForLevel(MAX_PLAYER_LEVEL);
  }

  const updatedPlayer: PlayerState = {
    ...player,
    progression: {
      level: currentLevel,
      xp: currentXp,
    },
  };

  return {
    updatedPlayer,
    leveledUp: levelsGained > 0,
    levelsGained,
  };
};

export const modifyPlayerHealth = (player: PlayerState, delta: number): PlayerState => {
  const newHealth = Math.min(100, Math.max(0, player.stats.health + delta));
  return {
    ...player,
    stats: {
      ...player.stats,
      health: newHealth,
    },
    consistency: {
      ...player.consistency,
      levelDecayProcessed: newHealth > 0 ? false : player.consistency?.levelDecayProcessed,
    },
  };
};

/**
 * Modifies an independent core stat (intelligence, strength, stamina, skills).
 * Values cannot go below 0.
 */
export const modifyPlayerStat = (
  player: PlayerState,
  statName: keyof PlayerStats,
  delta: number
): PlayerState => {
  if (statName === 'health') {
    return modifyPlayerHealth(player, delta);
  }

  const currentVal = player.stats[statName];
  const newVal = Math.max(0, currentVal + delta);

  return {
    ...player,
    stats: {
      ...player.stats,
      [statName]: newVal,
    },
  };
};

/**
 * Modifies player gold (in-game currency). Cannot go below 0.
 * Strictly separate from XP.
 */
export const modifyPlayerGold = (player: PlayerState, delta: number): PlayerState => {
  const newGold = Math.max(0, player.economy.gold + delta);
  return {
    ...player,
    economy: {
      gold: newGold,
    },
  };
};

/**
 * Increments streak by 1.
 */
export const incrementPlayerStreak = (player: PlayerState): PlayerState => {
  return {
    ...player,
    consistency: {
      streak: player.consistency.streak + 1,
    },
  };
};

/**
 * Resets streak to 0.
 */
export const resetPlayerStreak = (player: PlayerState): PlayerState => {
  return {
    ...player,
    consistency: {
      streak: 0,
    },
  };
};

/**
 * Updates player league tier.
 */
export const updatePlayerLeague = (player: PlayerState, league: PlayerLeague | LeagueTier): PlayerState => {
  if (typeof league === 'string') {
    return {
      ...player,
      league: {
        tier: league,
        division: league === 'Mythical' ? undefined : 'III',
        name: league,
      },
    };
  }
  return {
    ...player,
    league: {
      tier: league.tier,
      division: league.tier === 'Mythical' ? undefined : (league.division || 'III'),
      name: league.tier,
    },
  };
};
