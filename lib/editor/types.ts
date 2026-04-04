export type SectionType =
  | "header"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "custom";

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
  location?: string;
  gpa?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies?: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: string;
}

export type HeaderContent = {
  type: "header";
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
};

export type SummaryContent = {
  type: "summary";
  title: string;
  text: string;
};

export type ExperienceContent = {
  type: "experience";
  title: string;
  entries: ExperienceEntry[];
};

export type EducationContent = {
  type: "education";
  title: string;
  entries: EducationEntry[];
};

export type SkillsContent = {
  type: "skills";
  title: string;
  categories: SkillCategory[];
};

export type ProjectsContent = {
  type: "projects";
  title: string;
  entries: ProjectEntry[];
};

export type CertificationsContent = {
  type: "certifications";
  title: string;
  entries: CertificationEntry[];
};

export type CustomContent = {
  type: "custom";
  title: string;
  text: string;
};

export type SectionContent =
  | HeaderContent
  | SummaryContent
  | ExperienceContent
  | EducationContent
  | SkillsContent
  | ProjectsContent
  | CertificationsContent
  | CustomContent;

export interface ResumeSection {
  id: string;
  type: SectionType;
  content: SectionContent;
}

export type TemplateId = "classic" | "modern" | "minimal" | "bold";
export type FontFamily =
  | "inter"
  | "merriweather"
  | "roboto"
  | "playfair"
  | "montserrat"
  | "lato";
export type FontSize = "sm" | "md" | "lg";

export interface DesignSettings {
  templateId: TemplateId;
  fontFamily: FontFamily;
  accentColor: string;
  fontSize: FontSize;
  // Layout
  sectionSpacing: number;
  contentSpacing: number;
  pageMargin: number;
  lineHeight: number;
  // Style
  sectionTitleCase: "uppercase" | "capitalize" | "normal";
  sectionTitleAlign: "left" | "center" | "right";
  dividerStyle: "solid" | "dashed" | "dotted" | "none";
}

export interface ResumeData {
  id: string;
  name: string;
  sections: ResumeSection[];
  design: DesignSettings;
}
