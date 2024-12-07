import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dbLogger from '../utils/db-logger.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      // For Google Cloud SQL, we don't need to specify the CA
    },
    connectTimeout: 60000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  },
  logging: (msg) => dbLogger.log(msg),
});

export const initDatabase = async () => {
  let retries = 0;
  const maxRetries = 5;
  const retryDelay = 5000;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      dbLogger.log('Database connection established successfully.');
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