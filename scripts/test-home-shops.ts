import { DEFAULT_CHARACTER } from '../src/types/character';
import { createInitialPlayerState } from '../src/utils/progression';
import {
  COSMETICS_CATALOG,
  buyCosmetic,
  equipCosmetic,
  isCosmeticOwned,
  isCosmeticEquipped,
  normalizePlayerCosmetics,
} from '../src/utils/cosmeticsData';
import {
  DEFAULT_HOME_FURNITURE,
  PREVIEW_HOME_SHOP_ITEMS,
  normalizePlayerHome,
} from '../src/utils/homeData';
import { PET_ROSTER } from '../src/utils/petData';
import {
  devUnlockAllShopItems,
  devLockAllShopItems,
  devLockSpecificPet,
  devUnlockSpecificPet,
  devToggleSpecificPet,
  devLockSpecificCosmetic,
  devUnlockSpecificCosmetic,
  devToggleSpecificCosmetic,
} from '../src/utils/devShopShortcuts';

console.log('🧪 Starting Home & Shops (MVP) Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASSED: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAILED: ${testName}`);
    process.exit(1);
  }
}

// ==========================================
// 1. HOME SYSTEM TESTS
// ==========================================
console.log('--- 1. Testing Home Environment & Furniture ---');

assert(DEFAULT_HOME_FURNITURE.length >= 4, `Default home contains core furniture (found ${DEFAULT_HOME_FURNITURE.length})`);

const bed = DEFAULT_HOME_FURNITURE.find((f) => f.category === 'bed');
assert(Boolean(bed && bed.icon === '🛏️'), 'Home includes Cozy Bed (🛏️)');

const book = DEFAULT_HOME_FURNITURE.find((f) => f.category === 'bookshelf');
assert(Boolean(book && book.icon === '📚'), 'Home includes Bookshelf / Study (📚)');

const plant = DEFAULT_HOME_FURNITURE.find((f) => f.category === 'plant');
assert(Boolean(plant && plant.icon === '🪴'), 'Home includes Houseplant Fern (🪴)');

const chair = DEFAULT_HOME_FURNITURE.find((f) => f.category === 'seating');
assert(Boolean(chair && chair.icon === '🪑'), 'Home includes Crafted Chair & Table (🪑)');

const normalizedHome = normalizePlayerHome(null);
assert(Boolean(normalizedHome.wallpaperId && normalizedHome.unlockedFurnitureIds?.length), 'normalizePlayerHome provides default room setup');

// ==========================================
// 2. CHARACTER COSMETICS SHOP TESTS
// ==========================================
console.log('\n--- 2. Testing Character Cosmetics Shop ---');

assert(COSMETICS_CATALOG.length >= 10, `Cosmetics catalog contains multiple items (found ${COSMETICS_CATALOG.length})`);

COSMETICS_CATALOG.forEach((item) => {
  assert(Boolean(item.id && item.name && item.icon && item.category), `Cosmetic ${item.name} has complete required metadata`);
  assert(item.price > 0, `Cosmetic ${item.name} has non-negative gold price: ${item.price}`);
  assert(['headwear', 'outfit', 'accessory'].includes(item.category), `Cosmetic ${item.name} has valid category: ${item.category}`);
});

// Setup initial test player
const player = createInitialPlayerState({
  ...DEFAULT_CHARACTER,
  name: 'Aria',
});
player.economy.gold = 3000;

assert(player.economy.gold === 3000, 'Test player has 3,000 Gold');

// Purchase Gold Crown (Headwear)
const crownItem = COSMETICS_CATALOG.find((c) => c.id === 'crown_gold')!;
const buyResult1 = buyCosmetic(player, crownItem.id);
assert(buyResult1.success === true, `Successfully purchased ${crownItem.name}`);
assert(buyResult1.updatedPlayer!.economy.gold === 2000, `Gold deducted: 3000 - 1000 = ${buyResult1.updatedPlayer!.economy.gold}`);
assert(isCosmeticOwned(buyResult1.updatedPlayer!, crownItem.id), 'Crown is now recorded as owned');
assert(isCosmeticEquipped(buyResult1.updatedPlayer!, crownItem.id), 'Crown is auto-equipped upon purchase');

