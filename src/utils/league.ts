import type { LeagueTier, LeagueDivision, PlayerLeague, PlayerState } from '../types/progression';

export interface LeagueRankDef {
  tier: LeagueTier;
  division?: LeagueDivision;
  minStreak: number;
}

/**
 * Ordered list of all 13 League Ranks from lowest (Bronze III) to highest (Mythical).
 */
export const LEAGUE_RANKS: readonly LeagueRankDef[] = [
  { tier: 'Bronze', division: 'III', minStreak: 0 },
  { tier: 'Bronze', division: 'II', minStreak: 2 },
  { tier: 'Bronze', division: 'I', minStreak: 4 },
  { tier: 'Silver', division: 'III', minStreak: 7 },
  { tier: 'Silver', division: 'II', minStreak: 10 },
  { tier: 'Silver', division: 'I', minStreak: 14 },
  { tier: 'Gold', division: 'III', minStreak: 20 },
  { tier: 'Gold', division: 'II', minStreak: 25 },
  { tier: 'Gold', division: 'I', minStreak: 30 },
  { tier: 'Diamond', division: 'III', minStreak: 45 },
  { tier: 'Diamond', division: 'II', minStreak: 60 },
  { tier: 'Diamond', division: 'I', minStreak: 75 },
  { tier: 'Mythical', minStreak: 100 },
] as const;

export const INITIAL_LEAGUE: PlayerLeague = {
  tier: 'Bronze',
  division: 'III',
};

/**
 * Normalizes any league object (including legacy { name: 'Bronze' } formats) to a valid PlayerLeague.
 */
export const normalizeLeague = (league: Partial<PlayerLeague> | null | undefined): PlayerLeague => {
  if (!league) return { tier: 'Bronze', division: 'III', name: 'Bronze' };
  const tier: LeagueTier = league.tier || (league.name as LeagueTier) || 'Bronze';
  if (tier === 'Mythical') {
    return { tier: 'Mythical', name: 'Mythical' };
  }
  const division: LeagueDivision = league.division || 'III';
  return { tier, division, name: tier };
};

/**
 * Returns emoji for the given league tier.
 */
export const getLeagueEmoji = (tier: LeagueTier | string | null | undefined): string => {
  switch (tier) {
    case 'Bronze':
      return '🥉';
    case 'Silver':
      return '🥈';
    case 'Gold':
      return '🥇';
    case 'Diamond':
      return '💎';
    case 'Mythical':
      return '👑';
    default:
      return '🥉';
  }
};

/**
 * Returns formatted rank string (e.g., "Bronze III" or "Mythical").
 */
export const formatLeagueRank = (league: Partial<PlayerLeague> | null | undefined): string => {
  const norm = normalizeLeague(league);
  if (norm.tier === 'Mythical') return 'Mythical';
  return `${norm.tier} ${norm.division || 'III'}`;
};

/**
 * Returns formatted rank string with emoji (e.g., "🥉 Bronze III" or "👑 Mythical").
 */
export const formatLeagueRankWithEmoji = (league: Partial<PlayerLeague> | null | undefined): string => {
  const norm = normalizeLeague(league);
  const emoji = getLeagueEmoji(norm.tier);
  const text = formatLeagueRank(norm);
  return `${emoji} ${text}`;
};

/**
 * Finds index (0 to 12) of a given league.
 */
export const getLeagueIndex = (league: Partial<PlayerLeague> | null | undefined): number => {
  const norm = normalizeLeague(league);
  const idx = LEAGUE_RANKS.findIndex((r) => {
    if (r.tier === 'Mythical' && norm.tier === 'Mythical') return true;
    return r.tier === norm.tier && r.division === norm.division;
  });
  return idx >= 0 ? idx : 0;
};

/**
 * Returns PlayerLeague object for a rank index (0 to 12).
 */
export const getLeagueFromIndex = (index: number): PlayerLeague => {
  const safeIndex = Math.max(0, Math.min(LEAGUE_RANKS.length - 1, index));
  const rank = LEAGUE_RANKS[safeIndex];
  if (rank.tier === 'Mythical') {
    return { tier: 'Mythical', name: 'Mythical' };
  }
  return { tier: rank.tier, division: rank.division, name: rank.tier };
};

export interface LeagueVisualConfig {
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  emoji: string;
  label: string;
  description: string;
}

/**
 * Returns rich styling metadata for a league.
 */
