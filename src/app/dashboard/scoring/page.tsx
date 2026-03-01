"use client";

import { useState } from "react";
import {
  Target, Zap, CheckCircle, AlertCircle, XCircle,
  TrendingUp, TrendingDown, BarChart3, Lightbulb,
  ChevronDown, ChevronUp, Star, ArrowRight, RefreshCw,
} from "lucide-react";

const scoringResults = [
  {
    id: "q1",
    ref: "Q1",
    question: "Describe your organisation's experience and track record in delivering similar services.",
    specRef: "Section 4.1",
    weight: 20,
    score: 4.5,
    maxScore: 5,
    percentage: 90,
    grade: "Excellent",
    strengths: [
      "Specific named contract provided (Surrey NHS Trust)",
      "Measurable KPIs cited (99.7% uptime, 42% reduction)",
      "ISO accreditations mentioned",
      "ITIL certification of staff referenced",
    ],
    improvements: [
      "Could add one more named contract for breadth",
      "Reference the specific clause number from the specification",
    ],
    suggestedAddition: "Consider adding a second comparable contract example from a different sector to demonstrate breadth.",
    wordCount: 142,
    wordLimit: 500,
  },
  {
    id: "q2",
    ref: "Q2",
    question: "Outline your methodology and approach to service delivery.",
    specRef: "Section 4.2",
    weight: 25,
    score: 3.5,
    maxScore: 5,
    percentage: 70,
    grade: "Good",
    strengths: [
      "Three pillars structure is clear",
      "Mentions SLA commitment",
      "Proactive monitoring mentioned",
    ],
    improvements: [
      "Missing specific SLA targets (e.g. P1 response within 1 hour)",
      "No mention of escalation procedures",
      "Continuous improvement cycle not described",
      "No reference to client reporting cadence",
    ],
    suggestedAddition: "Add specific SLA response times, escalation matrix, and monthly reporting structure to score higher on criteria 3 and 4.",
    wordCount: 89,
    wordLimit: 750,
  },
  {
    id: "q3",
    ref: "Q3",
    question: "Describe your commitment to social value and measurable community outcomes.",
    specRef: "Section 5.1",
    weight: 10,
    score: 5,
    maxScore: 5,
    percentage: 100,
    grade: "Outstanding",
    strengths: [
      "Specific apprenticeship numbers committed",
      "TOMs framework referenced — matches evaluator language",
      "£ per £1 social value ROI provided",
      "Local SME supply chain percentage cited",
      "Quarterly reporting commitment made",
    ],
    improvements: [],
    suggestedAddition: "",
    wordCount: 98,
    wordLimit: 400,
  },
  {
    id: "q4",
    ref: "Q4",
    question: "Provide details of qualifications and experience of key personnel.",
    specRef: "Section 4.3",
    weight: 15,
    score: 2.5,
    maxScore: 5,
    percentage: 50,
    grade: "Needs Work",
    strengths: [
      "Contract Manager qualifications listed",
    ],
    improvements: [
      "No CVs or brief profiles for key staff",
      "No mention of succession planning or cover arrangements",
      "Missing years of experience for operational team",
      "No reference to sector-specific experience of team",
      "Training academy mention is vague — add specifics",
    ],
    suggestedAddition: "Add a named Account Manager and Operations Lead with brief profiles. Include succession/cover plans and sector-specific client names in their experience.",
    wordCount: 67,
    wordLimit: 500,
  },
  {
    id: "q5",
    ref: "Q5",
    question: "How will you ensure quality assurance and compliance throughout the contract?",
    specRef: "Section 6.1",
    weight: 20,
    score: 4,
    maxScore: 5,
    percentage: 80,
    grade: "Strong",
    strengths: [
      "ISO 9001 certification mentioned",
      "PDCA methodology described",
      "Specific audit frequency (monthly internal, bi-annual external)",
      "23 improvements stat adds credibility",
    ],
    improvements: [
      "Mention GDPR/data compliance specifically",
      "Reference the authority's own quality standards",
      "Add a named Quality Manager",
    ],
    suggestedAddition: "Reference GDPR compliance procedures and any sector-specific standards (e.g. Cyber Essentials, NHS Data Security Standards) to address all scoring criteria.",
    wordCount: 94,
    wordLimit: 600,
  },
];

const gradeConfig = {
  "Outstanding": { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: Star },
  "Excellent": { color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: CheckCircle },
  "Strong": { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: TrendingUp },
  "Good": { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: AlertCircle },
  "Needs Work": { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: XCircle },
};

