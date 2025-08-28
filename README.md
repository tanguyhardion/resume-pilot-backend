# Resume Pilot Backend

A serverless API for generating and filling resumes using AI and LaTeX-to-PDF conversion.

## Tech Stack

- **LangChain** - LLM framework
- **OpenAI** - AI language model
- **Puppeteer** - PDF generation
- **Zod** - Schema validation
- **TypeScript** - Type-safe JavaScript
- **Vercel** - Serverless deployment

## Features

- AI-powered resume generation
- Cover letter creation
- LaTeX template processing
- PDF export functionality
- Schema validation for requests

## API Endpoints

- `POST /api/generateResume` - Generate a resume
- `POST /api/generateCoverLetter` - Generate a cover letter
- `GET /api/hello` - Health check

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Deploy to Vercel
vercel --prod
```

## Environment Variables

Create a `.env` file with:

```
OPENAI_API_KEY=your_openai_api_key
```

## Project Structure

- `api/` - API endpoints
- `data/` - LaTeX templates
- `types/` - TypeScript type definitions
- `utils/` - Utility functions (AI, auth, LaTeX, PDF)
