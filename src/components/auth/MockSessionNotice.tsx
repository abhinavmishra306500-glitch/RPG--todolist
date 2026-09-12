import React from 'react';
import type { AuthMockSession } from '../../types/auth';
import { RpgButton } from '../ui/RpgButton';
import { RpgBadge } from '../ui/RpgBadge';
import { PixelSword, PixelWrench, PixelSparkle } from '../common/PixelIcons';
import { CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

interface MockSessionNoticeProps {
  session: AuthMockSession;
  onReset: () => void;
}

export const MockSessionNotice: React.FC<MockSessionNoticeProps> = ({
  session,
  onReset,
}) => {
  const isPlayer = session.role === 'player';

  return (
    <div className="space-y-6 text-center animate-fadeIn">
      {/* Success Badge & Icon */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
            isPlayer
              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              : 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
          }`}
        >
          {isPlayer ? <PixelSword size={28} /> : <PixelWrench size={28} />}
        </div>

        <div>
          <div className="inline-block mb-1.5">
            <RpgBadge variant={isPlayer ? 'player' : 'dev'} size="md">
              {isPlayer ? 'ADVENTURER INITIALIZED' : 'DEVELOPER OVERRIDE READY'}
            </RpgBadge>
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide">
            Welcome, <span className={isPlayer ? 'text-emerald-400' : 'text-amber-400'}>{session.identifier}</span>!
          </h3>
        </div>
      </div>

      {/* Role details box */}
      <div className="p-4 bg-[#110f1c] border-2 border-[#2f294c] text-left text-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#241f3d]">
          {isPlayer ? (
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          ) : (
            <ShieldCheck size={16} className="text-amber-400 shrink-0" />
          )}
          <span className="font-bold text-slate-200">
            {isPlayer ? 'Target Role: Standard Player' : 'Target Role: Developer / Admin'}
          </span>
        </div>

        <div>
          <p className="text-slate-400 text-[11px] mb-1.5 uppercase font-pixel text-slate-500">
            {isPlayer ? 'Planned Progression Access:' : 'Planned Developer Privileges:'}
          </p>
          <ul className="space-y-1 text-slate-300">
            {session.intendedAccess.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <PixelSparkle size={10} className={isPlayer ? 'text-emerald-400' : 'text-amber-400'} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t border-[#241f3d]">
          <p className="text-[11px] text-slate-400 leading-relaxed italic">
            🛡️ <strong className="text-slate-300">Step 1 Frontend Verified:</strong> This mock preview validates the form and role routing. Per architecture requirements, secure backend role-based access control will be connected in future steps.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-1">
        <RpgButton
          type="button"
          variant={isPlayer ? 'player' : 'dev'}
          size="md"
          fullWidth
          onClick={onReset}
          icon={<RefreshCw size={15} />}
        >
          Return to Login Page
        </RpgButton>
      </div>
    </div>
  );
};
