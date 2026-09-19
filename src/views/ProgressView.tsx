import React, { useState } from 'react';
import {
  Award,
  Flame,
  Sparkles,
  CheckCircle,
  Lock,
  BookOpen,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  Target
} from 'lucide-react';
import { UserProfile } from '../types';
import { storageService } from '../services/storageService';

interface ProgressViewProps {
  user: UserProfile;
  onSelectWordToPractice: (wordId: string) => void;
  onOpenAuth?: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ user, onSelectWordToPractice, onOpenAuth }) => {
  const stats = storageService.getUserDashboardStats(user.id);
  const sessions = storageService.getPracticeSessions(user.id);
  const allMilestones = storageService.getMilestones();
  const userMilestones = storageService.getUserUnlockedMilestones(user.id);
  const unlockedIds = new Set(userMilestones.map((m) => m.milestoneId));
  const improvement = storageService.getImprovementStats(user.id);
  const weakWords = storageService.getWeakWords(user.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'milestones'>('overview');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Demo Mode Educational Banner */}
      {user.isDemo && onOpenAuth && (
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

      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Your Progress &amp; Achievements
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Track vocabulary mastery, speaking consistency, and unlocked coach milestones.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 max-w-md sm:max-w-xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'overview'
              ? 'bg-white text-[#0B749C] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Mastery Overview
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'history'
              ? 'bg-white text-[#0B749C] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Practice History ({sessions.length})
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'milestones'
              ? 'bg-white text-[#0B749C] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Milestones ({userMilestones.length} unlocked)
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Primary Word Mastery & Learning Model 4-Pack */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
            <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-emerald-200 shadow-xs">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                Words Mastered
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
                {stats.wordsMastered}
                <span className="text-xs text-slate-500 font-semibold ml-1">
                  / {stats.totalWordsCount}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 font-medium mt-2">
                Demonstrated independent success
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-amber-200 shadow-xs">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                Words Practicing
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-950 mt-1">
                {stats.wordsPracticing}
              </div>
              <p className="text-[11px] text-amber-700 font-medium mt-2">
                In active practice cycle
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-rose-200 shadow-xs">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                Needs Review
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-950 mt-1">
                {stats.wordsNeedingReview}
              </div>
              <p className="text-[11px] text-rose-700 font-medium mt-2">
                Clues needed or recent errors
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 border border-teal-200 shadow-xs">
              <span className="text-[11px] font-bold text-[#0B749C] uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#1FBAC0]" />
                1st-Attempt Success
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B749C] mt-1">
                {stats.totalSessions > 0 ? `${stats.firstAttemptSuccessRate}%` : 'No attempts yet'}
              </div>
              <p className="text-[11px] text-teal-700 font-medium mt-2">
                {stats.totalSessions > 0 ? 'Correct on first try without clues' : 'Complete a practice to start tracking'}
              </p>
            </div>
          </div>

          {/* Secondary Learning Stats: Independent Successes, Total XP, Streaks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            <div className="bg-slate-50/80 rounded-xl p-3.5 sm:p-4 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Independent Successes
              </span>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                {stats.independentSuccesses}
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-3.5 sm:p-4 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Practice XP
              </span>
              <div className="text-lg sm:text-xl font-extrabold text-[#0B749C] mt-0.5 flex items-center gap-1">
                <span>{user.xp}</span>
                <span className="text-xs font-semibold text-slate-500">XP</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-3.5 sm:p-4 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Daily Streak
              </span>
              <div className="text-lg sm:text-xl font-extrabold text-orange-600 mt-0.5 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span>{user.currentStreak} days</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-3.5 sm:p-4 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Practice Sessions
              </span>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                {stats.totalSessions}
              </div>
            </div>
          </div>

          {/* Recent Improvements Section */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Recent Improvements
                </h4>
                <p className="text-xs text-slate-500">
                  Words where you demonstrated correct use, fixed errors on retry, or progressed toward mastery
                </p>
              </div>
            </div>

            {sessions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                {sessions
                  .filter((s) => s.learningStatus === 'correct' || s.rating === 'Looks good')
                  .slice(0, 4)
                  .map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/30 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-xs text-slate-900">{s.word}</span>
                        <p className="text-[11px] text-emerald-800 font-medium">
                          {s.attemptNumber && s.attemptNumber > 1
                            ? `✓ Fixed on retry (Attempt ${s.attemptNumber})`
                            : '✓ First-attempt independent success'}
                        </p>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {new Date(s.practicedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-5 text-center rounded-xl bg-slate-50/70 border border-dashed border-slate-200">
                <p className="text-xs font-semibold text-slate-700">No practice activity yet</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Complete your first practice to start building your progress.
                </p>
              </div>
            )}
          </div>

          {/* Real Accuracy Trends & Coach Insights (NO numerical exam scores) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-[#0B749C]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Practice Insights
                  </h4>
                  <p className="text-xs text-slate-500">
                    {improvement.totalSessionsAnalyzed > 0
                      ? `Aggregated over your last ${improvement.totalSessionsAnalyzed} practice sessions`
                      : 'Speech, grammar, and vocabulary usage metrics'}
                  </p>
                </div>
              </div>
            </div>

            {improvement.totalSessionsAnalyzed > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-semibold">Vocabulary Usage</span>
                    <span className="font-extrabold text-slate-900">{improvement.vocabularyAccuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0B749C] h-full rounded-full"
                      style={{ width: `${improvement.vocabularyAccuracy}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-semibold">Grammar &amp; Agreement</span>
                    <span className="font-extrabold text-slate-900">{improvement.grammarAccuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1FBAC0] h-full rounded-full"
                      style={{ width: `${improvement.grammarAccuracy}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-semibold">Spelling &amp; Form</span>
                    <span className="font-extrabold text-slate-900">{improvement.spellingAccuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#61D3AB] h-full rounded-full"
                      style={{ width: `${improvement.spellingAccuracy}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center rounded-xl bg-slate-50/70 border border-slate-100">
                <p className="text-xs text-slate-500">
                  Complete your first practice to start building your insights.
                </p>
              </div>
            )}

            {/* Common Mistakes & Coach Guidance */}
            {improvement.recurringMistakes.length > 0 && (
              <div className="mt-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Common Mistakes Identified by Coach:</span>
                </div>
                <ul className="space-y-1 pl-5 list-disc text-amber-800">
                  {improvement.recurringMistakes.map((m, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{m.text}</span>
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full ml-1.5 font-bold">
                        {m.count}x
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Weak Words Spotlight */}
          {weakWords.length > 0 && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Words Needing Review ({weakWords.length})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Words where recent practice needed clues or repeated guidance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {weakWords.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-amber-300 bg-amber-50/20 transition-all"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-bold text-sm text-slate-900">{word.word}</span>
                      <p className="text-xs text-slate-500 truncate max-w-[280px]">
                        {word.meaning}
                      </p>
                    </div>
                    <button
                      onClick={() => onSelectWordToPractice(word.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B749C] text-white text-xs font-bold hover:bg-[#085a79] transition-colors shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Practice</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Level Progress Bar */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Current Level Mastery
                </span>
                <h4 className="text-base font-bold text-slate-900">{stats.userLevel} Tier</h4>
              </div>
              <span className="text-sm font-extrabold text-[#0B749C]">{stats.levelPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-[#0B749C] to-[#1FBAC0] h-full rounded-full transition-all duration-700"
                style={{ width: `${stats.levelPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-600">
              {stats.levelLearned} of {stats.levelWordsTotal} words practiced at this level. Keep practicing regularly to graduate to the next tier.
            </p>
          </div>

          {/* Category Mastery Progress Bars */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Category Mastery Breakdown
            </h4>
            <div className="space-y-4">
              {stats.categories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{cat.category}</span>
                    <span className="font-semibold text-slate-600">
                      {cat.learned}/{cat.total} words ({cat.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1FBAC0] h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEARNING HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {sessions.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No practice sessions yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Complete your first practice to start building your progress.
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-slate-900 text-base">
                      {session.word}
                    </span>
                    {(() => {
                      const isCorrect =
                        session.learningStatus === 'correct' ||
                        (!session.learningStatus && (session.rating === 'Looks good' || session.rating === 'Good'));
                      const isAlmost =
                        session.learningStatus === 'almost_there' ||
                        (!session.learningStatus && session.rating === 'Almost there');
                      return (
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : isAlmost
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? '✓ Correct' : isAlmost ? 'Almost there' : 'Needs another try'}
                        </span>
                      );
                    })()}
                    {session.xpEarned > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9CEE8D]/30 text-[#0B749C]">
                        +{session.xpEarned} XP
                      </span>
                    )}
                    {session.practiceMode === 'situation' && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                        Scenario Mode
                      </span>
                    )}
                    <span className="text-[11px] text-slate-600">
                      {new Date(session.practicedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 italic">
                    &ldquo;{session.userSentence}&rdquo;
                  </p>

                  <p className="text-[11px] text-slate-600">
                    Feedback: {session.feedbackText}
                  </p>

                  {session.coachLesson && (
                    <p className="text-[11px] text-teal-800 font-medium bg-teal-50/70 p-2 rounded-lg border border-teal-200/60">
                      💡 Coach Lesson: {session.coachLesson}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onSelectWordToPractice(session.wordId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shrink-0 self-start sm:self-center"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Practice again</span>
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
          {allMilestones.map((m) => {
            const isUnlocked = unlockedIds.has(m.id);
            return (
              <div
                key={m.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-white border-[#61D3AB]/60 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 opacity-70'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] text-white shadow-xs'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isUnlocked ? (
                    <Award className="w-5 h-5 text-[#9CEE8D]" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{m.title}</h4>
                    {isUnlocked && (
                      <CheckCircle className="w-4 h-4 text-[#61D3AB] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{m.description}</p>
                  <span className="inline-block text-[11px] font-bold text-[#0B749C] mt-2">
                    +{m.xpReward} XP Reward
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
