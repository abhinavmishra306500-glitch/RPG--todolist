import type { MapWorldDef, MapLevelDef, MapProgressionState, MapNodeState, Point2D } from '../types/map';
import type { PlayerState } from '../types/progression';

/**
 * 🥉 WORLD 1: BRONZE VILLAGE (Levels 1 - 10)
 * Cozy starting rural hamlet with green pastures, wooden fences, and simple rustic trails.
 */
export const BRONZE_VILLAGE_LEVELS: MapLevelDef[] = [
  {
    id: 1,
    levelNumber: 1,
    name: "Hero's Homestead",
    worldId: 'bronze-village',
    description: 'The cozy starter meadow where your adventure begins.',
    icon: '🏡',
    position: { x: 100, y: 780 },
    pathPointsToNext: [{ x: 160, y: 810 }, { x: 200, y: 830 }],
  },
  {
    id: 2,
    levelNumber: 2,
    name: 'South Meadow Trail',
    worldId: 'bronze-village',
    description: 'A quiet open grass corridor south of the lush hedge grove.',
    icon: '🍀',
    position: { x: 240, y: 830 },
    pathPointsToNext: [{ x: 320, y: 830 }, { x: 380, y: 780 }],
  },
  {
    id: 3,
    levelNumber: 3,
    name: 'Central Grove Crossing',
    worldId: 'bronze-village',
    description: 'An open clearing nestled between natural hedge partitions.',
    icon: '🪵',
    position: { x: 430, y: 720 },
    pathPointsToNext: [{ x: 490, y: 680 }, { x: 540, y: 650 }],
  },
  {
    id: 4,
    levelNumber: 4,
    name: 'Crystal Pond Shore',
    worldId: 'bronze-village',
    description: 'A serene trail winding gently above the azure blue pond.',
    icon: '💧',
    position: { x: 580, y: 640 },
    pathPointsToNext: [{ x: 680, y: 640 }, { x: 780, y: 630 }],
  },
  {
    id: 5,
    levelNumber: 5,
    name: 'Eastern Meadow Pass',
    worldId: 'bronze-village',
    description: 'An open grassy expanse along the eastern forest boundary.',
    icon: '🌾',
    position: { x: 880, y: 620 },
    pathPointsToNext: [{ x: 880, y: 520 }, { x: 880, y: 440 }],
  },
  {
    id: 6,
    levelNumber: 6,
    name: 'North-East Ridge Trail',
    worldId: 'bronze-village',
    description: 'A sunlit route ascending toward the upper village pastures.',
    icon: '🌲',
    position: { x: 880, y: 350 },
    pathPointsToNext: [{ x: 840, y: 270 }, { x: 790, y: 230 }],
  },
  {
    id: 7,
    levelNumber: 7,
    name: 'Highland Hedge Gate',
    worldId: 'bronze-village',
    description: 'The open avenue connecting the eastern and central groves.',
    icon: '🌿',
    position: { x: 740, y: 220 },
    pathPointsToNext: [{ x: 650, y: 260 }, { x: 560, y: 320 }],
  },
  {
    id: 8,
    levelNumber: 8,
    name: 'Central Village Clearing',
    worldId: 'bronze-village',
    description: 'A spacious central meadow framed by vibrant green hedges.',
    icon: '🍺',
    position: { x: 480, y: 360 },
    pathPointsToNext: [{ x: 380, y: 400 }, { x: 300, y: 440 }],
  },
  {
    id: 9,
    levelNumber: 9,
    name: 'Western Pine Approach',
    worldId: 'bronze-village',
    description: 'A shaded avenue leading toward the pinnacle bronze sanctuary.',
    icon: '⚒️',
    position: { x: 240, y: 480 },
    pathPointsToNext: [{ x: 180, y: 400 }, { x: 130, y: 310 }],
  },
  {
    id: 10,
    levelNumber: 10,
    name: 'Bronze Sanctuary Pinnacle',
    worldId: 'bronze-village',
    description: 'The final destination of World 1 marking mastery of Bronze Village.',
    icon: '⭐',
    position: { x: 120, y: 240 },
  },
];

