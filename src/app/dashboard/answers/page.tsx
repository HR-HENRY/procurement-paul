"use client";

import { useState } from "react";
import {
  MessageSquare, Plus, Search, Tag, Filter,
  ThumbsUp, Clock, Star, Upload, X, ChevronDown,
  BookOpen, Copy, Edit3, Trash2, TrendingUp,
} from "lucide-react";

const categories = [
  "All", "Company Experience", "Methodology", "Social Value",
  "Quality & Compliance", "Key Personnel", "Mobilisation",
  "Innovation", "Pricing", "Safeguarding", "Health & Safety",
  "Environmental", "Equality & Diversity", "TUPE",
];

const answers = [
  {
    id: "1",
    question: "Describe your organisation's experience in delivering similar contracts",
    answer: "Our organisation has over 15 years of proven experience delivering services across the public sector. Our most recent comparable contract, awarded by Surrey NHS Trust in 2023, delivered a 99.7% uptime rate, reduced ticket resolution time by 42%, and achieved a 96% user satisfaction rating. We hold ISO 27001 and ISO 9001 accreditations, both independently audited annually.",
    category: "Company Experience",
    tags: ["NHS", "ISO", "track record", "public sector"],
    avgScore: 92,
    timesUsed: 14,
    lastUsed: "2026-02-20",
    wordCount: 78,
  },
  {
    id: "2",
    question: "How will you deliver social value and measurable community outcomes?",
    answer: "Our social value commitment is embedded at every level of service delivery. We commit to creating 3 apprenticeship opportunities for local residents per year, delivering 12 digital skills workshops targeting economically inactive adults, and maintaining a supply chain that prioritises local SMEs (currently 68% of subcontractors). We report quarterly against the TOMs framework, consistently delivering £4.20–£6.80 of social value per £1 of contract spend.",
    category: "Social Value",
    tags: ["TOMs", "apprenticeships", "community", "social value"],
    avgScore: 89,
    timesUsed: 11,
    lastUsed: "2026-02-15",
    wordCount: 82,
  },
  {
    id: "3",
    question: "Describe your approach to quality assurance and continuous improvement",
    answer: "Our ISO 9001:2015 certified quality management system underpins all service delivery. We conduct monthly internal audits, quarterly client satisfaction surveys (target: 90%+ satisfaction), and bi-annual external audits. Our continuous improvement cycle follows the Plan-Do-Check-Act methodology, with all corrective actions tracked in our CRM and reviewed at monthly management meetings. In the last 12 months, we implemented 23 process improvements identified through this system.",
    category: "Quality & Compliance",
    tags: ["ISO 9001", "PDCA", "audits", "continuous improvement"],
    avgScore: 94,
    timesUsed: 18,
    lastUsed: "2026-02-28",
    wordCount: 89,
  },
  {
    id: "4",
    question: "How will you mobilise this contract within the required timescales?",
    answer: "Our mobilisation plan follows a proven 4-phase approach: Planning (weeks 1–2), Resourcing (weeks 2–3), Implementation (weeks 3–5), and Go-Live (week 6). We appoint a dedicated Mobilisation Manager for every new contract, supported by our Operations Director. Our mobilisation checklist covers 47 discrete tasks across HR, IT, compliance, and service setup. In our last six contract mobilisations, all were delivered on time or ahead of schedule.",
    category: "Mobilisation",
    tags: ["mobilisation", "transition", "TUPE", "planning"],
    avgScore: 87,
    timesUsed: 9,
    lastUsed: "2026-01-30",
    wordCount: 94,
  },
  {
    id: "5",
    question: "What qualifications and experience do your key personnel hold?",
    answer: "Our Contract Manager holds PRINCE2 Practitioner, ITIL v4 Foundation, and a Level 5 Management qualification with 12 years of public sector contract management experience. All operational staff hold minimum Level 3 qualifications relevant to their roles and complete 40 hours of CPD annually. Our dedicated training academy ensures all team members are upskilled on contract-specific requirements within the first 4 weeks of mobilisation.",
    category: "Key Personnel",
    tags: ["PRINCE2", "ITIL", "qualifications", "CPD", "personnel"],
    avgScore: 85,
    timesUsed: 7,
    lastUsed: "2026-02-10",
    wordCount: 87,
  },
];

export default function AnswersPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const filtered = answers.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = !search || a.question.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Answer Library</h2>
          <p className="text-slate-500 text-sm mt-1">Your bank of high-scoring answers — reuse and improve over time</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import Answers
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Answer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Answers", value: "47", icon: MessageSquare, color: "bg-blue-50 text-blue-600" },
          { label: "Avg Score", value: "89%", icon: Star, color: "bg-amber-50 text-amber-600" },
          { label: "Times Reused", value: "183", icon: TrendingUp, color: "bg-green-50 text-green-600" },
          { label: "Categories", value: "12", icon: Tag, color: "bg-purple-50 text-purple-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#1e3a5f]">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-6">
        {/* Category Sidebar */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-[#1e3a5f] text-sm mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat
                      ? "bg-[#1e3a5f] text-white font-medium"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Answers List */}
        <div className="flex-1 space-y-4">
          {/* Search */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search answers by question or tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              Sort by Score
            </button>
          </div>

          {filtered.map((answer) => (
            <div key={answer.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                        {answer.category}
                      </span>
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                        answer.avgScore >= 90 ? "bg-green-100 text-green-700" :
                        answer.avgScore >= 80 ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        ★ {answer.avgScore}% avg score
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#1e3a5f] text-sm leading-relaxed">
                      {answer.question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button className="p-1.5 text-slate-400 hover:text-[#1e3a5f] hover:bg-slate-100 rounded-lg transition-colors" title="Copy">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-[#1e3a5f] hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Answer preview */}
                <div className={`text-sm text-slate-600 leading-relaxed ${expandedId === answer.id ? "" : "line-clamp-2"}`}>
                  {answer.answer}
                </div>
                <button
                  onClick={() => setExpandedId(expandedId === answer.id ? null : answer.id)}
                  className="text-xs text-[#1e3a5f] font-medium mt-1 hover:underline flex items-center gap-1"
                >
                  {expandedId === answer.id ? "Show less" : "Read full answer"}
                  <ChevronDown className={`w-3 h-3 transition-transform ${expandedId === answer.id ? "rotate-180" : ""}`} />
                </button>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {answer.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 flex-shrink-0 ml-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      Used {answer.timesUsed}×
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {answer.lastUsed}
                    </span>
                    <span>{answer.wordCount} words</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload/Add Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-bold text-[#1e3a5f] text-lg">Add Answer to Library</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Question</label>
                <textarea rows={2} placeholder="The tender question this answer responds to..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Answer</label>
                <textarea rows={5} placeholder="Paste your high-scoring answer here..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
                    {categories.slice(1).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Score Achieved (%)</label>
                  <input type="number" min="0" max="100" placeholder="e.g. 90" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {newTags.map((t) => (
                    <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      #{t}
                      <button onClick={() => setNewTags((prev) => prev.filter((x) => x !== t))}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && tagInput.trim()) {
                        setNewTags((prev) => [...prev, tagInput.trim()]);
                        setTagInput("");
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                  />
                  <button
                    onClick={() => { if (tagInput.trim()) { setNewTags((prev) => [...prev, tagInput.trim()]); setTagInput(""); } }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">Press Enter or click Add to add each tag</p>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2.5 bg-[#1e3a5f] hover:bg-[#2d5282] text-white rounded-lg text-sm font-medium transition-colors">
                Save to Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
