import React, { useState } from 'react';
import type { Quest, QuestCategory, QuestDifficulty, QuestType } from '../../types/quest';
import { QUEST_CATEGORIES, QUEST_DIFFICULTIES } from '../../types/quest';
import { getTodayDateString } from '../../utils/questStorage';
import { RpgButton } from '../ui/RpgButton';
import { RpgCard } from '../ui/RpgCard';
import { RpgInput } from '../ui/RpgInput';
import { X, PlusCircle, Check, Clock, CalendarDays, Sparkles } from 'lucide-react';

interface AddQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuest: (quest: Quest) => void;
}

type DurationMode = 'short' | 'long';

interface DurationOption {
  label: string;
  ms: number;
}

const SHORT_TERM_OPTIONS: DurationOption[] = [
  { label: '15 minutes', ms: 15 * 60 * 1000 },
  { label: '30 minutes', ms: 30 * 60 * 1000 },
  { label: '1 hour', ms: 60 * 60 * 1000 },
  { label: '2 hours', ms: 2 * 60 * 60 * 1000 },
  { label: '3 hours', ms: 3 * 60 * 60 * 1000 },
];

const LONG_TERM_OPTIONS: DurationOption[] = [
  { label: '1 day', ms: 24 * 60 * 60 * 1000 },
  { label: '3 days', ms: 3 * 24 * 60 * 60 * 1000 },
  { label: '7 days', ms: 7 * 24 * 60 * 60 * 1000 },
  { label: '14 days', ms: 14 * 24 * 60 * 60 * 1000 },
  { label: '30 days', ms: 30 * 24 * 60 * 60 * 1000 },
];

