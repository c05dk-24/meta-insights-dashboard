import express from 'express';
import authRoutes from './auth.js';
import metaRoutes from './meta/index.js';
import healthRoutes from './health.js';

const router = express.Router();

// API routes
router.use('/auth', authRoutes);
router.use('/meta', metaRoutes); // Mount meta routes under /api/meta
router.use('/health', healthRoutes);

export default router;