import React, { useState } from 'react';
import type { Quest } from '../../types/quest';
import { QuestCard } from './QuestCard';
import { RpgCard } from '../ui/RpgCard';
import { PlusCircle, Scroll, CheckCircle2, Flame } from 'lucide-react';

interface QuestBoardProps {
  quests: Quest[];
  onAddQuestClick: () => void;
  onToggleComplete: (id: string) => void;
}

type QuestFilter = 'all' | 'active' | 'completed';

export const QuestBoard: React.FC<QuestBoardProps> = ({
  quests,
  onAddQuestClick,
  onToggleComplete,
}) => {
  const [filter, setFilter] = useState<QuestFilter>('all');

  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuests = quests.filter((q) => q.completed);

  const filteredQuests =
    filter === 'active'
      ? activeQuests
      : filter === 'completed'
      ? completedQuests
      : quests;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 relative z-10 px-3 sm:px-4 animate-fadeIn">
      <RpgCard theme="player" className="shadow-2xl">
        <div className="space-y-4">
          {/* Header Row: Title & Prominent + ADD QUEST Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#2b2545]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-amber-500/20 border-2 border-amber-400/50 flex items-center justify-center shrink-0">
                <Scroll size={18} className="text-amber-300" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-pixel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 font-bold tracking-wide">
                  QUEST BOARD
                </h2>
                <p className="text-[10px] text-slate-400 font-pixel">
                  Real-life tasks & daily missions
                </p>
              </div>
            </div>

            {/* Prominent + ADD QUEST Button */}
            <button
              type="button"
              onClick={onAddQuestClick}
              className="px-4 py-2.5 bg-gradient-to-b from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 border-2 border-emerald-300 text-slate-950 font-pixel text-xs font-bold shadow-[3px_3px_0_0_#064e3b] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 group shrink-0"
            >
              <PlusCircle size={16} className="text-slate-950 group-hover:rotate-90 transition-transform duration-200" />
              <span>+ ADD QUEST</span>
            </button>
          </div>

          {/* Filter Tabs: All, Active, Completed */}
          <div className="flex items-center gap-2 border-b border-[#282142] pb-2 text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 font-pixel text-[10px] uppercase tracking-wider transition-all border-b-2 -mb-[9px] flex items-center gap-1.5 ${
                filter === 'all'
                  ? 'text-emerald-300 border-emerald-400 font-bold'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <span>All</span>
              <span className="px-1.5 py-0.2 bg-black/40 text-[9px] rounded-none border border-slate-700">
                {quests.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilter('active')}
              className={`px-3 py-1.5 font-pixel text-[10px] uppercase tracking-wider transition-all border-b-2 -mb-[9px] flex items-center gap-1.5 ${
                filter === 'active'
                  ? 'text-amber-300 border-amber-400 font-bold'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <Flame size={12} className="text-orange-400" />
              <span>Active</span>
              <span className="px-1.5 py-0.2 bg-black/40 text-[9px] rounded-none border border-slate-700">
                {activeQuests.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 font-pixel text-[10px] uppercase tracking-wider transition-all border-b-2 -mb-[9px] flex items-center gap-1.5 ${
                filter === 'completed'
                  ? 'text-emerald-300 border-emerald-400 font-bold'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span>Completed</span>
              <span className="px-1.5 py-0.2 bg-black/40 text-[9px] rounded-none border border-slate-700">
                {completedQuests.length}
              </span>
            </button>
          </div>

          {/* Quest Cards List */}
          <div className="space-y-2.5">
            {filteredQuests.length > 0 ? (
              filteredQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onToggleComplete={onToggleComplete}
                />
              ))
            ) : (
              <div className="p-8 text-center bg-[#110f1e] border-2 border-dashed border-[#2f274a] space-y-2">
                <p className="text-2xl">📜</p>
                <p className="text-xs font-pixel text-slate-300">
                  {filter === 'completed'
                    ? 'No completed quests yet. Finish an active quest to see it here!'
                    : filter === 'active'
                    ? 'All active quests completed! Rest or post a new quest.'
                    : 'No quests posted yet.'}
                </p>
                {filter !== 'completed' && (
                  <button
                    type="button"
                    onClick={onAddQuestClick}
                    className="mt-2 text-[10px] font-pixel text-emerald-400 underline hover:text-emerald-300"
                  >
                    + Post your first quest
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </RpgCard>
    </div>
  );
};
