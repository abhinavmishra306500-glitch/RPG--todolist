import {
  ALL_MAP_WORLDS,
  GOLD_CITY_WORLD,
  GOLD_CITY_LEVELS,
  SILVER_VILLAGE_WORLD,
  BRONZE_VILLAGE_WORLD,
  DIAMOND_CITY_WORLD,
  MYTHICAL_CASTLE_WORLD,
  getMapLevelDef,
  getMapNodeState,
  advanceMapLevel,
  regressMapLevel,
  getPathWaypointsBetweenLevels,
  getWorldById,
  getWorldByLevel,
  normalizeMapProgression,
} from '../src/utils/mapData';
import { createInitialPlayerState } from '../src/utils/progression';

console.log('🧪 Testing Gold City (World 3) Map & Progression Implementation...\n');

// 1. Verify Gold City World Definition
console.log('1. Verifying Gold City World definition...');
if (GOLD_CITY_WORLD.id !== 'gold-city') throw new Error('Invalid Gold City ID');
if (GOLD_CITY_WORLD.startLevel !== 21 || GOLD_CITY_WORLD.endLevel !== 30) {
  throw new Error(`Invalid level range: ${GOLD_CITY_WORLD.startLevel} - ${GOLD_CITY_WORLD.endLevel}`);
}
if (GOLD_CITY_WORLD.levels.length !== 10) {
  throw new Error(`Expected 10 levels in Gold City, got ${GOLD_CITY_WORLD.levels.length}`);
}
console.log('✅ Gold City World definition verified.');

// 2. Verify all other worlds remain completely untouched
console.log('2. Verifying other worlds remain untouched...');
if (BRONZE_VILLAGE_WORLD.startLevel !== 1 || BRONZE_VILLAGE_WORLD.endLevel !== 10) throw new Error('Bronze modified');
if (SILVER_VILLAGE_WORLD.startLevel !== 11 || SILVER_VILLAGE_WORLD.endLevel !== 20) throw new Error('Silver modified');
if (DIAMOND_CITY_WORLD.startLevel !== 31 || DIAMOND_CITY_WORLD.endLevel !== 40) throw new Error('Diamond modified');
if (MYTHICAL_CASTLE_WORLD.startLevel !== 41 || MYTHICAL_CASTLE_WORLD.endLevel !== 50) throw new Error('Mythical modified');
console.log('✅ Bronze, Silver, Diamond, and Mythical worlds are intact.');

// 3. Verify Gold City Level Nodes and Positions (Levels 21 - 30)
console.log('3. Verifying Gold City level definitions & path waypoints (21 - 30)...');
for (let lvl = 21; lvl <= 30; lvl++) {
  const def = getMapLevelDef(lvl);
  if (def.levelNumber !== lvl) throw new Error(`Level mismatch for ${lvl}`);
  if (def.worldId !== 'gold-city') throw new Error(`World mismatch for ${lvl}`);
  if (def.position.x < 0 || def.position.x > 1000 || def.position.y < 0 || def.position.y > 1000) {
    throw new Error(`Out of bounds position for level ${lvl}: ${JSON.stringify(def.position)}`);
  }
  if (lvl < 30) {
    const waypoints = getPathWaypointsBetweenLevels(lvl, lvl + 1);
    if (!waypoints || waypoints.length < 2) {
      throw new Error(`Missing waypoints between level ${lvl} and ${lvl + 1}`);
    }
    console.log(`  - Level ${lvl} (${def.name}) -> Level ${lvl + 1}: ${waypoints.length} waypoints`);
  } else {
    console.log(`  - Level ${lvl} (${def.name}): Final Gold City sanctuary node`);
  }
}
console.log('✅ All Gold City level definitions and waypoints verified.');

// 4. Test Progression: Silver Village (20) -> Gold City (21) -> Gold City (22..30)
console.log('4. Testing Gold City progression transition...');
const mockChar = {
  name: 'Champion',
  gender: 'female' as const,
  skinToneId: 'medium-1',
  hairStyleId: 'ponytail',
  hairColorId: 'blonde',
  outfitId: 'mage',
  outfitColorId: 'royal-blue',
};
let player = {
  ...createInitialPlayerState(mockChar),
  map: {
    currentMapLevel: 20,
    maxUnlockedLevel: 20,
    completedLevels: Array.from({ length: 19 }, (_, i) => i + 1),
    selectedWorldId: 'silver-village',
  },
};

// Advance from 20 to 21 (Cross into Gold City)
const advTo21 = advanceMapLevel(player);
if (!advTo21.advanced || advTo21.toLevel !== 21) throw new Error('Failed to advance from 20 to 21');
if (advTo21.updatedPlayer.map.selectedWorldId !== 'gold-city') {
  throw new Error(`Expected selectedWorldId to be 'gold-city', got ${advTo21.updatedPlayer.map.selectedWorldId}`);
}
player = advTo21.updatedPlayer;
console.log('  - Successfully advanced from Level 20 to Level 21 (Entered Gold City)');

// Advance through all Gold City levels 21 -> 30
for (let lvl = 21; lvl < 30; lvl++) {
  const adv = advanceMapLevel(player);
  if (!adv.advanced || adv.toLevel !== lvl + 1) throw new Error(`Failed to advance from ${lvl} to ${lvl + 1}`);
  player = adv.updatedPlayer;
}
if (player.map.currentMapLevel !== 30) throw new Error('Expected player at level 30');
console.log('  - Successfully advanced across all Gold City levels to Level 30.');

// Test step backward in Gold City
const reg1 = regressMapLevel(player);
if (!reg1.regressed || reg1.toLevel !== 29) throw new Error('Failed to regress from 30 to 29');
console.log('  - Successfully stepped backward to Level 29.');

console.log('\n🎉 ALL GOLD CITY (WORLD 3) TESTS PASSED PERFECTLY!\n');