/**
 * 🥈 WORLD 2: SILVER VILLAGE (Levels 11 - 20)
 * Handcrafted RPG fantasy village: Windmill hill, twin waterfalls, grand fountain plaza,
 * market shops with striped awnings, red-roof cottages, timber river bridges, and golden wheat fields.
 */
export const SILVER_VILLAGE_LEVELS: MapLevelDef[] = [
  {
    id: 11,
    levelNumber: 11,
    name: 'South-West Village Gateway',
    worldId: 'silver-village',
    description: 'The cozy rural entryway to Silver Village, framed by flowerbeds, lush oaks, and red-tiled cottages.',
    icon: '🏡',
    position: { x: 215, y: 770 },
    pathPointsToNext: [
      { x: 215, y: 710 },
      { x: 225, y: 620 },
    ],
  },
  {
    id: 12,
    levelNumber: 12,
    name: 'West Village Tavern & Market',
    worldId: 'silver-village',
    description: 'A bustling merchant corner with purple striped awnings, produce stalls, and warm village chatter.',
    icon: '🛍️',
    position: { x: 245, y: 550 },
    pathPointsToNext: [
      { x: 260, y: 490 },
      { x: 300, y: 465 },
    ],
  },
  {
    id: 13,
    levelNumber: 13,
    name: 'Grand Fountain Plaza',
    worldId: 'silver-village',
    description: 'The iconic cobblestone town square centered around a majestic carved stone fountain with crystal waters.',
    icon: '⛲',
    position: { x: 335, y: 455 },
    pathPointsToNext: [
      { x: 270, y: 430 },
      { x: 210, y: 340 },
      { x: 185, y: 270 },
    ],
  },
  {
    id: 14,
    levelNumber: 14,
    name: 'Highland Windmill Ridge',
    worldId: 'silver-village',
    description: 'A breezy hill overlooking the whole valley, crowned with an authentic wooden sail windmill and cherry blossoms.',
    icon: '🌾',
    position: { x: 175, y: 220 },
    pathPointsToNext: [
      { x: 230, y: 170 },
      { x: 290, y: 160 },
      { x: 340, y: 180 },
    ],
  },
  {
    id: 15,
    levelNumber: 15,
    name: 'North Alpine Hamlet',
    worldId: 'silver-village',
    description: 'Sunlit mountain cottages nestled beneath the rocky cliff face and pine forest canopy.',
    icon: '🏠',
    position: { x: 370, y: 220 },
    pathPointsToNext: [
      { x: 420, y: 240 },
      { x: 480, y: 310 },
      { x: 520, y: 380 },
      { x: 535, y: 440 },
    ],
  },
  {
    id: 16,
    levelNumber: 16,
    name: 'North Timber River Bridge',
    worldId: 'silver-village',
    description: 'An arched wooden plank bridge spanning the roaring river rapids connecting the west plaza to the east market.',
    icon: '🌉',
    position: { x: 560, y: 445 },
    pathPointsToNext: [
      { x: 595, y: 445 },
      { x: 650, y: 450 },
    ],
  },
  {
    id: 17,
    levelNumber: 17,
    name: 'East Riverbank Market',
    worldId: 'silver-village',
    description: 'A vibrant merchant hub with red-striped bazaar canopies and cozy waterfront residences.',
    icon: '🛖',
    position: { x: 710, y: 460 },
    pathPointsToNext: [
      { x: 745, y: 510 },
      { x: 760, y: 570 },
      { x: 800, y: 620 },
    ],
  },
  {
    id: 18,
    levelNumber: 18,
    name: 'East Farmland & Golden Fields',
    worldId: 'silver-village',
    description: 'Lush fenced crop plots filled with golden wheat, ripe pumpkins, and fresh garden vegetables.',
    icon: '🌻',
    position: { x: 850, y: 640 },
    pathPointsToNext: [
      { x: 770, y: 690 },
      { x: 700, y: 720 },
      { x: 620, y: 710 },
    ],
  },
  {
    id: 19,
    levelNumber: 19,
    name: 'South Timber River Bridge',
    worldId: 'silver-village',
    description: 'A scenic river crossing linking the southeastern forest forge back across the azure waters.',
    icon: '🌊',
    position: { x: 580, y: 710 },
    pathPointsToNext: [
      { x: 530, y: 710 },
      { x: 480, y: 650 },
      { x: 520, y: 520 },
      { x: 600, y: 400 },
      { x: 690, y: 330 },
      { x: 760, y: 270 },
    ],
  },
  {
    id: 20,
    levelNumber: 20,
    name: 'Silver Mountain Waterfall Sanctuary',
    worldId: 'silver-village',
    description: 'The pinnacle of World 2, perched high beside the thundering mountain waterfall with panoramic village views.',
    icon: '⭐',
    position: { x: 820, y: 240 },
  },
];

