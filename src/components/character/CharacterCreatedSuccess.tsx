import React from 'react';
import type { CharacterProfile } from '../../types/character';
import {
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  OUTFIT_STYLES,
  OUTFIT_COLORS,
} from '../../types/character';
import { CharacterPreview } from './CharacterPreview';
import { RpgCard } from '../ui/RpgCard';
import { RpgButton } from '../ui/RpgButton';
import { RpgBadge } from '../ui/RpgBadge';
import { Sparkles, Edit3, LogOut, CheckCircle2 } from 'lucide-react';

interface CharacterCreatedSuccessProps {
  character: CharacterProfile;
  onEditCharacter: () => void;
  onViewStats: () => void;
  onLogOut: () => void;
}

export const CharacterCreatedSuccess: React.FC<CharacterCreatedSuccessProps> = ({
  character,
  onEditCharacter,
  onViewStats,
  onLogOut,
}) => {
  const skin = SKIN_TONES.find((s) => s.id === character.skinToneId) || SKIN_TONES[0];
  const hairStyle = HAIR_STYLES.find((h) => h.id === character.hairStyleId) || HAIR_STYLES[0];
  const hairColor = HAIR_COLORS.find((h) => h.id === character.hairColorId) || HAIR_COLORS[0];
  const outfitStyle = OUTFIT_STYLES.find((o) => o.id === character.outfitStyleId) || OUTFIT_STYLES[0];
  const outfitColor = OUTFIT_COLORS.find((o) => o.id === character.outfitColorId) || OUTFIT_COLORS[0];

  return (
    <div className="w-full max-w-md mx-auto my-auto relative z-10 px-4 py-6 animate-fadeIn">
      {/* Title & Celebration */}
      <div className="text-center mb-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181528] border-2 border-[#39325a] text-slate-300 text-[10px] font-pixel uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
          <Sparkles size={12} className="text-amber-400 shrink-0" />
          <span>Character Created!</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider font-pixel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_4px_4px_rgba(0,0,0,0.85)]">
          {character.name}
        </h1>
        <p className="text-xs text-slate-300 font-medium">
          Your RPG adventurer has been forged and initialized with Level 1 stats!
        </p>
      </div>

      {/* Main Character Showcase Card */}
      <RpgCard theme="player" className="shadow-2xl">
        <div className="space-y-5">
          {/* Character Live Sprite Showcase */}
          <div className="p-4 bg-[#12101e] border-2 border-[#2e2848] flex flex-col items-center justify-center">
            <CharacterPreview profile={character} size="md" />
          </div>

          {/* Character Dossier Summary Table */}
          <div className="p-3.5 bg-[#110f1c] border-2 border-[#2f294c] text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#241f3d]">
              <span className="text-slate-400 font-pixel text-[10px] uppercase">Adventurer Class</span>
              <RpgBadge variant="player" size="sm">
                {outfitStyle.badge} {character.gender === 'male' ? 'Hero' : 'Heroine'}
              </RpgBadge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-pixel">Gender</span>
                <span className="text-slate-200 font-semibold capitalize">♂️ {character.gender}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-pixel">Complexion</span>
                <span className="text-slate-200 font-semibold">{skin.label}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-pixel">Hairstyle</span>
                <span className="text-slate-200 font-semibold">{hairStyle.label} ({hairColor.label.split(' ')[0]})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-pixel">Attire</span>
                <span className="text-slate-200 font-semibold">{outfitStyle.label} ({outfitColor.label.split(' ')[0]})</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#241f3d] flex items-center gap-2 text-[11px] text-emerald-300">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Step 2 & 3: Level 1 baseline stats & progression initialized.</span>
            </div>
          </div>

          {/* Primary View Stats Action Button */}
          <RpgButton
            type="button"
            variant="player"
            size="lg"
            fullWidth
            onClick={onViewStats}
            icon={<Sparkles size={16} className="text-amber-300" />}
          >
            View Stats & Profile (Step 3) ➔
          </RpgButton>

          {/* Secondary Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <RpgButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={onEditCharacter}
              icon={<Edit3 size={13} />}
            >
              Edit Character
            </RpgButton>

            <RpgButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={onLogOut}
              icon={<LogOut size={13} />}
            >
              Log Out
            </RpgButton>
          </div>
        </div>
      </RpgCard>
    </div>
  );
};
