import type { LeagueTier } from './progression';

export type PetRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
export type PetUnlockType = 'gold' | 'quests' | 'streak' | 'league' | 'complex';

export interface PetUnlockRequirement {
  type: PetUnlockType;
  goldPrice?: number;
  minLevel?: number;
  minStreak?: number;
  minLeague?: LeagueTier;
  minQuestsCompleted?: number;
  specialAchievement?: string;
  description: string;
}

export interface PetDef {
  id: string;
  name: string;
  species: string;
  emoji: string;
  rarity: PetRarity;
  description: string;
  lore: string;
  price: number; // Gold cost (0 if non-gold / achievement only)
  requirement: PetUnlockRequirement;
  primaryColor: string;
  accentColor: string;
  glowColor: string;
}

export interface PlayerPetsState {
  ownedPetIds: string[];
  equippedPetId: string | null;
  devLockedPetIds?: string[];
}

export const PET_RARITY_CONFIGS: Record<
  PetRarity,
  {
    name: PetRarity;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    glowHex: string;
    order: number;
  }
> = {
  Common: {
    name: 'Common',
    badgeBg: 'bg-slate-800/80',
    badgeBorder: 'border-slate-500',
    badgeText: 'text-slate-300',
    glowHex: '#94a3b8',
    order: 1,
  },
  Uncommon: {
    name: 'Uncommon',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-500',
    badgeText: 'text-emerald-300',
    glowHex: '#10b981',
    order: 2,
  },
  Rare: {
    name: 'Rare',
    badgeBg: 'bg-blue-950/80',
    badgeBorder: 'border-blue-500',
    badgeText: 'text-blue-300',
    glowHex: '#3b82f6',
    order: 3,
  },
  Epic: {
    name: 'Epic',
    badgeBg: 'bg-purple-950/80',
    badgeBorder: 'border-purple-500',
    badgeText: 'text-purple-300',
    glowHex: '#a855f7',
    order: 4,
  },
  Legendary: {
    name: 'Legendary',
    badgeBg: 'bg-amber-950/80',
    badgeBorder: 'border-amber-400',
    badgeText: 'text-amber-300',
    glowHex: '#f59e0b',
    order: 5,
  },
};
