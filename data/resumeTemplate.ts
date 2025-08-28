export const RESUME_TEMPLATE = `
\\documentclass[letterpaper,11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{hyperref}

\\geometry{margin=0.75in}
\\setlist[itemize]{leftmargin=*,noitemsep,topsep=0pt}
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{0.5\\baselineskip}{0.3\\baselineskip}

\\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    urlcolor=blue
}

\\begin{document}

\\begin{center}
    {\\Large\\textbf{{{NAME}}}} \\\\
    {{EMAIL}} $|$ {{PHONE}} $|$ {{LOCATION}} \\\\
    \\href{{{LINKEDIN}}}{LinkedIn} $|$ \\href{{{GITHUB}}}{GitHub}
\\end{center}

\\section*{Professional Summary}
{{SUMMARY}}

\\section*{Experience}
{{EXPERIENCE}}

\\section*{Education}
{{EDUCATION}}

\\section*{Technical Skills}
{{SKILLS}}

\\section*{Projects}
{{PROJECTS}}

\\end{document}
`;
