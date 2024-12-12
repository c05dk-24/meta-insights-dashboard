import express from 'express';
import { authenticate } from '../../middleware/auth.js';
import { validateMetaToken } from '../../middleware/metaAuth.js';
import insightsRoutes from './insights.js';
import campaignRoutes from './campaigns.js';

const router = express.Router();

// Apply authentication middleware to all Meta routes
router.use(authenticate);
router.use(validateMetaToken);

router.use('/insights', insightsRoutes);
router.use('/campaigns', campaignRoutes);

export default router;