import { Router } from 'express';
import { getWeeklyReport, getMonthlyReport } from '../controllers/reportsController.js';

const router = Router();

// POST /api/reports/weekly
router.post('/weekly', getWeeklyReport);

// POST /api/reports/monthly
router.post('/monthly', getMonthlyReport);

export default router;
