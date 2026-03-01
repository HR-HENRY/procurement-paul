import {
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Trophy,
  Target,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active Tenders", value: "4", icon: FileText, color: "bg-blue-50 text-blue-600", trend: "+2 this month" },
  { label: "Win Rate", value: "68%", icon: Trophy, color: "bg-amber-50 text-amber-600", trend: "+12% vs last quarter" },
  { label: "Avg Score", value: "87/100", icon: Target, color: "bg-green-50 text-green-600", trend: "Above industry avg" },
  { label: "Submitted", value: "12", icon: CheckCircle, color: "bg-purple-50 text-purple-600", trend: "This year" },
];

const recentTenders = [
  { id: "1", title: "IT Support Services Framework", client: "NHS Trust", deadline: "2026-03-15", status: "in_progress", score: 82 },
  { id: "2", title: "Facilities Management Contract", client: "Local Authority", deadline: "2026-03-22", status: "draft", score: null },
  { id: "3", title: "Training & Development Services", client: "Department for Education", deadline: "2026-03-08", status: "review", score: 91 },
  { id: "4", title: "Recruitment Framework 2026", client: "Crown Commercial", deadline: "2026-04-01", status: "draft", score: null },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-slate-100 text-slate-600" },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-700" },
  review: { label: "In Review", color: "bg-amber-100 text-amber-700" },
  submitted: { label: "Submitted", color: "bg-green-100 text-green-700" },
  won: { label: "Won", color: "bg-emerald-100 text-emerald-700" },
  lost: { label: "Lost", color: "bg-red-100 text-red-700" },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5282] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Good evening, John 👋</h2>
            <p className="text-blue-200">You have 2 tenders with deadlines this week. Let&apos;s get them finished.</p>
          </div>
          <Link
            href="/tenders/new"
            className="bg-[#c9a84c] hover:bg-[#b8963e] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
          >
            Start New Tender <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#1e3a5f] mb-0.5">{stat.value}</div>
              <div className="text-sm font-medium text-slate-600">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.trend}</div>
            </div>
          );
        })}
      </div>

      {/* Main Content Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Tenders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-[#1e3a5f]">Recent Tenders</h3>
            <Link href="/tenders" className="text-sm text-[#1e3a5f] hover:underline font-medium">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentTenders.map((tender) => {
              const status = statusConfig[tender.status as keyof typeof statusConfig];
              const daysLeft = Math.ceil(
                (new Date(tender.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              );
              return (
                <Link
                  key={tender.id}
                  href={`/tenders/${tender.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#1e3a5f] text-sm truncate group-hover:text-blue-700">
                      {tender.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{tender.client}</div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                    <div className={`flex items-center gap-1 text-xs ${daysLeft <= 7 ? "text-red-500" : "text-slate-400"}`}>
                      {daysLeft <= 7 ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {daysLeft}d
                    </div>
                    {tender.score && (
                      <div className="text-xs font-semibold text-green-600">{tender.score}%</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions & Tips */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-[#1e3a5f] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Upload Tender Document", href: "/tenders/new", icon: "📄" },
                { label: "Add to Knowledge Base", href: "/knowledge-base/new", icon: "📚" },
                { label: "View Analytics", href: "/analytics", icon: "📊" },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-[#1e3a5f]">
                    {action.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#1e3a5f] ml-auto" />
                </Link>
              ))}
            </div>
          </div>

          {/* Paul's Tip */}
          <div className="bg-gradient-to-br from-[#c9a84c]/10 to-amber-50 rounded-xl border border-amber-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#c9a84c] flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="font-semibold text-amber-800 text-sm">Paul&apos;s Tip</span>
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">
              Always cross-reference your response to the exact clause number in the specification.
              Evaluators score higher when they can trace each answer back to their criteria.
            </p>
          </div>

          {/* Win Rate Indicator */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[#1e3a5f] text-sm">This Quarter</h3>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="space-y-3">
              {[
                { label: "Submitted", value: 6, max: 6, color: "bg-blue-500" },
                { label: "Won", value: 4, max: 6, color: "bg-green-500" },
                { label: "Pending", value: 2, max: 6, color: "bg-amber-400" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
