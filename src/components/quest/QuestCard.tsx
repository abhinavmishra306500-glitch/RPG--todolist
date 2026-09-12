import React, { useState, useEffect } from 'react';
import type { Quest } from '../../types/quest';
import { QUEST_CATEGORIES, QUEST_DIFFICULTIES } from '../../types/quest';
import { calculateQuestReward } from '../../utils/questRewards';
import { formatRemainingTime } from '../../utils/questStorage';
import { playQuestCompleteSound } from '../../utils/soundEffects';
import { Check, Clock, AlertTriangle, Sparkles, RotateCcw, Zap, Coins, Trash2 } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  onToggleComplete: (id: string) => void;
  onRequestDelete?: (id: string) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onToggleComplete,
  onRequestDelete,
}) => {
  const [justCompleted, setJustCompleted] = useState(false);
  const [remainingText, setRemainingText] = useState(() =>
    formatRemainingTime(quest.deadline, quest.completed)
  );

  // Periodically refresh the countdown timer display
  useEffect(() => {
    setRemainingText(formatRemainingTime(quest.deadline, quest.completed));
    if (quest.completed) return;

    const interval = setInterval(() => {
      setRemainingText(formatRemainingTime(quest.deadline, quest.completed));
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [quest.deadline, quest.completed]);

  const categoryConfig = QUEST_CATEGORIES[quest.category] || QUEST_CATEGORIES.intelligence;
  const difficultyConfig = QUEST_DIFFICULTIES[quest.difficulty] || QUEST_DIFFICULTIES.medium;
  const reward = calculateQuestReward(quest);

  const isExpired = remainingText === 'EXPIRED';

  const handleComplete = () => {
    if (!quest.completed) {
      playQuestCompleteSound();
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 1200);
    }
    onToggleComplete(quest.id);
  };

  return (
    <div
      className={`relative p-3.5 border-2 transition-all duration-300 ${
        quest.completed
          ? 'bg-[#12101e]/85 border-[#282142] opacity-80 shadow-none'
          : isExpired
          ? 'bg-[#1c1218] border-rose-900/60 shadow-[3px_3px_0_0_#3f121d]'
          : 'bg-[#161327] border-[#342c54] hover:border-emerald-500/70 shadow-[3px_3px_0_0_#000]'
      } ${justCompleted ? 'animate-stat-pulse border-emerald-400 bg-emerald-950/40' : ''}`}
    >
      {/* Visual Completion Ping Animation */}
      {justCompleted && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-emerald-500/10 border-2 border-emerald-400 z-10 animate-ping" />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Category Icon, Quest Title, Badges, Countdown & Rewards */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Category Icon Badge */}
          <div
            className={`w-9 h-9 border-2 flex items-center justify-center shrink-0 text-base shadow-[1px_1px_0_0_#000] ${categoryConfig.badgeBg} ${categoryConfig.badgeBorder}`}
            title={`Category: ${categoryConfig.label} (Trains ${categoryConfig.statName})`}
          >
            <span>{categoryConfig.icon}</span>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={`text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                  quest.completed
                    ? 'line-through text-slate-500'
                    : isExpired
                    ? 'text-rose-300 font-medium'
                    : 'text-slate-100 font-medium'
                }`}
              >
                {quest.title}
              </h3>

              {quest.completed && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[9px] font-pixel">
                  <Check size={10} />
                  <span>COMPLETED</span>
                </span>
              )}

              {quest.rewardClaimed && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[9px] font-pixel">
                  <Sparkles size={10} className="text-amber-400" />
                  <span>CLAIMED</span>
                </span>
              )}

              {isExpired && !quest.completed && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-rose-950/90 border border-rose-500/60 text-rose-300 text-[9px] font-pixel">
                  <AlertTriangle size={10} />
                  <span>EXPIRED</span>
                </span>
              )}
            </div>

            {/* Badges: Category, Difficulty, Remaining Time */}
            <div className="flex items-center gap-2 flex-wrap text-[10px]">
              {/* Category */}
              <span
                className={`px-2 py-0.5 border text-[9px] font-pixel uppercase ${categoryConfig.badgeBg} ${categoryConfig.badgeBorder} ${categoryConfig.badgeText}`}
              >
                {categoryConfig.label}
              </span>

              {/* Difficulty */}
              <span
                className={`px-2 py-0.5 border text-[9px] font-pixel ${difficultyConfig.badgeBg} ${difficultyConfig.badgeBorder} ${difficultyConfig.badgeText}`}
              >
                {difficultyConfig.label} {difficultyConfig.stars}
              </span>

              {/* Remaining Time / Countdown Display */}
              <span
                className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 border ${
                  quest.completed
                    ? 'bg-black/40 border-slate-700 text-slate-400'
                    : isExpired
                    ? 'bg-rose-950/70 border-rose-500/60 text-rose-300 font-bold animate-pulse'
                    : 'bg-black/50 border-[#2d264a] text-cyan-300'
                }`}
              >
                <Clock size={11} className={isExpired ? 'text-rose-400' : 'text-cyan-400'} />
                <span>{remainingText}</span>
              </span>
            </div>

            {/* Quest Completion Rewards Preview Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-[9px] font-pixel">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-950/70 border border-indigo-500/40 text-indigo-300">
                <Zap size={10} className="text-indigo-400" />
                +{reward.xp} XP
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-yellow-950/70 border border-yellow-500/40 text-yellow-300">
                <Coins size={10} className="text-yellow-400" />
                +{reward.gold} G
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                <span>{reward.categoryIcon}</span>
                +{reward.attributeAmount} {reward.attributeName}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action & Delete Controls */}
        <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
          {quest.completed ? (
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1.5 bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-[10px] font-pixel flex items-center gap-1 shadow-[1px_1px_0_0_#000]">
                <Check size={12} className="stroke-[3]" />
                <span>Claimed</span>
              </span>
              <button
                type="button"
                onClick={handleComplete}
                className="px-2 py-1.5 bg-[#171424] border border-[#2f274a] text-slate-500 hover:text-slate-300 text-[9px] font-pixel transition-colors flex items-center gap-1"
                title="Reopen quest"
              >
                <RotateCcw size={10} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 border-2 border-emerald-300 text-slate-950 text-[10px] font-pixel font-bold shadow-[2px_2px_0_0_#064e3b] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5"
            >
              <Check size={14} className="stroke-[3]" />
              <span>Complete Quest</span>
              {justCompleted && <Sparkles size={12} className="text-amber-200 animate-spin" />}
            </button>
          )}

          {onRequestDelete && (
            <button
              type="button"
              onClick={() => onRequestDelete(quest.id)}
              className="p-2 bg-[#1b1219] hover:bg-rose-950/90 border border-rose-900/60 hover:border-rose-500 text-rose-400 hover:text-rose-200 text-[10px] font-pixel transition-colors shadow-[1px_1px_0_0_#000] flex items-center justify-center"
              title="Delete Quest"
              aria-label={`Delete ${quest.title}`}
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
