"use client";
import { signInAction } from "@/lib/auth/signInAction";
import { Eye, EyeOff, Loader, Mail, Lock as LockIcon } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signInAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Signed in successfully!");
    } else if (state.message && !state.errors) {
      toast.error(state.message || "Invalid credentials. Please try again.");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
        >
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors">
            <Mail size={18} />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
        {state?.errors && "email" in state.errors && state.errors.email && (
          <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
            {state.errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between ml-1">
          <label
            htmlFor="password"
            className="text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <Link 
            href="/auth/forgot-password" 
            className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors">
            <LockIcon size={18} />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {state?.errors && "password" in state.errors && state.errors.password && (
          <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
            {state.errors.password}
          </p>
        )}
      </div>

      <div className="flex items-center ml-1">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-600 dark:border-slate-800 dark:bg-slate-900"
        />
        <label
          htmlFor="remember-me"
          className="ml-2.5 block text-sm font-bold text-slate-600 dark:text-slate-400 cursor-pointer"
        >
          Remember me for 30 days
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          "Sign In to Your Account"
        )}
      </button>

      {state?.message && !state.errors && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 p-3 rounded-lg mt-4" role="alert">
          <p className="text-red-600 dark:text-red-400 text-xs font-bold text-center">
            {state.message}
          </p>
        </div>
      )}
    </form>
  );
};

export default SignInForm;
