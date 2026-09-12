import {
  ALL_MAP_WORLDS,
  DIAMOND_CITY_LEVELS,
  GOLD_CITY_LEVELS,
  SILVER_VILLAGE_LEVELS,
  BRONZE_VILLAGE_LEVELS,
  getMapLevelDef,
  getWorldById,
  getWorldByLevel,
  advanceMapLevel,
  regressMapLevel,
  getPathWaypointsBetweenLevels,
  normalizeMapProgression,
  getMapNodeState,
} from '../src/utils/mapData';
import type { PlayerState } from '../src/types/progression';

console.log('💎 Running Diamond City (World 4) Verification Test Suite...\n');

// Test 1: Verify World Definitions
const diamondWorld = getWorldById('diamond-city');
if (!diamondWorld) {
  throw new Error('❌ Diamond City world definition not found!');
}
console.log('✅ Test 1 Passed: Diamond City world found with badge:', diamondWorld.badge, diamondWorld.name);

// Test 2: Verify Level Count & Boundaries
if (DIAMOND_CITY_LEVELS.length !== 10) {
  throw new Error(`❌ Expected 10 levels in Diamond City, found ${DIAMOND_CITY_LEVELS.length}`);
}
if (DIAMOND_CITY_LEVELS[0].levelNumber !== 31 || DIAMOND_CITY_LEVELS[9].levelNumber !== 40) {
  throw new Error('❌ Diamond City levels must range strictly from Level 31 to Level 40');
}
console.log('✅ Test 2 Passed: Diamond City spans exactly Levels 31 - 40.');

// Test 3: Verify All Level Coordinates and Waypoints
DIAMOND_CITY_LEVELS.forEach((lvl) => {
  if (lvl.position.x < 0 || lvl.position.x > 1000 || lvl.position.y < 0 || lvl.position.y > 1000) {
    throw new Error(`❌ Level ${lvl.levelNumber} position out of bounds: (${lvl.position.x}, ${lvl.position.y})`);
  }
  if (lvl.levelNumber < 40) {
    if (!lvl.pathPointsToNext || lvl.pathPointsToNext.length === 0) {
      throw new Error(`❌ Level ${lvl.levelNumber} missing pathPointsToNext waypoints!`);
    }
    lvl.pathPointsToNext.forEach((pt, idx) => {
      if (pt.x < 0 || pt.x > 1000 || pt.y < 0 || pt.y > 1000) {
        throw new Error(`❌ Level ${lvl.levelNumber} waypoint ${idx} out of bounds: (${pt.x}, ${pt.y})`);
      }
    });
  }
});
console.log('✅ Test 3 Passed: All Diamond City level coordinates and invisible path waypoints are within [0, 1000] boundaries.');

// Test 4: Path waypoint generation from Level 31 to 32, 33, ... 40
for (let l = 31; l < 40; l++) {
  const waypoints = getPathWaypointsBetweenLevels(l, l + 1);
  if (waypoints.length < 2) {
    throw new Error(`❌ Waypoints from Level ${l} to ${l + 1} must include at least start and end positions!`);
  }
}
console.log('✅ Test 4 Passed: Path waypoints generated seamlessly for all 10 Diamond City levels.');

// Test 5: Verify World Transitions & Progression Logic
const mockPlayer: PlayerState = {
  character: {
    name: 'Crystal Hero',
    gender: 'female',
    skinTone: 'fair',
    hairStyle: 'long',
    hairColor: 'silver',
    outfit: 'adventurer',
    outfitColor: 'cyan',
    league: 'diamond',
    equippedPet: 'crystal-fox',
  },
  stats: {
    strength: 50,
    intelligence: 50,
    endurance: 50,
    agility: 50,
    charisma: 50,
    vitality: 50,
  },
  level: 30,
  experience: 0,
  experienceToNextLevel: 1000,
  health: 100,
  maxHealth: 100,
  gold: 500,
  league: 'diamond',
  map: {
    currentMapLevel: 30,
    completedLevels: Array.from({ length: 29 }, (_, i) => i + 1),
    selectedWorldId: 'gold-city',
  },
  inventory: [],
  quests: [],
  achievements: [],
  streakDays: 30,
};

// Advancing from Level 30 (Gold City) to Level 31 (Diamond City)
const res31 = advanceMapLevel(mockPlayer);
if (!res31.advanced || res31.toLevel !== 31) {
  throw new Error('❌ Failed to advance from Level 30 to Level 31!');
}
const world31 = getWorldByLevel(31);
if (world31.id !== 'diamond-city') {
  throw new Error(`❌ Level 31 should be in diamond-city, got ${world31.id}`);
}
console.log('✅ Test 5 Passed: Successfully transitioned from Gold City (L30) to Diamond City (L31).');

// Advancing step by step through all Diamond City levels
let curPlayer = res31.updatedPlayer;
for (let lvl = 31; lvl < 40; lvl++) {
  const stepRes = advanceMapLevel(curPlayer);
  if (!stepRes.advanced || stepRes.toLevel !== lvl + 1) {
    throw new Error(`❌ Failed to advance from Level ${lvl} to Level ${lvl + 1}`);
  }
  curPlayer = stepRes.updatedPlayer;
}
if (curPlayer.map.currentMapLevel !== 40) {
  throw new Error(`❌ Expected currentMapLevel to be 40, got ${curPlayer.map.currentMapLevel}`);
}
console.log('✅ Test 6 Passed: Walked through all Diamond City levels up to Level 40 (Supreme Floating Diamond Core).');

// Test 7: Dev Step Backward functionality in Diamond City
const backRes = regressMapLevel(curPlayer);
if (!backRes.regressed || backRes.toLevel !== 39) {
  throw new Error(`❌ Expected to regress to Level 39, got ${backRes.toLevel}`);
}
console.log('✅ Test 7 Passed: Dev Step Backward from Level 40 to 39 works smoothly.');

console.log('\n💎 ALL DIAMOND CITY UNIT TESTS PASSED SUCCESSFULLY! 💎\n');
