"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { EditorToolbar } from "./EditorToolbar";
import { LeftPanel } from "./panels/LeftPanel";
import { RightPanel } from "./panels/RightPanel";
import { ResumeCanvas } from "./canvas/ResumeCanvas";
import { createDefaultSection } from "@/lib/editor/defaults";
import type {
  ResumeData,
  ResumeSection,
  DesignSettings,
  SectionType,
} from "@/lib/editor/types";

interface EditorState {
  data: ResumeData;
  history: ResumeData[];
  historyIndex: number;
  selectedId: string | null;
  isSaving: boolean;
  isDirty: boolean;
}

export function ResumeEditor({ initialData }: { initialData: ResumeData }) {
  const [state, setState] = useState<EditorState>({
    data: initialData,
    history: [initialData],
    historyIndex: 0,
    selectedId: null,
    isSaving: false,
    isDirty: false,
  });

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Save to API ────────────────────────────────────────────────────────
  const saveResume = useCallback(async (data: ResumeData) => {
    setState((prev) => ({ ...prev, isSaving: true }));
    try {
      const res = await fetch(`/api/resumes/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          content: { sections: data.sections, design: data.design },
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setState((prev) => ({ ...prev, isDirty: false }));
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setState((prev) => ({ ...prev, isSaving: false }));
    }
  }, []);

  // ── Push to history & schedule auto-save ──────────────────────────────
  const pushHistory = useCallback(
    (newData: ResumeData) => {
      setState((prev) => {
        const newHistory = prev.history.slice(0, prev.historyIndex + 1);
        newHistory.push(newData);
        if (newHistory.length > 20) newHistory.shift();
        return {
          ...prev,
          data: newData,
          history: newHistory,
          historyIndex: newHistory.length - 1,
          isDirty: true,
        };
      });
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      autoSaveTimer.current = setTimeout(() => saveResume(newData), 3000);
    },
    [saveResume]
  );

  // ── Undo / Redo ────────────────────────────────────────────────────────
  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex <= 0) return prev;
      const idx = prev.historyIndex - 1;
      return { ...prev, data: prev.history[idx], historyIndex: idx, isDirty: true };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;
      const idx = prev.historyIndex + 1;
      return { ...prev, data: prev.history[idx], historyIndex: idx, isDirty: true };
    });
  }, []);

  // ── Keyboard shortcuts ─────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === "s") {
        e.preventDefault();
        saveResume(state.data);
      }
      if (ctrl && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (ctrl && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.data, saveResume, undo, redo]);

  // ── Section operations ─────────────────────────────────────────────────
  const updateSection = useCallback(
    (sectionId: string, updater: (s: ResumeSection) => ResumeSection) => {
      const newData = {
        ...state.data,
        sections: state.data.sections.map((s) =>
          s.id === sectionId ? updater(s) : s
        ),
      };
      pushHistory(newData);
    },
    [state.data, pushHistory]
  );

  const reorderSections = useCallback(
    (from: number, to: number) => {
      const sections = [...state.data.sections];
      const [moved] = sections.splice(from, 1);
      sections.splice(to, 0, moved);
      pushHistory({ ...state.data, sections });
    },
    [state.data, pushHistory]
  );

  const addSection = useCallback(
    (type: SectionType) => {
      const newSection = createDefaultSection(type);
      pushHistory({ ...state.data, sections: [...state.data.sections, newSection] });
      setState((prev) => ({ ...prev, selectedId: newSection.id }));
    },
    [state.data, pushHistory]
  );

  const deleteSection = useCallback(
    (id: string) => {
      pushHistory({
        ...state.data,
        sections: state.data.sections.filter((s) => s.id !== id),
      });
      setState((prev) => ({ ...prev, selectedId: null }));
    },
    [state.data, pushHistory]
  );

  const updateDesign = useCallback(
    (updates: Partial<DesignSettings>) => {
      pushHistory({ ...state.data, design: { ...state.data.design, ...updates } });
    },
    [state.data, pushHistory]
  );

  const updateName = useCallback(
    (name: string) => {
      pushHistory({ ...state.data, name });
    },
    [state.data, pushHistory]
  );

  const handleMove = useCallback(
    (id: string, dir: "up" | "down") => {
      const idx = state.data.sections.findIndex((s) => s.id === id);
      if (dir === "up" && idx > 0) reorderSections(idx, idx - 1);
      if (dir === "down" && idx < state.data.sections.length - 1)
        reorderSections(idx, idx + 1);
    },
    [state.data.sections, reorderSections]
  );

  const selectedSection =
    state.data.sections.find((s) => s.id === state.selectedId) ?? null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 dark:bg-slate-950">
      <EditorToolbar
        name={state.data.name}
        onNameChange={updateName}
        onUndo={undo}
        onRedo={redo}
        onSave={() => saveResume(state.data)}
        onExportPDF={() => window.print()}
        isSaving={state.isSaving}
        isDirty={state.isDirty}
        canUndo={state.historyIndex > 0}
        canRedo={state.historyIndex < state.history.length - 1}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          design={state.data.design}
          onDesignChange={updateDesign}
          onAddSection={addSection}
        />

        <ResumeCanvas
          sections={state.data.sections}
          design={state.data.design}
          selectedId={state.selectedId}
          onSelect={(id) => setState((prev) => ({ ...prev, selectedId: id }))}
          onUpdateSection={updateSection}
          onReorder={reorderSections}
        />

        <RightPanel
          section={selectedSection}
          sections={state.data.sections}
          design={state.data.design}
          onDelete={deleteSection}
          onMove={handleMove}
        />
      </div>
    </div>
  );
}
