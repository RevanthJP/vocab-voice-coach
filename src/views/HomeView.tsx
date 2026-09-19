import React, { useState } from 'react';
import { Flame, Target, ArrowRight, Volume2, Trophy, AlertCircle, RotateCcw, BookOpen, Mic, BarChart3 } from 'lucide-react';
import {
  UserProfile,
  HomePracticePref,
  PracticeSituationPref,
  EnglishLevel
} from '../types';
import { storageService } from '../services/storageService';
import { speechService } from '../services/speechService';

interface HomeViewProps {
  user: UserProfile;
  onNavigate: (tab: string, wordId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ user, onNavigate }) => {
  const stats = storageService.getUserDashboardStats(user.id);
  const milestones = storageService.getMilestones();
  const unlockedMilestones = storageService.getUserUnlockedMilestones(user.id);
  const weakWords = storageService.getWeakWords(user.id);
  const userProgress = storageService.getUserWordProgress(user.id);
  const recommended = storageService.getRecommendedPracticeWords(user.id).slice(0, 4);

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Find next milestone to highlight
  const unlockedIds = new Set(unlockedMilestones.map((m) => m.milestoneId));
  const nextMilestone = milestones.find((m) => !unlockedIds.has(m.id)) || milestones[0];

  // Practice sessions to check if user has actual practice history
  const allSessions = storageService.getPracticeSessions(user.id);

  // Home Practice Preferences (Difficulty & Situation)
  const [pref, setPref] = useState<HomePracticePref>(() => storageService.getHomePracticePref());

  const handleDifficultyChange = (lvl: EnglishLevel) => {
    const updated: HomePracticePref = { ...pref, practiceLevel: lvl };
    setPref(updated);
    storageService.saveHomePracticePref(updated);
  };

  const handleSituationChange = (sit: PracticeSituationPref) => {
    const updated: HomePracticePref = { ...pref, situation: sit };
    setPref(updated);
    storageService.saveHomePracticePref(updated);
  };

  const handleQuickListen = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    speechService.speak(word, 0.95);
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B749C] via-[#0B749C] to-[#1FBAC0] text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-[#0B749C]/15">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 right-32 w-48 h-48 bg-[#9CEE8D]/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 w-full">
          {/* Header Title & Subtitle */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {user.isDemo || user.name === 'Demo Mode' || user.name === 'Demo Profile'
              ? 'Welcome to Vocab Voice Coach 👋'
              : `${greeting}, ${user.name.split(' ')[0]} 👋`}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-sky-100 mt-2 font-medium leading-relaxed max-w-3xl lg:max-w-4xl xl:max-w-none">
            Build practical English vocabulary and speaking confidence through short, real-world practice.
          </p>

          {/* Hero Content: Controls & CTA on Left, Voice Practice Visual on Right */}
          <div className="mt-5 sm:mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            <div className="flex-1 max-w-2xl">
              <p className="text-sm sm:text-base text-white font-semibold">
                What would you like to practice today?
              </p>

              {/* Compact Practice Preference Controls */}
              <div className="mt-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 max-w-2xl space-y-2.5">
                {/* Difficulty Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-sky-100 w-24 sm:w-28 shrink-0">
                    Difficulty:
                  </span>
                  <div className="inline-flex items-center gap-1.5 flex-wrap">
                    {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => {
                      const isSelected = pref.practiceLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => handleDifficultyChange(lvl)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-white text-[#0B749C] shadow-sm font-bold scale-[1.02]'
                              : 'bg-white/15 hover:bg-white/25 text-white'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Situation Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-sky-100 w-24 sm:w-28 shrink-0">
                    Situation:
                  </span>
                  <div className="inline-flex items-center gap-1.5 flex-wrap">
                    {(
                      [
                        { id: 'workplace', label: 'Workplace' },
                        { id: 'everyday', label: 'Everyday' },
                        { id: 'conversation', label: 'Conversation' }
                      ] as const
                    ).map((opt) => {
                      const isSelected = pref.situation === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSituationChange(opt.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-white text-[#0B749C] shadow-sm font-bold scale-[1.02]'
                              : 'bg-white/15 hover:bg-white/25 text-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Actions: Primary CTA and Browse All Words */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('practice')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0B749C] hover:bg-sky-50 font-extrabold text-sm sm:text-base shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start Practice →</span>
                </button>

                <button
                  onClick={() => onNavigate('learn')}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-sky-100 hover:text-white font-semibold text-xs sm:text-sm backdrop-blur-xs transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse All Words</span>
                </button>
              </div>
            </div>

            {/* Right 35-40%: Subtle, non-interactive product illustration */}
            <div className="hidden lg:flex justify-end w-full lg:w-[320px] xl:w-[350px] shrink-0 select-none pointer-events-none" aria-hidden="true">
              <div className="w-full rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 p-4 sm:p-4.5 shadow-lg shadow-black/5 text-white space-y-2.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200">
                    How it works
                  </span>
                  <span className="text-[10px] font-medium text-sky-200/80">
                    3-Step Flow
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Stage 01 */}
                  <div className="rounded-xl bg-white/[0.07] border border-white/10 p-2.5 flex items-start gap-2.5">
                    <span className="text-[10px] font-mono font-bold text-[#9CEE8D] bg-[#9CEE8D]/15 px-1.5 py-0.5 rounded shrink-0">
                      01
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white tracking-tight">
                        Learn
                      </div>
                      <p className="text-[11px] text-sky-100/90 leading-tight mt-0.5">
                        Build practical vocabulary
                      </p>
                    </div>
                  </div>

                  {/* Stage 02 */}
                  <div className="rounded-xl bg-white/[0.07] border border-white/10 p-2.5 flex items-start gap-2.5">
                    <span className="text-[10px] font-mono font-bold text-sky-200 bg-sky-300/15 px-1.5 py-0.5 rounded shrink-0">
                      02
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white tracking-tight">
                        Practice
                      </div>
                      <p className="text-[11px] text-sky-100/90 leading-tight mt-0.5">
                        Speak in real-world situations
                      </p>
                    </div>
                  </div>

                  {/* Stage 03 */}
                  <div className="rounded-xl bg-white/[0.07] border border-white/10 p-2.5 flex items-start gap-2.5">
                    <span className="text-[10px] font-mono font-bold text-[#1FBAC0] bg-[#1FBAC0]/20 px-1.5 py-0.5 rounded shrink-0">
                      03
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white tracking-tight">
                        Improve
                      </div>
                      <p className="text-[11px] text-sky-100/90 leading-tight mt-0.5">
                        Get useful coaching and try again
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Daily Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {/* Metric 1: Daily Goal */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Daily Goal
            </span>
            <Target className="w-4 h-4 text-[#0B749C]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              {Math.min(stats.todayWordsLearned, stats.dailyGoal)}
            </span>
            <span className="text-xs text-slate-600 font-semibold">
              / {stats.dailyGoal} words
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#0B749C] h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.round((stats.todayWordsLearned / stats.dailyGoal) * 100))}%`
              }}
            />
          </div>
          {/* Goal Status Indicator */}
          <div className="mt-2.5 flex items-center justify-between">
            {stats.todayWordsLearned >= stats.dailyGoal ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-emerald-600">Goal complete 🎉</span>
                {stats.todayWordsLearned > stats.dailyGoal && (
                  <span className="text-[11px] text-slate-600 font-medium">
                    ({stats.todayWordsLearned} total words today)
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-600 font-medium">
                {stats.dailyGoal - stats.todayWordsLearned} more to reach goal
              </span>
            )}
          </div>
        </div>

        {/* Metric 2: Current Streak */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Practice Streak
            </span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              {user.currentStreak}
            </span>
            <span className="text-xs text-slate-600 font-semibold">
              {user.currentStreak === 1 ? 'day active' : 'days active'}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-3 font-medium">
            {user.currentStreak === 0
              ? 'Speak today to start your streak'
              : 'Keep your practice going.'}
          </p>
        </div>

        {/* Metric 3: Current Level Completion */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {user.currentLevel}
            </span>
            <span className="text-xs font-bold text-[#1FBAC0]">{stats.levelPercent}%</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              {stats.levelLearned}
            </span>
            <span className="text-xs text-slate-600 font-semibold">
              / {stats.levelWordsTotal} words
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#1FBAC0] h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.levelPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Next Milestone */}
        <div
          onClick={() => onNavigate('progress')}
          className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-slate-200/90 shadow-xs cursor-pointer hover:border-[#61D3AB] transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Next Milestone
            </span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="truncate font-bold text-slate-900 text-sm lg:text-base">
            {nextMilestone ? nextMilestone.title : 'Learn your first 5 words'}
          </div>
          <p className="text-[11px] text-[#0B749C] mt-2 font-bold flex items-center gap-1">
            <span>{nextMilestone ? `${nextMilestone.requirementValue} words goal` : '0 / 5 words'}</span>
            <ArrowRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* Explore the App: Primary product areas for first-time and returning users */}
      <section className="space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Explore the app
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose where you want to start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          <button
            type="button"
            onClick={() => onNavigate('learn')}
            className="text-left bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-[#1FBAC0] hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0B749C]/10 text-[#0B749C] flex items-center justify-center mb-4">
              <BookOpen className="w-[18px] h-[18px]" />
            </div>
            <h4 className="font-extrabold text-slate-900 group-hover:text-[#0B749C] transition-colors">
              Learn
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Browse practical vocabulary by level and situation.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B749C] mt-4">
              Explore Vocabulary
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('practice')}
            className="text-left bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-[#1FBAC0] hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1FBAC0]/10 text-[#0B749C] flex items-center justify-center mb-4">
              <Mic className="w-[18px] h-[18px]" />
            </div>
            <h4 className="font-extrabold text-slate-900 group-hover:text-[#0B749C] transition-colors">
              Practice
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Use new words in real-world situations and get coaching.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B749C] mt-4">
              Start Practicing
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('progress')}
            className="text-left bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-[#1FBAC0] hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#9CEE8D]/40 text-[#0B749C] flex items-center justify-center mb-4">
              <BarChart3 className="w-[18px] h-[18px]" />
            </div>
            <h4 className="font-extrabold text-slate-900 group-hover:text-[#0B749C] transition-colors">
              Progress
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Track words learned, practice activity and areas that need review.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B749C] mt-4">
              View Progress
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Weak Words Spotlight: If user has words flagged for review */}
      {allSessions.length > 0 && weakWords.length > 0 && (
        <div className="space-y-3 bg-amber-50/60 p-4 sm:p-5 rounded-2xl border border-amber-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-amber-950">
                  Targeted Review: Words Needing Practice ({weakWords.length})
                </h3>
                <p className="text-xs text-amber-800">
                  Revisit these words to solidify correct usage and past-tense agreement.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('practice', weakWords[0].id)}
              className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Practice now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {weakWords.slice(0, 3).map((item) => {
              const prog = userProgress.find((p) => p.wordId === item.id);
              let subtitle = 'Revisit this word to strengthen correct usage.';
              if (prog?.lastMistakes && prog.lastMistakes.length > 0) {
                const mistakeText = prog.lastMistakes.join(' ').toLowerCase();
                if (
                  mistakeText.includes('past') ||
                  mistakeText.includes('tense') ||
                  mistakeText.includes('-ied') ||
                  mistakeText.includes('-ed')
                ) {
                  subtitle = 'Revisit this word to strengthen correct past-tense usage.';
                } else {
                  subtitle = prog.lastMistakes[0]
                    .replace(/^[❌\s"']+/, '')
                    .split('→')[0]
                    .trim() || item.meaning;
                }
              } else if (item.meaning) {
                subtitle = item.meaning;
              }

              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate('practice', item.id)}
                  className="bg-white p-3.5 rounded-xl border border-amber-200 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0B749C] transition-colors">
                      {item.word}
                    </h4>
                    <p className="text-[11px] text-slate-600 truncate">
                      {subtitle}
                    </p>
                  </div>
                  <button className="p-1.5 rounded-lg bg-amber-50 group-hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1 shrink-0">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended For You Section: only shown when user has actual practice history */}
      {allSessions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Recommended for You
              </h3>
              <p className="text-xs text-slate-500">
                Curated based on your {user.currentLevel} level and {user.targetImprovement} focus
              </p>
            </div>
            <button
              onClick={() => onNavigate('learn')}
              className="text-xs font-bold text-[#0B749C] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
            {recommended.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('practice', item.id)}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-[#1FBAC0] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0B749C] transition-colors">
                        {item.word}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {item.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{item.pronunciation}</p>
                  </div>

                  <button
                    onClick={(e) => handleQuickListen(e, item.word)}
                    className="p-2 rounded-xl bg-[#1FBAC0]/10 hover:bg-[#1FBAC0]/20 text-[#0B749C] transition-colors"
                    title="Listen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.meaning}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-600">{item.category}</span>
                  <span className="font-bold text-[#0B749C] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Practice</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
