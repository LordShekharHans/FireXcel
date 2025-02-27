import { getConfig } from "@/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    const config = getConfig();
    genAI = new GoogleGenerativeAI(config.geminiApiKey);
  }
  return genAI;
}

export function getGeminiModel() {
  const client = getGeminiClient();
  return client.getGenerativeModel({ model: "gemini-1.5-flash" });
}