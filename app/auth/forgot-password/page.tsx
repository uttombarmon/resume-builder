import React from "react";
import { CircleCheck, FileText, Zap } from "lucide-react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-background text-foreground antialiased font-sans">
      {/* Brand Message Section */}
      <div className="relative hidden w-full items-center justify-center bg-amber-50 dark:bg-slate-900 lg:flex lg:w-1/2">
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-20 h-full w-full"
          aria-hidden="true"
          style={{
            backgroundImage: 'url("/login.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10 p-12 text-center max-w-xl">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-3">
              <FileText size={40} className="text-amber-600" />
              <h2 className="text-4xl inline font-black tracking-tight text-amber-600">
                <Link href={"/"} title="Home">
                  ResumePro
                </Link>
              </h2>
            </div>
          </div>

          <h1 className="mb-6 text-5xl font-black leading-tight text-slate-900 dark:text-white">
            Secure Your Professional Path.
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Don&apos;t worry! It happens to the best of us. Let&apos;s get you back into your account.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-3">
              <Zap className="text-amber-600" size={24} />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Quick Recovery</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Get a reset link in seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CircleCheck className="text-amber-600" size={24} />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Bank-level Security</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Your data stays protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white dark:bg-slate-950 flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24 border-l border-slate-100 dark:border-slate-800">
        <div className="mx-auto w-full max-w-md">
          {/* Logo Mobile Only */}
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <FileText className="text-amber-600" size={32} />
            <h2 className="text-2xl font-black tracking-tight dark:text-white">ResumePro</h2>
          </div>

          <div className="mb-10 w-full text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Reset Password
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
              Enter the email address associated with your account.
            </p>
          </div>

          {/* Form */}
          <ForgotPasswordForm />
          
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center lg:text-left">
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Remembered your password?
              <Link
                href={"/auth/signin"}
                className="text-amber-600 hover:text-amber-700 font-bold ml-1.5 underline underline-offset-4"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
