"use client";
import { registerAction } from "@/lib/auth/registerAction";
import { Loader, Lock, Mail, MoveRight, User } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Account created successfully!");
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors">
            <User size={18} aria-hidden="true" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
        {state?.errors && "name" in state.errors && state.errors.name && (
          <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
            {state.errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors">
            <Mail size={18} aria-hidden="true" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
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

      {/* Password Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors">
              <Lock size={18} aria-hidden="true" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
          {state?.errors && "password" in state.errors && state.errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
              {state.errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            Confirm
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors">
              <Lock size={18} aria-hidden="true" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
          {state?.errors && "confirmPassword" in state.errors && state.errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <span className="flex items-center gap-2">
              Create Free Account <MoveRight size={18} />
            </span>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium px-4">
        By signing up, you agree to our{" "}
        <Link href="#" className="underline hover:text-amber-600 transition-colors">Terms of Service</Link> and{" "}
        <Link href="#" className="underline hover:text-amber-600 transition-colors">Privacy Policy</Link>.
      </p>

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

export default SignUpForm;
