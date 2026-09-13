import type { PetDef, PlayerPetsState } from '../types/pet';
import type { PlayerState } from '../types/progression';

/**
 * Centralized Master Pet Registry (Expandable to 50+ original fantasy creatures)
 * 100% original, licensed-safe cute pixel-art RPG designs.
 */
export const ALL_PETS: PetDef[] = [
  {
    id: 'bunbun',
    name: 'Bunbun',
    species: 'Clover Hare',
    emoji: '🐰',
    rarity: 'Common',
    description: 'A cheerful cream-furred bunny with floppy ears and a lucky four-leaf clover bandana.',
    lore: 'Found hopping happily through the sunlit meadows of Bronze Village. Brings luck and joy to traveling adventurers.',
    price: 300,
    requirement: {
      type: 'gold',
      goldPrice: 300,
      description: '300 Gold',
    },
    primaryColor: '#fde047',
    accentColor: '#f472b6',
    glowColor: '#fef08a',
  },
  {
    id: 'fluffo',
    name: 'Fluffo',
    species: 'Spirit Pup',
    emoji: '🐶',
    rarity: 'Common',
    description: 'An enthusiastic golden Shiba pup with a jaunty red adventuring bandana and wagging tail.',
    lore: 'Loyal to the end, Fluffo barks encouragingly whenever you conquer a tough daily quest.',
    price: 400,
    requirement: {
      type: 'gold',
      goldPrice: 400,
      description: '400 Gold',
    },
    primaryColor: '#fbbf24',
    accentColor: '#ef4444',
    glowColor: '#fde68a',
  },
  {
    id: 'mewmi',
    name: 'Mewmi',
    species: 'Starry Feline',
    emoji: '🐱',
    rarity: 'Common',
    description: 'A whimsical lavender calico kitten with sparkling whiskers and an inquisitive gaze.',
    lore: 'Loves sleeping in the warm sunbeams of village windmills and chasing playful mana motes.',
    price: 500,
    requirement: {
      type: 'gold',
      goldPrice: 500,
      description: '500 Gold',
    },
    primaryColor: '#c084fc',
    accentColor: '#a855f7',
    glowColor: '#e9d5ff',
  },
  {
    id: 'frogo',
    name: 'Frogo',
    species: 'Lilypad Hopper',
    emoji: '🐸',
    rarity: 'Uncommon',
    description: 'A lively emerald tree frog wearing a blooming water lily crown upon its head.',
    lore: 'Guides heroes safely across the mist-shrouded riverbanks and waterfall bridges of Silver Village.',
    price: 800,
    requirement: {
      type: 'gold',
      goldPrice: 800,
      description: '800 Gold',
    },
    primaryColor: '#22c55e',
    accentColor: '#86efac',
    glowColor: '#bbf7d0',
  },
  {
    id: 'foxlet',
    name: 'Foxlet',
    species: 'Ember Kitsune',
    emoji: '🦊',
    rarity: 'Uncommon',
    description: 'A clever autumn-orange fox cub with twin bushy white-tipped tails and keen golden eyes.',
    lore: 'Known for its uncanny wit and swift reflexes. Frequently seen darting through the bustling bazaars of Gold City.',
    price: 1000,
    requirement: {
      type: 'gold',
      goldPrice: 1000,
      description: '1,000 Gold',
    },
    primaryColor: '#f97316',
    accentColor: '#fdba74',
    glowColor: '#fed7aa',
  },
  {
    id: 'owlio',
    name: 'Owlio',
    species: 'Astral Owl',
    emoji: '🦉',
    rarity: 'Rare',
    description: 'A majestic midnight-blue barn owl with starlight-tipped feathers and wise golden spectacles.',
    lore: 'Perches on highest crystal spires observing celestial orbits and calculating optimal quest strategies.',
    price: 1500,
    requirement: {
      type: 'gold',
      goldPrice: 1500,
      description: '1,500 Gold',
    },
    primaryColor: '#3b82f6',
    accentColor: '#93c5fd',
    glowColor: '#60a5fa',
  },
  {
    id: 'flameling',
    name: 'Flameling',
    species: 'Phoenix Ember',
    emoji: '🔥',
    rarity: 'Epic',
    description: 'A radiant elemental spirit of dancing ruby and amber flames that never extinguish.',
    lore: 'Born from the passion of unbreakable discipline. Awakens only for heroes who have conquered 100 life quests.',
    price: 0,
    requirement: {
      type: 'quests',
      minQuestsCompleted: 100,
      description: 'Complete 100 Quests',
    },
    primaryColor: '#ef4444',
    accentColor: '#f59e0b',
    glowColor: '#f87171',
  },
  {
    id: 'voltari',
    name: 'Voltari',
    species: 'Thunder Sprite',
    emoji: '⚡',
    rarity: 'Epic',
    description: 'An electric storm creature crackling with pure azure lightning bolts and boundless stamina.',
    lore: 'Channels the relentless energy of unwavering consistency. Only bonds with champions who maintain a 30-day streak.',
    price: 0,
    requirement: {
      type: 'streak',
      minStreak: 30,
      description: '30-Day Streak',
    },
    primaryColor: '#06b6d4',
    accentColor: '#facc15',
    glowColor: '#67e8f9',
  },
  {
    id: 'moonpaw',
    name: 'Moonpaw',
    species: 'Noctara Panther',
    emoji: '🌙',
    rarity: 'Epic',
    description: 'A sleek celestial shadow panther with glowing lunar crescent marks and stardust eyes.',
    lore: 'Prowls the high crystalline bridges of Diamond City, visible only to master adventurers who reach Diamond League.',
    price: 0,
    requirement: {
      type: 'league',
      minLeague: 'Diamond',
      description: 'Reach Diamond League',
    },
    primaryColor: '#8b5cf6',
    accentColor: '#c084fc',
    glowColor: '#d8b4fe',
  },
  {
    id: 'drakori',
    name: 'Drakori',
    species: 'Sky Dragon',
    emoji: '🐉',
    rarity: 'Legendary',
    description: 'A magnificent royal celestial dragon wyrm with iridescent amethyst scales and starry wings.',
    lore: 'The ancient guardian of the Mythical Sky Throne. Acknowledges only true RPG masters of supreme accomplishment.',
    price: 25000,
    requirement: {
      type: 'complex',
      minLevel: 30,
      goldPrice: 25000,
      minLeague: 'Diamond',
      specialAchievement: 'Dragon Master',
      description: 'Level 30 + 25,000 Gold + Diamond League (Special Achievement)',
    },
    primaryColor: '#a855f7',
    accentColor: '#f59e0b',
    glowColor: '#e879f9',
  },
];

