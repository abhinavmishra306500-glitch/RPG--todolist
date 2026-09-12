import React, { useState } from 'react';
import type { UserRole, LoginFormData, AuthMockSession } from './types/auth';
import { RoleSelector } from './components/auth/RoleSelector';
import { PlayerLoginForm } from './components/auth/PlayerLoginForm';
import { DeveloperLoginForm } from './components/auth/DeveloperLoginForm';
import { MockSessionNotice } from './components/auth/MockSessionNotice';
import { RpgCard } from './components/ui/RpgCard';
import { PixelHeart, PixelSword, PixelWrench } from './components/common/PixelIcons';
import { RpgOverworldBackground } from './components/environment/RpgOverworldBackground';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('player');
  const [activeSession, setActiveSession] = useState<AuthMockSession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setActiveSession(null);
  };

  const handleLoginSubmit = (data: LoginFormData) => {
    setIsSubmitting(true);
    // Simulate instantaneous friendly response for Step 1 UI
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveSession({
        role: currentRole,
        identifier: data.identifier,
        timestamp: new Date().toLocaleTimeString(),
        intendedAccess:
          currentRole === 'player'
            ? [
                'Normal progression gameplay',
                'Quests & daily streak tracker',
                'Leveling up & unlocking content',
                'Player inventory & companions',
              ]
            : [
                'All world maps & debug teleportation',
                'Full creature & pet catalog access',
                'All magic spells & skill trees unlocked',
                'Developer inspect tools & balance console',
              ],
      });
    }, 400);
  };

  const handleResetSession = () => {
    setActiveSession(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between py-6 px-4 sm:px-6 relative overflow-hidden">
      {/* 2D Pixel-Art RPG Overworld Background Environment */}
      <RpgOverworldBackground />

      {/* Main Container */}
      <main className="w-full max-w-md mx-auto my-auto relative z-10">
        {/* Game Title & Header */}
        <header className="text-center mb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181528] border-2 border-[#39325a] text-slate-300 text-[10px] font-pixel uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
            <PixelHeart size={10} className="text-red-400 shrink-0" />
            <span>Layer 1: Project Foundation</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider font-pixel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_4px_4px_rgba(0,0,0,0.85)] flex items-center justify-center gap-3">
              <span>LIFE RPG</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Transform your daily life into an epic quest
            </p>
          </div>
        </header>

        {/* Role Selector Tabs (Player vs Developer) */}
        {!activeSession && (
          <RoleSelector
            currentRole={currentRole}
            onSelectRole={handleRoleChange}
          />
        )}

        {/* RPG Card Container */}
        <RpgCard
          theme={currentRole === 'player' ? 'player' : 'dev'}
          className="shadow-2xl"
        >
          {activeSession ? (
            <MockSessionNotice
              session={activeSession}
              onReset={handleResetSession}
            />
          ) : currentRole === 'player' ? (
            <PlayerLoginForm
              onSubmit={handleLoginSubmit}
              isLoading={isSubmitting}
            />
          ) : (
            <DeveloperLoginForm
              onSubmit={handleLoginSubmit}
              isLoading={isSubmitting}
            />
          )}
        </RpgCard>

        {/* Quick Mode Indicator / Switcher Hint */}
        {!activeSession && (
          <div className="mt-4 text-center">
            <p className="text-[11px] text-slate-100 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] flex items-center justify-center gap-1.5">
              {currentRole === 'player' ? (
                <>
                  <PixelSword size={12} className="text-emerald-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                  <span>Viewing player portal. Need to test maps or locked features? Switch to Developer Login.</span>
                </>
              ) : (
                <>
                  <PixelWrench size={12} className="text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                  <span>Viewing developer portal. Regular gameplay? Switch to Player Login.</span>
                </>
              )}
            </p>
          </div>
        )}
      </main>

      {/* Semantic Accessible Footer */}
      <footer className="w-full text-center mt-6 text-xs text-slate-200 relative z-10 select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
        <p className="font-pixel text-[9px] text-slate-900 tracking-wider font-bold">
          Life RPG • Step 1: Foundation & Dual Login UI
        </p>
        <p className="text-[10px] text-slate-800 font-medium mt-1">
          Frontend only. Server authentication & permissions will connect in subsequent layers.
        </p>
      </footer>
    </div>
  );
};

export default App;
