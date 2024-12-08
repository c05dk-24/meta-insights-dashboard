import express from 'express';
import authRoutes from './auth.js';
import boardRoutes from './boards.js';
import metaRoutes from './meta/index.js';
import aiRoutes from './ai.js';
import healthRoutes from './health.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/boards', boardRoutes);
router.use('/meta', metaRoutes);
router.use('/ai', aiRoutes);
router.use('/health', healthRoutes);

export default router;