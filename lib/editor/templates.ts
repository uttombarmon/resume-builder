import type { TemplateId, FontFamily } from "./types";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  previewColors: [string, string, string];
  layout: "single" | "two-column";
  headerStyle: "left" | "centered" | "banner";
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Timeless single-column layout",
    previewColors: ["#f8fafc", "#1e293b", "#64748b"],
    layout: "single",
    headerStyle: "left",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary with accent sidebar",
    previewColors: ["#eff6ff", "#1e40af", "#3b82f6"],
    layout: "two-column",
    headerStyle: "banner",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, whitespace-focused",
    previewColors: ["#ffffff", "#374151", "#9ca3af"],
    layout: "single",
    headerStyle: "centered",
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong dark header band",
    previewColors: ["#0f172a", "#f8fafc", "#f59e0b"],
    layout: "single",
    headerStyle: "banner",
  },
];

export interface FontOption {
  value: FontFamily;
  label: string;
  googleImport: string;
  cssFamily: string;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    value: "inter",
    label: "Inter",
    googleImport: "Inter:wght@400;500;600;700",
    cssFamily: "'Inter', sans-serif",
  },
  {
    value: "merriweather",
    label: "Merriweather",
    googleImport: "Merriweather:wght@300;400;700",
    cssFamily: "'Merriweather', serif",
  },
  {
    value: "roboto",
    label: "Roboto",
    googleImport: "Roboto:wght@300;400;500;700",
    cssFamily: "'Roboto', sans-serif",
  },
  {
    value: "playfair",
    label: "Playfair Display",
    googleImport: "Playfair+Display:wght@400;600;700",
    cssFamily: "'Playfair Display', serif",
  },
  {
    value: "montserrat",
    label: "Montserrat",
    googleImport: "Montserrat:wght@300;400;600;700",
    cssFamily: "'Montserrat', sans-serif",
  },
  {
    value: "lato",
    label: "Lato",
    googleImport: "Lato:wght@300;400;700",
    cssFamily: "'Lato', sans-serif",
  },
];

export const ACCENT_COLORS = [
  { name: "Ocean Blue", value: "#1e40af" },
  { name: "Forest Green", value: "#15803d" },
  { name: "Crimson", value: "#b91c1c" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Amber", value: "#d97706" },
  { name: "Slate", value: "#475569" },
  { name: "Teal", value: "#0f766e" },
  { name: "Rose", value: "#be185d" },
];
