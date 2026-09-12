import React from 'react';
import type { MapLevelDef, MapNodeState } from '../../types/map';
import { Star, Lock, Sparkles } from 'lucide-react';

interface WorldNodeMarkerProps {
  level: MapLevelDef;
  state: MapNodeState;
  onClick?: (level: MapLevelDef) => void;
}

export const WorldNodeMarker: React.FC<WorldNodeMarkerProps> = ({ level, state, onClick }) => {
  const { position, levelNumber } = level;

  return (
    <div
      style={{
        left: `${(position.x / 1000) * 100}%`,
        top: `${(position.y / 1000) * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
      className="absolute pointer-events-auto z-10 select-none group"
    >
      {/* Current Position Glowing Pulse Aura */}
      {state === 'current' && (
        <div className="absolute -inset-4 rounded-xl bg-amber-400/40 blur-md animate-ping pointer-events-none" />
      )}

      {/* Available Next Node Subtle Pulse */}
      {state === 'available' && (
        <div className="absolute -inset-3 rounded-xl bg-emerald-400/30 blur-sm animate-pulse pointer-events-none" />
      )}

      {/* Retro 16-bit Parchment / Shield Level Badge (matching reference image) */}
      <button
        type="button"
        onClick={() => onClick && onClick(level)}
        className={`relative flex items-center justify-center transition-all duration-300 transform active:scale-95 ${
          state === 'current'
            ? 'w-11 h-11 bg-gradient-to-b from-amber-200 to-amber-400 border-[3px] border-amber-900 shadow-xl scale-110 ring-4 ring-amber-300/80 cursor-pointer rounded-lg'
            : state === 'completed'
            ? 'w-9 h-9 bg-gradient-to-b from-yellow-100 to-amber-300 border-2 border-amber-900/90 shadow-md hover:scale-110 cursor-pointer rounded-lg'
            : state === 'available'
            ? 'w-9 h-9 bg-gradient-to-b from-emerald-100 to-emerald-300 border-2 border-emerald-900 shadow-md hover:scale-110 cursor-pointer rounded-lg ring-2 ring-emerald-400/60'
            : 'w-8 h-8 bg-gradient-to-b from-slate-600 to-slate-800 border-2 border-slate-900 opacity-80 cursor-not-allowed rounded-lg shadow-inner'
        }`}
        title={`${level.name} (Level ${levelNumber})`}
      >
        {/* State Icon / Level Number */}
        {state === 'locked' ? (
          <Lock className="w-4 h-4 text-slate-400" />
        ) : (
          <div className="flex flex-col items-center justify-center leading-none">
            {state === 'completed' && (
              <Star className="w-2.5 h-2.5 text-amber-700 fill-amber-500 mb-0.5" />
            )}
            {state === 'current' && (
              <Sparkles className="w-2.5 h-2.5 text-amber-900 fill-amber-600 animate-spin mb-0.5" />
            )}
            <span
              className={`font-black tracking-tighter ${
                state === 'current'
                  ? 'text-sm text-amber-950 font-mono drop-shadow'
                  : state === 'completed'
                  ? 'text-xs text-amber-950 font-mono font-bold'
                  : 'text-xs text-emerald-950 font-mono font-bold'
              }`}
            >
              {levelNumber}
            </span>
          </div>
        )}
      </button>

      {/* Floating Hover Label */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-1/2 -bottom-8 -translate-x-1/2 bg-slate-950/95 text-amber-200 border border-amber-500/40 text-[11px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30 pointer-events-none">
        {level.icon} {level.name}
      </div>
    </div>
  );
};
