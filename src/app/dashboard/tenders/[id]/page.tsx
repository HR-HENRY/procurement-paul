"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft, Clock, Target, CheckCircle, Circle,
  Sparkles, BookOpen, Save, AlertCircle, FileText,
  BarChart3, X, Library, ChevronRight, Info, StickyNote, Search,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LibraryAnswer {
  id: string;
  question: string;
  category: string;
  tags: string[];
  avgScore: number;
  timesUsed: number;
  summary: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "q1", ref: "Q1",
    question: "Describe your organisation's experience and track record in delivering similar services. Provide specific examples with measurable outcomes.",
    specRef: "Section 4.1 — Technical Capability", wordLimit: 500, weight: 20, status: "complete",
    response: "Our organisation has over 15 years of proven experience delivering IT support services across the public sector, including NHS Trusts, local authorities and central government departments. Our most recent comparable contract, awarded by Surrey NHS Trust in 2023, delivered a 99.7% uptime rate across 2,400 endpoints, reduced average ticket resolution time by 42% (from 4.2 hours to 2.4 hours), and achieved a 96% user satisfaction rating across bi-annual surveys. We hold ISO 27001 Information Security and ISO 9001 Quality Management accreditations, both independently audited annually.",
  },
  {
    id: "q2", ref: "Q2",
    question: "Outline your methodology and approach to service delivery. How will you ensure service continuity and meet the required SLAs?",
    specRef: "Section 4.2 — Service Delivery", wordLimit: 750, weight: 25, status: "in_progress",
    response: "Our service delivery methodology is built on three core pillars: proactive monitoring, rapid response, and continuous improvement...",
  },
  {
    id: "q3", ref: "Q3",
    question: "Describe your commitment to social value and how you will deliver measurable social value outcomes for the contracting authority and the local community.",
    specRef: "Section 5.1 — Social Value", wordLimit: 400, weight: 10, status: "not_started", response: "",
  },
  {
    id: "q4", ref: "Q4",
    question: "Provide details of the qualifications, skills and experience of key personnel who will be assigned to this contract.",
    specRef: "Section 4.3 — Key Personnel", wordLimit: 500, weight: 15, status: "not_started", response: "",
  },
  {
    id: "q5", ref: "Q5",
    question: "How will you ensure quality assurance and compliance with relevant legislation, standards and the authority's policies throughout the contract?",
    specRef: "Section 6.1 — Quality & Compliance", wordLimit: 600, weight: 20, status: "not_started", response: "",
  },
];

const libraryAnswers: LibraryAnswer[] = [
  {
    id: "1", question: "Describe your organisation's experience in delivering similar contracts",
    category: "Company Experience", avgScore: 92, timesUsed: 14,
    tags: ["NHS", "ISO", "track record", "public sector", "experience"],
    summary: "15 years public sector experience. Surrey NHS Trust — 99.7% uptime, 42% faster resolution, 96% satisfaction. ISO 27001 & ISO 9001.",
  },
  {
    id: "2", question: "How will you deliver social value and measurable community outcomes?",
    category: "Social Value", avgScore: 89, timesUsed: 11,
    tags: ["TOMs", "apprenticeships", "community", "social value", "local"],
    summary: "3 apprenticeships/year, 12 digital skills workshops, 68% local supply chain. TOMs-reported. £4.20–£6.80 SV per £1 spend.",
  },
  {
    id: "3", question: "Describe your approach to quality assurance and continuous improvement",
    category: "Quality & Compliance", avgScore: 94, timesUsed: 18,
    tags: ["ISO 9001", "PDCA", "audits", "continuous improvement", "quality"],
    summary: "ISO 9001:2015 certified. Monthly audits, quarterly surveys (90%+ target), PDCA cycle. 23 improvements in last 12 months.",
  },
  {
    id: "4", question: "How will you mobilise this contract within the required timescales?",
    category: "Mobilisation", avgScore: 87, timesUsed: 9,
    tags: ["mobilisation", "transition", "TUPE", "planning", "timeline"],
    summary: "4-phase mobilisation (6 weeks). Dedicated Mobilisation Manager. 47-task checklist. All 6 recent mobilisations on time.",
  },
  {
    id: "5", question: "What qualifications and experience do your key personnel hold?",
    category: "Key Personnel", avgScore: 85, timesUsed: 7,
    tags: ["PRINCE2", "ITIL", "qualifications", "CPD", "personnel", "staff"],
    summary: "Contract Manager: PRINCE2, ITIL v4, Level 5 Mgmt, 12 years exp. All staff Level 3+, 40hrs CPD/year. 4-week contract onboarding.",
  },
  {
    id: "6", question: "How will you ensure staff wellbeing and workforce stability?",
    category: "Key Personnel", avgScore: 83, timesUsed: 5,
    tags: ["wellbeing", "staff", "retention", "workforce", "HR", "personnel"],
    summary: "Named welfare officer per contract. Monthly 1-2-1s. Flexible working. 94% staff retention rate across all contracts.",
  },
];

