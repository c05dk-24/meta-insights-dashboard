import express from 'express';
import authRoutes from './auth.js';
import insightsRoutes from './insights.js';
import campaignRoutes from './campaigns.js';
import healthRoutes from './health.js';

const router = express.Router();

// Health check route (no auth required)
router.use('/health', healthRoutes);

// Meta authentication routes
router.use('/auth', authRoutes);

// Protected Meta API routes
router.use('/insights', insightsRoutes);
router.use('/campaigns', campaignRoutes);

export default router;