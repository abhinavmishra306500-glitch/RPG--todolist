import type { PlayerState, PlayerLeague } from '../types/progression';
import { evaluateLeagueConsistency, demoteLeague } from './league';

export const STREAK_MILESTONES = [1, 3, 7, 14, 30, 100] as const;
export type StreakMilestone = (typeof STREAK_MILESTONES)[number];

/**
 * Returns today's date formatted as YYYY-MM-DD in local time.
 */
export const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Calculates whole calendar days passed between two YYYY-MM-DD date strings.
 */
export const getDaysBetweenDates = (startDateStr: string, endDateStr: string): number => {
  if (!startDateStr || !endDateStr) return 0;
  const [sy, sm, sd] = startDateStr.split('-').map(Number);
  const [ey, em, ed] = endDateStr.split('-').map(Number);
  if (isNaN(sy) || isNaN(sm) || isNaN(sd) || isNaN(ey) || isNaN(em) || isNaN(ed)) return 0;
  const start = Date.UTC(sy, sm - 1, sd);
  const end = Date.UTC(ey, em - 1, ed);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.floor((end - start) / msPerDay));
};

/**
 * Returns yesterday's date formatted as YYYY-MM-DD in UTC.
 */
export const getYesterdayDateString = (dateStr: string): string => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d - 1));
  const yStr = date.getUTCFullYear();
  const mStr = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dStr = String(date.getUTCDate()).padStart(2, '0');
  return `${yStr}-${mStr}-${dStr}`;
};

/**
 * Calculates cumulative health loss for inactivity:
 * - Day 1 (0 days passed since last active): 0 decay (100 HP)
 * - Day 2 (1 day passed, 1st inactive day): 0 decay (100 HP, grace period)
 * - Day 3 (2 days passed, 2nd inactive day): 2 decay (98 HP, -2)
 * - Day 4 (3 days passed, 3rd inactive day): 4 decay (96 HP, -2)
 * - Day 5 (4 days passed, 4th inactive day): 6 decay (94 HP, -2)
 * Formula: daysPassed >= 2 ? (daysPassed - 1) * 2 : 0
 */
export const calculateCumulativeDecay = (lastActiveDate: string, checkDate: string): number => {
  const daysPassed = getDaysBetweenDates(lastActiveDate, checkDate);
  if (daysPassed <= 1) return 0;
  return (daysPassed - 1) * 2;
};

/**
 * Returns the next upcoming streak milestone or null if all achieved.
 */
export const getNextStreakMilestone = (currentStreak: number): number | null => {
  for (const milestone of STREAK_MILESTONES) {
    if (currentStreak < milestone) {
      return milestone;
    }
  }
  return null;
};

/**
 * Applies inactivity health decay, level decay, and league demotion if applicable.
 * - Evaluates decay once per calendar day (checked by lastHealthDecayDate).
 * - Repeated browser refreshes on the same day never apply decay multiple times.
 * - If Health hits 0 HP, Level decreases by 1 (minimum Level 1).
 * - Level decay occurs only once for a Health-0 event (protected by levelDecayProcessed).
 */
