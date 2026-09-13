import { PET_ROSTER, checkPetUnlockEligibility, buyOrUnlockPet, equipPet, isPetOwned, isPetEquipped, normalizePlayerPets, getPetById } from '../src/utils/petData';
import {
  playPetUniqueEquipSound,
  playBunbunEquipSound,
  playMewmiEquipSound,
  playFoxletEquipSound,
  playFluffoEquipSound,
  playFrogoEquipSound,
  playOwlioEquipSound,
  playMoonpawEquipSound,
  playFlamelingEquipSound,
  playVoltariEquipSound,
  playDrakoriEquipSound,
  playPetUnequipSound,
  playPetMovementVocalization,
} from '../src/utils/soundEffects';
import { createInitialPlayerState } from '../src/utils/progression';
import { DEFAULT_CHARACTER } from '../src/types/character';
import { PlayerState } from '../src/types/progression';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

console.log('🧪 Starting Pet System & CreatureDex Test Suite...\n');

// Test 1: Roster Validation
assert(PET_ROSTER.length === 10, `PET_ROSTER contains exactly 10 creatures (found ${PET_ROSTER.length})`);
const validRarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
PET_ROSTER.forEach((pet) => {
  assert(Boolean(pet.id && pet.name && pet.description && pet.lore), `Pet ${pet.id} has complete metadata`);
  assert(validRarities.includes(pet.rarity), `Pet ${pet.name} has valid rarity: ${pet.rarity}`);
  assert(pet.price >= 0, `Pet ${pet.name} has non-negative price: ${pet.price}`);
});

// Test 2: Initial Player State & Starter Pet
const initialPlayer = createInitialPlayerState(DEFAULT_CHARACTER);
assert(initialPlayer.pets !== undefined, 'Initial player has pets state defined');
assert(isPetOwned(initialPlayer.pets, 'bunbun'), 'Starter pet Bunbun is owned by default');
assert(isPetEquipped(initialPlayer.pets, 'bunbun'), 'Starter pet Bunbun is equipped by default');

// Test 3: Pet Shop Purchase - Normal Shop Pet (Mewmi, 500 Gold)
let player: PlayerState = {
  ...initialPlayer,
  economy: { ...initialPlayer.economy, gold: 1000 },
};

// Purchase Mewmi
const buyMewmi = buyOrUnlockPet(player, 'mewmi', 0);
assert(buyMewmi.success === true, 'Successfully purchased Mewmi with 1,000 Gold');
assert(buyMewmi.updatedPlayer?.economy.gold === 500, `Gold correctly deducted: 1000 - 500 = ${buyMewmi.updatedPlayer?.economy.gold}`);
assert(isPetOwned(buyMewmi.updatedPlayer?.pets, 'mewmi'), 'Mewmi is now owned in player pets');
player = buyMewmi.updatedPlayer!;

// Prevent Double Purchase
const doubleBuy = buyOrUnlockPet(player, 'mewmi', 0);
assert(doubleBuy.success === false, 'Double purchase of Mewmi correctly prevented');

// Test 4: Insufficient Gold Purchase
const poorPlayer: PlayerState = {
  ...initialPlayer,
  economy: { ...initialPlayer.economy, gold: 50 },
};
const failedBuy = buyOrUnlockPet(poorPlayer, 'mewmi', 0);
assert(failedBuy.success === false, 'Purchase rejected when gold is insufficient');

// Test 5: Special Requirements - Flameling (Requires 100 Quests Completed)
const flameling = getPetById('flameling')!;
assert(flameling !== undefined, 'Flameling exists in roster');

// With 50 quests -> rejected
const check50Quests = checkPetUnlockEligibility(player, flameling, 50);
assert(check50Quests.eligible === false, 'Flameling locked with 50 completed quests');

// With 100 quests -> eligible
const check100Quests = checkPetUnlockEligibility(player, flameling, 100);
assert(check100Quests.eligible === true, 'Flameling eligible with 100 completed quests');

// Test 6: Special Requirements - Voltari (Requires 30-Day Streak)
const voltari = getPetById('voltari')!;
const lowStreakPlayer: PlayerState = {
  ...player,
  consistency: { ...player.consistency, streak: 10 },
};
const checkLowStreak = checkPetUnlockEligibility(lowStreakPlayer, voltari, 0);
assert(checkLowStreak.eligible === false, 'Voltari locked with 10-day streak');

const highStreakPlayer: PlayerState = {
  ...player,
  consistency: { ...player.consistency, streak: 35 },
};
const checkHighStreak = checkPetUnlockEligibility(highStreakPlayer, voltari, 0);
assert(checkHighStreak.eligible === true, 'Voltari eligible with 35-day streak');

// Test 7: Special Requirements - Moonpaw (Requires Diamond League)
const moonpaw = getPetById('moonpaw')!;
const goldLeaguePlayer: PlayerState = {
  ...player,
  league: { tier: 'Gold', division: 'I' },
};
const checkGoldLeague = checkPetUnlockEligibility(goldLeaguePlayer, moonpaw, 0);
assert(checkGoldLeague.eligible === false, 'Moonpaw locked for Gold League player');

const diamondLeaguePlayer: PlayerState = {
  ...player,
  league: { tier: 'Diamond', division: 'I' },
};
const checkDiamondLeague = checkPetUnlockEligibility(diamondLeaguePlayer, moonpaw, 0);
assert(checkDiamondLeague.eligible === true, 'Moonpaw eligible for Diamond League player');

