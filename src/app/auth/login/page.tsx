import Link from "next/link";
import { FileText, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2d5282] to-[#1e3a5f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#1e3a5f] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">PP</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to Procurement Paul</p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors pr-10"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="rounded border-slate-300" />
                Remember me
              </label>
              <a href="#" className="text-sm text-[#1e3a5f] hover:underline font-medium">
                Forgot password?
              </a>
            </div>
            <Link
              href="/dashboard"
              className="block w-full bg-[#1e3a5f] hover:bg-[#2d5282] text-white py-3 rounded-lg font-semibold text-sm text-center transition-colors"
            >
              Sign In
            </Link>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-[#1e3a5f] font-semibold hover:underline">
              Start free trial
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-blue-200 text-xs mt-6">
          Part of the HR Henry Ecosystem
        </p>
      </div>
    </div>
  );
}
