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

// Apply CORS before other middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(securityMiddleware);
app.use(requestLogger);

// Routes
app.use('/health', healthRoutes);
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

// Error handling
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