// Test 8: Special Requirements - Drakori (Endgame Legendary: Level 30 + 25k Gold + Diamond League)
const drakori = getPetById('drakori')!;
const almostEndgamePlayer: PlayerState = {
  ...player,
  progression: { ...player.progression, level: 25 },
  economy: { gold: 30000 },
  league: { tier: 'Diamond', division: 'I' },
};
const checkAlmostEndgame = checkPetUnlockEligibility(almostEndgamePlayer, drakori, 0);
assert(checkAlmostEndgame.eligible === false, 'Drakori locked for Level 25 (requires Level 30)');

const maxEndgamePlayer: PlayerState = {
  ...player,
  progression: { ...player.progression, level: 30 },
  economy: { gold: 30000 },
  league: { tier: 'Diamond', division: 'I' },
};
const checkMaxEndgame = checkPetUnlockEligibility(maxEndgamePlayer, drakori, 0);
assert(checkMaxEndgame.eligible === true, 'Drakori eligible for Level 30 Diamond League player with 30k Gold');

const buyDrakori = buyOrUnlockPet(maxEndgamePlayer, 'drakori', 0);
assert(buyDrakori.success === true, 'Successfully bought Drakori');
assert(buyDrakori.updatedPlayer?.economy.gold === 5000, `Gold deducted: 30000 - 25000 = ${buyDrakori.updatedPlayer?.economy.gold}`);

// Test 9: Equipping & Unequipping Mechanics
let equipTestPlayer = buyDrakori.updatedPlayer!;

// Equip Drakori
const equipResult = equipPet(equipTestPlayer, 'drakori');
assert(equipResult.success === true, 'Successfully equipped Drakori');
assert(equipResult.updatedPlayer?.pets?.equippedPetId === 'drakori', 'Equipped pet is now Drakori');
equipTestPlayer = equipResult.updatedPlayer!;

// Switch equip to Mewmi
const switchEquip = equipPet(equipTestPlayer, 'mewmi');
assert(switchEquip.success === true, 'Successfully switched equipped pet to Mewmi');
assert(switchEquip.updatedPlayer?.pets?.equippedPetId === 'mewmi', 'Only 1 pet equipped at a time');
equipTestPlayer = switchEquip.updatedPlayer!;

// Unequip
const unequipResult = equipPet(equipTestPlayer, null);
assert(unequipResult.success === true, 'Successfully unequipped pet');
assert(unequipResult.updatedPlayer?.pets?.equippedPetId === null, 'Equipped pet is null when unequipped');

// Attempt to equip unowned pet
const equipUnowned = equipPet(equipTestPlayer, 'voltari');
assert(equipUnowned.success === false, 'Cannot equip unowned pet');

// Test 10: Unique Equip Sound Functions Exist and Execute Safely
const soundFunctions = [
  { name: 'Bunbun (🐰 Hop/Chime)', fn: playBunbunEquipSound },
  { name: 'Mewmi (🐱 Meow/Chime)', fn: playMewmiEquipSound },
  { name: 'Foxlet (🦊 Sparkle/Whoosh)', fn: playFoxletEquipSound },
  { name: 'Fluffo (🐶 Bark/Chime)', fn: playFluffoEquipSound },
  { name: 'Frogo (🐸 Bubbly/Ribbit)', fn: playFrogoEquipSound },
  { name: 'Owlio (🦉 Owl Hoot/Chime)', fn: playOwlioEquipSound },
  { name: 'Moonpaw (🌙 Dreamy Moon)', fn: playMoonpawEquipSound },
  { name: 'Flameling (🔥 Fire Whoosh/Crackle)', fn: playFlamelingEquipSound },
  { name: 'Voltari (⚡ Electric Zap)', fn: playVoltariEquipSound },
  { name: 'Drakori (🐉 Dragon Roar/Impact)', fn: playDrakoriEquipSound },
  { name: 'Unequip (🐾 Soft Pop)', fn: playPetUnequipSound },
];

soundFunctions.forEach(({ name, fn }) => {
  assert(typeof fn === 'function', `Sound function for ${name} exists`);
  // Should not throw in node/headless environment (gracefully skips audioCtx)
  fn();
  assert(true, `Sound function for ${name} executes safely`);
});

// Test Dispatcher for all 10 pet IDs
PET_ROSTER.forEach((pet) => {
  playPetUniqueEquipSound(pet.id);
  assert(true, `Equip Dispatcher handles pet ID '${pet.id}'`);
});
playPetUniqueEquipSound(null);
assert(true, "Equip Dispatcher handles unequip (null)");

// Test 11: Movement Vocalization Dispatcher for all 10 pet IDs
PET_ROSTER.forEach((pet) => {
  playPetMovementVocalization(pet.id, { force: true });
  assert(true, `Movement Vocalization Dispatcher handles pet ID '${pet.id}'`);
});
playPetMovementVocalization(null);
assert(true, "Movement Vocalization Dispatcher handles null safely");

console.log('\n🎉 ALL PET SYSTEM, UNIQUE EQUIP SOUNDS & MOVEMENT VOCALIZATION TESTS PASSED! 🐾🔊🚶‍♂️');
