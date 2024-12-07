import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './config/database.js';
import { corsOptions } from './config/cors.js';
import { securityMiddleware } from './middleware/security.js';
import { requestLogger } from './middleware/logging.js';
import { errorHandler } from './middleware/error.js';
import metaRoutes from './routes/meta/index.js';
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import dbLogger from './utils/db-logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for secure cookies in production
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Pre-flight requests
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security and logging middleware
app.use(securityMiddleware);
app.use(requestLogger);

// Health check route (before security middleware)
app.use('/health', healthRoutes);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/meta', metaRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Meta Insights API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Error handling must be last
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase();
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      dbLogger.log(`Server running on port ${PORT}`);
      dbLogger.log(`Environment: ${process.env.NODE_ENV}`);
    });

    const shutdown = () => {
      dbLogger.log('Shutting down server...');
      server.close(() => {
        dbLogger.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
    
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