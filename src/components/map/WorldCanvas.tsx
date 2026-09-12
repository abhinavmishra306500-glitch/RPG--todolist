import React from 'react';
import type { MapWorldDef } from '../../types/map';

interface WorldCanvasProps {
  world: MapWorldDef;
  onCanvasClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  children?: React.ReactNode;
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({ onCanvasClick, children }) => {
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
          {/* Subtle Grid Pattern */}
          <pattern id="cleanMapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Clean Neutral Dark Map Canvas Background */}
        <rect width="1000" height="1000" fill="#090d16" />

        {/* Subtle Ambient Grid Matrix */}
        <rect width="1000" height="1000" fill="url(#cleanMapGrid)" pointerEvents="none" />
      </svg>

      {/* Level Nodes and Walking Character Sprite */}
      <div className="absolute inset-0 pointer-events-none">{children}</div>
    </div>
  );
};
