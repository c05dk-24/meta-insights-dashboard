import dbLogger from './db-logger.js';

export class ConnectionManager {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000; // 5 seconds
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      dbLogger.log('Database connection established successfully');
      this.retryCount = 0;
      return true;
    } catch (error) {
      dbLogger.error('Failed to connect to database:', error.message);
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        dbLogger.warn(`Retrying connection (${this.retryCount}/${this.maxRetries}) in ${this.retryDelay/1000}s...`);
        
        return new Promise((resolve) => {
          setTimeout(async () => {
            resolve(await this.connect());
          }, this.retryDelay);
        });
      }
      
      throw new Error(`Failed to connect after ${this.maxRetries} attempts`);
    }
  }

  async disconnect() {
    try {
      await this.sequelize.close();
      dbLogger.log('Database connection closed successfully');
      return true;
    } catch (error) {
      dbLogger.error('Error closing database connection:', error.message);
      throw error;
    }
  }
}

export default ConnectionManager;