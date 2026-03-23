import SignUpForm from "@/components/auth/SignUpForm";
import SocialSignUp from "@/components/auth/SocialSignUp";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <div className=" flex flex-row w-full justify-center items-center min-h-screen">
        {/* Heading */}
        <div className=" w-2/4 h-full flex flex-col justify-center items-center relative">
          <div className="text-center space-y-2 self-center mx-auto">
            <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black tracking-tight mb-6">
              Join <br />
              <Link href={"/"} className=" text-amber-600 text-5xl inline">
                ResumePro
              </Link>
            </h1>

            <p className="text-slate-900 dark:text-slate-100  text-2xl w-3/4 mx-auto">
              Build your professional future today.Land your dream job with a
              perfect resume.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-base w-3/4 mx-auto">
              Join over 500,000 professionals who use ResumePro to build
              ATS-friendly resumes in minutes.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-amber-600 rounded-full text-xs font-semibold mt-4 uppercase tracking-wider">
              <CheckCircle size={14} />
              No credit card required
            </div>
          </div>
        </div>

        {/* Form and Social */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 w-2/4">
          <div className="w-full max-w-120 space-y-8">
            {/* Form Card */}
            <div className=" border border-primary/10 p-8 rounded-2xl shadow-xs space-y-6">
              <SignUpForm />
              <div className=" mt-10 text-center">
                Already has account?
                <Link
                  href={"/auth/signin"}
                  className=" text-amber-500 hover:text-amber-700 mx-1.5 underline"
                >
                  Sign In
                </Link>
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="grow border-t border-slate-200 dark:border-slate-700"></div>

                <span className="shrink mx-4 text-slate-400 text-xs font-medium uppercase tracking-widest">
                  Or sign up with
                </span>

                <div className="grow border-t border-slate-200 dark:border-slate-700"></div>
              </div>

              {/* Social */}
              <SocialSignUp />
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
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          © 2026 ResumePro AI Technologies. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Signup;
