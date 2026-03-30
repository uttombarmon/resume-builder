"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  CreditCard, 
  Plus, 
  Zap, 
  HelpCircle,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth-clients";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: FileText, label: "My Resumes", href: "/dashboard/resumes" },
  { icon: Zap, label: "AI Suggestions", href: "/dashboard/ai" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="flex h-20 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <FileText className="text-amber-600 group-hover:rotate-12 transition-transform" size={28} />
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
            ResumePro
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="mb-8">
          <Button
            size="lg"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2 shadow-lg shadow-amber-600/20"
          >
            <Plus size={18} />
            New Resume
          </Button>
        </div>

        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all",
                  isActive
                    ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t p-4 space-y-2">
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
            <Zap size={14} className="text-amber-500" />
            Pro Plan active
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
            You have unlimited access to all AI features.
          </p>
          <Button size="sm" variant="outline" className="w-full text-xs font-bold border-amber-500/50 hover:bg-amber-500/5 hover:border-amber-500 transition-all">
            View Benefits
          </Button>
        </div>

        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
