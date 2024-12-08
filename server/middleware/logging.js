import dbLogger from '../utils/db-logger.js';

export const requestLogger = (req, res, next) => {
  const origin = req.headers.origin || 'No Origin';
  const method = req.method;
  const url = req.originalUrl || req.url;
  
  dbLogger.log(`${method} ${url} - Origin: ${origin}`);
  next();
};