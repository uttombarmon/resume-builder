import Link from "next/link";
import { FileText } from "lucide-react";

import NavbarAuth from "../auth/NavbarAuth";

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
              href="/templates"
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

          <NavbarAuth />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
