import {
  UserProfile,
  VocabularyWord,
  UserWordProgress,
  PracticeSession,
  Milestone,
  UserMilestone,
  EnglishLevel,
  TargetImprovementArea,
  PracticeLearningStatus,
  WordMasteryState,
  HomePracticePref,
  PracticeSituationPref
} from '../types';
import { INITIAL_VOCABULARY, INITIAL_MILESTONES } from '../data/initialVocabulary';

// Storage keys
const KEY_USERS = 'vvc_users_db';
const KEY_CURRENT_USER = 'vvc_current_session_user';
const KEY_DEMO_USER = 'vvc_demo_user_profile';
const KEY_VOCABULARY = 'vvc_vocabulary_db';
const KEY_PROGRESS = 'vvc_word_progress_db';
const KEY_SESSIONS = 'vvc_practice_sessions_db';
const KEY_USER_MILESTONES = 'vvc_user_milestones_db';
const KEY_HOME_PRACTICE_PREF = 'vvc_home_practice_pref';
const KEY_DEMO_ENTERED = 'vvc_demo_mode_entered';

export const DEMO_USER_ID = 'u-demo-guest';

export function isDemoUserId(id?: string | null): boolean {
  if (!id) return false;
  return id === DEMO_USER_ID || id === 'u-demo-alex' || id === 'u-demo-1' || id === 'u-demo-learner';
}

export const DEFAULT_DEMO_USER: UserProfile = {
  id: DEMO_USER_ID,
  email: '',
  name: 'Demo Mode',
  currentLevel: 'Beginner',
  targetImprovement: 'Workplace English',
  dailyGoal: 5,
  xp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  isAdmin: false,
  isDemo: true,
  createdAt: new Date().toISOString()
};

