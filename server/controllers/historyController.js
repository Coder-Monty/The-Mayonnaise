import { getHistory, saveHistory, deleteHistory, clearAllHistory } from '../data/historyStore.js';

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

export function deleteHistoryById(req, res) {
  try {
    const { id } = req.params;
    const deleted = deleteHistory(id);
    if (!deleted) {
      return res.status(404).json({ error: 'History record not found' });
    }
    return res.status(200).json({ success: true, message: 'History item deleted', reports: getHistory() });
  } catch (error) {
    console.error('Error in deleteHistoryById:', error);
    return res.status(500).json({ error: 'Failed to delete history record' });
  }
}

export function clearHistory(req, res) {
  try {
    clearAllHistory();
    return res.status(200).json({ success: true, message: 'All history cleared', reports: [] });
  } catch (error) {
    console.error('Error in clearHistory:', error);
    return res.status(500).json({ error: 'Failed to clear history' });
  }
}

