"use client";

import { useState } from "react";
import {
  Archive, Plus, Search, Filter, FileText,
  Trophy, Clock, Eye, Download, Tag,
  ChevronRight, Star, Upload, X, Calendar,
} from "lucide-react";

const archivedTenders = [
  {
    id: "1",
    title: "HR Consultancy Services Framework",
    client: "Transport for London",
    submittedDate: "2026-01-15",
    outcome: "won",
    contractValue: 320000,
    score: 88,
    sections: 9,
    notes: "Strong social value section. Client praised methodology approach.",
    tags: ["HR", "consultancy", "transport", "framework"],
  },
  {
    id: "2",
    title: "Recruitment Framework Agreement 2025",
    client: "Home Office",
    submittedDate: "2025-11-20",
    outcome: "won",
    contractValue: 560000,
    score: 91,
    sections: 12,
    notes: "Highest scoring tender to date. Key personnel section was exceptional.",
    tags: ["recruitment", "government", "framework", "central"],
  },
  {
    id: "3",
    title: "Learning & Development Services",
    client: "Birmingham City Council",
    submittedDate: "2025-10-08",
    outcome: "won",
    contractValue: 180000,
    score: 85,
    sections: 8,
    notes: "Won on quality — not cheapest. Social value and methodology strongest sections.",
    tags: ["L&D", "training", "local authority", "council"],
  },
  {
    id: "4",
    title: "IT Support Services 2025",
    client: "Surrey NHS Trust",
    submittedDate: "2025-09-12",
    outcome: "lost",
    contractValue: 420000,
    score: 74,
    sections: 11,
    notes: "Lost on price. Quality score was competitive but pricing was 8% above winner.",
    tags: ["IT", "NHS", "support", "healthcare"],
  },
  {
    id: "5",
    title: "Facilities Management Contract",
    client: "Oxford University",
    submittedDate: "2025-07-30",
    outcome: "lost",
    contractValue: 890000,
    score: 79,
    sections: 14,
    notes: "Strong competition. Mobilisation section scored low — needed more detail.",
    tags: ["facilities", "education", "university", "FM"],
  },
  {
    id: "6",
    title: "Workforce Planning Consultancy",
    client: "Department for Work & Pensions",
    submittedDate: "2025-06-14",
    outcome: "won",
    contractValue: 275000,
    score: 93,
    sections: 7,
    notes: "Best quality score ever achieved. Reuse all responses from this tender.",
    tags: ["workforce", "planning", "DWP", "government"],
  },
];

const outcomeConfig = {
  won: { label: "Won", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  lost: { label: "Lost", color: "bg-red-100 text-red-600", dot: "bg-red-400" },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", dot: "bg-amber-400" },
};

export default function ArchivePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedTender, setSelectedTender] = useState<string | null>(null);

  const filtered = archivedTenders.filter((t) => {
    const matchSearch = !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.client.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all" || t.outcome === filter;
    return matchSearch && matchFilter;
  });

  const wonCount = archivedTenders.filter((t) => t.outcome === "won").length;
  const totalValue = archivedTenders.filter((t) => t.outcome === "won").reduce((s, t) => s + t.contractValue, 0);
  const avgScore = Math.round(archivedTenders.reduce((s, t) => s + t.score, 0) / archivedTenders.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Tender Archive</h2>
          <p className="text-slate-500 text-sm mt-1">All past tenders — learn from every submission and reuse winning responses</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import Past Tender
          </button>
          <button className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add to Archive
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Archived Tenders", value: archivedTenders.length.toString(), icon: Archive, color: "bg-blue-50 text-blue-600" },
          { label: "Won", value: `${wonCount}/${archivedTenders.length}`, icon: Trophy, color: "bg-amber-50 text-amber-600" },
          { label: "Total Won Value", value: `£${(totalValue / 1000000).toFixed(1)}M`, icon: Star, color: "bg-green-50 text-green-600" },
          { label: "Avg Quality Score", value: `${avgScore}%`, icon: FileText, color: "bg-purple-50 text-purple-600" },
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

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search archived tenders by title, client or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "won", "lost"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? "bg-[#1e3a5f] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f === "all" ? "All" : f === "won" ? "Won ✓" : "Lost"}
            </button>
          ))}
        </div>
      </div>

      {/* Tender Cards */}
      <div className="space-y-3">
        {filtered.map((tender) => {
          const outcome = outcomeConfig[tender.outcome as keyof typeof outcomeConfig];
          const isExpanded = selectedTender === tender.id;
          return (
            <div
              key={tender.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all"
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setSelectedTender(isExpanded ? null : tender.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${outcome.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-[#1e3a5f]">{tender.title}</h3>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${outcome.color}`}>
                          {outcome.label}
                        </span>
                        <span className={`text-sm font-bold ${tender.score >= 85 ? "text-green-600" : tender.score >= 75 ? "text-amber-600" : "text-red-500"}`}>
                          {tender.score}/100
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
                      <span>{tender.client}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{tender.submittedDate}</span>
                      <span>£{(tender.contractValue / 1000).toFixed(0)}k</span>
                      <span>{tender.sections} sections</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tender.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform mt-1 ${isExpanded ? "rotate-90" : ""}`} />
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-5 bg-slate-50">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-400 mb-1">Quality Score</div>
                      <div className={`text-2xl font-bold ${tender.score >= 85 ? "text-green-600" : tender.score >= 75 ? "text-amber-600" : "text-red-500"}`}>
                        {tender.score}/100
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-400 mb-1">Contract Value</div>
                      <div className="text-2xl font-bold text-[#1e3a5f]">£{(tender.contractValue / 1000).toFixed(0)}k</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-400 mb-1">Sections</div>
                      <div className="text-2xl font-bold text-[#1e3a5f]">{tender.sections}</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-slate-200 mb-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1.5">NOTES & LESSONS LEARNED</div>
                    <p className="text-sm text-slate-700">{tender.notes}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Eye className="w-4 h-4" />
                      View Full Tender
                    </button>
                    <button className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Download className="w-4 h-4" />
                      Export Responses
                    </button>
                    <button className="flex items-center gap-2 border border-[#c9a84c] text-[#c9a84c] hover:bg-amber-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Star className="w-4 h-4" />
                      Reuse Responses
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Import Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-bold text-[#1e3a5f] text-lg">Import Past Tender</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tender Title</label>
                <input type="text" placeholder="e.g. IT Support Services Framework 2025" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Client</label>
                  <input type="text" placeholder="Client name" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Submitted Date</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Outcome</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
                    <option>Won</option>
                    <option>Lost</option>
                    <option>Pending</option>
                    <option>Withdrawn</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Quality Score (%)</label>
                  <input type="number" min="0" max="100" placeholder="e.g. 88" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Upload Documents (optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-[#1e3a5f] transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Drop your tender documents, responses or debrief notes here</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Lessons Learned / Notes</label>
                <textarea rows={3} placeholder="What worked well? What would you do differently? What scored highest?" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2.5 bg-[#1e3a5f] hover:bg-[#2d5282] text-white rounded-lg text-sm font-medium transition-colors">Save to Archive</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
