"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Upload,
  FileText,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";

const steps = [
  { id: 1, label: "Upload Documents" },
  { id: 2, label: "Tender Details" },
  { id: 3, label: "Analysis" },
  { id: 4, label: "Review & Start" },
];

export default function NewTenderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [analysing, setAnalysing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const mockAnalysis = () => {
    setAnalysing(true);
    setTimeout(() => {
      setAnalysing(false);
      setAnalysisComplete(true);
    }, 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1e3a5f]">New Tender</h2>
        <p className="text-slate-500 text-sm mt-1">Upload your tender documents and let Paul do the hard work</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step.id < currentStep
                      ? "bg-green-500 text-white"
                      : step.id === currentStep
                      ? "bg-[#1e3a5f] text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium whitespace-nowrap ${
                    step.id === currentStep ? "text-[#1e3a5f]" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 mb-5 transition-all ${
                    step.id < currentStep ? "bg-green-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Upload */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const files = Array.from(e.dataTransfer.files).map((f) => f.name);
              setUploadedFiles((prev) => [...prev, ...files]);
            }}
            className={`bg-white rounded-xl border-2 border-dashed p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-[#1e3a5f] bg-[#1e3a5f]/5"
                : "border-slate-300 hover:border-[#1e3a5f] hover:bg-slate-50"
            }`}
          >
            <Upload className={`w-10 h-10 mx-auto mb-4 ${isDragging ? "text-[#1e3a5f]" : "text-slate-300"}`} />
            <h3 className="font-semibold text-[#1e3a5f] mb-2">Drop tender documents here</h3>
            <p className="text-slate-400 text-sm mb-4">
              PDF, Word, or Excel — invitation to tender, specification, scoring matrix
            </p>
            <label className="inline-block bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors">
              Browse Files
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []).map((f) => f.name);
                  setUploadedFiles((prev) => [...prev, ...files]);
                }}
              />
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
              <h4 className="font-medium text-[#1e3a5f] text-sm mb-3">Uploaded Documents</h4>
              {uploadedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 flex-1 truncate">{file}</span>
                  <button
                    onClick={() => setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <Link href="/tenders" className="px-5 py-2.5 text-sm text-slate-600 hover:text-[#1e3a5f] font-medium">
              Cancel
            </Link>
            <button
              onClick={() => setCurrentStep(2)}
              disabled={uploadedFiles.length === 0}
              className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-[#1e3a5f]">Tender Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tender Title</label>
                <input
                  type="text"
                  placeholder="e.g. IT Support Services Framework 2026"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Client / Contracting Authority</label>
                <input
                  type="text"
                  placeholder="e.g. NHS Trust — South East"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Submission Deadline</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Estimated Contract Value (£)</label>
                <input
                  type="number"
                  placeholder="e.g. 450000"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tender Type</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
                  <option>Select type...</option>
                  <option>Public Sector — Central Government</option>
                  <option>Public Sector — Local Authority</option>
                  <option>Public Sector — NHS / Health</option>
                  <option>Public Sector — Education</option>
                  <option>Public Sector — Housing</option>
                  <option>Private Sector</option>
                  <option>Framework Agreement</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any context or notes about this tender..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm text-slate-600 hover:text-[#1e3a5f] font-medium"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => { setCurrentStep(3); mockAnalysis(); }}
              className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Analyse Documents <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Analysis */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            {analysing ? (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 text-[#1e3a5f] animate-spin mx-auto mb-4" />
                <h3 className="font-semibold text-[#1e3a5f] text-lg mb-2">Paul is reading your documents...</h3>
                <p className="text-slate-400 text-sm">Extracting requirements, questions, scoring criteria and word limits</p>
                <div className="mt-6 space-y-2 max-w-sm mx-auto text-left">
                  {["Parsing tender specification...", "Identifying scored questions...", "Mapping scoring matrix...", "Building response structure..."].map((task, i) => (
                    <div key={task} className="flex items-center gap-2 text-sm text-slate-500">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1e3a5f]" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ) : analysisComplete ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e3a5f]">Analysis Complete</h3>
                    <p className="text-slate-400 text-sm">Paul has read your documents and built the response structure</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Questions Found", value: "12" },
                    { label: "Scored Sections", value: "9" },
                    { label: "Total Word Limit", value: "8,500" },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#1e3a5f]">{s.value}</div>
                      <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-[#1e3a5f] text-sm mb-3">Sections Identified</h4>
                  {[
                    { ref: "Q1", title: "Company Experience & Track Record", weight: 20, wordLimit: 500 },
                    { ref: "Q2", title: "Methodology & Approach", weight: 25, wordLimit: 750 },
                    { ref: "Q3", title: "Social Value Commitment", weight: 10, wordLimit: 400 },
                    { ref: "Q4", title: "Staff Qualifications & Training", weight: 15, wordLimit: 500 },
                    { ref: "Q5", title: "Quality Assurance & Compliance", weight: 20, wordLimit: 600 },
                  ].map((section) => (
                    <div key={section.ref} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs font-bold text-[#1e3a5f] w-8">{section.ref}</span>
                      <span className="text-sm text-slate-700 flex-1">{section.title}</span>
                      <span className="text-xs text-slate-400">{section.wordLimit}w</span>
                      <span className="text-xs font-semibold text-amber-600">{section.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {analysisComplete && (
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep(2)} className="flex items-center gap-2 px-5 py-2.5 text-sm text-slate-600 hover:text-[#1e3a5f] font-medium">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setCurrentStep(4)} className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Review & Start <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Review & Start */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-[#1e3a5f] mb-4">Ready to Start Writing</h3>
            <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-blue-50 rounded-xl p-5 border border-[#1e3a5f]/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">P</span>
                </div>
                <span className="font-semibold text-[#1e3a5f]">Paul says:</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                I&apos;ve analysed your tender documents and built a complete response structure. I&apos;ve found
                <strong> 12 questions</strong> across 9 scored sections. I&apos;ll help you write each one, referencing
                your knowledge base and keeping within the word limits. Let&apos;s win this one.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Tender", value: "IT Support Services Framework" },
                { label: "Client", value: "NHS Trust — South East" },
                { label: "Deadline", value: "15 March 2026" },
                { label: "Contract Value", value: "£450,000" },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-[#1e3a5f]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setCurrentStep(3)} className="flex items-center gap-2 px-5 py-2.5 text-sm text-slate-600 hover:text-[#1e3a5f] font-medium">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <Link
              href="/tenders/1"
              className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963e] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Start Writing <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
