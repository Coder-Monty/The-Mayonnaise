import { Router } from 'express';
import { handleResearch } from '../controllers/researchController.js';

const router = Router();

// POST /api/research
router.post('/', handleResearch);

export default router;