// Duplicate purchase check
const duplicateResult = buyCosmetic(buyResult1.updatedPlayer!, crownItem.id);
assert(duplicateResult.success === false, 'Duplicate cosmetic purchase rejected');

// Purchase Radiant Champion Armor (Outfit)
const armorItem = COSMETICS_CATALOG.find((c) => c.id === 'outfit_radiant')!;
const buyResult2 = buyCosmetic(buyResult1.updatedPlayer!, armorItem.id);
assert(buyResult2.success === true, `Successfully purchased ${armorItem.name}`);
assert(buyResult2.updatedPlayer!.economy.gold === 800, `Gold deducted: 2000 - 1200 = ${buyResult2.updatedPlayer!.economy.gold}`);

// Insufficient Gold check (trying to buy Starlight Wings for 3,000 Gold with 800 remaining)
const wingsItem = COSMETICS_CATALOG.find((c) => c.id === 'acc_wings_starlight')!;
const buyResult3 = buyCosmetic(buyResult2.updatedPlayer!, wingsItem.id);
assert(buyResult3.success === false, 'Purchase rejected when gold is insufficient');

// Unequip and re-equip tests
const unequipResult = equipCosmetic(buyResult2.updatedPlayer!, null, 'headwear');
assert(unequipResult.success === true, 'Successfully unequipped headwear');
assert(unequipResult.updatedPlayer.cosmetics?.equippedCosmetics.headwear === null, 'Headwear is null after unequip');

const reEquipResult = equipCosmetic(unequipResult.updatedPlayer, crownItem.id, 'headwear');
assert(reEquipResult.success === true, 'Successfully re-equipped owned headwear');
assert(reEquipResult.updatedPlayer.cosmetics?.equippedCosmetics.headwear === crownItem.id, 'Headwear is crown_gold again');

// ==========================================
// 3. SHOPS HUB & RESTRICTIONS (NO MAGIC SHOP)
// ==========================================
console.log('\n--- 3. Testing Shops Scope & Strict Constraints ---');

assert(PET_ROSTER.length === 10, '🐾 Pet Shop retains all 10 creatures');
assert(PREVIEW_HOME_SHOP_ITEMS.length >= 4, '🏠 Home Shop has preview furniture for future expansion');

// Verify NO Magic Shop exists anywhere
const disallowedKeywords = ['magic shop', 'magicshop', 'magic_shop'];
const hasMagicShopInCosmetics = COSMETICS_CATALOG.some((c) =>
  disallowedKeywords.some((k) => c.name.toLowerCase().includes(k))
);
assert(!hasMagicShopInCosmetics, '❌ Strict Rule Verified: No Magic Shop in cosmetics');

// ==========================================
// 4. DEVELOPER SHORTCUT TESTS (UNLOCK / LOCK ALL & SPECIFIC ITEMS)
// ==========================================
console.log('\n--- 4. Testing Developer Hotkeys & Unlock/Lock Functions ---');

const freshPlayer = createInitialPlayerState({ ...DEFAULT_CHARACTER, name: 'DevHero' });

// Test Unlock All
const { updatedPlayer: unlockedDevPlayer, message: unlockMsg } = devUnlockAllShopItems(freshPlayer);
assert(Boolean(unlockMsg), 'Unlock All returns developer notification message');
assert(unlockedDevPlayer.pets?.ownedPetIds.length === 10, `All 10 pets are unlocked (found ${unlockedDevPlayer.pets?.ownedPetIds.length})`);
assert(unlockedDevPlayer.cosmetics?.ownedCosmeticIds.length === COSMETICS_CATALOG.length, `All ${COSMETICS_CATALOG.length} cosmetics are unlocked`);
assert(unlockedDevPlayer.economy.gold >= 50000, `Gold boosted to ${unlockedDevPlayer.economy.gold} for testing`);

