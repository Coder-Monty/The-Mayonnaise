import { getHistory, saveHistory } from '../data/historyStore.js';

export function getAllHistory(req, res) {
  try {
    const reports = getHistory();
    return res.status(200).json({ reports });
  } catch (error) {
    console.error('Error in getAllHistory:', error);
    return res.status(500).json({ error: 'Failed to retrieve prediction history' });
  }
}

export function createHistory(req, res) {
  try {
    const entry = saveHistory(req.body);
    return res.status(201).json({
      success: true,
      entry
    });
  } catch (error) {
    console.error('Error in createHistory:', error);
    return res.status(500).json({ error: 'Failed to save prediction to history' });
  }
}
