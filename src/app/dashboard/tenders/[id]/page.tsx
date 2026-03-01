"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  Target,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Save,
  AlertCircle,
  FileText,
  BarChart3,
} from "lucide-react";

const sections = [
  {
    id: "q1",
    ref: "Q1",
    question: "Describe your organisation's experience and track record in delivering similar services. Provide specific examples with measurable outcomes.",
    specRef: "Section 4.1 — Technical Capability",
    wordLimit: 500,
    weight: 20,
    status: "complete",
    response: "Our organisation has over 15 years of proven experience delivering IT support services across the public sector, including NHS Trusts, local authorities and central government departments. Our most recent comparable contract, awarded by Surrey NHS Trust in 2023, delivered a 99.7% uptime rate across 2,400 endpoints, reduced average ticket resolution time by 42% (from 4.2 hours to 2.4 hours), and achieved a 96% user satisfaction rating across bi-annual surveys. We hold ISO 27001 Information Security and ISO 9001 Quality Management accreditations, both independently audited annually. Our dedicated public sector team of 34 engineers is ITIL v4 certified, ensuring best-practice service delivery aligned to the contracting authority's expectations. We have successfully mobilised six contracts of comparable scale within the past three years, each delivered on time and within budget, as evidenced in the case studies provided at Appendix A.",
  },
  {
    id: "q2",
    ref: "Q2",
    question: "Outline your methodology and approach to service delivery. How will you ensure service continuity and meet the required SLAs?",
    specRef: "Section 4.2 — Service Delivery",
    wordLimit: 750,
    weight: 25,
    status: "in_progress",
    response: "Our service delivery methodology is built on three core pillars: proactive monitoring, rapid response, and continuous improvement...",
  },
  {
    id: "q3",
    ref: "Q3",
    question: "Describe your commitment to social value and how you will deliver measurable social value outcomes for the contracting authority and the local community.",
    specRef: "Section 5.1 — Social Value",
    wordLimit: 400,
    weight: 10,
    status: "not_started",
    response: "",
  },
  {
    id: "q4",
    ref: "Q4",
    question: "Provide details of the qualifications, skills and experience of key personnel who will be assigned to this contract.",
    specRef: "Section 4.3 — Key Personnel",
    wordLimit: 500,
    weight: 15,
    status: "not_started",
    response: "",
  },
  {
    id: "q5",
    ref: "Q5",
    question: "How will you ensure quality assurance and compliance with relevant legislation, standards and the authority's policies throughout the contract?",
    specRef: "Section 6.1 — Quality & Compliance",
    wordLimit: 600,
    weight: 20,
    status: "not_started",
    response: "",
  },
];

const statusConfig = {
  complete: { label: "Complete", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  in_progress: { label: "In Progress", icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50" },
  not_started: { label: "Not Started", icon: Circle, color: "text-slate-300", bg: "bg-slate-50" },
};

export default function TenderDetailPage({ params }: { params: { id: string } }) {
  const [activeSection, setActiveSection] = useState("q1");
  const [responses, setResponses] = useState<Record<string, string>>(
    Object.fromEntries(sections.map((s) => [s.id, s.response]))
  );
  const [generating, setGenerating] = useState<string | null>(null);

  const currentSection = sections.find((s) => s.id === activeSection)!;
  const wordCount = responses[activeSection]?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const wordPercent = Math.min((wordCount / currentSection.wordLimit) * 100, 100);

  const handleGenerate = (sectionId: string) => {
    setGenerating(sectionId);
    setTimeout(() => {
      setResponses((prev) => ({
        ...prev,
        [sectionId]:
          "Our approach to social value is embedded at every level of our service delivery. We commit to creating a minimum of 3 apprenticeship opportunities specifically for residents within the contracting authority's area during the contract term, working with local colleges and employment centres. We will deliver 12 community digital skills workshops per year, targeting economically inactive adults and those at risk of digital exclusion. Our supply chain policy prioritises SMEs and social enterprises within a 30-mile radius — currently 68% of our subcontractors meet this criterion. We report quarterly against the Social Value Act 2012 model and the TOMs (Themes, Outcomes and Measures) framework, providing transparent, audited evidence of social value delivery. In our existing contracts, our social value commitments have consistently delivered between £4.20 and £6.80 of social value for every £1 of contract value spent.",
      }));
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
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
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
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#2d5282] transition-all"
            style={{ width: `${overallProgress}%` }}
          />
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
            const status = statusConfig[section.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? "bg-[#1e3a5f] text-white"
                    : "hover:bg-slate-50"
                }`}
              >
                <StatusIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${activeSection === section.id ? "text-white/70" : status.color}`} />
                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-bold mb-0.5 ${activeSection === section.id ? "text-white/70" : "text-slate-400"}`}>
                    {section.ref} · {section.weight}%
                  </div>
                  <div className={`text-xs font-medium truncate ${activeSection === section.id ? "text-white" : "text-slate-600"}`}>
                    {section.question.substring(0, 50)}...
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Section Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="px-2.5 py-1 bg-[#1e3a5f] text-white text-xs font-bold rounded-lg flex-shrink-0">
                {currentSection.ref}
              </span>
              <div className="flex-1">
                <p className="text-[#1e3a5f] font-medium text-sm leading-relaxed">
                  {currentSection.question}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-amber-500" />
                    Weight: <strong className="text-amber-600">{currentSection.weight}%</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    Word limit: <strong>{currentSection.wordLimit}</strong>
                  </span>
                  <span>Ref: <strong>{currentSection.specRef}</strong></span>
                </div>
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
                  className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {generating === currentSection.id ? "Generating..." : "Generate with AI"}
                </button>
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#1e3a5f] px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 hover:bg-slate-50 transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  Knowledge Base
                </button>
              </div>
            </div>
            <textarea
              value={responses[currentSection.id]}
              onChange={(e) => setResponses((prev) => ({ ...prev, [currentSection.id]: e.target.value }))}
              placeholder="Start writing your response here, or click 'Generate with AI' to get a draft..."
              className="w-full p-4 text-sm text-slate-700 leading-relaxed focus:outline-none resize-none min-h-[280px]"
            />
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium ${wordPercent > 90 ? "text-red-500" : wordPercent > 75 ? "text-amber-500" : "text-slate-400"}`}>
                  {wordCount} / {currentSection.wordLimit} words
                </span>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full">
                  <div
                    className={`h-full rounded-full transition-all ${wordPercent > 90 ? "bg-red-500" : wordPercent > 75 ? "bg-amber-400" : "bg-green-500"}`}
                    style={{ width: `${wordPercent}%` }}
                  />
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
              <p>• <strong>Paul tip:</strong> Always cite clause references (e.g. &quot;as per Section 4.1&quot;) and use the client&apos;s own language from the specification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
