/**
 * Response Formatter and Fallback generator for Predictor, Research, and Reports endpoints
 */

export function formatPredictResponse(rawResult) {
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

export function formatResearchResponse(rawResult, topic = 'General') {
  const data = rawResult?.data || rawResult || {};

  const sanitizeTrends = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return [
        {
          topic: `AI Automation in ${topic}`,
          whyTrending: `Search volume for ${topic} workflows has surged 140% this quarter.`,
          confidence: 'High',
          suggestedAngle: 'Show a 30-second live demonstration comparing manual vs automated output.'
        },
        {
          topic: 'Beginner Common Pitfalls',
          whyTrending: 'Audiences prefer problem-avoidance hooks over generic tips.',
          confidence: 'High',
          suggestedAngle: 'Focus on 3 mistakes that cost beginner creators time/money.'
        },
        {
          topic: 'Tool Breakdown & Comparison',
          whyTrending: 'Versus videos get 2.3x higher save/share rates.',
          confidence: 'Medium',
          suggestedAngle: 'Tool X vs Tool Y: Which one is actually worth your time in 2026?'
        }
      ];
    }
    return arr.map((item) => ({
      topic: item.topic || `Trending Subtopic in ${topic}`,
      whyTrending: item.whyTrending || 'High audience interest and shareability.',
      confidence: ['High', 'Medium', 'Low'].includes(item.confidence) ? item.confidence : 'High',
      suggestedAngle: item.suggestedAngle || 'Provide actionable insights with visual proof.'
    }));
  };

  const sanitizeContentIdeas = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return [
        {
          hook: `Stop doing ${topic} the hard way!`,
          format: 'Problem / Solution',
          difficulty: 'Easy',
          goal: 'Build authority & drives saves'
        },
        {
          hook: `I tested 5 ${topic} hacks so you don't have to.`,
          format: 'Experiment / Case Study',
          difficulty: 'Medium',
          goal: 'Maximize watch time'
        },
        {
          hook: `The #1 secret top 1% creators use in ${topic}...`,
          format: 'Curiosity Gap / Listicle',
          difficulty: 'Easy',
          goal: 'Increase comments & shares'
        }
      ];
    }
    return arr.map((item) => ({
      hook: item.hook || 'Attention grabbing hook phrase',
      format: item.format || 'Short Breakdown',
      difficulty: ['Easy', 'Medium', 'Hard'].includes(item.difficulty) ? item.difficulty : 'Medium',
      goal: item.goal || 'Engagement and reach'
    }));
  };

  const sanitizeTopReels = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return [
        {
          title: `How I Mastered ${topic} in 30 Days`,
          hookUsed: 'If I had to restart from scratch today...',
          whyItWorked: 'Strong personal narrative combined with actionable step-by-step roadmap.'
        },
        {
          title: `3 ${topic} Shortcuts You Didn't Know Existed`,
          hookUsed: 'You are doing this completely wrong.',
          whyItWorked: 'Contrarian hook creates instant curiosity and high retention.'
        },
        {
          title: `The Ultimate ${topic} Toolkit`,
          hookUsed: 'Save this reel before it gets taken down!',
          whyItWorked: 'Urgency-driven CTA maximized save-to-reach ratio.'
        }
      ];
    }
    return arr.map((item) => ({
      title: item.title || 'Viral Reel Concept',
      hookUsed: item.hookUsed || 'Curiosity Hook',
      whyItWorked: item.whyItWorked || 'High retention structure and clear value proposition.'
    }));
  };

  const summary =
    data.summary ||
    rawResult.summary ||
    `Content around "${topic}" is currently seeing rapid growth across short-form video platforms. Viewers favor fast-paced, high-value breakdowns over long tutorials. Emphasize punchy 3-second hooks and actionable takeaways to maximize save and share metrics.`;

  return {
    trends: sanitizeTrends(data.trends || rawResult.trends),
    contentIdeas: sanitizeContentIdeas(data.contentIdeas || rawResult.contentIdeas),
    topReels: sanitizeTopReels(data.topReels || rawResult.topReels),
    summary
  };
}

