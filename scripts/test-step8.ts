import {
  LEAGUE_RANKS,
  INITIAL_LEAGUE,
  formatLeagueRank,
  formatLeagueRankWithEmoji,
  getLeagueIndex,
  getLeagueFromIndex,
  promoteLeague,
  demoteLeague,
  evaluateLeagueConsistency,
} from '../src/utils/league';
import { createInitialPlayerState, addPlayerXp } from '../src/utils/progression';
import { applyInactivityDecay, recordDailyActivity } from '../src/utils/streakDecay';
import { DEFAULT_CHARACTER } from '../src/types/character';
import type { PlayerState } from '../src/types/progression';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failCount++;
  }
}

console.log('--- RUNNING STEP 8 LEAGUE SYSTEM VERIFICATION TESTS ---\n');

// 1. New player starts at Bronze III
const newPlayer = createInitialPlayerState(DEFAULT_CHARACTER);
assert(newPlayer.league.tier === 'Bronze' && newPlayer.league.division === 'III', '1a. New player starts at Bronze III');
assert(formatLeagueRank(newPlayer.league) === 'Bronze III', '1b. Formats correctly as "Bronze III"');
assert(formatLeagueRankWithEmoji(newPlayer.league) === '🥉 Bronze III', '1c. Formats with emoji as "🥉 Bronze III"');

// 2. Rank progression order & exactly 13 ranks
const expectedRanks = [
  'Bronze III', 'Bronze II', 'Bronze I',
  'Silver III', 'Silver II', 'Silver I',
  'Gold III', 'Gold II', 'Gold I',
  'Diamond III', 'Diamond II', 'Diamond I',
  'Mythical'
];
assert(LEAGUE_RANKS.length === 13, '2a. Exactly 13 League ranks configured');
const formattedRanks = LEAGUE_RANKS.map((r) => formatLeagueRank({ tier: r.tier, division: r.division }));
assert(JSON.stringify(formattedRanks) === JSON.stringify(expectedRanks), '2b. Rank order strictly matches specifications');

// 3. Mythical has no division
const mythicalLeague = getLeagueFromIndex(12);
assert(mythicalLeague.tier === 'Mythical' && mythicalLeague.division === undefined, '3a. Mythical has no division');
assert(formatLeagueRank(mythicalLeague) === 'Mythical', '3b. Formatted Mythical without division');
assert(formatLeagueRankWithEmoji(mythicalLeague) === '👑 Mythical', '3c. Formatted Mythical with crown emoji "👑 Mythical"');

// 4. Promotion logic
let p = newPlayer;
const prom1 = promoteLeague(p);
assert(prom1.promoted === true && prom1.newLeague.tier === 'Bronze' && prom1.newLeague.division === 'II', '4a. Promote Bronze III -> Bronze II');
p = prom1.updatedPlayer;

const prom2 = promoteLeague(p);
assert(prom2.promoted === true && prom2.newLeague.tier === 'Bronze' && prom2.newLeague.division === 'I', '4b. Promote Bronze II -> Bronze I');
p = prom2.updatedPlayer;

const prom3 = promoteLeague(p);
assert(prom3.promoted === true && prom3.newLeague.tier === 'Silver' && prom3.newLeague.division === 'III', '4c. Promote Bronze I -> Silver III');

// 5. League never goes above Mythical
let topPlayer: PlayerState = {
  ...newPlayer,
  league: { tier: 'Mythical' },
};
const promTop = promoteLeague(topPlayer);
assert(promTop.promoted === false && promTop.newLeague.tier === 'Mythical', '5. League clamped at Mythical (never exceeds)');

// 6. Demotion logic
let silverPlayer: PlayerState = {
  ...newPlayer,
  league: { tier: 'Silver', division: 'III' },
};
const dem1 = demoteLeague(silverPlayer);
assert(dem1.demoted === true && dem1.newLeague.tier === 'Bronze' && dem1.newLeague.division === 'I', '6a. Demote Silver III -> Bronze I');

// 7. League never goes below Bronze III
let bottomPlayer: PlayerState = {
  ...newPlayer,
  league: { tier: 'Bronze', division: 'III' },
};
const demBottom = demoteLeague(bottomPlayer);
assert(demBottom.demoted === false && demBottom.newLeague.tier === 'Bronze' && demBottom.newLeague.division === 'III', '7. League clamped at Bronze III (never falls below)');

// 8. Level and League remain strictly independent
let highLevelLowLeague: PlayerState = {
  ...newPlayer,
  progression: { level: 50, xp: 200 },
  league: { tier: 'Silver', division: 'II' },
};
assert(highLevelLowLeague.progression.level === 50 && formatLeagueRank(highLevelLowLeague.league) === 'Silver II', '8a. Level 50 + Silver II is independent');

let lowLevelHighLeague: PlayerState = {
  ...newPlayer,
  progression: { level: 2, xp: 10 },
  league: { tier: 'Diamond', division: 'III' },
};
assert(lowLevelHighLeague.progression.level === 2 && formatLeagueRank(lowLevelHighLeague.league) === 'Diamond III', '8b. Level 2 + Diamond III is independent');

// 9. Consistency promotion integration via recordDailyActivity
let activityPlayer = { ...newPlayer, consistency: { streak: 6, lastActiveDate: '2026-09-10', lastHealthDecayDate: '2026-09-10', unlockedMilestones: [] }, league: { tier: 'Bronze', division: 'I' } as const };
let actRes = recordDailyActivity(activityPlayer, '2026-09-11');
assert(actRes.newStreak === 7, '9a. 7th day streak reached');
assert(actRes.updatedPlayer.league.tier === 'Silver' && actRes.updatedPlayer.league.division === 'III', '9b. Consistency promoted player to Silver III');
assert(actRes.leaguePromoted !== null, '9c. leaguePromoted payload returned');

// 10. Inactivity demotion integration via applyInactivityDecay
let inactivePlayer: PlayerState = {
  ...newPlayer,
  consistency: { streak: 10, lastActiveDate: '2026-09-10', lastHealthDecayDate: '2026-09-10' },
  league: { tier: 'Gold', division: 'II' },
};
// Reopen after 4 days of inactivity
let decayRes = applyInactivityDecay(inactivePlayer, '2026-09-14');
assert(decayRes.leagueDemoted !== null, '10a. Severe inactivity triggers league demotion');
assert(decayRes.updatedPlayer.league.tier === 'Gold' && decayRes.updatedPlayer.league.division === 'III', '10b. Demoted from Gold II to Gold III');

// 11. Existing XP & Health systems still work intact
let xpRes = addPlayerXp(newPlayer, 100);
assert(xpRes.updatedPlayer.progression.level === 2, '11. Level up progression intact (Level 1 -> 2)');

console.log(`\n========================================`);
console.log(`STEP 8 TOTAL PASSED: ${passCount} | TOTAL FAILED: ${failCount}`);
console.log(`========================================`);

if (failCount > 0) {
  process.exit(1);
}
