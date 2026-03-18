"use client";
import { signInAction } from "@/lib/auth/signInAction";
import { Loader } from "lucide-react";
import React, { useActionState } from "react";

const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(signInAction, null);
  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          Email Address
        </label>

        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="e.g. alex@example.com"
            className="block w-full rounded-xl border-0 bg-white px-4 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Password
          </label>

          <div className="text-sm">
            <a className="font-bold text-primary hover:opacity-80" href="#">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className="block w-full rounded-xl border-0 bg-white px-4 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:focus:ring-primary sm:text-sm sm:leading-6"
          />

          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
          >
            <span className="material-symbols-outlined text-[20px]">
              visibility
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded-full border-slate-300 text-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-slate-700 dark:text-slate-300"
          >
            Remember me
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-xl bg-amber-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
        >
          {isPending ? <Loader className="animate-spin" /> : "Sign In"}
        </button>
      </div>

      <div>
        <p>{state?.message}</p>
      </div>
    </form>
  );
};

export default SignInForm;
