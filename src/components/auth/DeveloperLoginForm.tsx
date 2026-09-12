import React, { useState } from 'react';
import { Terminal, KeyRound, ShieldAlert } from 'lucide-react';
import { RpgInput } from '../ui/RpgInput';
import { RpgButton } from '../ui/RpgButton';
import { RpgBadge } from '../ui/RpgBadge';
import { PixelWrench } from '../common/PixelIcons';
import type { LoginFormData } from '../../types/auth';

interface DeveloperLoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export const DeveloperLoginForm: React.FC<DeveloperLoginFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { identifier?: string; password?: string } = {};
    if (!identifier.trim()) {
      newErrors.identifier = 'Developer ID or authorized email is required';
    }
    if (!password) {
      newErrors.password = 'Developer master key / passcode is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ identifier: identifier.trim(), password });
  };

  return (
    <div id="panel-developer" role="tabpanel" aria-labelledby="tab-developer" className="space-y-5">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-2 border-b border-[#2d284a]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="text-amber-400">🛠️</span>
              <span>Developer Portal</span>
            </h2>
            <RpgBadge variant="dev" size="sm">
              Admin & Debug Mode
            </RpgBadge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Full sandbox testing: all maps, levels, pets, magic & locked content.
          </p>
        </div>
      </div>

      {/* Developer Notice Badge */}
      <div
        className="p-3 bg-amber-950/40 border-2 border-amber-500/50 text-amber-200 text-xs flex items-start gap-2.5"
        style={{ boxShadow: '3px 3px 0 0 rgba(0,0,0,0.5)' }}
      >
        <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-300">Developer / Admin Access</p>
          <p className="text-[11px] text-amber-200/80 leading-relaxed">
            Step 1 frontend mock interface. In future layers, secure server-side role validation will grant developer privileges to test game systems and locked assets.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <RpgInput
          id="dev-identifier"
          name="identifier"
          label="Developer ID or Admin Email"
          placeholder="admin@liferpg.dev or dev_hero"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (errors.identifier) setErrors({ ...errors, identifier: undefined });
          }}
          icon={<Terminal size={16} />}
          error={errors.identifier}
          roleTheme="dev"
          autoComplete="username"
          required
        />

        <RpgInput
          id="dev-password"
          name="password"
          type="password"
          label="Developer Key / Passcode"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          icon={<KeyRound size={16} />}
          error={errors.password}
          roleTheme="dev"
          autoComplete="current-password"
          required
        />

        {/* Submit Button */}
        <div className="pt-2">
          <RpgButton
            type="submit"
            variant="dev"
            size="lg"
            fullWidth
            isLoading={isLoading}
            icon={<PixelWrench size={18} className="text-slate-950" />}
          >
            Enter Developer Console
          </RpgButton>
        </div>

        {/* Note: NO signup link for Developer Login */}
        <div className="text-center pt-2 border-t border-[#25213b]">
          <p className="text-[11px] text-slate-500 font-mono">
            Elevated privileges are restricted to verified contributors.
          </p>
        </div>
      </form>
    </div>
  );
};
