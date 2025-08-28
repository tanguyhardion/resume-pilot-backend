import { VercelRequest, VercelResponse } from '@vercel/node';
import { validateMasterPassword, setCorsHeaders, handleOptionsRequest, createErrorResponse, createSuccessResponse } from '../utils/auth';
import { ResumeAI } from '../utils/ai';
import { loadResumeTemplate, fillResumeTemplate, latexToHtml } from '../utils/latex';
import { generateResumePdf, createPdfResponse } from '../utils/pdf';
import { ResumeRequest } from '../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  setCorsHeaders(res);
  
  if (handleOptionsRequest(req, res)) {
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json(createErrorResponse('Method not allowed'));
    return;
  }

  try {
    // Validate master password
    if (!validateMasterPassword(req)) {
      res.status(401).json(createErrorResponse('Invalid or missing master password'));
      return;
    }

    const { jobOffer, personalInfo }: ResumeRequest = req.body;

    if (!jobOffer) {
      res.status(400).json(createErrorResponse('Job offer text is required'));
      return;
    }

    // Initialize AI service
    const resumeAI = new ResumeAI();

    // Generate resume data using AI
    const resumeData = await resumeAI.generateResumeData(jobOffer, personalInfo);

    // Load and fill LaTeX template
    const template = loadResumeTemplate();
    const filledLatex = fillResumeTemplate(template.content, resumeData);

    // Convert to HTML
    const html = latexToHtml(filledLatex);

    // Generate PDF with optimized resume formatting
    const { pdfBuffer, filename } = await generateResumePdf(html, `resume_${Date.now()}.pdf`);

    // Create PDF response with proper headers
    const pdfResponse = createPdfResponse(pdfBuffer, filename);

    // Set response headers
    Object.entries(pdfResponse.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Send PDF
    res.status(200).send(Buffer.from(pdfBuffer));

  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json(createErrorResponse('Internal server error while generating resume'));
  }
}