/**
 * 🥇 WORLD 3: GOLD CITY (Levels 21 - 30)
 * Grand trading capital: Stately citadel walls & portcullis gates, central royal palace & cathedral,
 * hero monument plaza, Victorian lamps, vibrant merchant bazaar, dual fountains, and maritime harbor.
 */
export const GOLD_CITY_LEVELS: MapLevelDef[] = [
  {
    id: 21,
    levelNumber: 21,
    name: 'South-West Fortress Portcullis',
    worldId: 'gold-city',
    description: 'The monumental stone gatehouse of Gold City, crowned with golden onion turrets and royal heraldic banners.',
    icon: '🏰',
    position: { x: 345, y: 880 },
    pathPointsToNext: [
      { x: 345, y: 780 },
      { x: 280, y: 720 },
      { x: 230, y: 670 },
    ],
  },
  {
    id: 22,
    levelNumber: 22,
    name: 'West District Bazaar Marketplace',
    worldId: 'gold-city',
    description: 'A vibrant merchant street crowded with colorful striped awnings, exotic spices, silk fabrics, and brass lanterns.',
    icon: '🎪',
    position: { x: 220, y: 660 },
    pathPointsToNext: [
      { x: 260, y: 660 },
      { x: 295, y: 680 },
    ],
  },
  {
    id: 23,
    levelNumber: 23,
    name: 'West Plaza Lion Fountain',
    worldId: 'gold-city',
    description: 'A dazzling circular stone plaza featuring a golden sculpted lion fountain spraying crystalline blue waters.',
    icon: '⛲',
    position: { x: 335, y: 690 },
    pathPointsToNext: [
      { x: 335, y: 580 },
      { x: 280, y: 480 },
      { x: 240, y: 380 },
    ],
  },
  {
    id: 24,
    levelNumber: 24,
    name: 'Northwest Noble Manor & Park',
    worldId: 'gold-city',
    description: 'An elite residential avenue framed by manicured cypress hedges, upper fountain pools, and gilded rooftops.',
    icon: '🏛️',
    position: { x: 230, y: 280 },
    pathPointsToNext: [
      { x: 290, y: 250 },
      { x: 350, y: 230 },
    ],
  },
  {
    id: 25,
    levelNumber: 25,
    name: 'Palace North Approach Avenue',
    worldId: 'gold-city',
    description: 'A sweeping marble boulevard lined with royal banners and golden gas lamps leading directly to the cathedral.',
    icon: '👑',
    position: { x: 420, y: 220 },
    pathPointsToNext: [
      { x: 480, y: 280 },
      { x: 510, y: 350 },
    ],
  },
  {
    id: 26,
    levelNumber: 26,
    name: 'Grand Royal Palace Portal Steps',
    worldId: 'gold-city',
    description: 'The monumental entrance of the Supreme Palace, with double golden doors and cascading marble stairways.',
    icon: '🚪',
    position: { x: 545, y: 420 },
    pathPointsToNext: [
      { x: 555, y: 490 },
      { x: 575, y: 570 },
    ],
  },
  {
    id: 27,
    levelNumber: 27,
    name: 'Grand Plaza Hero Monument',
    worldId: 'gold-city',
    description: 'The historic heart of the capital with an imposing carved stone knight statue and Victorian lantern lamps.',
    icon: '🗿',
    position: { x: 585, y: 640 },
    pathPointsToNext: [
      { x: 650, y: 640 },
      { x: 710, y: 665 },
      { x: 750, y: 700 },
    ],
  },
  {
    id: 28,
    levelNumber: 28,
    name: 'East Maritime Harbor Pier',
    worldId: 'gold-city',
    description: 'Heavy timber pier boardwalks overlooking azure coastal waves where gilded sailing caravels rock on the tide.',
    icon: '⚓',
    position: { x: 780, y: 710 },
    pathPointsToNext: [
      { x: 800, y: 640 },
      { x: 810, y: 560 },
    ],
  },
  {
    id: 29,
    levelNumber: 29,
    name: 'Royal Bazaar Pavilion & Customs',
    worldId: 'gold-city',
    description: 'The grand red-and-white festival bazaar pavilion and the Admiral’s golden customs house by the waterfront.',
    icon: '🎪',
    position: { x: 815, y: 480 },
    pathPointsToNext: [
      { x: 780, y: 380 },
      { x: 710, y: 260 },
      { x: 620, y: 180 },
    ],
  },
  {
    id: 30,
    levelNumber: 30,
    name: 'Sovereign Palace Crown Dome',
    worldId: 'gold-city',
    description: 'The crowning pinnacle of World 3 atop the supreme cathedral spire bathed in golden sunbeams.',
    icon: '⭐',
    position: { x: 545, y: 150 },
  },
];

