export const RESUME_TEMPLATE = `
\\documentclass[letterpaper,11pt]{article}

\\usepackage[absolute,overlay]{textpos}
\\usepackage{graphicx}  % for including images
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{tikz}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------

%%%%%%%%%%%%%%%%%%%%%%%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
% \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
%   \\textbf{\\href{http://sourabhbajaj.com/}{\\Large Sourabh Bajaj}} & Email : \\href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\\\
%   \\href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\\\
% \\end{tabular*}

\\begin{center}
    \\textbf{\\Huge \\scshape Tanguy Hardion} \\\\ \\vspace{3pt}
    \\href{mailto:tanguy.hardion@gmail.com}{\\underline{tanguy.hardion@gmail.com}} $|$
    \\href{https://linkedin.com/in/tanguy-hardion}{\\underline{linkedin.com/in/tanguy-hardion}}
    \\vspace{0.1cm}
    \\break
    \\href{https://tanguyhardion.github.io}{\\underline{tanguyhardion.github.io}} $|$
    \\href{https://github.com/tanguyhardion}{\\underline{github.com/tanguyhardion}}

    \\vspace{0.3cm}
    Computer Engineering student looking for an end-of-studies \\\\ 6-month internship in Data Science starting in Feb. 2025
\\end{center}


%-----------ACADEMICS-----------

\\section{Academics}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Université de Technologie de Compiègne}{Compiègne, France}
      {Specialization in Artificial Intelligence and Data Science}{Sept. 2024 -- Feb. 2025}
    \\resumeSubheading
      {Université de Technologie de Troyes}{Troyes, France}
      {Engineer's degree in Computer Science and Information Systems, Data Science track}{Sept. 2022 -- Aug. 2025}
    \\resumeSubheading
      {Institut Universitaire de Technologie de Dijon}{Dijon, France}
      {Associate degree in Computer Science}{Sept. 2020 -- June 2022}
  \\resumeSubHeadingListEnd



%-----------EXPERIENCE-----------
% -----------Multiple Positions Heading-----------
%    \\resumeSubSubheading
%     {Software Engineer I}{Oct 2014 - Sep 2016}
%     \\resumeItemListStart
%        \\resumeItem{Apache Beam}
%          {Apache Beam is a unified model for defining both batch and streaming data-parallel processing pipelines}
%     \\resumeItemListEnd
%    \\resumeSubHeadingListEnd
%-------------------------------------------

\\section{Experience}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {AI & Data Science Intern}{Feb. 2025 -- July 2025}
      {Deloitte}{Luxembourg}
      \\resumeItemListStart
        \\resumeItem{Developed a proof of concept to interact with a database in natural language by leveraging LLMs. LangChain, LangGraph.é}
      \\resumeItemListEnd

    \\resumeSubheading
      {Junior Software/AI Engineer}{July 2024 -- Aug. 2024}
      {CPage (Summer job)}{Dijon, France}
      \\resumeItemListStart
        \\resumeItem{Defined project requirements, established the development environment and created initial design specifications for a full-stack web application, outlining the system architecture and core functionalities}
        \\resumeItem{Developed the web app using Angular, SpringBoot and PostgreSQL, featuring an interactive map that displays customer satisfaction data}
        \\resumeItem{Integrated an NLP model from HuggingFace into the app using Flask for enhanced data analysis}
      \\resumeItemListEnd
      
    \\resumeSubheading
      {Software/AI Engineer Intern}{July. 2023 -- Dec. 2023}
      {CPage}{Dijon, France}
      \\resumeItemListStart
        \\resumeItem{Mid-engineering studies internship}
        \\resumeItem{Created a full-stack web application using Angular, SpringBoot and Oracle, utilizing graph theory to map software solutions and their dependencies}
    \\resumeItemListEnd

    \\resumeSubheading
      {Software Developer Intern}{Apr. 2022 -- June 2022}
      {Autoroutes Paris-Rhin-Rhône}{Saint-Apollinaire, France}
      \\resumeItemListStart
        \\resumeItem{Associate degree internship}
        \\resumeItem{Enhanced the features and graphical interface of a WPF app, restructured its database}
        \\resumeItem{Developed an SQLite database encryption tool}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------

\\section{Projects}
    \\resumeSubHeadingListStart
      \\resumeProjectHeading
          {\\textbf{CNN on CIFAR-100} $|$ \\emph{TensorFlow, Keras, HuggingFace}}{May 2024}
          \\resumeItemListStart
            \\resumeItem{Project part of a course on machine learning and deep learning}
            \\resumeItem{Training of a convolutional neural network (CNN) from scratch to classify images of the CIFAR-100 dataset}
            \\resumeItem{Preprocessed and engineered the dataset by normalizing the images and converting them to TensorFlow datasets}
            \\resumeItem{Experimented with different architectures and hyperparameters to improve the model's accuracy}
            \\resumeItem{Evaluated the model's performance using various metrics and visualizations}
          \\resumeItemListEnd
          
      \\resumeProjectHeading
          {\\textbf{Llama 2 fine-tuning} $|$ \\emph{PyTorch, HuggingFace, Meta AI}}{October 2023}
          \\resumeItemListStart
            \\resumeItem{Project made for a proof of concept during my mid-engineering studies internship}
            \\resumeItem{Fine-tuning of the 7B-parameter large language model (LLM) Llama 2}
            \\resumeItem{Prepared a dataset to train the model on extracting specific text from PDF files}
            \\resumeItem{Tuned the hyperparameters to make the model as accurate as possible}
            \\resumeItem{Experimented with different architectures and hyperparameters to improve the model's accuracy}
            \\resumeItem{Tested the model on various PDF files and evaluated its performance}
          \\resumeItemListEnd
    \\resumeSubHeadingListEnd

%-----------SKILLS-----------

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Python, R, JavaScript, Java, Go, C\\#, C, C++, SQL, HTML/CSS} \\\\
     \\textbf{Python Libraries}{: TensorFlow, Keras, PyTorch, scikit-learn, cvxpy, SciPy, NumPy, pandas, Matplotlib, plotly} \\\\
     \\textbf{Frameworks}{: Angular, React (Next), Vue (Nuxt), Spring, WPF, Swing, Qt} \\\\
     \\textbf{Developer Tools}{: Linux, Git, Maven, VS Code, Visual Studio, IntelliJ, Material Design}
    }}
 \\end{itemize}

%-------------------------------------------

\\end{document}
`;
