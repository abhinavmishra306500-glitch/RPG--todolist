import type { CosmeticItemDef, PlayerCosmeticsState } from '../types/cosmetics';
import type { PlayerState } from '../types/progression';

export const COSMETICS_CATALOG: CosmeticItemDef[] = [
  // ================= HEADWEAR =================
  {
    id: 'crown_gold',
    name: 'Monarch Gold Crown',
    category: 'headwear',
    price: 1000,
    rarity: 'Rare',
    icon: '👑',
    description: 'A polished solid gold circlet worn by rulers of the realm.',
    perkText: '+15% Charisma & Leadership',
    accentHex: '#f59e0b',
    badge: 'Regal',
  },
  {
    id: 'fedora_explorer',
    name: 'Explorer Feathered Cap',
    category: 'headwear',
    price: 450,
    rarity: 'Common',
    icon: '🤠',
    description: 'Sturdy brimmed hat with a vibrant blue jay feather for trail charting.',
    perkText: '+10% Wilderness Trail Speed',
    accentHex: '#d97706',
    badge: 'Traveler',
  },
  {
    id: 'ribbon_ruby',
    name: 'Ruby Silk Ribbon',
    category: 'headwear',
    price: 350,
    rarity: 'Common',
    icon: '🎀',
    description: 'Soft crimson silk tie that gently flutters in the morning breeze.',
    perkText: '+5% Cheerful Focus',
    accentHex: '#ef4444',
    badge: 'Charming',
  },
  {
    id: 'circlet_arcane',
    name: 'Mystic Silver Circlet',
    category: 'headwear',
    price: 800,
    rarity: 'Uncommon',
    icon: '✨',
    description: 'An engraved silver headband embedded with glowing moonstone.',
    perkText: '+12% Deep Focus & Memory',
    accentHex: '#a855f7',
    badge: 'Arcane',
  },
  {
    id: 'helm_valkyrie',
    name: 'Valkyrie Winged Helm',
    category: 'headwear',
    price: 1600,
    rarity: 'Epic',
    icon: '🪖',
    description: 'Mythical steel battle helmet adorned with gleaming silver wings.',
    perkText: '+20% Quest Fortitude',
    accentHex: '#38bdf8',
    badge: 'Legend',
  },

  // ================= OUTFITS =================
  {
    id: 'outfit_radiant',
    name: 'Radiant Champion Armor',
    category: 'outfit',
    price: 1200,
    rarity: 'Rare',
    icon: '🌟',
    description: 'Gilded battle plate that reflects golden sunlight across the kingdom.',
    perkText: 'Increases motivation by +15%',
    accentHex: '#fbbf24',
    badge: 'Champion',
  },
  {
    id: 'outfit_celestial',
    name: 'Celestial Void Robe',
    category: 'outfit',
    price: 1500,
    rarity: 'Epic',
    icon: '🌌',
    description: 'Woven from midnight silk and constellations that gently shimmer.',
    perkText: 'Dreamy starlight radiance',
    accentHex: '#6366f1',
    badge: 'Cosmic',
  },
  {
    id: 'outfit_autumn',
    name: 'Autumn Nomad Garb',
    category: 'outfit',
    price: 600,
    rarity: 'Common',
    icon: '🍁',
    description: 'Warm earth-toned layers fashioned from fleece and fallen oak colors.',
    perkText: 'Cozy resilience',
    accentHex: '#ea580c',
    badge: 'Rustic',
  },
  {
    id: 'outfit_sakura',
    name: 'Cherry Blossom Tunic',
    category: 'outfit',
    price: 750,
    rarity: 'Uncommon',
    icon: '🌸',
    description: 'Silken pastel vestment embroidered with soft floral petals.',
    perkText: 'Calm mind & tranquility',
    accentHex: '#f472b6',
    badge: 'Grace',
  },
  {
    id: 'outfit_frost',
    name: 'Frost Knight Armor',
    category: 'outfit',
    price: 1800,
    rarity: 'Epic',
    icon: '❄️',
    description: 'Glacial alloy forged atop the highest snowbound peaks.',
    perkText: 'Unshakable mental endurance',
    accentHex: '#06b6d4',
    badge: 'Glacial',
  },

  // ================= ACCESSORIES =================
  {
    id: 'acc_scarf_crimson',
    name: 'Crimson Wanderer Scarf',
    category: 'accessory',
    price: 300,
    rarity: 'Common',
    icon: '🧣',
    description: 'A long vibrant wool scarf that trails heroically behind you.',
    perkText: '+5% Wind Protection',
    accentHex: '#dc2626',
    badge: 'Heroic',
  },
  {
    id: 'acc_satchel_leather',
    name: 'Adventurer Leather Satchel',
    category: 'accessory',
    price: 350,
    rarity: 'Common',
    icon: '🎒',
    description: 'Reinforced dual-pocket bag for carrying scrolls and quest notes.',
    perkText: 'Handy item organization',
    accentHex: '#78350f',
    badge: 'Utility',
  },
  {
    id: 'acc_wings_starlight',
    name: 'Starlight Angelic Wings',
    category: 'accessory',
    price: 3000,
    rarity: 'Legendary',
    icon: '🪽',
    description: 'Ethereal celestial wings made of pure luminescence and grace.',
    perkText: '+25% Majestic Presence',
    accentHex: '#e0e7ff',
    badge: 'Mythic',
  },
  {
    id: 'acc_aura_lightning',
    name: 'Spark Energy Aura',
    category: 'accessory',
    price: 1400,
    rarity: 'Rare',
    icon: '⚡',
    description: 'Crackle of static electricity orbiting around your footsteps.',
    perkText: '+15% Dynamic Energy',
    accentHex: '#facc15',
    badge: 'Voltaic',
  },
];

