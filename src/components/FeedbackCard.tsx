import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Volume2,
  MessageSquare,
  Award,
  Gauge,
  Lightbulb
} from 'lucide-react';
import { FeedbackEvaluation, VocabularyWord } from '../types';
import { speechService } from '../services/speechService';

interface FeedbackCardProps {
  evaluation: FeedbackEvaluation;
  userSentence: string;
  word: VocabularyWord;
  xpEarned: number;
  inputMethod?: 'voice' | 'text';
  previousAttemptSentence?: string;
  onRetry?: () => void;
  onTryAgain: () => void;
  onContinue: () => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  evaluation,
  userSentence,
  word,
  xpEarned,
  inputMethod = 'voice',
  previousAttemptSentence,
  onRetry,
  onTryAgain,
  onContinue
}) => {
  const [playingTarget, setPlayingTarget] = useState<'user' | 'suggestion' | null>(null);

  const isCorrect = evaluation.learningStatus === 'correct';
  const isAlmostThere = evaluation.learningStatus === 'almost_there';

  const statusConfig = isCorrect
    ? {
        badgeText: '✓ Correct',
        badgeBg: 'bg-[#61D3AB]/20 text-emerald-900 border-[#61D3AB]/50',
        icon: CheckCircle2,
        iconColor: 'text-[#0B749C]'
      }
    : isAlmostThere
    ? {
        badgeText: 'Almost there',
        badgeBg: 'bg-amber-50 text-amber-900 border-amber-300',
        icon: AlertCircle,
        iconColor: 'text-amber-500'
      }
    : {
        badgeText: 'Needs another try',
        badgeBg: 'bg-rose-50 text-rose-900 border-rose-200',
        icon: AlertCircle,
        iconColor: 'text-rose-500'
      };

  const StatusIcon = statusConfig.icon;

  const handleSpeak = async (text: string, target: 'user' | 'suggestion', rate: number = 0.95) => {
    if (playingTarget === target) {
      speechService.stopSpeaking();
      setPlayingTarget(null);
      return;
    }
    setPlayingTarget(target);
    await speechService.speak(text, rate);
    setPlayingTarget(null);
  };

  // Only show suggested complete correction if correct OR if attempt >= 3
  const showFullCorrection = isCorrect || evaluation.attemptNumber >= 3;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-md space-y-5 animate-in fade-in duration-300">
      {/* Top Banner: Status State & XP Reward (NO numerical score) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${isCorrect ? 'bg-emerald-50' : isAlmostThere ? 'bg-amber-50' : 'bg-rose-50'}`}>
            <StatusIcon className={`w-7 h-7 ${statusConfig.iconColor}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${statusConfig.badgeBg}`}
              >
                {statusConfig.badgeText}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-1">
              {evaluation.headline}
            </p>
          </div>
        </div>

        {/* XP Reward Badge */}
        {xpEarned > 0 && (
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#9CEE8D]/30 border border-[#61D3AB]/40 text-[#0B749C] text-xs font-extrabold shadow-xs">
            <Sparkles className="w-4 h-4 text-[#0B749C]" />
            <span>+{xpEarned} XP</span>
          </div>
        )}
      </div>

      {/* Progressive Clue Section when learner needs another try */}
      {evaluation.clue && !isCorrect && (
        <div className="bg-amber-50/80 rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                {evaluation.clue.title}
              </span>
              <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">
                Coaching Hint
              </h5>
            </div>
          </div>

          <div className="pl-10 space-y-3">
            {userSentence && (
              <div className="bg-amber-100/60 p-2.5 rounded-xl border border-amber-200 text-xs">
                <span className="font-bold text-amber-950 block mb-0.5">You said:</span>
                <span className="italic text-slate-800">&ldquo;{userSentence}&rdquo;</span>
              </div>
            )}
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              {evaluation.clue.hint}
            </p>
          </div>

          {/* What you got right vs What to fix */}
          <div className="pl-10 space-y-2 pt-1">
            {evaluation.clue.whatYouGotRight && evaluation.clue.whatYouGotRight.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  What you got right:
                </span>
                <ul className="text-xs text-emerald-800 space-y-0.5">
                  {evaluation.clue.whatYouGotRight.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {evaluation.clue.whatToFix && evaluation.clue.whatToFix.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                  What to fix:
                </span>
                <ul className="text-xs text-amber-900 space-y-0.5">
                  {evaluation.clue.whatToFix.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Coach Says Section (when correct or supplementary lesson) */}
      {evaluation.coachLesson && (isCorrect || !evaluation.clue) && (
        <div className="bg-gradient-to-r from-teal-50/90 via-sky-50/70 to-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-teal-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <MessageSquare className="w-4 h-4 text-[#9CEE8D]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B749C] block">
                Coach Says
              </span>
              <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">
                Language Takeaway
              </h5>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium pl-10">
            {evaluation.coachLesson}
          </p>
        </div>
      )}

      {/* Previous Attempt Box (Shown on retry to illustrate clear progress) */}
      {previousAttemptSentence && (
        <div className="bg-slate-100/90 rounded-xl p-3.5 border border-slate-200/80 space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Previous Attempt
          </span>
          <p className="text-xs sm:text-sm italic text-slate-600 font-medium">
            &ldquo;{previousAttemptSentence}&rdquo;
          </p>
        </div>
      )}

      {/* User's Sentence Box */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
            {previousAttemptSentence
              ? 'Current Attempt'
              : inputMethod === 'voice'
              ? 'What the System Heard'
              : 'Your Sentence'}
          </span>
          {inputMethod === 'voice' && onRetry && !isCorrect && (
            <button
              onClick={onRetry}
              className="text-[11px] font-semibold text-[#0B749C] hover:underline"
            >
              Misheard? Edit / Retry
            </button>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-900 italic leading-relaxed">
            &ldquo;{userSentence}&rdquo;
          </p>
          <button
            onClick={() => handleSpeak(userSentence, 'user')}
            className={`p-1.5 rounded-lg transition-colors shrink-0 ${
              playingTarget === 'user'
                ? 'bg-[#1FBAC0] text-white'
                : 'text-slate-600 hover:text-slate-700 hover:bg-slate-200'
            }`}
            title="Listen to your sentence"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Natural Phrasing with Audio (Shown if correct or on attempt 3) */}
      {showFullCorrection && evaluation.suggestedCorrection && (
        <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>Model Phrasing</span>
            </span>

            {/* Listen buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSpeak(evaluation.suggestedCorrection!, 'suggestion', 0.75)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors"
                title="Listen slowly (0.75x)"
              >
                <Gauge className="w-3 h-3 text-emerald-700" />
                <span>0.75x</span>
              </button>
              <button
                onClick={() => handleSpeak(evaluation.suggestedCorrection!, 'suggestion', 0.95)}
                className={`p-1 rounded-md transition-colors ${
                  playingTarget === 'suggestion'
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-800 hover:bg-emerald-100'
                }`}
                title="Listen at normal speed (1.0x)"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-sm font-semibold text-emerald-950 italic leading-relaxed">
            &ldquo;{evaluation.suggestedCorrection}&rdquo;
          </p>
        </div>
      )}

      {/* Praise / What You Did Well */}
      {evaluation.praise && evaluation.praise.length > 0 && (
        <div className="bg-emerald-50/50 rounded-xl p-3.5 border border-emerald-100 space-y-1">
          <span className="text-xs font-bold text-emerald-900 block">
            What You Did Well:
          </span>
          <ul className="space-y-1 text-xs text-emerald-800">
            {evaluation.praise.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#61D3AB] font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specific Improvements (only shown if not already in clue box) */}
      {isCorrect && evaluation.issues && evaluation.issues.length > 0 && (
        <div className="bg-amber-50/50 rounded-xl p-3.5 border border-amber-200/70 space-y-1.5">
          <span className="text-xs font-bold text-amber-900 block">
            Keep in Mind:
          </span>
          <ul className="space-y-1 text-xs text-amber-900">
            {evaluation.issues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="leading-relaxed">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Learning Dimensions (Qualitative status chips, NO numerical scores) */}
      <div>
        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Dimension Review
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { label: 'Target Vocabulary', data: evaluation.dimensions.vocabularyUsage },
            { label: 'Grammar & Tense', data: evaluation.dimensions.grammar },
            { label: 'Spelling Accuracy', data: evaluation.dimensions.spelling },
            { label: 'Sentence Structure', data: evaluation.dimensions.completeness }
          ].map((item, idx) => {
            const isPass = item.data.status === 'pass';
            const isWarning = item.data.status === 'warning';
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs leading-relaxed ${
                  isPass
                    ? 'bg-slate-50 border-slate-200'
                    : isWarning
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{item.label}</span>
                  <span
                    className={`font-semibold text-[10px] px-2 py-0.5 rounded-full ${
                      isPass
                        ? 'bg-emerald-100 text-emerald-800'
                        : isWarning
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isPass
                      ? item.label === 'Target Vocabulary'
                        ? '✓ Correct'
                        : '✓ Good'
                      : isWarning
                      ? '💡 Suggestion'
                      : '⚠️ Needs attention'}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">{item.data.message}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-2.5">
        {!isCorrect ? (
          <>
            <button
              onClick={onContinue}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Skip for Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onTryAgain}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              <span>Try Again</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onTryAgain}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
              title="Practice another sentence with this word"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>Practice Again</span>
            </button>

            <button
              onClick={onContinue}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Next Word</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
