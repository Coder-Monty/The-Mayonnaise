import { getMetrics, addMetric } from '../data/metricsStore.js';
import { validateMetricsInput } from '../utils/validateInput.js';

export function getAllMetrics(req, res) {
  try {
    const data = getMetrics();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in getAllMetrics:', error);
    return res.status(500).json({ error: 'Failed to retrieve metrics' });
  }
}

export function createMetric(req, res) {
  try {
    const validation = validateMetricsInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.message });
    }

    const newEntry = addMetric(req.body);
    return res.status(201).json({
      success: true,
      entry: newEntry
    });
  } catch (error) {
    console.error('Error in createMetric:', error);
    return res.status(500).json({ error: 'Failed to log reel metric' });
  }
}
