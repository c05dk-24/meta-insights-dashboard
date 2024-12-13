import express from 'express';
import insightsRoutes from './insights.js';
import campaignRoutes from './campaigns.js';

const router = express.Router();

router.use('/insights', insightsRoutes);
router.use('/campaigns', campaignRoutes);

export default router;