/**
 * 💎 WORLD 4: DIAMOND CITY (Levels 31 - 40)
 * Arcane crystalline wonderland: Grand crystal palace with floating diamond core,
 * double waterfall aqueduct bridges, circular runic diamond fountain plaza,
 * mountain ridge lookout, and glowing amethyst floating island altars.
 */
export const DIAMOND_CITY_LEVELS: MapLevelDef[] = [
  {
    id: 31,
    levelNumber: 31,
    name: 'Southwest Crystal Sanctuary',
    worldId: 'diamond-city',
    description: 'A radiant hexagonal stone platform surrounded by towering cyan mana crystals and violet foliage.',
    icon: '💠',
    position: { x: 145, y: 870 },
    pathPointsToNext: [
      { x: 145, y: 780 },
      { x: 150, y: 690 },
      { x: 160, y: 620 },
    ],
  },
  {
    id: 32,
    levelNumber: 32,
    name: 'West Spire Watchtower Avenue',
    worldId: 'diamond-city',
    description: 'A magnificent crystal spire watchtower overlooking the misty western cliffs and glowing crystal clusters.',
    icon: '🏛️',
    position: { x: 160, y: 560 },
    pathPointsToNext: [
      { x: 210, y: 520 },
      { x: 265, y: 490 },
      { x: 310, y: 535 },
    ],
  },
  {
    id: 33,
    levelNumber: 33,
    name: 'West Double Waterfall Bridge',
    worldId: 'diamond-city',
    description: 'An arched crystal stone bridge spanning across roaring twin waterfalls cascading into the azure abyss.',
    icon: '🌉',
    position: { x: 370, y: 580 },
    pathPointsToNext: [
      { x: 440, y: 580 },
      { x: 500, y: 570 },
    ],
  },
  {
    id: 34,
    levelNumber: 34,
    name: 'Grand Diamond Fountain Plaza',
    worldId: 'diamond-city',
    description: 'The monumental circular cobblestone plaza centered around a giant faceted diamond fountain spraying liquid starlight.',
    icon: '⛲',
    position: { x: 585, y: 560 },
    pathPointsToNext: [
      { x: 585, y: 500 },
      { x: 585, y: 460 },
    ],
  },
  {
    id: 35,
    levelNumber: 35,
    name: 'Arcane Palace Portal Steps',
    worldId: 'diamond-city',
    description: 'The grand marble entryway to the Supreme Crystal Palace, guarded by glowing crystal pillars and golden doors.',
    icon: '🏰',
    position: { x: 585, y: 430 },
    pathPointsToNext: [
      { x: 640, y: 450 },
      { x: 675, y: 380 },
      { x: 700, y: 300 },
    ],
  },
  {
    id: 36,
    levelNumber: 36,
    name: 'Northeast Spire Lookout',
    worldId: 'diamond-city',
    description: 'An elevated crystalline turret nestled against pink cherry blossoms with panoramic views of the city.',
    icon: '🔮',
    position: { x: 710, y: 230 },
    pathPointsToNext: [
      { x: 770, y: 200 },
      { x: 830, y: 210 },
    ],
  },
  {
    id: 37,
    levelNumber: 37,
    name: 'East Mountain Ridge Sanctuary',
    worldId: 'diamond-city',
    description: 'A high alpine sanctuary perched above mountain cascades and dense amethyst crystal formations.',
    icon: '🏔️',
    position: { x: 880, y: 220 },
    pathPointsToNext: [
      { x: 860, y: 330 },
      { x: 845, y: 430 },
      { x: 830, y: 510 },
    ],
  },
  {
    id: 38,
    levelNumber: 38,
    name: 'East Aqueduct Viaduct Bridge',
    worldId: 'diamond-city',
    description: 'A majestic double-arch stone viaduct bridge with waterfalls thundering beneath into the glowing chasm.',
    icon: '🌉',
    position: { x: 810, y: 570 },
    pathPointsToNext: [
      { x: 770, y: 640 },
      { x: 780, y: 720 },
    ],
  },
  {
    id: 39,
    levelNumber: 39,
    name: 'Southeast Amethyst Island Altar',
    worldId: 'diamond-city',
    description: 'A mystical floating island altar surrounded by swirling river eddies and glowing magenta crystals.',
    icon: '✨',
    position: { x: 805, y: 810 },
    pathPointsToNext: [
      { x: 740, y: 730 },
      { x: 670, y: 620 },
      { x: 630, y: 480 },
      { x: 600, y: 320 },
      { x: 585, y: 240 },
    ],
  },
  {
    id: 40,
    levelNumber: 40,
    name: 'Supreme Floating Diamond Core',
    worldId: 'diamond-city',
    description: 'The crowning zenith of World 4: a colossal levitating diamond core radiating supreme celestial energy.',
    icon: '⭐',
    position: { x: 585, y: 180 },
  },
];

