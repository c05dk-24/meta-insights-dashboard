import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dbLogger from '../utils/db-logger.js';

dotenv.config();

const config = {
  dialect: 'postgres',
  logging: (msg) => dbLogger.log(msg),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
};

const sequelize = new Sequelize(process.env.DATABASE_URL, config);

export const initDatabase = async () => {
  let retries = 0;
  const maxRetries = 5;
  const retryDelay = 5000;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      dbLogger.log('Database connection established successfully');
      return true;
    } catch (error) {
      retries++;
      dbLogger.error(`Database connection attempt ${retries} failed:`, error);
      
      if (retries === maxRetries) {
        throw new Error(`Failed to connect after ${maxRetries} attempts: ${error.message}`);
      }
      
      dbLogger.log(`Retrying in ${retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

export default sequelize;