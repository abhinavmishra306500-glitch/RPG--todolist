import {
  getDaysBetweenDates,
  getYesterdayDateString,
  calculateCumulativeDecay,
  getNextStreakMilestone,
  applyInactivityDecay,
  recordDailyActivity,
  STREAK_MILESTONES,
} from '../src/utils/streakDecay';
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

function createTestPlayer(overrides: Partial<PlayerState> = {}): PlayerState {
  return {
    id: 'test_player',
    name: 'Hero',
    characterClass: 'warrior',
    avatar: 'sword',
    progression: {
      level: 10,
      currentXp: 50,
      xpToNextLevel: 100,
      skillLevels: { strength: 1, agility: 1, intelligence: 1, vitality: 1 },
      skillXp: { strength: 0, agility: 0, intelligence: 0, vitality: 0 },
    },
    stats: {
      health: 100,
      maxHealth: 100,
      mana: 50,
      maxMana: 50,
      strength: 10,
      agility: 10,
      intelligence: 10,
      vitality: 10,
    },
    economy: { gold: 100, gems: 0 },
    consistency: {
      streak: 0,
      lastActiveDate: '2026-09-10',
      lastHealthDecayDate: '2026-09-10',
      unlockedMilestones: [],
      levelDecayProcessed: false,
    },
    league: { currentTier: 'bronze', division: 1, points: 0 },
    ...overrides,
  };
}

console.log('--- RUNNING STEP 7 COMPREHENSIVE TESTS ---\n');

// 1. Complete one quest today: Streak = 1
let p = createTestPlayer({ consistency: { streak: 0, lastActiveDate: undefined, lastHealthDecayDate: undefined, unlockedMilestones: [] } });
let res = recordDailyActivity(p, '2026-09-10');
assert(res.newStreak === 1, '1. Complete one quest today -> Streak = 1');
assert(res.milestoneUnlocked === 1, '1b. Milestone 1 Day unlocked');
p = res.updatedPlayer;

// 2. Complete another quest tomorrow: Streak = 2
res = recordDailyActivity(p, '2026-09-11');
assert(res.newStreak === 2, '2. Complete another quest tomorrow -> Streak = 2');
assert(res.streakIncremented === true, '2b. streakIncremented is true');
p = res.updatedPlayer;

// 3. Complete quests for 3 consecutive days: Streak = 3 (Milestone 3 reached)
res = recordDailyActivity(p, '2026-09-12');
assert(res.newStreak === 3, '3. Complete quests for 3 consecutive days -> Streak = 3');
assert(res.milestoneUnlocked === 3, '3b. Milestone 3 Days unlocked');
p = res.updatedPlayer;

// 4. Reach 7, 14, 30, 100 days
const testMilestones = [
  { day: '2026-09-13', streak: 4, milestone: null },
  { day: '2026-09-14', streak: 5, milestone: null },
  { day: '2026-09-15', streak: 6, milestone: null },
  { day: '2026-09-16', streak: 7, milestone: 7 },
];
for (const step of testMilestones) {
  res = recordDailyActivity(p, step.day);
  p = res.updatedPlayer;
  if (step.milestone) {
    assert(res.newStreak === step.streak && res.milestoneUnlocked === step.milestone, `4. Reached milestone ${step.milestone} Days`);
  }
}

// 5. Miss one day: Streak breaks, NO immediate Health loss (Grace Period)
// Player was active on 2026-09-16. Next check on 2026-09-17 (Day 2 / 1st missed day)
let decayRes = applyInactivityDecay(p, '2026-09-17');
assert(decayRes.healthLost === 0 && decayRes.updatedPlayer.stats.health === 100, '5. Miss 1 day -> NO Health loss (Grace period, 100 HP)');

// 6 & 7. Miss multiple consecutive days: Health begins decreasing after grace period (100 -> 98 -> 96 -> 94...)
// Day 3 (2026-09-18): 2nd inactive day -> 98 HP
decayRes = applyInactivityDecay(decayRes.updatedPlayer, '2026-09-18');
assert(decayRes.updatedPlayer.stats.health === 98, '6. Day 3 (2nd inactive day) -> 98 HP (-2)');
assert(decayRes.streakBroken === true, '6b. Streak broken on 2nd inactive day');

// Day 4 (2026-09-19): 3rd inactive day -> 96 HP
decayRes = applyInactivityDecay(decayRes.updatedPlayer, '2026-09-19');
assert(decayRes.updatedPlayer.stats.health === 96, '7a. Day 4 (3rd inactive day) -> 96 HP (-2)');

