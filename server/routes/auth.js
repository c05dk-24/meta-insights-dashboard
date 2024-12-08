import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import dbLogger from '../utils/db-logger.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find user
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password', 'name', 'company_id', 'meta_page_id']
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      company_id: user.company_id,
      meta_page_id: user.meta_page_id
    };

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    dbLogger.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

export default router;