import type { CharacterProfile } from '../types/character';
import type { PlayerState, PlayerStats, LeagueTier } from '../types/progression';

/**
 * Calculates the XP required to complete the given level and advance to the next level.
 * Level 1 requires 100 XP, Level 2 requires 200 XP, Level 3 requires 300 XP, etc.
 */
export const getXpThresholdForLevel = (level: number): number => {
  const safeLevel = Math.max(1, Math.floor(level));
  return safeLevel * 100;
};

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
      name: 'Bronze',
    },
  };
};

/**
 * Computes level progression metrics from current level and current XP.
 */
export const calculateProgressMetrics = (level: number, xp: number) => {
  const safeLevel = Math.max(1, level);
  const safeXp = Math.max(0, xp);
  const requiredXp = getXpThresholdForLevel(safeLevel);
  const progressPercent = Math.min(100, Math.round((safeXp / requiredXp) * 100));

  return {
    level: safeLevel,
    currentXp: safeXp,
    requiredXp,
    progressPercent,
  };
};

/**
 * Adds XP to the player and handles level-up thresholds.
 * XP carries over into subsequent levels if it exceeds the threshold.
 * Level never drops below 1. XP is earned, not spent.
 */
export const addPlayerXp = (
  player: PlayerState,
  amount: number
): { updatedPlayer: PlayerState; leveledUp: boolean; levelsGained: number } => {
  if (amount <= 0) {
    return { updatedPlayer: player, leveledUp: false, levelsGained: 0 };
  }

  let currentLevel = Math.max(1, player.progression.level);
  let currentXp = Math.max(0, player.progression.xp) + amount;
  let levelsGained = 0;

  // Level up loop if XP meets or exceeds the required threshold
  while (currentXp >= getXpThresholdForLevel(currentLevel)) {
    currentXp -= getXpThresholdForLevel(currentLevel);
    currentLevel += 1;
    levelsGained += 1;
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

/**
 * Modifies player health, clamping between 0 and 100.
 */
export const modifyPlayerHealth = (player: PlayerState, delta: number): PlayerState => {
  const newHealth = Math.min(100, Math.max(0, player.stats.health + delta));
  return {
    ...player,
    stats: {
      ...player.stats,
      health: newHealth,
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
export const updatePlayerLeague = (player: PlayerState, leagueName: LeagueTier): PlayerState => {
  return {
    ...player,
    league: {
      name: leagueName,
    },
  };
};
