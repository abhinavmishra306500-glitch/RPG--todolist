import type { Quest } from '../types/quest';
import type { PlayerState, PlayerStats } from '../types/progression';
import {
  addPlayerXp,
  modifyPlayerHealth,
  modifyPlayerStat,
  modifyPlayerGold,
} from './progression';

export interface QuestReward {
  xp: number; // Overall character XP
  gold: number; // In-game currency
  attributeAmount: number; // Amount added to specific stat / skill XP
  attributeName: string; // e.g. "Intelligence", "Strength", "Stamina", "Skill XP", "Health"
  attributeKey: keyof PlayerStats;
  isSkillXp: boolean;
  categoryIcon: string;
}

/**
 * Calculates the exact reward bundle based on quest type, difficulty, and category.
 *
 * TODAY'S QUESTS:
 * - Easy: +50 XP, +2 Attribute/Skill XP, +10 Gold
 * - Medium: +100 XP, +5 Attribute/Skill XP, +20 Gold
 * - Hard: +200 XP, +10 Attribute/Skill XP, +40 Gold
 *
 * ACTIVE QUESTS:
 * - Easy: +300 XP, +10 Attribute/Skill XP, +75 Gold
 * - Medium: +600 XP, +20 Attribute/Skill XP, +150 Gold
 * - Hard: +1000 XP, +35 Attribute/Skill XP, +300 Gold
 */
export const calculateQuestReward = (quest: Quest): QuestReward => {
  const isToday = quest.questType === 'today';

  let xp = 0;
  let attributeAmount = 0;
  let gold = 0;

  if (isToday) {
    switch (quest.difficulty) {
      case 'easy':
        xp = 50;
        attributeAmount = 2;
        gold = 10;
        break;
      case 'medium':
        xp = 100;
        attributeAmount = 5;
        gold = 20;
        break;
      case 'hard':
        xp = 200;
        attributeAmount = 10;
        gold = 40;
        break;
    }
  } else {
    // Active (Long-term multi-day quests)
    switch (quest.difficulty) {
      case 'easy':
        xp = 300;
        attributeAmount = 10;
        gold = 75;
        break;
      case 'medium':
        xp = 600;
        attributeAmount = 20;
        gold = 150;
        break;
      case 'hard':
        xp = 1000;
        attributeAmount = 35;
        gold = 300;
        break;
    }
  }

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
      categoryIcon = '🏃';
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
    xp,
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
