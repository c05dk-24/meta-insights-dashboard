import express from 'express';
import insightsRoutes from './insights.js';

const router = express.Router();

router.use('/insights', insightsRoutes);

export default router;