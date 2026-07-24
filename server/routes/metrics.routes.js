import { Router } from 'express';
import { getAllMetrics, createMetric } from '../controllers/metricsController.js';

const router = Router();

// GET /api/metrics
router.get('/', getAllMetrics);

// POST /api/metrics
router.post('/', createMetric);

export default router;
