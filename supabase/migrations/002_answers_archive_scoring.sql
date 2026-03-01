-- Procurement Paul — Supabase Schema
-- Migration: 002_answers_archive_scoring

-- ============================================================
-- ANSWER LIBRARY
-- ============================================================
CREATE TABLE public.answer_library (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  avg_score NUMERIC,
  times_used INTEGER DEFAULT 0,
  word_count INTEGER,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.answer_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own answer library"
  ON public.answer_library FOR ALL USING (auth.uid() = user_id);

CREATE TRIGGER answer_library_updated_at BEFORE UPDATE ON public.answer_library
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TENDER ARCHIVE
-- ============================================================
CREATE TABLE public.tender_archive (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  submitted_date DATE,
  outcome TEXT CHECK (outcome IN ('won','lost','pending','withdrawn')),
  contract_value NUMERIC,
  quality_score NUMERIC,
  sections_count INTEGER,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  file_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tender_archive ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own tender archive"
  ON public.tender_archive FOR ALL USING (auth.uid() = user_id);

CREATE TRIGGER tender_archive_updated_at BEFORE UPDATE ON public.tender_archive
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ARCHIVED TENDER SECTIONS (responses from past tenders)
-- ============================================================
CREATE TABLE public.archived_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  archive_id UUID REFERENCES public.tender_archive(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  ref TEXT,
  question TEXT NOT NULL,
  response TEXT,
  score NUMERIC,
  max_score NUMERIC DEFAULT 5,
  word_count INTEGER,
  evaluator_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.archived_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own archived sections"
  ON public.archived_sections FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- QUALITY SCORES (AI scoring results per section)
-- ============================================================
CREATE TABLE public.quality_scores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  tender_id UUID REFERENCES public.tenders(id) ON DELETE CASCADE,
  section_id UUID REFERENCES public.tender_sections(id) ON DELETE CASCADE,
  score NUMERIC NOT NULL,
  max_score NUMERIC DEFAULT 5,
  percentage NUMERIC,
  grade TEXT,
  summary TEXT,
  strengths TEXT[] DEFAULT '{}',
  improvements TEXT[] DEFAULT '{}',
  suggested_addition TEXT,
  criteria_scores JSONB,
  word_count INTEGER,
  scored_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quality_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own quality scores"
  ON public.quality_scores FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial','starter','professional','enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active','cancelled','past_due','trialing')),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create subscription on user signup
CREATE OR REPLACE FUNCTION create_subscription_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'trial', 'trialing');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION create_subscription_for_new_user();
