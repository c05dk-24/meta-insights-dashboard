import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './config/database.js';
import metaRoutes from './routes/meta/index.js';
import authRoutes from './routes/auth.js';
import dbLogger from './utils/db-logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.PRODUCTION_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Requested-With'],
  maxAge: 86400, // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  dbLogger.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  dbLogger.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meta', metaRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase();
    
    app.listen(PORT, () => {
      dbLogger.log(`Server running on port ${PORT}`);
      dbLogger.log(`Environment: ${process.env.NODE_ENV}`);
      dbLogger.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    dbLogger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  dbLogger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  dbLogger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();