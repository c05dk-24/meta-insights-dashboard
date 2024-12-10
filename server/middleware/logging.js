import dbLogger from '../utils/db-logger.js';

export const requestLogger = (req, res, next) => {
  dbLogger.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
};