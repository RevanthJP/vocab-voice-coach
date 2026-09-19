import React, { useState } from 'react';
import { User, LogOut, Check, Sparkles, Volume2, Shield } from 'lucide-react';
import { UserProfile, EnglishLevel, TargetImprovementArea } from '../types';
import { storageService } from '../services/storageService';
import { speechService } from '../services/speechService';

interface ProfileViewProps {
  user: UserProfile;
  onUserUpdated: (user: UserProfile) => void;
  onLogout: () => void;
  onOpenAuth: () => void;
  onResetDemo?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUserUpdated,
  onLogout,
  onOpenAuth,
  onResetDemo
}) => {
  const [name, setName] = useState(user.name);
  const [level, setLevel] = useState<EnglishLevel>(user.currentLevel);
  const [targetImprovement, setTargetImprovement] = useState<TargetImprovementArea>(
    user.targetImprovement
  );
  const [dailyGoal, setDailyGoal] = useState<number>(user.dailyGoal || 5);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(!!user.isAdmin);

  const levels: EnglishLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
  const focusAreas: TargetImprovementArea[] = [
    'Everyday English',
    'Workplace English',
    'Grammar & Usage',
    'Conversation',
    'Professional English'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = storageService.updateUserProfile(user.id, {
      name,
      currentLevel: level,
      targetImprovement,
      dailyGoal,
      // Only allow updating isAdmin if authenticated and not in demo mode
      ...(user.isDemo ? { isAdmin: false } : { isAdmin })
    });

    if (updated) {
      onUserUpdated(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleResetClick = () => {
    if (storageService.hasDemoProgress()) {
      setShowResetConfirm(true);
    } else {
      executeReset();
    }
  };

  const executeReset = () => {
    setShowResetConfirm(false);
    if (onResetDemo) {
      onResetDemo();
      setName('Demo Profile');
      setLevel('Beginner');
      setTargetImprovement('Workplace English');
      setDailyGoal(5);
      setResetNotice(true);
      setTimeout(() => setResetNotice(false), 2500);
    }
  };

  const handleTestVoice = () => {
    speechService.speak(
      `Hello ${name || 'there'}! I am your Vocab Voice Coach. Ready to speak English with confidence?`,
      0.95
    );
  };

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6 sm:space-y-7 animate-in fade-in duration-200">
      {/* Demo Mode Educational Banner */}
      {user.isDemo && (
        <div className="p-4 rounded-2xl bg-sky-50/90 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-xs text-slate-700 font-medium leading-relaxed">
              You are exploring in <strong>Demo Mode</strong>. Your practice progress, streak, and XP are saved locally in this browser.
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenAuth}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B749C] hover:bg-[#085a79] text-white text-xs font-bold transition-colors shrink-0 shadow-2xs"
          >
            <span>Sign in to save your progress across devices</span>
          </button>
        </div>
      )}

      {/* Header Profile Summary */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl shadow-md shrink-0">
          {user.isDemo ? (
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {user.isDemo ? 'Demo Profile' : user.name}
            </h3>
            {user.isDemo && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Demo Mode
              </span>
            )}
          </div>
          {!user.isDemo && user.email && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{user.email}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#0B749C]/10 text-[#0B749C]">
              {user.currentLevel}
            </span>
            <span className="text-xs font-semibold text-slate-600">
              · {user.xp} XP
            </span>
            <span className="text-xs font-semibold text-slate-600">
              · {user.currentStreak} {user.currentStreak === 1 ? 'Day Active' : 'Days Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <h4 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Learning Preferences &amp; Account
        </h4>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Preferences updated successfully!</span>
          </div>
        )}

        {resetNotice && (
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-600" />
            <span>Demo progress restored to initial state!</span>
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Display Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:border-[#0B749C] focus:ring-2 focus:ring-[#0B749C]/20 outline-hidden"
              required
            />
          </div>
        </div>

        {/* Current English Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Current English Level
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {levels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                  level === lvl
                    ? 'border-[#0B749C] bg-[#0B749C]/10 text-[#0B749C] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Target Improvement Area */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Primary Improvement Area
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {focusAreas.map((area) => (
              <label
                key={area}
                onClick={() => setTargetImprovement(area)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  targetImprovement === area
                    ? 'border-[#1FBAC0] bg-[#1FBAC0]/5 shadow-xs font-bold text-slate-900'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 text-xs'
                }`}
              >
                <span className="text-xs">{area}</span>
                <input
                  type="radio"
                  name="improvement"
                  checked={targetImprovement === area}
                  onChange={() => setTargetImprovement(area)}
                  className="accent-[#1FBAC0]"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Daily Goal */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Daily Goal (Words per day)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[5, 10, 15].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setDailyGoal(num)}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  dailyGoal === num
                    ? 'border-[#61D3AB] bg-[#61D3AB]/15 text-slate-900 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {num} words/day
              </button>
            ))}
          </div>
        </div>

        {/* Test Speech Voice */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleTestVoice}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0B749C] hover:underline"
          >
            <Volume2 className="w-4 h-4" />
            <span>Test Coach Voice Audio</span>
          </button>
        </div>

        {/* Admin Capability Switch - ONLY available to real authenticated users */}
        {!user.isDemo && (
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Vocabulary Admin Access</span>
                <span className="text-[11px] text-slate-500">Enable to add, edit, and delete vocabulary words</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 accent-[#0B749C]"
            />
          </div>
        )}

        {/* Save & Account CTAs */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#9CEE8D]" />
            <span>Save Preferences</span>
          </button>

          {user.isDemo ? (
            <div className="flex items-center gap-2">
              {onResetDemo && (
                <button
                  type="button"
                  onClick={handleResetClick}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                  title="Start a new demo session with a clean state"
                >
                  Start New Demo
                </button>
              )}
              <button
                type="button"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0B749C] hover:bg-[#0B749C]/10 rounded-xl transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </form>

      {/* Confirmation Modal for Start New Demo */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Start a new demo?</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Your current demo progress will be cleared.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeReset}
                className="px-4 py-2 text-xs font-bold bg-[#0B749C] hover:bg-[#085a79] text-white rounded-xl shadow-xs transition-colors"
              >
                Start New Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
