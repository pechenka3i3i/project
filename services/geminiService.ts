
import { GoogleGenAI } from "@google/genai";
import type { Questionnaire } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeQuestionnaireWithGemini = async (questionnaire: Questionnaire): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI analysis is disabled. API key is not configured.");
  }
  
  const prompt = `
    Analyze the following bankruptcy questionnaire summary and provide a concise analysis.
    Focus on potential risks, inconsistencies, or key points for a case manager.
    Keep the analysis to 3-4 bullet points.

    Questionnaire Details:
    - Full Name: ${questionnaire.fullName}
    - Submission Date: ${questionnaire.submissionDate}
    - Status: ${questionnaire.status}
    - Case Manager: ${questionnaire.caseManager}
    - Summary: ${questionnaire.summary}

    Provide your analysis below:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing questionnaire with Gemini:", error);
    return "An error occurred during AI analysis. Please check the console for details.";
  }
};
