import { User, Building2, Bell, CreditCard, Shield, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3a5f]">Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your account and platform preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="font-semibold text-[#1e3a5f]">Profile</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "First Name", placeholder: "John", value: "John" },
            { label: "Last Name", placeholder: "Percival", value: "Percival" },
            { label: "Email", placeholder: "john@company.com", value: "john.percival@newave-education.co.uk", type: "email", full: true },
            { label: "Phone", placeholder: "+44...", value: "" },
          ].map((field) => (
            <div key={field.label} className={field.full ? "col-span-2" : ""}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
              <input
                type={field.type || "text"}
                defaultValue={field.value}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
              />
            </div>
          ))}
        </div>
        <button className="mt-4 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Save Profile
        </button>
      </div>

      {/* Company */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="font-semibold text-[#1e3a5f]">Company Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Company Name", value: "Newave Education", full: true },
            { label: "Company Registration", value: "" },
            { label: "VAT Number", value: "" },
            { label: "Primary Sector", value: "Education & Training", full: true },
            { label: "Company Description", value: "", full: true, textarea: true },
          ].map((field) => (
            <div key={field.label} className={field.full ? "col-span-2" : ""}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
              {field.textarea ? (
                <textarea
                  defaultValue={field.value}
                  rows={3}
                  placeholder="Brief company description used in tender responses..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none"
                />
              ) : (
                <input
                  type="text"
                  defaultValue={field.value}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              )}
            </div>
          ))}
        </div>
        <button className="mt-4 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Save Company Info
        </button>
      </div>

      {/* AI Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
            <Key className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-semibold text-[#1e3a5f]">AI Configuration</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">OpenAI API Key</label>
            <input
              type="password"
              placeholder="sk-..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] font-mono"
            />
            <p className="text-xs text-slate-400 mt-1.5">Used for document analysis and response generation. Get yours at platform.openai.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">AI Writing Tone</label>
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
              <option>Professional & Formal (recommended for public sector)</option>
              <option>Confident & Direct</option>
              <option>Technical & Detailed</option>
            </select>
          </div>
        </div>
        <button className="mt-4 bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Save AI Settings
        </button>
      </div>

      {/* Plan */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="font-semibold text-[#1e3a5f]">Subscription</h3>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div>
            <div className="font-semibold text-[#1e3a5f]">Professional Plan</div>
            <div className="text-sm text-slate-500 mt-0.5">£149/month · Unlimited tenders · Renews 1 April 2026</div>
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
