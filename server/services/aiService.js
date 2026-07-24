import { GoogleGenAI } from '@google/genai';
import { promptTemplates } from './promptTemplates.js';

/**
 * Clean response text to extract valid JSON string.
 * Handles backticks ```json ... ``` or leading/trailing whitespace.
 */
export function cleanJsonResponse(text) {
  if (!text) return '{}';
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned;
}

/**
 * Fallback generator when API key is missing or call fails
 */
function getFallbackResponse(promptType, payload, errorMessage = null) {
  return {
    fallback: true,
    promptType,
    error: errorMessage || null,
    timestamp: new Date().toISOString(),
    data: {
      message: "Generated via fallback engine",
      payload
    }
  };
}

/**
 * Main wrapper function to call Gemini API.
 * @param {string} promptType - Key in promptTemplates or direct prompt string
 * @param {object} payload - Input data for the prompt
 * @returns {Promise<object>} Parsed JSON object
 */
export async function callGemini(promptType, payload = {}) {
  const apiKey = process.env.GEMINI_API_KEY;

  // Build prompt string
  let promptText = '';
  if (promptTemplates[promptType]) {
    promptText = promptTemplates[promptType](payload);
  } else if (typeof promptType === 'string' && promptType.trim().length > 0) {
    promptText = promptType;
  } else {
    promptText = JSON.stringify(payload);
  }

  try {
    if (!apiKey) {
      console.warn(`[aiService] GEMINI_API_KEY is not set. Using fallback shape for promptType: ${promptType}`);
      return getFallbackResponse(promptType, payload);
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Call Gemini enforcing JSON response
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    const jsonString = cleanJsonResponse(text);
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    console.error(`[aiService] Error during Gemini API call [promptType: ${promptType}]:`, error.message);
    return getFallbackResponse(promptType, payload, error.message);
  }
}
