import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Settings, CreditCard } from "lucide-react";
import Navbar from "@/components/home/Navbar";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Manage your resumes and career documents.
            </p>
          </div>
          <Link
            href="/resumes/new"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-600/20 active:scale-[0.98] w-fit"
          >
            <Plus size={20} />
            Create New Resume
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stats/Quick Actions */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">My Resumes</h3>
            <p className="text-3xl font-black text-amber-600">0</p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mb-4">
              <CreditCard size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Subscription</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Free Plan</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center mb-4">
              <Settings size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Settings</h3>
            <p className="text-sm font-bold text-slate-500">Manage your profile</p>
          </div>
        </div>

        {/* Empty State / List */}
        <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
            <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Plus size={32} className="text-slate-400" />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">No resumes yet</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
                    Start by creating your first professional resume using our AI-powered templates.
                </p>
                <Link
                    href="/resumes/new"
                    className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all"
                >
                    Get Started Now
                </Link>
            </div>
        </div>
      </main>
    </div>
  );
}
