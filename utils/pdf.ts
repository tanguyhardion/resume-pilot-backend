import puppeteer from "puppeteer";
import JSZip from "jszip";

/**
 * HTML to PDF conversion using Puppeteer
 * This provides high-quality PDF generation with proper formatting,
 * CSS support, and font rendering.
 */
export async function htmlToPdf(
  html: string,
  options?: PDFOptions
): Promise<Uint8Array> {
  let browser;

  try {
    // Launch browser with production-optimized settings
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Set content with proper HTML structure
    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Generate PDF with professional settings
    const pdf = await page.pdf({
      format: options?.format || "A4",
      printBackground: true,
      margin: {
        top: options?.margin?.top || "0.75in",
        right: options?.margin?.right || "0.75in",
        bottom: options?.margin?.bottom || "0.75in",
        left: options?.margin?.left || "0.75in",
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      ...options?.pdfOptions,
    });

    return pdf;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error(
      `Failed to generate PDF: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Generate resume PDF with optimized settings
 */
export async function generateResumePdf(
  html: string,
  filename: string
): Promise<{
  pdfBuffer: Uint8Array;
  filename: string;
}> {
  const pdfBuffer = await htmlToPdf(html, {
    format: "A4",
    margin: {
      top: "0.75in",
      right: "0.75in",
      bottom: "0.75in",
      left: "0.75in",
    },
  });

  return {
    pdfBuffer,
    filename,
  };
}

/**
 * Generate cover letter PDF with optimized settings
 */
export async function generateCoverLetterPdf(
  html: string,
  filename: string
): Promise<{
  pdfBuffer: Uint8Array;
  filename: string;
}> {
  const pdfBuffer = await htmlToPdf(html, {
    format: "A4",
    margin: {
      top: "1in",
      right: "1in",
      bottom: "1in",
      left: "1in",
    },
  });

  return {
    pdfBuffer,
    filename,
  };
}

/**
 * Create HTTP response object for PDF downloads
 */
export function createPdfResponse(pdfBuffer: Uint8Array, filename: string) {
  return {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": pdfBuffer.length.toString(),
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  };
}

/**
 * Create ZIP archive containing both PDF and TeX files
 */
export async function createDualFileZip(
  pdfBuffer: Uint8Array,
  texContent: string,
  baseName: string
): Promise<{
  zipBuffer: Buffer;
  filename: string;
}> {
  const zip = new JSZip();

  // Add PDF file to zip
  zip.file(`${baseName}.pdf`, pdfBuffer);
  
  // Add TeX file to zip
  zip.file(`${baseName}.tex`, texContent);

  // Generate zip buffer
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

  return {
    zipBuffer,
    filename: `${baseName}.zip`
  };
}

/**
 * Create HTTP response object for ZIP downloads containing both PDF and TeX
 */
export function createZipResponse(zipBuffer: Buffer, filename: string) {
  return {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": zipBuffer.length.toString(),
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  };
}

/**
 * Configuration options for PDF generation
 */
export interface PDFOptions {
  format?: "A4" | "Letter" | "Legal";
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
  if (!html || typeof html !== "string") {
    return false;
  }

  // Check for basic HTML structure
  const hasBasicStructure =
    html.includes("<html") || html.includes("<div") || html.includes("<body");

  return hasBasicStructure;
}