const allCategories = ["All", ...Array.from(new Set(libraryAnswers.map((a) => a.category)))];

function getSuggestedIds(question: string, all: LibraryAnswer[]): string[] {
  const qLower = question.toLowerCase();
  return all
    .map((a) => {
      const tagMatches = a.tags.filter((t) => qLower.includes(t.toLowerCase())).length;
      const wordMatches = a.question.toLowerCase().split(/\s+/).filter((w) => w.length > 4 && qLower.includes(w)).length;
      return { id: a.id, score: tagMatches * 2 + wordMatches };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.id);
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  complete: { label: "Complete", icon: CheckCircle, color: "text-green-500" },
  in_progress: { label: "In Progress", icon: AlertCircle, color: "text-blue-500" },
  not_started: { label: "Not Started", icon: Circle, color: "text-slate-300" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TenderDetailPage({ params }: { params: { id: string } }) {
  const [activeSection, setActiveSection] = useState("q1");
  const [responses, setResponses] = useState<Record<string, string>>(
    Object.fromEntries(sections.map((s) => [s.id, s.response]))
  );
  const [generating, setGenerating] = useState<string | null>(null);
  const [contextNotes, setContextNotes] = useState<Record<string, string>>({});
  const [selectedLibraryIds, setSelectedLibraryIds] = useState<Record<string, string[]>>({});
  const [showLibraryPanel, setShowLibraryPanel] = useState(false);
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryCategoryFilter, setLibraryCategoryFilter] = useState("All");

  const currentSection = sections.find((s) => s.id === activeSection)!;
  const wordCount = responses[activeSection]?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const wordPercent = Math.min((wordCount / currentSection.wordLimit) * 100, 100);
  const currentNotes = contextNotes[activeSection] ?? "";
  const currentSelectedIds = selectedLibraryIds[activeSection] ?? [];
  const currentSelected = libraryAnswers.filter((a) => currentSelectedIds.includes(a.id));
  const suggestedIds = getSuggestedIds(currentSection.question, libraryAnswers);
  const hasAiContext = currentNotes.trim().length > 0 || currentSelectedIds.length > 0;

  const filteredLibrary = libraryAnswers.filter((a) => {
    const matchCat = libraryCategoryFilter === "All" || a.category === libraryCategoryFilter;
    if (!librarySearch) return matchCat;
    const q = librarySearch.toLowerCase();
    return matchCat && (
      a.question.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
    );
  });

  const toggleLibraryAnswer = (id: string) => {
    setSelectedLibraryIds((prev) => {
      const current = prev[activeSection] ?? [];
      return {
        ...prev,
        [activeSection]: current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
      };
    });
  };

  const handleGenerate = (sectionId: string) => {
    setGenerating(sectionId);
    setTimeout(() => {
      const notes = contextNotes[sectionId] ?? "";
      const selectedAnswers = libraryAnswers.filter((a) => (selectedLibraryIds[sectionId] ?? []).includes(a.id));
      let generated = "Our approach to social value is embedded at every level of our service delivery. We commit to creating a minimum of 3 apprenticeship opportunities specifically for residents within the contracting authority's area during the contract term, working with local colleges and employment centres. We will deliver 12 community digital skills workshops per year, targeting economically inactive adults and those at risk of digital exclusion. Our supply chain policy prioritises SMEs and social enterprises within a 30-mile radius — currently 68% of our subcontractors meet this criterion. We report quarterly against the Social Value Act 2012 model and the TOMs framework, providing transparent, audited evidence of social value delivery.";
      if (notes) generated = `[AI briefed with your context notes]\n\n` + generated;
      if (selectedAnswers.length > 0) generated += `\n\n[Drawing on ${selectedAnswers.length} library answer${selectedAnswers.length > 1 ? "s" : ""}: ${selectedAnswers.map((a) => a.category).join(", ")}]`;
      setResponses((prev) => ({ ...prev, [sectionId]: generated }));
      setGenerating(null);
    }, 2000);
  };

  const completeCount = sections.filter((s) => s.status === "complete").length;
  const overallProgress = Math.round((completeCount / sections.length) * 100);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tenders" className="text-slate-400 hover:text-[#1e3a5f] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-[#1e3a5f] truncate">IT Support Services Framework 2026</h2>
          <p className="text-slate-400 text-sm">NHS Trust — South East · Due 15 March 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="font-medium text-amber-600">14 days left</span>
          </div>
          <button className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Save className="w-4 h-4" />
            Save Progress
          </button>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#1e3a5f]">Overall Progress</span>
          <span className="text-sm font-bold text-[#1e3a5f]">{overallProgress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full mb-3">
          <div className="h-full rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#2d5282] transition-all" style={{ width: `${overallProgress}%` }} />
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> {completeCount} complete</span>
          <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 text-blue-500" /> 1 in progress</span>
          <span className="flex items-center gap-1"><Circle className="w-3.5 h-3.5 text-slate-300" /> {sections.length - completeCount - 1} not started</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Section List */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 h-fit">
          <h3 className="font-semibold text-[#1e3a5f] text-sm mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Sections ({sections.length})
          </h3>
          {sections.map((section) => {
            const status = statusConfig[section.status] ?? statusConfig.not_started;
            const StatusIcon = status.icon;
            const sectionSelectedCount = (selectedLibraryIds[section.id] ?? []).length;
            const hasNotes = !!(contextNotes[section.id] ?? "").trim();
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all ${isActive ? "bg-[#1e3a5f] text-white" : "hover:bg-slate-50"}`}
              >
                <StatusIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? "text-white/70" : status.color}`} />
                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-bold mb-0.5 ${isActive ? "text-white/70" : "text-slate-400"}`}>
                    {section.ref} · {section.weight}%
                  </div>
                  <div className={`text-xs font-medium truncate ${isActive ? "text-white" : "text-slate-600"}`}>
                    {section.question.substring(0, 50)}...
                  </div>
                  {(sectionSelectedCount > 0 || hasNotes) && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {sectionSelectedCount > 0 && (
                        <span className={`flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-blue-100 text-blue-600"}`}>
                          <Library className="w-2.5 h-2.5" /> {sectionSelectedCount} linked
                        </span>
                      )}
                      {hasNotes && (
                        <span className={`flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-amber-100 text-amber-600"}`}>
                          <StickyNote className="w-2.5 h-2.5" /> notes
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Editor Column */}
        <div className="lg:col-span-2 space-y-4">

          {/* Section Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 bg-[#1e3a5f] text-white text-xs font-bold rounded-lg flex-shrink-0">{currentSection.ref}</span>
              <div className="flex-1">
                <p className="text-[#1e3a5f] font-medium text-sm leading-relaxed">{currentSection.question}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5 text-amber-500" /> Weight: <strong className="text-amber-600">{currentSection.weight}%</strong></span>
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Word limit: <strong>{currentSection.wordLimit}</strong></span>
                  <span>Ref: <strong>{currentSection.specRef}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* ── AI Context Panel ──────────────────────────────────────────── */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-[#1e3a5f]">AI Context</span>
                <span className="text-xs text-slate-400">— brief the AI before generating</span>
              </div>
              <button
                onClick={() => setShowLibraryPanel(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-[#1e3a5f] hover:text-[#2d5282] px-3 py-1.5 border border-[#1e3a5f]/20 rounded-lg hover:bg-[#1e3a5f]/5 transition-colors"
              >
                <Library className="w-3.5 h-3.5" />
                Link Library Answers
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Context Notes */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <StickyNote className="w-3.5 h-3.5 text-amber-500" />
                  Contract-Specific Notes
                </label>
                <textarea
                  value={currentNotes}
                  onChange={(e) => setContextNotes((prev) => ({ ...prev, [activeSection]: e.target.value }))}
                  placeholder={"Add specifics to strengthen the AI response. For example:\n• We will have 5 customer service staff working on this contract, based in Barnworth\n• Our Contract Manager will be Sarah Jones (CIPS Level 5, 10 years NHS experience)\n• We will use our Birmingham depot as the logistics base for this contract"}
                  rows={5}
                  className="w-full px-4 py-3 text-sm text-slate-700 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 resize-none placeholder:text-slate-400 leading-relaxed bg-amber-50/40"
                />
                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                  <Info className="w-3 h-3 flex-shrink-0" />
                  Include staff names, numbers, locations, certifications, and contract-specific commitments — the more detail, the better the output.
                </p>
              </div>

              {/* Linked Library Answers */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <Library className="w-3.5 h-3.5 text-blue-500" />
                    Linked Library Answers
                    <span className="font-normal text-slate-400 ml-0.5">— AI learns from these examples</span>
                  </label>
                  {currentSelected.length > 0 && (
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{currentSelected.length} linked</span>
                  )}
                </div>

                {currentSelected.length === 0 ? (
                  <button
                    onClick={() => setShowLibraryPanel(true)}
                    className="w-full flex items-center gap-3 p-3.5 border border-dashed border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/40 transition-all group text-left"
                  >
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors flex-shrink-0">
                      <Library className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-600">No library answers linked yet</p>
                      <p className="text-xs text-slate-400">Select past high-scoring answers for the AI to use as examples</p>
                    </div>
                    {suggestedIds.length > 0 && (
                      <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full border border-green-200 flex-shrink-0">
                        {suggestedIds.length} suggested
                      </span>
                    )}
                  </button>
                ) : (
                  <div className="space-y-2">
                    {currentSelected.map((answer) => (
                      <div key={answer.id} className="flex items-start gap-3 p-3.5 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">{answer.category}</span>
                            <span className="text-xs text-green-700 font-bold">★ {answer.avgScore}%</span>
                          </div>
                          <p className="text-xs text-slate-700 font-medium mb-0.5 truncate">{answer.question}</p>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{answer.summary}</p>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {answer.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded font-medium">#{tag}</span>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => toggleLibraryAnswer(answer.id)} className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0 p-1 hover:bg-red-50 rounded">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => setShowLibraryPanel(true)} className="text-xs text-[#1e3a5f] font-medium hover:underline flex items-center gap-1 mt-1">
                      <Library className="w-3 h-3" /> Add more from library
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Response Editor */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-[#1e3a5f]">Your Response</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleGenerate(currentSection.id)}
                  disabled={generating === currentSection.id}
                  className="relative flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {generating === currentSection.id ? "Generating..." : "Generate with AI"}
                  {hasAiContext && generating !== currentSection.id && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">✓</span>
                  )}
                </button>
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#1e3a5f] px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 hover:bg-slate-50 transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  Knowledge Base
                </button>
              </div>
            </div>

            {/* AI context summary bar */}
            {hasAiContext && (
              <div className="px-4 py-2 bg-green-50 border-b border-green-100 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> AI ready with:
                </span>
                {currentNotes.trim() && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">📝 Your context notes</span>
                )}
                {currentSelected.map((a) => (
                  <span key={a.id} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">📚 {a.category} ({a.avgScore}%)</span>
                ))}
              </div>
            )}

            <textarea
              value={responses[currentSection.id]}
              onChange={(e) => setResponses((prev) => ({ ...prev, [currentSection.id]: e.target.value }))}
              placeholder="Start writing here, or add context above and click 'Generate with AI' for a tailored draft..."
              className="w-full p-4 text-sm text-slate-700 leading-relaxed focus:outline-none resize-none min-h-[280px]"
            />

            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium ${wordPercent > 90 ? "text-red-500" : wordPercent > 75 ? "text-amber-500" : "text-slate-400"}`}>
                  {wordCount} / {currentSection.wordLimit} words
                </span>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full">
                  <div className={`h-full rounded-full transition-all ${wordPercent > 90 ? "bg-red-500" : wordPercent > 75 ? "bg-amber-400" : "bg-green-500"}`} style={{ width: `${wordPercent}%` }} />
                </div>
              </div>
              <button className="flex items-center gap-1.5 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors">
                <CheckCircle className="w-3.5 h-3.5" />
                Mark Complete
              </button>
            </div>
          </div>

          {/* Scoring Guidance */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">Scoring Guidance — {currentSection.ref}</span>
            </div>
            <div className="space-y-1.5 text-xs text-amber-700">
              <p>• <strong>5/5:</strong> Comprehensive, specific examples with measurable outcomes directly referenced to the specification</p>
              <p>• <strong>4/5:</strong> Good detail with examples — ensure all sub-criteria are addressed</p>
              <p>• <strong>3/5:</strong> Adequate but lacking specificity — add KPIs and named contracts</p>
              <p>• <strong>Paul tip:</strong> Always cite clause references and use the client&apos;s own language from the specification</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Library Panel Slide-over ──────────────────────────────────────── */}
      {showLibraryPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
          <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl">

            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-[#1e3a5f] text-lg flex items-center gap-2">
                  <Library className="w-5 h-5" />
                  Answer Library
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select past high-scoring answers for the AI to learn from for <strong>{currentSection.ref}</strong>
                </p>
              </div>
              <button onClick={() => setShowLibraryPanel(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Suggested banner */}
            {suggestedIds.length > 0 && (
              <div className="px-6 py-2.5 bg-green-50 border-b border-green-100 flex items-center justify-between">
                <span className="text-xs text-green-700 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {suggestedIds.length} answer{suggestedIds.length > 1 ? "s" : ""} automatically suggested based on this question
                </span>
                <button
                  onClick={() => {
                    setSelectedLibraryIds((prev) => {
                      const current = prev[activeSection] ?? [];
                      const toAdd = suggestedIds.filter((id) => !current.includes(id));
                      return { ...prev, [activeSection]: [...current, ...toAdd] };
                    });
                  }}
                  className="text-xs text-green-700 font-semibold hover:underline"
                >
                  Add all suggested
                </button>
              </div>
            )}

            {/* Search & Category Filter */}
            <div className="px-4 py-3 border-b border-slate-100 space-y-2">
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by question, tag, or category..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setLibraryCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      libraryCategoryFilter === cat
                        ? "bg-[#1e3a5f] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {filteredLibrary.map((answer) => {
                const isSelected = currentSelectedIds.includes(answer.id);
                const isSuggested = suggestedIds.includes(answer.id);
                return (
                  <div
                    key={answer.id}
                    onClick={() => toggleLibraryAnswer(answer.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#1e3a5f] bg-[#1e3a5f]/5"
                        : "border-slate-200 hover:border-[#1e3a5f]/40 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isSelected ? "bg-[#1e3a5f] text-white" : "bg-slate-100 text-slate-600"
                        }`}>
                          {answer.category}
                        </span>
                        {isSuggested && (
                          <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                            ✦ Suggested
                          </span>
                        )}
                        <span className={`text-xs font-bold ${answer.avgScore >= 90 ? "text-green-600" : answer.avgScore >= 80 ? "text-blue-600" : "text-amber-600"}`}>
                          ★ {answer.avgScore}%
                        </span>
                        <span className="text-xs text-slate-400">Used {answer.timesUsed}×</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                        isSelected ? "bg-[#1e3a5f] border-[#1e3a5f]" : "border-slate-300"
                      }`}>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-[#1e3a5f] mb-1 leading-snug">{answer.question}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{answer.summary}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {answer.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-medium">#{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
              {filteredLibrary.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <Library className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No answers found</p>
                  <p className="text-xs mt-1">Try a different search or category</p>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {currentSelectedIds.length > 0 ? (
                  <span className="text-[#1e3a5f] font-semibold">{currentSelectedIds.length} answer{currentSelectedIds.length > 1 ? "s" : ""} linked</span>
                ) : "No answers linked yet"}
              </span>
              <button
                onClick={() => setShowLibraryPanel(false)}
                className="bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}