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
      path.join(__dirname, 'schema.sql'),
      'utf-8'
    );

    await pool.query('BEGIN');

    try {
      // Execute schema in parts to handle potential dependencies
      const statements = schemaSQL.split(';').filter(stmt => stmt.trim());
      
      for (const statement of statements) {
        if (statement.trim()) {
          await pool.query(statement);
        }
      }

      await pool.query('COMMIT');
      dbLogger.log('Schema created successfully');
      
      // Insert sample data
      const sampleDataSQL = await fs.readFile(
        path.join(__dirname, 'sample-data.sql'),
        'utf-8'
      );
      
      await pool.query(sampleDataSQL);
      dbLogger.log('Sample data inserted successfully');

    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }

    await pool.end();
    dbLogger.log('Database initialization completed successfully');
    process.exit(0);
  } catch (error) {
    dbLogger.error('Failed to initialize database:', error);
    await pool.end();
    process.exit(1);
  }
};

initDatabase();