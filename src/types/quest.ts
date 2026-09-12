export type QuestCategory = 'intelligence' | 'strength' | 'stamina' | 'skills' | 'health';

export type QuestDifficulty = 'easy' | 'medium' | 'hard';

export interface Quest {
  id: string;
  title: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  deadline: string;
  completed: boolean;
  createdAt: number;
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

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'quest-1',
    title: 'Study DBMS for 2 hours',
    category: 'intelligence',
    difficulty: 'medium',
    deadline: 'Today',
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'quest-2',
    title: 'Go to gym',
    category: 'strength',
    difficulty: 'hard',
    deadline: 'Today',
    completed: false,
    createdAt: Date.now() - 7200000,
  },
  {
    id: 'quest-3',
    title: 'Practice Java for 1 hour',
    category: 'skills',
    difficulty: 'medium',
    deadline: 'Today',
    completed: false,
    createdAt: Date.now() - 10800000,
  },
];
