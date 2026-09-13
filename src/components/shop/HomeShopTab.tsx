import React from 'react';
import { PREVIEW_HOME_SHOP_ITEMS } from '../../utils/homeData';

export const HomeShopTab: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
      {/* Under Construction Header Notice */}
      <div className="mb-4 p-4 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border-2 border-amber-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-bounce">🔨</span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-amber-300 font-pixel">
              HOME SHOP • COMING SOON
            </h3>
            <p className="text-xs text-slate-300">
              The Kingdom's Master Carpenters are hand-crafting furniture, wallpapers, and cozy pet decorations for upcoming updates!
            </p>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
          <span>💰</span>
          <span>Buyable with Gold in Future Updates</span>
        </div>
      </div>

      {/* Furniture Preview Grid */}
      <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar">
        {PREVIEW_HOME_SHOP_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/80 border-2 border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-lg opacity-90 hover:opacity-100 hover:border-amber-500/40 transition-all duration-200"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl p-1.5 bg-slate-950 rounded-xl border border-slate-800 shadow">
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 font-pixel">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[10px] font-bold text-amber-300">
                  Coming Soon
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {item.description}
              </p>

              {item.cozyPoints && (
                <div className="inline-block px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-semibold text-emerald-300 mb-2">
                  🏡 +{item.cozyPoints} Cozy Rating
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 font-mono">
                <span>💰</span>
                <span>{item.previewPrice?.toLocaleString()}</span>
                <span className="text-[10px] text-amber-500 font-sans uppercase">Est. Gold</span>
              </div>

              <button
                disabled
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-bold cursor-not-allowed"
              >
                🔒 In Development
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
