import { LatexTemplate, ResumeData } from "../types";
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
 * Enhanced LaTeX to HTML conversion with better parsing and formatting
 * This provides more accurate conversion from LaTeX to HTML for better PDF rendering
 */
export function latexToHtml(latex: string): string {
  let html = latex;

  // Remove LaTeX preamble and document setup
  html = html.replace(/\\documentclass\[.*?\]\{.*?\}/g, "");
  html = html.replace(/\\usepackage(\[.*?\])?\{.*?\}/g, "");
  html = html.replace(/\\geometry\{.*?\}/g, "");
  html = html.replace(/\\setlist\[.*?\]\{.*?\}/g, "");
  html = html.replace(
    /\\titleformat\{.*?\}\{.*?\}\{.*?\}\{.*?\}\{.*?\}(\[.*?\])?/g,
    ""
  );
  html = html.replace(/\\titlespacing\*?\{.*?\}\{.*?\}\{.*?\}\{.*?\}/g, "");
  html = html.replace(/\\hypersetup\{[^}]*\}/gs, "");

  // Document structure
  html = html.replace(/\\begin\{document\}/g, "");
  html = html.replace(/\\end\{document\}/g, "");

  // Center environment with proper CSS class
  html = html.replace(/\\begin\{center\}/g, '<div class="center">');
  html = html.replace(/\\end\{center\}/g, "</div>");

  // Flush environments
  html = html.replace(
    /\\begin\{flushright\}/g,
    '<div style="text-align: right;">'
  );
  html = html.replace(/\\end\{flushright\}/g, "</div>");
  html = html.replace(
    /\\begin\{flushleft\}/g,
    '<div style="text-align: left;">'
  );
  html = html.replace(/\\end\{flushleft\}/g, "</div>");

  // Section headers
  html = html.replace(/\\section\*\{([^}]+)\}/g, "<h2>$1</h2>");
  html = html.replace(/\\subsection\*\{([^}]+)\}/g, "<h3>$1</h3>");

  // Text formatting with better handling of nested commands
  html = html.replace(/\\Large\\textbf\{([^}]+)\}/g, "<h1>$1</h1>");
  html = html.replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>");
  html = html.replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>");
  html = html.replace(/\\texttt\{([^}]+)\}/g, "<code>$1</code>");
  html = html.replace(/\\emph\{([^}]+)\}/g, "<em>$1</em>");

  // Handle font size commands
  html = html.replace(/\\Large/g, "");
  html = html.replace(/\\large/g, "");
  html = html.replace(/\\small/g, "");
  html = html.replace(/\\tiny/g, "");

  // Lists with proper nesting support
  html = html.replace(/\\begin\{itemize\}/g, "<ul>");
  html = html.replace(/\\end\{itemize\}/g, "</ul>");
  html = html.replace(/\\begin\{enumerate\}/g, "<ol>");
  html = html.replace(/\\end\{enumerate\}/g, "</ol>");

  // Handle list items with better spacing
  html = html.replace(/\\item\s+/g, "<li>");
  html = html.replace(/<li>([^<]*?)(?=<li>|<\/[uo]l>)/gs, "<li>$1</li>");

  // Handle line breaks and spacing more accurately
  html = html.replace(/\\\\\\\\/g, "<br><br>");
  html = html.replace(/\\\\\s*/g, "<br>");
  html = html.replace(/\\newline/g, "<br>");
  html = html.replace(/\\linebreak/g, "<br>");

  // Spacing commands
  html = html.replace(
    /\\vspace\{([^}]*)\}/g,
    '<div style="margin-bottom: $1;"></div>'
  );
  html = html.replace(
    /\\hspace\{([^}]*)\}/g,
    '<span style="margin-left: $1;"></span>'
  );

  // Handle horizontal fills and positioning
  html = html.replace(/\\hfill\s*/g, '<span class="date-range">');
  html = html.replace(
    /<span class="date-range">([^<]*?)(?=<br>|$)/g,
    '<span class="date-range">$1</span>'
  );

  // Links and URLs
  html = html.replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '<a href="$1">$2</a>');
  html = html.replace(/\\url\{([^}]+)\}/g, '<a href="$1">$1</a>');

  // Special characters and symbols
  html = html.replace(/\\\$/g, "");
  html = html.replace(/\$\|\$/g, " | ");
  html = html.replace(/\$\s*\|\s*\$/g, " | ");
  html = html.replace(/\\&/g, "&");
  html = html.replace(/\\%/g, "%");
  html = html.replace(/\\#/g, "#");
  html = html.replace(/\\_/g, "_");
  html = html.replace(/\\\{/g, "{");
  html = html.replace(/\\\}/g, "}");
  html = html.replace(/\\textbackslash/g, "\\");

  // Date commands
  html = html.replace(
    /\\today/g,
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  // Clean up whitespace and empty elements
  html = html.replace(/\n\s*\n/g, "\n");
  html = html.replace(/\s+/g, " ");
  html = html.trim();

  // Structure the content better for PDF generation
  html = structureContentForPdf(html);

  // Return wrapped HTML for optimal PDF rendering
  return createEnhancedHtmlWrapper(html);
}

/**
 * Structure HTML content for better PDF rendering
 */
function structureContentForPdf(html: string): string {
  // Wrap experience items
  html = html.replace(
    /<strong>([^<]+)<\/strong>\s*<span class="date-range">([^<]+)<\/span>\s*<br>\s*<em>([^<]+)<\/em>\s*<br>\s*<ul>(.*?)<\/ul>/gs,
    '<div class="experience-item"><h3>$1 <span class="date-range">$2</span></h3><div class="company-name">$3</div><ul>$4</ul></div>'
  );

  // Wrap education items
  html = html.replace(
    /<strong>([^<]+)<\/strong>\s*<span class="date-range">([^<]+)<\/span>\s*<br>\s*<em>([^<]+)<\/em>/g,
    '<div class="education-item"><h3>$1 <span class="date-range">$2</span></h3><div class="institution">$3</div></div>'
  );

  // Wrap project items
  html = html.replace(
    /<strong>([^<]+)<\/strong>\s*<br>\s*([^<]*?)\s*<br>\s*<em>Technologies: ([^<]+)<\/em>/g,
    '<div class="project-item"><h3>$1</h3><p>$2</p><div class="technologies"><em>Technologies: $3</em></div></div>'
  );

  return html;
}

/**
 * Enhanced HTML wrapper with better CSS for professional documents
 */
export function createEnhancedHtmlWrapper(
  content: string,
  title: string = "Resume"
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 0.75in;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .center {
            text-align: center;
            margin-bottom: 1.5em;
        }
        
        h1 {
            font-size: 18pt;
            font-weight: bold;
            margin: 0;
            padding: 0;
        }
        
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 1.2em 0 0.6em 0;
            padding-bottom: 3pt;
            border-bottom: 1pt solid #000;
            page-break-after: avoid;
        }
        
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin: 0.8em 0 0.3em 0;
            page-break-after: avoid;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        
        p {
            margin: 0.4em 0;
        }
        
        ul {
            margin: 0.3em 0 0.8em 0;
            padding-left: 1.2em;
        }
        
        li {
            margin: 0.15em 0;
        }
        
        strong {
            font-weight: bold;
        }
        
        em {
            font-style: italic;
        }
        
        a {
            color: #0066cc;
            text-decoration: none;
        }
        
        code {
            font-family: 'Courier New', monospace;
            background-color: #f5f5f5;
            padding: 1pt 2pt;
            border-radius: 2pt;
        }
        
        .date-range {
            font-weight: normal;
            font-size: 10pt;
            color: #666;
        }
        
        .company-name,
        .institution {
            font-style: italic;
            margin-bottom: 0.3em;
            color: #333;
        }
        
        .experience-item,
        .education-item,
        .project-item {
            margin-bottom: 1em;
            page-break-inside: avoid;
        }
        
        .technologies {
            margin-top: 0.3em;
            font-size: 10pt;
        }
        
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
}