export const PET_ROSTER: PetDef[] = ALL_PETS;

/**
 * Normalizes player pet state to ensure valid ownedPetIds and equippedPetId
 */
export const normalizePlayerPets = (pets?: Partial<PlayerPetsState> | null): PlayerPetsState => {
  if (!pets) {
    return {
      ownedPetIds: ['bunbun'], // Starter companion
      equippedPetId: 'bunbun',
    };
  }

  const ownedPetIds = Array.isArray(pets.ownedPetIds)
    ? Array.from(new Set(pets.ownedPetIds.filter((id): id is string => typeof id === 'string' && id.length > 0)))
    : ['bunbun'];

  if (ownedPetIds.length === 0) {
    ownedPetIds.push('bunbun');
  }

  let equippedPetId = pets.equippedPetId ?? null;
  if (equippedPetId && !ownedPetIds.includes(equippedPetId)) {
    equippedPetId = ownedPetIds[0] || null;
  }

  return {
    ownedPetIds,
    equippedPetId,
    devLockedPetIds: Array.isArray(pets.devLockedPetIds) ? Array.from(new Set(pets.devLockedPetIds)) : [],
  };
};

/**
 * Get pet definition by ID
 */
export const getPetById = (id: string): PetDef | undefined => {
  return ALL_PETS.find((p) => p.id === id);
};

