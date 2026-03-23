import React from "react";
import { CircleCheck, FileText, Zap } from "lucide-react";
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";
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
                <Link href={"/"} title="Home">
                  ResumePro
                </Link>
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
              <Zap className="fill-amber-600 text-amber-600" size={20} />
              <div>
                <p className="font-bold">AI Optimization</p>
                <p className="text-sm opacity-80">
                  Tailor your resume in seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CircleCheck className="fill-amber-600 text-amber-600" size={20} />
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
            <FileText className="text-amber-600" size={28} />
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
          <SignInForm />
          <div className=" mt-10">
            Haven&apos;t any account?
            <Link
              href={"/auth/signup"}
              className=" text-amber-500 hover:text-amber-700 mx-1.5 underline"
            >
              Create a new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
