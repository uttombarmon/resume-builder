"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth/auth-clients";
import UserMenu from "./UserMenu";
import { Loader } from "lucide-react";

const NavbarAuth = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center space-x-4">
        <Loader className="animate-spin text-amber-600" size={20} />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="hidden sm:flex items-center gap-2 bg-amber-600/10 text-amber-700 dark:text-amber-500 px-4 py-2 rounded-xl font-bold hover:bg-amber-600/20 transition-all border border-amber-600/20"
        >
          Dashboard
        </Link>
        <UserMenu />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
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
  );
};

export default NavbarAuth;
