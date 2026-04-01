"use client";

import { useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AIGenerateModal({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    experience: "",
    skills: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      toast.success("Resume generated successfully!");
      setOpen(false);
      router.push(`/resumes/edit/${data.id}`);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-[550px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16"></div>
            <Sparkles className="w-12 h-12 mb-4 text-amber-500" />
            <DialogTitle className="text-3xl font-black mb-2">Build with AI</DialogTitle>
            <DialogDescription className="text-slate-400 font-medium text-lg">
                Tell us about yourself, and our AI will draft a professional resume for you.
            </DialogDescription>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-5 bg-white dark:bg-slate-900">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Full Name</Label>
                    <Input 
                        required
                        placeholder="John Doe" 
                        className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-11"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Target Role</Label>
                    <Input 
                        required
                        placeholder="Software Engineer" 
                        className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-11"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-xs font-black uppercase text-slate-400">Experience Summary</Label>
                <Textarea 
                    required
                    placeholder="Briefly describe your years of experience, key roles, and achievements..." 
                    className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none min-h-[100px] resize-none py-3"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
            </div>

            <div className="space-y-2">
                <Label className="text-xs font-black uppercase text-slate-400">Skills</Label>
                <Input 
                    required
                    placeholder="React, Next.js, TypeScript,Node.js..." 
                    className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-11"
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                />
            </div>

            <div className="pt-4">
                <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-black text-lg shadow-xl shadow-slate-900/10 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-70 gap-3"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Drafting your resume...
                        </>
                    ) : (
                        <>
                            <Wand2 size={20} />
                            Generate My Resume
                        </>
                    )}
                </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
