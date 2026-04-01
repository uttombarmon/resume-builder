import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Zap, ChevronRight, Clock, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UpgradeModal } from "@/components/dashboard/UpgradeModal";
import { Input } from "@/components/ui/input";
import TemplateGallery from "@/components/templates/TemplateGallery";
import { AIGenerateModal } from "@/components/dashboard/AIGenerateModal";
import { db } from "@/lib/db/dbConfig";
import { resume as resumeTable } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const { user } = session;
  const isPro = (user as any).plan === "pro";

  const userResumes = await db.query.resume.findMany({
    where: eq(resumeTable.userId, user.id),
    orderBy: [desc(resumeTable.updatedAt)],
  });

  return (
    <div className="space-y-10 font-sans max-w-6xl mx-auto pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Welcome back, {user.name}! 
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Ready to land your dream job? Let&apos;s build a winning resume today.
          </p>
        </div>
        <div className="flex gap-3">
            <Link href="/dashboard/templates">
                <Button 
                    variant="outline" 
                    className="rounded-xl font-bold border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 h-12 px-6"
                >
                    Templates
                </Button>
            </Link>
            <AIGenerateModal>
                <Button 
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 h-12 px-6 gap-2"
                >
                    <Plus size={20} />
                    Create New
                </Button>
            </AIGenerateModal>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AIGenerateModal>
            <Button variant="ghost" className="h-auto p-0 border-none hover:bg-transparent rounded-3xl w-full text-left flex flex-col items-start">
                <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900/50 relative overflow-hidden group cursor-pointer active:scale-[0.99] transition-all w-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                    <CardHeader className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-amber-600/20">
                            <Sparkles size={24} />
                        </div>
                        <CardTitle className="text-xl font-black">AI Resume Builder</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Generate a complete, professional resume in seconds using customized AI prompts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 pt-0">
                        <span className="inline-flex items-center font-bold text-amber-600 gap-2 group-hover:translate-x-1 transition-transform">
                            Get Started <ChevronRight size={16} />
                        </span>
                    </CardContent>
                </Card>
            </Button>
        </AIGenerateModal>

        <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900/50 relative overflow-hidden group cursor-pointer active:scale-[0.99] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
                    <Zap size={24} />
                </div>
                <CardTitle className="text-xl font-black">Job Optimization</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Instantly tailor your existing resume to match specific job descriptions and rank higher.
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
                <span className="inline-flex items-center font-bold text-blue-600 gap-2 group-hover:translate-x-1 transition-transform">
                    Optimize Now <ChevronRight size={16} />
                </span>
            </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 overflow-hidden relative group">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Active Plan</p>
              <Badge className={`${isPro ? "bg-emerald-500" : "bg-amber-600"} text-white font-bold rounded-lg px-2 py-0.5`}>
                {isPro ? "PRO" : "FREE"}
              </Badge>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                {isPro ? "Advanced Plan" : "Basic Access"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">
                {isPro ? "Enjoy unlimited AI generations and premium templates." : "Unlock 1 AI resume generation. Upgrade for more."}
            </p>
            {isPro ? (
                <Button variant="secondary" className="w-full rounded-xl font-bold bg-slate-100 dark:bg-slate-800 h-11">
                    Manage Billing
                </Button>
            ) : (
                <UpgradeModal>
                    <Button className="w-full rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white h-11 shadow-lg shadow-amber-600/20">
                        Upgrade Now
                    </Button>
                </UpgradeModal>
            )}
          </div>
        </Card>
      </div>

      {/* Resumes List Section */}
      <div className="space-y-6 mt-12">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                    <Clock size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recent Resumes</h2>
            </div>
            {userResumes.length > 0 && (
                <Link href="/dashboard/resumes" className="text-sm font-bold text-amber-600 hover:underline">View all resumes</Link>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AIGenerateModal>
                <Button 
                    variant="outline"
                    className="h-64 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-amber-500/50 hover:bg-amber-50/20 dark:hover:bg-amber-900/10 transition-all group active:scale-[0.98] w-full"
                >
                    <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-600 group-hover:scale-110 transition-all">
                        <Plus size={32} />
                    </div>
                    <p className="font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Create New</p>
                </Button>
            </AIGenerateModal>

            {userResumes.map((resume) => (
                <Link key={resume.id} href={`/resumes/edit/${resume.id}`}>
                    <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/30 dark:shadow-none dark:bg-slate-900 overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full">
                        <div className="h-44 bg-slate-100 dark:bg-slate-800 relative p-4 overflow-hidden flex items-center justify-center">
                            <FileText size={48} className="text-slate-300 dark:text-slate-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                        </div>
                        <div className="p-5 flex items-center justify-between bg-white dark:bg-slate-900">
                            <div>
                                <h4 className="font-black text-slate-900 dark:text-white mb-0.5 line-clamp-1">{resume.name}</h4>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                    Last Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <Star size={18} className="text-slate-300" />
                            </Button>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
