import React from 'react';
import { RpgCard } from '../ui/RpgCard';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteQuestModalProps {
  isOpen: boolean;
  questTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteQuestModal: React.FC<DeleteQuestModalProps> = ({
  isOpen,
  questTitle,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm relative z-10 animate-scaleUp">
        <RpgCard theme="dev" className="shadow-2xl border-2 border-rose-500/80 text-center">
          <div className="space-y-4 py-2">
            {/* Header Icon */}
            <div className="mx-auto w-12 h-12 bg-rose-950/80 border-2 border-rose-500/80 flex items-center justify-center shadow-[2px_2px_0_0_#4c0519]">
              <Trash2 size={22} className="text-rose-400" />
            </div>

            {/* Title & Body */}
            <div className="space-y-1.5">
              <h3 className="text-sm sm:text-base font-bold text-slate-100 font-pixel flex items-center justify-center gap-1.5">
                <AlertTriangle size={15} className="text-amber-400" />
                <span>Delete this quest?</span>
              </h3>
              <p className="text-xs text-slate-300 font-pixel">
                This quest will be permanently removed.
              </p>
            </div>

            {/* Quest Title Callout */}
            {questTitle && (
              <div className="p-2.5 bg-[#100e1c] border border-rose-900/60 text-xs text-rose-200 font-medium truncate max-w-full">
                "{questTitle}"
              </div>
            )}

            {/* Buttons: Cancel & Delete */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-[#1e1a33] hover:bg-[#2c264d] border-2 border-[#413669] text-slate-200 font-pixel text-xs font-bold shadow-[2px_2px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 border-2 border-rose-400 text-white font-pixel text-xs font-bold shadow-[2px_2px_0_0_#4c0519] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </RpgCard>
      </div>
    </div>
  );
};
