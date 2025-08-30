import { z } from "zod";
import LaTeX2HTML5 from "latex2js";
import { LatexTemplate } from "../types";
import { RESUME_TEMPLATE } from "../data/resumeTemplate";
import { COVER_LETTER_TEMPLATE } from "../data/coverLetterTemplate";

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

export function extractPlaceholders(text: string): string[] {
  const regex = /<([A-Z0-9_]+)>/gi;
  return Array.from(new Set(Array.from(text.matchAll(regex), (m) => m[1])));
}

export function buildSchema(placeholders: string[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const p of placeholders) {
    shape[p] = z.string();
  }
  return z.object(shape);
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

/**
 * Fill resume template with provided data
 * This is a placeholder implementation - replace placeholders in the template
 */
export function fillResumeTemplate(template: string, data: any): string {
  let filledTemplate = template;
  
  // Replace placeholders with actual data
  // This is a basic implementation - you can enhance this based on your template structure
  Object.keys(data).forEach(key => {
    const placeholder = `<${key.toUpperCase()}>`;
    const value = data[key];
    
    if (typeof value === 'string') {
      filledTemplate = filledTemplate.replace(new RegExp(placeholder, 'g'), value);
    } else if (Array.isArray(value)) {
      filledTemplate = filledTemplate.replace(new RegExp(placeholder, 'g'), value.join(', '));
    } else if (typeof value === 'object' && value !== null) {
      filledTemplate = filledTemplate.replace(new RegExp(placeholder, 'g'), JSON.stringify(value));
    }
  });
  
  return filledTemplate;
}

/**
 * Fill cover letter template with provided data
 */
export function fillCoverLetterTemplate(template: string, data: any): string {
  let filledTemplate = template;
  
  // Replace placeholders with actual data
  Object.keys(data).forEach(key => {
    const placeholder = `<${key.toUpperCase()}>`;
    const value = data[key];
    
    if (typeof value === 'string') {
      filledTemplate = filledTemplate.replace(new RegExp(placeholder, 'g'), value);
    }
  });
  
  return filledTemplate;
}
