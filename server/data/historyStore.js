let historyRecords = [
  {
    id: 'hist-001',
    title: '3 AI Tools to Save 10 Hours a Week',
    date: '2026-07-23',
    readinessScore: 82,
    type: 'predict',
    verdict: 'Strong',
    niche: 'Tech & AI',
    script: 'Stop wasting time doing manual task switching in 2026. Here are 3 AI tools that will save you 10+ hours every single week...\n\nTool #1: Notion AI for automatic meeting summaries.\nTool #2: Antigravity for automated code generation.\nTool #3: Midjourney v7 for instant graphic design.',
    subScores: {
      hook: 88,
      pacing: 80,
      storytelling: 82,
      visualQuality: 75,
      subtitleQuality: 85,
      cta: 78
    },
    strengths: [
      'Strong numerical hook creates instant curiosity gap',
      'Clear value proposition delivered within 15 seconds'
    ],
    weaknesses: [
      'Call to action could be positioned earlier before drop-off'
    ],
    suggestedEdits: [
      'Shorten tool #2 description by 3 seconds',
      'Add animated arrow graphic pointing to comment CTA'
    ],
    recommendation: 'Excellent publish candidate. Implement minor visual cues on tool names.'
  },
  {
    id: 'hist-002',
    title: 'Why 90% of Freelancers Fail in Year 1',
    date: '2026-07-21',
    readinessScore: 64,
    type: 'predict',
    verdict: 'Moderate - Needs Edits',
    niche: 'Business & Finance',
    script: 'If you want to be a successful freelancer, you need to avoid these major mistakes in your first year...',
    subScores: {
      hook: 65,
      pacing: 60,
      storytelling: 70,
      visualQuality: 60,
      subtitleQuality: 68,
      cta: 62
    },
    strengths: [
      'Relatable subject matter with high comment potential'
    ],
    weaknesses: [
      'Opening 5 seconds are slow and lack a strong pattern interrupt',
      'Sentences are slightly too long for short-form retention'
    ],
    suggestedEdits: [
      'Re-frame intro to: "The #1 reason 90% of freelancers go broke..."',
      'Break up body paragraphs into 1-sentence punchlines'
    ],
    recommendation: 'Re-record hook with higher vocal energy and tighten sentence structure.'
  }
];

export function getHistory() {
  return [...historyRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function saveHistory(record) {
  const newRecord = {
    id: `hist-${Date.now()}`,
    title: record.title || 'Untitled Script Evaluation',
    date: record.date || new Date().toISOString().split('T')[0],
    readinessScore: Number(record.readinessScore) || 75,
    type: record.type || 'predict',
    verdict: record.verdict || 'Strong',
    niche: record.niche || 'General',
    script: record.script || '',
    subScores: record.subScores || {},
    strengths: record.strengths || [],
    weaknesses: record.weaknesses || [],
    suggestedEdits: record.suggestedEdits || [],
    recommendation: record.recommendation || ''
  };
  historyRecords.unshift(newRecord);
  return newRecord;
}
