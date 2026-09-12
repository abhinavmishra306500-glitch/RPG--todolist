import React, { useEffect } from 'react';
import { RpgButton } from '../ui/RpgButton';
import { RpgCard } from '../ui/RpgCard';
import { Flame, Award, Sparkles, Check } from 'lucide-react';
import { STREAK_MILESTONES } from '../../utils/streakDecay';
import { playStreakMilestoneSound } from '../../utils/soundEffects';

interface StreakMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: number;
  currentStreak: number;
}

export const StreakMilestoneModal: React.FC<StreakMilestoneModalProps> = ({
  isOpen,
  onClose,
  milestone,
  currentStreak,
}) => {
  useEffect(() => {
    if (isOpen) {
      playStreakMilestoneSound();
    }
  }, [isOpen, milestone]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md relative z-10 animate-scaleUp">
        <RpgCard theme="player" className="shadow-2xl border-2 border-orange-500/80 text-center">
          <div className="space-y-4 py-2">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-950/90 border border-orange-400 text-orange-300 text-[10px] font-pixel uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
              <Sparkles size={12} className="text-amber-400 animate-pulse" />
              <span>STREAK MILESTONE REACHED!</span>
            </div>

            {/* Glowing Flame Trophy */}
            <div className="flex justify-center my-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-t from-orange-600/40 via-amber-500/30 to-yellow-400/20 border-2 border-orange-400 flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-stat-pulse">
                <Flame size={44} className="text-orange-400 filter drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
              </div>
            </div>

            {/* Milestone Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-orange-200 font-pixel tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {milestone} DAY STREAK!
              </h2>
              <p className="text-xs text-slate-300 font-pixel mt-1 max-w-xs mx-auto">
                {milestone >= 30
                  ? 'Legendary dedication! Your discipline is forging a heroic legacy.'
                  : milestone >= 7
                  ? 'Unstoppable momentum! One full week of daily conquest!'
                  : 'Great start! Consistency is the greatest weapon of any hero.'}
              </p>
            </div>

            {/* All Milestones Stepper */}
            <div className="bg-[#12101e] border-2 border-[#2b2545] p-3 rounded-none">
              <div className="text-[10px] font-pixel text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Streak Journey</span>
                <span className="text-orange-300 font-bold">{currentStreak} Days</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5 text-center">
                {STREAK_MILESTONES.map((m) => {
                  const isReached = currentStreak >= m;
                  const isCurrent = milestone === m;
                  return (
                    <div
                      key={m}
                      className={`p-1.5 border flex flex-col items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-orange-500/30 border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)] scale-105'
                          : isReached
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                          : 'bg-[#181528] border-slate-700/60 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] font-pixel font-bold">
                        {m}D
                      </span>
                      {isReached ? (
                        <Check size={10} className={isCurrent ? 'text-orange-300' : 'text-emerald-400'} />
                      ) : (
                        <Award size={10} className="opacity-40" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <RpgButton
                variant="player"
                onClick={onClose}
                className="w-full py-2.5 font-pixel text-xs uppercase tracking-wider bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 border-orange-400"
              >
                Continue Adventure
              </RpgButton>
            </div>
          </div>
        </RpgCard>
      </div>
    </div>
  );
};
