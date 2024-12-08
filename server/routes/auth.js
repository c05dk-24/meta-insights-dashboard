import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import dbLogger from '../utils/db-logger.js';

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
    
    dbLogger.log(`Login attempt for email: ${email}`);
    
    // Find user - use findOne instead of findByPk for email lookup
    const user = await User.findOne({ 
      where: { email }
    });

    if (!user) {
      dbLogger.warn(`Login failed: User not found - ${email}`);
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      });
    }

    // Compare passwords using bcrypt
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      dbLogger.warn(`Login failed: Invalid password - ${email}`);
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Convert to plain object and remove password
    const userJson = user.toJSON();
    delete userJson.password;

    dbLogger.log(`User logged in successfully: ${email}`);

    res.json({
      token,
      user: userJson
    });
  } catch (error) {
    dbLogger.error('Login error:', error);
    next(error);
  }
});

router.get('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      error: 'NO_TOKEN',
      message: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(401).json({
        error: 'INVALID_TOKEN',
        message: 'Invalid token'
      });
    }

    res.json({ user: user.toJSON() });
  } catch (error) {
    res.status(401).json({
      error: 'INVALID_TOKEN',
      message: 'Invalid token'
    });
  }
});

export default router;