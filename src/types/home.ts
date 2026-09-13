export interface HomeFurnitureItem {
  id: string;
  name: string;
  category: 'bed' | 'bookshelf' | 'plant' | 'seating' | 'decor' | 'rug';
  icon: string;
  description: string;
  cozyPoints?: number;
  previewPrice?: number; // Future gold cost
  isDefault?: boolean;
}

export interface PlayerHomeState {
  wallpaperId?: string;
  flooringId?: string;
  unlockedFurnitureIds?: string[];
  cozinessRating?: number;
}
