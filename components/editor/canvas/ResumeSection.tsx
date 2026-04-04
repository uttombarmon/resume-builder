"use client";

import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type {
  ResumeSection,
  DesignSettings,
  ExperienceEntry,
  EducationEntry,
  ProjectEntry,
  CertificationEntry,
  SkillCategory,
} from "@/lib/editor/types";

// ─── Shared inline editable field ────────────────────────────────────────────
interface FieldProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  accentColor?: string;
  style?: React.CSSProperties;
}

function Field({ value, onChange, placeholder, className = "", multiline = false, accentColor, style }: FieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    const text = ref.current?.innerText ?? "";
    onChange(text);
  };

  return multiline ? (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`outline-none focus:bg-blue-50/60 dark:focus:bg-blue-900/10 rounded px-0.5 whitespace-pre-wrap min-h-[1em] ${className}`}
      data-placeholder={placeholder}
      style={{ caretColor: accentColor, ...style }}
      dangerouslySetInnerHTML={{ __html: value || "" }}
    />
  ) : (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`outline-none focus:bg-blue-50/60 dark:focus:bg-blue-900/10 rounded px-0.5 ${className}`}
      data-placeholder={placeholder}
      style={{ caretColor: accentColor, ...style }}
      dangerouslySetInnerHTML={{ __html: value || "" }}
    />
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface ResumeSectionProps {
  section: ResumeSection;
  design: DesignSettings;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updated: ResumeSection) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

// ─── Helper to get font CSS ───────────────────────────────────────────────────
const FONT_CSS: Record<string, string> = {
  inter: "'Inter', sans-serif",
  merriweather: "'Merriweather', serif",
  roboto: "'Roboto', sans-serif",
  playfair: "'Playfair Display', serif",
  montserrat: "'Montserrat', sans-serif",
  lato: "'Lato', sans-serif",
};

const FONT_SIZE_MAP = { sm: "11px", md: "12px", lg: "13px" };

