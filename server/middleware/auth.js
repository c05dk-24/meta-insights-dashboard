import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import dbLogger from '../utils/db-logger.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      dbLogger.warn('Authentication failed: User not found');
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    dbLogger.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};