/**
 * Check if player owns a specific pet
 * Supports both isPetOwned(petsState, petId) and isPetOwned(player, petId) and isPetOwned(petId, player)
 */
export const isPetOwned = (
  arg1: string | PlayerState | Partial<PlayerPetsState> | null | undefined,
  arg2?: string | PlayerState | Partial<PlayerPetsState> | null
): boolean => {
  let petId: string = '';
  let petsState: PlayerPetsState;

  if (typeof arg1 === 'string') {
    petId = arg1;
    if (arg2 && 'pets' in (arg2 as object)) {
      petsState = normalizePlayerPets((arg2 as PlayerState).pets);
    } else {
      petsState = normalizePlayerPets(arg2 as Partial<PlayerPetsState>);
    }
  } else {
    petId = typeof arg2 === 'string' ? arg2 : '';
    if (arg1 && 'pets' in (arg1 as object)) {
      petsState = normalizePlayerPets((arg1 as PlayerState).pets);
    } else {
      petsState = normalizePlayerPets(arg1 as Partial<PlayerPetsState>);
    }
  }

  return petsState.ownedPetIds.includes(petId);
};

/**
 * Check if a pet is currently equipped
 */
export const isPetEquipped = (
  arg1: PlayerState | Partial<PlayerPetsState> | null | undefined,
  arg2: string
): boolean => {
  const petsState = arg1 && 'pets' in (arg1 as object)
    ? normalizePlayerPets((arg1 as PlayerState).pets)
    : normalizePlayerPets(arg1 as Partial<PlayerPetsState>);
  return petsState.equippedPetId === arg2;
};

const TIER_ORDER: Record<string, number> = {
  Bronze: 1,
  Silver: 2,
  Gold: 3,
  Diamond: 4,
  Mythical: 5,
};

/**
 * Check if player meets all unlock requirements for a pet
 * Supports checkPetUnlockEligibility(player, pet, questsCount) and checkPetUnlockEligibility(pet, player, questsCount)
 */
export const checkPetUnlockEligibility = (
  arg1: PlayerState | PetDef,
  arg2: PlayerState | PetDef,
  completedQuestsCount: number = 0
): { canUnlock: boolean; eligible: boolean; reason?: string; missingReasons: string[] } => {
  const player = 'character' in (arg1 as object) ? (arg1 as PlayerState) : (arg2 as PlayerState);
  const pet = 'rarity' in (arg1 as object) ? (arg1 as PetDef) : (arg2 as PetDef);

  if (player.pets?.devLockedPetIds?.includes(pet.id)) {
    return {
      canUnlock: false,
      eligible: false,
      reason: '🔒 Locked by Developer',
      missingReasons: ['Locked by Developer override'],
    };
  }

  const missingReasons: string[] = [];
  const req = pet.requirement;
  const playerGold = player.economy?.gold ?? 0;
  const playerLevel = player.progression?.level ?? 1;
  const playerStreak = player.consistency?.streak ?? 0;
  const playerLeagueTier = player.league?.tier ?? 'Bronze';

  // 1. Gold price check
  if (req.goldPrice && req.goldPrice > 0) {
    if (playerGold < req.goldPrice) {
      missingReasons.push(`Requires ${req.goldPrice.toLocaleString()} Gold (You have ${playerGold.toLocaleString()} Gold)`);
    }
  }

  // 2. Level requirement check
  if (req.minLevel && req.minLevel > 0) {
    if (playerLevel < req.minLevel) {
      missingReasons.push(`Requires Level ${req.minLevel} (Current: Level ${playerLevel})`);
    }
  }

  // 3. Streak requirement check
  if (req.minStreak && req.minStreak > 0) {
    if (playerStreak < req.minStreak) {
      missingReasons.push(`Requires ${req.minStreak}-day streak (Current: ${playerStreak} days)`);
    }
  }

  // 4. League requirement check
  if (req.minLeague) {
    const minTierVal = TIER_ORDER[req.minLeague] ?? 1;
    const currentTierVal = TIER_ORDER[playerLeagueTier] ?? 1;
    if (currentTierVal < minTierVal) {
      missingReasons.push(`Requires reaching ${req.minLeague} League (Current: ${playerLeagueTier} League)`);
    }
  }

  // 5. Quest count check
  if (req.minQuestsCompleted && req.minQuestsCompleted > 0) {
    if (completedQuestsCount < req.minQuestsCompleted) {
      missingReasons.push(`Requires completing ${req.minQuestsCompleted} quests (Current: ${completedQuestsCount})`);
    }
  }

  const canUnlock = missingReasons.length === 0;
  return {
    canUnlock,
    eligible: canUnlock,
    reason: missingReasons.join(', '),
    missingReasons,
  };
};

