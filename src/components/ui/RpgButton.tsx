import React from 'react';

interface RpgButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'player' | 'dev' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const RpgButton: React.FC<RpgButtonProps> = ({
  children,
  variant = 'player',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-bold transition-all select-none border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none rpg-btn-active';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2.5',
    lg: 'text-base px-6 py-3.5 gap-3',
  };

  const variantStyles = {
    player:
      'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-300 font-semibold shadow-[4px_4px_0_0_#064e3b] hover:shadow-[5px_5px_0_0_#064e3b] focus-visible:ring-emerald-400',
    dev:
      'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300 font-semibold shadow-[4px_4px_0_0_#78350f] hover:shadow-[5px_5px_0_0_#78350f] focus-visible:ring-amber-400',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600 shadow-[4px_4px_0_0_#0f172a] hover:shadow-[5px_5px_0_0_#0f172a] focus-visible:ring-slate-400',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 border-transparent hover:border-slate-700 shadow-none focus-visible:ring-slate-400',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Decorative top-highlight line for 2D cartridge look */}
      <span className="absolute inset-x-0 top-0 h-[1.5px] bg-white/30 pointer-events-none" />

      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
