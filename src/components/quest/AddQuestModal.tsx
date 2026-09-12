import React, { useState } from 'react';
import type { Quest, QuestCategory, QuestDifficulty } from '../../types/quest';
import { QUEST_CATEGORIES, QUEST_DIFFICULTIES } from '../../types/quest';
import { RpgButton } from '../ui/RpgButton';
import { RpgCard } from '../ui/RpgCard';
import { RpgInput } from '../ui/RpgInput';
import { X, Calendar, PlusCircle, Check } from 'lucide-react';

interface AddQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuest: (quest: Quest) => void;
}

export const AddQuestModal: React.FC<AddQuestModalProps> = ({
  isOpen,
  onClose,
  onAddQuest,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<QuestCategory>('intelligence');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('medium');
  const [deadline, setDeadline] = useState('Today');
  const [customDate, setCustomDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a quest name!');
      return;
    }

    const newQuest: Quest = {
      id: `quest-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: title.trim(),
      category,
      difficulty,
      deadline: deadline === 'Today' ? 'Today' : customDate || 'Today',
      completed: false,
      createdAt: Date.now(),
    };

    onAddQuest(newQuest);
    // Reset form
    setTitle('');
    setCategory('intelligence');
    setDifficulty('medium');
    setDeadline('Today');
    setCustomDate('');
    setError(null);
    onClose();
  };

  const handleSelectToday = () => {
    setDeadline('Today');
    setCustomDate('');
  };

  const handleCustomDateChange = (val: string) => {
    setCustomDate(val);
    setDeadline(val || 'Today');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg relative z-10 animate-scaleUp">
        <RpgCard theme="player" className="shadow-2xl border-2 border-emerald-500/60">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#2f274a] mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📜</span>
              <div>
                <h2 className="text-base font-pixel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 font-bold">
                  POST NEW QUEST
                </h2>
                <p className="text-[10px] text-slate-400 font-pixel">
                  Turn your real-world task into an RPG adventure
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-[#3b325c] bg-[#161327] text-slate-400 hover:text-white hover:bg-rose-900/40 hover:border-rose-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. QUEST NAME */}
            <div>
              <RpgInput
                id="quest-title-input"
                label="1. Quest Name"
                placeholder="e.g. Study DBMS for 2 hours, Go to gym..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError(null);
                }}
                error={error || undefined}
                autoFocus
              />
            </div>

            {/* 2. CATEGORY SELECTOR */}
            <div>
              <label className="block text-[10px] font-pixel text-slate-300 uppercase tracking-wider mb-1.5">
                2. Category <span className="text-slate-400 text-[9px] lowercase">(stat to train)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(QUEST_CATEGORIES).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-2 text-left border-2 transition-all flex items-center gap-2 ${
                      category === cat.id
                        ? `${cat.badgeBg} ${cat.badgeBorder} ${cat.badgeText} shadow-[2px_2px_0_0_#000]`
                        : 'bg-[#141124] border-[#2f274a] text-slate-400 hover:border-slate-500 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-base shrink-0">{cat.icon}</span>
                    <div className="overflow-hidden">
                      <span className="block text-[10px] font-pixel font-bold truncate">
                        {cat.label}
                      </span>
                    </div>
                    {category === cat.id && (
                      <Check size={12} className="ml-auto shrink-0 text-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. DIFFICULTY SELECTOR */}
            <div>
              <label className="block text-[10px] font-pixel text-slate-300 uppercase tracking-wider mb-1.5">
                3. Difficulty
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(QUEST_DIFFICULTIES).map((diff) => (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => setDifficulty(diff.id)}
                    className={`p-2 text-center border-2 transition-all ${
                      difficulty === diff.id
                        ? `${diff.badgeBg} ${diff.badgeBorder} ${diff.badgeText} shadow-[2px_2px_0_0_#000]`
                        : 'bg-[#141124] border-[#2f274a] text-slate-400 hover:border-slate-500 hover:text-slate-200'
                    }`}
                  >
                    <span className="block text-[10px] font-pixel font-bold">
                      {diff.label}
                    </span>
                    <span className="block text-[10px] text-amber-300 font-pixel mt-0.5">
                      {diff.stars}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. DEADLINE SELECTOR */}
            <div>
              <label className="block text-[10px] font-pixel text-slate-300 uppercase tracking-wider mb-1.5">
                4. Deadline
              </label>
              <div className="flex items-center gap-2">
                {/* Today Quick Button */}
                <button
                  type="button"
                  onClick={handleSelectToday}
                  className={`px-3 py-2 border-2 text-[10px] font-pixel uppercase tracking-wide transition-all shrink-0 flex items-center gap-1.5 ${
                    deadline === 'Today'
                      ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-[2px_2px_0_0_#000]'
                      : 'bg-[#141124] border-[#2f274a] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Calendar size={13} />
                  <span>Today</span>
                </button>

                {/* Date Input */}
                <div className="flex-1 relative">
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => handleCustomDateChange(e.target.value)}
                    className={`w-full px-3 py-2 bg-[#12101e] border-2 text-xs text-slate-200 font-mono rounded-none focus:outline-none transition-colors ${
                      deadline !== 'Today'
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-[#2f274a] text-slate-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* 5. ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t-2 border-[#2b2545]">
              <RpgButton
                type="button"
                variant="secondary"
                size="md"
                onClick={onClose}
              >
                Cancel
              </RpgButton>

              <RpgButton
                type="submit"
                variant="player"
                size="md"
                icon={<PlusCircle size={16} className="text-slate-950" />}
              >
                Create Quest
              </RpgButton>
            </div>
          </form>
        </RpgCard>
      </div>
    </div>
  );
};
