import { initDatabase } from '../config/database.js';
import sequelize from '../config/database.js';
import dbLogger from '../utils/db-logger.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pushSchema = async () => {
  try {
    // Initialize database connection
    await initDatabase();
    
    // Read setup SQL file
    const setupSQL = await fs.readFile(
      path.join(__dirname, 'setup.sql'),
      'utf-8'
    );

    // Execute the entire SQL file as one transaction
    await sequelize.transaction(async (t) => {
      try {
        await sequelize.query(setupSQL, { 
          transaction: t,
          raw: true
        });
        dbLogger.log('Database schema and initial data created successfully');
      } catch (error) {
        dbLogger.error('Failed to execute SQL:', error.message);
        throw error;
      }
    });

    process.exit(0);
  } catch (error) {
    dbLogger.error('Failed to initialize database:', error);
    process.exit(1);
  }
};

pushSchema();