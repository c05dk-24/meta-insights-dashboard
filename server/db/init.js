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
    
    // Read SQL files
    const clearSQL = await fs.readFile(path.join(__dirname, 'clear.sql'), 'utf-8');
    const schemaSQL = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf-8');
    const seedSQL = await fs.readFile(path.join(__dirname, 'seed.sql'), 'utf-8');

    await pool.query('BEGIN');

    try {
      // Clear existing tables
      dbLogger.log('Clearing existing tables...');
      await pool.query(clearSQL);

      // Create new schema
      dbLogger.log('Creating new schema...');
      const schemaStatements = schemaSQL.split(';').filter(stmt => stmt.trim());
      for (const statement of schemaStatements) {
        if (statement.trim()) {
          await pool.query(statement);
        }
      }

      // Insert seed data
      dbLogger.log('Inserting seed data...');
      const seedStatements = seedSQL.split(';').filter(stmt => stmt.trim());
      for (const statement of seedStatements) {
        if (statement.trim()) {
          await pool.query(statement);
        }
      }

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