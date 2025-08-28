export interface ResumeRequest {
  jobOffer: string;
  masterPassword: string;
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface CoverLetterRequest {
  jobOffer: string;
  masterPassword: string;
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GenerateResponse {
  pdfBuffer: Uint8Array;
  filename: string;
}

export interface LatexTemplate {
  content: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}