// Helper for today's date in YYYY-MM-DD
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Check difference in calendar days between two YYYY-MM-DD strings
function getDayDifference(dateA: string, dateB: string): number {
  const d1 = new Date(dateA + 'T00:00:00');
  const d2 = new Date(dateB + 'T00:00:00');
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export class StorageService {
  constructor() {
    this.initDatabase();
  }

  private initDatabase(): void {
    if (typeof window === 'undefined') return;

    // 1. Seed vocabulary if empty
    if (!localStorage.getItem(KEY_VOCABULARY)) {
      localStorage.setItem(KEY_VOCABULARY, JSON.stringify(INITIAL_VOCABULARY));
    }

    // 2. Seed registered admin user for testing real auth / admin roles
    if (!localStorage.getItem(KEY_USERS)) {
      const adminUser: UserProfile & { passwordHash: string } = {
        id: 'u-admin-1',
        email: 'admin@vocabvoicecoach.app',
        name: 'Admin Coach',
        passwordHash: 'password123',
        currentLevel: 'Advanced',
        targetImprovement: 'Professional English',
        dailyGoal: 5,
        xp: 950,
        currentStreak: 12,
        longestStreak: 15,
        lastPracticeDate: getTodayDateString(),
        isAdmin: true,
        isDemo: false,
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
      };
      localStorage.setItem(KEY_USERS, JSON.stringify([adminUser]));
    }

    // 3. Clean fresh Demo Learner Profile without pre-seeded fake history
    const storedDemoRaw = localStorage.getItem(KEY_DEMO_USER);
    const DEMO_CLEAN_VERSION = 'vvc_demo_clean_v11';
    if (!localStorage.getItem(DEMO_CLEAN_VERSION)) {
      // Clear out legacy artificial demo sessions, progress, milestones, and reset demo user
      localStorage.setItem(KEY_DEMO_USER, JSON.stringify(DEFAULT_DEMO_USER));
      localStorage.removeItem(KEY_HOME_PRACTICE_PREF);

      const rawSessions = localStorage.getItem(KEY_SESSIONS);
      if (rawSessions) {
        try {
          const sList = JSON.parse(rawSessions).filter(
            (s: any) => !isDemoUserId(s.userId)
          );
          localStorage.setItem(KEY_SESSIONS, JSON.stringify(sList));
        } catch {}
      }

      const rawProg = localStorage.getItem(KEY_PROGRESS);
      if (rawProg) {
        try {
          const pList = JSON.parse(rawProg).filter(
            (p: any) => !isDemoUserId(p.userId)
          );
          localStorage.setItem(KEY_PROGRESS, JSON.stringify(pList));
        } catch {}
      }

      const rawMilestones = localStorage.getItem(KEY_USER_MILESTONES);
      if (rawMilestones) {
        try {
          const mList = JSON.parse(rawMilestones).filter(
            (m: any) => !isDemoUserId(m.userId)
          );
          localStorage.setItem(KEY_USER_MILESTONES, JSON.stringify(mList));
        } catch {}
      }

      localStorage.removeItem(KEY_HOME_PRACTICE_PREF);
      localStorage.setItem(DEMO_CLEAN_VERSION, 'true');
    } else if (!storedDemoRaw) {
      localStorage.setItem(KEY_DEMO_USER, JSON.stringify(DEFAULT_DEMO_USER));
    }
  }

  // ==========================================
  // AUTHENTICATION & RECRUITER DEMO MODE
  // ==========================================

  public isAuthenticated(): boolean {
    return this.getAuthenticatedUser() !== null;
  }

  public isDemoMode(): boolean {
    return !this.isAuthenticated();
  }

  public isDemoEntered(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(KEY_DEMO_ENTERED) === 'true';
  }

  public enterDemoMode(): UserProfile {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY_DEMO_ENTERED, 'true');
    }
    return this.getDemoUser();
  }

  public getAuthenticatedUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEY_CURRENT_USER);
    if (!raw) return null;
    try {
      const user: UserProfile = JSON.parse(raw);
      if (user && !user.isDemo && user.id !== DEMO_USER_ID) {
        return user;
      }
      return null;
    } catch {
      return null;
    }
  }

  public getDemoUser(): UserProfile {
    if (typeof window === 'undefined') return { ...DEFAULT_DEMO_USER };
    const raw = localStorage.getItem(KEY_DEMO_USER);
    if (!raw) {
      localStorage.setItem(KEY_DEMO_USER, JSON.stringify(DEFAULT_DEMO_USER));
      return { ...DEFAULT_DEMO_USER };
    }
    try {
      const user: UserProfile = JSON.parse(raw);
      user.id = DEMO_USER_ID;
      user.isDemo = true;
      user.isAdmin = false;
      if (!user.name || user.name === 'Alex' || user.name === 'Sample Learner' || user.name === 'Demo Learner' || user.name === 'Demo Profile') {
        user.name = 'Demo Mode';
      }

      // Streak update check
      if (user.lastPracticeDate) {
        const todayStr = getTodayDateString();
        const diff = getDayDifference(user.lastPracticeDate, todayStr);
        if (diff > 1 && user.currentStreak > 0) {
          user.currentStreak = 0;
          localStorage.setItem(KEY_DEMO_USER, JSON.stringify(user));
        }
      }
      return user;
    } catch {
      return { ...DEFAULT_DEMO_USER };
    }
  }

  /**
   * Returns current active user:
   * If a real user is authenticated -> returns that user.
   * If unauthenticated -> returns preconfigured Demo Profile with NO login barrier.
   */
  public getCurrentUser(): UserProfile {
    const authUser = this.getAuthenticatedUser();
    if (authUser) {
      if (authUser.lastPracticeDate) {
        const todayStr = getTodayDateString();
        const diff = getDayDifference(authUser.lastPracticeDate, todayStr);
        if (diff > 1 && authUser.currentStreak > 0) {
          authUser.currentStreak = 0;
          localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(authUser));
        }
      }
      return authUser;
    }
    return this.getDemoUser();
  }

  public hasDemoProgress(): boolean {
    if (typeof window === 'undefined') return false;
    const demo = this.getDemoUser();
    if (demo.xp > 0 || demo.currentStreak > 0) return true;
    const sessions = this.getPracticeSessions(DEMO_USER_ID);
    if (sessions.length > 0) return true;
    const progress = this.getUserWordProgress(DEMO_USER_ID);
    if (progress.length > 0) return true;
    const milestones = this.getUserUnlockedMilestones(DEMO_USER_ID);
    if (milestones.length > 0) return true;
    return false;
  }

  public resetDemoData(): UserProfile {
    const fresh: UserProfile = {
      ...DEFAULT_DEMO_USER,
      createdAt: new Date().toISOString()
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY_DEMO_USER, JSON.stringify(fresh));

      // 1. Clear demo sessions
      const rawSessions = localStorage.getItem(KEY_SESSIONS);
      if (rawSessions) {
        try {
          const sList: PracticeSession[] = JSON.parse(rawSessions);
          const filtered = sList.filter((s) => !isDemoUserId(s.userId));
          localStorage.setItem(KEY_SESSIONS, JSON.stringify(filtered));
        } catch {}
      }

      // 2. Clear demo word progress
      const rawProg = localStorage.getItem(KEY_PROGRESS);
      if (rawProg) {
        try {
          const pList: UserWordProgress[] = JSON.parse(rawProg);
          const filtered = pList.filter((p) => !isDemoUserId(p.userId));
          localStorage.setItem(KEY_PROGRESS, JSON.stringify(filtered));
        } catch {}
      }

      // 3. Clear demo user milestones
      const rawMilestones = localStorage.getItem(KEY_USER_MILESTONES);
      if (rawMilestones) {
        try {
          const mList: UserMilestone[] = JSON.parse(rawMilestones);
          const filtered = mList.filter((m) => !isDemoUserId(m.userId));
          localStorage.setItem(KEY_USER_MILESTONES, JSON.stringify(filtered));
        } catch {}
      }

      // 4. Reset Home Practice Preferences to default
      localStorage.removeItem(KEY_HOME_PRACTICE_PREF);
    }
    return fresh;
  }

  public getHomePracticePref(): HomePracticePref {
    if (typeof window === 'undefined') {
      return { practiceLevel: 'Beginner', situation: 'workplace' };
    }
    try {
      const raw = localStorage.getItem(KEY_HOME_PRACTICE_PREF);
      if (raw) {
        const parsed = JSON.parse(raw);
        const level: EnglishLevel =
          parsed.practiceLevel ||
          (parsed.difficulty === 'easier'
            ? 'Beginner'
            : parsed.difficulty === 'challenge'
            ? 'Advanced'
            : 'Beginner');
        const situation: PracticeSituationPref =
          parsed.situation === 'everyday' || parsed.situation === 'conversation'
            ? parsed.situation
            : 'workplace';
        return {
          practiceLevel: level,
          situation
        };
      }
    } catch {}
    return { practiceLevel: 'Beginner', situation: 'workplace' };
  }

  public saveHomePracticePref(pref: HomePracticePref): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(KEY_HOME_PRACTICE_PREF, JSON.stringify(pref));
    } catch {}
  }

  private getAllUsers(): Array<UserProfile & { passwordHash: string }> {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEY_USERS);
    return raw ? JSON.parse(raw) : [];
  }

  public register(
    email: string,
    password: string,
    name: string,
    level: EnglishLevel = 'Intermediate',
    targetImprovement: TargetImprovementArea = 'Workplace English'
  ): { user: UserProfile | null; error?: string } {
    const users = this.getAllUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { user: null, error: 'An account with this email already exists. Please log in.' };
    }

    const newUser: UserProfile & { passwordHash: string } = {
      id: 'u-' + Math.random().toString(36).substring(2, 9),
      email: email.trim().toLowerCase(),
      name: name.trim() || email.split('@')[0],
      passwordHash: password,
      currentLevel: level,
      targetImprovement,
      dailyGoal: 5,
      xp: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
      isAdmin: false,
      isDemo: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(KEY_USERS, JSON.stringify(users));

    const { passwordHash, ...profile } = newUser;
    profile.isDemo = false;
    localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(profile));
    return { user: profile };
  }

  public login(email: string, password: string): { user: UserProfile | null; error?: string } {
    const users = this.getAllUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.passwordHash === password
    );
    if (!found) {
      return { user: null, error: 'Invalid email or password. Please try again.' };
    }

    const { passwordHash, ...profile } = found;
    profile.isDemo = false;
    localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(profile));
    return { user: profile };
  }

  public logout(): void {
    localStorage.removeItem(KEY_CURRENT_USER);
  }

  public resetPassword(email: string, newPassword: string): { success: boolean; error?: string } {
    const users = this.getAllUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (idx === -1) {
      return { success: false, error: 'No account found with this email address.' };
    }
    users[idx].passwordHash = newPassword;
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
    return { success: true };
  }

  public updateUserProfile(userId: string, updates: Partial<UserProfile>): UserProfile | null {
    // If updating Demo user
    if (userId === DEMO_USER_ID || this.isDemoMode() || updates.isDemo) {
      const currentDemo = this.getDemoUser();
      const updated: UserProfile = {
        ...currentDemo,
        ...updates,
        id: DEMO_USER_ID,
        isAdmin: false, // Strictly never an admin in demo mode
        isDemo: true
      };
      localStorage.setItem(KEY_DEMO_USER, JSON.stringify(updated));
      return updated;
    }

    // Authenticated user
    const users = this.getAllUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return null;

    users[idx] = { ...users[idx], ...updates, isDemo: false };
    localStorage.setItem(KEY_USERS, JSON.stringify(users));

    const currentAuth = this.getAuthenticatedUser();
    if (currentAuth && currentAuth.id === userId) {
      const updatedProfile = { ...currentAuth, ...updates, isDemo: false };
      localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(updatedProfile));
      return updatedProfile;
    }
    return users[idx];
  }

  // VOCABULARY CRUD
  public getVocabulary(): VocabularyWord[] {
    if (typeof window === 'undefined') return INITIAL_VOCABULARY;
    const raw = localStorage.getItem(KEY_VOCABULARY);
    const stored: VocabularyWord[] = raw ? JSON.parse(raw) : INITIAL_VOCABULARY;

    // Merge missing rich fields from INITIAL_VOCABULARY if existing words lack them
    const initialMap = new Map(INITIAL_VOCABULARY.map((w) => [w.id, w]));
    let needsResave = false;

    const merged = stored.map((word) => {
      const init = initialMap.get(word.id);
      if (init) {
        let changed = false;
        const copy = { ...word };
        if (!copy.whenToUse && init.whenToUse) {
          copy.whenToUse = init.whenToUse;
          changed = true;
        }
        if ((!copy.commonMistakes || copy.commonMistakes.length === 0) && init.commonMistakes) {
          copy.commonMistakes = init.commonMistakes;
          changed = true;
        }
        if (!copy.situationPrompt && init.situationPrompt) {
          copy.situationPrompt = init.situationPrompt;
          changed = true;
        }
        if (changed) {
          needsResave = true;
          return copy;
        }
      }
      return word;
    });

    const storedIds = new Set(stored.map((w) => w.id));
    for (const initWord of INITIAL_VOCABULARY) {
      if (!storedIds.has(initWord.id)) {
        merged.push(initWord);
        needsResave = true;
      }
    }

    if (needsResave) {
      localStorage.setItem(KEY_VOCABULARY, JSON.stringify(merged));
    }

    return merged;
  }

  public getWordById(id: string): VocabularyWord | undefined {
    return this.getVocabulary().find((w) => w.id === id);
  }

  public addVocabularyWord(word: Omit<VocabularyWord, 'id'>): VocabularyWord {
    const user = this.getCurrentUser();
    if (!user?.isAdmin || user?.isDemo) {
      throw new Error('Unauthorized: Only authenticated administrators can add vocabulary words.');
    }
    const list = this.getVocabulary();
    const newWord: VocabularyWord = {
      ...word,
      id: 'w-custom-' + Date.now()
    };
    list.unshift(newWord);
    localStorage.setItem(KEY_VOCABULARY, JSON.stringify(list));
    return newWord;
  }

  public updateVocabularyWord(id: string, updates: Partial<VocabularyWord>): VocabularyWord | null {
    const user = this.getCurrentUser();
    if (!user?.isAdmin || user?.isDemo) {
      throw new Error('Unauthorized: Only authenticated administrators can update vocabulary words.');
    }
    const list = this.getVocabulary();
    const idx = list.findIndex((w) => w.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(KEY_VOCABULARY, JSON.stringify(list));
    return list[idx];
  }

  public deleteVocabularyWord(id: string): boolean {
    const user = this.getCurrentUser();
    if (!user?.isAdmin || user?.isDemo) {
      throw new Error('Unauthorized: Only authenticated administrators can delete vocabulary words.');
    }
    const list = this.getVocabulary();
    const filtered = list.filter((w) => w.id !== id);
    localStorage.setItem(KEY_VOCABULARY, JSON.stringify(filtered));
    return true;
  }

  // WEAK WORDS & PERSONALIZED REVIEW
  // Words only become weak through repeated evidence of difficulty (multiple attempts needing clues or repeating mistakes).
  // A successfully practiced word (especially independent success) recovers from weak status.
  public getWeakWords(userId: string): VocabularyWord[] {
    const progress = this.getUserWordProgress(userId);
    const weakProgress = progress.filter((p) => p.isWeak === true || p.masteryState === 'needs_review');
    const weakIds = new Set(weakProgress.map((p) => p.wordId));
    return this.getVocabulary().filter((w) => weakIds.has(w.id));
  }

  public getRecommendedPracticeWords(userId: string): VocabularyWord[] {
    const user = this.getCurrentUser();
    const vocab = this.getVocabulary();
    const progress = this.getUserWordProgress(userId);
    const progressMap = new Map(progress.map((p) => [p.wordId, p]));

    // 1. Words needing review first (needs_review or isWeak)
    const reviewWords: VocabularyWord[] = [];
    // 2. Unpracticed words matching user's level or target area
    const matchingNewWords: VocabularyWord[] = [];
    // 3. Actively practicing words
    const practicingWords: VocabularyWord[] = [];
    // 4. Other words
    const others: VocabularyWord[] = [];

    const userLevel = user?.currentLevel || 'Beginner';
    const targetArea = user?.targetImprovement || 'Workplace English';

    for (const w of vocab) {
      const p = progressMap.get(w.id);
      const mastery = p?.masteryState || (p?.status === 'mastered' ? 'mastered' : p?.isWeak ? 'needs_review' : p?.timesPracticed ? 'practicing' : undefined);

      if (mastery === 'needs_review' || p?.isWeak) {
        reviewWords.push(w);
      } else if (!p || p.timesPracticed === 0) {
        if (w.level === userLevel || w.category === targetArea) {
          matchingNewWords.push(w);
        } else {
          others.push(w);
        }
      } else if (mastery === 'practicing' || p?.status === 'learning') {
        practicingWords.push(w);
      } else {
        others.push(w);
      }
    }

    return [...reviewWords, ...matchingNewWords, ...practicingWords, ...others];
  }

  // PRACTICE SESSIONS & PROGRESS
  public getPracticeSessions(userId: string): PracticeSession[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEY_SESSIONS);
    const sessions: PracticeSession[] = raw ? JSON.parse(raw) : [];
    return sessions.filter((s) => s.userId === userId).sort((a, b) => new Date(b.practicedAt).getTime() - new Date(a.practicedAt).getTime());
  }

  public recordPracticeSession(
    userId: string,
    wordId: string,
    word: string,
    userSentence: string,
    inputMethod: 'voice' | 'text',
    rating: 'Looks good' | 'Good' | 'Almost there' | 'Try again',
    feedbackText: string,
    issues: string[],
    praise: string[],
    suggestedCorrection?: string,
    extraParams?: {
      score?: number;
      practiceMode?: 'open' | 'situation';
      situationPrompt?: string;
      coachLesson?: string;
      learningStatus?: PracticeLearningStatus;
      attemptNumber?: number;
      clueLevel?: number;
      isIndependentSuccess?: boolean;
      clueText?: string;
      scoreBreakdown?: {
        targetWord: number;
        grammar: number;
        structure: number;
        naturalness: number;
        pronunciation: number;
      };
    }
  ): { session: PracticeSession; user: UserProfile; unlockedMilestones: Milestone[]; isDailyGoalNewlyCompleted: boolean } {
    const raw = localStorage.getItem(KEY_SESSIONS);
    const sessions: PracticeSession[] = raw ? JSON.parse(raw) : [];

    const attemptNumber = extraParams?.attemptNumber || 1;
    const isCorrect = extraParams?.learningStatus ? extraParams.learningStatus === 'correct' : (rating === 'Looks good');
    const learningStatus: PracticeLearningStatus =
      extraParams?.learningStatus || (isCorrect ? 'correct' : rating === 'Almost there' ? 'almost_there' : 'needs_another_try');

    // XP System:
    // First-attempt success: +20 XP
    // Correct after 1st clue: +15 XP
    // Correct after 2nd clue: +10 XP
    // Correct after answer/review: +5 XP
    // No XP deduction for mistakes
    let xpEarned = 0;
    if (isCorrect) {
      if (attemptNumber === 1) {
        xpEarned = 20;
      } else if (attemptNumber === 2) {
        xpEarned = 15;
      } else if (attemptNumber === 3) {
        xpEarned = 10;
      } else {
        xpEarned = 5;
      }
    }

    const newSession: PracticeSession = {
      id: 's-' + Date.now(),
      userId,
      wordId,
      word,
      userSentence,
      inputMethod,
      practiceMode: extraParams?.practiceMode || 'open',
      situationPrompt: extraParams?.situationPrompt,
      learningStatus,
      attemptNumber,
      clueLevel: extraParams?.clueLevel,
      isIndependentSuccess: isCorrect && attemptNumber === 1,
      score: extraParams?.score,
      rating,
      feedbackText,
      coachLesson: extraParams?.coachLesson,
      clueText: extraParams?.clueText,
      grammarFeedback: issues.filter((i) => i.toLowerCase().includes('grammar') || i.toLowerCase().includes('verb') || i.toLowerCase().includes('agreement') || i.toLowerCase().includes('past')),
      spellingFeedback: issues.filter((i) => i.toLowerCase().includes('spelling')),
      usageFeedback: issues.filter((i) => i.toLowerCase().includes('target') || i.toLowerCase().includes('word') || i.toLowerCase().includes('discuss') || i.toLowerCase().includes('clarify')),
      suggestedCorrection,
      scoreBreakdown: extraParams?.scoreBreakdown,
      xpEarned,
      practicedAt: new Date().toISOString()
    };

    sessions.unshift(newSession);
    localStorage.setItem(KEY_SESSIONS, JSON.stringify(sessions));

    // Update user word progress & Word Mastery tracking
    const rawProg = localStorage.getItem(KEY_PROGRESS);
    const progressList: UserWordProgress[] = rawProg ? JSON.parse(rawProg) : [];
    const progIdx = progressList.findIndex((p) => p.userId === userId && p.wordId === wordId);

    const isIndependentSuccess = isCorrect && attemptNumber === 1;
    const usedClues = attemptNumber > 1;

    if (progIdx >= 0) {
      const prev = progressList[progIdx];
      const newTimes = prev.timesPracticed + 1;
      const successfulAttempts = (prev.successfulAttempts || (prev.status === 'mastered' ? 2 : 1)) + (isCorrect ? 1 : 0);
      const independentSuccesses = (prev.independentSuccesses || (prev.status === 'mastered' ? 2 : 0)) + (isIndependentSuccess ? 1 : 0);
      const attemptsWithClues = (prev.attemptsWithClues || 0) + (usedClues ? 1 : 0);

      let isWeak = prev.isWeak || false;
      if (isIndependentSuccess) {
        // Recover from weak status upon independent success!
        isWeak = false;
      } else if (!isCorrect && prev.timesPracticed >= 2 && independentSuccesses === 0) {
        // Repeated struggle without independent success
        isWeak = true;
      }

      const masteryState: WordMasteryState = isWeak
        ? 'needs_review'
        : independentSuccesses >= 2 && successfulAttempts >= 2
        ? 'mastered'
        : 'practicing';

      progressList[progIdx] = {
        ...prev,
        timesPracticed: newTimes,
        successfulAttempts,
        independentSuccesses,
        attemptsWithClues,
        lastPracticedAt: new Date().toISOString(),
        isWeak,
        masteryState,
        status: masteryState === 'mastered' ? 'mastered' : 'learning',
        lastMistakes: issues.length > 0 ? issues.slice(0, 3) : prev.lastMistakes
      };
    } else {
      const masteryState: WordMasteryState = isIndependentSuccess ? 'practicing' : (!isCorrect ? 'needs_review' : 'practicing');
      progressList.push({
        userId,
        wordId,
        status: 'learning',
        masteryState,
        timesPracticed: 1,
        successfulAttempts: isCorrect ? 1 : 0,
        independentSuccesses: isIndependentSuccess ? 1 : 0,
        attemptsWithClues: usedClues ? 1 : 0,
        lastPracticedAt: new Date().toISOString(),
        isWeak: !isCorrect,
        lastMistakes: issues.length > 0 ? issues.slice(0, 3) : []
      });
    }
    localStorage.setItem(KEY_PROGRESS, JSON.stringify(progressList));

    // Check Daily Goal & Streak Update
    const user = this.getCurrentUser();
    if (!user || user.id !== userId) {
      throw new Error('User not active');
    }

    const todayStr = getTodayDateString();
    let updatedStreak = user.currentStreak;
    let updatedLongest = user.longestStreak;

    if (!user.lastPracticeDate) {
      // First ever practice
      updatedStreak = 1;
      updatedLongest = Math.max(updatedLongest, 1);
    } else if (user.lastPracticeDate === todayStr) {
      // Already practiced today; streak is preserved
      updatedStreak = Math.max(1, user.currentStreak);
    } else {
      const diff = getDayDifference(user.lastPracticeDate, todayStr);
      if (diff === 1) {
        // Consecutive day!
        updatedStreak = user.currentStreak + 1;
        updatedLongest = Math.max(updatedLongest, updatedStreak);
      } else {
        // Streak broken
        updatedStreak = 1;
      }
    }

    // Daily Goal Check: count distinct words successfully learned today
    const todaySessions = sessions.filter(
      (s) => s.userId === userId && s.practicedAt.startsWith(todayStr)
    );
    const qualifyingTodaySessions = todaySessions.filter(
      (s) => s.learningStatus === 'correct' || s.rating === 'Looks good' || s.rating === 'Good'
    );
    const distinctWordsToday = new Set(qualifyingTodaySessions.map((s) => s.wordId)).size;
    const prevDistinctWordsToday = new Set(
      qualifyingTodaySessions.filter((s) => s.id !== newSession.id).map((s) => s.wordId)
    ).size;

    let isDailyGoalNewlyCompleted = false;
    if (prevDistinctWordsToday < user.dailyGoal && distinctWordsToday >= user.dailyGoal) {
      isDailyGoalNewlyCompleted = true;
    }

    // Update user profile with new XP and Streak
    const updatedUser = this.updateUserProfile(userId, {
      xp: user.xp + xpEarned,
      currentStreak: updatedStreak,
      longestStreak: updatedLongest,
      lastPracticeDate: todayStr
    })!;

    // Check Milestones
    const unlockedMilestones = this.checkAndUnlockMilestones(updatedUser);

    return {
      session: newSession,
      user: updatedUser,
      unlockedMilestones,
      isDailyGoalNewlyCompleted
    };
  }

  public getUserWordProgress(userId: string): UserWordProgress[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEY_PROGRESS);
    const list: UserWordProgress[] = raw ? JSON.parse(raw) : [];
    return list.filter((p) => p.userId === userId);
  }

  // MILESTONES
  public getMilestones(): Milestone[] {
    return INITIAL_MILESTONES;
  }

  public getUserUnlockedMilestones(userId: string): UserMilestone[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEY_USER_MILESTONES);
    const list: UserMilestone[] = raw ? JSON.parse(raw) : [];
    return list.filter((m) => m.userId === userId);
  }

  private checkAndUnlockMilestones(user: UserProfile): Milestone[] {
    const allMilestones = this.getMilestones();
    const userMilestones = this.getUserUnlockedMilestones(user.id);
    const unlockedIds = new Set(userMilestones.map((m) => m.milestoneId));

    const progress = this.getUserWordProgress(user.id);
    const wordsLearnedCount = progress.filter((p) => p.timesPracticed > 0).length;
    const newlyUnlocked: Milestone[] = [];

    // Categories learned
    const vocab = this.getVocabulary();

    for (const milestone of allMilestones) {
      if (unlockedIds.has(milestone.id)) continue;

      let satisfied = false;
      if (milestone.requirementType === 'words_learned') {
        satisfied = wordsLearnedCount >= milestone.requirementValue;
      } else if (milestone.requirementType === 'streak_days') {
        satisfied = user.currentStreak >= milestone.requirementValue;
      } else if (milestone.requirementType === 'xp_total') {
        satisfied = user.xp >= milestone.requirementValue;
      } else if (milestone.requirementType === 'category_mastery' && milestone.categoryRequirement) {
        const categoryWordIds = new Set(vocab.filter((w) => w.category === milestone.categoryRequirement).map((w) => w.id));
        const catLearned = progress.filter((p) => categoryWordIds.has(p.wordId) && p.timesPracticed > 0).length;
        satisfied = catLearned >= milestone.requirementValue;
      }

      if (satisfied) {
        newlyUnlocked.push(milestone);
        userMilestones.push({
          userId: user.id,
          milestoneId: milestone.id,
          unlockedAt: new Date().toISOString()
        });
      }
    }

    if (newlyUnlocked.length > 0) {
      const rawAll = localStorage.getItem(KEY_USER_MILESTONES);
      const all: UserMilestone[] = rawAll ? JSON.parse(rawAll) : [];
      all.push(...newlyUnlocked.map((m) => ({ userId: user.id, milestoneId: m.id, unlockedAt: new Date().toISOString() })));
      localStorage.setItem(KEY_USER_MILESTONES, JSON.stringify(all));

      // Record milestones without injecting rogue XP
    }

    return newlyUnlocked;
  }

  // STATS & PROGRESS OVERVIEW
  public getUserDashboardStats(userId: string) {
    const user = this.getCurrentUser();
    const progress = this.getUserWordProgress(userId);
    const sessions = this.getPracticeSessions(userId);
    const vocab = this.getVocabulary();

    const todayStr = getTodayDateString();
    const todaySessions = sessions.filter((s) => s.practicedAt.startsWith(todayStr));
    const qualifyingTodaySessions = todaySessions.filter(
      (s) => s.learningStatus === 'correct' || s.rating === 'Looks good' || s.rating === 'Good'
    );
    const todayWordsLearned = new Set(qualifyingTodaySessions.map((s) => s.wordId)).size;

    const totalWordsCount = vocab.length;
    const wordsLearned = progress.filter((p) => p.timesPracticed > 0).length;
    const wordsMastered = progress.filter((p) => p.masteryState === 'mastered' || p.status === 'mastered').length;
    const wordsNeedingReview = progress.filter((p) => p.masteryState === 'needs_review' || p.isWeak).length;
    const wordsPracticing = progress.filter(
      (p) =>
        p.timesPracticed > 0 &&
        p.masteryState !== 'mastered' &&
        p.status !== 'mastered' &&
        !p.isWeak &&
        p.masteryState !== 'needs_review'
    ).length;

    // First-attempt success rate & independent success count
    const firstAttemptSessions = sessions.filter((s) => !s.attemptNumber || s.attemptNumber === 1);
    const firstAttemptSuccessCount = firstAttemptSessions.filter(
      (s) => s.learningStatus === 'correct' || s.isIndependentSuccess || s.rating === 'Looks good' || s.rating === 'Good'
    ).length;
    const firstAttemptSuccessRate =
      firstAttemptSessions.length > 0 ? Math.round((firstAttemptSuccessCount / firstAttemptSessions.length) * 100) : 0;

    const independentSuccesses = sessions.filter(
      (s) =>
        s.isIndependentSuccess ||
        ((!s.attemptNumber || s.attemptNumber === 1) && (s.learningStatus === 'correct' || s.rating === 'Looks good'))
    ).length;

    // Current level words
    const userLevel = user?.currentLevel || 'Beginner';
    const levelWords = vocab.filter((w) => w.level === userLevel);
    const levelLearned = progress.filter((p) => {
      const w = vocab.find((item) => item.id === p.wordId);
      return w && w.level === userLevel && p.timesPracticed > 0;
    }).length;

    const levelPercent = levelWords.length > 0 ? Math.round((levelLearned / levelWords.length) * 100) : 0;

    // Category progress breakdown
    const categories: Array<{ category: string; total: number; learned: number; percent: number }> = [];
    const catMap = new Map<string, { total: number; learned: number }>();

    for (const w of vocab) {
      if (!catMap.has(w.category)) {
        catMap.set(w.category, { total: 0, learned: 0 });
      }
      catMap.get(w.category)!.total++;
    }

    for (const p of progress) {
      if (p.timesPracticed > 0) {
        const w = vocab.find((item) => item.id === p.wordId);
        if (w && catMap.has(w.category)) {
          catMap.get(w.category)!.learned++;
        }
      }
    }

    catMap.forEach((val, cat) => {
      categories.push({
        category: cat,
        total: val.total,
        learned: val.learned,
        percent: val.total > 0 ? Math.round((val.learned / val.total) * 100) : 0
      });
    });

    return {
      todayWordsLearned,
      dailyGoal: user?.dailyGoal || 5,
      totalWordsCount,
      wordsLearned,
      wordsMastered,
      wordsPracticing,
      wordsNeedingReview,
      firstAttemptSuccessRate,
      independentSuccesses,
      userLevel,
      levelWordsTotal: levelWords.length,
      levelLearned,
      levelPercent,
      categories,
      totalSessions: sessions.length
    };
  }

  // DETAILED IMPROVEMENT TRENDS & MISTAKES
  public getImprovementStats(userId: string) {
    const sessions = this.getPracticeSessions(userId);
    if (sessions.length === 0) {
      return {
        recentAverage: 0,
        historicalAverage: 0,
        delta: 0,
        grammarAccuracy: 100,
        vocabularyAccuracy: 100,
        spellingAccuracy: 100,
        recurringMistakes: [],
        totalSessionsAnalyzed: 0
      };
    }

    const recentSessions = sessions.slice(0, 5);
    const olderSessions = sessions.slice(5, 15);

    const isSessionSuccessful = (s: PracticeSession) =>
      s.learningStatus === 'correct' || (!s.learningStatus && (s.rating === 'Looks good' || s.rating === 'Good'));

    const recentCleanCount = recentSessions.filter(isSessionSuccessful).length;
    const recentAccuracy = Math.round((recentCleanCount / (recentSessions.length || 1)) * 100);
    const olderCleanCount = olderSessions.filter(isSessionSuccessful).length;
    const olderAccuracy =
      olderSessions.length > 0 ? Math.round((olderCleanCount / olderSessions.length) * 100) : recentAccuracy;

    const delta = recentAccuracy - olderAccuracy;

    // Accuracy calculations across all sessions
    const totalSessions = sessions.length;
    const grammarCleanCount = sessions.filter((s) => !s.grammarFeedback || s.grammarFeedback.length === 0).length;
    const spellingCleanCount = sessions.filter((s) => !s.spellingFeedback || s.spellingFeedback.length === 0).length;
    const vocabCleanCount = sessions.filter((s) => !s.usageFeedback || s.usageFeedback.length === 0).length;

    const grammarAccuracy = Math.round((grammarCleanCount / totalSessions) * 100);
    const spellingAccuracy = Math.round((spellingCleanCount / totalSessions) * 100);
    const vocabularyAccuracy = Math.round((vocabCleanCount / totalSessions) * 100);

    // Aggregate recurring mistakes
    const mistakeMap = new Map<string, { count: number; category: string; sampleCorrection?: string }>();

    sessions.forEach((s) => {
      (s.grammarFeedback || []).forEach((m) => {
        const key = m.trim();
        if (!mistakeMap.has(key)) {
          mistakeMap.set(key, { count: 0, category: 'Grammar', sampleCorrection: s.suggestedCorrection });
        }
        mistakeMap.get(key)!.count++;
      });
      (s.spellingFeedback || []).forEach((m) => {
        const key = m.trim();
        if (!mistakeMap.has(key)) {
          mistakeMap.set(key, { count: 0, category: 'Spelling' });
        }
        mistakeMap.get(key)!.count++;
      });
      (s.usageFeedback || []).forEach((m) => {
        const key = m.trim();
        if (!mistakeMap.has(key)) {
          mistakeMap.set(key, { count: 0, category: 'Vocabulary', sampleCorrection: s.suggestedCorrection });
        }
        mistakeMap.get(key)!.count++;
      });
    });

    const recurringMistakes = Array.from(mistakeMap.entries())
      .map(([text, data]) => ({
        text,
        count: data.count,
        category: data.category,
        sampleCorrection: data.sampleCorrection
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      recentAverage: recentAccuracy,
      historicalAverage: olderAccuracy,
      delta,
      grammarAccuracy,
      vocabularyAccuracy,
      spellingAccuracy,
      recurringMistakes,
      totalSessionsAnalyzed: totalSessions
    };
  }
}

export const storageService = new StorageService();
