import dotenv from 'dotenv';

dotenv.config();

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://tourmaline-pie-2188b7.netlify.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

export const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
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
  exposedHeaders: ['Content-Length', 'Access-Control-Allow-Origin'],
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204
};