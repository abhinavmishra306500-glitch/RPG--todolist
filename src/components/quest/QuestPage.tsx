import React, { useState } from 'react';
import type { Quest } from '../../types/quest';
import type { CharacterProfile } from '../../types/character';
import { QuestCard } from './QuestCard';
import { QuestHistoryView } from './QuestHistoryView';
import { RpgCard } from '../ui/RpgCard';
import { PlusCircle, Sun, Swords, History, ArrowLeft, Calendar } from 'lucide-react';
import { getTodayDateString } from '../../utils/questStorage';

interface QuestPageProps {
  character: CharacterProfile;
  level: number;
  quests: Quest[];
  onAddQuestClick: () => void;
  onToggleComplete: (id: string) => void;
  onBackToStats: () => void;
}

type ActiveViewTab = 'board' | 'history';

export const QuestPage: React.FC<QuestPageProps> = ({
  character,
  level,
  quests,
  onAddQuestClick,
  onToggleComplete,
  onBackToStats,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveViewTab>('board');
  const todayStr = getTodayDateString();

  // 1. Today's Quests: Short-term quests created for today and not archived into past days
  const todaysQuests = quests.filter(
    (q) => q.questType === 'today' && q.questDate === todayStr && q.status !== 'expired'
  );

  // 2. Active Quests: Multi-day long-term quests continuing until completed or expired
  const activeQuests = quests.filter(
    (q) => q.questType === 'active' && q.status !== 'expired'
  );

  // 3. Quest History: All completed quests (both today and past days)
  const completedHistoryQuests = quests.filter((q) => q.completed);

  return (
    <div className="w-full max-w-3xl mx-auto my-auto relative z-10 px-3 sm:px-4 py-4 animate-fadeIn space-y-4">
      {/* Top Header Navigation & Hero Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#161327] p-3 border-2 border-[#362e58] shadow-[3px_3px_0_0_#000]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToStats}
            className="px-2.5 py-1.5 bg-[#1f1a35] hover:bg-[#2c244b] border border-[#44386e] text-slate-300 text-xs font-pixel flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Profile & Stats</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-400 text-amber-300 text-[10px] font-pixel font-bold">
              LVL {level}
            </span>
            <span className="text-xs font-bold text-slate-200 font-pixel">
              {character.name}
            </span>
          </div>
        </div>

        {/* Action Controls: View Switcher & Prominent + ADD QUEST */}
        <div className="flex items-center gap-2">
          {/* History Toggle */}
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'board' ? 'history' : 'board')}
            className={`px-3 py-2 border-2 text-[10px] font-pixel transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-[2px_2px_0_0_#000]'
                : 'bg-[#1a162e] border-[#372f56] text-slate-300 hover:text-white hover:border-slate-400'
            }`}
          >
            <History size={13} className="text-purple-400" />
            <span>History ({completedHistoryQuests.length})</span>
          </button>

          {/* Prominent + ADD QUEST Button */}
          <button
            type="button"
            onClick={onAddQuestClick}
            className="px-4 py-2 bg-gradient-to-b from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 border-2 border-emerald-300 text-slate-950 font-pixel text-xs font-bold shadow-[3px_3px_0_0_#064e3b] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5"
          >
            <PlusCircle size={15} className="text-slate-950" />
            <span>+ ADD QUEST</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: QUEST HISTORY */}
      {activeTab === 'history' && (
        <RpgCard theme="player" className="shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#2b2545]">
              <div className="flex items-center gap-2">
                <History size={18} className="text-purple-400" />
                <h2 className="text-sm font-pixel text-slate-200 uppercase tracking-wide">
                  Quest Chronicles & History
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('board')}
                className="text-[10px] font-pixel text-emerald-400 hover:underline"
              >
                ← Back to Active Board
              </button>
            </div>

            <QuestHistoryView completedQuests={completedHistoryQuests} />
          </div>
        </RpgCard>
      )}

      {/* VIEW 2: DEDICATED MAIN QUEST BOARD (TODAY'S QUESTS + ACTIVE QUESTS) */}
      {activeTab === 'board' && (
        <div className="space-y-5">
          {/* ------------------------------------------------------------- */}
          {/* SECTION 1: TODAY'S QUESTS (Short-term real-life daily tasks)  */}
          {/* ------------------------------------------------------------- */}
          <RpgCard theme="player" className="shadow-2xl border-2 border-amber-500/50">
            <div className="space-y-3.5">
              {/* Section Header */}
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#2c2548]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-amber-500/20 border border-amber-400/60 flex items-center justify-center">
                    <Sun size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs sm:text-sm font-pixel text-amber-300 font-bold tracking-wide">
                        TODAY'S QUESTS
                      </h2>
                      <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[9px] font-pixel">
                        {todaysQuests.length} {todaysQuests.length === 1 ? 'task' : 'tasks'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-pixel mt-0.5">
                      Short-term daily goals • Resets each midnight
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1 border border-[#312a4f] hidden sm:flex items-center gap-1.5">
                  <Calendar size={12} className="text-amber-400" />
                  <span>{todayStr}</span>
                </div>
              </div>

              {/* Today's Quests List */}
              <div className="space-y-2.5">
                {todaysQuests.length > 0 ? (
                  todaysQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onToggleComplete={onToggleComplete}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center bg-[#110f1e] border-2 border-dashed border-[#2f274a] space-y-1.5">
                    <p className="text-xl">☀️</p>
                    <p className="text-xs font-pixel text-slate-300">
                      No daily quests for today yet!
                    </p>
                    <button
                      type="button"
                      onClick={onAddQuestClick}
                      className="text-[10px] font-pixel text-emerald-400 hover:underline mt-1"
                    >
                      + Post a short-term task
                    </button>
                  </div>
                )}
              </div>
            </div>
          </RpgCard>

          {/* ------------------------------------------------------------- */}
          {/* SECTION 2: ACTIVE QUESTS (Longer-term multi-day missions)     */}
          {/* ------------------------------------------------------------- */}
          <RpgCard theme="player" className="shadow-2xl border-2 border-indigo-500/50">
            <div className="space-y-3.5">
              {/* Section Header */}
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#2c2548]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-indigo-500/20 border border-indigo-400/60 flex items-center justify-center">
                    <Swords size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs sm:text-sm font-pixel text-indigo-300 font-bold tracking-wide">
                        ACTIVE QUESTS
                      </h2>
                      <span className="px-2 py-0.5 bg-indigo-950/80 border border-indigo-500/50 text-indigo-300 text-[9px] font-pixel">
                        {activeQuests.length} {activeQuests.length === 1 ? 'campaign' : 'campaigns'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-pixel mt-0.5">
                      Multi-day milestones • Continue across calendar days
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Multi-Day Quests List */}
              <div className="space-y-2.5">
                {activeQuests.length > 0 ? (
                  activeQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onToggleComplete={onToggleComplete}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center bg-[#110f1e] border-2 border-dashed border-[#2f274a] space-y-1.5">
                    <p className="text-xl">⚔️</p>
                    <p className="text-xs font-pixel text-slate-300">
                      No active multi-day quests!
                    </p>
                    <button
                      type="button"
                      onClick={onAddQuestClick}
                      className="text-[10px] font-pixel text-indigo-400 hover:underline mt-1"
                    >
                      + Post a long-term campaign
                    </button>
                  </div>
                )}
              </div>
            </div>
          </RpgCard>
        </div>
      )}
    </div>
  );
};
