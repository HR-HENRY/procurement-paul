"use client";

import { useState } from "react";
import {
  Search, Plus, X, Flame, Clock, PoundSterling, Building2,
  Sparkles, Filter, CheckCircle, AlertCircle, RefreshCw,
  ArrowRight, Tag, Bell, BellOff, Settings, ChevronDown,
  ExternalLink, Star, Inbox,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Keyword {
  id: string;
  term: string;
  active: boolean;
}

interface Opportunity {
  id: string;
  title: string;
  buyer: string;
  value: number | null;
  deadline: string;
  published: string;
  source: "find-a-tender" | "contracts-finder";
  url: string;
  description: string;
  matchedKeywords: string[];
  relevanceScore: number;
  status: "new" | "reviewing" | "importing" | "dismissed";
  location: string;
  contractType: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const defaultKeywords: Keyword[] = [
  { id: "1", term: "heating", active: true },
  { id: "2", term: "gas boiler", active: true },
  { id: "3", term: "boiler servicing", active: true },
  { id: "4", term: "boiler installation", active: true },
  { id: "5", term: "central heating", active: true },
  { id: "6", term: "gas maintenance", active: true },
];

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Gas Boiler Servicing and Maintenance Contract — Social Housing",
    buyer: "Nottingham City Council",
    value: 380000,
    deadline: "2026-03-28",
    published: "2026-03-01",
    source: "find-a-tender",
    url: "https://www.find-tender.service.gov.uk/Search/Results?q=gas+boiler+heating",
    description: "The Council requires a contractor to provide planned preventative maintenance, servicing and emergency repair of gas boilers and central heating systems across approximately 1,200 social housing properties within the Nottingham area.",
    matchedKeywords: ["gas boiler", "boiler servicing", "central heating"],
    relevanceScore: 97,
    status: "new",
    location: "Nottingham",
    contractType: "Maintenance & Servicing",
  },
  {
    id: "2",
    title: "Heating System Installation and Upgrade Programme",
    buyer: "Derby Homes Ltd",
    value: 620000,
    deadline: "2026-04-05",
    published: "2026-03-01",
    source: "contracts-finder",
    url: "https://www.contractsfinder.service.gov.uk/Search/Results?q=gas+boiler+heating",
    description: "Supply and installation of new gas heating systems including boilers, radiators, and associated pipework across a planned programme of 180 void and occupied properties. Work to include removal of existing systems.",
    matchedKeywords: ["heating", "boiler installation", "gas boiler"],
    relevanceScore: 94,
    status: "new",
    location: "Derby",
    contractType: "Installation",
  },
  {
    id: "3",
    title: "Annual Gas Safety Inspections and Boiler Servicing — Schools Estate",
    buyer: "Derbyshire County Council",
    value: 145000,
    deadline: "2026-03-20",
    published: "2026-02-28",
    source: "contracts-finder",
    url: "https://www.contractsfinder.service.gov.uk/Search/Results?q=gas+boiler+heating",
    description: "Annual gas safety inspections, boiler servicing and remedial works across 84 school and educational buildings within Derbyshire. CP12 certificates required for all properties.",
    matchedKeywords: ["boiler servicing", "gas maintenance", "heating"],
    relevanceScore: 91,
    status: "new",
    location: "Derbyshire",
    contractType: "Compliance & Inspection",
  },
  {
    id: "4",
    title: "Central Heating Installation — New Build Housing Development",
    buyer: "Keepmoat Homes",
    value: 890000,
    deadline: "2026-04-12",
    published: "2026-03-01",
    source: "find-a-tender",
    url: "https://www.find-tender.service.gov.uk/Search/Results?q=gas+boiler+heating",
    description: "Installation of full central heating systems including gas boilers, underfloor heating and radiator networks across a new build development of 240 properties in the East Midlands.",
    matchedKeywords: ["central heating", "boiler installation", "heating"],
    relevanceScore: 89,
    status: "reviewing",
    location: "East Midlands",
    contractType: "Installation",
  },
  {
    id: "5",
    title: "Responsive Heating Repairs and Emergency Boiler Replacement",
    buyer: "Gedling Borough Council",
    value: 210000,
    deadline: "2026-03-31",
    published: "2026-02-27",
    source: "contracts-finder",
    url: "https://www.contractsfinder.service.gov.uk/Search/Results?q=gas+boiler+heating",
    description: "Provision of a responsive repairs service for heating systems and emergency boiler replacements across the Council housing stock. Target response times: emergency 4 hours, urgent 24 hours, routine 5 days.",
    matchedKeywords: ["gas boiler", "heating", "gas maintenance"],
    relevanceScore: 85,
    status: "new",
    location: "Gedling, Nottinghamshire",
    contractType: "Responsive Repairs",
  },
  {
    id: "6",
    title: "Planned Maintenance — Heating and Plumbing Services",
    buyer: "Rushcliffe Borough Council",
    value: null,
    deadline: "2026-04-18",
    published: "2026-03-02",
    source: "contracts-finder",
    url: "https://www.contractsfinder.service.gov.uk/Search/Results?q=gas+boiler+heating",
    description: "Planned preventative maintenance of heating and plumbing systems across council-owned properties. Includes annual boiler servicing, system flushing, radiator bleeding and minor repairs.",
    matchedKeywords: ["heating", "boiler servicing", "central heating"],
    relevanceScore: 82,
    status: "new",
    location: "Rushcliffe, Nottinghamshire",
    contractType: "Planned Maintenance",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score >= 90) return "text-green-700 bg-green-100 border-green-200";
  if (score >= 80) return "text-blue-700 bg-blue-100 border-blue-200";
  return "text-amber-700 bg-amber-100 border-amber-200";
}

