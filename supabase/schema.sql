-- ==============================================================================
-- Vocab Voice Coach - Supabase / PostgreSQL Database Schema & Migration
-- ==============================================================================
-- This schema supports user profiles, curated vocabulary, practice sessions,
-- streaks, daily goals, XP rewards, and milestones with Row Level Security (RLS).
-- ==============================================================================

-- 1. PROFILES TABLE (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  current_level TEXT NOT NULL DEFAULT 'Intermediate',
  target_improvement TEXT NOT NULL DEFAULT 'Workplace English',
  daily_goal INTEGER NOT NULL DEFAULT 5,
  xp INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_practice_date DATE,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. VOCABULARY TABLE
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id TEXT PRIMARY KEY,
  word TEXT NOT NULL,
  meaning TEXT NOT NULL,
  simple_explanation TEXT NOT NULL,
  part_of_speech TEXT NOT NULL,
  pronunciation TEXT NOT NULL,
  example1 TEXT NOT NULL,
  example2 TEXT NOT NULL,
  level TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty INTEGER NOT NULL DEFAULT 1,
  related_words TEXT[] DEFAULT '{}',
  common_usage_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on vocabulary
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vocabulary is readable by all authenticated users"
  ON public.vocabulary FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can insert or update vocabulary"
  ON public.vocabulary FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- 3. USER WORD PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_word_progress (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_id TEXT NOT NULL REFERENCES public.vocabulary(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'learning', 'mastered'
  times_practiced INTEGER NOT NULL DEFAULT 0,
  last_practiced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  best_score NUMERIC(4, 1) NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, word_id)
);

ALTER TABLE public.user_word_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own word progress"
  ON public.user_word_progress FOR ALL
  USING (auth.uid() = user_id);

-- 4. PRACTICE SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_id TEXT NOT NULL,
  word TEXT NOT NULL,
  user_sentence TEXT NOT NULL,
  input_method TEXT NOT NULL, -- 'voice' | 'text'
  score NUMERIC(4, 1) NOT NULL,
  rating TEXT NOT NULL,
  feedback_text TEXT NOT NULL,
  suggested_correction TEXT,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  practiced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own practice sessions"
  ON public.practice_sessions FOR ALL
  USING (auth.uid() = user_id);

-- 5. MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.milestones (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  category_requirement TEXT,
  xp_reward INTEGER NOT NULL DEFAULT 100
);

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Milestones readable by everyone"
  ON public.milestones FOR SELECT
  USING (true);

-- 6. USER MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.user_milestones (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  milestone_id TEXT NOT NULL REFERENCES public.milestones(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, milestone_id)
);

ALTER TABLE public.user_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and insert own unlocked milestones"
  ON public.user_milestones FOR ALL
  USING (auth.uid() = user_id);
