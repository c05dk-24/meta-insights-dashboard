import express from 'express';
import campaignRoutes from './campaigns.js';
import adRoutes from './ads.js';

const router = express.Router();

router.use('/campaigns', campaignRoutes);
router.use('/ads', adRoutes);

export default router;