export type CosmeticCategory = 'headwear' | 'outfit' | 'accessory';

export interface CosmeticItemDef {
  id: string;
  name: string;
  category: CosmeticCategory;
  price: number; // in Gold
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  icon: string;
  description: string;
  perkText?: string;
  previewColor?: string;
  // Specific visual properties applied when equipped
  accentHex?: string;
  badge?: string;
}

export interface PlayerCosmeticsState {
  ownedCosmeticIds: string[]; // IDs of purchased cosmetics
  equippedCosmetics: {
    headwear?: string | null;
    outfit?: string | null;
    accessory?: string | null;
  };
  devLockedCosmeticIds?: string[]; // Explicit developer-locked items
}