// ─── Section divider line ─────────────────────────────────────────────────────
function SectionTitle({
  title,
  accentColor,
  titleCase,
  align,
  dividerStyle,
  onChange,
}: {
  title: string;
  accentColor: string;
  titleCase: "uppercase" | "capitalize" | "normal";
  align: "left" | "center" | "right";
  dividerStyle: "solid" | "dashed" | "dotted" | "none";
  onChange: (t: string) => void;
}) {
  const caseClass = 
    titleCase === "uppercase" ? "uppercase" : 
    titleCase === "capitalize" ? "capitalize" : "";
    
  return (
    <div className="mb-2" style={{ textAlign: align }}>
      <Field
        value={title}
        onChange={onChange}
        className={`text-sm font-bold tracking-wider ${caseClass}`}
        style={{ color: accentColor } as React.CSSProperties}
      />
      {dividerStyle !== "none" && (
        <div 
          className="mt-1 w-full" 
          style={{ 
            borderBottom: `1.5px ${dividerStyle} ${accentColor}`,
            opacity: 0.4 
          }} 
        />
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ResumeSection({
  section,
  design,
  isSelected,
  onSelect,
  onChange,
  dragHandleProps,
}: ResumeSectionProps) {
  const acc = design.accentColor;
  const fontFamily = FONT_CSS[design.fontFamily] ?? "'Inter', sans-serif";
  const fontSize = FONT_SIZE_MAP[design.fontSize] ?? "12px";

  // Generic updater for content field
  const updateContent = (patch: Record<string, unknown>) => {
    onChange({ ...section, content: { ...section.content, ...patch } as typeof section.content });
  };

  // ── HEADER ────────────────────────────────────────────────────────────────
  if (section.content.type === "header") {
    const c = section.content;
    const isBanner = design.templateId === "bold" || design.templateId === "modern";
    const isCentered = design.templateId === "minimal";

    return (
      <div
        onClick={onSelect}
        className={`relative transition-all cursor-pointer ${isSelected ? "ring-2 ring-blue-400 ring-offset-1 rounded-sm" : "hover:ring-1 hover:ring-slate-200 rounded-sm"}`}
      >
        {isSelected && <DragHandle dragHandleProps={dragHandleProps} />}

        <div
          className={`px-8 py-5 ${isBanner ? "text-white" : ""} ${isCentered ? "text-center" : ""}`}
          style={{
            background: isBanner ? "#0f172a" : "transparent",
            fontFamily,
          }}
        >
          {/* Name */}
          <Field
            value={c.name}
            onChange={(v) => updateContent({ name: v })}
            placeholder="Your Name"
            accentColor={acc}
            className={`font-bold leading-tight ${isBanner ? "text-white" : "text-slate-900"}`}
            style={{ fontSize: "22px" } as React.CSSProperties}
          />
          {/* Title */}
          <Field
            value={c.title}
            onChange={(v) => updateContent({ title: v })}
            placeholder="Professional Title"
            accentColor={acc}
            className="font-medium mt-0.5"
            style={{ fontSize: "13px", color: isBanner ? acc : acc } as React.CSSProperties}
          />
          {/* Contact row */}
          <div className={`flex flex-wrap gap-x-4 gap-y-0.5 mt-2 ${isCentered ? "justify-center" : ""}`}>
            {[
              { key: "email", placeholder: "email@example.com" },
              { key: "phone", placeholder: "+1 (555) 000-0000" },
              { key: "location", placeholder: "City, State" },
              { key: "linkedin", placeholder: "linkedin.com/in/..." },
              { key: "website", placeholder: "yoursite.com" },
            ].map(({ key, placeholder }) => (
              <Field
                key={key}
                value={(c as Record<string, string>)[key] ?? ""}
                onChange={(v) => updateContent({ [key]: v })}
                placeholder={placeholder}
                accentColor={acc}
                className={isBanner ? "text-slate-300" : "text-slate-500"}
                style={{ fontSize: "10px" } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── SUMMARY ───────────────────────────────────────────────────────────────
  if (section.content.type === "summary") {
    const c = section.content;
    return (
      <SectionWrapper isSelected={isSelected} onSelect={onSelect} dragHandleProps={dragHandleProps} fontFamily={fontFamily} design={design}>
        <SectionTitle 
          title={c.title} 
          accentColor={acc} 
          titleCase={design.sectionTitleCase}
          align={design.sectionTitleAlign}
          dividerStyle={design.dividerStyle}
          onChange={(v) => updateContent({ title: v })} 
        />
        <Field
          value={c.text}
          onChange={(v) => updateContent({ text: v })}
          placeholder="Write your professional summary..."
          multiline
          accentColor={acc}
          className="text-slate-600 dark:text-slate-300 leading-relaxed"
          style={{ fontSize } as React.CSSProperties}
        />
      </SectionWrapper>
    );
  }

  // ── EXPERIENCE ────────────────────────────────────────────────────────────
  if (section.content.type === "experience") {
    const c = section.content;
    const updateEntries = (entries: ExperienceEntry[]) => updateContent({ entries });

    return (
      <SectionWrapper isSelected={isSelected} onSelect={onSelect} dragHandleProps={dragHandleProps} fontFamily={fontFamily} design={design}>
        <SectionTitle 
          title={c.title} 
          accentColor={acc} 
          titleCase={design.sectionTitleCase}
          align={design.sectionTitleAlign}
          dividerStyle={design.dividerStyle}
          onChange={(v) => updateContent({ title: v })} 
        />
        <div className="space-y-4">
          {c.entries.map((entry, ei) => (
            <div key={entry.id} className="group/entry relative">
              {isSelected && (
                <button
                  onClick={(e) => { e.stopPropagation(); updateEntries(c.entries.filter((_, i) => i !== ei)); }}
                  className="absolute -right-1 -top-1 z-10 w-5 h-5 rounded-full bg-red-100 text-red-500 opacity-0 group-hover/entry:opacity-100 transition-all flex items-center justify-center"
                >
                  <Trash2 size={10} />
                </button>
              )}
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <Field value={entry.role} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, role: v }; updateEntries(e2); }} placeholder="Job Title" className="font-semibold text-slate-800 dark:text-slate-100" style={{ fontSize: "12px" } as React.CSSProperties} accentColor={acc} />
                  <Field value={entry.company} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, company: v }; updateEntries(e2); }} placeholder="Company Name" className="text-slate-600" style={{ fontSize, color: acc } as React.CSSProperties} accentColor={acc} />
                </div>
                <div className="text-right shrink-0">
                  <div className="flex gap-1 text-slate-500 justify-end" style={{ fontSize: "10px" }}>
                    <Field value={entry.startDate} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, startDate: v }; updateEntries(e2); }} placeholder="Start" className="text-slate-500" accentColor={acc} />
                    <span>–</span>
                    <Field value={entry.endDate} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, endDate: v }; updateEntries(e2); }} placeholder="End" className="text-slate-500" accentColor={acc} />
                  </div>
                  <Field value={entry.location} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, location: v }; updateEntries(e2); }} placeholder="Location" className="text-slate-400" style={{ fontSize: "10px" } as React.CSSProperties} accentColor={acc} />
                </div>
              </div>
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                {entry.bullets.map((bullet, bi) => (
                  <li key={bi} className="text-slate-600 dark:text-slate-300 flex items-start gap-1" style={{ fontSize }}>
                    <span className="shrink-0 mt-1" style={{ color: acc }}>▸</span>
                    <Field
                      value={bullet}
                      onChange={(v) => {
                        const e2 = [...c.entries];
                        const bullets = [...entry.bullets];
                        bullets[bi] = v;
                        e2[ei] = { ...entry, bullets };
                        updateEntries(e2);
                      }}
                      multiline
                      placeholder="Describe your achievement..."
                      className="flex-1 text-slate-600 dark:text-slate-300"
                      accentColor={acc}
                    />
                    {isSelected && (
                      <button onClick={(e) => { e.stopPropagation(); const e2 = [...c.entries]; const bullets = entry.bullets.filter((_, i) => i !== bi); e2[ei] = { ...entry, bullets }; updateEntries(e2); }} className="shrink-0 text-red-400 opacity-50 hover:opacity-100 transition-opacity">
                        <Trash2 size={9} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isSelected && (
                <div className="flex gap-2 mt-2">
                  <button onClick={(e) => { e.stopPropagation(); const e2 = [...c.entries]; e2[ei] = { ...entry, bullets: [...entry.bullets, ""] }; updateEntries(e2); }} className="text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-1 font-medium">
                    <Plus size={10} /> Add bullet
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {isSelected && (
          <button onClick={(e) => { e.stopPropagation(); updateEntries([...c.entries, { id: uuidv4(), company: "Company", role: "Role", startDate: "", endDate: "Present", location: "", bullets: [""] }]); }} className="mt-3 w-full py-1.5 rounded-lg border border-dashed border-slate-300 text-[11px] text-slate-400 hover:text-slate-600 hover:border-slate-400 flex items-center justify-center gap-1.5 transition-all">
            <Plus size={12} /> Add Experience Entry
          </button>
        )}
      </SectionWrapper>
    );
  }

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  if (section.content.type === "education") {
    const c = section.content;
    const updateEntries = (entries: EducationEntry[]) => updateContent({ entries });

    return (
      <SectionWrapper isSelected={isSelected} onSelect={onSelect} dragHandleProps={dragHandleProps} fontFamily={fontFamily} design={design}>
        <SectionTitle 
          title={c.title} 
          accentColor={acc} 
          titleCase={design.sectionTitleCase}
          align={design.sectionTitleAlign}
          dividerStyle={design.dividerStyle}
          onChange={(v) => updateContent({ title: v })} 
        />
        <div className="space-y-3">
          {c.entries.map((entry, ei) => (
            <div key={entry.id} className="group/entry relative flex justify-between items-start gap-2">
              {isSelected && (
                <button onClick={(e) => { e.stopPropagation(); updateEntries(c.entries.filter((_, i) => i !== ei)); }} className="absolute -right-1 -top-1 z-10 w-5 h-5 rounded-full bg-red-100 text-red-500 opacity-0 group-hover/entry:opacity-100 transition-all flex items-center justify-center">
                  <Trash2 size={10} />
                </button>
              )}
              <div className="flex-1">
                <Field value={entry.institution} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, institution: v }; updateEntries(e2); }} placeholder="University Name" className="font-semibold text-slate-800 dark:text-slate-100" style={{ fontSize: "12px" } as React.CSSProperties} accentColor={acc} />
                <div className="flex gap-1" style={{ fontSize }}>
                  <Field value={entry.degree} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, degree: v }; updateEntries(e2); }} placeholder="Degree" className="text-slate-600" style={{ color: acc } as React.CSSProperties} accentColor={acc} />
                  {entry.field && <span className="text-slate-400">·</span>}
                  <Field value={entry.field ?? ""} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, field: v }; updateEntries(e2); }} placeholder="Field" className="text-slate-500" accentColor={acc} />
                </div>
                {entry.gpa && (
                  <Field value={entry.gpa} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, gpa: v }; updateEntries(e2); }} placeholder="GPA" className="text-slate-400" style={{ fontSize: "10px" } as React.CSSProperties} accentColor={acc} />
                )}
              </div>
              <div className="text-right shrink-0" style={{ fontSize: "10px" }}>
                <div className="flex gap-1 text-slate-500 justify-end">
                  <Field value={entry.startDate} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, startDate: v }; updateEntries(e2); }} placeholder="Start" className="text-slate-500" accentColor={acc} />
                  <span>–</span>
                  <Field value={entry.endDate} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, endDate: v }; updateEntries(e2); }} placeholder="End" className="text-slate-500" accentColor={acc} />
                </div>
                <Field value={entry.location ?? ""} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, location: v }; updateEntries(e2); }} placeholder="Location" className="text-slate-400" accentColor={acc} />
              </div>
            </div>
          ))}
        </div>
        {isSelected && (
          <button onClick={(e) => { e.stopPropagation(); updateEntries([...c.entries, { id: uuidv4(), institution: "University", degree: "Degree", field: "", startDate: "", endDate: "", location: "", gpa: "" }]); }} className="mt-3 w-full py-1.5 rounded-lg border border-dashed border-slate-300 text-[11px] text-slate-400 hover:text-slate-600 hover:border-slate-400 flex items-center justify-center gap-1.5 transition-all">
            <Plus size={12} /> Add Education Entry
          </button>
        )}
      </SectionWrapper>
    );
  }

  // ── SKILLS ────────────────────────────────────────────────────────────────
  if (section.content.type === "skills") {
    const c = section.content;
    const updateCats = (categories: SkillCategory[]) => updateContent({ categories });

    return (
      <SectionWrapper isSelected={isSelected} onSelect={onSelect} dragHandleProps={dragHandleProps} fontFamily={fontFamily} design={design}>
        <SectionTitle 
          title={c.title} 
          accentColor={acc} 
          titleCase={design.sectionTitleCase}
          align={design.sectionTitleAlign}
          dividerStyle={design.dividerStyle}
          onChange={(v) => updateContent({ title: v })} 
        />
        <div className="space-y-1.5">
          {c.categories.map((cat, ci) => (
            <div key={cat.id} className="group/cat relative flex items-start gap-2">
              {isSelected && (
                <button onClick={(e) => { e.stopPropagation(); updateCats(c.categories.filter((_, i) => i !== ci)); }} className="absolute -left-4 top-0.5 w-4 h-4 flex items-center justify-center text-red-400 opacity-0 group-hover/cat:opacity-100 transition-opacity">
                  <Trash2 size={10} />
                </button>
              )}
              <Field value={cat.name} onChange={(v) => { const cats = [...c.categories]; cats[ci] = { ...cat, name: v }; updateCats(cats); }} placeholder="Category" className="font-semibold text-slate-700 dark:text-slate-200 shrink-0 w-24" style={{ fontSize } as React.CSSProperties} accentColor={acc} />
              <span className="text-slate-300 shrink-0" style={{ fontSize }}>:</span>
              <Field value={cat.items} onChange={(v) => { const cats = [...c.categories]; cats[ci] = { ...cat, items: v }; updateCats(cats); }} placeholder="Skill 1, Skill 2..." className="flex-1 text-slate-600 dark:text-slate-300" style={{ fontSize } as React.CSSProperties} accentColor={acc} />
            </div>
          ))}
        </div>
        {isSelected && (
          <button onClick={(e) => { e.stopPropagation(); updateCats([...c.categories, { id: uuidv4(), name: "Category", items: "" }]); }} className="mt-3 w-full py-1.5 rounded-lg border border-dashed border-slate-300 text-[11px] text-slate-400 hover:text-slate-600 hover:border-slate-400 flex items-center justify-center gap-1.5 transition-all">
            <Plus size={12} /> Add Skill Category
          </button>
        )}
      </SectionWrapper>
    );
  }

  // ── PROJECTS ─────────────────────────────────────────────────────────────
  if (section.content.type === "projects") {
    const c = section.content;
    const updateEntries = (entries: ProjectEntry[]) => updateContent({ entries });

    return (
      <SectionWrapper isSelected={isSelected} onSelect={onSelect} dragHandleProps={dragHandleProps} fontFamily={fontFamily} design={design}>
        <SectionTitle 
          title={c.title} 
          accentColor={acc} 
          titleCase={design.sectionTitleCase}
          align={design.sectionTitleAlign}
          dividerStyle={design.dividerStyle}
          onChange={(v) => updateContent({ title: v })} 
        />
        <div className="space-y-3">
          {c.entries.map((entry, ei) => (
            <div key={entry.id} className="group/entry relative">
              {isSelected && (
                <button onClick={(e) => { e.stopPropagation(); updateEntries(c.entries.filter((_, i) => i !== ei)); }} className="absolute -right-1 -top-1 z-10 w-5 h-5 rounded-full bg-red-100 text-red-500 opacity-0 group-hover/entry:opacity-100 transition-all flex items-center justify-center">
                  <Trash2 size={10} />
                </button>
              )}
              <div className="flex items-start justify-between gap-2">
                <Field value={entry.name} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, name: v }; updateEntries(e2); }} placeholder="Project Name" className="font-semibold text-slate-800 dark:text-slate-100" style={{ fontSize: "12px", color: acc } as React.CSSProperties} accentColor={acc} />
                <Field value={entry.link ?? ""} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, link: v }; updateEntries(e2); }} placeholder="link" className="text-slate-400 text-right" style={{ fontSize: "10px" } as React.CSSProperties} accentColor={acc} />
              </div>
              <Field value={entry.technologies ?? ""} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, technologies: v }; updateEntries(e2); }} placeholder="React, Node.js..." className="text-slate-500 italic" style={{ fontSize: "10px" } as React.CSSProperties} accentColor={acc} />
              <Field value={entry.description} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, description: v }; updateEntries(e2); }} placeholder="Describe the project..." multiline className="text-slate-600 dark:text-slate-300 mt-0.5" style={{ fontSize } as React.CSSProperties} accentColor={acc} />
            </div>
          ))}
        </div>
        {isSelected && (
          <button onClick={(e) => { e.stopPropagation(); updateEntries([...c.entries, { id: uuidv4(), name: "Project", description: "", technologies: "", link: "" }]); }} className="mt-3 w-full py-1.5 rounded-lg border border-dashed border-slate-300 text-[11px] text-slate-400 hover:text-slate-600 hover:border-slate-400 flex items-center justify-center gap-1.5 transition-all">
            <Plus size={12} /> Add Project
          </button>
        )}
      </SectionWrapper>
    );
  }

  // ── CERTIFICATIONS ────────────────────────────────────────────────────────
  if (section.content.type === "certifications") {
    const c = section.content;
    const updateEntries = (entries: CertificationEntry[]) => updateContent({ entries });

    return (
      <SectionWrapper isSelected={isSelected} onSelect={onSelect} dragHandleProps={dragHandleProps} fontFamily={fontFamily} design={design}>
        <SectionTitle 
          title={c.title} 
          accentColor={acc} 
          titleCase={design.sectionTitleCase}
          align={design.sectionTitleAlign}
          dividerStyle={design.dividerStyle}
          onChange={(v) => updateContent({ title: v })} 
        />
        <div className="space-y-2">
          {c.entries.map((entry, ei) => (
            <div key={entry.id} className="group/entry relative flex items-center justify-between gap-2">
              {isSelected && (
                <button onClick={(e) => { e.stopPropagation(); updateEntries(c.entries.filter((_, i) => i !== ei)); }} className="absolute -right-1 -top-1 z-10 w-5 h-5 rounded-full bg-red-100 text-red-500 opacity-0 group-hover/entry:opacity-100 transition-all flex items-center justify-center">
                  <Trash2 size={10} />
                </button>
              )}
              <div>
                <Field value={entry.name} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, name: v }; updateEntries(e2); }} placeholder="Certification Name" className="font-semibold text-slate-800 dark:text-slate-100" style={{ fontSize: "12px" } as React.CSSProperties} accentColor={acc} />
                <Field value={entry.issuer} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, issuer: v }; updateEntries(e2); }} placeholder="Issuing Organization" className="text-slate-500" style={{ fontSize, color: acc } as React.CSSProperties} accentColor={acc} />
              </div>
              <Field value={entry.date} onChange={(v) => { const e2 = [...c.entries]; e2[ei] = { ...entry, date: v }; updateEntries(e2); }} placeholder="Date" className="text-slate-400 text-right shrink-0" style={{ fontSize: "10px" } as React.CSSProperties} accentColor={acc} />
            </div>
          ))}
        </div>
        {isSelected && (
          <button onClick={(e) => { e.stopPropagation(); updateEntries([...c.entries, { id: uuidv4(), name: "Certification", issuer: "", date: "" }]); }} className="mt-3 w-full py-1.5 rounded-lg border border-dashed border-slate-300 text-[11px] text-slate-400 hover:text-slate-600 hover:border-slate-400 flex items-center justify-center gap-1.5 transition-all">
            <Plus size={12} /> Add Certification
          </button>
        )}
      </SectionWrapper>
    );
  }

  // ── CUSTOM ────────────────────────────────────────────────────────────────
  if (section.content.type === "custom") {
    const c = section.content;
    return (
      <SectionWrapper isSelected={isSelected} onSelect={onSelect} dragHandleProps={dragHandleProps} fontFamily={fontFamily} design={design}>
        <SectionTitle 
          title={c.title} 
          accentColor={acc} 
          titleCase={design.sectionTitleCase}
          align={design.sectionTitleAlign}
          dividerStyle={design.dividerStyle}
          onChange={(v) => updateContent({ title: v })} 
        />
        <Field value={c.text} onChange={(v) => updateContent({ text: v })} placeholder="Add your content..." multiline accentColor={acc} className="text-slate-600 dark:text-slate-300 leading-relaxed" style={{ fontSize } as React.CSSProperties} />
      </SectionWrapper>
    );
  }

  return null;
}

// ─── Shared section wrapper ───────────────────────────────────────────────────
function SectionWrapper({
  children,
  isSelected,
  onSelect,
  dragHandleProps,
  fontFamily,
  design,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  fontFamily: string;
  design: DesignSettings;
}) {
  return (
    <div
      onClick={onSelect}
      className={`relative px-8 py-3 cursor-pointer transition-all ${
        isSelected
          ? "ring-2 ring-blue-400 ring-offset-1 bg-blue-50/30 dark:bg-blue-900/5 rounded-sm"
          : "hover:ring-1 hover:ring-slate-200 rounded-sm"
      }`}
      style={{ fontFamily }}
    >
      {isSelected && <DragHandle dragHandleProps={dragHandleProps} />}
      <div style={{ lineHeight: design.lineHeight }}>
        {children}
      </div>
    </div>
  );
}

function DragHandle({ dragHandleProps }: { dragHandleProps?: React.HTMLAttributes<HTMLDivElement> }) {
  return (
    <div
      {...dragHandleProps}
      className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-8 flex items-center justify-center text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      <GripVertical size={14} />
    </div>
  );
}
