import dbLogger from '../utils/db-logger.js';

export const errorHandler = (err, req, res, next) => {
  dbLogger.error('Server error:', err.message);
  
  if (err.message.includes('not allowed by CORS')) {
    return res.status(403).json({
      error: 'CORS_ERROR',
      message: 'Origin not allowed',
      origin: req.headers.origin
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Invalid or expired token'
    });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: err.message
    });
  }
  
  // Default error
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
};