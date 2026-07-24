import { Router } from 'express';
import { handlePredict } from '../controllers/predictController.js';

const router = Router();

// POST /api/predict
router.post('/', handlePredict);

export default router;
