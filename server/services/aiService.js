import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { promptTemplates } from './promptTemplates.js';

dotenv.config();

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

  if (!apiKey) {
    console.warn(`[aiService] GEMINI_API_KEY is not set. Using fallback shape for promptType: ${promptType}`);
    return getFallbackResponse(promptType, payload);
  }

  const ai = new GoogleGenAI({ apiKey });
  const candidateModels = [
    process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    'gemini-2.0-flash'
  ];
  // Remove duplicates
  const modelsToTry = [...new Set(candidateModels)];

  let lastError = null;
  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
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
      lastError = error;
      console.warn(`[aiService] Gemini call failed for model ${modelName}:`, error.message);
    }
  }

  console.error(`[aiService] All models failed during Gemini API call [promptType: ${promptType}]:`, lastError?.message);
  return getFallbackResponse(promptType, payload, lastError?.message);
}
