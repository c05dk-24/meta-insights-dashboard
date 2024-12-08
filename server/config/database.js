import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dbLogger from '../utils/db-logger.js';

dotenv.config();

const config = {
  dialect: 'postgres',
  logging: (msg) => dbLogger.log(msg),
  dialectOptions: process.env.NODE_ENV === 'production' 
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {},
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
};

const sequelize = new Sequelize(process.env.DATABASE_URL, config);

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    dbLogger.log('Database connection established successfully');
    
    // Sync models
    await sequelize.sync({ alter: true });
    dbLogger.log('Database models synchronized');
    
    return true;
  } catch (error) {
    dbLogger.error('Database initialization failed:', error);
    throw error;
  }
};

export default sequelize;