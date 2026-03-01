import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Trophy,
} from "lucide-react";

const tenders = [
  {
    id: "1",
    title: "IT Support Services Framework 2026",
    client: "NHS Trust — South East",
    deadline: "2026-03-15",
    value: 450000,
    status: "in_progress",
    score: 82,
    sections: { total: 12, complete: 8 },
    created: "2026-02-18",
  },
  {
    id: "2",
    title: "Facilities Management Contract",
    client: "Westminster City Council",
    deadline: "2026-03-22",
    value: 1200000,
    status: "draft",
    score: null,
    sections: { total: 16, complete: 2 },
    created: "2026-02-25",
  },
  {
    id: "3",
    title: "Training & Development Services",
    client: "Department for Education",
    deadline: "2026-03-08",
    value: 280000,
    status: "review",
    score: 91,
    sections: { total: 10, complete: 10 },
    created: "2026-02-10",
  },
  {
    id: "4",
    title: "Recruitment Framework 2026",
    client: "Crown Commercial Service",
    deadline: "2026-04-01",
    value: 750000,
    status: "draft",
    score: null,
    sections: { total: 14, complete: 0 },
    created: "2026-02-28",
  },
  {
    id: "5",
    title: "HR Consultancy Services",
    client: "Transport for London",
    deadline: "2026-01-30",
    value: 320000,
    status: "won",
    score: 88,
    sections: { total: 9, complete: 9 },
    created: "2026-01-05",
  },
];

const statusConfig = {
  draft: { label: "Draft", icon: FileText, color: "bg-slate-100 text-slate-600" },
  in_progress: { label: "In Progress", icon: Clock, color: "bg-blue-100 text-blue-700" },
  review: { label: "In Review", icon: AlertCircle, color: "bg-amber-100 text-amber-700" },
  submitted: { label: "Submitted", icon: CheckCircle, color: "bg-green-100 text-green-700" },
  won: { label: "Won ✓", icon: Trophy, color: "bg-emerald-100 text-emerald-700" },
  lost: { label: "Lost", icon: AlertCircle, color: "bg-red-100 text-red-700" },
};

export default function TendersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">My Tenders</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and track all your tender submissions</p>
        </div>
        <Link
          href="/dashboard/tenders/new"
          className="bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Tender
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tenders..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20">
          <option>All Statuses</option>
          <option>Draft</option>
          <option>In Progress</option>
          <option>In Review</option>
          <option>Submitted</option>
          <option>Won</option>
        </select>
      </div>

      {/* Tender Cards */}
      <div className="space-y-3">
        {tenders.map((tender) => {
          const status = statusConfig[tender.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          const progress = Math.round((tender.sections.complete / tender.sections.total) * 100);
          const daysLeft = Math.ceil(
            (new Date(tender.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          );

          return (
            <Link
              key={tender.id}
              href={`/dashboard/tenders/${tender.id}`}
              className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-[#1e3a5f]/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1e3a5f]/10">
                  <FileText className="w-6 h-6 text-slate-400 group-hover:text-[#1e3a5f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-semibold text-[#1e3a5f] group-hover:text-blue-700 truncate">
                      {tender.title}
                    </h3>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${status.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 mb-3">{tender.client}</div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{tender.sections.complete}/{tender.sections.total} sections complete</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full">
                      <div
                        className="h-full rounded-full bg-[#1e3a5f] transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {tender.status === "won" ? "Won" : `${daysLeft > 0 ? daysLeft + "d left" : "Overdue"}`}
                    </span>
                    <span>
                      £{(tender.value / 1000).toFixed(0)}k contract value
                    </span>
                    {tender.score && (
                      <span className="text-green-600 font-semibold">
                        Score: {tender.score}/100
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
