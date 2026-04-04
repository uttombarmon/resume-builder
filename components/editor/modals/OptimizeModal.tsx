"use client";

import { useState } from "react";
import { 
  Sparkles, 
  X, 
  Loader2, 
  CheckCircle2, 
  Target, 
  ListChecks, 
  AlertCircle 
} from "lucide-react";

interface OptimizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOptimize: (jd: string) => Promise<{
    analysis?: { score: number; suggestions: string[] };
  } | null>;
}

export function OptimizeModal({ isOpen, onClose, onOptimize }: OptimizeModalProps) {
  const [jd, setJd] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<{ score: number; suggestions: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRun = async () => {
    if (!jd.trim()) return;
    setIsOptimizing(true);
    setError(null);
    try {
      const data = await onOptimize(jd);
      if (data?.analysis) {
        setResult(data.analysis);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong during optimization.");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-linear-to-r from-amber-50 to-transparent dark:from-amber-900/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Job Optimization</h2>
              <p className="text-xs text-slate-500 font-medium">Tailor your resume for a specific role</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!result ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 px-1">
                  Job Description
                </label>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-48 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm resize-none transition-all dark:text-white"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-medium animate-in slide-in-from-top-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button
                onClick={handleRun}
                disabled={!jd.trim() || isOptimizing}
                className="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 group shadow-lg shadow-slate-900/10"
              >
                {isOptimizing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Optimizing Resume...
                  </>
                ) : (
                  <>
                    Tailor My Resume
                    <Sparkles size={16} className="text-amber-400" />
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-center text-slate-400 font-medium">
                Our AI will analyze the keywords, requirements, and tone to tailor your resume perfectly.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Score Display */}
              <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-emerald-100 dark:text-emerald-900/30"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                      strokeLinecap="round"
                      className="text-emerald-500 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="absolute text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {result.score}%
                  </span>
                </div>
                <h3 className="text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-2">
                  <Target size={18} /> Optimization Match
                </h3>
              </div>

              {/* Suggestions */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 px-1">
                  <ListChecks size={18} className="text-amber-500" /> Key Improvements Made
                </p>
                <div className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3 transition-colors hover:border-amber-200 dark:hover:border-amber-900/30"
                    >
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                 <button
                  onClick={onClose}
                  className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-600/20"
                >
                  Apply Changes & Export
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
