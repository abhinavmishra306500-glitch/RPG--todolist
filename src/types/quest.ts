export type QuestCategory = 'intelligence' | 'strength' | 'stamina' | 'skills' | 'health';

export type QuestDifficulty = 'easy' | 'medium' | 'hard';

export type QuestType = 'today' | 'active';

export type QuestStatus = 'active' | 'completed' | 'expired';

export interface Quest {
  id: string;
  title: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  createdAt: number;
  questDate: string; // Calendar date: YYYY-MM-DD
  deadline: number; // Timestamp in milliseconds
  durationLabel: string; // e.g. "2 hours", "7 days"
  questType: QuestType; // 'today' (short-term) or 'active' (multi-day long-term)
  completed: boolean;
  completedAt?: number;
  status: QuestStatus;
}

export interface QuestCategoryConfig {
  id: QuestCategory;
  label: string;
  icon: string;
  colorHex: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  statName: string;
}

export const QUEST_CATEGORIES: Record<QuestCategory, QuestCategoryConfig> = {
  intelligence: {
    id: 'intelligence',
    label: 'Intelligence',
    icon: '🧠',
    colorHex: '#06b6d4',
    badgeBg: 'bg-cyan-950/70',
    badgeBorder: 'border-cyan-500/60',
    badgeText: 'text-cyan-300',
    statName: 'Intelligence',
  },
  strength: {
    id: 'strength',
    label: 'Strength',
    icon: '💪',
    colorHex: '#ef4444',
    badgeBg: 'bg-red-950/70',
    badgeBorder: 'border-red-500/60',
    badgeText: 'text-red-300',
    statName: 'Strength',
  },
  stamina: {
    id: 'stamina',
    label: 'Stamina',
    icon: '🏃',
    colorHex: '#10b981',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-500/60',
    badgeText: 'text-emerald-300',
    statName: 'Stamina',
  },
  skills: {
    id: 'skills',
    label: 'Skills',
    icon: '🛠',
    colorHex: '#a855f7',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-500/60',
    badgeText: 'text-purple-300',
    statName: 'Skills',
  },
  health: {
    id: 'health',
    label: 'Health',
    icon: '❤️',
    colorHex: '#f43f5e',
    badgeBg: 'bg-rose-950/70',
    badgeBorder: 'border-rose-500/60',
    badgeText: 'text-rose-300',
    statName: 'Health',
  },
};

export interface QuestDifficultyConfig {
  id: QuestDifficulty;
  label: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  stars: string;
}

export const QUEST_DIFFICULTIES: Record<QuestDifficulty, QuestDifficultyConfig> = {
  easy: {
    id: 'easy',
    label: 'Easy',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-300',
    stars: '★☆☆',
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    badgeBg: 'bg-amber-950/80',
    badgeBorder: 'border-amber-500/50',
    badgeText: 'text-amber-300',
    stars: '★★☆',
  },
  hard: {
    id: 'hard',
    label: 'Hard',
    badgeBg: 'bg-red-950/80',
    badgeBorder: 'border-red-500/50',
    badgeText: 'text-red-300',
    stars: '★★★',
  },
};

const now = Date.now();
const todayDateStr = new Date().toISOString().split('T')[0];

export const INITIAL_QUESTS: Quest[] = [
  // TODAY'S QUESTS (Short-term real-life daily tasks)
  {
    id: 'today-1',
    title: 'Study DBMS for 2 hours',
    category: 'intelligence',
    difficulty: 'medium',
    createdAt: now - 15 * 60 * 1000,
    questDate: todayDateStr,
    deadline: now + 105 * 60 * 1000, // 1h 45m remaining
    durationLabel: '2 hours',
    questType: 'today',
    completed: false,
    status: 'active',
  },
  {
    id: 'today-2',
    title: 'Go to gym',
    category: 'strength',
    difficulty: 'hard',
    createdAt: now - 30 * 60 * 1000,
    questDate: todayDateStr,
    deadline: now + 90 * 60 * 1000, // 1h 30m remaining
    durationLabel: '2 hours',
    questType: 'today',
    completed: false,
    status: 'active',
  },
  {
    id: 'today-3',
    title: 'Practice Java for 1 hour',
    category: 'skills',
    difficulty: 'medium',
    createdAt: now - 10 * 60 * 1000,
    questDate: todayDateStr,
    deadline: now + 50 * 60 * 1000, // 50m remaining
    durationLabel: '1 hour',
    questType: 'today',
    completed: false,
    status: 'active',
  },

  // ACTIVE QUESTS (Longer-term multi-day ongoing missions)
  {
    id: 'active-1',
    title: 'Complete DBMS syllabus',
    category: 'intelligence',
    difficulty: 'hard',
    createdAt: now - 24 * 3600 * 1000,
    questDate: todayDateStr,
    deadline: now + 6 * 24 * 3600 * 1000, // 6 days remaining
    durationLabel: '7 days',
    questType: 'active',
    completed: false,
    status: 'active',
  },
  {
    id: 'active-2',
    title: 'Build portfolio project',
    category: 'skills',
    difficulty: 'hard',
    createdAt: now - 12 * 3600 * 1000,
    questDate: todayDateStr,
    deadline: now + 13 * 24 * 3600 * 1000 + 12 * 3600 * 1000, // ~14 days remaining
    durationLabel: '14 days',
    questType: 'active',
    completed: false,
    status: 'active',
  },
  {
    id: 'active-3',
    title: 'Complete Java course',
    category: 'skills',
    difficulty: 'medium',
    createdAt: now - 48 * 3600 * 1000,
    questDate: todayDateStr,
    deadline: now + 28 * 24 * 3600 * 1000, // 28 days remaining
    durationLabel: '30 days',
    questType: 'active',
    completed: false,
    status: 'active',
  },
];
