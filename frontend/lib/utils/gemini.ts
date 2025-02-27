import { GEMINI_API_KEY, SAFETY_ANALYSIS_PROMPT } from "@/config/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function analyzeBlueprintSafety(imageBase64: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    if (!imageBase64.includes('base64,')) {
      throw new Error('Invalid image format');
    }

    const base64Data = imageBase64.split('base64,')[1];
    
    if (!base64Data) {
      throw new Error('Invalid image data');
    }

    const result = await model.generateContent([
      SAFETY_ANALYSIS_PROMPT,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('No analysis results received');
    }
    
    return response.text();
  } catch (error) {
    if (error instanceof Error && error.message.includes('deprecated')) {
      throw new Error('Using the latest AI model for analysis. Please try again.');
    }
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during analysis';
    console.error('Error analyzing blueprint:', errorMessage);
    throw new Error(errorMessage);
  }
}