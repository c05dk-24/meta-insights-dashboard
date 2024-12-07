import { Pool } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
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
    dbLogger.log('Reading schema file...');
    const schemaSQL = await fs.readFile(
      path.join(__dirname, 'schema.sql'),
      'utf-8'
    );

    dbLogger.log('Executing schema...');
    await pool.query(schemaSQL);
    dbLogger.log('Schema created successfully');

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    await pool.query(`
      INSERT INTO users (email, password, name)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `, ['test@example.com', hashedPassword, 'Test User']);

    dbLogger.log('Test user created successfully');
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