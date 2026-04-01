import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Zap, Sparkles, Check, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIGenerateModal } from "@/components/dashboard/AIGenerateModal";

export default async function AIPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-10 font-sans max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            AI Suggestions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
            Leverage the power of artificial intelligence to craft perfect resumes tailored to any job description.
          </p>
        </div>
        <AIGenerateModal>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 h-12 px-6 gap-2">
                <Sparkles size={20} />
                Generate Now
            </Button>
        </AIGenerateModal>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-3xl bg-slate-900 border-none shadow-2xl overflow-hidden p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm font-black uppercase tracking-wider mb-6">
                <Zap size={16} />
                Powered by Gemini AI
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Stand out from the crowd with AI-optimized resumes
            </h2>
            <p className="text-lg text-slate-300 font-medium mb-8 max-w-2xl leading-relaxed">
                Our AI analyzes thousands of successful resumes to generate the perfect structure, bullet points, and keywords tailored specifically to your target role.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    "Bypass ATS systems instantly",
                    "Data-driven keyword optimization",
                    "Professional phrasing and tone",
                    "Zero grammar or spelling mistakes"
                ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-500">
                            <Check size={16} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-slate-200">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* AI Tools Grid */}
      <h3 className="text-2xl font-black text-slate-900 dark:text-white pt-6">Tools & Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 relative overflow-hidden group">
            <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <TrendingUp size={24} />
                </div>
                <CardTitle className="text-xl font-black">Job Match Scoring</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                    Compare your resume against a specific job description to get a match score and missing keywords.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full rounded-xl font-bold border-slate-200 dark:border-slate-800">Coming Soon</Button>
            </CardContent>
        </Card>
        
        <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 relative overflow-hidden group">
            <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                    <Sparkles size={24} />
                </div>
                <CardTitle className="text-xl font-black">Cover Letter Generator</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                    Generate an authentic, passionate cover letter based on your customized AI resume in one click.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full rounded-xl font-bold border-slate-200 dark:border-slate-800">Coming Soon</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
