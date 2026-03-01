import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  FileText,
  Award,
  BarChart3,
  Users,
  MessageSquare,
  Upload,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Documents", count: 24 },
  { id: "profile", label: "Company Profile", count: 3 },
  { id: "case_study", label: "Case Studies", count: 8 },
  { id: "kpi", label: "KPIs & Evidence", count: 6 },
  { id: "qa_library", label: "Q&A Library", count: 5 },
  { id: "certificate", label: "Certificates", count: 2 },
];

const documents = [
  {
    id: "1",
    name: "Company Overview & Capabilities",
    type: "profile",
    tags: ["overview", "capabilities", "team"],
    updated: "2026-02-15",
    uses: 12,
  },
  {
    id: "2",
    name: "NHS Digital Transformation — Case Study",
    type: "case_study",
    tags: ["NHS", "digital", "transformation", "healthcare"],
    updated: "2026-02-20",
    uses: 8,
  },
  {
    id: "3",
    name: "Staff Retention KPIs 2024–2025",
    type: "kpi",
    tags: ["retention", "HR", "performance", "staff"],
    updated: "2026-01-30",
    uses: 15,
  },
  {
    id: "4",
    name: "Social Value Framework Response",
    type: "qa_library",
    tags: ["social value", "community", "ESG"],
    updated: "2026-02-10",
    uses: 7,
  },
  {
    id: "5",
    name: "ISO 9001:2015 Certificate",
    type: "certificate",
    tags: ["ISO", "quality", "accreditation"],
    updated: "2025-11-01",
    uses: 20,
  },
  {
    id: "6",
    name: "Local Authority Recruitment — Case Study",
    type: "case_study",
    tags: ["local authority", "recruitment", "council"],
    updated: "2026-02-22",
    uses: 5,
  },
];

const typeConfig = {
  profile: { label: "Profile", color: "bg-blue-100 text-blue-700", icon: Users },
  case_study: { label: "Case Study", color: "bg-purple-100 text-purple-700", icon: FileText },
  kpi: { label: "KPI / Evidence", color: "bg-green-100 text-green-700", icon: BarChart3 },
  qa_library: { label: "Q&A Entry", color: "bg-amber-100 text-amber-700", icon: MessageSquare },
  certificate: { label: "Certificate", color: "bg-red-100 text-red-700", icon: Award },
  policy: { label: "Policy", color: "bg-slate-100 text-slate-700", icon: FileText },
};

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Knowledge Base</h2>
          <p className="text-slate-500 text-sm mt-1">
            Your company intelligence — Paul learns from everything you upload
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
          <Link
            href="/knowledge-base/new"
            className="bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Documents", value: "24", icon: BookOpen, color: "text-blue-600 bg-blue-50" },
          { label: "Q&A Entries", value: "47", icon: MessageSquare, color: "text-amber-600 bg-amber-50" },
          { label: "Times Reused", value: "183", icon: BarChart3, color: "text-green-600 bg-green-50" },
          { label: "Avg Score Boost", value: "+14%", icon: Award, color: "text-purple-600 bg-purple-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center flex-shrink-0`}>
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

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-[#1e3a5f] text-sm mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    cat.id === "all"
                      ? "bg-[#1e3a5f] text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    cat.id === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search knowledge base..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
              />
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-3">
            {documents.map((doc) => {
              const config = typeConfig[doc.type as keyof typeof typeConfig];
              const TypeIcon = config.icon;
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-[#1e3a5f]/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1e3a5f]/10">
                      <TypeIcon className="w-5 h-5 text-slate-400 group-hover:text-[#1e3a5f]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-[#1e3a5f] text-sm group-hover:text-blue-700">
                          {doc.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>Updated {doc.updated}</span>
                        <span>Used in {doc.uses} tenders</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {doc.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
