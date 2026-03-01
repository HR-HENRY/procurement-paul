import Link from "next/link";
import {
  FileText,
  Brain,
  Target,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1e3a5f] flex items-center justify-center">
              <span className="text-white font-bold text-sm">PP</span>
            </div>
            <div>
              <span className="font-bold text-[#1e3a5f] text-lg">Procurement Paul</span>
              <span className="ml-2 text-xs text-slate-400 font-medium">by HR Henry</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-[#1e3a5f] text-sm font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-[#1e3a5f] text-sm font-medium transition-colors">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-[#1e3a5f] text-sm font-medium transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-[#1e3a5f] font-medium text-sm hover:opacity-80 transition-opacity"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-[#1e3a5f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2d5282] transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a5f] via-[#2d5282] to-[#1e3a5f] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-8 border border-white/20">
            <Star className="w-4 h-4 text-[#c9a84c]" />
            <span>AI-Powered Tender Writing — Win More Contracts</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Write Winning Tenders
            <span className="block text-[#c9a84c] mt-2">in a Fraction of the Time</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Procurement Paul analyses tender documents, understands scoring matrices, and helps
            you craft high-scoring responses — directly referenced to the specification.
            Built for businesses that win.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-[#c9a84c] hover:bg-[#b8963e] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Start Writing Tenders <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              See How It Works
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-blue-200">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Free trial included</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 border-y border-slate-200 py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "3x", label: "Faster tender writing" },
            { value: "94%", label: "Average compliance score" },
            { value: "60%", label: "Higher win rates reported" },
            { value: "100+", label: "Tender types supported" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-[#1e3a5f]">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Everything You Need to Win</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              From document analysis to final submission — Procurement Paul handles every stage
              of the tender writing process.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Document Intelligence",
                desc: "Upload tender documents in any format. Our AI extracts all requirements, questions, word limits, and scoring criteria automatically.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Scoring Matrix Analysis",
                desc: "Understand exactly how marks are awarded. We map every question to its scoring criteria so you focus effort where it counts most.",
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "AI Response Generation",
                desc: "Generate compliant, high-scoring responses directly referenced to the specification — tailored to your business and within word limits.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Company Knowledge Base",
                desc: "Upload your company profile, case studies, KPIs and past Q&As. The system learns your strengths and reuses your best answers.",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "KPI Evidence Manager",
                desc: "Organise qualifying statements, appendices, and evidence packs. Attach them to responses with one click.",
                color: "bg-red-50 text-red-600",
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Quality Assurance",
                desc: "Built-in compliance checker reviews every response against the specification before submission. No missed requirements.",
                color: "bg-teal-50 text-teal-600",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-[#1e3a5f]/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-[#1e3a5f] text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">How It Works</h2>
            <p className="text-lg text-slate-500">Four steps from tender document to winning submission.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Upload Tender", desc: "Drop in the client's tender documents. Paul reads everything instantly." },
              { step: "02", title: "Analyse & Score", desc: "Requirements extracted, scoring matrix mapped, priorities identified." },
              { step: "03", title: "Write Responses", desc: "AI drafts high-scoring answers using your company knowledge base." },
              { step: "04", title: "Review & Submit", desc: "Quality check, add evidence appendices, export and submit." },
            ].map((item, i) => (
              <div key={item.step} className="text-center relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] border-t-2 border-dashed border-slate-300" />
                )}
                <div className="w-12 h-12 rounded-full bg-[#1e3a5f] text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm relative z-10">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[#1e3a5f] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-500">Start free. Scale as you grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "£49",
                period: "/month",
                desc: "Perfect for small businesses writing occasional tenders.",
                features: ["5 tenders per month", "Document analysis", "AI response generation", "Basic knowledge base", "Email support"],
                cta: "Start Free Trial",
                highlight: false,
              },
              {
                name: "Professional",
                price: "£149",
                period: "/month",
                desc: "For growing businesses winning contracts regularly.",
                features: ["Unlimited tenders", "Advanced scoring analysis", "Full knowledge base", "KPI evidence manager", "Priority support", "Team collaboration"],
                cta: "Start Free Trial",
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                desc: "For large organisations with complex tender requirements.",
                features: ["Everything in Pro", "Custom AI training", "White-label option", "API access", "Dedicated account manager", "SLA guarantee"],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-8 ${
                  plan.highlight
                    ? "bg-[#1e3a5f] border-[#1e3a5f] text-white shadow-xl scale-105"
                    : "bg-white border-slate-200"
                }`}
              >
                {plan.highlight && (
                  <div className="inline-block bg-[#c9a84c] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-[#1e3a5f]"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-[#1e3a5f]"}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlight ? "text-blue-200" : "text-slate-400"}>{plan.period}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-blue-100" : "text-slate-600"}`}>
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-green-400" : "text-green-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/register"
                  className={`block text-center py-3 rounded-lg font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? "bg-[#c9a84c] hover:bg-[#b8963e] text-white"
                      : "bg-[#1e3a5f] hover:bg-[#2d5282] text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <div>
                <div className="font-bold">Procurement Paul</div>
                <div className="text-xs text-blue-300">Part of the HR Henry Ecosystem</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-blue-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="mailto:john.percival@newave-education.co.uk" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm text-blue-300">
              © 2026 HR Henry. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
