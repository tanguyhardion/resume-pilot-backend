import { LatexTemplate, ResumeData } from "../types";
import { RESUME_TEMPLATE } from "../data/resumeTemplate";
import { COVER_LETTER_TEMPLATE } from "../data/coverLetterTemplate";
import LaTeX2HTML5 from "latex2js";

export function loadResumeTemplate(): LatexTemplate {
  return {
    content: RESUME_TEMPLATE.trim(),
  };
}

export function loadCoverLetterTemplate(): LatexTemplate {
  return {
    content: COVER_LETTER_TEMPLATE.trim(),
  };
}

export function fillResumeTemplate(template: string, data: ResumeData): string {
  let filled = template;

  // Basic personal info
  filled = filled.replace(/{{NAME}}/g, data.name);
  filled = filled.replace(/{{EMAIL}}/g, data.email);
  filled = filled.replace(/{{PHONE}}/g, data.phone);
  filled = filled.replace(/{{LOCATION}}/g, data.location);
  filled = filled.replace(/{{LINKEDIN}}/g, data.linkedin);
  filled = filled.replace(/{{GITHUB}}/g, data.github);

  // Summary
  filled = filled.replace(/{{SUMMARY}}/g, data.summary);

  // Experience section
  const experienceLatex =
    data.experience
      ?.map(
        (exp) =>
          `\\textbf{${exp.title}} \\hfill ${exp.duration} \\\\
    \\textit{${exp.company}} \\\\
    \\begin{itemize}
    ${exp.description.map((desc) => `    \\item ${desc}`).join("\\n")}
    \\end{itemize}
    \\vspace{0.2cm}`
      )
      .join("\\n\\n") || "";

  filled = filled.replace(/{{EXPERIENCE}}/g, experienceLatex);

  // Education section
  const educationLatex =
    data.education
      ?.map(
        (edu) =>
          `\\textbf{${edu.degree}} \\hfill ${edu.year} \\\\
    \\textit{${edu.institution}}`
      )
      .join("\\n\\n") || "";

  filled = filled.replace(/{{EDUCATION}}/g, educationLatex);

  // Skills section
  const skillsLatex = data.skills?.join(", ") || "";
  filled = filled.replace(/{{SKILLS}}/g, skillsLatex);

  // Projects section
  const projectsLatex =
    data.projects
      ?.map(
        (project) =>
          `\\textbf{${project.name}} \\\\
    ${project.description} \\\\
    \\textit{Technologies: ${project.technologies.join(", ")}}
    \\vspace{0.2cm}`
      )
      .join("\\n\\n") || "";

  filled = filled.replace(/{{PROJECTS}}/g, projectsLatex);

  return filled;
}

export function fillCoverLetterTemplate(template: string, data: any): string {
  let filled = template;

  filled = filled.replace(/{{NAME}}/g, data.name);
  filled = filled.replace(/{{EMAIL}}/g, data.email);
  filled = filled.replace(/{{PHONE}}/g, data.phone);
  filled = filled.replace(/{{LOCATION}}/g, data.location);
  filled = filled.replace(/{{COVER_LETTER_CONTENT}}/g, data.content);

  return filled;
}

/**
 * Enhanced LaTeX to HTML conversion using latex2js
 * This provides accurate conversion from LaTeX to HTML for better PDF rendering
 */
export function latexToHtml(latex: string): string {
  const parser = new LaTeX2HTML5();

  const parsedResult = parser.parse(latex);
  let html = Array.isArray(parsedResult) ? parsedResult.join("") : parsedResult;

  return html;
}
