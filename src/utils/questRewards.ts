import type { Quest } from '../types/quest';
import type { PlayerState, PlayerStats } from '../types/progression';
import {
  addPlayerXp,
  modifyPlayerHealth,
  modifyPlayerStat,
  modifyPlayerGold,
} from './progression';

export interface QuestReward {
  xp: number; // Final Overall character XP (after level multiplier)
  baseXp?: number; // Base Overall XP before diminishing multiplier
  gold: number; // In-game currency (NOT diminished)
  attributeAmount: number; // Amount added to specific stat / skill XP (NOT diminished)
  attributeName: string; // e.g. "Intelligence", "Strength", "Stamina", "Skill XP", "Health"
  attributeKey: keyof PlayerStats;
  isSkillXp: boolean;
  categoryIcon: string;
}

/**
 * Calculates the diminishing Overall XP multiplier based on player level.
 * Multiplier formula: 1 / (1 + ((level - 1) * 0.05))
 * - Level 1: 1.0 (100% XP)
 * - Level 10: ~0.6897 (~69% XP)
 * - Level 20: ~0.5128 (~51% XP)
 * - Level 50: ~0.2899 (~29% XP)
 * - Level 100: ~0.1681 (~17% XP)
 * Applies ONLY to Overall XP. Never reduces Gold, Attributes, or Skill XP.
 */
export const getXpMultiplierForLevel = (level: number): number => {
  const safeLevel = Math.max(1, Math.floor(level));
  return 1 / (1 + (safeLevel - 1) * 0.05);
};

/**
 * Calculates the exact reward bundle based on quest type, difficulty, category,
 * and the player's current level.
 *
 * TODAY'S QUESTS:
 * - Easy: Base +50 XP, +2 Attribute/Skill XP, +10 Gold
 * - Medium: Base +100 XP, +5 Attribute/Skill XP, +20 Gold
 * - Hard: Base +200 XP, +10 Attribute/Skill XP, +40 Gold
 *
 * ACTIVE QUESTS:
 * - Easy: Base +300 XP, +10 Attribute/Skill XP, +75 Gold
 * - Medium: Base +600 XP, +20 Attribute/Skill XP, +150 Gold
 * - Hard: Base +1000 XP, +35 Attribute/Skill XP, +300 Gold
 */
export const calculateQuestReward = (quest: Quest, playerLevel: number = 1): QuestReward => {
  const isToday = quest.questType === 'today';

  let baseXp = 0;
  let attributeAmount = 0;
  let gold = 0;

  if (isToday) {
    switch (quest.difficulty) {
      case 'easy':
        baseXp = 50;
        attributeAmount = 2;
        gold = 10;
        break;
      case 'medium':
        baseXp = 100;
        attributeAmount = 5;
        gold = 20;
        break;
      case 'hard':
        baseXp = 200;
        attributeAmount = 10;
        gold = 40;
        break;
    }
  } else {
    // Active (Long-term multi-day quests)
    switch (quest.difficulty) {
      case 'easy':
        baseXp = 300;
        attributeAmount = 10;
        gold = 75;
        break;
      case 'medium':
        baseXp = 600;
        attributeAmount = 20;
        gold = 150;
        break;
      case 'hard':
        baseXp = 1000;
        attributeAmount = 35;
        gold = 300;
        break;
    }
  }

  // Apply level-based diminishing Overall XP multiplier (rounded to nearest whole number)
  const multiplier = getXpMultiplierForLevel(playerLevel);
  const finalXp = Math.round(baseXp * multiplier);

  let attributeName = '';
  let attributeKey: keyof PlayerStats = 'intelligence';
  let isSkillXp = false;
  let categoryIcon = '🧠';

  switch (quest.category) {
    case 'intelligence':
      attributeName = 'Intelligence';
      attributeKey = 'intelligence';
      categoryIcon = '🧠';
      break;
    case 'strength':
      attributeName = 'Strength';
      attributeKey = 'strength';
      categoryIcon = '💪';
      break;
    case 'stamina':
      attributeName = 'Stamina';
      attributeKey = 'stamina';
      categoryIcon = '⚡';
      break;
    case 'skills':
      attributeName = 'Skill XP';
      attributeKey = 'skills';
      isSkillXp = true;
      categoryIcon = '🛠';
      break;
    case 'health':
      attributeName = 'Health';
      attributeKey = 'health';
      categoryIcon = '❤️';
      break;
  }

  return {
    xp: finalXp,
    baseXp,
    gold,
    attributeAmount,
    attributeName,
    attributeKey,
    isSkillXp,
    categoryIcon,
  };
};

/**
 * Applies a quest's rewards to the player's single source of truth state:
 * - Adds Overall XP and checks for level-up / multi-level advancement.
 * - Adds Gold to player economy.
 * - Increments ONLY the relevant attribute / Skill XP.
 * - Safely clamps Health to maximum 100.
 */
export const applyQuestRewardToPlayer = (
  player: PlayerState,
  reward: QuestReward
): {
  updatedPlayer: PlayerState;
  leveledUp: boolean;
  levelsGained: number;
  newLevel: number;
} => {
  // 1. Add Overall XP & process Level Up / rollover thresholds
  const { updatedPlayer: xpUpdatedPlayer, leveledUp, levelsGained } = addPlayerXp(
    player,
    reward.xp
  );

  // 2. Add Gold to currency
  let nextPlayer = modifyPlayerGold(xpUpdatedPlayer, reward.gold);

  // 3. Add single relevant attribute or Skill XP
  if (reward.attributeKey === 'health') {
    // Health is capped at 100
    nextPlayer = modifyPlayerHealth(nextPlayer, reward.attributeAmount);
  } else {
    // Independent core attribute or Skill XP
    nextPlayer = modifyPlayerStat(nextPlayer, reward.attributeKey, reward.attributeAmount);
  }

  return {
    updatedPlayer: nextPlayer,
    leveledUp,
    levelsGained,
    newLevel: nextPlayer.progression.level,
  };
};
