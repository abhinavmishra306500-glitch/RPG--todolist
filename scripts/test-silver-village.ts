import {
  ALL_MAP_WORLDS,
  SILVER_VILLAGE_WORLD,
  SILVER_VILLAGE_LEVELS,
  BRONZE_VILLAGE_WORLD,
  GOLD_CITY_WORLD,
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

console.log('🧪 Testing Silver Village Map & Progression Implementation...\n');

// 1. Verify Silver Village World Definition
console.log('1. Verifying Silver Village World definition...');
if (SILVER_VILLAGE_WORLD.id !== 'silver-village') throw new Error('Invalid Silver Village ID');
if (SILVER_VILLAGE_WORLD.startLevel !== 11 || SILVER_VILLAGE_WORLD.endLevel !== 20) {
  throw new Error(`Invalid level range: ${SILVER_VILLAGE_WORLD.startLevel} - ${SILVER_VILLAGE_WORLD.endLevel}`);
}
if (SILVER_VILLAGE_WORLD.levels.length !== 10) {
  throw new Error(`Expected 10 levels in Silver Village, got ${SILVER_VILLAGE_WORLD.levels.length}`);
}
console.log('✅ Silver Village World definition verified.');

// 2. Verify other worlds are untouched
console.log('2. Verifying other worlds remain untouched...');
if (BRONZE_VILLAGE_WORLD.startLevel !== 1 || BRONZE_VILLAGE_WORLD.endLevel !== 10) throw new Error('Bronze modified');
if (GOLD_CITY_WORLD.startLevel !== 21 || GOLD_CITY_WORLD.endLevel !== 30) throw new Error('Gold modified');
if (DIAMOND_CITY_WORLD.startLevel !== 31 || DIAMOND_CITY_WORLD.endLevel !== 40) throw new Error('Diamond modified');
if (MYTHICAL_CASTLE_WORLD.startLevel !== 41 || MYTHICAL_CASTLE_WORLD.endLevel !== 50) throw new Error('Mythical modified');
console.log('✅ Bronze, Gold, Diamond, and Mythical worlds are intact.');

// 3. Verify Silver Village Level Nodes and Positions
console.log('3. Verifying Silver Village level definitions & path waypoints (11 - 20)...');
for (let lvl = 11; lvl <= 20; lvl++) {
  const def = getMapLevelDef(lvl);
  if (def.levelNumber !== lvl) throw new Error(`Level mismatch for ${lvl}`);
  if (def.worldId !== 'silver-village') throw new Error(`World mismatch for ${lvl}`);
  if (def.position.x < 0 || def.position.x > 1000 || def.position.y < 0 || def.position.y > 1000) {
    throw new Error(`Out of bounds position for level ${lvl}: ${JSON.stringify(def.position)}`);
  }
  if (lvl < 20) {
    const waypoints = getPathWaypointsBetweenLevels(lvl, lvl + 1);
    if (!waypoints || waypoints.length < 2) {
      throw new Error(`Missing waypoints between level ${lvl} and ${lvl + 1}`);
    }
    console.log(`  - Level ${lvl} (${def.name}) -> Level ${lvl + 1}: ${waypoints.length} waypoints`);
  } else {
    console.log(`  - Level ${lvl} (${def.name}): Final sanctuary node`);
  }
}
console.log('✅ All Silver Village level definitions and waypoints verified.');

// 4. Test Progression: Bronze Village (10) -> Silver Village (11) -> Silver Village (12..20)
console.log('4. Testing Silver Village progression transition...');
const mockChar = {
  name: 'Hero',
  gender: 'male' as const,
  skinToneId: 'light-1',
  hairStyleId: 'messy',
  hairColorId: 'brown',
  outfitId: 'warrior',
  outfitColorId: 'crimson',
};
let player = {
  ...createInitialPlayerState(mockChar),
  map: {
    currentMapLevel: 10,
    maxUnlockedLevel: 10,
    completedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    selectedWorldId: 'bronze-village',
  },
};

// Advance from 10 to 11 (Cross into Silver Village)
const advTo11 = advanceMapLevel(player);
if (!advTo11.advanced || advTo11.toLevel !== 11) throw new Error('Failed to advance from 10 to 11');
if (advTo11.updatedPlayer.map.selectedWorldId !== 'silver-village') {
  throw new Error(`Expected selectedWorldId to be 'silver-village', got ${advTo11.updatedPlayer.map.selectedWorldId}`);
}
player = advTo11.updatedPlayer;
console.log('  - Successfully advanced from Level 10 to Level 11 (Entered Silver Village)');

// Advance through all Silver Village levels 11 -> 20
for (let lvl = 11; lvl < 20; lvl++) {
  const adv = advanceMapLevel(player);
  if (!adv.advanced || adv.toLevel !== lvl + 1) throw new Error(`Failed to advance from ${lvl} to ${lvl + 1}`);
  player = adv.updatedPlayer;
}
if (player.map.currentMapLevel !== 20) throw new Error('Expected player at level 20');
console.log('  - Successfully advanced across all Silver Village levels to Level 20.');

// Test step backward in Silver Village
const reg1 = regressMapLevel(player);
if (!reg1.regressed || reg1.toLevel !== 19) throw new Error('Failed to regress from 20 to 19');
console.log('  - Successfully stepped backward to Level 19.');

console.log('\n🎉 ALL SILVER VILLAGE TESTS PASSED PERFECTLY!\n');