export const AddQuestModal: React.FC<AddQuestModalProps> = ({
  isOpen,
  onClose,
  onAddQuest,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<QuestCategory>('intelligence');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('medium');
  const [durationMode, setDurationMode] = useState<DurationMode>('short');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>(SHORT_TERM_OPTIONS[3]); // default 2 hours
  const [customVal, setCustomVal] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Compute automatic placement
  const autoQuestType: QuestType = durationMode === 'short' ? 'today' : 'active';

  const handleSelectMode = (mode: DurationMode) => {
    setDurationMode(mode);
    setIsCustom(false);
    setCustomVal('');
    setSelectedDuration(mode === 'short' ? SHORT_TERM_OPTIONS[3] : LONG_TERM_OPTIONS[2]);
  };

  const handleSelectPreset = (opt: DurationOption) => {
    setIsCustom(false);
    setSelectedDuration(opt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a quest name!');
      return;
    }

    let finalDurationMs = selectedDuration.ms;
    let finalLabel = selectedDuration.label;

    if (isCustom && customVal) {
      const num = parseFloat(customVal);
      if (isNaN(num) || num <= 0) {
        setError('Please enter a valid positive duration number!');
        return;
      }

      if (durationMode === 'short') {
        finalDurationMs = num * 60 * 60 * 1000;
        finalLabel = `${num} ${num === 1 ? 'hour' : 'hours'}`;
      } else {
        finalDurationMs = num * 24 * 60 * 60 * 1000;
        finalLabel = `${num} ${num === 1 ? 'day' : 'days'}`;
      }
    }

    const now = Date.now();
    const newQuest: Quest = {
      id: `quest-${now}-${Math.random().toString(36).substr(2, 4)}`,
      title: title.trim(),
      category,
      difficulty,
      createdAt: now,
      questDate: getTodayDateString(),
      deadline: now + finalDurationMs,
      durationLabel: finalLabel,
      questType: autoQuestType,
      completed: false,
      status: 'active',
    };

    onAddQuest(newQuest);

    // Reset Form
    setTitle('');
    setCategory('intelligence');
    setDifficulty('medium');
    setDurationMode('short');
    setSelectedDuration(SHORT_TERM_OPTIONS[3]);
    setIsCustom(false);
    setCustomVal('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg relative z-10 animate-scaleUp">
        <RpgCard theme="player" className="shadow-2xl border-2 border-emerald-500/60 max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#2f274a] mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📜</span>
              <div>
                <h2 className="text-base font-pixel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 font-bold">
                  POST NEW QUEST
                </h2>
                <p className="text-[10px] text-slate-400 font-pixel">
                  Turn real-life daily goals into RPG achievements
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
                2. Category <span className="text-slate-400 text-[9px] lowercase">(determines stat trained)</span>
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

            {/* 4. DEADLINE / DURATION SELECTOR (Short-term vs Long-term) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-pixel text-slate-300 uppercase tracking-wider">
                  4. Deadline / Duration
                </label>
                {/* Auto-routing indicator */}
                <span className="text-[9px] font-pixel px-2 py-0.5 border bg-[#110f1e] border-[#362f54] text-amber-300 flex items-center gap-1">
                  <Sparkles size={10} className="text-amber-400" />
                  <span>Auto-places into: </span>
                  <strong className="text-emerald-400 uppercase">
                    {autoQuestType === 'today' ? "Today's Quests" : 'Active Quests'}
                  </strong>
                </span>
              </div>

              {/* Mode Toggle: Short-Term vs Long-Term */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectMode('short')}
                  className={`p-2 border-2 text-left transition-all flex items-center gap-2 ${
                    durationMode === 'short'
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[2px_2px_0_0_#064e3b]'
                      : 'bg-[#141124] border-[#2f274a] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Clock size={16} className={durationMode === 'short' ? 'text-emerald-400' : 'text-slate-400'} />
                  <div>
                    <span className="block text-[10px] font-pixel font-bold">SHORT-TERM</span>
                    <span className="block text-[9px] text-slate-400">Hours (Today)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectMode('long')}
                  className={`p-2 border-2 text-left transition-all flex items-center gap-2 ${
                    durationMode === 'long'
                      ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-[2px_2px_0_0_#78350f]'
                      : 'bg-[#141124] border-[#2f274a] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CalendarDays size={16} className={durationMode === 'long' ? 'text-amber-400' : 'text-slate-400'} />
                  <div>
                    <span className="block text-[10px] font-pixel font-bold">LONG-TERM</span>
                    <span className="block text-[9px] text-slate-400">Multiple Days (Active)</span>
                  </div>
                </button>
              </div>

              {/* Preset Duration Chips */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 pt-1">
                {(durationMode === 'short' ? SHORT_TERM_OPTIONS : LONG_TERM_OPTIONS).map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelectPreset(opt)}
                    className={`py-1.5 px-2 border-2 text-center text-[9px] font-pixel transition-all ${
                      !isCustom && selectedDuration.label === opt.label
                        ? durationMode === 'short'
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold shadow-[2px_2px_0_0_#064e3b]'
                          : 'bg-amber-950 border-amber-400 text-amber-300 font-bold shadow-[2px_2px_0_0_#78350f]'
                        : 'bg-[#12101e] border-[#2b2545] text-slate-400 hover:border-slate-500 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Custom Duration Input */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`px-2.5 py-1.5 border text-[9px] font-pixel transition-colors shrink-0 ${
                    isCustom
                      ? 'bg-indigo-950 border-indigo-400 text-indigo-300 font-bold'
                      : 'bg-[#12101e] border-[#2f274a] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Custom
                </button>
                {isCustom && (
                  <div className="flex-1 flex items-center gap-2 animate-fadeIn">
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      placeholder={durationMode === 'short' ? 'e.g. 4 (hours)' : 'e.g. 21 (days)'}
                      value={customVal}
                      onChange={(e) => setCustomVal(e.target.value)}
                      className="w-full px-2.5 py-1 bg-[#12101e] border-2 border-indigo-500 text-xs text-indigo-200 font-mono focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 font-pixel shrink-0">
                      {durationMode === 'short' ? 'hours' : 'days'}
                    </span>
                  </div>
                )}
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