/**
 * 👑 WORLD 5: MYTHICAL CASTLE (Levels 41 - 50)
 * Grand endgame celestial sky citadel with dragon aeries, celestial starlight paths, and divine sanctuary.
 */
export const MYTHICAL_CASTLE_LEVELS: MapLevelDef[] = [
  {
    id: 41,
    levelNumber: 41,
    name: 'Starlight Staircase',
    worldId: 'mythical-castle',
    description: 'Steps formed of cosmic stardust ascending into the boundless clouds.',
    icon: '🌌',
    position: { x: 190, y: 800 },
    pathPointsToNext: [{ x: 240, y: 770 }, { x: 290, y: 720 }, { x: 340, y: 670 }],
  },
  {
    id: 42,
    levelNumber: 42,
    name: 'Dragon Roost Bastion',
    worldId: 'mythical-castle',
    description: 'Perches carved into ancient obsidian peaks where friendly mythical guardian dragons rest.',
    icon: '🐉',
    position: { x: 360, y: 650 },
    pathPointsToNext: [{ x: 400, y: 610 }, { x: 450, y: 570 }, { x: 500, y: 530 }],
  },
  {
    id: 43,
    levelNumber: 43,
    name: 'Aurora Rainbow Causeway',
    worldId: 'mythical-castle',
    description: 'A vibrant ribbon of dancing prismatic aurora borealis spanning across the heavens.',
    icon: '🌈',
    position: { x: 530, y: 510 },
    pathPointsToNext: [{ x: 580, y: 490 }, { x: 640, y: 480 }, { x: 700, y: 490 }],
  },
  {
    id: 44,
    levelNumber: 44,
    name: 'Hall of Legendary Heroes',
    worldId: 'mythical-castle',
    description: 'Statues of champions who conquered procrastination and mastered their real-world destiny.',
    icon: '🏛️',
    position: { x: 720, y: 500 },
    pathPointsToNext: [{ x: 740, y: 450 }, { x: 730, y: 390 }, { x: 690, y: 340 }],
  },
  {
    id: 45,
    levelNumber: 45,
    name: 'Phoenix Flame Garden',
    worldId: 'mythical-castle',
    description: 'Ever-burning warm golden embers that symbolize perpetual rebirth, discipline, and endurance.',
    icon: '🔥',
    position: { x: 660, y: 320 },
    pathPointsToNext: [{ x: 600, y: 300 }, { x: 540, y: 290 }, { x: 480, y: 300 }],
  },
  {
    id: 46,
    levelNumber: 46,
    name: 'Cosmic Reflection Chamber',
    worldId: 'mythical-castle',
    description: 'A serene celestial mirror reflecting the hero’s true discipline, strength, and life wisdom.',
    icon: '🪞',
    position: { x: 450, y: 310 },
    pathPointsToNext: [{ x: 390, y: 310 }, { x: 340, y: 280 }, { x: 300, y: 240 }],
  },
  {
    id: 47,
    levelNumber: 47,
    name: 'Grand Mythic Citadel Gate',
    worldId: 'mythical-castle',
    description: 'The golden adamantine portcullis of the supreme castle in the clouds.',
    icon: '🏰',
    position: { x: 280, y: 210 },
    pathPointsToNext: [{ x: 300, y: 160 }, { x: 340, y: 130 }, { x: 400, y: 110 }],
  },
  {
    id: 48,
    levelNumber: 48,
    name: 'Sanctum of the Crown',
    worldId: 'mythical-castle',
    description: 'A vaulted cathedral of divine light and celestial harmony.',
    icon: '👑',
    position: { x: 440, y: 110 },
    pathPointsToNext: [{ x: 500, y: 110 }, { x: 560, y: 120 }, { x: 620, y: 140 }],
  },
  {
    id: 49,
    levelNumber: 49,
    name: 'Celestial Dragon Ascent',
    worldId: 'mythical-castle',
    description: 'The highest staircase soaring above the clouds toward the supreme throne.',
    icon: '✨',
    position: { x: 650, y: 150 },
    pathPointsToNext: [{ x: 700, y: 160 }, { x: 750, y: 160 }, { x: 790, y: 150 }],
  },
  {
    id: 50,
    levelNumber: 50,
    name: 'Mythical Crown Pinnacle',
    worldId: 'mythical-castle',
    description: 'The ultimate pinnacle of human accomplishment and RPG mastery.',
    icon: '⭐',
    position: { x: 810, y: 140 },
  },
];

