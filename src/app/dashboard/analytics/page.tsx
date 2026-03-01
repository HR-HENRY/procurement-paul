import {
  TrendingUp,
  Trophy,
  FileText,
  Target,
  BarChart3,
  Calendar,
} from "lucide-react";

const monthlyData = [
  { month: "Sep", submitted: 2, won: 1 },
  { month: "Oct", submitted: 3, won: 2 },
  { month: "Nov", submitted: 2, won: 1 },
  { month: "Dec", submitted: 1, won: 1 },
  { month: "Jan", submitted: 4, won: 3 },
  { month: "Feb", submitted: 3, won: 2 },
];

const recentWins = [
  { title: "HR Consultancy Services", client: "Transport for London", value: 320000, score: 88 },
  { title: "Recruitment Framework", client: "Home Office", value: 560000, score: 91 },
  { title: "Training Services", client: "Birmingham City Council", value: 180000, score: 85 },
];

const topSections = [
  { name: "Company Experience", avgScore: 92 },
  { name: "Quality Assurance", avgScore: 88 },
  { name: "Social Value", avgScore: 85 },
  { name: "Methodology", avgScore: 79 },
  { name: "Key Personnel", avgScore: 74 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3a5f]">Analytics</h2>
        <p className="text-slate-500 text-sm mt-1">Track your tender performance and identify where to focus</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Submitted", value: "15", sub: "Last 6 months", icon: FileText, color: "bg-blue-50 text-blue-600" },
          { label: "Contracts Won", value: "10", sub: "66.7% win rate", icon: Trophy, color: "bg-amber-50 text-amber-600" },
          { label: "Total Value Won", value: "£2.1M", sub: "Across 10 contracts", icon: TrendingUp, color: "bg-green-50 text-green-600" },
          { label: "Avg Tender Score", value: "86/100", sub: "+8 vs industry avg", icon: Target, color: "bg-purple-50 text-purple-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-[#1e3a5f]">{s.value}</div>
              <div className="text-sm font-medium text-slate-600 mt-0.5">{s.label}</div>
              <div className="text-xs text-slate-400 mt-1">{s.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Chart (visual representation) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1e3a5f]">Monthly Performance</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#1e3a5f]" /><span className="text-slate-500">Submitted</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#c9a84c]" /><span className="text-slate-500">Won</span></div>
            </div>
          </div>
          <div className="flex items-end gap-4 h-40">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-1 justify-center" style={{ height: "120px" }}>
                  <div
                    className="flex-1 bg-[#1e3a5f]/20 rounded-t"
                    style={{ height: `${(d.submitted / 4) * 100}%` }}
                    title={`Submitted: ${d.submitted}`}
                  />
                  <div
                    className="flex-1 bg-[#c9a84c] rounded-t"
                    style={{ height: `${(d.won / 4) * 100}%` }}
                    title={`Won: ${d.won}`}
                  />
                </div>
                <span className="text-xs text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-[#1e3a5f] mb-5">Section Performance</h3>
          <div className="space-y-4">
            {topSections.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-600 font-medium">{s.name}</span>
                  <span className={`font-bold ${s.avgScore >= 85 ? "text-green-600" : s.avgScore >= 75 ? "text-amber-600" : "text-red-500"}`}>
                    {s.avgScore}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div
                    className={`h-full rounded-full ${s.avgScore >= 85 ? "bg-green-500" : s.avgScore >= 75 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${s.avgScore}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-400 pt-2">
              💡 Focus on <strong>Methodology</strong> and <strong>Key Personnel</strong> sections — these are pulling your average down.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Wins */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          Recent Wins
        </h3>
        <div className="divide-y divide-slate-50">
          {recentWins.map((win) => (
            <div key={win.title} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium text-[#1e3a5f] text-sm">{win.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{win.client}</div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-slate-500">£{(win.value / 1000).toFixed(0)}k</span>
                <span className="font-bold text-green-600">{win.score}/100</span>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Won</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
