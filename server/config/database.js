import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dbLogger from '../utils/db-logger.js';

dotenv.config();

const getDbConfig = () => {
  const config = {
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    logging: (msg) => dbLogger.log(msg)
  };

  if (process.env.NODE_ENV === 'production') {
    return {
      ...config,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    };
  }

  return {
    ...config,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10)
  };
};

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/meta_insights',
  getDbConfig()
);

export const initDatabase = async () => {
  let retries = 0;
  const maxRetries = 5;
  const retryDelay = 5000;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      dbLogger.log('Database connection established successfully.');
      dbLogger.log(`Environment: ${process.env.NODE_ENV}`);
      
      const config = sequelize.config;
      dbLogger.log('Connection config:', {
        host: config.host,
        port: config.port,
        database: config.database,
        dialect: config.dialect
      });
      
      return true;
    } catch (error) {
      retries++;
      dbLogger.error(`Connection attempt ${retries} failed:`, error.message);
      
      if (retries === maxRetries) {
        throw new Error(`Failed to connect after ${maxRetries} attempts: ${error.message}`);
      }
      
      dbLogger.log(`Retrying in ${retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

export default sequelize;