/**
 * 5 Full World Definitions
 */
export const BRONZE_VILLAGE_WORLD: MapWorldDef = {
  id: 'bronze-village',
  leagueTier: 'Bronze',
  name: 'Bronze Village',
  badge: '🥉 World 1',
  theme: 'bronze',
  accentColor: '#d97706',
  description: 'A peaceful, pastoral starter village with lush green fields, wooden bridges, and cozy cottages.',
  startLevel: 1,
  endLevel: 10,
  levels: BRONZE_VILLAGE_LEVELS,
};

export const SILVER_VILLAGE_WORLD: MapWorldDef = {
  id: 'silver-village',
  leagueTier: 'Silver',
  name: 'Silver Village',
  badge: '🥈 World 2',
  theme: 'silver',
  accentColor: '#94a3b8',
  description: 'A scenic river valley with dense forest canopies, wooden bridges, mountain caves, and castle watchtowers.',
  startLevel: 11,
  endLevel: 20,
  levels: SILVER_VILLAGE_LEVELS,
};

export const GOLD_CITY_WORLD: MapWorldDef = {
  id: 'gold-city',
  leagueTier: 'Gold',
  name: 'Gold City',
  badge: '🥇 World 3',
  theme: 'gold',
  accentColor: '#eab308',
  description: 'A glorious imperial city with paved avenues, grand market plazas, aqueducts, and gilded palaces.',
  startLevel: 21,
  endLevel: 30,
  levels: GOLD_CITY_LEVELS,
};

