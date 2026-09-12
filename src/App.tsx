import React, { useState, useEffect } from 'react';
import type { UserRole, LoginFormData, AuthMockSession } from './types/auth';
import type { CharacterProfile } from './types/character';
import type { PlayerState } from './types/progression';
import type { Quest } from './types/quest';
import { loadQuestsWithDailyRefresh, saveQuestsToStorage } from './utils/questStorage';
import { createInitialPlayerState } from './utils/progression';
import { calculateQuestReward, applyQuestRewardToPlayer } from './utils/questRewards';
import type { QuestReward } from './utils/questRewards';
import { DEFAULT_CHARACTER } from './types/character';
import { RoleSelector } from './components/auth/RoleSelector';
import { PlayerLoginForm } from './components/auth/PlayerLoginForm';
import { DeveloperLoginForm } from './components/auth/DeveloperLoginForm';
import { MockSessionNotice } from './components/auth/MockSessionNotice';
import { CharacterCreationScreen } from './components/character/CharacterCreationScreen';
import { CharacterCreatedSuccess } from './components/character/CharacterCreatedSuccess';
import { CharacterStatsPanel } from './components/character/CharacterStatsPanel';
import { QuestPage } from './components/quest/QuestPage';
import { AddQuestModal } from './components/quest/AddQuestModal';
import { QuestRewardModal } from './components/quest/QuestRewardModal';
import { RpgCard } from './components/ui/RpgCard';
import { PixelHeart, PixelSword, PixelWrench } from './components/common/PixelIcons';
import { RpgOverworldBackground } from './components/environment/RpgOverworldBackground';
import { StreakMilestoneModal } from './components/character/StreakMilestoneModal';
import { LeagueChangeModal } from './components/character/LeagueChangeModal';
import { getTodayDateString, applyInactivityDecay, recordDailyActivity } from './utils/streakDecay';
import { normalizeLeague } from './utils/league';
import type { PlayerLeague } from './types/progression';

const PLAYER_STORAGE_KEY = 'LIFE_RPG_PLAYER_STATE';

const loadSavedPlayerState = (): PlayerState | null => {
  try {
    const saved = localStorage.getItem(PLAYER_STORAGE_KEY);
    if (saved) {
      const parsed: PlayerState = JSON.parse(saved);
      parsed.league = normalizeLeague(parsed.league);
      const { updatedPlayer } = applyInactivityDecay(parsed, getTodayDateString());
      return updatedPlayer;
    }
  } catch (e) {
    console.error('Failed to load player state from localStorage', e);
  }
  return null;
};

