export type Gender = 'male' | 'female';

export interface SkinToneOption {
  id: string;
  label: string;
  baseHex: string;
  shadowHex: string;
  blushHex: string;
}

export interface HairStyleOption {
  id: 'spiky' | 'classic' | 'flowing' | 'ponytail' | 'curly';
  label: string;
  icon: string;
}

export interface HairColorOption {
  id: string;
  label: string;
  baseHex: string;
  highlightHex: string;
}

export interface OutfitStyleOption {
  id: 'adventurer' | 'apprentice' | 'warrior' | 'mage';
  label: string;
  description: string;
  badge: string;
}

export interface OutfitColorOption {
  id: string;
  label: string;
  primaryHex: string;
  accentHex: string;
  shadowHex: string;
}

export interface CharacterProfile {
  name: string;
  gender: Gender;
  skinToneId: string;
  hairStyleId: HairStyleOption['id'];
  hairColorId: string;
  outfitStyleId: OutfitStyleOption['id'];
  outfitColorId: string;
  createdAt: string;
}

// Preset options for character customization
export const SKIN_TONES: SkinToneOption[] = [
  { id: 'fair', label: 'Fair Ivory', baseHex: '#ffe0b2', shadowHex: '#ffcc80', blushHex: '#ffab91' },
  { id: 'warm', label: 'Warm Peach', baseHex: '#ffd166', shadowHex: '#f4a261', blushHex: '#f4978e' },
  { id: 'tan', label: 'Sunkissed Tan', baseHex: '#e0a96d', shadowHex: '#c68b59', blushHex: '#d08c51' },
  { id: 'bronze', label: 'Rich Bronze', baseHex: '#b07248', shadowHex: '#8d5530', blushHex: '#9c5b33' },
  { id: 'deep', label: 'Deep Mocha', baseHex: '#6f4528', shadowHex: '#54331c', blushHex: '#613b21' },
];

export const HAIR_STYLES: HairStyleOption[] = [
  { id: 'spiky', label: 'Adventurer Spikes', icon: '⚡' },
  { id: 'classic', label: 'Classic Part', icon: '✂️' },
  { id: 'flowing', label: 'Flowing Locks', icon: '🌊' },
  { id: 'ponytail', label: 'High Ponytail', icon: '🎀' },
  { id: 'curly', label: 'Curly Crop', icon: '🌀' },
];

export const HAIR_COLORS: HairColorOption[] = [
  { id: 'obsidian', label: 'Obsidian Black', baseHex: '#22222a', highlightHex: '#454556' },
  { id: 'chestnut', label: 'Chestnut Brown', baseHex: '#5c3a21', highlightHex: '#7f5231' },
  { id: 'golden', label: 'Golden Blonde', baseHex: '#e9c46a', highlightHex: '#f4e09f' },
  { id: 'crimson', label: 'Crimson Red', baseHex: '#9b2226', highlightHex: '#c43337' },
  { id: 'silver', label: 'Silver White', baseHex: '#d8e2dc', highlightHex: '#f8f9fa' },
  { id: 'violet', label: 'Mystic Violet', baseHex: '#5e2ca5', highlightHex: '#8447d6' },
];

export const OUTFIT_STYLES: OutfitStyleOption[] = [
  { id: 'adventurer', label: 'Explorer Tunic', description: 'Lightweight traveling tunic with reinforced leather belt', badge: 'Casual' },
  { id: 'apprentice', label: 'Village Cloak', description: 'Cozy wool-trimmed vestments of the countryside', badge: 'Rustic' },
  { id: 'warrior', label: 'Knight Cuirass', description: 'Heavy battle-ready steel plate with shoulder guard', badge: 'Vanguard' },
  { id: 'mage', label: 'Mystic Spellcoat', description: 'Silken robe inscribed with runic thread and high collar', badge: 'Arcane' },
];

export const OUTFIT_COLORS: OutfitColorOption[] = [
  { id: 'emerald', label: 'Forest Emerald', primaryHex: '#10b981', accentHex: '#6ee7b7', shadowHex: '#064e3b' },
  { id: 'cobalt', label: 'Royal Cobalt', primaryHex: '#2563eb', accentHex: '#93c5fd', shadowHex: '#1e3a8a' },
  { id: 'ruby', label: 'Crimson Ruby', primaryHex: '#dc2626', accentHex: '#fca5a5', shadowHex: '#7f1d1d' },
  { id: 'amethyst', label: 'Amethyst Purple', primaryHex: '#8b5cf6', accentHex: '#c4b5fd', shadowHex: '#4c1d95' },
  { id: 'amber', label: 'Sun Amber', primaryHex: '#f59e0b', accentHex: '#fde68a', shadowHex: '#78350f' },
  { id: 'charcoal', label: 'Night Charcoal', primaryHex: '#334155', accentHex: '#94a3b8', shadowHex: '#0f172a' },
];

export const DEFAULT_CHARACTER: CharacterProfile = {
  name: '',
  gender: 'male',
  skinToneId: 'warm',
  hairStyleId: 'spiky',
  hairColorId: 'obsidian',
  outfitStyleId: 'adventurer',
  outfitColorId: 'emerald',
  createdAt: '',
};
