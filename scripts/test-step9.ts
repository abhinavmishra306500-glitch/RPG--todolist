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
assert(initialProg.currentMapLevel === 11, 'Initial map level is 11');
assert(initialProg.maxUnlockedLevel === 11, 'Max unlocked level initially is 11');
assert(initialProg.completedLevels.length === 0, 'No levels completed initially');

// Test 4: Node States at Level 11
assert(getMapNodeState(11, initialProg) === 'current', 'Level 11 is "current" initially');
assert(getMapNodeState(12, initialProg) === 'locked', 'Level 12 is "locked" initially before 11 is completed');
assert(getMapNodeState(13, initialProg) === 'locked', 'Level 13 is "locked" initially');
assert(getMapNodeState(20, initialProg) === 'locked', 'Level 20 is "locked" initially');

// Test 5: Can Advance Logic
assert(canAdvanceToLevel(11, initialProg) === false, 'Cannot advance to already current level 11');
assert(canAdvanceToLevel(12, initialProg) === true, 'Can advance from 11 to 12 (sequential next)');
assert(canAdvanceToLevel(13, initialProg) === false, 'Cannot skip level 12 to jump to 13');
assert(canAdvanceToLevel(10, initialProg) === false, 'Cannot move backwards to level 10');

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
assert(player.map?.currentMapLevel === 11, 'PlayerState map starts at Level 11');
assert(player.progression.level === 1, 'PlayerState RPG Level remains 1 (Map level is independent of RPG Level)');
assert(player.economy.gold === 0, 'PlayerState Gold remains 0');
assert(player.league.name === 'Bronze', 'PlayerState League remains Bronze');

// Test 7: Sequential advance 11 -> 12
const res11 = advanceMapLevel(player);
assert(res11.advanced === true, 'Successfully advanced from 11');
assert(res11.fromLevel === 11 && res11.toLevel === 12, 'Advanced from 11 to 12');
player = res11.updatedPlayer;
assert(player.map?.currentMapLevel === 12, 'Player map level is now 12');
assert(player.map?.completedLevels.includes(11), 'Level 11 is recorded in completedLevels');
assert(getMapNodeState(11, player.map!) === 'completed', 'Level 11 node is completed');
assert(getMapNodeState(12, player.map!) === 'current', 'Level 12 node is current');
assert(getMapNodeState(13, player.map!) === 'locked', 'Level 13 node is locked');

// Test 8: Waypoints Path calculation
const waypoints11to12 = getPathWaypointsBetweenLevels(11, 12);
assert(waypoints11to12.length >= 2, 'Waypoints path between 11 and 12 has at least start and end point');
assert(waypoints11to12[0].x === SILVER_VILLAGE_LEVELS[0].position.x, 'First waypoint matches Level 11 coords');

// Test 9: Normalizer
const normalized = normalizeMapProgression(null);
assert(normalized.currentMapLevel === 11, 'Normalized null map returns level 11');
assert(normalized.completedLevels.length === 0, 'Normalized null map returns empty completed list');

console.log('✨ ALL FULL-SCREEN WORLD MAP TESTS PASSED SUCCESSFULLY! ✨');
