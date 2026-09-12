import type { Quest } from '../types/quest';
import { INITIAL_QUESTS } from '../types/quest';

const STORAGE_KEY_QUESTS = 'LIFE_RPG_QUESTS_V2';
const STORAGE_KEY_LAST_DATE = 'LIFE_RPG_LAST_ACTIVE_DATE_V2';

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
 * Loads quests from localStorage and performs daily calendar refresh logic:
 * - Completed daily quests remain in Quest History.
 * - Incomplete daily quests from previous days do not carry over to Today's Quests.
 * - Active long-term quests persist across multiple days until completed or expired.
 */
export const loadQuestsWithDailyRefresh = (): Quest[] => {
  if (typeof window === 'undefined') {
    return INITIAL_QUESTS;
  }

  const todayStr = getTodayDateString();
  const lastActiveDate = localStorage.getItem(STORAGE_KEY_LAST_DATE);
  const rawQuests = localStorage.getItem(STORAGE_KEY_QUESTS);

  let quests: Quest[];

  if (!rawQuests) {
    // First time load: seed with initial quests
    quests = INITIAL_QUESTS;
    localStorage.setItem(STORAGE_KEY_QUESTS, JSON.stringify(quests));
    localStorage.setItem(STORAGE_KEY_LAST_DATE, todayStr);
    return quests;
  }

  try {
    quests = JSON.parse(rawQuests) as Quest[];
  } catch {
    quests = INITIAL_QUESTS;
  }

  // Check if a new calendar day has begun
  if (lastActiveDate && lastActiveDate !== todayStr) {
    // Perform Day Rollover
    quests = quests.map((quest) => {
      // Short-term Today's Quests from previous days
      if (quest.questType === 'today' && quest.questDate !== todayStr) {
        if (quest.completed) {
          // Completed quests remain archived in history
          return quest;
        }
        // Incomplete daily quests do NOT carry over to the new day
        return {
          ...quest,
          status: 'expired' as const,
        };
      }

      // Long-term Active Quests continue across days
      if (quest.questType === 'active') {
        if (!quest.completed && Date.now() > quest.deadline) {
          return { ...quest, status: 'expired' as const };
        }
        return quest;
      }

      return quest;
    });

    localStorage.setItem(STORAGE_KEY_LAST_DATE, todayStr);
    localStorage.setItem(STORAGE_KEY_QUESTS, JSON.stringify(quests));
  } else {
    // Same day: check for expired deadlines
    const now = Date.now();
    quests = quests.map((quest) => {
      if (!quest.completed && quest.status === 'active' && now > quest.deadline) {
        return { ...quest, status: 'expired' as const };
      }
      return quest;
    });
  }

  return quests;
};

/**
 * Saves quests to localStorage.
 */
export const saveQuestsToStorage = (quests: Quest[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_QUESTS, JSON.stringify(quests));
    localStorage.setItem(STORAGE_KEY_LAST_DATE, getTodayDateString());
  } catch {
    // Ignore storage quota errors
  }
};

/**
 * Formats the countdown timer / remaining time display:
 * - "45 min remaining"
 * - "2 hours remaining"
 * - "6 days remaining"
 * - "EXPIRED"
 */
export const formatRemainingTime = (deadline: number, completed: boolean): string => {
  if (completed) {
    return 'COMPLETED';
  }

  const diffMs = deadline - Date.now();

  if (diffMs <= 0) {
    return 'EXPIRED';
  }

  const diffMins = Math.floor(diffMs / (60 * 1000));
  const diffHours = Math.floor(diffMs / (3600 * 1000));
  const diffDays = Math.floor(diffMs / (24 * 3600 * 1000));

  if (diffMins < 1) {
    return '< 1 min remaining';
  }

  if (diffMins < 60) {
    return `${diffMins} min remaining`;
  }

  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} remaining`;
  }

  return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} remaining`;
};