/**
 * Buy or claim an eligible pet with exact state validation and duplicate prevention
 * Supports buyOrUnlockPet(player, petId, questsCount) and buyOrUnlockPet(petId, player, questsCount)
 */
export const buyOrUnlockPet = (
  arg1: PlayerState | string,
  arg2: PlayerState | string,
  completedQuestsCount: number = 0
): { success: boolean; updatedPlayer: PlayerState; message?: string; error?: string } => {
  const player = typeof arg1 === 'object' ? arg1 : (arg2 as PlayerState);
  const petId = typeof arg1 === 'string' ? arg1 : (arg2 as string);

  const pet = getPetById(petId);
  if (!pet) {
    return { success: false, updatedPlayer: player, message: 'Creature not found in registry.', error: 'Creature not found in registry.' };
  }

  const currentPets = normalizePlayerPets(player.pets);
  if (currentPets.ownedPetIds.includes(petId)) {
    return { success: false, updatedPlayer: player, message: 'You already own this creature!', error: 'You already own this creature!' };
  }

  const eligibility = checkPetUnlockEligibility(player, pet, completedQuestsCount);
  if (!eligibility.canUnlock) {
    const errorMsg = `Unlock requirements not met: ${eligibility.missingReasons.join(', ')}`;
    return {
      success: false,
      updatedPlayer: player,
      message: errorMsg,
      error: errorMsg,
    };
  }

  // Deduct gold if required
  const goldCost = pet.requirement.goldPrice || (pet.requirement.type === 'gold' ? pet.price : 0);
  const currentGold = player.economy?.gold ?? 0;
  if (goldCost > 0 && currentGold < goldCost) {
    return { success: false, updatedPlayer: player, message: 'Insufficient Gold balance.', error: 'Insufficient Gold balance.' };
  }

  const updatedGold = goldCost > 0 ? currentGold - goldCost : currentGold;

  const updatedPlayer: PlayerState = {
    ...player,
    economy: {
      ...player.economy,
      gold: updatedGold,
    },
    pets: {
      ...currentPets,
      ownedPetIds: [...currentPets.ownedPetIds, petId],
    },
  };

  return {
    success: true,
    updatedPlayer,
    message: `Unlocked ${pet.name}!`,
  };
};

/**
 * Equip or unequip a pet
 * Supports equipPet(player, petId) and equipPet(petId, player)
 */
export const equipPet = (
  arg1: PlayerState | string | null,
  arg2?: PlayerState | string | null
): { success: boolean; updatedPlayer: PlayerState } => {
  let player: PlayerState;
  let petId: string | null = null;

  if (arg1 === null || typeof arg1 === 'string') {
    petId = arg1;
    player = arg2 as PlayerState;
  } else {
    player = arg1 as PlayerState;
    petId = (arg2 as string | null) ?? null;
  }

  const currentPets = normalizePlayerPets(player.pets);

  if (petId === null) {
    return {
      success: true,
      updatedPlayer: {
        ...player,
        pets: {
          ...currentPets,
          equippedPetId: null,
        },
      },
    };
  }

  if (!currentPets.ownedPetIds.includes(petId)) {
    return { success: false, updatedPlayer: player };
  }

  return {
    success: true,
    updatedPlayer: {
      ...player,
      pets: {
        ...currentPets,
        equippedPetId: petId,
      },
    },
  };
};
