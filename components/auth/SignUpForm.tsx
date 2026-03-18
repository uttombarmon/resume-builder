"use client";
import { registerAction } from "@/lib/auth/registerAction";
import { Loader, Lock, Mail, MoveRight, User } from "lucide-react";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  console.log(state);
  return (
    <form action={formAction} className=" space-y-4">
      <div className="space-y-4">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
            Full Name
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              <User />
            </span>

            <input
              name="name"
              type="text"
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
            {state &&
              state.errors &&
              "name" in state.errors &&
              state.errors.name && (
                <p className="text-red-500">{state.errors.name}</p>
              )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
            Email Address
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              <Mail />
            </span>

            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
            {state &&
              state.errors &&
              "email" in state.errors &&
              state.errors.email && (
                <p className="text-red-500">{state.errors.email}</p>
              )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
            Password
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              <Lock />
            </span>

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
        {/* Re-Password */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
            Confirm Password
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              <Lock />
            </span>

            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          {state &&
            state.errors &&
            "password" in state.errors &&
            state.errors.password && (
              <p className="text-red-500">{state.errors.password}</p>
            )}
          {state &&
            state.errors &&
            "confirmPassword" in state.errors &&
            state.errors.confirmPassword && (
              <p className="text-red-500">{state.errors.confirmPassword}</p>
            )}
          {state && state?.success == false && (
            <p className="text-red-500">{state.message}</p>
          )}
        </div>
      </div>

      {/* Create Account Button */}
      <button
        disabled={isPending}
        className={`w-full bg-amber-600 hover:bg-amber-600/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2`}
      >
        Create Account
        <span className="material-symbols-outlined">
          {isPending ? <Loader className="animate-spin" /> : <MoveRight />}
        </span>
      </button>
    </form>
  );
};

export default SignUpForm;
