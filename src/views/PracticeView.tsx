import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Shuffle, AlertCircle, Briefcase, MessageSquare } from 'lucide-react';
import { VocabularyWord, VoiceState, FeedbackEvaluation, UserProfile, Milestone } from '../types';
import { storageService } from '../services/storageService';
import { evaluateSentence } from '../services/feedbackEngine';
import { WordCard } from '../components/WordCard';
import { VoiceVisualizer } from '../components/VoiceVisualizer';
import { FeedbackCard } from '../components/FeedbackCard';
import { CelebrationModal } from '../components/CelebrationModal';

interface PracticeViewProps {
  user: UserProfile;
  selectedWordId?: string;
  onUserUpdated: (user: UserProfile) => void;
  onBackToDashboard: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  user,
  selectedWordId,
  onUserUpdated
}) => {
  const vocabulary = storageService.getVocabulary();
  const weakWords = storageService.getWeakWords(user.id);
  const weakWordIds = new Set(weakWords.map((w) => w.id));

  // Find active word
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState<'open' | 'situation'>('open');
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [evaluation, setEvaluation] = useState<FeedbackEvaluation | null>(null);
  const [lastUserSentence, setLastUserSentence] = useState<string>('');
  const [lastInputMethod, setLastInputMethod] = useState<'voice' | 'text'>('voice');
  const [previousAttemptSentence, setPreviousAttemptSentence] = useState<string>('');
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [previousMistakes, setPreviousMistakes] = useState<string[]>([]);
  const [earnedXp, setEarnedXp] = useState<number>(0);

  // Celebration modals state
  const [celebration, setCelebration] = useState<{
    show: boolean;
    type: 'daily_goal' | 'milestone';
    milestone?: Milestone;
  }>({ show: false, type: 'daily_goal' });

  // Initialize or respond to selectedWordId
  useEffect(() => {
    if (selectedWordId) {
      const idx = vocabulary.findIndex((w) => w.id === selectedWordId);
      if (idx !== -1) {
        setCurrentWordIndex(idx);
      }
    } else {
      // Default to matching Home practice preference (level + situation) for state consistency
      const pref = storageService.getHomePracticePref();
      const matchesSituation = (w: VocabularyWord): boolean => {
        if (pref.situation === 'workplace') {
          return w.category === 'Workplace English' || w.category === 'Professional Communication';
        }
        if (pref.situation === 'everyday') {
          return (
            w.category === 'Day-to-Day English' ||
            w.category === 'Travel & Situations' ||
            w.category === 'Grammar & Common Usage'
          );
        }
        if (pref.situation === 'conversation') {
          return w.category === 'Conversations & Social Situations';
        }
        return true;
      };

      const matchingCandidate = vocabulary.find(
        (w) => w.level === pref.practiceLevel && matchesSituation(w)
      );
      const recommended = storageService.getRecommendedPracticeWords(user.id);
      const target =
        matchingCandidate ||
        recommended[0] ||
        vocabulary.find((w) => w.level === user.currentLevel);

      if (target) {
        const idx = vocabulary.findIndex((w) => w.id === target.id);
        if (idx !== -1) {
          setCurrentWordIndex(idx);
        }
      }
    }
  }, [selectedWordId, user.id, user.currentLevel]);

  const activeWord: VocabularyWord = vocabulary[currentWordIndex] || vocabulary[0];
  const isWeakWord = activeWord ? weakWordIds.has(activeWord.id) : false;

  // Reset practice evaluation when moving to a new word
  const handleSelectWord = (newIndex: number) => {
    setCurrentWordIndex(newIndex);
    setEvaluation(null);
    setVoiceState('idle');
    setLastUserSentence('');
    setPreviousAttemptSentence('');
    setAttemptCount(1);
    setPreviousMistakes([]);
  };

  const handleNextWord = () => {
    const nextIdx = (currentWordIndex + 1) % vocabulary.length;
    handleSelectWord(nextIdx);
  };

  const handlePrevWord = () => {
    const prevIdx = (currentWordIndex - 1 + vocabulary.length) % vocabulary.length;
    handleSelectWord(prevIdx);
  };

  const handleShuffleWord = () => {
    const randomIdx = Math.floor(Math.random() * vocabulary.length);
    handleSelectWord(randomIdx);
  };

  // When speech recognition or text entry submits a sentence
  const handleTranscriptReady = (transcript: string, inputMethod: 'voice' | 'text') => {
    setLastUserSentence(transcript);
    setLastInputMethod(inputMethod);

    // Evaluate sentence using upgraded feedback engine with context, attempt count, and progressive clue
    const evalResult = evaluateSentence(
      transcript,
      activeWord,
      inputMethod,
      practiceMode,
      activeWord.situationPrompt,
      previousAttemptSentence || undefined,
      attemptCount
    );

    setEvaluation(evalResult);
    setVoiceState('feedback');

    // Persist to database / storage with rich metrics
    try {
      const { session, user: updatedUser, unlockedMilestones, isDailyGoalNewlyCompleted } =
        storageService.recordPracticeSession(
          user.id,
          activeWord.id,
          activeWord.word,
          transcript,
          inputMethod,
          evalResult.rating,
          evalResult.headline,
          evalResult.issues,
          evalResult.praise,
          evalResult.suggestedCorrection,
          {
            practiceMode,
            situationPrompt: practiceMode === 'situation' ? activeWord.situationPrompt : undefined,
            coachLesson: evalResult.coachLesson,
            learningStatus: evalResult.learningStatus,
            attemptNumber: attemptCount,
            clueLevel: evalResult.clue?.level,
            clueText: evalResult.clue?.hint,
            scoreBreakdown: evalResult.scoreBreakdown
          }
        );

      setEarnedXp(session.xpEarned);
      onUserUpdated(updatedUser);

      // Trigger celebration ONLY if attempt was genuinely successful (xpEarned > 0)
      if (session.xpEarned > 0) {
        if (isDailyGoalNewlyCompleted) {
          setCelebration({ show: true, type: 'daily_goal' });
        } else if (unlockedMilestones && unlockedMilestones.length > 0) {
          setCelebration({
            show: true,
            type: 'milestone',
            milestone: unlockedMilestones[0]
          });
        }
      }
    } catch (err) {
      console.error('Failed to save practice session:', err);
    }
  };

  const handleTryAgain = () => {
    // If learner was correct and wants to practice again with the same word, start a fresh attempt
    if (evaluation?.learningStatus === 'correct') {
      setPreviousAttemptSentence('');
      setPreviousMistakes([]);
      setAttemptCount(1);
    } else {
      // Preserve current sentence as previous attempt for comparison & progressive clue
      setPreviousAttemptSentence(lastUserSentence);
      setPreviousMistakes(evaluation?.issues || []);
      setAttemptCount((prev) => prev + 1);
    }
    setEvaluation(null);
    setVoiceState('idle');
  };

  return (
    <div className="max-w-[980px] w-full mx-auto space-y-5 sm:space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Top Practice Bar with Word Navigator */}
      <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevWord}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Previous word"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-slate-700">
            Word {currentWordIndex + 1} of {vocabulary.length}
          </span>
          <button
            onClick={handleNextWord}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Next word"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffleWord}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Pick a random word"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Random</span>
          </button>

          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#0B749C]/10 text-[#0B749C]">
            {activeWord.level}
          </span>
        </div>
      </div>

      {/* Weak Word Focus Alert Banner if applicable */}
      {isWeakWord && (
        <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200/90 text-amber-900 text-xs flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Targeted Weak Word Review:</span>
              <span className="ml-1 text-amber-800">
                You previously had challenges with &ldquo;{activeWord.word}&rdquo;. Practice here to master it!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mode Selector Tabs: Open Practice vs Real-Life Situation */}
      <div className="flex rounded-xl bg-slate-100 p-1">
        <button
          onClick={() => {
            setPracticeMode('open');
            setEvaluation(null);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            practiceMode === 'open'
              ? 'bg-white text-[#0B749C] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Open Practice</span>
        </button>

        <button
          onClick={() => {
            setPracticeMode('situation');
            setEvaluation(null);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            practiceMode === 'situation'
              ? 'bg-white text-[#0B749C] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Real-Life Situation</span>
        </button>
      </div>

      {/* Step 1: Learn The Word Card */}
      <WordCard word={activeWord} />

      {/* Step 2: Voice Interaction or Feedback Hero */}
      {!evaluation ? (
        <VoiceVisualizer
          targetWord={activeWord.word}
          voiceState={voiceState}
          practiceMode={practiceMode}
          situationPrompt={activeWord.situationPrompt}
          initialSentence={previousAttemptSentence}
          previousMistakes={previousMistakes}
          onTranscriptReady={handleTranscriptReady}
          onStateChange={setVoiceState}
        />
      ) : (
        <FeedbackCard
          evaluation={evaluation}
          userSentence={lastUserSentence}
          word={activeWord}
          xpEarned={earnedXp}
          inputMethod={lastInputMethod}
          previousAttemptSentence={previousAttemptSentence}
          onRetry={handleTryAgain}
          onTryAgain={handleTryAgain}
          onContinue={handleNextWord}
        />
      )}

      {/* Celebration Modal (Confetti + XP) */}
      {celebration.show && (
        <CelebrationModal
          type={celebration.type}
          milestone={celebration.milestone}
          onClose={() => setCelebration({ show: false, type: 'daily_goal' })}
        />
      )}
    </div>
  );
};