export default function ScoringPage() {
  const [expanded, setExpanded] = useState<string | null>("q4");

  const overallScore = Math.round(
    scoringResults.reduce((sum, r) => sum + (r.percentage * r.weight) / 100, 0)
  );

  const weightedMax = scoringResults.reduce((sum, r) => sum + r.weight, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Quality Scoring</h2>
          <p className="text-slate-500 text-sm mt-1">
            Every response scored against the specification — with AI-driven improvement suggestions
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <RefreshCw className="w-4 h-4" />
          Re-score All
        </button>
      </div>

      {/* Overall Score Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5282] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-blue-200 mb-1">Overall Predicted Quality Score</div>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-bold">{overallScore}</span>
              <span className="text-blue-300 text-xl mb-2">/100</span>
            </div>
            <div className="mt-2 text-sm text-blue-200">
              {overallScore >= 85
                ? "🏆 Excellent — this tender is highly competitive"
                : overallScore >= 75
                ? "✅ Good — address the flagged improvements to push above 85"
                : "⚠️ Needs attention — focus on the red sections below"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200 mb-3">Section Breakdown</div>
            <div className="space-y-2 min-w-[200px]">
              {scoringResults.map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <span className="text-xs text-blue-300 w-6">{r.ref}</span>
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full">
                    <div
                      className={`h-full rounded-full ${r.percentage >= 90 ? "bg-emerald-400" : r.percentage >= 75 ? "bg-green-400" : r.percentage >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                      style={{ width: `${r.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-white font-medium w-8 text-right">{r.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Outstanding / Excellent", value: `${scoringResults.filter(r => ["Outstanding","Excellent"].includes(r.grade)).length}`, icon: Star, color: "bg-green-50 text-green-600" },
          { label: "Good / Strong", value: `${scoringResults.filter(r => ["Good","Strong"].includes(r.grade)).length}`, icon: TrendingUp, color: "bg-blue-50 text-blue-600" },
          { label: "Needs Improvement", value: `${scoringResults.filter(r => r.grade === "Needs Work").length}`, icon: AlertCircle, color: "bg-red-50 text-red-600" },
          { label: "Total Improvements", value: `${scoringResults.reduce((s, r) => s + r.improvements.length, 0)}`, icon: Lightbulb, color: "bg-amber-50 text-amber-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1e3a5f]">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section Scores */}
      <div className="space-y-3">
        {scoringResults.map((result) => {
          const grade = gradeConfig[result.grade as keyof typeof gradeConfig];
          const GradeIcon = grade.icon;
          const isExpanded = expanded === result.id;

          return (
            <div
              key={result.id}
              className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
                isExpanded ? grade.border : "border-slate-200"
              }`}
            >
              {/* Section Header */}
              <div
                className="p-5 cursor-pointer flex items-center gap-4"
                onClick={() => setExpanded(isExpanded ? null : result.id)}
              >
                <div className="flex-shrink-0 text-center w-12">
                  <div className="text-xs font-bold text-slate-400">{result.ref}</div>
                  <div className={`text-2xl font-bold ${result.percentage >= 85 ? "text-green-600" : result.percentage >= 70 ? "text-amber-600" : "text-red-500"}`}>
                    {result.score}
                  </div>
                  <div className="text-xs text-slate-400">/{result.maxScore}</div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${grade.bg} ${grade.color}`}>
                      <GradeIcon className="w-3 h-3" />
                      {result.grade}
                    </span>
                    <span className="text-xs text-slate-400">Weight: {result.weight}%</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400">{result.specRef}</span>
                  </div>
                  <p className="text-sm font-medium text-[#1e3a5f] truncate">{result.question}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full max-w-xs">
                      <div
                        className={`h-full rounded-full ${result.percentage >= 85 ? "bg-green-500" : result.percentage >= 70 ? "bg-amber-400" : "bg-red-400"}`}
                        style={{ width: `${result.percentage}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold ${result.percentage >= 85 ? "text-green-600" : result.percentage >= 70 ? "text-amber-600" : "text-red-500"}`}>
                      {result.percentage}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {result.improvements.length > 0 && (
                    <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      <Lightbulb className="w-3 h-3" />
                      {result.improvements.length} tip{result.improvements.length > 1 ? "s" : ""}
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-semibold text-green-700">What&apos;s Working Well</span>
                      </div>
                      <ul className="space-y-2">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-green-700 flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✓</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div className={`${result.improvements.length === 0 ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"} rounded-xl p-4 border`}>
                      <div className="flex items-center gap-2 mb-3">
                        {result.improvements.length === 0
                          ? <Star className="w-4 h-4 text-emerald-500" />
                          : <AlertCircle className="w-4 h-4 text-amber-500" />}
                        <span className={`text-sm font-semibold ${result.improvements.length === 0 ? "text-emerald-700" : "text-amber-700"}`}>
                          {result.improvements.length === 0 ? "Perfect Score — Nothing to Improve!" : "Improvements to Score Higher"}
                        </span>
                      </div>
                      {result.improvements.length > 0 ? (
                        <ul className="space-y-2">
                          {result.improvements.map((imp, i) => (
                            <li key={i} className="text-xs text-amber-700 flex items-start gap-2">
                              <span className="text-amber-400 mt-0.5">→</span>
                              {imp}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-emerald-600">This response addresses all scoring criteria fully.</p>
                      )}
                    </div>
                  </div>

                  {/* Paul's Suggestion */}
                  {result.suggestedAddition && (
                    <div className="bg-[#1e3a5f]/5 border border-[#1e3a5f]/15 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#c9a84c] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-[#1e3a5f]">Paul suggests: </span>
                          <span className="text-sm text-slate-600">{result.suggestedAddition}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Zap className="w-4 h-4" />
                      Improve with AI
                    </button>
                    <button className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <ArrowRight className="w-4 h-4" />
                      Edit Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
