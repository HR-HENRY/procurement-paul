-- Procurement Paul — Supabase Schema
-- Migration: 001_initial_schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS / PROFILES
-- ============================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  company_name TEXT,
  email TEXT,
  plan TEXT DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view and update own profile"
  ON public.profiles FOR ALL USING (auth.uid() = id);

-- ============================================================
-- TENDERS
-- ============================================================
CREATE TABLE public.tenders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  deadline DATE,
  contract_value NUMERIC,
  tender_type TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','in_progress','review','submitted','won','lost')),
  notes TEXT,
  overall_score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own tenders"
  ON public.tenders FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- TENDER DOCUMENTS (uploaded files)
-- ============================================================
CREATE TABLE public.tender_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tender_id UUID REFERENCES public.tenders(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  filename TEXT NOT NULL,
  file_url TEXT,
  doc_type TEXT CHECK (doc_type IN ('invitation_to_tender','specification','scoring_matrix','supporting','other')),
  parsed_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tender_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own tender documents"
  ON public.tender_documents FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- TENDER SECTIONS (questions extracted from tender)
-- ============================================================
CREATE TABLE public.tender_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tender_id UUID REFERENCES public.tenders(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  ref TEXT,                          -- e.g. "Q1", "Section 4.2"
  question TEXT NOT NULL,
  specification_ref TEXT,            -- e.g. "Section 4.1 — Technical Capability"
  word_limit INTEGER,
  score_weight NUMERIC,              -- percentage weighting
  max_score NUMERIC DEFAULT 5,
  response TEXT,
  current_score NUMERIC,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','complete')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tender_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own tender sections"
  ON public.tender_sections FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- KNOWLEDGE BASE DOCUMENTS
-- ============================================================
CREATE TABLE public.knowledge_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  doc_type TEXT CHECK (doc_type IN ('profile','case_study','kpi','certificate','policy','qa_library','other')),
  content TEXT,
  file_url TEXT,
  tags TEXT[] DEFAULT '{}',
  times_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own knowledge documents"
  ON public.knowledge_documents FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- Q&A LIBRARY
-- ============================================================
CREATE TABLE public.qa_library (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  times_used INTEGER DEFAULT 0,
  avg_score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.qa_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own QA entries"
  ON public.qa_library FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- APPENDICES / EVIDENCE
-- ============================================================
CREATE TABLE public.appendices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  tender_id UUID REFERENCES public.tenders(id) ON DELETE CASCADE,
  section_id UUID REFERENCES public.tender_sections(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  appendix_ref TEXT,               -- e.g. "Appendix A"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.appendices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own appendices"
  ON public.appendices FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tenders_updated_at BEFORE UPDATE ON public.tenders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tender_sections_updated_at BEFORE UPDATE ON public.tender_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER knowledge_documents_updated_at BEFORE UPDATE ON public.knowledge_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER qa_library_updated_at BEFORE UPDATE ON public.qa_library
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- STORAGE BUCKETS (run in Supabase dashboard)
-- ============================================================
-- Create bucket: tender-documents (private)
-- Create bucket: knowledge-documents (private)
-- Create bucket: appendices (private)
