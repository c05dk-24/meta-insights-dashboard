import dotenv from 'dotenv';
import dbLogger from '../utils/db-logger.js';

dotenv.config();

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://tourmaline-pie-2188b7.netlify.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

dbLogger.log('Configured CORS origins:', ALLOWED_ORIGINS);

export const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl requests)
    if (!origin) {
      dbLogger.log('Request with no origin - allowing access');
      return callback(null, true);
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      dbLogger.log(`Origin ${origin} is allowed`);
      callback(null, true);
    } else {
      dbLogger.warn(`Origin ${origin} is not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Requested-With'],
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204
};