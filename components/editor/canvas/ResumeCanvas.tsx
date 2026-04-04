"use client";

import { FONT_OPTIONS } from "@/lib/editor/templates";
import type {
  DesignSettings,
  ResumeSection as ResumeSectionType,
} from "@/lib/editor/types";
import { useCallback, useEffect, useState } from "react";
import { ResumeSection } from "./ResumeSection";

interface ResumeCanvasProps {
  sections: ResumeSectionType[];
  design: DesignSettings;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdateSection: (
    id: string,
    updater: (s: ResumeSectionType) => ResumeSectionType,
  ) => void;
  onReorder: (from: number, to: number) => void;
}

export function ResumeCanvas({
  sections,
  design,
  selectedId,
  onSelect,
  onUpdateSection,
  onReorder,
}: ResumeCanvasProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  console.log(sections);
  // Load Google Font
  useEffect(() => {
    const font = FONT_OPTIONS.find((f) => f.value === design.fontFamily);
    if (!font) return;
    const id = `gfont-${font.value}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleImport}&display=swap`;
    document.head.appendChild(link);
  }, [design.fontFamily]);

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, toIndex: number) => {
      e.preventDefault();
      if (dragIndex !== null && dragIndex !== toIndex) {
        onReorder(dragIndex, toIndex);
      }
      setDragIndex(null);
      setDragOverIndex(null);
    },
    [dragIndex, onReorder],
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #resume-print-area, #resume-print-area * { visibility: visible !important; }
          #resume-print-area { position: fixed; top: 0; left: 0; width: 210mm; }
          @page { size: A4; margin: 0; }
        }
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #cbd5e1;
          pointer-events: none;
        }
        [contenteditable]:focus { outline: none; }
      `}</style>

      {/* Scrollable canvas area */}
      <div
        className="flex-1 overflow-auto bg-slate-200 dark:bg-slate-950 flex flex-col items-center py-8 px-4"
        onClick={() => onSelect(null)}
      >
        {/* A4 Paper */}
        <div
          id="resume-print-area"
          className="bg-white shadow-2xl shadow-slate-400/30 dark:shadow-black/50 w-[794px] min-h-[1123px] shrink-0 relative"
          style={{
            background: design.templateId === "bold" ? undefined : "white",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-300">
              <p className="text-lg font-semibold">
                Add sections from the left panel
              </p>
              <p className="text-sm mt-1">Your resume will appear here</p>
            </div>
          ) : (
            <div className="pb-8">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`transition-all ${
                    dragOverIndex === index && dragIndex !== index
                      ? "border-t-2 border-blue-400"
                      : ""
                  }`}
                >
                  <ResumeSection
                    section={section}
                    design={design}
                    isSelected={selectedId === section.id}
                    onSelect={() => onSelect(section.id)}
                    onChange={(updated) =>
                      onUpdateSection(section.id, () => updated)
                    }
                    dragHandleProps={{
                      onMouseDown: (e) => e.stopPropagation(),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Page count hint */}
        <p className="text-xs text-slate-400 mt-4 font-medium">
          A4 · 210 × 297 mm · Export PDF to download
        </p>
      </div>
    </>
  );
}
