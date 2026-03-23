import SignUpForm from "@/components/auth/SignUpForm";
import SocialSignUp from "@/components/auth/SocialSignUp";
import { CheckCircle, FileText } from "lucide-react";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-background text-foreground antialiased font-sans transition-colors duration-300">
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
            Build your professional future today.
          </h1>

          <p className="text-xl text-slate-700 dark:text-slate-300 font-bold mb-6">
            Land your dream job with a perfect resume.
          </p>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto">
            Join over 500,000 professionals who use ResumePro to build
            ATS-friendly resumes in minutes.
          </p>

          <div className="flex justify-center mt-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600/10 text-amber-700 dark:text-amber-500 rounded-full text-sm font-bold uppercase tracking-widest border border-amber-600/20">
              <CheckCircle size={18} />
              No credit card required
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="bg-white dark:bg-slate-950 flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24 border-l border-slate-100 dark:border-slate-800">
        <div className="mx-auto w-full max-w-md">
          {/* Logo Mobile Only */}
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <FileText className="text-amber-600" size={32} />
            <h2 className="text-2xl font-black tracking-tight dark:text-white">ResumePro</h2>
          </div>

          <div className="mb-8 w-full text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Create Your Free Account
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
              Join the world&apos;s most advanced resume builder.
            </p>
          </div>

          <div className="space-y-8">
            <SignUpForm />
            
            <div className="text-center lg:text-left pt-6 border-t border-slate-100 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Already have an account?
                <Link
                  href={"/auth/signin"}
                  className="text-amber-600 hover:text-amber-700 font-bold ml-1.5 underline underline-offset-4 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="grow border-t border-slate-100 dark:border-slate-800"></div>
              <span className="shrink mx-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                Or join with
              </span>
              <div className="grow border-t border-slate-100 dark:border-slate-800"></div>
            </div>

            {/* Social Buttons */}
            <SocialSignUp />
          </div>
        </div>
        
        {/* Footer Link Section */}
        <footer className="mt-12 text-center text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
          © 2026 ResumePro AI Technologies.<br className="md:hidden" /> All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Signup;
