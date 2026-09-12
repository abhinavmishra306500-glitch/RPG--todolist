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
    description: 'The cozy cottage where your adventure begins, surrounded by blooming wildflowers and a welcoming hearth.',
    icon: '🏡',
    position: { x: 195, y: 785 },
    pathPointsToNext: [{ x: 240, y: 785 }, { x: 290, y: 760 }, { x: 350, y: 730 }],
  },
  {
    id: 2,
    levelNumber: 2,
    name: 'Deep Forest Fork',
    worldId: 'bronze-village',
    description: 'A shaded dirt trail winding high into the thick oak and pine forest canopy.',
    icon: '🌲',
    position: { x: 360, y: 275 },
    pathPointsToNext: [{ x: 350, y: 400 }, { x: 310, y: 550 }, { x: 420, y: 710 }],
  },
  {
    id: 3,
    levelNumber: 3,
    name: 'Timber Creek Bridge',
    worldId: 'bronze-village',
    description: 'A sturdy wooden plank bridge crossing a clear, babbling brook filled with smooth river stones.',
    icon: '🪵',
    position: { x: 535, y: 715 },
    pathPointsToNext: [{ x: 580, y: 725 }, { x: 640, y: 760 }],
  },
  {
    id: 4,
    levelNumber: 4,
    name: 'Crystal Spring Cavern',
    worldId: 'bronze-village',
    description: 'A natural cave entrance with glowing mineral water trickling down mossy boulders.',
    icon: '⛏️',
    position: { x: 705, y: 795 },
    pathPointsToNext: [{ x: 690, y: 700 }, { x: 675, y: 600 }],
  },
  {
    id: 5,
    levelNumber: 5,
    name: 'Mountain Gorge Bend',
    worldId: 'bronze-village',
    description: 'A scenic cobblestone bend nestled between high cliffs and the mountain river tributary.',
    icon: '🌊',
    position: { x: 675, y: 525 },
    pathPointsToNext: [{ x: 710, y: 490 }, { x: 735, y: 465 }],
  },
  {
    id: 6,
    levelNumber: 6,
    name: 'Old Watchtower Outpost',
    worldId: 'bronze-village',
    description: 'A weathered stone observation tower guarding the eastern mountain pass.',
    icon: '🏰',
    position: { x: 745, y: 450 },
    pathPointsToNext: [{ x: 760, y: 350 }, { x: 740, y: 270 }],
  },
  {
    id: 7,
    levelNumber: 7,
    name: 'Highland Ridge Pass',
    worldId: 'bronze-village',
    description: 'Snow-dusted highland cliffs with panoramic vistas of the ocean and sailing ships.',
    icon: '🏔️',
    position: { x: 700, y: 230 },
    pathPointsToNext: [{ x: 640, y: 210 }, { x: 560, y: 210 }],
  },
  {
    id: 8,
    levelNumber: 8,
    name: 'Ancient Stone Shrine',
    worldId: 'bronze-village',
    description: 'A mysterious stone sanctuary etched with ancient silver runes and glowing lantern poles.',
    icon: '🗿',
    position: { x: 480, y: 220 },
    pathPointsToNext: [{ x: 400, y: 200 }, { x: 320, y: 170 }],
  },
  {
    id: 9,
    levelNumber: 9,
    name: 'Whispering Pine Hollow',
    worldId: 'bronze-village',
    description: 'A dense evergreen pine grove where gentle winds whistle softly through pine needles.',
    icon: '🌿',
    position: { x: 260, y: 155 },
    pathPointsToNext: [{ x: 200, y: 140 }],
  },
  {
    id: 10,
    levelNumber: 10,
    name: 'Bronze Summit Arch',
    worldId: 'bronze-village',
    description: 'A ceremonial stone gateway marking the completion of World 1.',
    icon: '⭐',
    position: { x: 145, y: 130 },
  },
];

/**
 * 🥈 WORLD 2: SILVER VILLAGE (Levels 11 - 20)
 * Matches the reference image layout: forest canopy in upper-left, winding dirt road,
 * river with wooden bridge, rocky mountain range, dungeon cave, castle tower, and coastline with sailing ship!
 */
