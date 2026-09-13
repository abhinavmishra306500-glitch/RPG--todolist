import type { CharacterProfile } from './character';
import type { MapProgressionState } from './map';
import type { PlayerPetsState } from './pet';
import type { PlayerCosmeticsState } from './cosmetics';
import type { PlayerHomeState } from './home';

export type LeagueTier = 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Mythical';
export type LeagueDivision = 'III' | 'II' | 'I';

export interface PlayerProgression {
  level: number; // Starts at 1, cannot go below 1
  xp: number;    // Starts at 0, earned, not spent
}

export interface PlayerStats {
  health: number;       // Starts at 100, max 100
  intelligence: number; // Starts at 0
  strength: number;     // Starts at 0
  stamina: number;      // Starts at 0
  skills: number;       // Starts at 0
}

export interface PlayerEconomy {
  gold: number;         // Starts at 0
}

export interface PlayerConsistency {
  streak: number; // Starts at 0
  lastActiveDate?: string; // YYYY-MM-DD of last completed quest
  lastHealthDecayDate?: string; // YYYY-MM-DD of last decay check
  levelDecayProcessed?: boolean; // Protects against repeated level decay when HP is 0
  unlockedMilestones?: number[]; // [1, 3, 7, 14, 30, 100]
}

export interface PlayerLeague {
  tier: LeagueTier; // Starts at 'Bronze'
  division?: LeagueDivision; // 'III' | 'II' | 'I' (undefined for Mythical)
  name?: LeagueTier; // Optional backwards-compatible property
}

export interface PlayerState {
  character: CharacterProfile;
  progression: PlayerProgression;
  stats: PlayerStats;
  economy: PlayerEconomy;
  consistency: PlayerConsistency;
  league: PlayerLeague;
  map?: MapProgressionState;
  pets?: PlayerPetsState;
  cosmetics?: PlayerCosmeticsState;
  home?: PlayerHomeState;
}

export interface LeagueConfig {
  name: LeagueTier;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  icon: string;
  description: string;
}

export const LEAGUE_CONFIGS: Record<LeagueTier, LeagueConfig> = {
  Bronze: {
    name: 'Bronze',
    badgeBg: 'bg-amber-950/80',
    badgeBorder: 'border-amber-700',
    badgeText: 'text-amber-300',
    icon: '🛡️',
    description: 'Novice Adventurer League',
  },
  Silver: {
    name: 'Silver',
    badgeBg: 'bg-slate-800/80',
    badgeBorder: 'border-slate-400',
    badgeText: 'text-slate-200',
    icon: '⚔️',
    description: 'Veteran Quester League',
  },
  Gold: {
    name: 'Gold',
    badgeBg: 'bg-yellow-950/80',
    badgeBorder: 'border-yellow-500',
    badgeText: 'text-yellow-300',
    icon: '👑',
    description: 'Champion League',
  },
  Diamond: {
    name: 'Diamond',
    badgeBg: 'bg-cyan-950/80',
    badgeBorder: 'border-cyan-400',
    badgeText: 'text-cyan-300',
    icon: '💎',
    description: 'Master Paragon League',
  },
  Mythical: {
    name: 'Mythical',
    badgeBg: 'bg-purple-950/80',
    badgeBorder: 'border-purple-400',
    badgeText: 'text-purple-300',
    icon: '🌟',
    description: 'Mythical Legend League',
  },
};
