"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Save,
  Download,
  Check,
  Loader2,
  FileText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface EditorToolbarProps {
  name: string;
  onNameChange: (name: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExportPDF: () => void;
  isSaving: boolean;
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onOptimize: () => void;
}

export function EditorToolbar({
  name,
  onNameChange,
  onUndo,
  onRedo,
  onSave,
  onExportPDF,
  isSaving,
  isDirty,
  canUndo,
  canRedo,
  onOptimize,
}: EditorToolbarProps) {
  const [editingName, setEditingName] = useState(false);
  const [localName, setLocalName] = useState(name);

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  const commitName = () => {
    setEditingName(false);
    if (localName.trim()) onNameChange(localName.trim());
  };

  return (
    <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2 z-50 shrink-0 print:hidden">
      {/* Back */}
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors mr-1"
        title="Back to Dashboard"
      >
        <ArrowLeft size={16} />
        <span className="text-xs font-semibold hidden sm:inline">Dashboard</span>
      </Link>

      <div className="w-px h-6 bg-slate-700" />

      {/* Logo */}
      <div className="flex items-center gap-1.5 ml-1">
        <FileText size={18} className="text-amber-500" />
        <span className="font-black text-white text-sm hidden md:inline">ResumePro</span>
      </div>

      <div className="w-px h-6 bg-slate-700 mx-1" />

      {/* Editable resume name */}
      {editingName ? (
        <input
          autoFocus
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={commitName}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitName();
            if (e.key === "Escape") {
              setLocalName(name);
              setEditingName(false);
            }
          }}
          className="bg-slate-800 text-white text-sm font-semibold px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:border-amber-500 min-w-[200px] max-w-[300px]"
        />
      ) : (
        <button
          onClick={() => setEditingName(true)}
          className="text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors max-w-[250px] truncate"
          title="Click to rename"
        >
          {name}
        </button>
      )}

      {/* Undo / Redo */}
      <div className="flex items-center gap-0.5 ml-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Redo2 size={16} />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Save status */}
      <div className="flex items-center gap-1.5 text-xs mr-2">
        {isSaving ? (
          <span className="flex items-center gap-1.5 text-slate-400">
            <Loader2 size={12} className="animate-spin" /> Saving…
          </span>
        ) : isDirty ? (
          <span className="text-amber-400 font-medium">Unsaved changes</span>
        ) : (
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Check size={12} /> Saved
          </span>
        )}
      </div>

      {/* Optimize with AI */}
      <button
        onClick={onOptimize}
        title="Optimize for Job with AI"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 group"
      >
        <Sparkles size={14} className="text-emerald-400 group-hover:animate-pulse" />
        AI Optimize
      </button>

      {/* Save button */}
      <button
        onClick={onSave}
        disabled={isSaving}
        title="Save (Ctrl+S)"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-all disabled:opacity-50"
      >
        <Save size={14} />
        Save
      </button>

      {/* Export PDF */}
      <button
        onClick={onExportPDF}
        title="Export as PDF"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-lg shadow-amber-600/20"
      >
        <Download size={14} />
        Export PDF
      </button>
    </div>
  );
}