export const SILVER_VILLAGE_LEVELS: MapLevelDef[] = [
  {
    id: 11,
    levelNumber: 11,
    name: 'Village Haven (Level 1)',
    worldId: 'silver-village',
    description: 'The cozy rural gateway to Silver Village, with red-roof cottages and a fork leading into the dense forest.',
    icon: '🏡',
    position: { x: 195, y: 785 },
    pathPointsToNext: [
      { x: 240, y: 785 },
      { x: 290, y: 760 },
      { x: 350, y: 730 },
      { x: 420, y: 710 },
    ],
  },
  {
    id: 12,
    levelNumber: 12,
    name: 'Deep Forest Fork (Level 2)',
    worldId: 'silver-village',
    description: 'A shaded dirt trail winding high into the thick oak and pine forest canopy.',
    icon: '🌲',
    position: { x: 360, y: 275 },
    pathPointsToNext: [
      { x: 350, y: 330 },
      { x: 320, y: 400 },
      { x: 300, y: 490 },
      { x: 310, y: 550 },
      { x: 350, y: 600 },
      { x: 420, y: 710 },
    ],
  },
  {
    id: 13,
    levelNumber: 13,
    name: 'Great River Bridge (Level 3)',
    worldId: 'silver-village',
    description: 'A heavy timber plank bridge spanning across the rushing blue river dividing the forest and mountain regions.',
    icon: '🌉',
    position: { x: 535, y: 715 },
    pathPointsToNext: [
      { x: 580, y: 725 },
      { x: 620, y: 755 },
      { x: 660, y: 780 },
      { x: 700, y: 795 },
    ],
  },
  {
    id: 14,
    levelNumber: 14,
    name: 'Dungeon Mine Entry (Level 4A)',
    worldId: 'silver-village',
    description: 'A fortified cavern entrance carved into the rocky mountain base, surrounded by heavy stone boulders.',
    icon: '⛏️',
    position: { x: 705, y: 795 },
    pathPointsToNext: [
      { x: 690, y: 740 },
      { x: 675, y: 670 },
      { x: 675, y: 590 },
      { x: 675, y: 525 },
    ],
  },
  {
    id: 15,
    levelNumber: 15,
    name: 'River Gorge Crossing (Level 4B)',
    worldId: 'silver-village',
    description: 'A scenic cobblestone bend nestled between high mountain cliffs and the mountain river tributary.',
    icon: '🌊',
    position: { x: 675, y: 525 },
    pathPointsToNext: [
      { x: 705, y: 505 },
      { x: 730, y: 480 },
      { x: 745, y: 450 },
    ],
  },
  {
    id: 16,
    levelNumber: 16,
    name: 'Castle Watchtower (Level 5)',
    worldId: 'silver-village',
    description: 'A magnificent stone fortress tower with battlements, red banners, and pine slopes overlooking the coast.',
    icon: '🏰',
    position: { x: 745, y: 450 },
    pathPointsToNext: [
      { x: 755, y: 400 },
      { x: 760, y: 350 },
      { x: 750, y: 300 },
      { x: 720, y: 250 },
    ],
  },
  {
    id: 17,
    levelNumber: 17,
    name: 'Silver Mountain Ridge',
    worldId: 'silver-village',
    description: 'Snow-dusted highland cliffs with panoramic vistas of the ocean and sailing ships.',
    icon: '🏔️',
    position: { x: 700, y: 230 },
    pathPointsToNext: [
      { x: 650, y: 210 },
      { x: 600, y: 200 },
      { x: 550, y: 205 },
      { x: 500, y: 215 },
    ],
  },
  {
    id: 18,
    levelNumber: 18,
    name: 'Ancient Stone Shrine',
    worldId: 'silver-village',
    description: 'A mysterious stone sanctuary etched with ancient silver runes and glowing lantern poles.',
    icon: '🗿',
    position: { x: 480, y: 220 },
    pathPointsToNext: [
      { x: 430, y: 210 },
      { x: 380, y: 190 },
      { x: 330, y: 165 },
      { x: 280, y: 140 },
    ],
  },
  {
    id: 19,
    levelNumber: 19,
    name: 'Highland Forest Pass',
    worldId: 'silver-village',
    description: 'The high alpine trail winding through lush green forest tops and misty morning ridges.',
    icon: '🌿',
    position: { x: 260, y: 135 },
    pathPointsToNext: [
      { x: 220, y: 125 },
      { x: 180, y: 120 },
      { x: 150, y: 110 },
    ],
  },
  {
    id: 20,
    levelNumber: 20,
    name: 'Silver Crest Pinnacle',
    worldId: 'silver-village',
    description: 'The pinnacle highland lookout overlooking the entire continent, crowned with a grand golden star beacon.',
    icon: '⭐',
    position: { x: 145, y: 105 },
  },
];

/**
 * 🥇 WORLD 3: GOLD CITY (Levels 21 - 30)
 * Grand trading metropolis with paved stone avenues, golden rooftops, aqueducts, and market plazas.
 */
