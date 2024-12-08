import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './config/database.js';
import { corsOptions } from './config/cors.js';
import { securityMiddleware } from './middleware/security.js';
import { requestLogger } from './middleware/logging.js';
import { errorHandler } from './middleware/error.js';
import routes from './routes/index.js';
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

// Security middleware
app.use(securityMiddleware);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Routes
app.use('/api', routes);

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

startServer();