export const getLeagueVisualConfig = (league: Partial<PlayerLeague> | null | undefined): LeagueVisualConfig => {
  const norm = normalizeLeague(league);
  const tier = norm.tier;
  const label = formatLeagueRank(norm);
  const emoji = getLeagueEmoji(tier);

  switch (tier) {
    case 'Bronze':
      return {
        badgeBg: 'bg-amber-950/80',
        badgeBorder: 'border-amber-700/70',
        badgeText: 'text-amber-300',
        glowColor: 'rgba(217, 119, 6, 0.4)',
        emoji,
        label,
        description: 'Novice Adventurer Division',
      };
    case 'Silver':
      return {
        badgeBg: 'bg-slate-800/90',
        badgeBorder: 'border-slate-400/80',
        badgeText: 'text-slate-200',
        glowColor: 'rgba(148, 163, 184, 0.5)',
        emoji,
        label,
        description: 'Veteran Quester Division',
      };
    case 'Gold':
      return {
        badgeBg: 'bg-yellow-950/90',
        badgeBorder: 'border-yellow-500/80',
        badgeText: 'text-yellow-300',
        glowColor: 'rgba(234, 179, 8, 0.5)',
        emoji,
        label,
        description: 'Champion Division',
      };
    case 'Diamond':
      return {
        badgeBg: 'bg-cyan-950/90',
        badgeBorder: 'border-cyan-400/80',
        badgeText: 'text-cyan-300',
        glowColor: 'rgba(6, 182, 212, 0.6)',
        emoji,
        label,
        description: 'Master Paragon Division',
      };
    case 'Mythical':
      return {
        badgeBg: 'bg-purple-950/90',
        badgeBorder: 'border-purple-400/90',
        badgeText: 'text-purple-300',
        glowColor: 'rgba(168, 85, 247, 0.7)',
        emoji,
        label,
        description: 'Mythical Legend (Highest Rank)',
      };
  }
};

/**
 * Promotes player by 1 rank (clamped at Mythical).
 */
export const promoteLeague = (
  player: PlayerState
): {
  updatedPlayer: PlayerState;
  promoted: boolean;
  oldLeague: PlayerLeague;
  newLeague: PlayerLeague;
} => {
  const currentIndex = getLeagueIndex(player.league);
  const maxIndex = LEAGUE_RANKS.length - 1;
  const oldLeague = player.league;

  if (currentIndex >= maxIndex) {
    return {
      updatedPlayer: player,
      promoted: false,
      oldLeague,
      newLeague: oldLeague,
    };
  }

  const nextLeague = getLeagueFromIndex(currentIndex + 1);
  const updatedPlayer: PlayerState = {
    ...player,
    league: nextLeague,
  };

  return {
    updatedPlayer,
    promoted: true,
    oldLeague,
    newLeague: nextLeague,
  };
};

/**
 * Demotes player by 1 rank (clamped at Bronze III).
 */
export const demoteLeague = (
  player: PlayerState
): {
  updatedPlayer: PlayerState;
  demoted: boolean;
  oldLeague: PlayerLeague;
  newLeague: PlayerLeague;
} => {
  const currentIndex = getLeagueIndex(player.league);
  const oldLeague = player.league;

  if (currentIndex <= 0) {
    return {
      updatedPlayer: player,
      demoted: false,
      oldLeague,
      newLeague: oldLeague,
    };
  }

  const prevLeague = getLeagueFromIndex(currentIndex - 1);
  const updatedPlayer: PlayerState = {
    ...player,
    league: prevLeague,
  };

  return {
    updatedPlayer,
    demoted: true,
    oldLeague,
    newLeague: prevLeague,
  };
};

/**
 * Evaluates league based on recent streak consistency:
 * - Increases rank when streak reaches higher tier thresholds.
 * - Demotes by 1 rank if consistency broke significantly or during severe inactivity.
 */
export const evaluateLeagueConsistency = (
  player: PlayerState
): {
  updatedPlayer: PlayerState;
  change: 'promoted' | 'demoted' | 'none';
  oldLeague: PlayerLeague;
  newLeague: PlayerLeague;
} => {
  const streak = player.consistency.streak;
  const currentIdx = getLeagueIndex(player.league);
  const oldLeague = player.league;

  // Find target rank based on streak threshold
  let targetIdx = 0;
  for (let i = LEAGUE_RANKS.length - 1; i >= 0; i--) {
    if (streak >= LEAGUE_RANKS[i].minStreak) {
      targetIdx = i;
      break;
    }
  }

  if (targetIdx > currentIdx) {
    // Promotion!
    const newLeague = getLeagueFromIndex(targetIdx);
    return {
      updatedPlayer: { ...player, league: newLeague },
      change: 'promoted',
      oldLeague,
      newLeague,
    };
  }

  return {
    updatedPlayer: player,
    change: 'none',
    oldLeague,
    newLeague: oldLeague,
  };
};
