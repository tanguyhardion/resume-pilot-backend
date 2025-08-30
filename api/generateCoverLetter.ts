import { VercelRequest, VercelResponse } from '@vercel/node';
import { validateMasterPassword, setCorsHeaders, handleOptionsRequest, createErrorResponse, createSuccessResponse } from '../utils/auth';
import { ResumeAI } from '../utils/ai';
import { loadCoverLetterTemplate, fillCoverLetterTemplate, latexToHtml } from '../utils/latex';
import { generateCoverLetterPdf, createPdfResponse, createDualFileZip, createZipResponse } from '../utils/pdf';
import { CoverLetterRequest } from '../types';

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

    const { jobOffer, personalInfo }: CoverLetterRequest = req.body;

    if (!jobOffer) {
      res.status(400).json(createErrorResponse('Job offer text is required'));
      return;
    }

    // Initialize AI service
    const resumeAI = new ResumeAI();

    // Generate cover letter content using AI
    const coverLetterContent = await resumeAI.generateCoverLetterContent(jobOffer, personalInfo);

    // Load and fill LaTeX template
    const template = loadCoverLetterTemplate();
    const coverLetterData = {
      name: personalInfo?.name,
      email: personalInfo?.email,
      phone: personalInfo?.phone,
      location: personalInfo?.location,
      content: coverLetterContent
    };
    
    const filledLatex = fillCoverLetterTemplate(template.content, coverLetterData);

    // Convert to HTML
    const html = latexToHtml(filledLatex);

    // Generate PDF with optimized cover letter formatting
    const { pdfBuffer, filename } = await generateCoverLetterPdf(html, `cover_letter_${Date.now()}.pdf`);

    // Create ZIP containing both PDF and TeX files
    const baseName = `cover_letter_${Date.now()}`;
    const { zipBuffer, filename: zipFilename } = await createDualFileZip(pdfBuffer, filledLatex, baseName);

    // Create ZIP response with proper headers
    const zipResponse = createZipResponse(zipBuffer, zipFilename);

    // Set response headers
    Object.entries(zipResponse.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Send ZIP containing both PDF and TeX
    res.status(200).send(zipBuffer);

  } catch (error) {
    console.error('Error generating cover letter:', error);
    res.status(500).json(createErrorResponse('Internal server error while generating cover letter'));
  }
}
