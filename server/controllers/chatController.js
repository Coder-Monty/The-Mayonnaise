import { callGemini } from '../services/aiService.js';
import { validateChatInput } from '../utils/validateInput.js';
import { formatChatResponse } from '../utils/responseFormatter.js';

export async function handleChat(req, res) {
  try {
    const validation = validateChatInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.message });
    }

    const { message, chatHistory, taggedContext } = req.body;

    // Call Gemini API via aiService wrapper
    const rawAiResult = await callGemini('chat', { message, chatHistory, taggedContext });

    // Format response to ensure clean { reply } JSON contract
    const formattedResponse = formatChatResponse(rawAiResult);

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error in chatController:', error);
    return res.status(500).json({
      error: 'Failed to process chat message',
      message: error.message
    });
  }
}