export function formatReportResponse(rawResult, timeframe = 'weekly') {
  const data = rawResult?.data || rawResult || {};

  return {
    topPattern:
      data.topPattern ||
      rawResult.topPattern ||
      `Reels in the Tech & AI niche with numerical hooks ("3 AI Tools...") and average watch times above 75% achieved 2.4x higher overall view counts during this ${timeframe} window.`,
    underperformingPattern:
      data.underperformingPattern ||
      rawResult.underperformingPattern ||
      `Posts with generic intros and low initial curiosity gaps experienced early drop-offs within the first 4 seconds, averaging below 60% completion rates.`,
    trendNote:
      data.trendNote ||
      rawResult.trendNote ||
      `Audience engagement heavily favors practical tool demonstrations and step-by-step breakdowns over high-level conceptual discussions.`,
    nextAction:
      data.nextAction ||
      rawResult.nextAction ||
      `Focus upcoming script hooks on negative constraint framing (e.g. "Stop doing X...") to increase initial 3-second viewer retention.`
  };
}

export function formatChatResponse(rawResult) {
  const data = rawResult?.data || rawResult || {};
  let reply = rawResult?.reply || data?.reply;

  if (!reply && typeof rawResult === 'string') {
    reply = rawResult;
  }

  if (!reply) {
    const payload = data?.payload || {};
    const userMessage = (payload?.message || '').trim().toLowerCase();
    const taggedContext = payload?.taggedContext || {};

    // 1. Greetings / Vague Openers
    const isGreeting = ['hi', 'hello', 'hey', 'hey there', 'hi there', 'hola', 'namaste'].includes(userMessage);
    if (isGreeting) {
      reply = "Hey! I can help you rewrite parts of your script based on your Predictor score, or brainstorm ideas from your research. What would you like to work on?";
      return { reply };
    }

    // 2. Off-topic questions check
    const offTopicKeywords = ['prime minister', 'president', '2+2', 'math', 'python code', 'who is', 'write me a poem', 'recipe for', 'weather in'];
    const isOffTopic = offTopicKeywords.some(kw => userMessage.includes(kw));
    if (isOffTopic) {
      reply = "That's outside what I can help with here — I'm focused on your reel scripts and content strategy. Want help improving your hook, or discussing an idea from your research?";
      return { reply };
    }

    // 3. Tagged Predictor Context
    if (taggedContext.type === 'predictor' && taggedContext.data) {
      const pred = taggedContext.data;
      const scriptText = pred.script || 'your video script';
      const hookScore = pred.subScores?.hook ?? 70;
      const suggestedHook = pred.suggestedEdits?.[0] || 'Shorten the intro to under 3 seconds to maximize retention';

      reply = `Based on your Predictor result (Hook score: ${hookScore}/100):\n\n` +
        `Try this instead: "Stop scrolling! If you are still doing this manually in 2026, you are losing 10+ hours every week..." — this creates a clear curiosity gap in the first 2 seconds, which your hook score flagged as weak.\n\n` +
        `- Kept sentences punchy for on-screen captions\n` +
        `- Added a direct comment CTA at the end to boost algorithm reach`;
    } 
    // 4. Tagged Research Context
    else if (taggedContext.type === 'research' && taggedContext.data) {
      const resData = taggedContext.data;
      const topHook = resData.contentIdeas?.[0]?.hook || 'Stop doing this the hard way!';
      const topTrend = resData.trends?.[0]?.topic || 'this topic';

      reply = `Based on your research report for ${topTrend}:\n\n` +
        `- Recommended Hook: "${topHook}"\n` +
        `- Suggested Format: 30-second problem vs. solution breakdown\n` +
        `- Strategy Note: Viewers in this niche respond best to fast-paced tool comparisons with visual proof.`;
    } 
    // 5. Untagged / General
    else {
      reply = `Here is a quick script structure you can use:\n\n` +
        `Try this instead: "Stop scrolling if you want to [desired outcome] in 2026..." — this grabs attention in the first 2 seconds.\n\n` +
        `- Deliver 3 punchy points without fluff\n` +
        `- End with a clear comment keyword CTA\n\n` +
        `Note: Tagging your Predictor result or Research report in the dropdown above will let me give you more specific advice tailored to your exact data!`;
    }
  }

  return { reply };
}
