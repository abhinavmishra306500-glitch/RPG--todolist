import React from 'react';
import type { MapWorldDef } from '../../types/map';
import { BronzeVillageWorld } from './BronzeVillageWorld';
import { SilverVillageWorld } from './SilverVillageWorld';
import { GoldCityWorld } from './GoldCityWorld';
import { DiamondCityWorld } from './DiamondCityWorld';
import { MythicalCastleWorld } from './MythicalCastleWorld';

interface WorldCanvasProps {
  world: MapWorldDef;
  onCanvasClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  children?: React.ReactNode;
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({ world, onCanvasClick, children }) => {
  const isBronzeVillage = world.id === 'bronze-village';
  const isSilverVillage = world.id === 'silver-village';
  const isGoldCity = world.id === 'gold-city';
  const isDiamondCity = world.id === 'diamond-city';
  const isMythicalCastle = world.id === 'mythical-castle';

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-slate-950">
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full block absolute inset-0"
        preserveAspectRatio="none"
        style={{ imageRendering: 'pixelated' }}
        onClick={onCanvasClick}
      >
        <defs>
          <pattern id="cleanMapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* 🥉 Bronze Village: Authentic Handcrafted 16-Bit Pixel-Art RPG World */}
        {isBronzeVillage ? (
          <BronzeVillageWorld />
        ) : isSilverVillage ? (
          /* 🥈 Silver Village: Authentic Handcrafted 16-Bit Pixel-Art RPG World */
          <SilverVillageWorld />
        ) : isGoldCity ? (
          /* 🥇 Gold City: Authentic Handcrafted 16-Bit Pixel-Art RPG World */
          <GoldCityWorld />
        ) : isDiamondCity ? (
          /* 💎 Diamond City: Authentic Handcrafted 16-Bit Pixel-Art RPG World */
          <DiamondCityWorld />
        ) : isMythicalCastle ? (
          /* 👑 Mythical Castle: Authentic Handcrafted 16-Bit Pixel-Art Endgame World */
          <MythicalCastleWorld />
        ) : (
          /* Other Worlds: Neutral dark game canvas */
          <g>
            <rect width="1000" height="1000" fill="#090d16" />
            <rect width="1000" height="1000" fill="url(#cleanMapGrid)" pointerEvents="none" />
          </g>
        )}
      </svg>

      {/* Level Nodes and Walking Character Sprite (Rendered directly on top) */}
      <div className="absolute inset-0 pointer-events-none">{children}</div>
    </div>
  );
};
