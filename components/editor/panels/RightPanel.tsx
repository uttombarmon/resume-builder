"use client";

import {
  ChevronUp,
  ChevronDown,
  Trash2,
  MousePointer2,
  Info,
} from "lucide-react";
import type { ResumeSection, DesignSettings } from "@/lib/editor/types";

interface RightPanelProps {
  section: ResumeSection | null;
  sections: ResumeSection[];
  design: DesignSettings;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: "up" | "down") => void;
}

const SECTION_LABELS: Record<string, string> = {
  header: "Header / Contact",
  summary: "Summary",
  experience: "Work Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  custom: "Custom Section",
};

export function RightPanel({
  section,
  sections,
  onDelete,
  onMove,
}: RightPanelProps) {
  if (!section) {
    return (
      <div className="w-56 shrink-0 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-center print:hidden">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <MousePointer2 size={22} className="text-slate-400" />
        </div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Click a section to select it
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
          You can move, reorder, or delete sections from here.
        </p>
      </div>
    );
  }

  const idx = sections.findIndex((s) => s.id === section.id);
  const isFirst = idx === 0;
  const isLast = idx === sections.length - 1;

  return (
    <div className="w-56 shrink-0 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto print:hidden">
      {/* Section info */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          Selected Section
        </p>
        <p className="text-sm font-bold text-slate-800 dark:text-white">
          {SECTION_LABELS[section.type] ?? section.type}
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5">
          Position {idx + 1} of {sections.length}
        </p>
      </div>

      {/* Reorder */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
          Reorder
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onMove(section.id, "up")}
            disabled={isFirst}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronUp size={14} /> Up
          </button>
          <button
            onClick={() => onMove(section.id, "down")}
            disabled={isLast}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronDown size={14} /> Down
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
          Tips
        </p>
        <div className="space-y-2">
          <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Info size={12} className="shrink-0 mt-0.5 text-amber-500" />
            <span>Drag sections using the ⠿ handle to reorder</span>
          </div>
          <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Info size={12} className="shrink-0 mt-0.5 text-amber-500" />
            <span>Click any text on the canvas to edit inline</span>
          </div>
          <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Info size={12} className="shrink-0 mt-0.5 text-amber-500" />
            <span>Press Ctrl+S to save at any time</span>
          </div>
        </div>
      </div>

      {/* Delete — pushed to bottom */}
      <div className="mt-auto p-4">
        <button
          onClick={() => {
            if (confirm(`Delete this "${SECTION_LABELS[section.type]}" section?`)) {
              onDelete(section.id);
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-[0.97]"
        >
          <Trash2 size={14} />
          Delete Section
        </button>
      </div>
    </div>
  );
}
