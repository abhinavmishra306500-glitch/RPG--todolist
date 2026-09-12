import React, { useEffect, useState } from 'react';
import type { QuestReward } from '../../utils/questRewards';
import { playLevelUpSound, playStatIncreaseSound } from '../../utils/soundEffects';
import { RpgButton } from '../ui/RpgButton';
import { RpgCard } from '../ui/RpgCard';
import { Sparkles, Zap, Coins, CheckCircle, ArrowRight } from 'lucide-react';

interface QuestRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  questTitle: string;
  reward: QuestReward | null;
  leveledUp: boolean;
  newLevel: number;
}

export const QuestRewardModal: React.FC<QuestRewardModalProps> = ({
  isOpen,
  onClose,
  questTitle,
  reward,
  leveledUp,
  newLevel,
}) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isOpen || !reward) {
      setStage(0);
      return;
    }

    // Play initial reward sound
    playStatIncreaseSound();

    // Stage 1: Reveal XP after 250ms
    const t1 = setTimeout(() => setStage(1), 250);
    // Stage 2: Reveal Gold after 650ms
    const t2 = setTimeout(() => setStage(2), 650);
    // Stage 3: Reveal Attribute / Skill XP after 1050ms
    const t3 = setTimeout(() => setStage(3), 1050);
    // Stage 4: Reveal Level-Up (if leveled up) after 1450ms
    const t4 = setTimeout(() => {
      setStage(4);
      if (leveledUp) {
        playLevelUpSound();
      }
    }, 1450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen, reward, leveledUp]);

  if (!isOpen || !reward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md relative z-10 animate-scaleUp">
        <RpgCard theme="player" className="shadow-2xl border-2 border-amber-400/80 text-center">
          <div className="space-y-4 py-2">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/90 border border-amber-400 text-amber-300 text-[10px] font-pixel uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
              <CheckCircle size={12} className="text-emerald-400" />
              <span>QUEST COMPLETE!</span>
            </div>

            {/* Quest Title */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 font-pixel">
                {questTitle}
              </h2>
              <p className="text-[10px] text-slate-400 font-pixel mt-0.5">
                Task successfully finished • Rewards earned!
              </p>
            </div>

            {/* Staged Rewards Container */}
            <div className="space-y-2.5 p-3 bg-[#110f1e] border-2 border-[#2b2545]">
              {/* REWARD 1: Overall XP */}
              <div
                className={`p-2.5 bg-[#171428] border-2 border-indigo-500/60 flex items-center justify-between transition-all duration-500 ${
                  stage >= 1 ? 'opacity-100 translate-y-0 shadow-[2px_2px_0_0_#1e1b4b]' : 'opacity-0 translate-y-3'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-indigo-500/20 border border-indigo-400 flex items-center justify-center shrink-0">
                    <Zap size={14} className="text-indigo-400 fill-indigo-400" />
                  </div>
                  <span className="text-xs font-pixel text-slate-300">Overall XP</span>
                </div>
                <span className="text-xs font-bold font-pixel text-indigo-300">
                  +{reward.xp} XP
                </span>
              </div>

              {/* REWARD 2: Gold */}
              <div
                className={`p-2.5 bg-[#171428] border-2 border-amber-500/60 flex items-center justify-between transition-all duration-500 ${
                  stage >= 2 ? 'opacity-100 translate-y-0 shadow-[2px_2px_0_0_#78350f]' : 'opacity-0 translate-y-3'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                    <Coins size={14} className="text-amber-400" />
                  </div>
                  <span className="text-xs font-pixel text-slate-300">Gold Currency</span>
                </div>
                <span className="text-xs font-bold font-pixel text-amber-300">
                  +{reward.gold} Gold
                </span>
              </div>

              {/* REWARD 3: Attribute OR Skill XP */}
              <div
                className={`p-2.5 bg-[#171428] border-2 border-emerald-500/60 flex items-center justify-between transition-all duration-500 ${
                  stage >= 3 ? 'opacity-100 translate-y-0 shadow-[2px_2px_0_0_#064e3b]' : 'opacity-0 translate-y-3'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 text-sm">
                    {reward.categoryIcon}
                  </div>
                  <span className="text-xs font-pixel text-slate-300">
                    {reward.isSkillXp ? 'Skill Progression' : `${reward.attributeName} Stat`}
                  </span>
                </div>
                <span className="text-xs font-bold font-pixel text-emerald-300">
                  +{reward.attributeAmount} {reward.attributeName}
                </span>
              </div>
            </div>

            {/* LEVEL UP CELEBRATION BANNER */}
            {leveledUp && stage >= 4 && (
              <div className="p-3 bg-gradient-to-r from-amber-950/90 via-yellow-950/90 to-amber-950/90 border-2 border-amber-400 animate-level-up-glow shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <div className="flex items-center justify-center gap-2 text-amber-300 font-pixel text-sm font-bold animate-bounce">
                  <Sparkles size={16} className="text-yellow-300 animate-spin" />
                  <span>LEVEL UP! Reached Level {newLevel}!</span>
                  <span>🎉</span>
                </div>
                <p className="text-[10px] text-amber-200/90 font-pixel mt-1">
                  Overall XP threshold reached • Attributes enhanced!
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-2">
              <RpgButton
                type="button"
                variant="player"
                size="lg"
                fullWidth
                onClick={onClose}
                icon={<ArrowRight size={16} className="text-slate-950 stroke-[3]" />}
              >
                Claim & Continue ➔
              </RpgButton>
            </div>
          </div>
        </RpgCard>
      </div>
    </div>
  );
};
