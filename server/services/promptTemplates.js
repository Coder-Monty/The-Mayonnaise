/**
 * Prompt Templates Registry for Gemini API calls.
 */
export const promptTemplates = {
  ping: (payload) => `Return JSON object with status "ok", message "${payload.message || 'hello'}", and timestamp.`,
  test: (payload) => `Return a JSON object with key "result" set to "success" and "received" set to "${payload.input || 'test'}".`,
  
  predict: (payload) => {
    const { script, title = 'Untitled Reel', niche = 'General' } = payload;
    return `
You are an expert short-form content director, algorithm strategist, and viral reel reviewer.
Analyze the following short-form video script for Instagram Reels / TikTok / YouTube Shorts:

Title: "${title}"
Niche: "${niche}"
Script Text:
"""
${script}
"""

CRITICAL INSTRUCTIONS FOR SCORING:
1. Evaluate the script across 6 dimensions on a scale of 0 to 100:
   - "hook": Initial 3-second hook strength, curiosity gap, and retention trigger.
   - "pacing": Delivery rhythm, sentence brevity, and structure.
   - "storytelling": Engagement curve, emotional anchor, or value clarity.
   - "visualQuality": Estimated from script text visual cues (e.g., scene transitions, visual hooks, on-screen text instructions). Explicitly estimate this based on text formatting and visual direction cues since no raw video is attached.
   - "subtitleQuality": Estimated from script text readability, punchy short sentences, and text-overlay suitability for automatic captions.
   - "cta": Clarity and strength of the call to action at the end.

2. Calculate an overall "readinessScore" (0-100) reflecting publish readiness.
3. Provide a overall "verdict" (e.g., "Strong", "Moderate - Needs Edits", "Needs Revision").
4. List 2-3 specific "strengths".
5. List 2-3 specific "weaknesses".
6. Provide 3 actionable "suggestedEdits".
7. Provide a single-sentence summary "recommendation".

OUTPUT FORMAT REQUIREMENTS:
You MUST respond with a valid JSON object ONLY matching this exact structure:
{
  "readinessScore": 78,
  "verdict": "Strong",
  "subScores": {
    "hook": 82,
    "pacing": 70,
    "storytelling": 74,
    "visualQuality": 65,
    "subtitleQuality": 72,
    "cta": 60
  },
  "strengths": [
    "Strength 1",
    "Strength 2"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2"
  ],
  "suggestedEdits": [
    "Suggested edit 1",
    "Suggested edit 2",
    "Suggested edit 3"
  ],
  "recommendation": "One sentence summary recommendation."
}
`.trim();
  }
};
