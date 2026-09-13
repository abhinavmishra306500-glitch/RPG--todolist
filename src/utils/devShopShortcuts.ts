import type { PlayerState } from '../types/progression';
import { PET_ROSTER, normalizePlayerPets } from './petData';
import { COSMETICS_CATALOG, normalizePlayerCosmetics } from './cosmeticsData';

/**
 * 🔓 Developer Shortcut: Unlock ALL Pets & Character Cosmetics + Grant Testing Gold
 * Triggered via Keyboard Shortcut (Shift+U / U) or Dev Button
 */
export const devUnlockAllShopItems = (
  player: PlayerState
): { updatedPlayer: PlayerState; message: string } => {
  const currentPets = normalizePlayerPets(player.pets);
  const currentCosmetics = normalizePlayerCosmetics(player.cosmetics);

  const allPetIds = PET_ROSTER.map((p) => p.id);
  const allCosmeticIds = COSMETICS_CATALOG.map((c) => c.id);

  const updatedPlayer: PlayerState = {
    ...player,
    economy: {
      ...player.economy,
      gold: Math.max(player.economy?.gold ?? 0, 50000),
    },
    pets: {
      ...currentPets,
      ownedPetIds: allPetIds,
      equippedPetId: currentPets.equippedPetId || 'bunbun',
      devLockedPetIds: [],
    },
    cosmetics: {
      ...currentCosmetics,
      ownedCosmeticIds: allCosmeticIds,
      devLockedCosmeticIds: [],
    },
  };

  return {
    updatedPlayer,
    message: `🔓 DEV: Unlocked all 10 Pets & 14 Cosmetics + 50,000 Gold!`,
  };
};

/**
 * 🔒 Developer Shortcut: Lock ALL Pets & Character Cosmetics (Full Shop Lock)
 * Triggered via Keyboard Shortcut (Shift+L / L) or Dev Button
 */
export const devLockAllShopItems = (
  player: PlayerState
): { updatedPlayer: PlayerState; message: string } => {
  const currentPets = normalizePlayerPets(player.pets);
  const currentCosmetics = normalizePlayerCosmetics(player.cosmetics);

  const allPetIds = PET_ROSTER.map((p) => p.id);
  const allCosmeticIds = COSMETICS_CATALOG.map((c) => c.id);

  const updatedPlayer: PlayerState = {
    ...player,
    economy: {
      ...player.economy,
      gold: Math.min(player.economy?.gold ?? 0, 350),
    },
    pets: {
      ...currentPets,
      ownedPetIds: [],
      equippedPetId: null,
      devLockedPetIds: allPetIds,
    },
    cosmetics: {
      ...currentCosmetics,
      ownedCosmeticIds: [],
      equippedCosmetics: {
        headwear: null,
        outfit: null,
        accessory: null,
      },
      devLockedCosmeticIds: allCosmeticIds,
    },
  };

  return {
    updatedPlayer,
    message: `🔒 DEV: Locked ALL 10 Pets & 14 Cosmetics in the shop!`,
  };
};

/**
 * 🔒 Lock a SPECIFIC Pet
 */
export const devLockSpecificPet = (
  player: PlayerState,
  petId: string
): { updatedPlayer: PlayerState; message: string } => {
  const currentPets = normalizePlayerPets(player.pets);
  const pet = PET_ROSTER.find((p) => p.id === petId);
  const petName = pet?.name || petId;

  const newOwned = currentPets.ownedPetIds.filter((id) => id !== petId);
  const newDevLocked = Array.from(new Set([...(currentPets.devLockedPetIds || []), petId]));
  const newEquipped = currentPets.equippedPetId === petId ? (newOwned[0] || null) : currentPets.equippedPetId;

  const updatedPlayer: PlayerState = {
    ...player,
    pets: {
      ...currentPets,
      ownedPetIds: newOwned,
      equippedPetId: newEquipped,
      devLockedPetIds: newDevLocked,
    },
  };

  return {
    updatedPlayer,
    message: `🔒 DEV: Locked ${petName}!`,
  };
};

/**
 * 🔓 Unlock a SPECIFIC Pet
 */