function formatValue(v: number | null) {
  if (!v) return "Value TBC";
  if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}m`;
  return `£${(v / 1000).toFixed(0)}k`;
}

function daysUntil(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
  return diff;
}

function sourceLabel(source: string) {
  if (source === "find-a-tender") return { label: "Find a Tender", color: "bg-purple-100 text-purple-700" };
  return { label: "Contracts Finder", color: "bg-blue-100 text-blue-700" };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function OpportunitiesPage() {
  const [keywords, setKeywords] = useState<Keyword[]>(defaultKeywords);
  const [newKeyword, setNewKeyword] = useState("");
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "reviewing">("all");
  const [minScore, setMinScore] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState("Tonight at 11:00 PM (scheduled)");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showKeywordPanel, setShowKeywordPanel] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [minValue, setMinValue] = useState(0);

  const addKeyword = () => {
    const term = newKeyword.trim().toLowerCase();
    if (!term || keywords.some((k) => k.term === term)) return;
    setKeywords((prev) => [...prev, { id: Date.now().toString(), term, active: true }]);
    setNewKeyword("");
  };

  const removeKeyword = (id: string) => setKeywords((prev) => prev.filter((k) => k.id !== id));
  const toggleKeyword = (id: string) => setKeywords((prev) => prev.map((k) => k.id === id ? { ...k, active: !k.active } : k));

  const handleScanNow = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setLastScanned("Just now");
    }, 3000);
  };

  const dismissOpportunity = (id: string) => {
    setOpportunities((prev) => prev.map((o) => o.id === id ? { ...o, status: "dismissed" } : o));
  };

  const importOpportunity = (id: string) => {
    setOpportunities((prev) => prev.map((o) => o.id === id ? { ...o, status: "importing" } : o));
    setTimeout(() => {
      setOpportunities((prev) => prev.map((o) => o.id === id ? { ...o, status: "reviewing" } : o));
    }, 1500);
  };

  const activeKeywords = keywords.filter((k) => k.active);

  const filtered = opportunities.filter((o) => {
    if (o.status === "dismissed") return false;
    if (filterStatus !== "all" && o.status !== filterStatus) return false;
    if (o.relevanceScore < minScore) return false;
    if (minValue > 0 && o.value !== null && o.value < minValue) return false;
    return true;
  });

  const newCount = opportunities.filter((o) => o.status === "new").length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f] flex items-center gap-2">
            <Inbox className="w-6 h-6" />
            Opportunity Scanner
            {newCount > 0 && (
              <span className="text-sm font-bold bg-[#c9a84c] text-white px-2.5 py-0.5 rounded-full">{newCount} new</span>
            )}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Scans UK tender portals overnight and surfaces relevant contracts based on your keywords</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNotifications(!notifications)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${notifications ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-100 text-slate-500 border-slate-200"}`}
          >
            {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            {notifications ? "Alerts On" : "Alerts Off"}
          </button>
          <button
            onClick={handleScanNow}
            disabled={scanning}
            className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-70"
          >
            <RefreshCw className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
            {scanning ? "Scanning..." : "Scan Now"}
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "New Opportunities", value: newCount.toString(), icon: Sparkles, color: "bg-amber-50 text-amber-600" },
          { label: "Active Keywords", value: activeKeywords.length.toString(), icon: Tag, color: "bg-blue-50 text-blue-600" },
          { label: "Portals Scanned", value: "2", icon: Search, color: "bg-purple-50 text-purple-600" },
          { label: "Next Scan", value: "11:00 PM", icon: Clock, color: "bg-green-50 text-green-600" },
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

        {/* Keyword Sidebar */}
        <div className="space-y-4">

          {/* Keywords */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-[#1e3a5f] text-sm mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#c9a84c]" />
              Scan Keywords
            </h3>
            <div className="space-y-1.5 mb-3">
              {keywords.map((kw) => (
                <div key={kw.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${kw.active ? "bg-[#1e3a5f]/5 border-[#1e3a5f]/20" : "bg-slate-50 border-slate-200 opacity-50"}`}>
                  <button onClick={() => toggleKeyword(kw.id)} className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${kw.active ? "bg-[#1e3a5f] border-[#1e3a5f]" : "border-slate-300"}`}>
                    {kw.active && <CheckCircle className="w-3 h-3 text-white" />}
                  </button>
                  <span className={`text-xs font-medium flex-1 ${kw.active ? "text-[#1e3a5f]" : "text-slate-400"}`}>{kw.term}</span>
                  <button onClick={() => removeKeyword(kw.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add keyword..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
              />
              <button onClick={addKeyword} className="p-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white rounded-lg transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-[#1e3a5f] text-sm mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#c9a84c]" />
              Filters
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Status</label>
                <div className="space-y-1">
                  {[
                    { value: "all", label: "All opportunities" },
                    { value: "new", label: "New only" },
                    { value: "reviewing", label: "Reviewing" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFilterStatus(opt.value as typeof filterStatus)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterStatus === opt.value ? "bg-[#1e3a5f] text-white" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Min. Relevance Score</label>
                <select
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                >
                  <option value={0}>Any score</option>
                  <option value={80}>80%+</option>
                  <option value={85}>85%+</option>
                  <option value={90}>90%+</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Min. Contract Value</label>
                <select
                  value={minValue}
                  onChange={(e) => setMinValue(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                >
                  <option value={0}>Any value</option>
                  <option value={50000}>£50k+</option>
                  <option value={100000}>£100k+</option>
                  <option value={250000}>£250k+</option>
                  <option value={500000}>£500k+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scan Schedule */}
          <div className="bg-[#1e3a5f] rounded-xl p-4 text-white">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c9a84c]" />
              Scan Schedule
            </h3>
            <p className="text-xs text-blue-200 mb-3">Runs automatically every night whilst you sleep</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-blue-200">Daily scan time</span>
                <span className="font-semibold text-[#c9a84c]">11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Portals</span>
                <span className="font-medium">FTS + Contracts Finder</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Last scan</span>
                <span className="font-medium">{lastScanned}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-green-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                VPS cron job active
              </div>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="lg:col-span-3 space-y-3">

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Inbox className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500 font-medium">No opportunities found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or run a manual scan</p>
            </div>
          )}

          {filtered.map((opp) => {
            const days = daysUntil(opp.deadline);
            const src = sourceLabel(opp.source);
            const isExpanded = expandedId === opp.id;
            return (
              <div key={opp.id} className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${opp.status === "reviewing" ? "border-blue-200" : "border-slate-200"} hover:shadow-md`}>
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">

                      {/* Top row */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${scoreColor(opp.relevanceScore)}`}>
                          ★ {opp.relevanceScore}% match
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${src.color}`}>{src.label}</span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{opp.contractType}</span>
                        {opp.status === "reviewing" && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Reviewing</span>
                        )}
                        {opp.status === "new" && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 animate-pulse">New</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-[#1e3a5f] text-sm leading-snug mb-1">{opp.title}</h3>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 flex-wrap">
                        <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{opp.buyer}</span>
                        <span className="flex items-center gap-1"><PoundSterling className="w-3.5 h-3.5" />{formatValue(opp.value)}</span>
                        <span className={`flex items-center gap-1 font-medium ${days <= 7 ? "text-red-500" : days <= 14 ? "text-amber-500" : "text-slate-400"}`}>
                          <Clock className="w-3.5 h-3.5" />
                          {days <= 0 ? "Expired" : `${days} days left`}
                        </span>
                        <span className="flex items-center gap-1">📍 {opp.location}</span>
                      </div>

                      {/* Matched keywords */}
                      <div className="flex flex-wrap gap-1.5">
                        {opp.matchedKeywords.map((kw) => (
                          <span key={kw} className="text-[10px] px-2 py-0.5 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full font-semibold">
                            🔍 {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {opp.status === "new" && (
                        <button
                          onClick={() => importOpportunity(opp.id)}
                          className="flex items-center gap-1.5 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Start Tender
                        </button>
                      )}
                      {opp.status === "importing" && (
                        <button disabled className="flex items-center gap-1.5 bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-semibold opacity-80 whitespace-nowrap">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Imported!
                        </button>
                      )}
                      {opp.status === "reviewing" && (
                        <button className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap">
                          <ArrowRight className="w-3.5 h-3.5" />
                          Open Tender
                        </button>
                      )}
                      <a
                        href={opp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-slate-400 hover:text-[#1e3a5f] px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Notice
                      </a>
                      {opp.status === "new" && (
                        <button
                          onClick={() => dismissOpportunity(opp.id)}
                          className="flex items-center gap-1.5 text-slate-300 hover:text-red-500 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors whitespace-nowrap"
                        >
                          <X className="w-3.5 h-3.5" />
                          Dismiss
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : opp.id)}
                    className="mt-3 text-xs text-slate-400 hover:text-[#1e3a5f] flex items-center gap-1 transition-colors"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    {isExpanded ? "Hide description" : "Show description"}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-600 leading-relaxed">{opp.description}</p>
                      <p className="text-xs text-slate-400 mt-2">Published: {opp.published} · Deadline: {opp.deadline}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
