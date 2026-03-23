import Link from "next/link";
import { FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95" aria-label="ResumePro Home">
            <FileText className="text-amber-600 group-hover:rotate-12 transition-transform" size={32} />
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
              ResumePro
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8" role="menubar">
            <Link
              href="#templates"
              className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-bold transition-colors"
              role="menuitem"
            >
              Templates
            </Link>
            <Link
              href="#pricing"
              className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-bold transition-colors"
              role="menuitem"
            >
              Pricing
            </Link>
            <Link
              href="#tips"
              className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-bold transition-colors"
              role="menuitem"
            >
              Expert Tips
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/auth/signin"
              className="hidden sm:block text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-bold px-4 py-2 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-amber-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
