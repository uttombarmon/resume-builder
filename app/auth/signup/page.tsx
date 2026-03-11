import {
  CheckCircle,
  File,
  Linkedin,
  Lock,
  Mail,
  MoveRight,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 lg:px-20 bg-background-light dark:bg-background-dark">
        <Link href={"/"} className="flex items-center gap-2 text-amber-600">
          <div className="size-8 flex items-center justify-center bg-primary rounded-lg">
            <span className="material-symbols-outlined text-xl">
              <File />
            </span>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">
            ResumePro
          </h2>
        </Link>

        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-slate-500 dark:text-slate-400 text-sm">
            Already have an account?
          </p>

          <Link
            href={"/auth/signin"}
            className="flex min-w-25 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 border border-primary/20 hover:bg-primary/5 transition-colors text-amber-600 text-sm font-bold"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-120 space-y-8">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black tracking-tight">
              Join ResumePro
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Build your professional future today.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-amber-600 rounded-full text-xs font-semibold mt-4 uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">
                <CheckCircle />
              </span>
              No credit card required
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-black border border-primary/10 p-8 rounded-2xl shadow-sm space-y-6">
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
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
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
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
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
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Create Account Button */}
            <button className="w-full bg-amber-600 hover:bg-amber-600/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
              Create Account
              <span className="material-symbols-outlined">
                <MoveRight />
              </span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="grow border-t border-slate-200 dark:border-slate-700"></div>

              <span className="shrink mx-4 text-slate-400 text-xs font-medium uppercase tracking-widest">
                Or sign up with
              </span>

              <div className="grow border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Linkedin className=" text-blue-400" />

                <span className="text-sm font-semibold">LinkedIn</span>
              </button>

              <button className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Image
                  className="w-5 h-5"
                  width={10}
                  height={10}
                  alt="Google Logo"
                  src="/google.png"
                />

                <span className="text-sm font-semibold">Google</span>
              </button>
            </div>
          </div>

          {/* Terms */}
          <p className="text-center text-slate-600 dark:text-slate-400 text-xs px-8">
            By signing up, you agree to our
            <a className="text-primary hover:underline"> Terms of Service </a>
            and
            <a className="text-primary hover:underline"> Privacy Policy</a>.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          © 2024 ResumePro AI Technologies. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Signup;
