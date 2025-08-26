import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { ResumeData } from '../types';

export class ResumeAI {
  private llm: ChatOpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-5-nano',
      temperature: 0.7,
    });
  }

  async generateResumeData(jobOffer: string, personalInfo?: any): Promise<ResumeData> {
    const prompt = PromptTemplate.fromTemplate(`
You are a professional resume writer. Based on the job offer below, create a tailored resume data structure.

Job Offer:
{jobOffer}

Personal Information (if provided):
{personalInfo}

Please return a JSON object with the following structure that would be compelling for this specific job:

{{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "City, State",
  "linkedin": "https://linkedin.com/in/profile",
  "github": "https://github.com/username",
  "summary": "A tailored professional summary that highlights relevant skills and experience for this job (2-3 sentences)",
  "experience": [
    {{
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Start Date - End Date",
      "description": ["Achievement 1 with metrics", "Achievement 2 with impact", "Achievement 3 relevant to job"]
    }}
  ],
  "education": [
    {{
      "degree": "Degree Name",
      "institution": "University Name",
      "year": "Year"
    }}
  ],
  "skills": ["Skill1", "Skill2", "Skill3", "etc - focus on skills mentioned in job offer"],
  "projects": [
    {{
      "name": "Project Name",
      "description": "Brief description highlighting relevance to the job",
      "technologies": ["Tech1", "Tech2", "Tech3"]
    }}
  ]
}}

Guidelines:
1. Use the personal information provided if available, otherwise create professional placeholders
2. Tailor the summary to match the job requirements
3. Focus experience descriptions on achievements relevant to the job offer
4. Prioritize skills mentioned in the job posting
5. Include projects that demonstrate relevant capabilities
6. Use action verbs and quantify achievements where possible
7. Keep descriptions concise but impactful

Return only the JSON object, no additional text.
    `);

    try {
      const formattedPrompt = await prompt.format({
        jobOffer,
        personalInfo: personalInfo ? JSON.stringify(personalInfo, null, 2) : 'None provided'
      });

      const response = await this.llm.invoke(formattedPrompt);
      const content = response.content as string;
      
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating resume data:', error);
      
      // Return a fallback structure if AI fails
      return this.getFallbackResumeData(personalInfo);
    }
  }

  async generateCoverLetterContent(jobOffer: string, personalInfo?: any): Promise<string> {
    const prompt = PromptTemplate.fromTemplate(`
You are a professional cover letter writer. Based on the job offer below, create a compelling cover letter content.

Job Offer:
{jobOffer}

Personal Information (if provided):
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

    try {
      const formattedPrompt = await prompt.format({
        jobOffer,
        personalInfo: personalInfo ? JSON.stringify(personalInfo, null, 2) : 'None provided'
      });

      const response = await this.llm.invoke(formattedPrompt);
      return response.content as string;
    } catch (error) {
      console.error('Error generating cover letter:', error);
      return this.getFallbackCoverLetterContent();
    }
  }

  private getFallbackResumeData(personalInfo?: any): ResumeData {
    return {
      name: personalInfo?.name || 'Your Name',
      email: personalInfo?.email || 'your.email@example.com',
      phone: personalInfo?.phone || '+1 (555) 123-4567',
      location: personalInfo?.location || 'City, State',
      linkedin: personalInfo?.linkedin || 'https://linkedin.com/in/yourprofile',
      github: personalInfo?.github || 'https://github.com/yourusername',
      summary: 'Experienced professional with a strong background in technology and problem-solving. Passionate about delivering high-quality solutions and contributing to team success.',
      experience: [
        {
          title: 'Software Developer',
          company: 'Tech Company',
          duration: '2022 - Present',
          description: [
            'Developed and maintained web applications using modern technologies',
            'Collaborated with cross-functional teams to deliver projects on time',
            'Improved application performance by 30% through optimization techniques'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'University Name',
          year: '2022'
        }
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS'],
      projects: [
        {
          name: 'Portfolio Website',
          description: 'Built a responsive portfolio website showcasing technical skills and projects',
          technologies: ['React', 'TypeScript', 'Tailwind CSS']
        }
      ]
    };
  }

  private getFallbackCoverLetterContent(): string {
    return `I am writing to express my strong interest in joining your team. With my background in technology and passion for innovation, I believe I would be a valuable addition to your organization.

My experience has taught me the importance of collaboration, continuous learning, and delivering high-quality solutions. I am particularly drawn to your company's mission and values, and I am excited about the opportunity to contribute to your continued success.

I would welcome the opportunity to discuss how my skills and enthusiasm can benefit your team. Thank you for considering my application, and I look forward to hearing from you soon.`;
  }
}
