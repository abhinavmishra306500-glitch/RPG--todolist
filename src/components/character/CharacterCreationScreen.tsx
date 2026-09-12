import React, { useState } from 'react';
import type { CharacterProfile, Gender, HairStyleOption, OutfitStyleOption } from '../../types/character';
import {
  SKIN_TONES,
  HAIR_STYLES,
  HAIR_COLORS,
  OUTFIT_STYLES,
  OUTFIT_COLORS,
  DEFAULT_CHARACTER,
} from '../../types/character';
import { CharacterPreview } from './CharacterPreview';
import { RpgCard } from '../ui/RpgCard';
import { RpgButton } from '../ui/RpgButton';
import { RpgInput } from '../ui/RpgInput';
import { RpgBadge } from '../ui/RpgBadge';
import { PixelSparkle, PixelSword } from '../common/PixelIcons';
import { Sparkles, ArrowLeft, Check, Wand2 } from 'lucide-react';

interface CharacterCreationScreenProps {
  initialCharacter?: CharacterProfile;
  initialName?: string;
  onConfirmCharacter: (character: CharacterProfile) => void;
  onBackToLogin: () => void;
}

export const CharacterCreationScreen: React.FC<CharacterCreationScreenProps> = ({
  initialCharacter,
  initialName = '',
  onConfirmCharacter,
  onBackToLogin,
}) => {
  const [character, setCharacter] = useState<CharacterProfile>(
    initialCharacter || {
      ...DEFAULT_CHARACTER,
      name: initialName,
    }
  );

  const [nameError, setNameError] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'appearance' | 'outfit'>('appearance');

  const handleNameChange = (val: string) => {
    setCharacter((prev) => ({ ...prev, name: val }));
    if (nameError && val.trim().length > 0) {
      setNameError(undefined);
    }
  };

  const handleGenderChange = (gender: Gender) => {
    setCharacter((prev) => ({
      ...prev,
      gender,
      // If switching gender and on default hairstyle, pick friendly default
      hairStyleId: gender === 'female' && prev.hairStyleId === 'spiky' ? 'flowing' : prev.hairStyleId,
    }));
  };

  const handleRandomize = () => {
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)];
    const randomHair = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)];
    const randomColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
    const randomOutfit = OUTFIT_STYLES[Math.floor(Math.random() * OUTFIT_STYLES.length)];
    const randomOutfitColor = OUTFIT_COLORS[Math.floor(Math.random() * OUTFIT_COLORS.length)];

    setCharacter((prev) => ({
      ...prev,
      skinToneId: randomSkin.id,
      hairStyleId: randomHair.id,
      hairColorId: randomColor.id,
      outfitStyleId: randomOutfit.id,
      outfitColorId: randomOutfitColor.id,
    }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!character.name.trim()) {
      setNameError('Please enter your adventurer name before beginning');
      return;
    }

    if (character.name.trim().length < 2) {
      setNameError('Adventurer name must be at least 2 characters');
      return;
    }

    onConfirmCharacter({
      ...character,
      name: character.name.trim(),
      createdAt: new Date().toLocaleTimeString(),
    });
  };

  const isFormValid = character.name.trim().length >= 2;

  return (
    <div className="w-full max-w-4xl mx-auto my-auto relative z-10 px-2 sm:px-4 py-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171424] border-2 border-[#3b3456] text-slate-300 hover:text-white text-xs font-pixel rounded-none transition-colors shadow-[2px_2px_0_0_#000] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <ArrowLeft size={13} />
          <span>Back to Login</span>
        </button>

        <div className="flex items-center gap-2">
          <RpgBadge variant="player" size="sm" icon={<PixelSparkle size={10} />}>
            Step 2: Character Creation
          </RpgBadge>
          <button
            type="button"
            onClick={handleRandomize}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-950/80 hover:bg-amber-900 border-2 border-amber-500 text-amber-200 text-xs font-semibold rounded-none transition-all shadow-[2px_2px_0_0_#000] active:translate-y-0.5"
            title="Randomize Appearance"
          >
            <Wand2 size={13} />
            <span className="hidden sm:inline">Randomize</span>
          </button>
        </div>
      </div>

      {/* Main Creation Card */}
      <RpgCard theme="player" className="shadow-2xl">
        <form onSubmit={handleCreateSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT COLUMN: LIVE PREVIEW & CHARACTER NAME */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-[#12101e] border-2 border-[#2e2848] rounded-none">
              <div className="w-full mb-3 flex items-center justify-between border-b border-[#28223f] pb-2">
                <span className="text-[10px] font-pixel text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={12} className="text-emerald-400" />
                  <span>Live Hero Preview</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-pixel">2D RPG</span>
              </div>

              {/* Live Animated 2D Character Sprite */}
              <CharacterPreview profile={character} size="lg" />

              {/* Character Name Input */}
              <div className="w-full mt-4 pt-3 border-t border-[#28223f]">
                <RpgInput
                  id="character-name-input"
                  name="characterName"
                  label="1. Character Name"
                  placeholder="e.g. Robin, Lyra, Kael..."
                  value={character.name}
                  maxLength={16}
                  onChange={(e) => handleNameChange(e.target.value)}
                  error={nameError}
                  helperText={`${character.name.length}/16 characters`}
                  roleTheme="player"
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* RIGHT COLUMN: CUSTOMIZATION CONTROLS */}
            <div className="lg:col-span-7 space-y-5">
              {/* Category Tab Selector */}
              <div className="flex border-b-2 border-[#2f2849] gap-2 pb-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('appearance')}
                  className={`px-3 py-2 text-xs font-pixel uppercase tracking-wider transition-all border-b-2 -mb-[6px] ${
                    activeTab === 'appearance'
                      ? 'text-emerald-300 border-emerald-400 font-bold'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  👤 Body & Hair
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('outfit')}
                  className={`px-3 py-2 text-xs font-pixel uppercase tracking-wider transition-all border-b-2 -mb-[6px] ${
                    activeTab === 'outfit'
                      ? 'text-emerald-300 border-emerald-400 font-bold'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  🛡️ Outfit & Colors
                </button>
              </div>

              {/* TAB 1: APPEARANCE (Gender, Skin Tone, Hair Style, Hair Color) */}
              {activeTab === 'appearance' && (
                <div className="space-y-5 animate-fadeIn">
                  {/* 2. GENDER SELECTOR */}
                  <div>
                    <label className="block text-[10px] font-pixel text-slate-300 uppercase tracking-wider mb-2">
                      2. Gender
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleGenderChange('male')}
                        className={`p-3 text-left border-2 transition-all flex items-center gap-3 ${
                          character.gender === 'male'
                            ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-[2px_2px_0_0_#064e3b]'
                            : 'bg-[#141220] border-[#312a4f] text-slate-400 hover:text-slate-200 hover:bg-[#1b182b]'
                        }`}
                      >
                        <span className="text-xl">♂️</span>
                        <div>
                          <p className="text-xs font-bold font-pixel">Male</p>
                          <p className="text-[10px] text-slate-400">Classic Adventurer Frame</p>
                        </div>
                        {character.gender === 'male' && <Check size={14} className="ml-auto text-emerald-400" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleGenderChange('female')}
                        className={`p-3 text-left border-2 transition-all flex items-center gap-3 ${
                          character.gender === 'female'
                            ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-[2px_2px_0_0_#064e3b]'
                            : 'bg-[#141220] border-[#312a4f] text-slate-400 hover:text-slate-200 hover:bg-[#1b182b]'
                        }`}
                      >
                        <span className="text-xl">♀️</span>
                        <div>
                          <p className="text-xs font-bold font-pixel">Female</p>
                          <p className="text-[10px] text-slate-400">Heroic Adventurer Frame</p>
                        </div>
                        {character.gender === 'female' && <Check size={14} className="ml-auto text-emerald-400" />}
                      </button>
                    </div>
                  </div>

                  {/* 3. SKIN TONE SELECTOR */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-pixel text-slate-300 uppercase tracking-wider">
                        3. Skin Tone
                      </label>
                      <span className="text-[11px] text-emerald-400 capitalize font-medium">
                        {SKIN_TONES.find((s) => s.id === character.skinToneId)?.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {SKIN_TONES.map((tone) => (
                        <button
                          key={tone.id}
                          type="button"
                          onClick={() => setCharacter({ ...character, skinToneId: tone.id })}
                          className={`group relative p-1.5 border-2 rounded-none transition-all flex flex-col items-center gap-1 ${
                            character.skinToneId === tone.id
                              ? 'border-emerald-400 bg-emerald-950/50 shadow-[2px_2px_0_0_#064e3b]'
                              : 'border-[#312a4f] bg-[#141220] hover:border-slate-500'
                          }`}
                          title={tone.label}
                        >
                          <span
                            className="w-full h-8 rounded-none border border-black/30 block shadow-inner"
                            style={{ backgroundColor: tone.baseHex }}
                          />
                          <span className="text-[9px] text-slate-400 truncate w-full text-center">
                            {tone.label.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. HAIR STYLE SELECTOR */}
                  <div>
                    <label className="block text-[10px] font-pixel text-slate-300 uppercase tracking-wider mb-2">
                      4. Hairstyle
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {HAIR_STYLES.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setCharacter({ ...character, hairStyleId: style.id as HairStyleOption['id'] })}
                          className={`p-2 border-2 text-center transition-all ${
                            character.hairStyleId === style.id
                              ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-[2px_2px_0_0_#064e3b]'
                              : 'bg-[#141220] border-[#312a4f] text-slate-400 hover:text-slate-200 hover:bg-[#1b182b]'
                          }`}
                        >
                          <span className="text-lg block mb-1">{style.icon}</span>
                          <span className="text-[10px] font-medium block leading-tight">
                            {style.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5. HAIR COLOR SELECTOR */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-pixel text-slate-300 uppercase tracking-wider">
                        5. Hair Color
                      </label>
                      <span className="text-[11px] text-emerald-400 capitalize font-medium">
                        {HAIR_COLORS.find((h) => h.id === character.hairColorId)?.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {HAIR_COLORS.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setCharacter({ ...character, hairColorId: color.id })}
                          className={`p-1.5 border-2 transition-all flex flex-col items-center gap-1 ${
                            character.hairColorId === color.id
                              ? 'border-emerald-400 bg-emerald-950/60 shadow-[2px_2px_0_0_#064e3b]'
                              : 'border-[#312a4f] bg-[#141220] hover:border-slate-500'
                          }`}
                          title={color.label}
                        >
                          <span
                            className="w-full h-7 rounded-none border border-black/40 block"
                            style={{ backgroundColor: color.baseHex }}
                          />
                          <span className="text-[9px] text-slate-400 truncate w-full text-center">
                            {color.label.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: OUTFIT (Style & Color) */}
              {activeTab === 'outfit' && (
                <div className="space-y-5 animate-fadeIn">
                  {/* 6. DRESS / OUTFIT SELECTOR */}
                  <div>
                    <label className="block text-[10px] font-pixel text-slate-300 uppercase tracking-wider mb-2">
                      6. Dress / Outfit Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {OUTFIT_STYLES.map((outfit) => (
                        <button
                          key={outfit.id}
                          type="button"
                          onClick={() => setCharacter({ ...character, outfitStyleId: outfit.id as OutfitStyleOption['id'] })}
                          className={`p-3 text-left border-2 transition-all relative ${
                            character.outfitStyleId === outfit.id
                              ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-[2px_2px_0_0_#064e3b]'
                              : 'bg-[#141220] border-[#312a4f] text-slate-400 hover:text-slate-200 hover:bg-[#1b182b]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold font-pixel text-slate-100">{outfit.label}</span>
                            <span className="text-[9px] font-pixel uppercase px-1.5 py-0.5 bg-black/40 border border-slate-700 text-amber-300">
                              {outfit.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-snug">{outfit.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 7. OUTFIT COLOR SELECTOR */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-pixel text-slate-300 uppercase tracking-wider">
                        7. Outfit Primary Color
                      </label>
                      <span className="text-[11px] text-emerald-400 capitalize font-medium">
                        {OUTFIT_COLORS.find((o) => o.id === character.outfitColorId)?.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {OUTFIT_COLORS.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setCharacter({ ...character, outfitColorId: color.id })}
                          className={`p-1.5 border-2 transition-all flex flex-col items-center gap-1 ${
                            character.outfitColorId === color.id
                              ? 'border-emerald-400 bg-emerald-950/60 shadow-[2px_2px_0_0_#064e3b]'
                              : 'border-[#312a4f] bg-[#141220] hover:border-slate-500'
                          }`}
                          title={color.label}
                        >
                          <span
                            className="w-full h-8 rounded-none border border-black/40 block shadow-inner"
                            style={{ backgroundColor: color.primaryHex }}
                          />
                          <span className="text-[9px] text-slate-400 truncate w-full text-center">
                            {color.label.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 8. CONFIRM CHARACTER SUBMIT BUTTON */}
              <div className="pt-3 border-t border-[#2a2442]">
                <RpgButton
                  type="submit"
                  variant="player"
                  size="lg"
                  fullWidth
                  disabled={!isFormValid}
                  icon={<PixelSword size={18} className="text-slate-950" />}
                >
                  Create Character
                </RpgButton>

                {!isFormValid && (
                  <p className="text-[11px] text-amber-400/90 text-center mt-2 font-medium">
                    ⚠️ Please enter a character name (at least 2 letters) to create your hero.
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </RpgCard>
    </div>
  );
};
