import React from 'react';
import { Sparkles, Flame, User, Shield } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  activeTab: string;
  isDemoEntered: boolean;
  onEnterDemo: () => void;
  onSelectTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  isDemoEntered,
  onEnterDemo,
  onSelectTab,
  onOpenAuth
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] flex items-center justify-center text-white shadow-sm shadow-[#0B749C]/20 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-slate-900 leading-none">
                Vocab Voice
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#1FBAC0]/15 text-[#0B749C]">
                Coach
              </span>
            </div>
            <p className="text-[11px] text-slate-600 hidden sm:block">
              Daily English Speaking &amp; Vocabulary
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { id: 'home', label: 'Home' },
            { id: 'learn', label: 'Learn' },
            { id: 'practice', label: 'Practice' },
            { id: 'progress', label: 'Progress' },
            ...(!user?.isDemo && user ? [{ id: 'profile', label: 'Profile' }] : [])
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0B749C]/10 text-[#0B749C]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {!user?.isDemo && user?.isAdmin && (
            <button
              onClick={() => onSelectTab('admin')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
              }`}
              title="Admin Vocabulary Management"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Right Stats & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {/* Try Demo or Demo Mode state indicator + Sign in */}
              {user.isDemo && (
                <div className="flex items-center gap-2">
                  {!isDemoEntered ? (
                    <button
                      id="nav-try-demo-btn"
                      onClick={onEnterDemo}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0B749C] hover:bg-[#085a79] text-white shadow-xs transition-colors cursor-pointer"
                      title="Explore Vocab Voice Coach in Demo Mode"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#9CEE8D]" />
                      <span>Try Demo</span>
                    </button>
                  ) : (
                    <span
                      id="nav-demo-mode-badge"
                      title="You are in Demo Mode. Your practice progress is saved locally in this browser."
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-slate-100/90 text-slate-600 border border-slate-200/90 shadow-2xs select-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Demo Mode</span>
                    </span>
                  )}

                  <button
                    id="nav-sign-in-btn"
                    onClick={onOpenAuth}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#0B749C] hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                    title="Sign in to save your progress across devices"
                  >
                    <User className="w-3 h-3 text-slate-500" />
                    <span>Sign in</span>
                  </button>
                </div>
              )}

              {/* Streak Badge (only if streak > 0) */}
              {user.currentStreak > 0 && (
                <div
                  title={`${user.currentStreak} day practice streak`}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/70 text-orange-700 text-xs font-bold shadow-xs cursor-default"
                >
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                  <span>{user.currentStreak}d</span>
                </div>
              )}

              {/* XP Badge */}
              <div
                id="nav-xp-badge"
                title={`${user.xp} Total XP earned`}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#9CEE8D]/30 border border-[#61D3AB]/40 text-[#0B749C] text-xs font-bold shadow-xs cursor-default"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0B749C]" />
                <span>{user.xp} XP</span>
              </div>

              {/* Profile button strictly for authenticated users only */}
              {!user.isDemo && (
                <button
                  onClick={() => onSelectTab('profile')}
                  className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full transition-all border ${
                    activeTab === 'profile'
                      ? 'bg-[#0B749C]/10 border-[#0B749C]/40 text-[#0B749C] ring-2 ring-[#0B749C]/20'
                      : 'border-transparent hover:bg-slate-100 text-slate-700'
                  }`}
                  title="View Profile & Settings"
                  aria-label="User Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold hidden sm:inline">
                    {user.name.split(' ')[0] || 'Profile'}
                  </span>
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-sm font-semibold shadow-sm transition-all"
            >
              <User className="w-4 h-4" />
              <span>Log In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
