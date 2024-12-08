import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Email and password are required'
      });
    }
    
    dbLogger.log(`Login attempt for email: ${email}`);
    
    // Find user
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password', 'name', 'company_id', 'meta_page_id']
    });

    if (!user) {
      dbLogger.warn(`Login failed: User not found - ${email}`);
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      dbLogger.warn(`Login failed: Invalid password - ${email}`);
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Remove password from response
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      company_id: user.company_id,
      meta_page_id: user.meta_page_id
    };

    dbLogger.log(`User logged in successfully: ${email}`);

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    dbLogger.error('Login error:', error);
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred'
    });
  }
});

export default router;