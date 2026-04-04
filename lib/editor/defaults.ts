import { v4 as uuidv4 } from "uuid";
import type { ResumeData, ResumeSection, SectionType } from "./types";

export function createDefaultSection(type: SectionType): ResumeSection {
  const id = uuidv4();

  switch (type) {
    case "header":
      return {
        id,
        type: "header",
        content: {
          type: "header",
          name: "Your Name",
          title: "Professional Title",
          email: "email@example.com",
          phone: "+1 (555) 000-0000",
          location: "City, State",
          linkedin: "linkedin.com/in/yourname",
          website: "",
        },
      };

    case "summary":
      return {
        id,
        type: "summary",
        content: {
          type: "summary",
          title: "Professional Summary",
          text: "Results-driven professional with X years of experience delivering high-impact solutions. Passionate about innovation, collaboration, and continuous improvement.",
        },
      };

    case "experience":
      return {
        id,
        type: "experience",
        content: {
          type: "experience",
          title: "Work Experience",
          entries: [
            {
              id: uuidv4(),
              company: "Company Name",
              role: "Job Title",
              startDate: "Jan 2022",
              endDate: "Present",
              location: "City, State",
              bullets: [
                "Led cross-functional teams to deliver key initiatives on time and within budget.",
                "Improved system performance by 40% through targeted optimization strategies.",
              ],
            },
          ],
        },
      };

    case "education":
      return {
        id,
        type: "education",
        content: {
          type: "education",
          title: "Education",
          entries: [
            {
              id: uuidv4(),
              institution: "University Name",
              degree: "Bachelor of Science",
              field: "Computer Science",
              startDate: "2018",
              endDate: "2022",
              location: "City, State",
              gpa: "3.8",
            },
          ],
        },
      };

    case "skills":
      return {
        id,
        type: "skills",
        content: {
          type: "skills",
          title: "Skills",
          categories: [
            { id: uuidv4(), name: "Languages", items: "JavaScript, TypeScript, Python" },
            { id: uuidv4(), name: "Frameworks", items: "React, Next.js, Node.js" },
            { id: uuidv4(), name: "Tools", items: "Git, Docker, AWS" },
          ],
        },
      };

    case "projects":
      return {
        id,
        type: "projects",
        content: {
          type: "projects",
          title: "Projects",
          entries: [
            {
              id: uuidv4(),
              name: "Project Name",
              description: "Brief description of what the project does and its real-world impact.",
              technologies: "React, Node.js, PostgreSQL",
              link: "github.com/username/project",
            },
          ],
        },
      };

    case "certifications":
      return {
        id,
        type: "certifications",
        content: {
          type: "certifications",
          title: "Certifications",
          entries: [
            {
              id: uuidv4(),
              name: "AWS Certified Solutions Architect",
              issuer: "Amazon Web Services",
              date: "Jan 2023",
            },
          ],
        },
      };

    case "custom":
      return {
        id,
        type: "custom",
        content: {
          type: "custom",
          title: "Custom Section",
          text: "Add your custom content here...",
        },
      };
  }
}

export function getDefaultResumeData(id: string, name: string): ResumeData {
  return {
    id,
    name,
    sections: [
      createDefaultSection("header"),
      createDefaultSection("summary"),
      createDefaultSection("experience"),
      createDefaultSection("education"),
      createDefaultSection("skills"),
    ],
    design: {
      templateId: "classic",
      fontFamily: "inter",
      accentColor: "#1e40af",
      fontSize: "md",
      sectionSpacing: 24,
      contentSpacing: 12,
      pageMargin: 64,
      lineHeight: 1.5,
      sectionTitleCase: "uppercase",
      sectionTitleAlign: "left",
      dividerStyle: "solid",
    },
  };
}