export const GOLD_CITY_LEVELS: MapLevelDef[] = [
  {
    id: 21,
    levelNumber: 21,
    name: 'Royal Harbor Promenade',
    worldId: 'gold-city',
    description: 'The bustling sea gate of Gold City with marble docks, gilded merchant ships, and brass lampposts.',
    icon: '⚓',
    position: { x: 180, y: 800 },
    pathPointsToNext: [{ x: 230, y: 770 }, { x: 280, y: 730 }, { x: 330, y: 700 }],
  },
  {
    id: 22,
    levelNumber: 22,
    name: 'Grand Bazaar Plaza',
    worldId: 'gold-city',
    description: 'A vibrant market square overflowing with rare spices, polished armor, and golden silk awnings.',
    icon: '🎪',
    position: { x: 350, y: 680 },
    pathPointsToNext: [{ x: 380, y: 640 }, { x: 420, y: 600 }, { x: 470, y: 570 }],
  },
  {
    id: 23,
    levelNumber: 23,
    name: 'Marble Aqueduct Arch',
    worldId: 'gold-city',
    description: 'Towering classical roman-style aqueduct feeding fresh mountain springs into public bathhouses.',
    icon: '🏛️',
    position: { x: 500, y: 550 },
    pathPointsToNext: [{ x: 550, y: 530 }, { x: 610, y: 520 }, { x: 670, y: 530 }],
  },
  {
    id: 24,
    levelNumber: 24,
    name: 'Golden Colosseum',
    worldId: 'gold-city',
    description: 'A massive stone amphitheater where champion gladiators hone their discipline and heroic strength.',
    icon: '⚔️',
    position: { x: 700, y: 540 },
    pathPointsToNext: [{ x: 730, y: 490 }, { x: 740, y: 430 }, { x: 720, y: 380 }],
  },
  {
    id: 25,
    levelNumber: 25,
    name: 'High Alchemist Guild',
    worldId: 'gold-city',
    description: 'Steaming brass alembics and glowing potion vials lining the balconies of the master alchemists.',
    icon: '⚗️',
    position: { x: 700, y: 360 },
    pathPointsToNext: [{ x: 660, y: 330 }, { x: 610, y: 310 }, { x: 560, y: 300 }],
  },
  {
    id: 26,
    levelNumber: 26,
    name: 'Gilded Lion Fountain',
    worldId: 'gold-city',
    description: 'A spectacular central fountain with water spouting from pure gold sculpted lion heads.',
    icon: '⛲',
    position: { x: 520, y: 300 },
    pathPointsToNext: [{ x: 470, y: 290 }, { x: 420, y: 270 }, { x: 370, y: 240 }],
  },
  {
    id: 27,
    levelNumber: 27,
    name: 'Scholars’ Grand Library',
    worldId: 'gold-city',
    description: 'An immense domed archive containing scrolls of ancient wisdom and hero chronicles.',
    icon: '📚',
    position: { x: 350, y: 230 },
    pathPointsToNext: [{ x: 320, y: 190 }, { x: 330, y: 150 }, { x: 370, y: 120 }],
  },
  {
    id: 28,
    levelNumber: 28,
    name: 'Palace Gardens & Rose Walk',
    worldId: 'gold-city',
    description: 'Topiary mazes, golden rose bushes, and marble benches overlooking the city skyline.',
    icon: '🌹',
    position: { x: 400, y: 115 },
    pathPointsToNext: [{ x: 450, y: 110 }, { x: 510, y: 115 }, { x: 570, y: 130 }],
  },
  {
    id: 29,
    levelNumber: 29,
    name: 'Crown Guard Bastion',
    worldId: 'gold-city',
    description: 'Imposing golden-tipped ramparts guarding the sovereign inner citadel.',
    icon: '🛡️',
    position: { x: 600, y: 140 },
    pathPointsToNext: [{ x: 650, y: 150 }, { x: 700, y: 160 }, { x: 750, y: 165 }],
  },
  {
    id: 30,
    levelNumber: 30,
    name: 'Solarium Palace Throne',
    worldId: 'gold-city',
    description: 'The golden zenith of World 3 bathed in eternal sunlight, rewarding true masters of consistency.',
    icon: '⭐',
    position: { x: 770, y: 170 },
  },
];

/**
 * 💎 WORLD 4: DIAMOND CITY (Levels 31 - 40)
 * Arcane crystalline metropolis with glowing neon-cyan pathways, floating crystal islands, and mana spires.
 */
