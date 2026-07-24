import { getMetrics } from '../data/metricsStore.js';
import { callGemini } from '../services/aiService.js';
import { formatReportResponse } from '../utils/responseFormatter.js';

function filterMetricsByDays(days) {
  const allMetrics = getMetrics();
  if (allMetrics.length === 0) return [];

  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const filtered = allMetrics.filter((m) => new Date(m.date) >= cutoff);

  // If no metrics fall strictly within cutoff, return latest N entries
  if (filtered.length === 0) {
    return allMetrics.slice(0, days <= 7 ? 4 : 10);
  }
  return filtered;
}

export async function getWeeklyReport(req, res) {
  try {
    const weeklyMetrics = filterMetricsByDays(7);
    const rawAiResult = await callGemini('reports', {
      timeframe: 'weekly',
      metrics: weeklyMetrics
    });
    const formatted = formatReportResponse(rawAiResult, 'weekly');
    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Error in getWeeklyReport:', error);
    return res.status(500).json({ error: 'Failed to generate weekly report' });
  }
}

export async function getMonthlyReport(req, res) {
  try {
    const monthlyMetrics = filterMetricsByDays(30);
    const rawAiResult = await callGemini('reports', {
      timeframe: 'monthly',
      metrics: monthlyMetrics
    });
    const formatted = formatReportResponse(rawAiResult, 'monthly');
    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Error in getMonthlyReport:', error);
    return res.status(500).json({ error: 'Failed to generate monthly report' });
  }
}
