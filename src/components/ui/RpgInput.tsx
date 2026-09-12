import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface RpgInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
  roleTheme?: 'player' | 'dev';
}

export const RpgInput: React.FC<RpgInputProps> = ({
  id,
  label,
  subLabel,
  icon,
  error,
  helperText,
  roleTheme = 'player',
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const focusBorder =
    roleTheme === 'player'
      ? 'focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
      : 'focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20';

  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-pixel"
          style={{ fontSize: '10px' }}
        >
          {label}
        </label>
        {subLabel && (
          <span className="text-[11px] text-slate-400 select-none">
            {subLabel}
          </span>
        )}
      </div>

      <div className="relative rounded">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          type={effectiveType}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={`
            w-full bg-[#12101e] text-slate-100 placeholder:text-slate-500
            border-2 ${error ? 'border-red-500' : 'border-[#2d284a]'}
            ${focusBorder}
            rounded-none
            py-2.5 text-sm transition-all duration-150 outline-none
            ${icon ? 'pl-10' : 'pl-3.5'}
            ${isPassword ? 'pr-11' : 'pr-3.5'}
            shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus-visible:text-emerald-400"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={0}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium" role="alert">
          <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full" />
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${id}-helper`} className="text-[11px] text-slate-400 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};
