"use client";

import {
  User,
  AlignLeft,
  Briefcase,
  GraduationCap,
  Zap,
  FolderOpen,
  Award,
  Plus,
  Palette,
  Type,
  LayoutTemplate,
} from "lucide-react";
import { useState } from "react";
import { TEMPLATES, FONT_OPTIONS, ACCENT_COLORS } from "@/lib/editor/templates";
import type { DesignSettings, SectionType } from "@/lib/editor/types";

interface LeftPanelProps {
  design: DesignSettings;
  onDesignChange: (updates: Partial<DesignSettings>) => void;
  onAddSection: (type: SectionType) => void;
}

const SECTION_TYPES: { type: SectionType; label: string; icon: React.ElementType; color: string }[] = [
  { type: "summary", label: "Summary", icon: AlignLeft, color: "text-sky-500" },
  { type: "experience", label: "Experience", icon: Briefcase, color: "text-violet-500" },
  { type: "education", label: "Education", icon: GraduationCap, color: "text-emerald-500" },
  { type: "skills", label: "Skills", icon: Zap, color: "text-amber-500" },
  { type: "projects", label: "Projects", icon: FolderOpen, color: "text-rose-500" },
  { type: "certifications", label: "Certifications", icon: Award, color: "text-teal-500" },
  { type: "custom", label: "Custom", icon: Plus, color: "text-slate-400" },
];

type Tab = "sections" | "design";

export function LeftPanel({ design, onDesignChange, onAddSection }: LeftPanelProps) {
  const [tab, setTab] = useState<Tab>("sections");

  return (
    <div className="w-64 shrink-0 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-hidden print:hidden">
      {/* Tab switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {(["sections", "design"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              tab === t
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {t === "sections" ? "Sections" : "Design"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "sections" ? (
          <div className="p-4 space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Add Section
            </p>
            {SECTION_TYPES.map(({ type, label, icon: Icon, color }) => (
              <button
                key={type}
                onClick={() => onAddSection(type)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group active:scale-[0.98]"
              >
                <div className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform ${color}`}>
                  <Icon size={16} />
                </div>
                {label}
                <Plus size={14} className="ml-auto text-slate-300 group-hover:text-amber-500 transition-colors" />
              </button>
            ))}

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                Header Section
              </p>
              <button
                onClick={() => onAddSection("header")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group active:scale-[0.98]"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform text-indigo-500">
                  <User size={16} />
                </div>
                Header / Contact
                <Plus size={14} className="ml-auto text-slate-300 group-hover:text-amber-500 transition-colors" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {/* Templates */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <LayoutTemplate size={10} /> Template
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => onDesignChange({ templateId: tpl.id })}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all group ${
                      design.templateId === tpl.id
                        ? "border-amber-500 shadow-lg shadow-amber-500/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {/* Mini preview */}
                    <div
                      className="h-16 w-full"
                      style={{ background: tpl.previewColors[0] }}
                    >
                      <div
                        className="h-4 w-full"
                        style={{ background: tpl.previewColors[1], opacity: 0.9 }}
                      />
                      <div className="p-1.5 space-y-1">
                        <div className="h-1 rounded-full w-3/4" style={{ background: tpl.previewColors[1], opacity: 0.5 }} />
                        <div className="h-1 rounded-full w-1/2" style={{ background: tpl.previewColors[2], opacity: 0.6 }} />
                        <div className="h-1 rounded-full w-2/3" style={{ background: tpl.previewColors[2], opacity: 0.4 }} />
                      </div>
                    </div>
                    <div className="py-1.5 text-center text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900">
                      {tpl.name}
                    </div>
                    {design.templateId === tpl.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Font */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Type size={10} /> Font
              </p>
              <div className="space-y-1">
                {FONT_OPTIONS.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => onDesignChange({ fontFamily: font.value })}
                    className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all ${
                      design.fontFamily === font.value
                        ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                    style={{ fontFamily: font.cssFamily }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent color */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Palette size={10} /> Accent Color
              </p>
              <div className="grid grid-cols-4 gap-2">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onDesignChange({ accentColor: color.value })}
                    title={color.name}
                    className={`w-full aspect-square rounded-lg transition-all ${
                      design.accentColor === color.value
                        ? "ring-2 ring-offset-2 ring-amber-500 scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ background: color.value }}
                  />
                ))}
              </div>

              {/* Custom hex input */}
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0"
                  style={{ background: design.accentColor }}
                />
                <input
                  type="text"
                  value={design.accentColor}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^#[0-9a-fA-F]{0,6}$/.test(val)) {
                      onDesignChange({ accentColor: val });
                    }
                  }}
                  className="flex-1 px-2 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-amber-500"
                  placeholder="#1e40af"
                />
              </div>
            </div>

            {/* Font size */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                Text Size
              </p>
              <div className="flex gap-2">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => onDesignChange({ fontSize: size })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      design.fontSize === size
                        ? "bg-amber-600 border-amber-600 text-white"
                        : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