type AppScreen = 'login' | 'character_creation' | 'character_created' | 'character_stats' | 'quest_page';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [currentRole, setCurrentRole] = useState<UserRole>('player');
  const [activeSession, setActiveSession] = useState<AuthMockSession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterProfile, setCharacterProfile] = useState<CharacterProfile | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState | null>(() => loadSavedPlayerState());
  const [playerName, setPlayerName] = useState('');
  const [quests, setQuests] = useState<Quest[]>(() => loadQuestsWithDailyRefresh());
  const [isAddQuestOpen, setIsAddQuestOpen] = useState(false);
  const [activeReward, setActiveReward] = useState<{
    questTitle: string;
    reward: QuestReward;
    leveledUp: boolean;
    newLevel: number;
  } | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<{
    milestone: number;
    streak: number;
  } | null>(null);
  const [pendingMilestone, setPendingMilestone] = useState<{
    milestone: number;
    streak: number;
  } | null>(null);
  const [activeLeagueModal, setActiveLeagueModal] = useState<{
    type: 'promoted' | 'demoted';
    oldLeague: PlayerLeague;
    newLeague: PlayerLeague;
  } | null>(null);
  const [pendingLeagueModal, setPendingLeagueModal] = useState<{
    type: 'promoted' | 'demoted';
    oldLeague: PlayerLeague;
    newLeague: PlayerLeague;
  } | null>(null);

  // Apply daily decay on mount if player state is present
  useEffect(() => {
    if (playerState) {
      const { updatedPlayer, healthLost, leagueDemoted } = applyInactivityDecay(playerState, getTodayDateString());
      if (healthLost > 0 || updatedPlayer !== playerState) {
        setPlayerState(updatedPlayer);
      }
      if (leagueDemoted) {
        setActiveLeagueModal({
          type: 'demoted',
          oldLeague: leagueDemoted.oldLeague,
          newLeague: leagueDemoted.newLeague,
        });
      }
    }
  }, []);

  // Sync quests to localStorage whenever updated
  useEffect(() => {
    saveQuestsToStorage(quests);
  }, [quests]);

  // Sync playerState to localStorage whenever updated
  useEffect(() => {
    if (playerState) {
      try {
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(playerState));
      } catch (e) {
        console.error('Failed to save player state to localStorage', e);
      }
    }
  }, [playerState]);

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
    const questToToggle = quests.find((q) => q.id === id);
    if (!questToToggle) return;

    // Case 1: First time completion -> Award XP, Gold, Attribute / Skill XP with progression checks
    if (!questToToggle.completed && !questToToggle.rewardClaimed) {
      const currentLevel = playerState?.progression.level || 1;
      const reward = calculateQuestReward(questToToggle, currentLevel);
      const activePlayer = playerState || createInitialPlayerState(characterProfile || DEFAULT_CHARACTER);
      const { updatedPlayer: rewardPlayer, leveledUp } = applyQuestRewardToPlayer(activePlayer, reward);

      // Record daily consistency activity, streak milestones & league progression
      const todayStr = getTodayDateString();
      const { updatedPlayer, milestoneUnlocked, leaguePromoted } = recordDailyActivity(rewardPlayer, todayStr);

      setPlayerState(updatedPlayer);

      setQuests((prev) =>
        prev.map((q) =>
          q.id === id
            ? {
                ...q,
                completed: true,
                rewardClaimed: true,
                completedAt: Date.now(),
                status: 'completed',
              }
            : q
        )
      );

      setActiveReward({
        questTitle: questToToggle.title,
        reward,
        leveledUp,
        newLevel: updatedPlayer.progression.level,
      });

      if (milestoneUnlocked !== null) {
        setPendingMilestone({
          milestone: milestoneUnlocked,
          streak: updatedPlayer.consistency.streak,
        });
      }

      if (leaguePromoted !== null) {
        setPendingLeagueModal({
          type: 'promoted',
          oldLeague: leaguePromoted.oldLeague,
          newLeague: leaguePromoted.newLeague,
        });
      }
    } else if (!questToToggle.completed && questToToggle.rewardClaimed) {
      // Case 2: Already claimed quest being marked completed (duplicate reward protection)
      setQuests((prev) =>
        prev.map((q) =>
          q.id === id
            ? {
                ...q,
                completed: true,
                completedAt: Date.now(),
                status: 'completed',
              }
            : q
        )
      );
    } else {
      // Case 3: Reopen / reactivate quest (rewardClaimed stays true to prevent re-farming)
      setQuests((prev) =>
        prev.map((q) =>
          q.id === id
            ? {
                ...q,
                completed: false,
                status: 'active',
              }
            : q
        )
      );
    }
  };

  const handleDeleteQuest = (id: string) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
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

      {/* --- SCREEN 3: CHARACTER STATS PANEL (STEP 3) --- */}
      {screen === 'character_stats' && playerState && (
        <CharacterStatsPanel
          initialPlayer={playerState}
          onEditCharacter={handleEditCharacter}
          onContinueToQuests={() => setScreen('quest_page')}
          onLogOut={handleLogOut}
          onUpdatePlayer={setPlayerState}
          isDevMode={currentRole === 'developer' || activeSession?.role === 'developer'}
        />
      )}

      {/* --- SCREEN 4: DEDICATED QUEST PAGE (STEP 4) --- */}
      {screen === 'quest_page' && playerState && (
        <QuestPage
          character={playerState.character}
          level={playerState.progression.level}
          quests={quests}
          onAddQuestClick={() => setIsAddQuestOpen(true)}
          onToggleComplete={handleToggleQuest}
          onDeleteQuest={handleDeleteQuest}
          onBackToStats={() => setScreen('character_stats')}
        />
      )}

      {/* --- SCREEN 5: LOGIN PAGE (Preserved 100%) --- */}
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
                    <button
                      type="button"
                      onClick={() => {
                        if (!playerState) {
                          setPlayerState(createInitialPlayerState(characterProfile || DEFAULT_CHARACTER));
                        }
                        setScreen('quest_page');
                      }}
                      className="w-full py-2 bg-indigo-600/30 hover:bg-indigo-600/50 border-2 border-indigo-400 text-indigo-200 text-xs font-pixel rounded-none transition-colors"
                    >
                      📜 Test Dedicated Quest Page (Dev Mode)
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
          Life RPG • Step 8: League System (Bronze III → Mythical)
        </p>
        <p className="text-[10px] text-slate-800 font-medium mt-1">
          13 League ranks based on consistency, promotion/demotion feedback, completely separate from Level/XP.
        </p>
      </footer>

      {/* --- ADD QUEST MODAL (STEP 4) --- */}
      <AddQuestModal
        isOpen={isAddQuestOpen}
        onClose={() => setIsAddQuestOpen(false)}
        onAddQuest={handleAddQuest}
      />

      {/* --- QUEST REWARD MODAL (STEP 5) --- */}
      <QuestRewardModal
        isOpen={Boolean(activeReward)}
        onClose={() => {
          setActiveReward(null);
          if (pendingMilestone) {
            setActiveMilestone(pendingMilestone);
            setPendingMilestone(null);
          } else if (pendingLeagueModal) {
            setActiveLeagueModal(pendingLeagueModal);
            setPendingLeagueModal(null);
          }
        }}
        questTitle={activeReward?.questTitle || ''}
        reward={activeReward?.reward || null}
        leveledUp={Boolean(activeReward?.leveledUp)}
        newLevel={activeReward?.newLevel || 1}
      />

      {/* --- STREAK MILESTONE MODAL (STEP 7) --- */}
      <StreakMilestoneModal
        isOpen={Boolean(activeMilestone)}
        onClose={() => {
          setActiveMilestone(null);
          if (pendingLeagueModal) {
            setActiveLeagueModal(pendingLeagueModal);
            setPendingLeagueModal(null);
          }
        }}
        milestone={activeMilestone?.milestone || 1}
        currentStreak={activeMilestone?.streak || 1}
      />

      {/* --- LEAGUE PROMOTION / DEMOTION MODAL (STEP 8) --- */}
      <LeagueChangeModal
        isOpen={Boolean(activeLeagueModal)}
        onClose={() => setActiveLeagueModal(null)}
        type={activeLeagueModal?.type || 'promoted'}
        oldLeague={activeLeagueModal?.oldLeague || { tier: 'Bronze', division: 'III' }}
        newLeague={activeLeagueModal?.newLeague || { tier: 'Bronze', division: 'III' }}
      />
    </div>
  );
};

export default App;
