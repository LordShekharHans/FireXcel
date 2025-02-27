import { getGeminiModel } from "./client";
import { processImageData } from "../image/processor";
import { BlueprintAnalysisResult } from "@/types/blueprint";
import { getConfig } from "@/config";

export async function analyzeBlueprintSafety(imageBase64: string): Promise<BlueprintAnalysisResult> {
  try {
    const model = getGeminiModel();
    const config = getConfig();
    const imageData = processImageData(imageBase64);
    
    const result = await model.generateContent([
      config.safetyAnalysisPrompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData
        }
      }
    ]);

    const response = await result.response;
    const analysisText = response.text();
    
    if (!analysisText) {
      throw new Error('No analysis results received');
    }
    
    return {
      text: analysisText,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw handleAnalysisError(error);
  }
}

function handleAnalysisError(error: unknown): Error {
  console.error('Blueprint analysis error:', "error");
  
  if (error instanceof Error) {
    if (error.message.includes('API_KEY_INVALID')) {
      return new Error('Invalid API key. Please check your configuration.');
    }
    if (error.message.includes('deprecated')) {
      return new Error('Using the latest AI model for analysis. Please try again.');
    }
    return error;
  }
  return new Error('An error occurred during analysis');
}