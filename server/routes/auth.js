import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Email and password are required'
      });
    }
    
    logger.info(`Login attempt for email: ${email}`);
    
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password', 'name', 'company_id']
    });

    if (!user) {
      logger.warn(`Login failed: User not found - ${email}`);
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      logger.warn(`Login failed: Invalid password - ${email}`);
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      company_id: user.company_id
    };

    logger.info(`User logged in successfully: ${email}`);

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
});

export default router;