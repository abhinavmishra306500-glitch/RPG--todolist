import React from 'react';
import type { Quest } from '../../types/quest';
import { QUEST_CATEGORIES, QUEST_DIFFICULTIES } from '../../types/quest';
import { Check, Calendar, History } from 'lucide-react';

interface QuestHistoryViewProps {
  completedQuests: Quest[];
}

export const QuestHistoryView: React.FC<QuestHistoryViewProps> = ({
  completedQuests,
}) => {
  if (completedQuests.length === 0) {
    return (
      <div className="p-8 text-center bg-[#110f1e] border-2 border-dashed border-[#2f274a] space-y-2">
        <History size={28} className="mx-auto text-slate-500" />
        <h3 className="text-xs font-pixel text-slate-300">Quest History is Empty</h3>
        <p className="text-[10px] text-slate-400">
          Complete daily or active quests to record your journey in the chronicles of history!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {completedQuests.map((quest) => {
        const categoryConfig = QUEST_CATEGORIES[quest.category] || QUEST_CATEGORIES.intelligence;
        const difficultyConfig = QUEST_DIFFICULTIES[quest.difficulty] || QUEST_DIFFICULTIES.medium;
        const completedDateStr = quest.completedAt
          ? new Date(quest.completedAt).toLocaleDateString()
          : quest.questDate;

        return (
          <div
            key={quest.id}
            className="p-3 bg-[#131021] border-2 border-[#2b2545] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 opacity-90 shadow-sm"
          >
            <div className="flex items-center gap-3">
              {/* Category Icon */}
              <div
                className={`w-8 h-8 border-2 flex items-center justify-center shrink-0 text-sm ${categoryConfig.badgeBg} ${categoryConfig.badgeBorder}`}
              >
                <span>{categoryConfig.icon}</span>
              </div>

              <div>
                <h4 className="text-xs font-medium text-slate-200 line-through">
                  {quest.title}
                </h4>
                <div className="flex items-center gap-2 flex-wrap text-[9px] mt-1 font-pixel">
                  <span
                    className={`px-1.5 py-0.5 border ${categoryConfig.badgeBg} ${categoryConfig.badgeBorder} ${categoryConfig.badgeText}`}
                  >
                    {categoryConfig.label}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 border ${difficultyConfig.badgeBg} ${difficultyConfig.badgeBorder} ${difficultyConfig.badgeText}`}
                  >
                    {difficultyConfig.label}
                  </span>
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Calendar size={10} />
                    <span>Created: {quest.questDate}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[9px] font-pixel">
                <Check size={10} />
                <span>Completed on {completedDateStr}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
