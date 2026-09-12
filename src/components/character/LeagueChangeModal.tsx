import React, { useEffect } from 'react';
import type { PlayerLeague } from '../../types/progression';
import { RpgButton } from '../ui/RpgButton';
import { RpgCard } from '../ui/RpgCard';
import {
  formatLeagueRank,
  formatLeagueRankWithEmoji,
  getLeagueVisualConfig,
} from '../../utils/league';
import { getShieldMetadata, LeagueShieldSvg } from './LeagueShield';
import {
  playLeaguePromotedSound,
  playLeagueDemotedSound,
} from '../../utils/soundEffects';
import { AlertTriangle, ArrowRight, Sparkles, Shield } from 'lucide-react';

interface LeagueChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'promoted' | 'demoted';
  oldLeague: PlayerLeague;
  newLeague: PlayerLeague;
}

export const LeagueChangeModal: React.FC<LeagueChangeModalProps> = ({
  isOpen,
  onClose,
  type,
  oldLeague,
  newLeague,
}) => {
  const isPromoted = type === 'promoted';
  const newVisual = getLeagueVisualConfig(newLeague);
  const shieldMeta = getShieldMetadata(newLeague);

  useEffect(() => {
    if (isOpen) {
      if (isPromoted) {
        playLeaguePromotedSound();
      } else {
        playLeagueDemotedSound();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          e.preventDefault();
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isPromoted, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md relative z-10 animate-scaleUp">
        <RpgCard
          theme={isPromoted ? 'player' : 'dev'}
          className={`shadow-2xl border-2 text-center ${
            isPromoted
              ? 'border-yellow-400 shadow-[0_0_35px_rgba(234,179,8,0.5)]'
              : 'border-rose-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]'
          }`}
        >
          <div className="space-y-3.5 py-1">
            {/* Header Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 border text-[10px] font-pixel uppercase tracking-widest shadow-[2px_2px_0_0_#000] ${
                isPromoted
                  ? 'bg-yellow-950/90 border-yellow-400 text-yellow-300'
                  : 'bg-rose-950/90 border-rose-400 text-rose-300'
              }`}
            >
              {isPromoted ? (
                <>
                  <Sparkles size={12} className="text-yellow-400 animate-spin" />
                  <span>🏆 LEAGUE PROMOTED!</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={12} className="text-rose-400 animate-pulse" />
                  <span>⚠️ LEAGUE DEMOTED</span>
                </>
              )}
            </div>

            {/* Glowing Trophy & Shield Showcase */}
            <div className="flex items-center justify-center gap-4 my-2">
              {/* Rank Emoji Badge */}
              <div
                className={`w-18 h-18 p-2 rounded-full border-2 flex items-center justify-center shadow-lg ${
                  isPromoted
                    ? 'bg-gradient-to-t from-yellow-600/40 via-amber-500/30 to-amber-300/20 border-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.6)] animate-stat-pulse'
                    : 'bg-gradient-to-t from-rose-950/60 to-slate-900 border-rose-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                }`}
              >
                <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                  {newVisual.emoji}
                </span>
              </div>

              {/* Shield Preview SVG Box */}
              <div className="w-18 h-18 p-1.5 bg-[#171427] border-2 border-amber-400/70 flex flex-col items-center justify-center shadow-[2px_2px_0_0_#000]">
                <svg viewBox="10 52 28 44" className="w-12 h-12 overflow-visible">
                  <LeagueShieldSvg league={newLeague} />
                </svg>
              </div>
            </div>

            {/* Main Title */}
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold font-pixel tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                  isPromoted ? 'text-yellow-200' : 'text-rose-200'
                }`}
              >
                {isPromoted
                  ? `Reached ${formatLeagueRank(newLeague)}!`
                  : `Dropped to ${formatLeagueRank(newLeague)}`}
              </h2>
              <p className="text-xs text-slate-300 font-pixel mt-1 max-w-xs mx-auto">
                {isPromoted
                  ? 'Your stellar consistency and daily dedication earned you a higher league standing!'
                  : 'Inactivity or broken streaks have dropped your league rank. Complete quests to climb back!'}
              </p>
            </div>

            {/* Equipped Shield Unlock Banner */}
            <div className="p-2 bg-[#12101e] border border-amber-400/40 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-300 text-[10px] font-pixel">
                <Shield size={12} className="text-amber-400" />
                <span className="uppercase">Equipped Shield:</span>
                <span className="text-cyan-300 font-bold">{shieldMeta.name}</span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">{shieldMeta.description}</p>
            </div>

            {/* Rank Change Progression Card */}
            <div className="bg-[#12101e] border-2 border-[#2b2545] p-3 rounded-none flex items-center justify-around shadow-inner">
              <div className="text-center">
                <span className="block text-[9px] font-pixel text-slate-500 uppercase">Previous</span>
                <span className="text-xs font-bold text-slate-400 font-pixel">
                  {formatLeagueRankWithEmoji(oldLeague)}
                </span>
              </div>

              <div className="flex items-center justify-center px-2">
                <ArrowRight
                  size={16}
                  className={isPromoted ? 'text-yellow-400' : 'text-rose-400'}
                />
              </div>

              <div className="text-center">
                <span className="block text-[9px] font-pixel text-slate-400 uppercase">New Rank</span>
                <span
                  className={`text-xs font-bold font-pixel ${
                    isPromoted ? 'text-yellow-300' : 'text-rose-300'
                  }`}
                >
                  {formatLeagueRankWithEmoji(newLeague)}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <RpgButton
                type="button"
                variant={isPromoted ? 'player' : 'secondary'}
                size="lg"
                fullWidth
                onClick={onClose}
                className="w-full py-2.5 font-pixel text-xs uppercase tracking-wider"
              >
                {isPromoted ? 'CLAIM HONOR & CONTINUE' : 'ACKNOWLEDGE & RECLAIM RANK'}
              </RpgButton>
            </div>
          </div>
        </RpgCard>
      </div>
    </div>
  );
};

