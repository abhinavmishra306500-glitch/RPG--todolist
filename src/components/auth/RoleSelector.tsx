import React from 'react';
import type { UserRole } from '../../types/auth';

interface RoleSelectorProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  onSelectRole,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Login Mode Selector"
      className="grid grid-cols-2 gap-2.5 p-1.5 bg-[#12101e] border-2 border-[#2f2a48] rounded-sm mb-6"
    >
      {/* Player Login Tab */}
      <button
        type="button"
        role="tab"
        id="tab-player"
        aria-selected={currentRole === 'player'}
        aria-controls="panel-player"
        onClick={() => onSelectRole('player')}
        className={`
          flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-bold transition-all border-2
          focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
          ${
            currentRole === 'player'
              ? 'bg-emerald-600/90 text-slate-950 border-emerald-300 shadow-[2px_2px_0_0_#064e3b]'
              : 'bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/50'
          }
        `}
      >
        <span className="text-base">👤</span>
        <span className="tracking-wide">Player Login</span>
      </button>

      {/* Developer / Admin Login Tab */}
      <button
        type="button"
        role="tab"
        id="tab-developer"
        aria-selected={currentRole === 'developer'}
        aria-controls="panel-developer"
        onClick={() => onSelectRole('developer')}
        className={`
          flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-bold transition-all border-2
          focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
          ${
            currentRole === 'developer'
              ? 'bg-amber-600/90 text-slate-950 border-amber-300 shadow-[2px_2px_0_0_#78350f]'
              : 'bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/50'
          }
        `}
      >
        <span className="text-base">🛠️</span>
        <span className="tracking-wide">Developer Login</span>
      </button>
    </div>
  );
};
