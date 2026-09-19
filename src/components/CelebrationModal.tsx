import React, { useEffect } from 'react';
import { Sparkles, Trophy, X, Flame } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';
import { Milestone } from '../types';

interface CelebrationModalProps {
  type: 'daily_goal' | 'milestone';
  milestone?: Milestone;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  type,
  milestone,
  onClose
}) => {
  useEffect(() => {
    fireCelebrationConfetti();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-100 p-6 text-center relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#9CEE8D]/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#1FBAC0]/20 blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-600 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'daily_goal' ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#61D3AB] to-[#9CEE8D] flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#61D3AB]/30">
              <Flame className="w-8 h-8 text-white fill-white animate-pulse" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Daily Goal Completed! 🎉
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Incredible dedication! You practiced your target words for today and kept your streak alive.
            </p>
            <div className="my-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#9CEE8D]/30 border border-[#61D3AB]/40 text-[#0B749C] text-sm font-extrabold">
              <Sparkles className="w-4 h-4 text-[#0B749C]" />
              <span>+50 Bonus XP Earned</span>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#0B749C]/30">
              <Trophy className="w-8 h-8 text-amber-300" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B749C] bg-[#0B749C]/10 px-2.5 py-0.5 rounded-full">
              New Milestone Unlocked
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2">
              {milestone?.title || 'Achievement Unlocked'}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {milestone?.description || 'You reached an impressive English learning milestone.'}
            </p>
            <div className="my-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#9CEE8D]/30 border border-[#61D3AB]/40 text-[#0B749C] text-sm font-extrabold">
              <Sparkles className="w-4 h-4 text-[#0B749C]" />
              <span>+{milestone?.xpReward || 100} XP Awarded</span>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-sm font-bold shadow-md transition-all mt-1"
        >
          Keep Practicing
        </button>
      </div>
    </div>
  );
};
