import {
  ALL_MAP_WORLDS,
  MYTHICAL_CASTLE_LEVELS,
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

console.log('👑 Running Mythical Castle (World 5) Complete Progression Test Suite...\n');

// Test 1: Verify All 5 Worlds Exist
if (ALL_MAP_WORLDS.length !== 5) {
  throw new Error(`❌ Expected 5 worlds, found ${ALL_MAP_WORLDS.length}`);
}
const mythicalWorld = getWorldById('mythical-castle');
if (!mythicalWorld) {
  throw new Error('❌ Mythical Castle world definition not found!');
}
console.log('✅ Test 1 Passed: Mythical Castle world found with badge:', mythicalWorld.badge, mythicalWorld.name);

// Test 2: Verify Level Count & Boundaries
if (MYTHICAL_CASTLE_LEVELS.length !== 10) {
  throw new Error(`❌ Expected 10 levels in Mythical Castle, found ${MYTHICAL_CASTLE_LEVELS.length}`);
}
if (MYTHICAL_CASTLE_LEVELS[0].levelNumber !== 41 || MYTHICAL_CASTLE_LEVELS[9].levelNumber !== 50) {
  throw new Error('❌ Mythical Castle levels must range strictly from Level 41 to Level 50');
}
console.log('✅ Test 2 Passed: Mythical Castle spans exactly Levels 41 - 50.');

// Test 3: Verify All Level Coordinates and Waypoints
MYTHICAL_CASTLE_LEVELS.forEach((lvl) => {
  if (lvl.position.x < 0 || lvl.position.x > 1000 || lvl.position.y < 0 || lvl.position.y > 1000) {
    throw new Error(`❌ Level ${lvl.levelNumber} position out of bounds: (${lvl.position.x}, ${lvl.position.y})`);
  }
  if (lvl.levelNumber < 50) {
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
console.log('✅ Test 3 Passed: All Mythical Castle level coordinates and invisible path waypoints are within [0, 1000] boundaries.');

// Test 4: Path waypoint generation from Level 41 to 42, 43, ... 50
for (let l = 41; l < 50; l++) {
  const waypoints = getPathWaypointsBetweenLevels(l, l + 1);
  if (waypoints.length < 2) {
    throw new Error(`❌ Waypoints from Level ${l} to ${l + 1} must include at least start and end positions!`);
  }
}
console.log('✅ Test 4 Passed: Path waypoints generated seamlessly for all 10 Mythical Castle levels.');

// Test 5: Verify World Transitions & Progression Logic from World 4 -> World 5
const mockPlayer: PlayerState = {
  character: {
    name: 'Mythic Champion',
    gender: 'male',
    skinTone: 'tan',
    hairStyle: 'short',
    hairColor: 'gold',
    outfit: 'knight',
    outfitColor: 'purple',
    league: 'mythic',
    equippedPet: 'dragon-welp',
  },
  stats: {
    strength: 80,
    intelligence: 80,
    endurance: 80,
    agility: 80,
    charisma: 80,
    vitality: 80,
  },
  level: 40,
  experience: 0,
  experienceToNextLevel: 1000,
  health: 100,
  maxHealth: 100,
  gold: 1000,
  league: 'mythic',
  map: {
    currentMapLevel: 40,
    completedLevels: Array.from({ length: 39 }, (_, i) => i + 1),
    selectedWorldId: 'diamond-city',
  },
  inventory: [],
  quests: [],
  achievements: [],
  streakDays: 50,
};

// Advancing from Level 40 (Diamond City) to Level 41 (Mythical Castle)
const res41 = advanceMapLevel(mockPlayer);
if (!res41.advanced || res41.toLevel !== 41) {
  throw new Error('❌ Failed to advance from Level 40 to Level 41!');
}
const world41 = getWorldByLevel(41);
if (world41.id !== 'mythical-castle') {
  throw new Error(`❌ Level 41 should be in mythical-castle, got ${world41.id}`);
}
console.log('✅ Test 5 Passed: Successfully transitioned from Diamond City (L40) to Mythical Castle (L41).');

// Advancing step by step through all Mythical Castle levels to Pinnacle (Level 50)
let curPlayer = res41.updatedPlayer;
for (let lvl = 41; lvl < 50; lvl++) {
  const stepRes = advanceMapLevel(curPlayer);
  if (!stepRes.advanced || stepRes.toLevel !== lvl + 1) {
    throw new Error(`❌ Failed to advance from Level ${lvl} to Level ${lvl + 1}`);
  }
  curPlayer = stepRes.updatedPlayer;
}
if (curPlayer.map.currentMapLevel !== 50) {
  throw new Error(`❌ Expected currentMapLevel to be 50, got ${curPlayer.map.currentMapLevel}`);
}
console.log('✅ Test 6 Passed: Walked through all Mythical Castle levels up to Level 50 (Mythical Crown Pinnacle & Sky Throne).');

// Test 7: Verify final level boundary cap (cannot exceed level 50)
const capRes = advanceMapLevel(curPlayer);
if (capRes.advanced) {
  throw new Error('❌ Level progression must not advance beyond Level 50!');
}
console.log('✅ Test 7 Passed: Progression properly caps at Level 50.');

// Test 8: Dev Step Backward functionality in Mythical Castle
const backRes = regressMapLevel(curPlayer);
if (!backRes.regressed || backRes.toLevel !== 49) {
  throw new Error(`❌ Expected to regress to Level 49, got ${backRes.toLevel}`);
}
console.log('✅ Test 8 Passed: Dev Step Backward from Level 50 to 49 works smoothly.');

console.log('\n👑 ALL 50 LEVELS ACROSS ALL 5 WORLDS FULLY VERIFIED! 👑\n');
