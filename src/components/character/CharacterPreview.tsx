import React from 'react';
import type { CharacterProfile } from '../../types/character';
import type { PlayerLeague } from '../../types/progression';
import {
  SKIN_TONES,
  HAIR_COLORS,
  OUTFIT_COLORS,
} from '../../types/character';
import { PixelSparkle } from '../common/PixelIcons';
import { LeagueShieldSvg, getShieldMetadata } from './LeagueShield';

interface CharacterPreviewProps {
  profile: CharacterProfile;
  league?: Partial<PlayerLeague> | null;
  size?: 'md' | 'lg';
  showShieldBadge?: boolean;
  isAuraActive?: boolean;
}

export const CharacterPreview: React.FC<CharacterPreviewProps> = ({
  profile,
  league,
  size = 'lg',
  showShieldBadge = true,
  isAuraActive = false,
}) => {
  const skin = SKIN_TONES.find((s) => s.id === profile.skinToneId) || SKIN_TONES[0];
  const hair = HAIR_COLORS.find((h) => h.id === profile.hairColorId) || HAIR_COLORS[0];
  const outfit = OUTFIT_COLORS.find((o) => o.id === profile.outfitColorId) || OUTFIT_COLORS[0];
  const shieldMeta = showShieldBadge ? getShieldMetadata(league) : null;
  const tier = league?.tier || 'Bronze';

  const dimensions = size === 'lg' ? 'w-56 h-68 sm:w-64 sm:h-76' : 'w-40 h-48 sm:w-48 sm:h-56';

  // League-specific aura color configuration
  const auraConfig = (() => {
    switch (tier) {
      case 'Silver':
        return {
          glow: 'rgba(56, 189, 248, 0.9)',
          ringBorder: 'border-cyan-300',
          bgGradient: 'from-cyan-500/60 via-sky-400/30 to-transparent',
          rayColor: '#38bdf8',
          moteColor: 'text-cyan-200',
        };
      case 'Gold':
        return {
          glow: 'rgba(234, 179, 8, 0.95)',
          ringBorder: 'border-yellow-300',
          bgGradient: 'from-yellow-500/70 via-amber-400/40 to-transparent',
          rayColor: '#fde047',
          moteColor: 'text-yellow-200',
        };
      case 'Diamond':
        return {
          glow: 'rgba(6, 182, 212, 0.95)',
          ringBorder: 'border-cyan-400',
          bgGradient: 'from-cyan-400/70 via-teal-300/40 to-transparent',
          rayColor: '#67e8f9',
          moteColor: 'text-cyan-100',
        };
      case 'Mythical':
        return {
          glow: 'rgba(168, 85, 247, 0.95)',
          ringBorder: 'border-fuchsia-400',
          bgGradient: 'from-purple-600/80 via-fuchsia-500/40 to-transparent',
          rayColor: '#e879f9',
          moteColor: 'text-purple-200',
        };
      default: // Bronze
        return {
          glow: 'rgba(245, 158, 11, 0.9)',
          ringBorder: 'border-amber-400',
          bgGradient: 'from-amber-600/70 via-yellow-500/40 to-transparent',
          rayColor: '#f59e0b',
          moteColor: 'text-amber-300',
        };
    }
  })();

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* --- 2-3 SEC RADIANT LEAGUE UP AURA BURST --- */}
      {isAuraActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {/* Main Expanding Energy Orb */}
          <div
            className={`absolute w-56 h-56 rounded-full bg-gradient-to-r ${auraConfig.bgGradient} filter blur-xl animate-league-aura-burst`}
            style={{ boxShadow: `0 0 50px ${auraConfig.glow}` }}
          />

          {/* Secondary Concentric Shockwave Rings */}
          <div
            className={`absolute w-44 h-44 rounded-full border-2 ${auraConfig.ringBorder} animate-league-shockwave`}
            style={{ boxShadow: `0 0 20px ${auraConfig.glow}` }}
          />
          <div
            className={`absolute w-36 h-36 rounded-full border ${auraConfig.ringBorder} animate-league-shockwave`}
            style={{ animationDelay: '0.4s', boxShadow: `0 0 15px ${auraConfig.glow}` }}
          />

          {/* Rising Starlight Energy Particles / Motes */}
          <div className={`absolute top-1/2 left-6 ${auraConfig.moteColor} animate-league-mote`}>
            <PixelSparkle size={16} />
          </div>
          <div className={`absolute top-1/2 right-6 ${auraConfig.moteColor} animate-league-mote`} style={{ animationDelay: '0.3s' }}>
            <PixelSparkle size={18} />
          </div>
          <div className={`absolute top-1/3 left-10 ${auraConfig.moteColor} animate-league-mote`} style={{ animationDelay: '0.6s' }}>
            <PixelSparkle size={14} />
          </div>
          <div className={`absolute top-1/3 right-10 ${auraConfig.moteColor} animate-league-mote`} style={{ animationDelay: '0.8s' }}>
            <PixelSparkle size={16} />
          </div>
        </div>
      )}

      {/* Ambient background aura glow */}
      <div
        className="absolute w-44 h-44 rounded-full filter blur-2xl opacity-35 transition-colors duration-500 pointer-events-none"
        style={{ backgroundColor: isAuraActive ? auraConfig.glow : outfit.primaryHex }}
      />

      {/* Floating Sparkles around character */}
      <div className="absolute top-4 left-4 text-amber-300/40 animate-sparkle pointer-events-none">
        <PixelSparkle size={16} />
      </div>
      <div className="absolute top-10 right-4 text-emerald-300/40 animate-sparkle pointer-events-none" style={{ animationDelay: '1.2s' }}>
        <PixelSparkle size={14} />
      </div>
      <div className="absolute bottom-12 left-6 text-purple-300/40 animate-sparkle pointer-events-none" style={{ animationDelay: '0.7s' }}>
        <PixelSparkle size={14} />
      </div>

      {/* Main SVG Character Container */}
      <div className={`relative z-10 ${dimensions} transition-all duration-300`}>
        <svg
          viewBox="0 0 100 120"
          width="100%"
          height="100%"
          className="animate-idle-breathe drop-shadow-[0_12px_10px_rgba(0,0,0,0.6)]"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* --- PEDESTAL & SHADOW --- */}
          {/* Stone Pedestal Platform */}
          <ellipse cx="50" cy="110" rx="42" ry="9" fill="#181528" />
          <ellipse cx="50" cy="109" rx="38" ry="7" fill="#292244" />
          <ellipse cx="50" cy="108" rx="36" ry="6" fill="#1b172f" />
          {/* Character Ground Shadow */}
          <ellipse cx="50" cy="105" rx="22" ry="5" fill="#0b0a13" opacity="0.8" />

          {/* --- LEGS & BOOTS --- */}
          {/* Boots */}
          <rect x="36" y="94" width="11" height="9" fill="#4a3728" />
          <rect x="53" y="94" width="11" height="9" fill="#4a3728" />
          {/* Boot Soles */}
          <rect x="34" y="101" width="14" height="4" fill="#2b1e16" />
          <rect x="52" y="101" width="14" height="4" fill="#2b1e16" />
          {/* Boot Buckles */}
          <rect x="39" y="97" width="5" height="2" fill="#d4af37" />
          <rect x="56" y="97" width="5" height="2" fill="#d4af37" />

          {/* Trousers / Legs */}
          <rect x="38" y="82" width="9" height="13" fill="#2c2a38" />
          <rect x="53" y="82" width="9" height="13" fill="#2c2a38" />

          {/* --- BODY BASE & ARMS --- */}
          {/* Neck */}
          <rect x="46" y="47" width="8" height="6" fill={skin.shadowHex} />

          {/* Torso Base / Skin */}
          <rect x="41" y="49" width="18" height="9" fill={skin.baseHex} />

          {/* Arms (Skin under sleeves) */}
          <rect x="29" y="58" width="6" height="18" fill={skin.baseHex} />
          <rect x="65" y="58" width="6" height="18" fill={skin.baseHex} />
          {/* Hands */}
          <rect x="28" y="74" width="8" height="7" fill={skin.baseHex} />
          <rect x="64" y="74" width="8" height="7" fill={skin.baseHex} />
          <rect x="29" y="78" width="6" height="3" fill={skin.shadowHex} />
          <rect x="65" y="78" width="6" height="3" fill={skin.shadowHex} />

          {/* --- OUTFIT LAYER --- */}
          {/* Outfit Style: ADVENTURER TUNIC */}
          {profile.outfitStyleId === 'adventurer' && (
            <g>
              {/* Shoulders / Sleeves */}
              <rect x="31" y="53" width="9" height="12" fill={outfit.primaryHex} />
              <rect x="60" y="53" width="9" height="12" fill={outfit.primaryHex} />
              <rect x="31" y="63" width="9" height="3" fill={outfit.accentHex} />
              <rect x="60" y="63" width="9" height="3" fill={outfit.accentHex} />

              {/* Main Tunic */}
              <rect x="37" y="52" width="26" height="26" fill={outfit.primaryHex} />
              <rect x="39" y="52" width="22" height="4" fill={outfit.accentHex} />
              {/* Tunic Lapels */}
              <polygon points="43,52 50,62 47,52" fill={outfit.shadowHex} />
              <polygon points="57,52 50,62 53,52" fill={outfit.shadowHex} />

              {/* Belt & Buckle */}
              <rect x="36" y="72" width="28" height="5" fill="#52321b" />
              <rect x="46" y="71" width="8" height="7" fill="#fbbf24" />
              <rect x="48" y="73" width="4" height="3" fill="#92400e" />

              {/* Tunic Skirt hem */}
              <rect x="36" y="77" width="28" height="5" fill={outfit.primaryHex} />
              <rect x="38" y="80" width="24" height="2" fill={outfit.shadowHex} />
            </g>
          )}

          {/* Outfit Style: APPRENTICE CLOAK */}
          {profile.outfitStyleId === 'apprentice' && (
            <g>
              {/* Sleeves */}
              <rect x="29" y="54" width="11" height="14" fill={outfit.primaryHex} />
              <rect x="60" y="54" width="11" height="14" fill={outfit.primaryHex} />
              <rect x="29" y="66" width="11" height="3" fill="#f8fafc" />
              <rect x="60" y="66" width="11" height="3" fill="#f8fafc" />

              {/* Vestment / Robe Body */}
              <rect x="36" y="52" width="28" height="28" fill={outfit.primaryHex} />
              {/* Warm Woolen Scarf/Cowl */}
              <rect x="38" y="50" width="24" height="8" rx="2" fill="#f8fafc" />
              <rect x="44" y="56" width="12" height="7" fill="#e2e8f0" />

              {/* Waist Sash */}
              <rect x="37" y="70" width="26" height="5" fill="#64748b" />
              <rect x="42" y="73" width="4" height="9" fill="#64748b" />

              {/* Robe hem */}
              <rect x="35" y="78" width="30" height="5" fill={outfit.primaryHex} />
              <rect x="35" y="82" width="30" height="2" fill="#f8fafc" />
            </g>
          )}

          {/* Outfit Style: WARRIOR CUIRASS */}
          {profile.outfitStyleId === 'warrior' && (
            <g>
              {/* Heavy Shoulder Pauldrons */}
              <rect x="28" y="51" width="12" height="10" rx="2" fill="#94a3b8" />
              <rect x="30" y="53" width="8" height="6" fill="#cbd5e1" />
              <rect x="60" y="51" width="12" height="10" rx="2" fill="#94a3b8" />
              <rect x="62" y="53" width="8" height="6" fill="#cbd5e1" />

              {/* Arm guards */}
              <rect x="31" y="61" width="8" height="8" fill={outfit.primaryHex} />
              <rect x="61" y="61" width="8" height="8" fill={outfit.primaryHex} />

              {/* Steel Breastplate */}
              <rect x="37" y="52" width="26" height="20" fill="#64748b" />
              <rect x="39" y="54" width="22" height="16" fill="#94a3b8" />
              {/* Emblazoned Crest on chest */}
              <polygon points="50,56 55,62 50,68 45,62" fill={outfit.primaryHex} />
              <polygon points="50,58 53,62 50,66 47,62" fill={outfit.accentHex} />

              {/* Plated Faulds / Skirt */}
              <rect x="36" y="72" width="28" height="5" fill="#475569" />
              <rect x="38" y="77" width="8" height="6" fill="#64748b" />
              <rect x="46" y="77" width="8" height="7" fill="#94a3b8" />
              <rect x="54" y="77" width="8" height="6" fill="#64748b" />
            </g>
          )}

          {/* Outfit Style: MAGE SPELLCOAT */}
          {profile.outfitStyleId === 'mage' && (
            <g>
              {/* Wide flared sleeves */}
              <polygon points="31,54 40,54 36,70 27,68" fill={outfit.primaryHex} />
              <polygon points="69,54 60,54 64,70 73,68" fill={outfit.primaryHex} />
              <rect x="27" y="66" width="10" height="3" fill="#facc15" />
              <rect x="63" y="66" width="10" height="3" fill="#facc15" />

              {/* High Stand-up Arcane Collar */}
              <polygon points="36,44 42,54 38,54" fill={outfit.shadowHex} />
              <polygon points="64,44 58,54 62,54" fill={outfit.shadowHex} />

              {/* Robe Body */}
              <rect x="38" y="52" width="24" height="28" fill={outfit.primaryHex} />
              {/* Golden Runic Stole */}
              <rect x="46" y="52" width="8" height="28" fill={outfit.shadowHex} />
              <rect x="48" y="54" width="4" height="24" fill="#facc15" />

              {/* Arcane Gem Brooch at throat */}
              <circle cx="50" cy="54" r="3.5" fill="#38bdf8" />
              <circle cx="50" cy="54" r="1.5" fill="#ffffff" />

              {/* Flowing Coat tails */}
              <rect x="36" y="78" width="28" height="5" fill={outfit.primaryHex} />
              <rect x="36" y="81" width="28" height="2" fill="#facc15" />
            </g>
          )}

          {/* --- HEAD & FACE --- */}
          {/* Head Base */}
          <rect x="37" y="24" width="26" height="24" rx="3" fill={skin.baseHex} />
          {/* Jaw / Chin */}
          <rect x="40" y="44" width="20" height="4" fill={skin.baseHex} />
          <rect x="43" y="47" width="14" height="2" fill={skin.shadowHex} />

          {/* Ears */}
          <rect x="34" y="32" width="3" height="7" rx="1" fill={skin.baseHex} />
          <rect x="63" y="32" width="3" height="7" rx="1" fill={skin.baseHex} />

          {/* Cheeks / Blush */}
          <rect x="39" y="37" width="4" height="3" rx="1" fill={skin.blushHex} opacity="0.85" />
          <rect x="57" y="37" width="4" height="3" rx="1" fill={skin.blushHex} opacity="0.85" />

          {/* Eyes */}
          <rect x="41" y="31" width="4" height="6" rx="1" fill="#1e1e24" />
          <rect x="55" y="31" width="4" height="6" rx="1" fill="#1e1e24" />
          {/* Eye Sparkle Catchlights */}
          <rect x="41" y="31" width="2" height="2" fill="#ffffff" />
          <rect x="55" y="31" width="2" height="2" fill="#ffffff" />
          {/* Eyelash detail for female */}
          {profile.gender === 'female' && (
            <>
              <rect x="40" y="29" width="6" height="2" fill="#1e1e24" />
              <rect x="54" y="29" width="6" height="2" fill="#1e1e24" />
              <rect x="39" y="30" width="2" height="2" fill="#1e1e24" />
              <rect x="59" y="30" width="2" height="2" fill="#1e1e24" />
            </>
          )}

          {/* Cute Smile */}
          <rect x="48" y="41" width="4" height="2" fill="#9c5b33" />
          <rect x="47" y="40" width="1" height="2" fill="#9c5b33" />
          <rect x="52" y="40" width="1" height="2" fill="#9c5b33" />

          {/* --- HAIRSTYLE LAYER --- */}
          {/* Hair Style 1: SPIKY ADVENTURER */}
          {profile.hairStyleId === 'spiky' && (
            <g>
              {/* Back spikes */}
              <polygon points="34,16 42,24 32,26" fill={hair.baseHex} />
              <polygon points="66,16 58,24 68,26" fill={hair.baseHex} />
              {/* Crown Spikes */}
              <polygon points="40,11 48,22 36,22" fill={hair.baseHex} />
              <polygon points="50,8 57,22 45,22" fill={hair.baseHex} />
              <polygon points="60,11 65,22 53,22" fill={hair.baseHex} />
              {/* Forehead hair bangs */}
              <rect x="36" y="20" width="28" height="7" fill={hair.baseHex} />
              <polygon points="40,27 44,32 46,27" fill={hair.baseHex} />
              <polygon points="49,27 53,33 55,27" fill={hair.baseHex} />
              {/* Highlights */}
              <rect x="42" y="14" width="16" height="3" fill={hair.highlightHex} />
              <rect x="46" y="11" width="8" height="3" fill={hair.highlightHex} />
              {/* Sideburns */}
              <rect x="35" y="25" width="4" height="10" fill={hair.baseHex} />
              <rect x="61" y="25" width="4" height="10" fill={hair.baseHex} />
            </g>
          )}

          {/* Hair Style 2: CLASSIC SIDE-PART */}
          {profile.hairStyleId === 'classic' && (
            <g>
              {/* Full Rounded Crown */}
              <rect x="34" y="15" width="32" height="11" rx="3" fill={hair.baseHex} />
              <rect x="36" y="13" width="28" height="5" rx="2" fill={hair.baseHex} />
              {/* Side Part Swoop */}
              <polygon points="34,22 56,22 46,31" fill={hair.baseHex} />
              <polygon points="54,22 66,22 64,28" fill={hair.baseHex} />
              {/* Sideburns & Ear Frame */}
              <rect x="34" y="24" width="4" height="11" fill={hair.baseHex} />
              <rect x="62" y="24" width="4" height="9" fill={hair.baseHex} />
              {/* Gloss Highlights */}
              <rect x="42" y="16" width="16" height="3" fill={hair.highlightHex} />
            </g>
          )}

          {/* Hair Style 3: FLOWING LOCKS */}
          {profile.hairStyleId === 'flowing' && (
            <g>
              {/* Behind Shoulders cascading hair */}
              <rect x="30" y="26" width="8" height="34" rx="2" fill={hair.baseHex} />
              <rect x="62" y="26" width="8" height="34" rx="2" fill={hair.baseHex} />
              <rect x="29" y="44" width="6" height="20" fill={hair.highlightHex} />
              <rect x="65" y="44" width="6" height="20" fill={hair.highlightHex} />

              {/* Top Hair Crown */}
              <rect x="34" y="14" width="32" height="12" rx="3" fill={hair.baseHex} />
              {/* Front Bangs Framing Face */}
              <rect x="34" y="24" width="6" height="14" fill={hair.baseHex} />
              <rect x="60" y="24" width="6" height="14" fill={hair.baseHex} />
              <polygon points="38,24 50,29 44,24" fill={hair.baseHex} />
              <polygon points="62,24 50,29 56,24" fill={hair.baseHex} />
              {/* Highlights */}
              <rect x="40" y="16" width="20" height="3" fill={hair.highlightHex} />
            </g>
          )}

          {/* Hair Style 4: HIGH PONYTAIL */}
          {profile.hairStyleId === 'ponytail' && (
            <g>
              {/* Ponytail plume on top-back */}
              <polygon points="56,12 70,2 66,22" fill={hair.baseHex} />
              <polygon points="62,6 74,4 70,18" fill={hair.baseHex} />
              <polygon points="68,8 78,10 74,22" fill={hair.highlightHex} />
              {/* Cute Hair Tie Ribbon */}
              <circle cx="58" cy="14" r="3.5" fill="#f43f5e" />
              <circle cx="58" cy="14" r="1.5" fill="#fecdd3" />

              {/* Front Crown & Bangs */}
              <rect x="34" y="16" width="30" height="11" rx="2" fill={hair.baseHex} />
              <rect x="37" y="25" width="7" height="6" fill={hair.baseHex} />
              <rect x="56" y="25" width="7" height="6" fill={hair.baseHex} />
              {/* Side Tendrils */}
              <rect x="34" y="24" width="3" height="12" fill={hair.baseHex} />
              <rect x="63" y="24" width="3" height="12" fill={hair.baseHex} />
              {/* Highlight */}
              <rect x="42" y="17" width="14" height="3" fill={hair.highlightHex} />
            </g>
          )}

          {/* Hair Style 5: CURLY CROP */}
          {profile.hairStyleId === 'curly' && (
            <g>
              {/* Textured Bubble Curls */}
              <circle cx="37" cy="18" r="6" fill={hair.baseHex} />
              <circle cx="44" cy="14" r="7" fill={hair.baseHex} />
              <circle cx="53" cy="13" r="7" fill={hair.baseHex} />
              <circle cx="61" cy="16" r="6" fill={hair.baseHex} />
              <circle cx="65" cy="22" r="5" fill={hair.baseHex} />
              <circle cx="34" cy="24" r="5" fill={hair.baseHex} />

              {/* Forehead curl ringlets */}
              <circle cx="41" cy="24" r="4" fill={hair.baseHex} />
              <circle cx="48" cy="23" r="4.5" fill={hair.baseHex} />
              <circle cx="56" cy="24" r="4" fill={hair.baseHex} />

              {/* Highlights on Curls */}
              <circle cx="44" cy="13" r="3" fill={hair.highlightHex} />
              <circle cx="53" cy="12" r="3" fill={hair.highlightHex} />
              <circle cx="48" cy="22" r="2" fill={hair.highlightHex} />
            </g>
          )}

          {/* --- LEAGUE SHIELD ATTACHED TO CHARACTER HAND --- */}
          <LeagueShieldSvg league={league} />
        </svg>
      </div>

      {/* Nameplate tag beneath character preview */}
      <div className="mt-3 text-center w-full max-w-full flex justify-center px-2">
        <div className="inline-flex flex-col items-center max-w-[200px] sm:max-w-[240px] w-full px-3 py-1.5 bg-[#12101e] border-2 border-[#3b355a] rounded shadow-[2px_2px_0_0_#000] overflow-hidden">
          <p
            className="text-[11px] sm:text-xs font-pixel text-amber-300 tracking-wider truncate w-full text-center block"
            title={profile.name.trim() || 'HERO OF LIFE'}
          >
            {profile.name.trim() || 'HERO OF LIFE'}
          </p>
          <p className="text-[10px] text-slate-400 font-sans capitalize mt-0.5 truncate w-full text-center block">
            {profile.gender} • {profile.outfitStyleId}
          </p>
          {shieldMeta && (
            <div
              className="mt-1 flex items-center justify-center gap-1 text-[9px] font-pixel text-amber-300/90 border-t border-[#2e2848] pt-1 w-full truncate"
              title={`${shieldMeta.name}: ${shieldMeta.description}`}
            >
              <span>🛡️</span>
              <span className="truncate">{shieldMeta.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
