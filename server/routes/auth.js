import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    dbLogger.log(`Login attempt for email: ${email}`);
    
    // Find user
    const user = await User.findOne({ 
      where: { email },
      raw: true // Get plain object instead of Sequelize instance
    });

    if (!user) {
      dbLogger.warn(`Login failed: User not found - ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      dbLogger.warn(`Login failed: Invalid password - ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    dbLogger.log(`User logged in successfully: ${email}`);

    // Return user data and token
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    dbLogger.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test endpoint to verify server is running
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;