export const DIAMOND_CITY_WORLD: MapWorldDef = {
  id: 'diamond-city',
  leagueTier: 'Diamond',
  name: 'Diamond City',
  badge: '💎 World 4',
  theme: 'diamond',
  accentColor: '#06b6d4',
  description: 'A high-tech arcane crystalline metropolis hovering with floating light bridges and mana obelisks.',
  startLevel: 31,
  endLevel: 40,
  levels: DIAMOND_CITY_LEVELS,
};

export const MYTHICAL_CASTLE_WORLD: MapWorldDef = {
  id: 'mythical-castle',
  leagueTier: 'Mythical',
  name: 'Mythical Castle',
  badge: '👑 World 5',
  theme: 'mythical',
  accentColor: '#a855f7',
  description: 'A celestial realm in the clouds with rainbow bridges, dragons, and the ultimate hall of legends.',
  startLevel: 41,
  endLevel: 50,
  levels: MYTHICAL_CASTLE_LEVELS,
};

export const ALL_MAP_WORLDS: MapWorldDef[] = [
  BRONZE_VILLAGE_WORLD,
  SILVER_VILLAGE_WORLD,
  GOLD_CITY_WORLD,
  DIAMOND_CITY_WORLD,
  MYTHICAL_CASTLE_WORLD,
];

export const INITIAL_MAP_PROGRESSION: MapProgressionState = {
  currentMapLevel: 1,
  maxUnlockedLevel: 1,
  completedLevels: [],
  selectedWorldId: 'bronze-village',
};

/**
 * Normalizes any player map progression state with safe defaults.
 */
export const normalizeMapProgression = (map?: Partial<MapProgressionState> | null): MapProgressionState => {
  if (!map) return { ...INITIAL_MAP_PROGRESSION };
  const currentMapLevel = typeof map.currentMapLevel === 'number' ? Math.max(1, map.currentMapLevel) : 1;
  const maxUnlockedLevel = typeof map.maxUnlockedLevel === 'number' ? Math.max(currentMapLevel, map.maxUnlockedLevel) : currentMapLevel;
  const completedLevels = Array.isArray(map.completedLevels) ? [...map.completedLevels] : [];
  const selectedWorldId = map.selectedWorldId || getWorldByLevel(currentMapLevel).id;

  return {
    currentMapLevel,
    maxUnlockedLevel,
    completedLevels,
    selectedWorldId,
  };
};

/**
 * Returns World by World ID string.
 */
export const getWorldById = (worldId: string): MapWorldDef => {
  return ALL_MAP_WORLDS.find((w) => w.id === worldId) || SILVER_VILLAGE_WORLD;
};

/**
 * Returns World containing a given Level number.
 */
export const getWorldByLevel = (levelNumber: number): MapWorldDef => {
  return (
    ALL_MAP_WORLDS.find((w) => levelNumber >= w.startLevel && levelNumber <= w.endLevel) ||
    SILVER_VILLAGE_WORLD
  );
};

/**
 * Returns World matching League tier string ('Bronze', 'Silver', 'Gold', etc.).
 */
export const getWorldByTier = (tier: string): MapWorldDef => {
  const norm = tier.toLowerCase();
  return (
    ALL_MAP_WORLDS.find((w) => w.leagueTier.toLowerCase() === norm || w.id.includes(norm)) ||
    SILVER_VILLAGE_WORLD
  );
};

/**
 * Finds level definition anywhere in all worlds.
 */
