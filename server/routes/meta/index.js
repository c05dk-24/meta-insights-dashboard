import express from 'express';
import authRoutes from './auth.js';
import insightsRoutes from './insights.js';
import campaignRoutes from './campaigns.js';

const router = express.Router();

// Meta authentication routes (no Meta token validation)
router.use('/auth', authRoutes);

// Protected Meta API routes
router.use('/insights', insightsRoutes);
router.use('/campaigns', campaignRoutes);

export default router;