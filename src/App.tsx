import React, { useState } from 'react';
import type { UserRole, LoginFormData, AuthMockSession } from './types/auth';
import type { CharacterProfile } from './types/character';
import type { PlayerState } from './types/progression';
import type { Quest } from './types/quest';
import { INITIAL_QUESTS } from './types/quest';
import { createInitialPlayerState } from './utils/progression';
import { DEFAULT_CHARACTER } from './types/character';
import { RoleSelector } from './components/auth/RoleSelector';
import { PlayerLoginForm } from './components/auth/PlayerLoginForm';
import { DeveloperLoginForm } from './components/auth/DeveloperLoginForm';
import { MockSessionNotice } from './components/auth/MockSessionNotice';
import { CharacterCreationScreen } from './components/character/CharacterCreationScreen';
import { CharacterCreatedSuccess } from './components/character/CharacterCreatedSuccess';
import { CharacterStatsPanel } from './components/character/CharacterStatsPanel';
import { QuestBoard } from './components/quest/QuestBoard';
import { AddQuestModal } from './components/quest/AddQuestModal';
import { RpgCard } from './components/ui/RpgCard';
import { PixelHeart, PixelSword, PixelWrench } from './components/common/PixelIcons';
import { RpgOverworldBackground } from './components/environment/RpgOverworldBackground';

type AppScreen = 'login' | 'character_creation' | 'character_created' | 'character_stats';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [currentRole, setCurrentRole] = useState<UserRole>('player');
  const [activeSession, setActiveSession] = useState<AuthMockSession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterProfile, setCharacterProfile] = useState<CharacterProfile | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [isAddQuestOpen, setIsAddQuestOpen] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setActiveSession(null);
  };

  const handleLoginSubmit = (data: LoginFormData) => {
    setIsSubmitting(true);
    setPlayerName(data.identifier);

    setTimeout(() => {
      setIsSubmitting(false);

      if (currentRole === 'player') {
        // Player logs in -> Proceeds to Character Creation
        setScreen('character_creation');
      } else {
        // Developer logs in -> View developer console preview with option to test character creation
        setActiveSession({
          role: 'developer',
          identifier: data.identifier,
          timestamp: new Date().toLocaleTimeString(),
          intendedAccess: [
            'All world maps & debug teleportation',
            'Full creature & pet catalog access',
            'All magic spells & skill trees unlocked',
            'Developer inspect tools & balance console',
            'Character creation sandbox & inspector',
            'Live progression & stats simulator',
          ],
        });
      }
    }, 400);
  };

  const handleResetSession = () => {
    setActiveSession(null);
    setScreen('login');
  };

  const handleConfirmCharacter = (character: CharacterProfile) => {
    setCharacterProfile(character);
    setPlayerState((prev) => {
      if (prev) {
        return {
          ...prev,
          character,
        };
      }
      return createInitialPlayerState(character);
    });
    setScreen('character_created');
  };

  const handleEditCharacter = () => {
    setScreen('character_creation');
  };

  const handleViewStats = () => {
    if (!playerState && characterProfile) {
      setPlayerState(createInitialPlayerState(characterProfile));
    } else if (!playerState) {
      setPlayerState(createInitialPlayerState(DEFAULT_CHARACTER));
    }
    setScreen('character_stats');
  };

  const handleLogOut = () => {
    setScreen('login');
    setActiveSession(null);
  };

  const handleAddQuest = (newQuest: Quest) => {
    setQuests((prev) => [newQuest, ...prev]);
  };

  const handleToggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between py-6 px-4 sm:px-6 relative overflow-hidden">
      {/* 2D Pixel-Art RPG Overworld Background Environment */}
      <RpgOverworldBackground />

      {/* --- SCREEN 1: CHARACTER CREATION --- */}
      {screen === 'character_creation' && (
        <CharacterCreationScreen
          initialCharacter={characterProfile || undefined}
          initialName={playerName || characterProfile?.name || ''}
          onConfirmCharacter={handleConfirmCharacter}
          onBackToLogin={handleLogOut}
        />
      )}

      {/* --- SCREEN 2: CHARACTER CREATED CONFIRMATION --- */}
      {screen === 'character_created' && characterProfile && (
        <CharacterCreatedSuccess
          character={characterProfile}
          onEditCharacter={handleEditCharacter}
          onViewStats={handleViewStats}
          onLogOut={handleLogOut}
        />
      )}

      {/* --- SCREEN 3: CHARACTER STATS & QUEST BOARD (STEP 3 & 4) --- */}
      {screen === 'character_stats' && playerState && (
        <div className="w-full max-w-2xl mx-auto my-auto relative z-10 space-y-6">
          <CharacterStatsPanel
            initialPlayer={playerState}
            onEditCharacter={handleEditCharacter}
            onLogOut={handleLogOut}
            isDevMode={currentRole === 'developer' || activeSession?.role === 'developer'}
          />

          {/* --- STEP 4: QUEST SYSTEM BOARD --- */}
          <QuestBoard
            quests={quests}
            onAddQuestClick={() => setIsAddQuestOpen(true)}
            onToggleComplete={handleToggleQuest}
          />
        </div>
      )}

      {/* --- SCREEN 3: LOGIN PAGE (Preserved 100%) --- */}
      {screen === 'login' && (
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
              <div className="space-y-4">
                <MockSessionNotice
                  session={activeSession}
                  onReset={handleResetSession}
                />
                {activeSession.role === 'developer' && (
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => setScreen('character_creation')}
                      className="w-full py-2 bg-amber-600/30 hover:bg-amber-600/50 border-2 border-amber-400 text-amber-200 text-xs font-pixel rounded-none transition-colors"
                    >
                      🧪 Test Character Creation (Dev Mode)
                    </button>
                    <button
                      type="button"
                      onClick={handleViewStats}
                      className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border-2 border-emerald-400 text-emerald-200 text-xs font-pixel rounded-none transition-colors"
                    >
                      📊 Test Character Stats & Profile (Dev Mode)
                    </button>
                  </div>
                )}
              </div>
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
      )}

      {/* Semantic Accessible Footer */}
      <footer className="w-full text-center mt-6 text-xs text-slate-200 relative z-10 select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
        <p className="font-pixel text-[9px] text-slate-900 tracking-wider font-bold">
          Life RPG • Step 4: Quest System Layer
        </p>
        <p className="text-[10px] text-slate-800 font-medium mt-1">
          Frontend only. Quest reward XP/gold attribution & world maps will connect in subsequent layers.
        </p>
      </footer>

      {/* --- ADD QUEST MODAL (STEP 4) --- */}
      <AddQuestModal
        isOpen={isAddQuestOpen}
        onClose={() => setIsAddQuestOpen(false)}
        onAddQuest={handleAddQuest}
      />
    </div>
  );
};

export default App;