// Test Lock All
const { updatedPlayer: lockedDevPlayer, message: lockMsg } = devLockAllShopItems(unlockedDevPlayer);
assert(Boolean(lockMsg), 'Lock All returns developer notification message');
assert(lockedDevPlayer.pets?.ownedPetIds.length === 0, 'Pets reset to 0 owned');
assert(lockedDevPlayer.pets?.devLockedPetIds?.length === 10, 'All 10 pets explicitly placed in devLockedPetIds');
assert(lockedDevPlayer.cosmetics?.ownedCosmeticIds.length === 0, 'Cosmetics reset to empty owned list');
assert(lockedDevPlayer.cosmetics?.devLockedCosmeticIds?.length === COSMETICS_CATALOG.length, 'All cosmetics in devLockedCosmeticIds');

// Test Specific Pet Lock & Unlock Functions
const { updatedPlayer: drakoriUnlockedPlayer } = devUnlockSpecificPet(lockedDevPlayer, 'drakori');
assert(drakoriUnlockedPlayer.pets?.ownedPetIds.includes('drakori') === true, 'Drakori unlocked via devUnlockSpecificPet');
assert(drakoriUnlockedPlayer.pets?.devLockedPetIds?.includes('drakori') === false, 'Drakori removed from devLockedPetIds');

const { updatedPlayer: drakoriLockedPlayer } = devLockSpecificPet(drakoriUnlockedPlayer, 'drakori');
assert(drakoriLockedPlayer.pets?.ownedPetIds.includes('drakori') === false, 'Drakori locked via devLockSpecificPet');
assert(drakoriLockedPlayer.pets?.devLockedPetIds?.includes('drakori') === true, 'Drakori added to devLockedPetIds');

// Test Specific Pet Toggle
const { updatedPlayer: toggledPet, unlocked: petUnlocked } = devToggleSpecificPet(drakoriLockedPlayer, 'drakori');
assert(petUnlocked === true, 'Toggle on locked Drakori unlocks it');
const { updatedPlayer: toggledPet2, unlocked: petUnlocked2 } = devToggleSpecificPet(toggledPet, 'drakori');
assert(petUnlocked2 === false, 'Toggle on unlocked Drakori locks it');

// Test Specific Cosmetic Lock & Unlock Functions
const { updatedPlayer: crownUnlockedPlayer } = devUnlockSpecificCosmetic(lockedDevPlayer, 'crown_gold');
assert(crownUnlockedPlayer.cosmetics?.ownedCosmeticIds.includes('crown_gold') === true, 'Crown unlocked via devUnlockSpecificCosmetic');

const { updatedPlayer: crownLockedPlayer } = devLockSpecificCosmetic(crownUnlockedPlayer, 'crown_gold');
assert(crownLockedPlayer.cosmetics?.ownedCosmeticIds.includes('crown_gold') === false, 'Crown locked via devLockSpecificCosmetic');
assert(crownLockedPlayer.cosmetics?.devLockedCosmeticIds?.includes('crown_gold') === true, 'Crown in devLockedCosmeticIds');

// Test Specific Cosmetic Toggle
const { updatedPlayer: toggledCosmetic, unlocked: cosmUnlocked } = devToggleSpecificCosmetic(crownLockedPlayer, 'crown_gold');
assert(cosmUnlocked === true, 'Toggle on locked Crown unlocks it');
const { updatedPlayer: toggledCosmetic2, unlocked: cosmUnlocked2 } = devToggleSpecificCosmetic(toggledCosmetic, 'crown_gold');
assert(cosmUnlocked2 === false, 'Toggle on unlocked Crown locks it');

console.log(`\n🎉 ALL ${passedTests}/${totalTests} HOME & SHOPS TESTS PASSED! 🏠🛍️✨\n`);
