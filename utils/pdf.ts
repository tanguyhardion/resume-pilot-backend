import puppeteer from 'puppeteer';

/**
 * Production-ready HTML to PDF conversion using Puppeteer
 * This provides high-quality PDF generation with proper formatting,
 * CSS support, and font rendering.
 */
export async function htmlToPdf(html: string, options?: PDFOptions): Promise<Uint8Array> {
  let browser;
  
  try {
    // Launch browser with production-optimized settings
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set content with proper HTML structure
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Generate PDF with professional settings
    const pdf = await page.pdf({
      format: options?.format || 'A4',
      printBackground: true,
      margin: {
        top: options?.margin?.top || '0.75in',
        right: options?.margin?.right || '0.75in',
        bottom: options?.margin?.bottom || '0.75in',
        left: options?.margin?.left || '0.75in'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      ...options?.pdfOptions
    });

    return pdf;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Generate resume PDF with optimized settings
 */
export async function generateResumePdf(html: string, filename: string): Promise<{
  pdfBuffer: Uint8Array;
  filename: string;
}> {
  const pdfBuffer = await htmlToPdf(html, {
    format: 'A4',
    margin: {
      top: '0.75in',
      right: '0.75in',
      bottom: '0.75in',
      left: '0.75in'
    }
  });

  return {
    pdfBuffer,
    filename
  };
}

/**
 * Generate cover letter PDF with optimized settings
 */
export async function generateCoverLetterPdf(html: string, filename: string): Promise<{
  pdfBuffer: Uint8Array;
  filename: string;
}> {
  const pdfBuffer = await htmlToPdf(html, {
    format: 'A4',
    margin: {
      top: '1in',
      right: '1in',
      bottom: '1in',
      left: '1in'
    }
  });

  return {
    pdfBuffer,
    filename
  };
}

/**
 * Create HTTP response object for PDF downloads
 */
export function createPdfResponse(pdfBuffer: Uint8Array, filename: string) {
  return {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length.toString(),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  };
}

/**
 * Enhanced HTML template for better PDF rendering
 * Includes optimized CSS for print media
 */
export function createPrintOptimizedHtml(content: string, title: string = 'Document'): string {
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
        
        .document {
            max-width: 100%;
            margin: 0 auto;
        }
        
        .center {
            text-align: center;
            margin-bottom: 1em;
        }
        
        h1 {
            font-size: 18pt;
            font-weight: bold;
            margin: 0 0 0.5em 0;
            page-break-after: avoid;
        }
        
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 1em 0 0.5em 0;
            padding-bottom: 2pt;
            border-bottom: 1pt solid #000;
            page-break-after: avoid;
        }
        
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin: 0.8em 0 0.3em 0;
            page-break-after: avoid;
        }
        
        p {
            margin: 0.5em 0;
            orphans: 2;
            widows: 2;
        }
        
        ul {
            margin: 0.5em 0;
            padding-left: 1.2em;
        }
        
        li {
            margin: 0.2em 0;
            page-break-inside: avoid;
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
        
        .experience-item,
        .education-item,
        .project-item {
            margin-bottom: 1em;
            page-break-inside: avoid;
        }
        
        .date-range {
            float: right;
            font-weight: normal;
        }
        
        .company-name {
            font-style: italic;
            margin-bottom: 0.3em;
        }
        
        .skills-list {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        
        .skills-list li {
            display: inline;
            margin-right: 0.5em;
        }
        
        .skills-list li:after {
            content: ", ";
        }
        
        .skills-list li:last-child:after {
            content: "";
        }
        
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .page-break {
                page-break-before: always;
            }
            
            .no-break {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="document">
        ${content}
    </div>
</body>
</html>`;
}

/**
 * Configuration options for PDF generation
 */
export interface PDFOptions {
  format?: 'A4' | 'Letter' | 'Legal';
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  pdfOptions?: any; // Additional puppeteer PDF options
}

/**
 * Utility function to validate HTML content before PDF generation
 */
export function validateHtmlContent(html: string): boolean {
  // Basic validation to ensure HTML is well-formed
  if (!html || typeof html !== 'string') {
    return false;
  }
  
  // Check for basic HTML structure
  const hasBasicStructure = html.includes('<html') || html.includes('<div') || html.includes('<body');
  
  return hasBasicStructure;
}
