import React, { useState } from 'react';
import { User, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { RpgInput } from '../ui/RpgInput';
import { RpgButton } from '../ui/RpgButton';
import { RpgBadge } from '../ui/RpgBadge';
import { PixelSword } from '../common/PixelIcons';
import type { LoginFormData } from '../../types/auth';

interface PlayerLoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export const PlayerLoginForm: React.FC<PlayerLoginFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupFeedback, setSignupFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { identifier?: string; password?: string } = {};
    if (!identifier.trim()) {
      newErrors.identifier = 'Please enter your adventurer name or email';
    }
    if (!password) {
      newErrors.password = 'Adventurer password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ identifier: identifier.trim(), password, rememberMe });
  };

  const handleToggleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSigningUp(!isSigningUp);
    setSignupFeedback(true);
    setTimeout(() => setSignupFeedback(false), 3500);
  };

  return (
    <div id="panel-player" role="tabpanel" aria-labelledby="tab-player" className="space-y-5">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-2 border-b border-[#2d284a]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="text-emerald-400">⚔️</span>
              <span>Player Portal</span>
            </h2>
            <RpgBadge variant="player" size="sm">
              Progression Mode
            </RpgBadge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Log in to continue your quests and level up your daily habits.
          </p>
        </div>
      </div>

      {signupFeedback && (
        <div
          role="status"
          className="p-3 bg-emerald-950/70 border-2 border-emerald-500/80 text-emerald-200 text-xs flex items-start gap-2.5 animate-fadeIn"
          style={{ boxShadow: '3px 3px 0 0 rgba(0,0,0,0.5)' }}
        >
          <Sparkles size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-300">
              {isSigningUp ? 'New Adventurer Registration' : 'Returning Adventurer Mode'}
            </p>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">
              Account creation flow will securely register your hero once the backend auth layer is connected!
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <RpgInput
          id="player-identifier"
          name="identifier"
          label="Adventurer Name or Email"
          placeholder="e.g. HeroOfDawn or hero@rpg.app"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (errors.identifier) setErrors({ ...errors, identifier: undefined });
          }}
          icon={<User size={16} />}
          error={errors.identifier}
          roleTheme="player"
          autoComplete="username"
          required
        />

        <RpgInput
          id="player-password"
          name="password"
          type="password"
          label="Secret Password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          icon={<Lock size={16} />}
          error={errors.password}
          roleTheme="player"
          autoComplete="current-password"
          required
        />

        {/* Remember Adventurer & Forgot Password options */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 hover:text-slate-100">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded-none bg-[#12101e] border-2 border-[#3b355a] text-emerald-500 focus:ring-emerald-400 focus:ring-offset-slate-900 focus:ring-1 cursor-pointer"
            />
            <span className="text-xs">Remember Adventurer</span>
          </label>

          <button
            type="button"
            onClick={() => alert('Password recovery will be available in future layers.')}
            className="text-emerald-400/80 hover:text-emerald-300 transition-colors text-xs hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
          >
            Forgot passcode?
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <RpgButton
            type="submit"
            variant="player"
            size="lg"
            fullWidth
            isLoading={isLoading}
            icon={<PixelSword size={18} className="text-slate-950" />}
          >
            {isSigningUp ? 'Create Account & Begin' : 'Begin Adventure'}
          </RpgButton>
        </div>

        {/* Don't have an account? Sign up */}
        <div className="text-center pt-2 border-t border-[#25213b]">
          <p className="text-xs text-slate-400">
            {isSigningUp ? 'Already have an adventurer account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={handleToggleSignUp}
              className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 inline-flex items-center gap-1 ml-1"
            >
              <span>{isSigningUp ? 'Log in instead' : 'Sign up'}</span>
              <ArrowRight size={13} />
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
