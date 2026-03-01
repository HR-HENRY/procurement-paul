"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Building2,
  User,
  Briefcase,
  Star,
  Zap,
  Shield,
  Upload,
  Tag,
} from "lucide-react";

const steps = [
  { id: 1, label: "Your Account" },
  { id: 2, label: "Your Business" },
  { id: 3, label: "Your Sectors" },
  { id: 4, label: "Choose Plan" },
  { id: 5, label: "You're Ready" },
];

const sectors = [
  "Central Government", "Local Authority", "NHS / Healthcare",
  "Education", "Housing", "Police & Justice", "Transport",
  "Defence", "Utilities", "Private Sector", "Charity / Third Sector", "Other",
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "£49",
    period: "/month",
    desc: "For small businesses writing occasional tenders",
    features: ["5 tenders per month", "Document analysis", "AI response generation", "Basic knowledge base", "Email support"],
    color: "border-slate-200",
    badge: null,
  },
  {
    id: "professional",
    name: "Professional",
    price: "£149",
    period: "/month",
    desc: "For growing businesses winning regularly",
    features: ["Unlimited tenders", "Advanced scoring analysis", "Full knowledge base", "Answer library", "Tender archive", "Priority support", "Team collaboration"],
    color: "border-[#1e3a5f]",
    badge: "MOST POPULAR",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organisations with complex needs",
    features: ["Everything in Pro", "Custom AI training", "White-label option", "API access", "Dedicated manager", "SLA guarantee"],
    color: "border-slate-200",
    badge: null,
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const toggleSector = (s: string) =>
    setSelectedSectors((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2d5282] to-[#1e3a5f] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-xl">PP</span>
          </div>
          <span className="text-white font-bold text-xl">Procurement Paul</span>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                s.id === step ? "bg-white text-[#1e3a5f]" :
                s.id < step ? "bg-white/20 text-white" :
                "bg-white/10 text-white/40"
              }`}>
                {s.id < step ? <CheckCircle className="w-3 h-3" /> : null}
                {s.label}
              </div>
              {i < steps.length - 1 && <div className="w-4 h-px bg-white/20" />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {/* Step 1: Account */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1e3a5f]">Create your account</h2>
                  <p className="text-slate-400 text-sm">Start your 14-day free trial — no credit card needed</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                  <input type="text" placeholder="John" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                  <input type="text" placeholder="Percival" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <input type="password" placeholder="Minimum 8 characters" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <input type="password" placeholder="Repeat password" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
              </div>
              <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 mt-0.5" />
                <span>I agree to the <a href="#" className="text-[#1e3a5f] font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-[#1e3a5f] font-medium hover:underline">Privacy Policy</a></span>
              </label>
              <button onClick={() => setStep(2)} className="w-full bg-[#1e3a5f] hover:bg-[#2d5282] text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-center text-sm text-slate-400">Already have an account? <Link href="/auth/login" className="text-[#1e3a5f] font-medium hover:underline">Sign in</Link></p>
            </div>
          )}

          {/* Step 2: Business */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1e3a5f]">Tell us about your business</h2>
                  <p className="text-slate-400 text-sm">Paul uses this to write better responses for you</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                  <input type="text" placeholder="Your company name" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Size</label>
                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
                      <option>1–10 employees</option>
                      <option>11–50 employees</option>
                      <option>51–200 employees</option>
                      <option>201–500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Years Trading</label>
                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
                      <option>Less than 1 year</option>
                      <option>1–3 years</option>
                      <option>3–5 years</option>
                      <option>5–10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">What services do you provide?</label>
                  <textarea rows={3} placeholder="Briefly describe what your company does and the services you offer in tenders..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Key Strengths / USPs</label>
                  <textarea rows={2} placeholder="e.g. ISO certified, 15 years experience, 95% client retention rate..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Typical Contract Value</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
                    <option>Under £50k</option>
                    <option>£50k – £250k</option>
                    <option>£250k – £1M</option>
                    <option>£1M – £5M</option>
                    <option>Over £5M</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 bg-[#1e3a5f] hover:bg-[#2d5282] text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Sectors */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1e3a5f]">Which sectors do you tender in?</h2>
                  <p className="text-slate-400 text-sm">Select all that apply — Paul tailors responses to each sector</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sectors.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSector(s)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-all text-left ${
                      selectedSectors.includes(s)
                        ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#1e3a5f] hover:text-[#1e3a5f]"
                    }`}
                  >
                    {selectedSectors.includes(s) && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {s}
                  </button>
                ))}
              </div>
              {selectedSectors.length > 0 && (
                <p className="text-xs text-slate-400">{selectedSectors.length} sector{selectedSectors.length > 1 ? "s" : ""} selected</p>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">How many tenders do you write per year?</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
                  <option>1–5</option>
                  <option>6–12</option>
                  <option>13–24</option>
                  <option>25–50</option>
                  <option>50+</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(4)} className="flex-1 bg-[#1e3a5f] hover:bg-[#2d5282] text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Plan */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1e3a5f]">Choose your plan</h2>
                  <p className="text-slate-400 text-sm">14-day free trial on all plans — cancel anytime</p>
                </div>
              </div>
              <div className="space-y-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedPlan === plan.id ? "border-[#1e3a5f] bg-[#1e3a5f]/5" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-2.5 left-4 bg-[#c9a84c] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                          selectedPlan === plan.id ? "border-[#1e3a5f] bg-[#1e3a5f]" : "border-slate-300"
                        }`}>
                          {selectedPlan === plan.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1e3a5f]">{plan.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{plan.desc}</div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                            {plan.features.slice(0, 3).map((f) => (
                              <span key={f} className="text-xs text-slate-500 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500" /> {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <span className="text-2xl font-bold text-[#1e3a5f]">{plan.price}</span>
                        <span className="text-slate-400 text-xs">{plan.period}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(3)} className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(5)} className="flex-1 bg-[#c9a84c] hover:bg-[#b8963e] text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  Start Free Trial <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Ready */}
          {step === 5 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">You&apos;re all set! 🎉</h2>
                <p className="text-slate-500">Welcome to Procurement Paul. Your 14-day free trial has started.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3">
                <p className="text-sm font-semibold text-[#1e3a5f]">Get started in 3 steps:</p>
                {[
                  { icon: Upload, text: "Upload your first tender document to analyse", color: "text-blue-500 bg-blue-50" },
                  { icon: Tag, text: "Add past answers to your Answer Library", color: "text-amber-500 bg-amber-50" },
                  { icon: Zap, text: "Let Paul generate your first high-scoring response", color: "text-green-500 bg-green-50" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600">{item.text}</span>
                    </div>
                  );
                })}
              </div>
              <Link
                href="/dashboard"
                className="block w-full bg-[#1e3a5f] hover:bg-[#2d5282] text-white py-3.5 rounded-xl font-semibold transition-colors"
              >
                Go to My Dashboard →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
