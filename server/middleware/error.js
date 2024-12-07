import dbLogger from '../utils/db-logger.js';

export const errorHandler = (err, req, res, next) => {
  dbLogger.error('Server error:', err.message);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS error',
      message: 'Origin not allowed'
    });
  }
  
  res.status(500).json({ error: 'Internal server error' });
};