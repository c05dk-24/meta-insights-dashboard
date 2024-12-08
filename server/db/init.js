import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dbLogger from '../utils/db-logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const initDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
    } : false
  });

  try {
    dbLogger.log('Starting database initialization...');
    
    // Read and execute schema SQL
    const schemaSQL = await fs.readFile(
      path.join(__dirname, 'init.sql'),
      'utf-8'
    );

    await pool.query('BEGIN');

    try {
      // Execute schema
      await pool.query(schemaSQL);
      
      // Read and execute seed data
      const seedSQL = await fs.readFile(
        path.join(__dirname, 'seed-users.sql'),
        'utf-8'
      );
      await pool.query(seedSQL);

      await pool.query('COMMIT');
      dbLogger.log('Database initialized successfully');
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }

    await pool.end();
    process.exit(0);
  } catch (error) {
    dbLogger.error('Failed to initialize database:', error);
    await pool.end();
    process.exit(1);
  }
};

initDatabase();