export const normalizePlayerCosmetics = (
  cosmetics?: Partial<PlayerCosmeticsState> | null
): PlayerCosmeticsState => {
  return {
    ownedCosmeticIds: Array.isArray(cosmetics?.ownedCosmeticIds)
      ? Array.from(new Set(cosmetics.ownedCosmeticIds))
      : [],
    equippedCosmetics: {
      headwear: cosmetics?.equippedCosmetics?.headwear ?? null,
      outfit: cosmetics?.equippedCosmetics?.outfit ?? null,
      accessory: cosmetics?.equippedCosmetics?.accessory ?? null,
    },
    devLockedCosmeticIds: Array.isArray(cosmetics?.devLockedCosmeticIds)
      ? Array.from(new Set(cosmetics.devLockedCosmeticIds))
      : [],
  };
};

export const isCosmeticDevLocked = (
  player: PlayerState,
  cosmeticId: string
): boolean => {
  const locked = player.cosmetics?.devLockedCosmeticIds ?? [];
  return locked.includes(cosmeticId);
};

export const isCosmeticOwned = (
  player: PlayerState,
  cosmeticId: string
): boolean => {
  const owned = player.cosmetics?.ownedCosmeticIds ?? [];
  return owned.includes(cosmeticId);
};

export const isCosmeticEquipped = (
  player: PlayerState,
  cosmeticId: string
): boolean => {
  const equipped = player.cosmetics?.equippedCosmetics;
  if (!equipped) return false;
  return (
    equipped.headwear === cosmeticId ||
    equipped.outfit === cosmeticId ||
    equipped.accessory === cosmeticId
  );
};

export const buyCosmetic = (
  player: PlayerState,
  cosmeticId: string
): { success: boolean; updatedPlayer?: PlayerState; message?: string } => {
  const item = COSMETICS_CATALOG.find((c) => c.id === cosmeticId);
  if (!item) {
    return { success: false, message: 'Cosmetic item not found.' };
  }

  if (isCosmeticDevLocked(player, cosmeticId)) {
    return { success: false, message: '🔒 This item is locked by developer override.' };
  }

  const currentCosmetics = normalizePlayerCosmetics(player.cosmetics);
  if (currentCosmetics.ownedCosmeticIds.includes(cosmeticId)) {
    return { success: false, message: `You already own ${item.name}!` };
  }

  const currentGold = player.economy?.gold ?? 0;
  if (currentGold < item.price) {
    const needed = item.price - currentGold;
    return {
      success: false,
      message: `Not enough Gold! You need ${needed.toLocaleString()} more Gold to purchase ${item.name}.`,
    };
  }

  // Deduct Gold and add to owned cosmetics, auto-equipping it
  const newGold = currentGold - item.price;
  const newOwned = [...currentCosmetics.ownedCosmeticIds, cosmeticId];
  const newEquipped = {
    ...currentCosmetics.equippedCosmetics,
    [item.category]: cosmeticId,
  };

  const updatedPlayer: PlayerState = {
    ...player,
    economy: {
      ...player.economy,
      gold: newGold,
    },
    cosmetics: {
      ownedCosmeticIds: newOwned,
      equippedCosmetics: newEquipped,
    },
  };

  return {
    success: true,
    updatedPlayer,
    message: `Purchased and equipped ${item.name}!`,
  };
};

export const equipCosmetic = (
  player: PlayerState,
  cosmeticId: string | null,
  category: 'headwear' | 'outfit' | 'accessory'
): { success: boolean; updatedPlayer: PlayerState } => {
  const currentCosmetics = normalizePlayerCosmetics(player.cosmetics);

  if (cosmeticId && !currentCosmetics.ownedCosmeticIds.includes(cosmeticId)) {
    return { success: false, updatedPlayer: player };
  }

  const updatedPlayer: PlayerState = {
    ...player,
    cosmetics: {
      ...currentCosmetics,
      equippedCosmetics: {
        ...currentCosmetics.equippedCosmetics,
        [category]: cosmeticId,
      },
    },
  };

  return { success: true, updatedPlayer };
};
