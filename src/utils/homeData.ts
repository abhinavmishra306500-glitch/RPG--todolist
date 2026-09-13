import type { HomeFurnitureItem, PlayerHomeState } from '../types/home';

export const DEFAULT_HOME_FURNITURE: HomeFurnitureItem[] = [
  {
    id: 'furn_cozy_bed',
    name: 'Cozy Oak Bed',
    category: 'bed',
    icon: '🛏️',
    description: 'A comfortable four-poster bed made of polished oak and downy cotton pillows. Provides complete rest and rejuvenation after questing.',
    cozyPoints: 100,
    isDefault: true,
  },
  {
    id: 'furn_study_bookshelf',
    name: 'Wisdom Bookshelf',
    category: 'bookshelf',
    icon: '📚',
    description: 'Carved pine shelves stocked with ancient lore, world maps, quest logs, and personal journals.',
    cozyPoints: 80,
    isDefault: true,
  },
  {
    id: 'furn_houseplant_fern',
    name: 'Lively Potted Fern',
    category: 'plant',
    icon: '🪴',
    description: 'A thriving green houseplant that purifies the air and flourishes with your consistent daily streak.',
    cozyPoints: 40,
    isDefault: true,
  },
  {
    id: 'furn_dining_chair',
    name: 'Crafted Wooden Chair & Table',
    category: 'seating',
    icon: '🪑',
    description: 'A rustic hand-carved chair and tea table for planning your daily tasks and enjoying hot herbal tea.',
    cozyPoints: 50,
    isDefault: true,
  },
];

export const PREVIEW_HOME_SHOP_ITEMS: HomeFurnitureItem[] = [
  {
    id: 'furn_royal_canopy_bed',
    name: 'Royal Gilded Canopy Bed',
    category: 'bed',
    icon: '👑',
    description: 'Velvet-draped canopy bed woven with golden threads. Fit for a champion of the realm.',
    cozyPoints: 350,
    previewPrice: 2500,
  },
  {
    id: 'furn_celestial_chandelier',
    name: 'Starlight Crystal Chandelier',
    category: 'decor',
    icon: '🕯️',
    description: 'Hangs from the ceiling radiating gentle celestial ambient light.',
    cozyPoints: 220,
    previewPrice: 1800,
  },
  {
    id: 'furn_bonsai_zen',
    name: 'Enchanted Bonsai Tree',
    category: 'plant',
    icon: '🌸',
    description: 'A tranquil bonsai that blooms with perpetual pink blossoms.',
    cozyPoints: 180,
    previewPrice: 1200,
  },
  {
    id: 'furn_world_map_tapestry',
    name: 'World Map Tapestry',
    category: 'decor',
    icon: '🖼️',
    description: 'Woven tapestry displaying the 5 magical worlds from Bronze Village to Mythical Castle.',
    cozyPoints: 200,
    previewPrice: 1500,
  },
  {
    id: 'furn_deluxe_pet_cushion',
    name: 'Plush Pet Cushion & Toy Basket',
    category: 'rug',
    icon: '🧸',
    description: 'An ultra-soft velvet cushion where your equipped pet companion loves to nap.',
    cozyPoints: 260,
    previewPrice: 1600,
  },
  {
    id: 'furn_grand_fireplace',
    name: 'Cozy Stone Hearth',
    category: 'decor',
    icon: '🔥',
    description: 'Crackling hearth that fills the room with comforting warmth.',
    cozyPoints: 300,
    previewPrice: 2200,
  },
];

export const normalizePlayerHome = (home?: Partial<PlayerHomeState> | null): PlayerHomeState => {
  return {
    wallpaperId: home?.wallpaperId ?? 'cottage_wood',
    flooringId: home?.flooringId ?? 'oak_planks',
    unlockedFurnitureIds: Array.isArray(home?.unlockedFurnitureIds)
      ? Array.from(new Set(home.unlockedFurnitureIds))
      : DEFAULT_HOME_FURNITURE.map((f) => f.id),
    cozinessRating: home?.cozinessRating ?? 270,
  };
};