export const applyInactivityDecay = (
  player: PlayerState,
  todayDate: string
): {
  updatedPlayer: PlayerState;
  healthLost: number;
  levelDecayed: boolean;
  streakBroken: boolean;
  leagueDemoted: { oldLeague: PlayerLeague; newLeague: PlayerLeague } | null;
} => {
  const consistency = player.consistency;
  const lastActiveDate = consistency.lastActiveDate;

  // New character with no recorded activity yet: initialize with today
  if (!lastActiveDate) {
    return {
      updatedPlayer: {
        ...player,
        consistency: {
          ...consistency,
          lastActiveDate: todayDate,
          lastHealthDecayDate: todayDate,
        },
      },
      healthLost: 0,
      levelDecayed: false,
      streakBroken: false,
      leagueDemoted: null,
    };
  }

  // If already checked on today's calendar date, do not repeat
  if (consistency.lastHealthDecayDate === todayDate) {
    return {
      updatedPlayer: player,
      healthLost: 0,
      levelDecayed: false,
      streakBroken: false,
      leagueDemoted: null,
    };
  }

  const daysPassedSinceActive = getDaysBetweenDates(lastActiveDate, todayDate);
  const lastDecayDate = consistency.lastHealthDecayDate || lastActiveDate;

  // Incremental decay since last evaluated decay date
  const prevCumulativeDecay = calculateCumulativeDecay(lastActiveDate, lastDecayDate);
  const currentCumulativeDecay = calculateCumulativeDecay(lastActiveDate, todayDate);
  const decayDelta = Math.max(0, currentCumulativeDecay - prevCumulativeDecay);

  // Check if streak broke due to missing at least 1 full calendar day
  const streakBroken = daysPassedSinceActive >= 2 && consistency.streak > 0;
  const newStreak = streakBroken ? 0 : consistency.streak;

  let currentHealth = player.stats.health;
  let newHealth = currentHealth;
  let actualHealthLost = 0;

  if (decayDelta > 0) {
    newHealth = Math.max(0, currentHealth - decayDelta);
    actualHealthLost = currentHealth - newHealth;
  }

  // Level Decay: triggers when health drops to 0, protected against repeated triggers
  let currentLevel = player.progression.level;
  let levelDecayed = false;
  let levelDecayProcessed = consistency.levelDecayProcessed || false;

  if (player.stats.health > 0 && newHealth === 0) {
    // Fresh transition into 0 HP
    currentLevel = Math.max(1, currentLevel - 1);
    levelDecayed = true;
    levelDecayProcessed = true;
  } else if (player.stats.health === 0 && newHealth === 0) {
    // Health was already 0
    if (!levelDecayProcessed) {
      currentLevel = Math.max(1, currentLevel - 1);
      levelDecayed = true;
      levelDecayProcessed = true;
    }
  } else if (newHealth > 0) {
    // Health is above 0, clear protection flag
    levelDecayProcessed = false;
  }

  // League Demotion on severe inactivity (missed 3+ days)
  let currentLeague = player.league || { tier: 'Bronze', division: 'III' };
  let leagueDemotionResult: { oldLeague: PlayerLeague; newLeague: PlayerLeague } | null = null;

  if (daysPassedSinceActive >= 3 && decayDelta > 0) {
    const demoteRes = demoteLeague({ ...player, league: currentLeague });
    if (demoteRes.demoted) {
      currentLeague = demoteRes.newLeague;
      leagueDemotionResult = {
        oldLeague: demoteRes.oldLeague,
        newLeague: demoteRes.newLeague,
      };
    }
  }

  const updatedPlayer: PlayerState = {
    ...player,
    progression: {
      ...player.progression,
      level: currentLevel,
    },
    stats: {
      ...player.stats,
      health: newHealth,
    },
    consistency: {
      ...consistency,
      streak: newStreak,
      lastHealthDecayDate: todayDate,
      levelDecayProcessed,
    },
    league: currentLeague,
  };

  return {
    updatedPlayer,
    healthLost: actualHealthLost,
    levelDecayed,
    streakBroken,
    leagueDemoted: leagueDemotionResult,
  };
};

/**
 * Records activity when a player completes a meaningful quest on todayDate:
 * - If last active was today: already recorded today; streak does not increase twice.
 * - If last active was yesterday: consecutive active day -> streak increments by 1.
 * - If last active was before yesterday: streak was broken -> starts at 1.
 * - Checks and unlocks streak milestones [1, 3, 7, 14, 30, 100].
 * - Evaluates league promotion based on recent consistency.
 */
export const recordDailyActivity = (
  player: PlayerState,
  todayDate: string
): {
  updatedPlayer: PlayerState;
  newStreak: number;
  milestoneUnlocked: number | null;
  streakIncremented: boolean;
  leaguePromoted: { oldLeague: PlayerLeague; newLeague: PlayerLeague } | null;
} => {
  const consistency = player.consistency;
  const lastActiveDate = consistency.lastActiveDate;
  const yesterday = getYesterdayDateString(todayDate);

  // Already completed a quest today
  if (lastActiveDate === todayDate) {
    return {
      updatedPlayer: player,
      newStreak: consistency.streak,
      milestoneUnlocked: null,
      streakIncremented: false,
      leaguePromoted: null,
    };
  }

  let newStreak = 1;

  if (lastActiveDate === yesterday) {
    // Consecutive day!
    newStreak = consistency.streak + 1;
  } else {
    // Streak broken or starting first active day
    newStreak = 1;
  }

  // Check if new streak reached an unlocked milestone
  const existingMilestones = consistency.unlockedMilestones || [];
  let milestoneUnlocked: number | null = null;
  let updatedMilestones = [...existingMilestones];

  if (
    (STREAK_MILESTONES as readonly number[]).includes(newStreak) &&
    !existingMilestones.includes(newStreak)
  ) {
    milestoneUnlocked = newStreak;
    updatedMilestones.push(newStreak);
  }

  const streakPlayer: PlayerState = {
    ...player,
    consistency: {
      ...consistency,
      streak: newStreak,
      lastActiveDate: todayDate,
      lastHealthDecayDate: todayDate,
      unlockedMilestones: updatedMilestones,
      levelDecayProcessed: player.stats.health === 0,
    },
  };

  // Evaluate League promotion based on consistency/streak
  const leagueEval = evaluateLeagueConsistency(streakPlayer);
  const updatedPlayer = leagueEval.updatedPlayer;

  return {
    updatedPlayer,
    newStreak,
    milestoneUnlocked,
    streakIncremented: true,
    leaguePromoted:
      leagueEval.change === 'promoted'
        ? {
            oldLeague: leagueEval.oldLeague,
            newLeague: leagueEval.newLeague,
          }
        : null,
  };
};
