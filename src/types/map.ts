export type MapNodeState = 'completed' | 'current' | 'available' | 'locked';

export type FacingDirection = 'up' | 'down' | 'left' | 'right';

export interface Point2D {
  x: number;
  y: number;
}

export interface MapLevelDef {
  id: number;
  levelNumber: number;
  name: string;
  worldId: string;
  description: string;
  icon: string;
  position: Point2D; // Coordinates on map canvas (0 to 1000px coordinate space)
  pathPointsToNext?: Point2D[]; // Intermediate waypoints along curved road to next node
}

export interface MapWorldDef {
  id: string;
  leagueTier: string;
  name: string;
  badge: string;
  theme: string;
  accentColor: string;
  description: string;
  startLevel: number;
  endLevel: number;
  levels: MapLevelDef[];
}

export interface MapProgressionState {
  currentMapLevel: number;   // Starts at 11 in Silver Village or 1 in Bronze
  maxUnlockedLevel: number;  // Highest level accessible
  completedLevels: number[]; // List of completed level IDs
  selectedWorldId?: string;  // Active viewed world
}
