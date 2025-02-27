export const SAFETY_ANALYSIS_PROMPT = `Analyze this building blueprint for fire safety compliance. 
Provide a detailed analysis for each of these categories:

1. Fire exits and emergency routes
2. Fire extinguisher locations
3. Smoke detector placement
4. Sprinkler system coverage
5. Emergency lighting
6. Building code compliance

For each category:
- Indicate if it is Compliant, Non-Compliant, or Needs Review
- List specific observations and recommendations
- Avoid using bullet points or asterisks
- Use plain text with line breaks between items
- Focus on actionable details and specific measurements where applicable

Provide clear, specific recommendations for improvements.`;


export const GEMINI_API_KEY=`${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;