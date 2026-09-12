import React from 'react';

interface RpgCardProps {
  children: React.ReactNode;
  theme?: 'player' | 'dev';
  className?: string;
  headerSlot?: React.ReactNode;
}

export const RpgCard: React.FC<RpgCardProps> = ({
  children,
  theme = 'player',
  className = '',
  headerSlot,
}) => {
  const glowStyle =
    theme === 'player'
      ? 'shadow-[0_0_35px_rgba(16,185,129,0.18)] border-[#2f3f45]'
      : 'shadow-[0_0_35px_rgba(245,158,11,0.18)] border-[#4d3b2b]';

  const cornerColor = theme === 'player' ? 'bg-emerald-400' : 'bg-amber-400';

  return (
    <div
      className={`
        relative bg-[#191629] border-4 ${glowStyle}
        p-6 sm:p-8 transition-colors duration-300
        ${className}
      `}
      style={{
        boxShadow:
          theme === 'player'
            ? '6px 6px 0 0 rgba(0,0,0,0.8), 0 0 30px rgba(16,185,129,0.15)'
            : '6px 6px 0 0 rgba(0,0,0,0.8), 0 0 30px rgba(245,158,11,0.15)',
      }}
    >
      {/* 4 Pixel Corner Embellishments */}
      <span className={`absolute -top-1.5 -left-1.5 w-3 h-3 ${cornerColor} shadow-[1px_1px_0_#000]`} />
      <span className={`absolute -top-1.5 -right-1.5 w-3 h-3 ${cornerColor} shadow-[1px_1px_0_#000]`} />
      <span className={`absolute -bottom-1.5 -left-1.5 w-3 h-3 ${cornerColor} shadow-[1px_1px_0_#000]`} />
      <span className={`absolute -bottom-1.5 -right-1.5 w-3 h-3 ${cornerColor} shadow-[1px_1px_0_#000]`} />

      {/* Decorative Top Ridge */}
      <div className="absolute top-0 inset-x-0 h-1 bg-white/10 pointer-events-none" />

      {headerSlot && <div className="mb-6">{headerSlot}</div>}

      {children}
    </div>
  );
};
