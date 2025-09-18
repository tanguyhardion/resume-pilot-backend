import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { ResumeData } from "../types";

// Define the schema for structured output
const resumeDataSchema = z.object({
  name: z.string().describe("Full name of the person"),
  email: z.string().email().describe("Email address"),
  phone: z.string().describe("Phone number"),
  location: z.string().describe("City, State or Country"),
  linkedin: z.string().url().describe("LinkedIn profile URL"),
  github: z.string().url().describe("GitHub profile URL"),
  summary: z
    .string()
    .describe(
      "Professional summary highlighting relevant skills and experience (2-3 sentences)"
    ),
  experience: z
    .array(
      z.object({
        title: z.string().describe("Job title"),
        company: z.string().describe("Company name"),
        duration: z
          .string()
          .describe('Employment duration (e.g., "2022 - Present")'),
        description: z
          .array(z.string())
          .describe(
            "Array of achievements and responsibilities with metrics and impact"
          ),
      })
    )
    .describe("Work experience array"),
  education: z
    .array(
      z.object({
        degree: z.string().describe("Degree name"),
        institution: z.string().describe("Institution name"),
        year: z.string().describe("Graduation year"),
      })
    )
    .describe("Education array"),
  skills: z
    .array(z.string())
    .describe(
      "Array of relevant skills, prioritizing those mentioned in the job offer"
    ),
  projects: z
    .array(
      z.object({
        name: z.string().describe("Project name"),
        description: z
          .string()
          .describe("Brief description highlighting relevance to the job"),
        technologies: z
          .array(z.string())
          .describe("Technologies used in the project"),
      })
    )
    .describe("Projects array showcasing relevant capabilities"),
});

export class ResumeAI {
  private llm: ChatOpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }

    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-5-nano",
      temperature: 0.7,
    });
  }

  async generateResumeData(
    jobOffer: string,
    personalInfo: string
  ): Promise<ResumeData> {
    const llmWithStructured = this.llm.withStructuredOutput(resumeDataSchema);

    const prompt = PromptTemplate.fromTemplate(`
You are a professional resume writer. Based on the job offer below, create a tailored resume data structure.

Job Offer:

{jobOffer}

Personal Information:

{personalInfo}

Guidelines:
1. Use the personal information provided to create an accurate resume
2. Tailor the summary to match the job requirements
3. Focus experience descriptions on achievements relevant to the job offer
4. Prioritize skills mentioned in the job posting
5. Include projects that demonstrate relevant capabilities
6. Use action verbs and quantify achievements where possible
7. Keep descriptions concise but impactful
8. Ensure all URLs are valid
9. Create compelling content that would be attractive for this specific job

Create a professional resume structure that highlights the most relevant qualifications for this position.
    `);

    const formattedPrompt = await prompt.format({
      jobOffer,
      personalInfo: personalInfo
        ? JSON.stringify(personalInfo, null, 2)
        : "None provided",
    });

    const response = await llmWithStructured.invoke(formattedPrompt);
    return response as ResumeData;
  }

  async generateCoverLetterContent(
    jobOffer: string,
    personalInfo: string
  ): Promise<string> {
    const prompt = PromptTemplate.fromTemplate(`
You are a professional cover letter writer. Based on the job offer below, create a compelling cover letter content.

Job Offer:

{jobOffer}

Personal Information:

{personalInfo}

Write a professional cover letter body (3-4 paragraphs) that:
1. Opens with enthusiasm for the specific role and company
2. Highlights relevant experience and skills that match the job requirements
3. Demonstrates knowledge of the company/role and explains why you're a great fit
4. Closes with a call to action

Guidelines:
- Be specific and reference details from the job posting
- Use a professional but engaging tone
- Focus on value you can bring to the company
- Keep it concise (under 300 words)
- Don't include the greeting or signature (just the body paragraphs)

Return only the cover letter content, no additional formatting or text.
    `);

    const formattedPrompt = await prompt.format({
      jobOffer,
      personalInfo: personalInfo
        ? JSON.stringify(personalInfo, null, 2)
        : "None provided",
    });

    const response = await this.llm.invoke(formattedPrompt);
    return response.content as string;
  }
}
