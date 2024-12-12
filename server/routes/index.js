import express from 'express';
import authRoutes from './auth.js';
import boardRoutes from './boards.js';
import healthRoutes from './health.js';

const router = express.Router();

// Health check route (no auth required)
router.use('/health', healthRoutes);

// API routes
router.use('/auth', authRoutes);
router.use('/boards', boardRoutes);

export default router;