import { Router } from 'express';
import { getAllHistory, createHistory } from '../controllers/historyController.js';

const router = Router();

// GET /api/history
router.get('/', getAllHistory);

// POST /api/history
router.post('/', createHistory);

export default router;
