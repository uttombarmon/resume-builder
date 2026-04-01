import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Layout, Search, Filter, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TemplateGallery from "@/components/templates/TemplateGallery";

export default async function TemplatesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-10 font-sans max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Professional Templates
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
            Choose from a wide variety of ATS-friendly templates designed by industry experts to get you hired.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 h-12 px-6 gap-2">
            <Sparkles size={20} />
            AI Recommendations
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input 
                placeholder="Search templates..." 
                className="pl-10 rounded-xl h-12 bg-white dark:bg-slate-900 border-none shadow-sm shadow-slate-200/50 dark:shadow-none font-medium"
            />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {["All", "Professional", "Creative", "Modern", "Minimal"].map((category) => (
                <Button 
                    key={category} 
                    variant={category === "All" ? "default" : "outline"}
                    className={`rounded-xl h-10 px-5 font-bold whitespace-nowrap ${
                        category === "All" 
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                >
                    {category}
                </Button>
            ))}
        </div>
      </div>

      {/* Templates Grid - Using Placeholder structure for now based on UI requirements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="group rounded-3xl border-none shadow-xl shadow-slate-200/30 dark:shadow-none dark:bg-slate-900 overflow-hidden hover:-translate-y-2 transition-all duration-500">
                <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center p-8">
                    {/* Placeholder for template preview image */}
                    <div className="w-full h-full bg-white dark:bg-slate-700 rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                        <Layout className="text-slate-200 dark:text-slate-600" size={64} />
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button className="bg-white text-slate-900 font-black rounded-xl hover:bg-amber-50">Use Template</Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white/10 font-black rounded-xl">Preview</Button>
                    </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                    <div>
                        <h4 className="font-black text-slate-900 dark:text-white">Modern Professional {i}</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">ATS-Friendly</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-xl text-slate-300 hover:text-amber-500">
                        <Star size={18} />
                    </Button>
                </div>
            </Card>
        ))}
      </div>

      {/* Integration check: if TemplateGallery has its own rendering logic, we could use it here */}
      {/* <TemplateGallery /> */}
    </div>
  );
}
