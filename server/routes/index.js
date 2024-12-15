import express from 'express';
import authRoutes from './auth.js';
import boardRoutes from './boards.js';
import listRoutes from './lists.js';
import cardRoutes from './cards.js';
import metaRoutes from './meta/index.js';
import healthRoutes from './health.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/boards', boardRoutes);
router.use('/lists', listRoutes);
router.use('/cards', cardRoutes);
router.use('/meta', metaRoutes);
router.use('/health', healthRoutes);

export default router;