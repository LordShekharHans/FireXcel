import { Config } from "../types/config";
import { SAFETY_ANALYSIS_PROMPT } from "./constants";

export function getConfig(): Config {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
  }

  return {
    geminiApiKey: apiKey,
    safetyAnalysisPrompt: SAFETY_ANALYSIS_PROMPT
  };
}