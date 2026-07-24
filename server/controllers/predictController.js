import { callGemini } from '../services/aiService.js';
import { validatePredictInput } from '../utils/validateInput.js';
import { formatPredictResponse } from '../utils/responseFormatter.js';

export async function handlePredict(req, res) {
  try {
    const validation = validatePredictInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.message });
    }

    const { script, title, niche } = req.body;

    // Call Gemini API via aiService wrapper
    const rawAiResult = await callGemini('predict', { script, title, niche });

    // Format and sanitize response to match contract exactly
    const formattedResponse = formatPredictResponse(rawAiResult);

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error in predictController:', error);
    return res.status(500).json({
      error: 'Failed to generate reel prediction analysis',
      message: error.message
    });
  }
}
