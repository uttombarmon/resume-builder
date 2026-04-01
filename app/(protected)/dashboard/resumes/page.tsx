import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AIGenerateModal } from "@/components/dashboard/AIGenerateModal";
import { db } from "@/lib/db/dbConfig";
import { resume as resumeTable } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function ResumesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const { user } = session;

  const userResumes = await db.query.resume.findMany({
    where: eq(resumeTable.userId, user.id),
    orderBy: [desc(resumeTable.updatedAt)],
  });

  return (
    <div className="space-y-10 font-sans max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            My Resumes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage and edit all your AI-generated resumes.
          </p>
        </div>
        <div className="flex gap-3">
          <AIGenerateModal>
            <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 h-12 px-6 gap-2"
            >
                <Plus size={20} />
                Create New Resume
            </Button>
          </AIGenerateModal>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input 
                placeholder="Search resumes..." 
                className="pl-10 rounded-xl h-12 bg-white dark:bg-slate-900 border-none shadow-sm shadow-slate-200/50 dark:shadow-none font-medium"
            />
        </div>
        <Button variant="outline" className="rounded-xl h-12 px-5 gap-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold">
            <Filter size={18} />
            Filter
        </Button>
      </div>

      {/* Resumes Grid */}
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
                <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="h-44 bg-slate-100 dark:bg-slate-800 relative p-4 flex items-center justify-center overflow-hidden">
                        <FileText size={48} className="text-slate-300 dark:text-slate-600 z-10 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 dark:from-slate-900/40 to-transparent z-10"></div>
                        {/* Decorative background element */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors duration-500"></div>
                    </div>
                    <div className="p-5 flex items-center justify-between bg-white dark:bg-slate-900 relative z-20">
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white mb-0.5 line-clamp-1">{resume.name}</h4>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                Last Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 text-slate-300 hover:text-amber-500 transition-colors">
                            <Star size={18} />
                        </Button>
                    </div>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