// Day 5 (2026-09-20): 4th inactive day -> 94 HP
decayRes = applyInactivityDecay(decayRes.updatedPlayer, '2026-09-20');
assert(decayRes.updatedPlayer.stats.health === 94, '7b. Day 5 (4th inactive day) -> 94 HP (-2)');

// 8. Health cannot go below 0
let lowHpPlayer = createTestPlayer({
  stats: { health: 4, maxHealth: 100, mana: 50, maxMana: 50, strength: 10, agility: 10, intelligence: 10, vitality: 10 },
  consistency: { streak: 5, lastActiveDate: '2026-09-01', lastHealthDecayDate: '2026-09-01', unlockedMilestones: [1, 3] },
});
let lowHpDecay = applyInactivityDecay(lowHpPlayer, '2026-09-20');
assert(lowHpDecay.updatedPlayer.stats.health === 0, '8. Health cannot go below 0 (floored at 0)');

// 9. Health reaches 0: Level decreases by 1
assert(lowHpDecay.updatedPlayer.progression.level === 9, '9. Health reaches 0 -> Level decreases from 10 to 9');
assert(lowHpDecay.levelDecayed === true, '9b. levelDecayed is true');

// 10. Refresh repeatedly while Health = 0: Level must NOT repeatedly decrease
let refresh1 = applyInactivityDecay(lowHpDecay.updatedPlayer, '2026-09-20');
assert(refresh1.updatedPlayer.progression.level === 9, '10a. Refresh same day at 0 HP -> Level remains 9');

let nextDayAtZero = applyInactivityDecay(lowHpDecay.updatedPlayer, '2026-09-21');
assert(nextDayAtZero.updatedPlayer.progression.level === 9, '10b. Next day check at 0 HP with levelDecayProcessed -> Level protected at 9');

// 11. Complete a Health quest / recovery: levelDecayProcessed resets when health > 0
let recoveredPlayer = {
  ...nextDayAtZero.updatedPlayer,
  stats: { ...nextDayAtZero.updatedPlayer.stats, health: 10 },
};
let reDecay = applyInactivityDecay({
  ...recoveredPlayer,
  consistency: { ...recoveredPlayer.consistency, lastActiveDate: '2026-09-21', lastHealthDecayDate: '2026-09-21' },
}, '2026-09-30');
assert(reDecay.updatedPlayer.stats.health === 0, '11a. Decay drops HP back to 0');
assert(reDecay.updatedPlayer.progression.level === 8, '11b. New 0-HP event triggers fresh level decay to 8');

// 12. Close the app for several days: Correct inactivity calculated when reopening
let multiDayPlayer = createTestPlayer({
  consistency: { streak: 10, lastActiveDate: '2026-09-10', lastHealthDecayDate: '2026-09-10' },
});
// Reopened 5 days later (2026-09-15): 5 days passed -> (5-1)*2 = 8 decay -> 92 HP
let multiDayDecay = applyInactivityDecay(multiDayPlayer, '2026-09-15');
assert(multiDayDecay.updatedPlayer.stats.health === 92, '13. Reopening after 5 days calculates 8 HP decay (100 -> 92 HP)');

// 16. One meaningful quest is enough to restart streak and maintain activity
let restartRes = recordDailyActivity(multiDayDecay.updatedPlayer, '2026-09-15');
assert(restartRes.newStreak === 1, '16. One quest on active day restarts streak = 1');

// 17. Same day does NOT increase streak multiple times
let sameDayRes = recordDailyActivity(restartRes.updatedPlayer, '2026-09-15');
assert(sameDayRes.newStreak === 1, '17a. Same day 2nd quest retains streak = 1');
assert(sameDayRes.streakIncremented === false, '17b. streakIncremented is false on same day');

// Next Milestone helper check
assert(getNextStreakMilestone(1) === 3, 'Next milestone after 1 is 3');
assert(getNextStreakMilestone(3) === 7, 'Next milestone after 3 is 7');
assert(getNextStreakMilestone(7) === 14, 'Next milestone after 7 is 14');
assert(getNextStreakMilestone(14) === 30, 'Next milestone after 14 is 30');
assert(getNextStreakMilestone(30) === 100, 'Next milestone after 30 is 100');
assert(getNextStreakMilestone(100) === null, 'Next milestone after 100 is null (Max achieved)');

console.log(`\n========================================`);
console.log(`TOTAL PASSED: ${passCount} | TOTAL FAILED: ${failCount}`);
console.log(`========================================`);

if (failCount > 0) {
  process.exit(1);
}
