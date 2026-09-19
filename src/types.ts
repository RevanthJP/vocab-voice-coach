export type EnglishLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type PracticeSituationPref = 'workplace' | 'everyday' | 'conversation';

export interface HomePracticePref {
  practiceLevel: EnglishLevel;
  situation: PracticeSituationPref;
}

export type VocabularyCategory =
  | 'Grammar & Common Usage'
  | 'Day-to-Day English'
  | 'Workplace English'
  | 'Conversations & Social Situations'
  | 'Travel & Situations'
  | 'Professional Communication';

export type TargetImprovementArea =
  | 'Everyday English'
  | 'Workplace English'
  | 'Grammar & Usage'
  | 'Conversation'
  | 'Professional English';

export interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  simpleExplanation: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrasal verb' | 'idiom';
  pronunciation: string; // e.g. "/ˈklær.ɪ.faɪ/"
  example1: string;
  example2: string;
  level: EnglishLevel;
  category: VocabularyCategory;
  difficulty: 1 | 2 | 3;
  relatedWords?: string[];
  commonUsageNotes?: string;
  whenToUse?: string; // "When You'd Use It" contextual guidance
  commonMistakes?: string[]; // "Common Mistakes to Avoid"
  situationPrompt?: string; // Real-life situation prompt
  createdAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  currentLevel: EnglishLevel;
  targetImprovement: TargetImprovementArea;
  targetImprovementAreas?: TargetImprovementArea[]; // Supports multiple target improvement areas
  dailyGoal: number; // 5, 10, or 15 words
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null; // YYYY-MM-DD
  isAdmin?: boolean;
  isDemo?: boolean;
  createdAt: string;
}

export type WordMasteryState = 'mastered' | 'practicing' | 'needs_review';
export type PracticeLearningStatus = 'correct' | 'almost_there' | 'needs_another_try';

export interface UserWordProgress {
  userId: string;
  wordId: string;
  status: 'new' | 'learning' | 'mastered';
  masteryState?: WordMasteryState; // 'mastered' | 'practicing' | 'needs_review'
  timesPracticed: number;
  successfulAttempts?: number;
  independentSuccesses?: number;
  attemptsWithClues?: number;
  practicedModes?: ('open' | 'situation')[];
  lastPracticedAt: string;
  bestScore?: number;
  averageScore?: number;
  isWeak?: boolean; // Flagged as weak word requiring review
  lastMistakes?: string[];
}

export interface PracticeSession {
  id: string;
  userId: string;
  wordId: string;
  word: string;
  userSentence: string;
  inputMethod: 'voice' | 'text';
  practiceMode?: 'open' | 'situation';
  situationPrompt?: string;
  learningStatus?: PracticeLearningStatus; // 'correct' | 'almost_there' | 'needs_another_try'
  attemptNumber?: number;
  clueLevel?: number;
  isIndependentSuccess?: boolean;
  score?: number; // Internal legacy; NEVER shown to learner
  rating: 'Looks good' | 'Good' | 'Almost there' | 'Try again';
  feedbackText: string;
  coachLesson?: string;
  clueText?: string;
  grammarFeedback: string[];
  spellingFeedback: string[];
  usageFeedback: string[];
  suggestedCorrection?: string;
  scoreBreakdown?: {
    targetWord: number;
    grammar: number;
    structure: number;
    naturalness: number;
    pronunciation: number;
  };
  xpEarned: number;
  practicedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  iconName: string;
  requirementType: 'words_learned' | 'streak_days' | 'xp_total' | 'category_mastery';
  requirementValue: number;
  categoryRequirement?: VocabularyCategory;
  xpReward: number;
}

export interface UserMilestone {
  userId: string;
  milestoneId: string;
  unlockedAt: string;
}

export type FeedbackSeverity = 'error' | 'suggestion' | 'alternative';

export interface FeedbackItem {
  severity: FeedbackSeverity; // 'error' = definite mistake, 'suggestion' = better flow/naturalness, 'alternative' = valid phrasing
  category: 'vocabulary' | 'grammar' | 'spelling' | 'structure' | 'naturalness' | 'context';
  message: string;
  originalSnippet?: string;
  correctedSnippet?: string;
  ruleExplanation?: string;
}

export interface ClueInfo {
  level: 1 | 2 | 3; // 1 = conceptual clue, 2 = guided clue, 3 = answer & model sentence
  title: string; // e.g. "💡 Clue", "💡 Guided Clue", "💡 Model Sentence"
  hint: string;
  whatYouGotRight?: string[];
  whatToFix?: string[];
}

export interface FeedbackEvaluation {
  learningStatus: PracticeLearningStatus; // 'correct' | 'almost_there' | 'needs_another_try'
  rating: 'Looks good' | 'Good' | 'Almost there' | 'Try again';
  headline: string;
  coachLesson: string; // Compact summary of the single most useful lesson
  usedTargetWord: boolean;
  targetWordVariantFound?: string;
  clue?: ClueInfo;
  attemptNumber: number;
  scoreBreakdown?: {
    targetWord: number;
    grammar: number;
    structure: number;
    naturalness: number;
    pronunciation: number;
  };
  dimensions: {
    vocabularyUsage: { status: 'pass' | 'warning' | 'fail'; score?: number; message: string };
    grammar: { status: 'pass' | 'warning' | 'fail'; score?: number; message: string };
    spelling: { status: 'pass' | 'warning' | 'fail'; score?: number; message: string };
    completeness: { status: 'pass' | 'warning' | 'fail'; score?: number; message: string };
    naturalness: { status: 'pass' | 'warning' | 'fail'; score?: number; message: string };
    contextFit?: { status: 'pass' | 'warning' | 'fail'; message: string };
  };
  feedbackItems: FeedbackItem[];
  issues: string[];
  praise: string[];
  suggestedCorrection?: string;
  explanation: string;
  previousAttemptComparison?: {
    improved: boolean;
    changesPraise: string[];
  };
  overallScore?: number;
}

export type VoiceState = 'idle' | 'listening' | 'processing' | 'feedback';

