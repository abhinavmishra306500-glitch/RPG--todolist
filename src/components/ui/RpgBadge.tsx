import React from 'react';

interface RpgBadgeProps {
  children: React.ReactNode;
  variant?: 'player' | 'dev' | 'neutral' | 'accent' | 'gold' | 'epic' | 'info' | 'success';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const RpgBadge: React.FC<RpgBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    player: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    dev: 'bg-amber-950/80 text-amber-300 border-amber-500/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    neutral: 'bg-slate-900/80 text-slate-300 border-slate-700',
    accent: 'bg-purple-950/80 text-purple-300 border-purple-500/60',
    gold: 'bg-amber-950/90 text-yellow-300 border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)]',
    epic: 'bg-purple-950/90 text-purple-300 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]',
    info: 'bg-blue-950/90 text-blue-300 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
    success: 'bg-emerald-950/90 text-emerald-300 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider gap-1.5',
    md: 'text-xs px-2.5 py-1 tracking-wide gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-pixel uppercase border-2 select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{
        boxShadow: '2px 2px 0 0 rgba(0,0,0,0.6)',
      }}
    >
      {icon && <span className="inline-block">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
