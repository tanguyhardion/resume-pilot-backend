export const COVER_LETTER_TEMPLATE = `
\\documentclass[a4paper,11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage{geometry}
\\geometry{a4paper, left=25mm, right=25mm, top=20mm, bottom=20mm}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage[normalem]{ulem}

% Setting up fonts
\\usepackage{mathpazo}
\\linespread{1.05}

\\pagestyle{empty}

\\begin{document}

% Header: Sender and receiver info
\\begin{flushleft}
\\textbf{Tanguy Hardion} \\\\
tanguy.hardion@gmail.com \\\\
+33 7 68 89 28 80 \\\\
\\uline{\\href{https://www.linkedin.com/in/tanguy-hardion}{linkedin.com/in/tanguy-hardion}} \\\\
\\today
\\end{flushleft}https://www.linkedin.com/in/tanguy-hardion

\\begin{flushright}
<HIRING MANAGER> \\\\
<COMPANY NAME> \\\\
<COMPANY LOCATION> \\\\
\\end{flushright}

% Subject Line
\\vspace{10mm}
\\textbf{Subject: Application for <JOB TITLE> - [REFERENCE NUMBER IF APPLICABLE]} \\\\
\\vspace{5mm}

% Salutation
Dear <HIRING MANAGER>, \\\\
\\vspace{5mm}

<COVER LETTER CONTENT> \\\\

% Signature
\\vspace{5mm}
Yours sincerely, \\\\ \\\\
Tanguy Hardion

\\end{document}
`;
