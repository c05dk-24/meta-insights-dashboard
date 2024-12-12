import express from 'express';
import authRoutes from './auth.js';
import healthRoutes from './health.js';

const router = express.Router();

// Health check route (no auth required)
router.use('/health', healthRoutes);

// API routes
router.use('/auth', authRoutes);

export default router;