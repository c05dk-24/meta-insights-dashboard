import dotenv from 'dotenv';
import dbLogger from '../utils/db-logger.js';

dotenv.config();

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://tourmaline-pie-2188b7.netlify.app'
].filter(Boolean);

export const corsOptions = {
  origin: function(origin, callback) {
    dbLogger.log('Request origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      dbLogger.log('Request with no origin - allowing access');
      return callback(null, true);
    }
    
    if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Requested-With']
};