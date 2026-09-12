import {
  ALL_MAP_WORLDS,
  BRONZE_VILLAGE_WORLD,
  SILVER_VILLAGE_WORLD,
  GOLD_CITY_WORLD,
  DIAMOND_CITY_WORLD,
  MYTHICAL_CASTLE_WORLD,
  INITIAL_MAP_PROGRESSION,
  getMapNodeState,
  canAdvanceToLevel,
  advanceMapLevel,
  normalizeMapProgression,
  getPathWaypointsBetweenLevels,
  getWorldByLevel,
  getWorldByTier,
  getWorldById,
  SILVER_VILLAGE_LEVELS,
} from '../src/utils/mapData';
import { createInitialPlayerState } from '../src/utils/progression';
import type { CharacterProfile } from '../src/types/character';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('--- RUNNING FULL-SCREEN 2D RPG WORLD MAP & CHARACTER TRAVEL TESTS ---');

// Test 1: All 5 Worlds Defined
assert(ALL_MAP_WORLDS.length === 5, 'Exactly 5 League worlds defined');
assert(BRONZE_VILLAGE_WORLD.startLevel === 1 && BRONZE_VILLAGE_WORLD.endLevel === 10, 'Bronze Village is levels 1-10');
assert(SILVER_VILLAGE_WORLD.startLevel === 11 && SILVER_VILLAGE_WORLD.endLevel === 20, 'Silver Village is levels 11-20');
assert(GOLD_CITY_WORLD.startLevel === 21 && GOLD_CITY_WORLD.endLevel === 30, 'Gold City is levels 21-30');
assert(DIAMOND_CITY_WORLD.startLevel === 31 && DIAMOND_CITY_WORLD.endLevel === 40, 'Diamond City is levels 31-40');
assert(MYTHICAL_CASTLE_WORLD.startLevel === 41 && MYTHICAL_CASTLE_WORLD.endLevel === 50, 'Mythical Castle is levels 41-50');

// Test 2: World Query Helpers
assert(getWorldByLevel(5).id === 'bronze-village', 'Level 5 belongs to Bronze Village');
assert(getWorldByLevel(15).id === 'silver-village', 'Level 15 belongs to Silver Village');
assert(getWorldByLevel(25).id === 'gold-city', 'Level 25 belongs to Gold City');
assert(getWorldByLevel(35).id === 'diamond-city', 'Level 35 belongs to Diamond City');
assert(getWorldByLevel(45).id === 'mythical-castle', 'Level 45 belongs to Mythical Castle');

assert(getWorldByTier('Bronze').id === 'bronze-village', 'Bronze tier maps to Bronze Village');
assert(getWorldByTier('Silver').id === 'silver-village', 'Silver tier maps to Silver Village');
assert(getWorldByTier('Gold').id === 'gold-city', 'Gold tier maps to Gold City');
assert(getWorldByTier('Diamond').id === 'diamond-city', 'Diamond tier maps to Diamond City');
assert(getWorldByTier('Mythical').id === 'mythical-castle', 'Mythical tier maps to Mythical Castle');

// Test 3: Initial Progression State
const initialProg = INITIAL_MAP_PROGRESSION;
assert(initialProg.currentMapLevel === 1, 'Initial map level is 1');
assert(initialProg.maxUnlockedLevel === 1, 'Max unlocked level initially is 1');
assert(initialProg.completedLevels.length === 0, 'No levels completed initially');

// Test 4: Node States at Level 1
assert(getMapNodeState(1, initialProg) === 'current', 'Level 1 is "current" initially');
assert(getMapNodeState(2, initialProg) === 'locked', 'Level 2 is "locked" initially before 1 is completed');
assert(getMapNodeState(3, initialProg) === 'locked', 'Level 3 is "locked" initially');
assert(getMapNodeState(10, initialProg) === 'locked', 'Level 10 is "locked" initially');

// Test 5: Can Advance Logic
assert(canAdvanceToLevel(1, initialProg) === false, 'Cannot advance to already current level 1');
assert(canAdvanceToLevel(2, initialProg) === true, 'Can advance from 1 to 2 (sequential next)');
assert(canAdvanceToLevel(3, initialProg) === false, 'Cannot skip level 2 to jump to 3');
assert(canAdvanceToLevel(0, initialProg) === false, 'Cannot move backwards to level 0');

// Test 6: Advancing Map Level with PlayerState
const mockChar: CharacterProfile = {
  name: 'Hero',
  gender: 'male',
  skinColor: '#fcd34d',
  hairStyle: 'short',
  hairColor: '#451a03',
  outfit: 'adventurer',
  outfitColor: '#2563eb',
  createdAt: new Date().toISOString(),
};
let player = createInitialPlayerState(mockChar);
assert(player.map !== undefined, 'PlayerState contains map progression state');
assert(player.map?.currentMapLevel === 1, 'PlayerState map starts at Level 1');
assert(player.progression.level === 1, 'PlayerState RPG Level remains 1 (Map level is independent of RPG Level)');
assert(player.economy.gold === 0, 'PlayerState Gold remains 0');
assert(player.league.name === 'Bronze', 'PlayerState League remains Bronze');

// Test 7: Sequential advance 1 -> 2
const res1 = advanceMapLevel(player);
assert(res1.advanced === true, 'Successfully advanced from 1');
assert(res1.fromLevel === 1 && res1.toLevel === 2, 'Advanced from 1 to 2');
player = res1.updatedPlayer;
assert(player.map?.currentMapLevel === 2, 'Player map level is now 2');
assert(player.map?.completedLevels.includes(1), 'Level 1 is recorded in completedLevels');
assert(getMapNodeState(1, player.map!) === 'completed', 'Level 1 node is completed');
assert(getMapNodeState(2, player.map!) === 'current', 'Level 2 node is current');
assert(getMapNodeState(3, player.map!) === 'locked', 'Level 3 node is locked');

// Test 8: Waypoints Path calculation
const waypoints1to2 = getPathWaypointsBetweenLevels(1, 2);
assert(waypoints1to2.length >= 2, 'Waypoints path between 1 and 2 has at least start and end point');
assert(waypoints1to2[0].x === 100, 'First waypoint matches Level 1 coords');

// Test 9: Normalizer
const normalized = normalizeMapProgression(null);
assert(normalized.currentMapLevel === 1, 'Normalized null map returns level 1');
assert(normalized.completedLevels.length === 0, 'Normalized null map returns empty completed list');

console.log('✨ ALL FULL-SCREEN WORLD MAP TESTS PASSED SUCCESSFULLY! ✨');
