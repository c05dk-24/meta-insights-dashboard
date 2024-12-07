import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dbLogger from '../utils/db-logger.js';

dotenv.config();

const getDbConfig = () => {
  const config = {
    dialect: 'mysql',
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
        socketPath: '/cloudsql/vici-appp:europe-west2:vicimedia12',
        connectTimeout: 60000,
        ssl: {
          rejectUnauthorized: false
        }
      }
    };
  }

  return {
    ...config,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialectOptions: {
      connectTimeout: 60000
    }
  };
};

const sequelize = new Sequelize(
  'NewVici',
  'dal',
  'samson01',
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
      dbLogger.log(`Connected to database: NewVici`);
      dbLogger.log(`Environment: ${process.env.NODE_ENV}`);
      if (process.env.NODE_ENV === 'production') {
        dbLogger.log(`Using socket path: /cloudsql/vici-appp:europe-west2:vicimedia12`);
      } else {
        dbLogger.log(`Using host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
      }
      return true;
    } catch (error) {
      retries++;
      dbLogger.error(`Connection attempt ${retries} failed:`, error.message);
      
      if (retries === maxRetries) {
        throw new Error(`Failed to connect after ${maxRetries} attempts`);
      }
      
      dbLogger.log(`Retrying in ${retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

export default sequelize;