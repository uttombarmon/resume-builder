import React from "react";
import { CircleCheck, FileText, Zap } from "lucide-react";
const SignIn = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      {/* Brand Message Section */}
      <div className="relative hidden w-full items-center justify-center bg-primary/10 lg:flex lg:w-1/2 dark:bg-primary/5">
        <div
          className="absolute inset-0 z-0 opacity-60 dark:opacity-55 h-full w-full"
          data-alt="Professional office workspace with resume documents"
          style={{
            backgroundImage: 'url("/login.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10 p-12 text-center max-w-xl">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-3 text-primary">
              <FileText size={32} className="text-amber-600" />
              <h2 className="text-4xl inline font-black tracking-tight text-amber-600">
                ResumePro
              </h2>
            </div>
          </div>

          <h1 className="mb-6 text-5xl font-black leading-tight text-slate-900 dark:text-white">
            Unlock Your Professional Potential.
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300">
            Join over 50,000 professionals who used ResumePro to land interviews
            at top-tier tech companies and creative agencies.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">
                <Zap className=" fill-amber-600 " />
              </span>
              <div>
                <p className="font-bold">AI Optimization</p>
                <p className="text-sm opacity-80">
                  Tailor your resume in seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">
                <CircleCheck className=" fill-amber-600" />
              </span>
              <div>
                <p className="font-bold">ATS Friendly</p>
                <p className="text-sm opacity-80">
                  Pass every automated filter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-amber-600/10 dark:bg-amber-400/10 flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Logo Mobile Only */}
          <div className="mb-10 flex items-center gap-2 lg:hidden text-primary">
            <span className="material-symbols-outlined text-3xl">
              description
            </span>
            <h2 className="text-2xl font-bold tracking-tight">ResumePro</h2>
          </div>

          <div className="mb-10 w-full text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Form */}
          <form action="#" className="space-y-6">
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
                  <a
                    className="font-bold text-primary hover:opacity-80"
                    href="#"
                  >
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
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
