import { Router } from 'express';
import { getAllHistory, createHistory, deleteHistoryById, clearHistory } from '../controllers/historyController.js';

const router = Router();

// GET /api/history
router.get('/', getAllHistory);

// POST /api/history
router.post('/', createHistory);

// DELETE /api/history (Clear all history)
router.delete('/', clearHistory);

// DELETE /api/history/:id (Delete single record)
router.delete('/:id', deleteHistoryById);

export default router;

