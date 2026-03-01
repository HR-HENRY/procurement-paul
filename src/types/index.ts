export interface Tender {
  id: string;
  title: string;
  client: string;
  deadline: string;
  status: "draft" | "in_progress" | "review" | "submitted" | "won" | "lost";
  value?: number;
  score?: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface TenderSection {
  id: string;
  tender_id: string;
  question: string;
  specification_ref: string;
  word_limit?: number;
  score_weight?: number;
  response?: string;
  score?: number;
  status: "not_started" | "in_progress" | "complete";
}

export interface CompanyDocument {
  id: string;
  name: string;
  type: "profile" | "case_study" | "kpi" | "certificate" | "policy" | "qa_library";
  content?: string;
  file_url?: string;
  tags: string[];
  created_at: string;
  user_id: string;
}

export interface QAEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  times_used: number;
  avg_score?: number;
  created_at: string;
  user_id: string;
}

export interface ScoringMatrix {
  id: string;
  tender_id: string;
  criteria: ScoringCriteria[];
}

export interface ScoringCriteria {
  ref: string;
  description: string;
  weight: number;
  max_score: number;
  current_score?: number;
}
