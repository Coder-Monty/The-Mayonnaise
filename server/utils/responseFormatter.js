/**
 * Response Formatter and Fallback generator for Predictor endpoint
 */

export function formatPredictResponse(rawResult) {
  // Handle fallback or raw AI response
  const subScores = rawResult?.subScores || {};
  const data = rawResult?.data || rawResult || {};

  const cleanScore = (val, defaultVal = 70) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) return defaultVal;
    return Math.min(100, Math.max(0, num));
  };

  const finalSubScores = {
    hook: cleanScore(subScores.hook ?? data.hook, 75),
    pacing: cleanScore(subScores.pacing ?? data.pacing, 70),
    storytelling: cleanScore(subScores.storytelling ?? data.storytelling, 72),
    visualQuality: cleanScore(subScores.visualQuality ?? data.visualQuality, 65),
    subtitleQuality: cleanScore(subScores.subtitleQuality ?? data.subtitleQuality, 70),
    cta: cleanScore(subScores.cta ?? data.cta, 60),
  };

  const avgSub = Math.round(
    (finalSubScores.hook +
      finalSubScores.pacing +
      finalSubScores.storytelling +
      finalSubScores.visualQuality +
      finalSubScores.subtitleQuality +
      finalSubScores.cta) / 6
  );

  const readinessScore = cleanScore(rawResult?.readinessScore ?? data.readinessScore ?? avgSub, 75);

  let verdict = rawResult?.verdict || data.verdict;
  if (!verdict) {
    if (readinessScore >= 80) verdict = 'Strong';
    else if (readinessScore >= 60) verdict = 'Moderate - Needs Edits';
    else verdict = 'Needs Revision';
  }

  return {
    readinessScore,
    verdict,
    subScores: finalSubScores,
    strengths: Array.isArray(rawResult?.strengths || data.strengths)
      ? rawResult?.strengths || data.strengths
      : [
          'Hook grabs attention early in the script',
          'Clear central topic with logical progression'
        ],
    weaknesses: Array.isArray(rawResult?.weaknesses || data.weaknesses)
      ? rawResult?.weaknesses || data.weaknesses
      : [
          'Call-to-action could be more explicit',
          'Pacing in the middle section may cause drop-off'
        ],
    suggestedEdits: Array.isArray(rawResult?.suggestedEdits || data.suggestedEdits)
      ? rawResult?.suggestedEdits || data.suggestedEdits
      : [
          'Shorten the intro to under 3 seconds to maximize retention',
          'Add on-screen text cues for key takeaways',
          'Strengthen the ending CTA with a direct question'
        ],
    recommendation: rawResult?.recommendation || data.recommendation || 'Refine the call-to-action and tighten sentence structure for maximum viewer retention.'
  };
}
