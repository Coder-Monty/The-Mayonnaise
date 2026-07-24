/**
 * Prompt Templates Registry for Gemini API calls.
 */
export const promptTemplates = {
  ping: (payload) => `Return JSON object with status "ok", message "${payload.message || 'hello'}", and timestamp.`,
  test: (payload) => `Return a JSON object with key "result" set to "success" and "received" set to "${payload.input || 'test'}".`
};