export const DIAMOND_CITY_LEVELS: MapLevelDef[] = [
  {
    id: 31,
    levelNumber: 31,
    name: 'Prism Nexus Portal',
    worldId: 'diamond-city',
    description: 'A shimmering crystalline archway vibrating with harmonic pure mana energy.',
    icon: '💠',
    position: { x: 200, y: 800 },
    pathPointsToNext: [{ x: 250, y: 770 }, { x: 300, y: 730 }, { x: 350, y: 680 }],
  },
  {
    id: 32,
    levelNumber: 32,
    name: 'Luminescent Bridges',
    worldId: 'diamond-city',
    description: 'Solid light bridges hovering gracefully over chasms filled with glowing azure crystals.',
    icon: '🌉',
    position: { x: 370, y: 660 },
    pathPointsToNext: [{ x: 410, y: 630 }, { x: 460, y: 590 }, { x: 510, y: 550 }],
  },
  {
    id: 33,
    levelNumber: 33,
    name: 'Mana Crystal Spires',
    worldId: 'diamond-city',
    description: 'Towering obelisks of faceted diamond resonating with ancient spellcraft.',
    icon: '💎',
    position: { x: 530, y: 530 },
    pathPointsToNext: [{ x: 580, y: 510 }, { x: 640, y: 500 }, { x: 700, y: 510 }],
  },
  {
    id: 34,
    levelNumber: 34,
    name: 'Arcane Observatory',
    worldId: 'diamond-city',
    description: 'A crystal dome viewing the constellations and tracking stellar progression orbits.',
    icon: '🔭',
    position: { x: 720, y: 520 },
    pathPointsToNext: [{ x: 740, y: 470 }, { x: 730, y: 410 }, { x: 690, y: 360 }],
  },
  {
    id: 35,
    levelNumber: 35,
    name: 'Astral Lotus Pool',
    worldId: 'diamond-city',
    description: 'Floating crystalline lotus pads resting on pure liquid starlight.',
    icon: '🪷',
    position: { x: 660, y: 340 },
    pathPointsToNext: [{ x: 610, y: 320 }, { x: 550, y: 310 }, { x: 490, y: 320 }],
  },
  {
    id: 36,
    levelNumber: 36,
    name: 'Aetherial Spire Forge',
    worldId: 'diamond-city',
    description: 'Where legendary diamond gear is tempered with concentrated stardust and sheer willpower.',
    icon: '🔮',
    position: { x: 460, y: 330 },
    pathPointsToNext: [{ x: 410, y: 330 }, { x: 360, y: 310 }, { x: 310, y: 270 }],
  },
  {
    id: 37,
    levelNumber: 37,
    name: 'Floating Monolith Ring',
    worldId: 'diamond-city',
    description: 'Ancient anti-gravity megaliths orbiting in silent geometric symmetry.',
    icon: '🪐',
    position: { x: 290, y: 240 },
    pathPointsToNext: [{ x: 300, y: 190 }, { x: 330, y: 150 }, { x: 380, y: 130 }],
  },
  {
    id: 38,
    levelNumber: 38,
    name: 'Chronos Clockwork Spire',
    worldId: 'diamond-city',
    description: 'A grand crystal timepiece celebrating days of unbroken streak commitment.',
    icon: '⏳',
    position: { x: 420, y: 130 },
    pathPointsToNext: [{ x: 480, y: 130 }, { x: 540, y: 140 }, { x: 600, y: 160 }],
  },
  {
    id: 39,
    levelNumber: 39,
    name: 'Celestial Diamond Causeway',
    worldId: 'diamond-city',
    description: 'A radiant bridge of purest diamond leading toward the heavens.',
    icon: '✨',
    position: { x: 630, y: 170 },
    pathPointsToNext: [{ x: 680, y: 180 }, { x: 730, y: 180 }, { x: 770, y: 170 }],
  },
  {
    id: 40,
    levelNumber: 40,
    name: 'Diamond Zenith Core',
    worldId: 'diamond-city',
    description: 'The radiant heart of diamond perfection, glowing with infinite possibility.',
    icon: '⭐',
    position: { x: 790, y: 160 },
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
  currentMapLevel: 11,
  maxUnlockedLevel: 11,
  completedLevels: [],
  selectedWorldId: 'silver-village',
};

/**
 * Normalizes any player map progression state with safe defaults.
 */
export const normalizeMapProgression = (map?: Partial<MapProgressionState> | null): MapProgressionState => {
  if (!map) return { ...INITIAL_MAP_PROGRESSION };
  const currentMapLevel = typeof map.currentMapLevel === 'number' ? Math.max(1, map.currentMapLevel) : 11;
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
