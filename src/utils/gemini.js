const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeResume(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Analyze the following resume text and return a JSON object with the following structure.
      Important: ensure all fields are strings, not arrays or objects except where specified.
      
      Text to analyze:
      ${text}
      
      Return only a JSON object with this exact structure:
      {
        "name": "full name as string",
        "email": "email as string",
        "education": {
          "degree": "degree as string",
          "branch": "branch as string",
          "institution": "institution as string",
          "year": "year as string"
        },
        "experience": {
          "job_title": "most recent job title as string",
          "company": "company name as string",
          "start_date": "start date as string",
          "end_date": "end date as string"
        },
        "skills": ["skill1", "skill2"],
        "summary": "brief professional summary as string"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text_response = response.text();
    
    // Clean the response
    const cleanedResponse = text_response
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    // Parse and validate the response
    const parsedData = JSON.parse(cleanedResponse);
    
    // Ensure name and email are strings
    parsedData.name = String(parsedData.name || '');
    parsedData.email = String(parsedData.email || '');

    // Log the structure for debugging
    console.log('Parsed resume data:', {
      ...parsedData,
      name: '[REDACTED]',
      email: '[REDACTED]'
    });

    return parsedData;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error(`Failed to analyze resume content: ${error.message}`);
  }
}

module.exports = { analyzeResume };