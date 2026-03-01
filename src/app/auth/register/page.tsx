import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2d5282] to-[#1e3a5f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#1e3a5f] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">PP</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Start Your Free Trial</h1>
            <p className="text-slate-500 text-sm mt-1">14 days free — no credit card required</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">First name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Last name</label>
                <input
                  type="text"
                  placeholder="Percival"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Company name</label>
              <input
                type="text"
                placeholder="Your company"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
              />
            </div>
            <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 mt-0.5" />
              <span>I agree to the <a href="#" className="text-[#1e3a5f] hover:underline">Terms of Service</a> and <a href="#" className="text-[#1e3a5f] hover:underline">Privacy Policy</a></span>
            </label>
            <Link
              href="/dashboard"
              className="block w-full bg-[#c9a84c] hover:bg-[#b8963e] text-white py-3 rounded-lg font-semibold text-sm text-center transition-colors"
            >
              Create Account — Start Free Trial
            </Link>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#1e3a5f] font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
        <p className="text-center text-blue-200 text-xs mt-6">Part of the HR Henry Ecosystem</p>
      </div>
    </div>
  );
}
