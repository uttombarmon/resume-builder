"use client";

import { signUp, signIn } from "@/lib/auth/auth-clients";
import { Loader, Lock, Mail, MoveRight, User, Github } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema } from "@/lib/utils/schemas";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    // Client-side validation using the same schema
    const validation = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(fieldErrors as Record<string, string[]>);
      setIsPending(false);
      return;
    }

    try {
      const { error } = await signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
      } else {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  const handleSocialSignIn = async (provider: "github") => {
    setIsPending(true);
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error("Social sign-in failed.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSignUp} className="space-y-4">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
              {errors.name[0]}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
              {errors.email[0]}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
                {errors.password[0]}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-bold" role="alert">
                {errors.confirmPassword[0]}
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
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-950 px-2 text-slate-500 font-bold">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleSocialSignIn("github")}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-70"
      >
        <Github size={20} />
        GitHub
      </button>
    </div>
  );
};

export default SignUpForm;
