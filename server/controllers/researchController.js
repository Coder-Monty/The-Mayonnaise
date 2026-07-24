import { callGemini } from '../services/aiService.js';
import { validateResearchInput } from '../utils/validateInput.js';
import { formatResearchResponse } from '../utils/responseFormatter.js';

export async function handleResearch(req, res) {
  try {
    const validation = validateResearchInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.message });
    }

    const { topic } = req.body;

    // Call Gemini API via aiService wrapper
    const rawAiResult = await callGemini('research', { topic });

    // Format and sanitize response to match contract exactly
    const formattedResponse = formatResearchResponse(rawAiResult, topic);

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error in researchController:', error);
    return res.status(500).json({
      error: 'Failed to generate AI content research',
      message: error.message
    });
  }
}
