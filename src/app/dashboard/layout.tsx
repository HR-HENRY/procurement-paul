"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  User,
  MessageSquare,
  Archive,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/tenders", label: "My Tenders", icon: FileText },
  { href: "/dashboard/answers", label: "Answer Library", icon: MessageSquare },
  { href: "/dashboard/archive", label: "Tender Archive", icon: Archive },
  { href: "/dashboard/scoring", label: "Quality Scoring", icon: Target },
  { href: "/dashboard/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a5f] flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PP</span>
            </div>
            <div>
              <div className="text-white font-bold text-base">Procurement Paul</div>
              <div className="text-blue-300 text-xs">AI Tender Platform</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  active
                    ? "bg-white/15 text-white"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="w-3 h-3 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all">
            <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">John Percival</div>
              <div className="text-blue-300 text-xs truncate">Professional Plan</div>
            </div>
            <LogOut className="w-4 h-4 text-blue-300 hover:text-white" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-semibold text-[#1e3a5f]">
              {navItems.find((n) => pathname === n.href || pathname.startsWith(n.href + "/"))?.label ?? "Procurement Paul"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-[#1e3a5f] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c9a84c] rounded-full" />
            </button>
            <Link
              href="/dashboard/tenders/new"
              className="bg-[#1e3a5f] hover:bg-[#2d5282] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + New Tender
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
