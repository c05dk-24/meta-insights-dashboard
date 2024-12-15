import dbLogger from './db-logger.js';

export const handleError = (res, error) => {
  dbLogger.error('API Error:', {
    message: error.message,
    stack: error.stack,
    details: error.response?.data
  });

  // Handle Sequelize validation errors
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: error.errors.map(err => err.message).join(', ')
    });
  }

  // Handle Sequelize unique constraint errors
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'DUPLICATE_ERROR',
      message: 'This record already exists'
    });
  }

  // Handle Sequelize foreign key errors
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'FOREIGN_KEY_ERROR',
      message: 'Invalid reference to related record'
    });
  }

  // Handle other database errors
  if (error.name?.startsWith('Sequelize')) {
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: 'A database error occurred'
    });
  }

  // Default error response
  res.status(500).json({
    error: 'SERVER_ERROR',
    message: 'An unexpected error occurred'
  });
};