export const devUnlockSpecificPet = (
  player: PlayerState,
  petId: string
): { updatedPlayer: PlayerState; message: string } => {
  const currentPets = normalizePlayerPets(player.pets);
  const pet = PET_ROSTER.find((p) => p.id === petId);
  const petName = pet?.name || petId;

  const newOwned = Array.from(new Set([...currentPets.ownedPetIds, petId]));
  const newDevLocked = (currentPets.devLockedPetIds || []).filter((id) => id !== petId);

  const updatedPlayer: PlayerState = {
    ...player,
    pets: {
      ...currentPets,
      ownedPetIds: newOwned,
      equippedPetId: currentPets.equippedPetId || petId,
      devLockedPetIds: newDevLocked,
    },
  };

  return {
    updatedPlayer,
    message: `🔓 DEV: Unlocked ${petName}!`,
  };
};

/**
 * 🎯 Toggle Lock/Unlock for a SPECIFIC Pet
 */
export const devToggleSpecificPet = (
  player: PlayerState,
  petId: string
): { updatedPlayer: PlayerState; unlocked: boolean; message: string } => {
  const currentPets = normalizePlayerPets(player.pets);
  const isDevLocked = currentPets.devLockedPetIds?.includes(petId) ?? false;

  if (isDevLocked) {
    const res = devUnlockSpecificPet(player, petId);
    return { updatedPlayer: res.updatedPlayer, unlocked: true, message: res.message };
  } else {
    const res = devLockSpecificPet(player, petId);
    return { updatedPlayer: res.updatedPlayer, unlocked: false, message: res.message };
  }
};

/**
 * 🔒 Lock a SPECIFIC Cosmetic Item
 */
export const devLockSpecificCosmetic = (
  player: PlayerState,
  cosmeticId: string
): { updatedPlayer: PlayerState; message: string } => {
  const currentCosmetics = normalizePlayerCosmetics(player.cosmetics);
  const cosmetic = COSMETICS_CATALOG.find((c) => c.id === cosmeticId);
  const itemName = cosmetic?.name || cosmeticId;

  const newOwned = currentCosmetics.ownedCosmeticIds.filter((id) => id !== cosmeticId);
  const newDevLocked = Array.from(new Set([...(currentCosmetics.devLockedCosmeticIds || []), cosmeticId]));
  const newEquipped = { ...currentCosmetics.equippedCosmetics };
  if (cosmetic && newEquipped[cosmetic.category] === cosmeticId) {
    newEquipped[cosmetic.category] = null;
  }

  const updatedPlayer: PlayerState = {
    ...player,
    cosmetics: {
      ...currentCosmetics,
      ownedCosmeticIds: newOwned,
      equippedCosmetics: newEquipped,
      devLockedCosmeticIds: newDevLocked,
    },
  };

  return {
    updatedPlayer,
    message: `🔒 DEV: Locked ${itemName}!`,
  };
};

/**
 * 🔓 Unlock a SPECIFIC Cosmetic Item
 */
export const devUnlockSpecificCosmetic = (
  player: PlayerState,
  cosmeticId: string
): { updatedPlayer: PlayerState; message: string } => {
  const currentCosmetics = normalizePlayerCosmetics(player.cosmetics);
  const cosmetic = COSMETICS_CATALOG.find((c) => c.id === cosmeticId);
  const itemName = cosmetic?.name || cosmeticId;

  const newOwned = Array.from(new Set([...currentCosmetics.ownedCosmeticIds, cosmeticId]));
  const newDevLocked = (currentCosmetics.devLockedCosmeticIds || []).filter((id) => id !== cosmeticId);

  const updatedPlayer: PlayerState = {
    ...player,
    cosmetics: {
      ...currentCosmetics,
      ownedCosmeticIds: newOwned,
      devLockedCosmeticIds: newDevLocked,
    },
  };

  return {
    updatedPlayer,
    message: `🔓 DEV: Unlocked ${itemName}!`,
  };
};

/**
 * 🎯 Toggle Lock/Unlock for a SPECIFIC Cosmetic Item
 */
export const devToggleSpecificCosmetic = (
  player: PlayerState,
  cosmeticId: string
): { updatedPlayer: PlayerState; unlocked: boolean; message: string } => {
  const currentCosmetics = normalizePlayerCosmetics(player.cosmetics);
  const isDevLocked = currentCosmetics.devLockedCosmeticIds?.includes(cosmeticId) ?? false;

  if (isDevLocked) {
    const res = devUnlockSpecificCosmetic(player, cosmeticId);
    return { updatedPlayer: res.updatedPlayer, unlocked: true, message: res.message };
  } else {
    const res = devLockSpecificCosmetic(player, cosmeticId);
    return { updatedPlayer: res.updatedPlayer, unlocked: false, message: res.message };
  }
};
