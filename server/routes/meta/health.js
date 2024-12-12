import express from 'express';
import dbLogger from '../../utils/db-logger.js';

const router = express.Router();

router.get('/', (req, res) => {
  dbLogger.log('Meta API health check');
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

export default router;