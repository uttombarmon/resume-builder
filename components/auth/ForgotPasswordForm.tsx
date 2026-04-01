"use client";

import { authClient } from "@/lib/auth/auth-clients";
import { Loader, Mail, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/auth/reset-password",
      });

      if (error) {
        toast.error(error.message || "Failed to send reset email.");
      } else {
        toast.success("Reset email sent! Please check your inbox.");
        setIsSent(true);
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50">
          <Mail size={40} className="text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Check your email</h3>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            We&apos;ve sent a password reset link to <span className="font-bold text-slate-900 dark:text-white">{email}</span>.
          </p>
        </div>
        <Link
          href="/auth/signin"
          className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 font-bold transition-colors"
        >
          <ArrowLeft size={18} />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          "Send Reset Link"
        )}
      </button>

      <Link
        href="/auth/signin"
        className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Back to sign in
      </Link>
    </form>
  );
};

export default ForgotPasswordForm;
