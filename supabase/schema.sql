-- ====================================================================
-- SkillSync Supabase Database Schema
-- Run this script in the Supabase Dashboard -> SQL Editor -> New Query
-- ====================================================================

-- 1. PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'Member User',
  sector_preference TEXT DEFAULT 'it',
  target_exam TEXT DEFAULT 'Full Stack Engineering',
  avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  readiness_score NUMERIC DEFAULT 75,
  is_admin BOOLEAN DEFAULT FALSE,
  admin_role TEXT DEFAULT NULL,
  system_privileges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TEST HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.test_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  score TEXT NOT NULL,
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  wrong_answers INTEGER DEFAULT 0,
  category TEXT DEFAULT 'general',
  time_taken TEXT,
  status TEXT DEFAULT 'Completed',
  topics JSONB DEFAULT '[]'::jsonb,
  strengths TEXT,
  recommendation TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. MOCK INTERVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.mock_interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  score TEXT,
  focus_area TEXT,
  duration TEXT,
  integrity_score TEXT DEFAULT '100% Clean',
  questions_count INTEGER DEFAULT 0,
  remarks TEXT,
  transcript JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. SAVED JOBS / BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.saved_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  job_identifier TEXT NOT NULL,
  title TEXT NOT NULL,
  organization TEXT,
  level TEXT,
  vacancies TEXT,
  salary TEXT,
  last_date TEXT,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, job_identifier)
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Test History Policies
CREATE POLICY "Users can view their own test history"
  ON public.test_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert test results"
  ON public.test_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their test history"
  ON public.test_history FOR DELETE
  USING (auth.uid() = user_id);

-- Mock Interviews Policies
CREATE POLICY "Users can view their own mock interviews"
  ON public.mock_interviews FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert mock interview results"
  ON public.mock_interviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their mock interview results"
  ON public.mock_interviews FOR DELETE
  USING (auth.uid() = user_id);

-- Saved Jobs Policies
CREATE POLICY "Users can view their saved jobs"
  ON public.saved_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert saved jobs"
  ON public.saved_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their saved jobs"
  ON public.saved_jobs FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- When a user registers through Supabase Auth, auto-create a profile row
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role, sector_preference, is_admin, admin_role, system_privileges)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    CASE 
      WHEN NEW.email IN ('msameer8151@gmail.com', 'admin@skillsync.ai') OR (NEW.raw_user_meta_data->>'is_admin')::boolean = true
      THEN 'Platform Super Administrator'
      ELSE COALESCE(NEW.raw_user_meta_data->>'role', 'Member User')
    END,
    CASE
      WHEN NEW.email IN ('msameer8151@gmail.com', 'admin@skillsync.ai') OR (NEW.raw_user_meta_data->>'is_admin')::boolean = true
      THEN 'all'
      ELSE COALESCE(NEW.raw_user_meta_data->>'sector_preference', 'it')
    END,
    CASE
      WHEN NEW.email IN ('msameer8151@gmail.com', 'admin@skillsync.ai') OR (NEW.raw_user_meta_data->>'is_admin')::boolean = true
      THEN TRUE
      ELSE FALSE
    END,
    CASE
      WHEN NEW.email IN ('msameer8151@gmail.com', 'admin@skillsync.ai') OR (NEW.raw_user_meta_data->>'is_admin')::boolean = true
      THEN 'super_admin'
      ELSE NULL
    END,
    CASE
      WHEN NEW.email IN ('msameer8151@gmail.com', 'admin@skillsync.ai') OR (NEW.raw_user_meta_data->>'is_admin')::boolean = true
      THEN '["manage_jobs", "manage_tests", "manage_users", "system_config", "ai_settings"]'::jsonb
      ELSE '[]'::jsonb
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    is_admin = EXCLUDED.is_admin,
    admin_role = EXCLUDED.admin_role,
    system_privileges = EXCLUDED.system_privileges;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- 5. TARGET ROLES CATALOG TABLE (Optional: For API / Database sync)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.target_roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  domain TEXT,
  required_skills JSONB DEFAULT '[]'::jsonb,
  nice_to_have JSONB DEFAULT '[]'::jsonb,
  roadmap JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable public read access for target roles
ALTER TABLE public.target_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view target roles"
  ON public.target_roles FOR SELECT
  USING (true);

-- ====================================================================
-- 6. ADMINISTRATOR RECORD SEED & VERIFICATION (msameer8151@gmail.com)
-- ====================================================================
-- Demote any previous test accounts from administrator role
UPDATE public.profiles
SET 
  is_admin = FALSE,
  role = 'Member User',
  admin_role = NULL,
  system_privileges = '[]'::jsonb
WHERE email IN ('mohammad@skillsync.ai', 'admin@skillsync.ai');

-- Promote msameer8151@gmail.com to Platform Super Administrator
UPDATE public.profiles
SET 
  name = COALESCE(name, 'Sameer (Administrator)'),
  role = 'Platform Super Administrator',
  sector_preference = 'all',
  target_exam = 'System Administration & Content Management',
  is_admin = TRUE,
  admin_role = 'super_admin',
  system_privileges = '["manage_jobs", "manage_tests", "manage_users", "system_config", "ai_settings"]'::jsonb,
  readiness_score = 100
WHERE email = 'msameer8151@gmail.com';

UPDATE auth.users
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"is_admin": true, "role": "Platform Super Administrator"}'::jsonb
WHERE email = 'msameer8151@gmail.com';



