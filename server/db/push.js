import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dbLogger from '../utils/db-logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pushSchema = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
    } : false
  });

  try {
    // Read schema file
    const schemaSQL = await fs.readFile(
      path.join(__dirname, 'schema.sql'),
      'utf-8'
    );

    // Execute schema in a transaction
    await pool.query('BEGIN');
    
    try {
      await pool.query(schemaSQL);
      await pool.query('COMMIT');
      dbLogger.log('Schema pushed successfully');
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }

    await pool.end();
    process.exit(0);
  } catch (error) {
    dbLogger.error('Failed to push schema:', error);
    await pool.end();
    process.exit(1);
  }
};

pushSchema();