export const getMapLevelDef = (levelNumber: number): MapLevelDef => {
  for (const world of ALL_MAP_WORLDS) {
    const found = world.levels.find((l) => l.levelNumber === levelNumber);
    if (found) return found;
  }
  return SILVER_VILLAGE_LEVELS[0];
};

/**
 * Determines the state of a specific Map Node.
 */
export const getMapNodeState = (levelNumber: number, progression: MapProgressionState): MapNodeState => {
  if (levelNumber === progression.currentMapLevel) {
    return 'current';
  }
  if (progression.completedLevels.includes(levelNumber) || levelNumber < progression.currentMapLevel) {
    return 'completed';
  }
  if (levelNumber === progression.currentMapLevel + 1 && levelNumber <= progression.maxUnlockedLevel) {
    return 'available';
  }
  if (levelNumber <= progression.maxUnlockedLevel && levelNumber > progression.currentMapLevel) {
    return 'available';
  }
  return 'locked';
};

/**
 * Checks if player is allowed to advance to target level.
 * Linear progression: Can only move forward to currentMapLevel + 1.
 */
export const canAdvanceToLevel = (targetLevel: number, progression: MapProgressionState): boolean => {
  return targetLevel === progression.currentMapLevel + 1 && targetLevel <= 50;
};

/**
 * Advances player forward by exactly 1 Map Level.
 */
export const advanceMapLevel = (
  player: PlayerState
): {
  updatedPlayer: PlayerState;
  advanced: boolean;
  fromLevel: number;
  toLevel: number;
} => {
  const currentMap = normalizeMapProgression(player.map);
  const fromLevel = currentMap.currentMapLevel;

  if (fromLevel >= 50) {
    return {
      updatedPlayer: player,
      advanced: false,
      fromLevel,
      toLevel: fromLevel,
    };
  }

  const toLevel = fromLevel + 1;
  const newCompleted = currentMap.completedLevels.includes(fromLevel)
    ? currentMap.completedLevels
    : [...currentMap.completedLevels, fromLevel];

  const targetWorld = getWorldByLevel(toLevel);

  const updatedMap: MapProgressionState = {
    currentMapLevel: toLevel,
    maxUnlockedLevel: Math.max(currentMap.maxUnlockedLevel, toLevel),
    completedLevels: newCompleted,
    selectedWorldId: targetWorld.id,
  };

  const updatedPlayer: PlayerState = {
    ...player,
    map: updatedMap,
  };

  return {
    updatedPlayer,
    advanced: true,
    fromLevel,
    toLevel,
  };
};

/**
 * Developer helper: Regresses player backward by 1 Map Level.
 */
export const regressMapLevel = (
  player: PlayerState
): {
  updatedPlayer: PlayerState;
  regressed: boolean;
  fromLevel: number;
  toLevel: number;
} => {
  const currentMap = normalizeMapProgression(player.map);
  const fromLevel = currentMap.currentMapLevel;

  if (fromLevel <= 1) {
    return {
      updatedPlayer: player,
      regressed: false,
      fromLevel,
      toLevel: fromLevel,
    };
  }

  const toLevel = fromLevel - 1;
  const targetWorld = getWorldByLevel(toLevel);

  const updatedMap: MapProgressionState = {
    ...currentMap,
    currentMapLevel: toLevel,
    selectedWorldId: targetWorld.id,
  };

  const updatedPlayer: PlayerState = {
    ...player,
    map: updatedMap,
  };

  return {
    updatedPlayer,
    regressed: true,
    fromLevel,
    toLevel,
  };
};

/**
 * Returns complete path waypoints from node A to node B.
 */
export const getPathWaypointsBetweenLevels = (fromLevel: number, toLevel: number): Point2D[] => {
  const fromDef = getMapLevelDef(fromLevel);
  const toDef = getMapLevelDef(toLevel);

  if (fromDef.pathPointsToNext && fromDef.pathPointsToNext.length > 0) {
    return [fromDef.position, ...fromDef.pathPointsToNext, toDef.position];
  }

  // Fallback linear interpolation
  return [fromDef.position, toDef.position];
};
