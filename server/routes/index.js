import express from 'express';
import authRoutes from './auth.js';
import metaRoutes from './meta/index.js';
import healthRoutes from './health.js';

const router = express.Router();

// Health check route (no auth required)
router.use('/health', healthRoutes);

// API routes
router.use('/auth', authRoutes);
router.use('/meta', metaRoutes);

export default router;